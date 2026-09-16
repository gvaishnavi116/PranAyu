import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { db } from './src/db/db';
import { remedyTranslations } from './src/utils/remedyTranslations';
import { hashPassword, verifyPassword, signToken, verifyToken } from './src/utils/auth';
import { detectEmergency } from './src/utils/emergency';
import { createServer as createViteServer } from 'vite';

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// MIDDLEWARES
// ==========================================

// Authenticate JWT Request Middleware
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Authentication token required' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(403).json({ error: 'Invalid or expired token' });
    return;
  }

  req.user = {
    userId: decoded.userId,
    email: decoded.email
  };
  next();
}

// Helper for recording secure audit logs
function logAudit(userId: string, email: string, role: 'patient' | 'asha_worker' | 'admin', action: string, resource: string, ip?: string) {
  try {
    db.addAuditLog({
      userId,
      userEmail: email,
      role,
      action,
      resource,
      ipAddress: ip || '127.0.0.1'
    });
  } catch (e) {
    console.error('Audit log failure', e);
  }
}

// Seed Default Admin and ASHA Worker Accounts on startup
function seedDefaultAccounts() {
  const users = db.getUsers();
  
  // Seed Admin Account
  if (!users.some(u => u.email === 'admin@pranayu.gov.in')) {
    const { hash, salt } = hashPassword('admin123');
    const adminId = 'admin_system_1';
    db.addUser({
      id: adminId,
      email: 'admin@pranayu.gov.in',
      passwordHash: `${hash}:${salt}`,
      createdAt: new Date().toISOString()
    });
    db.saveProfile({
      userId: adminId,
      role: 'admin',
      fullName: 'Dr. Rajesh Sharma (Director Admin)',
      age: 48,
      gender: 'Male',
      village: 'Central Health Directorate',
      mobileNumber: '+91 98000 11111',
      emergencyContact: '+91 108',
      riskCategory: 'low',
      weight: 75,
      height: 175,
      bloodGroup: 'B+',
      allergies: [],
      medicalConditions: [],
      currentMedication: [],
      lifestyle: 'active',
      sleep: 7,
      waterIntake: 3.0,
      exercise: 'walking',
      smoking: false,
      alcohol: false,
      updatedAt: new Date().toISOString()
    });
  }

  // Seed ASHA Worker Account
  if (!users.some(u => u.email === 'asha.rampur@pranayu.gov.in')) {
    const { hash, salt } = hashPassword('asha123');
    const ashaId = 'asha_worker_rampur_1';
    db.addUser({
      id: ashaId,
      email: 'asha.rampur@pranayu.gov.in',
      passwordHash: `${hash}:${salt}`,
      createdAt: new Date().toISOString()
    });
    db.saveProfile({
      userId: ashaId,
      role: 'asha_worker',
      fullName: 'Sunita Devi (Rampur PHC ASHA)',
      age: 34,
      gender: 'Female',
      village: 'Rampur',
      phcCenter: 'Rampur Primary Health Center',
      mobileNumber: '+91 98765 99999',
      emergencyContact: '+91 108',
      riskCategory: 'low',
      weight: 62,
      height: 160,
      bloodGroup: 'O+',
      allergies: [],
      medicalConditions: [],
      currentMedication: [],
      lifestyle: 'active',
      sleep: 8,
      waterIntake: 3.0,
      exercise: 'walking',
      smoking: false,
      alcohol: false,
      updatedAt: new Date().toISOString()
    });
  }
}

seedDefaultAccounts();

app.post('/api/auth/signup', (req: Request, res: Response) => {
  const { email, password, fullName, role } = req.body;

  if (!email || !password || !fullName) {
    res.status(400).json({ error: 'All fields (email/mobile, password, fullName) are required' });
    return;
  }

  const rawInput = email.trim();
  const cleanDigits = rawInput.replace(/\D/g, '');
  const isMobile = cleanDigits.length === 10 || (cleanDigits.length === 12 && cleanDigits.startsWith('91'));

  let userEmail = rawInput.toLowerCase();
  let formattedMobile = '+91 98765 00000';

  if (isMobile) {
    const tenDigits = cleanDigits.slice(-10);
    userEmail = `${tenDigits}@mobile.pranayu.gov.in`;
    formattedMobile = `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
  }

  // Check 1: Check existing users by email or derived mobile identifier
  const existingUsers = db.getUsers();
  const duplicateUser = existingUsers.find(u => {
    if (u.email.toLowerCase() === userEmail.toLowerCase()) return true;
    if (u.email.toLowerCase() === rawInput.toLowerCase()) return true;
    if (isMobile) {
      const uDigits = u.email.replace(/\D/g, '');
      if (uDigits.length >= 10 && uDigits.slice(-10) === cleanDigits.slice(-10)) return true;
    }
    return false;
  });

  // Check 2: Check existing profiles by mobile number
  const existingProfiles = db.getProfiles();
  const duplicateProfile = existingProfiles.find(p => {
    if (isMobile && p.mobileNumber) {
      const pDigits = p.mobileNumber.replace(/\D/g, '');
      if (pDigits.length >= 10 && pDigits.slice(-10) === cleanDigits.slice(-10)) return true;
    }
    return false;
  });

  if (duplicateUser || duplicateProfile) {
    res.status(400).json({ error: 'An account with this Email ID or Mobile Number already exists. Please log in instead.' });
    return;
  }

  const { hash, salt } = hashPassword(password);
  const userId = `usr_${Math.random().toString(36).substr(2, 9)}`;

  const newUser = db.addUser({
    id: userId,
    email: userEmail,
    passwordHash: `${hash}:${salt}`, // Store salt alongside hash
    createdAt: new Date().toISOString()
  });

  // Create initial profile with selected role
  const initialProfile = db.saveProfile({
    userId,
    role: role === 'asha_worker' ? 'asha_worker' : 'patient',
    fullName,
    age: 30,
    gender: 'Not Specified',
    village: role === 'asha_worker' ? 'Rampur Central' : 'Rampur',
    mobileNumber: formattedMobile,
    emergencyContact: '+91 108',
    riskCategory: 'low',
    weight: 70,
    height: 170,
    bloodGroup: 'Not Specified',
    allergies: [],
    medicalConditions: [],
    currentMedication: [],
    lifestyle: 'active',
    sleep: 7,
    waterIntake: 2.5,
    exercise: 'walking',
    smoking: false,
    alcohol: false,
    updatedAt: new Date().toISOString()
  });

  // Create initial default settings
  db.saveSettings({
    userId,
    language: 'en',
    theme: 'light',
    notificationsEnabled: true,
    voiceEnabled: false,
    voiceName: 'Kore',
    privacyEnabled: true
  });

  // Seed default notifications
  db.addNotification({
    id: `not_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title: 'Hydration Reminder',
    message: 'Time to drink some lukewarm water. Gulp slowly as per Ayurveda!',
    type: 'water',
    time: '10:00',
    isRead: false,
    isEnabled: true,
    createdAt: new Date().toISOString()
  });

  db.addNotification({
    id: `not_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title: 'Meditation Check',
    message: 'Take a 5-minute deep breathing or pranayama pause.',
    type: 'exercise',
    time: '17:00',
    isRead: false,
    isEnabled: true,
    createdAt: new Date().toISOString()
  });

  const token = signToken(userId, newUser.email);
  logAudit(userId, newUser.email, initialProfile.role || 'patient', 'User Account Registered', 'Auth Module', req.ip);
  res.status(201).json({
    token,
    user: {
      id: userId,
      email: newUser.email,
      fullName: initialProfile.fullName,
      role: initialProfile.role || 'patient'
    }
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email / Mobile Number and password are required' });
    return;
  }

  const rawInput = email.trim();
  const cleanDigits = rawInput.replace(/\D/g, '');

  let matchedUser = db.getUsers().find(u => u.email.toLowerCase() === rawInput.toLowerCase());

  if (!matchedUser && (cleanDigits.length === 10 || (cleanDigits.length === 12 && cleanDigits.startsWith('91')))) {
    const tenDigits = cleanDigits.slice(-10);
    const mobileEmail = `${tenDigits}@mobile.pranayu.gov.in`;

    matchedUser = db.getUsers().find(u => u.email.toLowerCase() === mobileEmail.toLowerCase());

    if (!matchedUser) {
      const matchedProfile = db.getProfiles().find(p => p.mobileNumber && p.mobileNumber.replace(/\D/g, '').endsWith(tenDigits));
      if (matchedProfile) {
        matchedUser = db.getUsers().find(u => u.id === matchedProfile.userId);
      }
    }
  }

  if (!matchedUser) {
    res.status(400).json({ error: 'Invalid Email/Mobile Number or password' });
    return;
  }

  const [hash, salt] = matchedUser.passwordHash.split(':');
  if (!verifyPassword(password, hash, salt)) {
    res.status(400).json({ error: 'Invalid Email/Mobile Number or password' });
    return;
  }

  const profile = db.getProfiles().find(p => p.userId === matchedUser!.id);
  const token = signToken(matchedUser.id, matchedUser.email);
  const userRole = profile ? (profile.role || 'patient') : 'patient';
  logAudit(matchedUser.id, matchedUser.email, userRole, 'User Logged In', 'Auth Module', req.ip);

  res.json({
    token,
    user: {
      id: matchedUser.id,
      email: matchedUser.email,
      fullName: profile ? profile.fullName : 'Valued User',
      role: userRole
    }
  });
});

app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }
  // Simulate forgot password response
  res.json({ message: 'If this email exists in our records, a reset link will be sent shortly.' });
});

app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  res.json({ message: 'Your password has been reset successfully.' });
});

// ==========================================
// ASHA WORKER MANAGEMENT ENDPOINTS
// ==========================================

app.get('/api/asha/patients', authenticateToken, (req: AuthRequest, res: Response) => {
  const { search, village, riskCategory, ashaId, assignedOnly } = req.query;

  const ashaProfiles = db.getProfiles().filter(p => p.role === 'asha_worker');
  const ashaNameMap = new Map(ashaProfiles.map(a => [a.userId, a.fullName]));

  let profiles = db.getProfiles().filter(p => !p.role || p.role === 'patient');

  if (village && village !== 'All Villages') {
    profiles = profiles.filter(p => p.village?.toLowerCase() === (village as string).toLowerCase());
  }

  if (riskCategory && riskCategory !== 'All Risk Categories') {
    profiles = profiles.filter(p => p.riskCategory === riskCategory);
  }

  if (ashaId) {
    profiles = profiles.filter(p => p.assignedAshaId === ashaId);
  } else if (assignedOnly === 'true') {
    profiles = profiles.filter(p => Boolean(p.assignedAshaId));
  }

  if (search) {
    const q = (search as string).toLowerCase();
    profiles = profiles.filter(p => 
      p.fullName.toLowerCase().includes(q) ||
      (p.village && p.village.toLowerCase().includes(q)) ||
      (p.mobileNumber && p.mobileNumber.includes(q)) ||
      p.medicalConditions.some(c => c.toLowerCase().includes(q))
    );
  }

  const enriched = profiles.map(p => ({
    ...p,
    assignedAshaName: p.assignedAshaId ? (ashaNameMap.get(p.assignedAshaId) || 'Assigned ASHA Worker') : undefined
  }));

  res.json(enriched);
});

app.get('/api/asha/patients/:patientId', authenticateToken, (req: AuthRequest, res: Response) => {
  const patientId = req.params.patientId;
  const profile = db.getProfiles().find(p => p.userId === patientId);

  if (!profile) {
    res.status(404).json({ error: 'Patient record not found' });
    return;
  }

  const logs = db.getHealthLogs().filter(l => l.userId === patientId);
  const appointments = db.getAppointments().filter(a => a.userId === patientId);
  const chats = db.getChats().filter(c => c.userId === patientId);

  res.json({
    profile,
    logs,
    appointments,
    recentChatsCount: chats.length
  });
});

app.put('/api/asha/patients/:patientId', authenticateToken, (req: AuthRequest, res: Response) => {
  const patientId = req.params.patientId;
  const updates = req.body;

  const currentProfile = db.getProfiles().find(p => p.userId === patientId);
  if (!currentProfile) {
    res.status(404).json({ error: 'Patient profile not found' });
    return;
  }

  const updatedProfile = db.saveProfile({
    ...currentProfile,
    ...updates,
    userId: patientId, // Lock user ID
    updatedAt: new Date().toISOString()
  });

  logAudit(req.user?.userId || 'asha_1', req.user?.email || 'asha@pranayu.gov.in', 'asha_worker', 'Field Visit Note Updated', `Patient: ${currentProfile.fullName} (${patientId})`, req.ip);

  res.json(updatedProfile);
});

app.get('/api/asha/alerts', authenticateToken, (req: AuthRequest, res: Response) => {
  const profiles = db.getProfiles().filter(p => !p.role || p.role === 'patient');
  const emergencyProfiles = profiles.filter(p => 
    p.riskCategory === 'high' || 
    p.riskCategory === 'chronic' || 
    (p.medicalConditions && p.medicalConditions.some(c => c.toLowerCase().includes('emergency') || c.includes('🚨') || c.toLowerCase().includes('heart') || c.toLowerCase().includes('chest')))
  );

  const alerts = emergencyProfiles.map(p => {
    const emergencyConds = (p.medicalConditions || []).filter(c => c.includes('🚨') || c.toLowerCase().includes('emergency') || c.toLowerCase().includes('heart'));
    const mainType = emergencyConds.length > 0 ? emergencyConds.join('; ') : 'High Risk Triage Alert';

    return {
      id: `alert_${p.userId}`,
      patientId: p.userId,
      patientName: p.fullName,
      village: p.village || 'Rampur',
      mobileNumber: p.mobileNumber || '+91 98765 00000',
      type: mainType,
      notes: p.notes || 'Emergency symptoms reported in AI Assistant Chat',
      updatedAt: p.updatedAt || new Date().toISOString(),
      urgency: 'critical'
    };
  });

  res.json(alerts);
});

// ==========================================
// PATIENT CONSENT ENDPOINTS
// ==========================================

app.post('/api/patient/consent', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { consentGiven } = req.body;
  const profile = db.getProfiles().find(p => p.userId === userId);

  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }

  const updated = db.saveProfile({
    ...profile,
    consentGiven: !!consentGiven,
    consentTimestamp: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  logAudit(userId, req.user?.email || '', 'patient', consentGiven ? 'Patient Data Consent Granted' : 'Patient Data Consent Withdrawn', 'Consent Module', req.ip);

  res.json(updated);
});

// ==========================================
// ADMINISTRATOR CONTROL ENDPOINTS
// ==========================================

app.get('/api/admin/patients', authenticateToken, (req: AuthRequest, res: Response) => {
  const ashaProfiles = db.getProfiles().filter(p => p.role === 'asha_worker');
  const ashaNameMap = new Map(ashaProfiles.map(a => [a.userId, a.fullName]));

  const profiles = db.getProfiles()
    .filter(p => !p.role || p.role === 'patient')
    .map(p => ({
      ...p,
      assignedAshaName: p.assignedAshaId ? (ashaNameMap.get(p.assignedAshaId) || 'Assigned ASHA Worker') : undefined
    }));

  res.json(profiles);
});

app.get('/api/admin/asha-workers', authenticateToken, (req: AuthRequest, res: Response) => {
  const ashaProfiles = db.getProfiles().filter(p => p.role === 'asha_worker');
  res.json(ashaProfiles);
});

app.post('/api/admin/assign-patient', authenticateToken, (req: AuthRequest, res: Response) => {
  const { patientId, ashaId, village, phcCenter, riskCategory } = req.body;

  const profile = db.getProfiles().find(p => p.userId === patientId);
  if (!profile) {
    res.status(404).json({ error: 'Patient not found' });
    return;
  }

  const ashaWorkerProfile = ashaId ? db.getProfiles().find(p => p.userId === ashaId) : undefined;

  const updated = db.saveProfile({
    ...profile,
    assignedAshaId: ashaId !== undefined ? ashaId : profile.assignedAshaId,
    village: village || profile.village,
    phcCenter: phcCenter || profile.phcCenter,
    riskCategory: riskCategory || profile.riskCategory,
    updatedAt: new Date().toISOString()
  });

  logAudit(
    req.user?.userId || 'admin_1', 
    req.user?.email || 'admin@pranayu.gov.in', 
    'admin', 
    'Patient ASHA Assignment Updated', 
    `Patient: ${profile.fullName} -> Assigned ASHA: ${ashaWorkerProfile?.fullName || ashaId || 'Unassigned'} (Village: ${village || profile.village})`, 
    req.ip
  );

  res.json(updated);
});

app.post('/api/admin/create-patient', authenticateToken, (req: AuthRequest, res: Response) => {
  const { fullName, age, gender, village, mobileNumber, riskCategory, assignedAshaId, phcCenter } = req.body;

  if (!fullName) {
    res.status(400).json({ error: 'Full name is required' });
    return;
  }

  const userId = `usr_pat_${Math.random().toString(36).substr(2, 9)}`;
  const newEmail = `${userId}@patient.pranayu.gov.in`;

  db.addUser({
    id: userId,
    email: newEmail,
    passwordHash: 'seeded:hash',
    createdAt: new Date().toISOString()
  });

  const newProfile = db.saveProfile({
    userId,
    role: 'patient',
    fullName,
    age: Number(age) || 30,
    gender: gender || 'Female',
    village: village || 'Rampur',
    assignedAshaId: assignedAshaId || undefined,
    phcCenter: phcCenter || 'Rampur Primary Health Center',
    mobileNumber: mobileNumber || '+91 98765 00000',
    emergencyContact: '+91 108',
    riskCategory: riskCategory || 'low',
    weight: 60,
    height: 160,
    bloodGroup: 'B+',
    allergies: [],
    medicalConditions: [],
    currentMedication: [],
    lifestyle: 'active',
    sleep: 7,
    waterIntake: 2.5,
    exercise: 'walking',
    smoking: false,
    alcohol: false,
    notes: `Registered by State Directorate Admin on ${new Date().toLocaleDateString()}`,
    updatedAt: new Date().toISOString()
  });

  logAudit(req.user?.userId || 'admin_1', req.user?.email || 'admin@pranayu.gov.in', 'admin', 'New Patient Registered by Admin', `Patient: ${fullName} (${userId})`, req.ip);

  res.status(201).json(newProfile);
});

app.get('/api/admin/audit-logs', authenticateToken, (req: AuthRequest, res: Response) => {
  const logs = db.getAuditLogs();
  res.json(logs);
});

app.get('/api/admin/knowledge-base', authenticateToken, (req: AuthRequest, res: Response) => {
  const docs = db.getKnowledgeDocs();
  res.json(docs);
});

app.post('/api/admin/knowledge-base', authenticateToken, (req: AuthRequest, res: Response) => {
  const { title, category, content, fileFormat } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }

  const newDoc = db.addKnowledgeDoc({
    title,
    category: category || 'General AYUSH',
    content,
    fileFormat: fileFormat || 'txt',
    uploadedBy: req.user?.email || 'Admin Directorate'
  });

  logAudit(req.user?.userId || 'admin_1', req.user?.email || 'admin@pranayu.gov.in', 'admin', 'Knowledge Base Document Uploaded', `Doc: ${title} (${fileFormat})`, req.ip);

  res.status(201).json(newDoc);
});

app.delete('/api/admin/knowledge-base/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  db.deleteKnowledgeDoc(id);
  logAudit(req.user?.userId || 'admin_1', req.user?.email || 'admin@pranayu.gov.in', 'admin', 'Knowledge Base Document Deleted', `Doc ID: ${id}`, req.ip);
  res.json({ message: 'Document deleted successfully' });
});

app.post('/api/admin/remedies', authenticateToken, (req: AuthRequest, res: Response) => {
  const remedy = req.body;
  if (!remedy.title || !remedy.description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  const saved = db.saveRemedy({
    id: remedy.id || `rem_${Date.now()}`,
    ...remedy
  });

  logAudit(req.user?.userId || 'admin_1', req.user?.email || 'admin@pranayu.gov.in', 'admin', 'Ayurvedic Remedy Updated', `Remedy: ${saved.title}`, req.ip);

  res.json(saved);
});

app.delete('/api/admin/remedies/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  db.deleteRemedy(id);
  logAudit(req.user?.userId || 'admin_1', req.user?.email || 'admin@pranayu.gov.in', 'admin', 'Ayurvedic Remedy Deleted', `Remedy ID: ${id}`, req.ip);
  res.json({ message: 'Remedy deleted successfully' });
});

app.get('/api/admin/analytics', authenticateToken, (req: AuthRequest, res: Response) => {
  const profiles = db.getProfiles();
  const users = db.getUsers();
  const chats = db.getChats();
  const logs = db.getAuditLogs();

  const totalPatients = profiles.filter(p => !p.role || p.role === 'patient').length;
  const totalAshaWorkers = profiles.filter(p => p.role === 'asha_worker').length;
  const pregnantCount = profiles.filter(p => p.riskCategory === 'pregnant').length;
  const highRiskCount = profiles.filter(p => p.riskCategory === 'high' || p.riskCategory === 'chronic').length;
  const childrenCount = profiles.filter(p => p.riskCategory === 'child').length;
  const seniorCount = profiles.filter(p => p.riskCategory === 'senior').length;

  res.json({
    totalUsers: users.length,
    totalPatients,
    totalAshaWorkers,
    pregnantCount,
    highRiskCount,
    childrenCount,
    seniorCount,
    totalConsultations: chats.length,
    totalAuditEvents: logs.length
  });
});

// ==========================================
// HEALTH PROFILE ENDPOINTS
// ==========================================

app.get('/api/user/profile', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const profile = db.getProfiles().find(p => p.userId === userId);
  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }
  res.json(profile);
});

app.post('/api/user/profile', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const updates = req.body;

  const currentProfile = db.getProfiles().find(p => p.userId === userId);
  if (!currentProfile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }

  const updatedProfile = db.saveProfile({
    ...currentProfile,
    ...updates,
    userId, // Lock user ID
    updatedAt: new Date().toISOString()
  });

  res.json(updatedProfile);
});

// ==========================================
// REMEDIES DATABASE ENDPOINTS
// ==========================================

app.get('/api/remedies', (req: Request, res: Response) => {
  const search = req.query.search as string;
  const category = req.query.category as string;
  const lang = (req.query.lang as 'en' | 'hi' | 'te') || 'en';
  
  let remedies = db.getRemedies();

  if (category) {
    remedies = remedies.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    remedies = db.retrieveRelevantRemedies(search, 20);
  }

  // Localize remedies if language is not English
  if (lang && lang !== 'en') {
    remedies = remedies.map(r => {
      const trans = remedyTranslations[r.id]?.[lang];
      if (trans) {
        return {
          ...r,
          title: trans.title,
          description: trans.description,
          benefits: trans.benefits,
          ingredients: trans.ingredients,
          preparation: trans.preparation,
          dosage: trans.dosage,
          warnings: trans.warnings
        };
      }
      return r;
    });
  }

  res.json(remedies);
});

app.get('/api/remedies/:id', (req: Request, res: Response) => {
  const lang = (req.query.lang as 'en' | 'hi' | 'te') || 'en';
  const remedy = db.getRemedies().find(r => r.id === req.params.id);
  if (!remedy) {
    res.status(404).json({ error: 'Remedy not found' });
    return;
  }

  if (lang && lang !== 'en') {
    const trans = remedyTranslations[remedy.id]?.[lang];
    if (trans) {
      res.json({
        ...remedy,
        title: trans.title,
        description: trans.description,
        benefits: trans.benefits,
        ingredients: trans.ingredients,
        preparation: trans.preparation,
        dosage: trans.dosage,
        warnings: trans.warnings
      });
      return;
    }
  }

  res.json(remedy);
});

// ==========================================
// MULTI-LANGUAGE VOICE TTS ENDPOINT
// ==========================================

app.get('/api/tts', async (req: Request, res: Response) => {
  try {
    const rawText = req.query.text as string;
    const lang = (req.query.lang as string) || 'en';

    if (!rawText) {
      res.status(400).send('Text parameter is required');
      return;
    }

    // Clean text for speech synthesis
    let text = rawText
      .replace(/[*#`_~🚨•]/g, ' ')
      .replace(/\s+-\s+/g, ', ')
      .replace(/(\d+)\.\s*/g, '$1. ')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (lang === 'en') {
      text = text
        .replace(/\b1\/2\b/g, 'half')
        .replace(/\b1\/4\b/g, 'one quarter')
        .replace(/\btsp\b/gi, 'teaspoon')
        .replace(/\btbsp\b/gi, 'tablespoon')
        .replace(/\bmins?\b/gi, 'minutes');
    } else if (lang === 'hi') {
      text = text
        .replace(/\b1\/2\b/g, 'आधा')
        .replace(/\b1\/4\b/g, 'एक चौथाई')
        .replace(/\btsp\b/gi, 'छोटा चम्मच')
        .replace(/\btbsp\b/gi, 'बड़ा चम्मच')
        .replace(/\bmins?\b/gi, 'मिनट');
    } else if (lang === 'te') {
      text = text
        .replace(/\b1\/2\b/g, 'సగం')
        .replace(/\b1\/4\b/g, 'పావు')
        .replace(/\btsp\b/gi, 'టీస్పూన్')
        .replace(/\btbsp\b/gi, 'టేబుల్ స్పూన్')
        .replace(/\bmins?\b/gi, 'నిమిషాలు');
    }

    if (!text) {
      res.status(400).send('No readable text remaining');
      return;
    }

    // Split into chunks under 150 chars at sentence boundaries
    const chunks: string[] = [];
    const sentences = text.split(/(?<=[.।?!;])\s+/);
    let current = '';

    for (const sentence of sentences) {
      if ((current + ' ' + sentence).length <= 140) {
        current = current ? current + ' ' + sentence : sentence;
      } else {
        if (current) chunks.push(current);
        if (sentence.length > 140) {
          let rem = sentence;
          while (rem.length > 0) {
            chunks.push(rem.slice(0, 140));
            rem = rem.slice(140);
          }
          current = '';
        } else {
          current = sentence;
        }
      }
    }
    if (current) chunks.push(current);

    const validChunks = chunks.filter(c => c.trim().length > 0);
    if (validChunks.length === 0) {
      res.status(400).send('No valid text chunks');
      return;
    }

    const langCode = lang === 'hi' ? 'hi' : lang === 'te' ? 'te' : 'en';

    // Fetch audio chunks from Google Translate TTS API and merge
    const audioBuffers: Buffer[] = [];
    for (const chunk of validChunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk.trim())}&tl=${langCode}&client=tw-ob`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/'
        }
      });

      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        audioBuffers.push(Buffer.from(arrayBuffer));
      }
    }

    if (audioBuffers.length === 0) {
      res.status(500).send('Failed to synthesize speech audio');
      return;
    }

    const combinedBuffer = Buffer.concat(audioBuffers);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', combinedBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(combinedBuffer);
  } catch (err) {
    console.error('TTS Endpoint Error:', err);
    res.status(500).send('Speech synthesis failure');
  }
});

// ==========================================
// USER DASHBOARD / ANALYTICS
// ==========================================

app.get('/api/dashboard', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const profile = db.getProfiles().find(p => p.userId === userId);
  const logs = db.getHealthLogs().filter(l => l.userId === userId);
  const chats = db.getChats().filter(c => c.userId === userId);

  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }

  // Calculate Health Score dynamically based on logs & profile
  // Base score is 70. Add/subtract based on sleep, hydration, smoking, exercise
  let healthScore = 70;
  
  if (profile.sleep >= 7 && profile.sleep <= 9) healthScore += 10;
  else if (profile.sleep < 6 || profile.sleep > 9) healthScore -= 5;

  if (profile.waterIntake >= 2.5) healthScore += 10;
  else healthScore -= 5;

  if (profile.exercise !== 'none') healthScore += 10;
  else healthScore -= 5;

  if (profile.smoking) healthScore -= 15;
  if (profile.alcohol) healthScore -= 5;

  // Add points based on log achievements
  const todayStr = new Date().toISOString().split('T')[0];
  const waterLogsToday = logs.filter(l => l.type === 'water' && l.loggedAt.startsWith(todayStr));
  const totalWaterToday = waterLogsToday.reduce((acc, curr) => acc + parseFloat(curr.value || '0'), 0);
  if (totalWaterToday >= profile.waterIntake) {
    healthScore += 5;
  }

  healthScore = Math.max(20, Math.min(100, healthScore));

  // Find recent remedies based on profile allergies or conditions
  const matchedRemedies = db.getRemedies().filter(rem => {
    // If user has allergies, avoid remedies with warnings mentioning those items
    const hasAllergen = profile.allergies.some(all => 
      rem.ingredients.some(ing => ing.toLowerCase().includes(all.toLowerCase())) ||
      rem.warnings.some(war => war.toLowerCase().includes(all.toLowerCase()))
    );
    return !hasAllergen;
  }).slice(0, 3);

  // Retrieve user language settings or query param
  const langQuery = req.query.lang as string;
  const userSettings = db.getSettings().find(s => s.userId === userId);
  const userLang = langQuery || userSettings?.language || 'en';

  // Localized Daily Wellness Tips
  const wellnessTips = {
    en: [
      'Always drink lukewarm water in small sips while sitting down, rather than gulping cold water standing up.',
      'Eat your heaviest meal of the day at lunchtime (noon to 1 PM) when your digestive fire (Agni) is at its strongest.',
      'Scrape your tongue with a copper tongue scraper in the morning to remove toxic buildup (Ama).',
      'Massage your feet with warm sesame oil before bed to ground Vata dosha and deepen your sleep cycles.',
      'Favor seasonal fruits and freshly cooked meals over canned or frozen leftovers to maximize Prana (life force).',
      'Take 10 slow, deep belly breaths before starting a meal to prepare your digestive system.'
    ],
    hi: [
      'खड़े होकर ठंडा पानी पीने के बजाय हमेशा बैठकर छोटे-छोटे घूंट में गुनगुना पानी पिएं।',
      'दिन का सबसे भारी भोजन दोपहर के समय (दोपहर 12 से 1 बजे) खाएं जब आपकी पाचन अग्नि (अग्नि) सबसे मजबूत होती है।',
      'सुबह तांबे के टंग क्लीनर से अपनी जीभ साफ करें ताकि विषाक्त पदार्थ (आम) बाहर निकल सकें।',
      'वात दोष को शांत करने और गहरी नींद के लिए सोने से पहले अपने पैरों की गर्म तिल के तेल से मालिश करें।',
      'प्राण (जीवन शक्ति) को अधिकतम करने के लिए डिब्बाबंद या बासी भोजन के बजाय मौसमी फलों और ताजे पके भोजन को प्राथमिकता दें।',
      'पाचन तंत्र को सक्रिय करने के लिए भोजन शुरू करने से पहले 10 बार धीमी, गहरी साँसें लें।'
    ],
    te: [
      'నిలబడి చల్లని నీరు త్రాగడానికి బదులుగా, ఎల్లప్పుడూ కూర్చుని గోరువెచ్చని నీటిని నెమ్మదిగా సిప్ చేయండి.',
      'మధ్యాహ్నం 12 నుండి 1 గంటల మధ్య మీ జీర్ణక్రియ (అగ్ని) బలంగా ఉన్నప్పుడు రోజంతా అత్యంత బలమైన ఆహారాన్ని తీసుకోండి.',
      'శరీరంలో టాక్సిన్స్ (ఆమము) నివారించడానికి ఉదయాన్నే రాగి గీకుడుతో నాలుకను శుభ్రం చేసుకోండి.',
      'వాత దోషాన్ని నివారించడానికి మరియు గాఢమైన నిద్ర కోసం రాత్రి పడుకునే ముందు పాదాలకు గోరువెచ్చని నువ్వుల నూనెతో మసాజ్ చేసుకోండి.',
      'నిల్వ ఉంచిన ఆహారాలకు బదులుగా ప్రాణ శక్తిని పెంపొందించే తాజా కూరగాయలు మరియు పండ్లను ఆహారంగా తీసుకోండి.',
      'జీర్ణక్రియను మెరుగుపరుచుకోవడానికి భోజనం ప్రారంభించే ముందు 10 సార్లు నెమ్మదిగా, లోతైన శ్వాస తీసుకోండి.'
    ]
  };

  const currentTips = wellnessTips[userLang as 'en' | 'hi' | 'te'] || wellnessTips.en;
  const dayIndex = new Date().getDate() % currentTips.length;
  const dailyTip = currentTips[dayIndex];

  // Localize remedies list for dashboard
  let recentRemedies = matchedRemedies;
  if (userLang && userLang !== 'en') {
    recentRemedies = matchedRemedies.map(r => {
      const trans = remedyTranslations[r.id]?.[userLang as 'en' | 'hi' | 'te'];
      if (trans) {
        return {
          ...r,
          title: trans.title,
          description: trans.description,
          benefits: trans.benefits,
          ingredients: trans.ingredients,
          preparation: trans.preparation,
          dosage: trans.dosage,
          warnings: trans.warnings
        };
      }
      return r;
    });
  }

  res.json({
    healthScore,
    dailyTip,
    recentRemedies: recentRemedies,
    stats: {
      waterToday: totalWaterToday,
      waterTarget: profile.waterIntake,
      sleepAverage: profile.sleep,
      weight: profile.weight,
      height: profile.height,
      bmi: (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1)
    },
    recentChats: chats.slice(-3).reverse()
  });
});

// ==========================================
// CONTINUOUS SYMPTOM TRACKING & ASHA ESCALATION
// ==========================================

function processSymptomLog(userId: string, symptomText: string, status?: 'better' | 'same' | 'worse') {
  if (!symptomText) return null;
  const lower = symptomText.toLowerCase();

  const knownSymptoms = ['cold', 'fever', 'cough', 'headache', 'stomach ache', 'acid reflux', 'joint pain', 'body ache', 'vomiting', 'diarrhea', 'chest pain'];
  let detectedSymptom = '';
  for (const sym of knownSymptoms) {
    if (lower.includes(sym)) {
      detectedSymptom = sym.charAt(0).toUpperCase() + sym.slice(1);
      break;
    }
  }

  if (!detectedSymptom) {
    const match = lower.match(/(?:having|suffering from|got|feel|felt)\s+([a-z\s]{3,20})/i);
    if (match && match[1]) {
      detectedSymptom = match[1].trim();
    }
  }

  if (!detectedSymptom) return null;

  // Log today's health log for this symptom
  db.addHealthLog({
    id: `log_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type: 'symptoms',
    value: `${detectedSymptom}${status ? ` (${status})` : ''}`,
    notes: `Logged via symptom check-in / chat: "${symptomText}"`,
    loggedAt: new Date().toISOString()
  });

  // Calculate streak of consecutive days logged
  const allLogs = db.getHealthLogs().filter(l => l.userId === userId && l.type === 'symptoms');
  const loggedDates = new Set<string>();
  allLogs.forEach(l => {
    if (l.value.toLowerCase().includes(detectedSymptom.toLowerCase())) {
      loggedDates.add(l.loggedAt.split('T')[0]);
    }
  });

  let streak = 0;
  let checkDate = new Date();
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (loggedDates.has(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Ensure daily symptom check reminder notification exists ("How is your cold today?")
  const activeNotifs = db.getNotifications().filter(n => n.userId === userId);
  const existingReminder = activeNotifs.find(n => 
    n.title.toLowerCase().includes('daily symptom check') && n.message.toLowerCase().includes(detectedSymptom.toLowerCase())
  );

  if (!existingReminder) {
    db.addNotification({
      id: `notif_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      title: `Daily Symptom Check: How is your ${detectedSymptom}?`,
      message: `Daily check-in reminder: How is your ${detectedSymptom} today? Please select if you feel better, same, or worse.`,
      type: 'general',
      time: '09:00',
      isRead: false,
      isEnabled: true,
      createdAt: new Date().toISOString()
    });
  }

  // REQUIREMENT: If patient is having the same symptom for 3 continuous days -> Update ASHA Worker!
  let continuousAlertCreated = false;
  if (streak >= 3) {
    continuousAlertCreated = true;
    const userProfile = db.getProfiles().find(p => p.userId === userId);
    if (userProfile) {
      const alertCond = `🚨 3-DAY CONTINUOUS SYMPTOM ALERT: ${detectedSymptom} (Reported ${streak} consecutive days)`;
      const currentConds = userProfile.medicalConditions || [];
      const updatedConds = currentConds.some(c => c.includes(`3-DAY CONTINUOUS SYMPTOM ALERT: ${detectedSymptom}`))
        ? currentConds
        : [alertCond, ...currentConds];

      const noteStr = `[🚨 3-DAY SYMPTOM ESCALATION ${new Date().toLocaleDateString()}]: Patient reported "${detectedSymptom}" for ${streak} continuous days. Automatically updated to assigned ASHA worker dashboard for home visit checkup.`;

      db.saveProfile({
        ...userProfile,
        riskCategory: 'high',
        medicalConditions: updatedConds,
        notes: userProfile.notes ? `${noteStr}\n\n${userProfile.notes}` : noteStr,
        updatedAt: new Date().toISOString()
      });

      // Add high priority notification for user
      db.addNotification({
        id: `notif_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        title: `🚨 Escalated to ASHA Worker: ${detectedSymptom}`,
        message: `Your ${detectedSymptom} has lasted ${streak} continuous days. An alert has been automatically updated to your assigned ASHA worker for a health checkup visit.`,
        type: 'general',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
        isEnabled: true,
        createdAt: new Date().toISOString()
      });
    }
  }

  return {
    symptom: detectedSymptom,
    streak,
    continuousAlertCreated
  };
}

app.post('/api/symptoms/checkin', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { symptomName, status } = req.body;

  if (!symptomName) {
    res.status(400).json({ error: 'Symptom name is required' });
    return;
  }

  const result = processSymptomLog(userId, symptomName, status);
  res.json({
    success: true,
    symptom: result?.symptom || symptomName,
    streak: result?.streak || 1,
    continuousAlertCreated: result?.continuousAlertCreated || false
  });
});

app.get('/api/symptoms/active', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const logs = db.getHealthLogs().filter(l => l.userId === userId && l.type === 'symptoms');
  
  // Group by symptom
  const symptomStreaks: Record<string, { symptom: string; streak: number; lastLoggedAt: string }> = {};

  logs.forEach(l => {
    const rawVal = l.value.replace(/\s*\([^)]*\)/, '').trim();
    if (!rawVal) return;

    const symKey = rawVal.toLowerCase();
    if (!symptomStreaks[symKey]) {
      // calculate streak
      const loggedDates = new Set<string>();
      logs.forEach(l2 => {
        if (l2.value.toLowerCase().includes(symKey)) {
          loggedDates.add(l2.loggedAt.split('T')[0]);
        }
      });

      let streak = 0;
      let checkDate = new Date();
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (loggedDates.has(dateStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }

      symptomStreaks[symKey] = {
        symptom: rawVal,
        streak,
        lastLoggedAt: l.loggedAt
      };
    }
  });

  res.json(Object.values(symptomStreaks));
});

// ==========================================
// HEALTH LOGS ENDPOINTS
// ==========================================

app.get('/api/health-logs', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const userLogs = db.getHealthLogs().filter(l => l.userId === userId);
  res.json(userLogs);
});

app.post('/api/health-logs', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { type, value, notes } = req.body;

  if (!type || !value) {
    res.status(400).json({ error: 'Type and value are required' });
    return;
  }

  const newLog = db.addHealthLog({
    id: `log_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    value,
    notes,
    loggedAt: new Date().toISOString()
  });

  res.status(201).json(newLog);
});

app.delete('/api/health-logs/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const log = db.getHealthLogs().find(l => l.id === req.params.id);
  if (!log) {
    res.status(404).json({ error: 'Log not found' });
    return;
  }
  if (log.userId !== req.user!.userId) {
    res.status(403).json({ error: 'Unauthorized to delete this log' });
    return;
  }
  db.deleteHealthLog(req.params.id);
  res.json({ success: true });
});

// ==========================================
// REMINDERS / NOTIFICATIONS
// ==========================================

app.get('/api/notifications', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const userNotifications = db.getNotifications().filter(n => n.userId === userId);
  res.json(userNotifications);
});

app.post('/api/notifications', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { title, message, type, time, isEnabled } = req.body;

  const newNotification = db.addNotification({
    id: `not_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title,
    message,
    type: type || 'general',
    time: time || '08:00',
    isRead: false,
    isEnabled: isEnabled !== undefined ? isEnabled : true,
    createdAt: new Date().toISOString()
  });

  res.status(201).json(newNotification);
});

app.put('/api/notifications/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const notif = db.getNotifications().find(n => n.id === req.params.id);
  if (!notif) {
    res.status(404).json({ error: 'Notification reminder not found' });
    return;
  }
  if (notif.userId !== req.user!.userId) {
    res.status(403).json({ error: 'Unauthorized' });
    return;
  }

  db.updateNotification(req.params.id, req.body);
  res.json({ success: true });
});

// ==========================================
// SYSTEM SETTINGS ENDPOINTS
// ==========================================

app.get('/api/settings', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  let settings = db.getSettings().find(s => s.userId === userId);
  if (!settings) {
    settings = db.saveSettings({
      userId,
      language: 'en',
      theme: 'light',
      notificationsEnabled: true,
      voiceEnabled: false,
      voiceName: 'Kore',
      privacyEnabled: true
    });
  }
  res.json(settings);
});

app.post('/api/settings', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const updates = req.body;
  const current = db.getSettings().find(s => s.userId === userId) || {
    userId,
    language: 'en' as const,
    theme: 'light' as const,
    notificationsEnabled: true,
    voiceEnabled: false,
    voiceName: 'Kore',
    privacyEnabled: true
  };

  const updated = db.saveSettings({
    ...current,
    ...updates,
    userId
  });

  res.json(updated);
});

// ==========================================
// CHAT & CHATBOT RAG ENGINE ENDPOINTS
// ==========================================

app.get('/api/chats', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const userChats = db.getChats().filter(c => c.userId === userId);
  res.json(userChats);
});

app.post('/api/chats', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const { title } = req.body;

  const newChat = db.addChat({
    id: `chat_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    title: title || 'New Ayurvedic Session',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  res.status(201).json(newChat);
});

app.delete('/api/chats/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  const chat = db.getChats().find(c => c.id === req.params.id);
  if (!chat) {
    res.status(404).json({ error: 'Chat not found' });
    return;
  }
  if (chat.userId !== req.user!.userId) {
    res.status(403).json({ error: 'Unauthorized to delete this chat' });
    return;
  }
  db.deleteChat(req.params.id);
  res.json({ success: true });
});

app.get('/api/chats/:id/messages', authenticateToken, async (req: AuthRequest, res: Response) => {
  const chatId = req.params.id;
  const lang = req.query.lang as string; // 'en' | 'hi' | 'te'
  const chat = db.getChats().find(c => c.id === chatId);
  
  if (!chat) {
    res.status(404).json({ error: 'Chat not found' });
    return;
  }
  if (chat.userId !== req.user!.userId) {
    res.status(403).json({ error: 'Unauthorized' });
    return;
  }

  const messages = db.getMessages().filter(m => m.chatId === chatId);

  if (lang && lang !== 'en' && messages.length > 0 && ai) {
    try {
      const messagesToTranslate = messages.map(m => ({ id: m.id, text: m.text }));
      
      const prompt = `You are a professional medical translator fluent in English, Hindi, and Telugu.
Translate the following array of chat messages into the target language code: "${lang}" (where "hi" is Hindi, "te" is Telugu, and "en" is English).

CRITICAL INSTRUCTIONS:
1. Preserve all markdown formatting, bullet points, headers (## or ###), emojis, and emergency warnings (🚨) exactly.
2. Return ONLY a valid JSON array of strings in the exact same order. Do NOT include any introductory or concluding text, markdown code blocks, or extra comments.
3. The response must be a parseable JSON array, e.g. ["translated message 1", "translated message 2"]

Messages to translate:
${JSON.stringify(messagesToTranslate.map(m => m.text))}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'ARRAY',
            items: {
              type: 'STRING'
            }
          },
          temperature: 0.1, // Low temperature for factual translation precision
        }
      });

      let cleanedJsonText = (response.text || '').trim();
      if (cleanedJsonText.startsWith('```')) {
        cleanedJsonText = cleanedJsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
      }

      let translatedTexts: string[] = [];
      try {
        translatedTexts = JSON.parse(cleanedJsonText);
      } catch (parseErr) {
        // Fallback sanitize if there are unescaped literal linebreaks inside raw JSON string fields
        try {
          const sanitized = cleanedJsonText.replace(/[\u0000-\u001F\u007F-\u009F]/g, (c) => {
            if (c === '\n') return '\\n';
            if (c === '\r') return '\\r';
            if (c === '\t') return '\\t';
            return '';
          });
          translatedTexts = JSON.parse(sanitized);
        } catch (e2) {
          console.error('Failed to parse translated json even after sanitization:', parseErr);
        }
      }

      if (Array.isArray(translatedTexts) && translatedTexts.length === messages.length) {
        const translatedMessages = messages.map((m, idx) => ({
          ...m,
          text: translatedTexts[idx] || m.text
        }));
        res.json(translatedMessages);
        return;
      }
    } catch (e) {
      console.error('Error translating messages on-the-fly, falling back to original:', e);
    }
  }

  res.json(messages);
});

app.post('/api/chats/:id/messages', authenticateToken, async (req: AuthRequest, res: Response) => {
  const chatId = req.params.id;
  const { text, language: reqLang } = req.body;
  const userId = req.user!.userId;

  const userSettings = db.getSettings().find(s => s.userId === userId);
  const userLang = reqLang || userSettings?.language || 'en';

  if (!text) {
    res.status(400).json({ error: 'Message text is required' });
    return;
  }

  const chat = db.getChats().find(c => c.id === chatId);
  if (!chat) {
    res.status(404).json({ error: 'Chat not found' });
    return;
  }
  if (chat.userId !== userId) {
    res.status(403).json({ error: 'Unauthorized' });
    return;
  }

  // Save user message
  const userMsg = db.addMessage({
    id: `msg_${Math.random().toString(36).substr(2, 9)}`,
    chatId,
    sender: 'user',
    text,
    createdAt: new Date().toISOString()
  });

  // 1. FAST-PATH EMERGENCY DETECTION
  const emergencyCheck = detectEmergency(text);
  if (emergencyCheck.isEmergency) {
    // Sync emergency status directly to Patient Health Profile
    const userProfile = db.getProfiles().find(p => p.userId === userId);
    if (userProfile) {
      const emergencyCondition = `🚨 EMERGENCY: ${emergencyCheck.type} ("${text}")`;
      const currentConditions = userProfile.medicalConditions || [];
      const updatedConditions = currentConditions.includes(emergencyCondition)
        ? currentConditions
        : [emergencyCondition, ...currentConditions];

      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const emergencyNote = `[🚨 EMERGENCY ALERT ${timestamp}]: Patient reported emergency symptoms in AI chat: "${text}" (${emergencyCheck.type}). Immediate ASHA Worker / Emergency Medical intervention required.`;

      db.saveProfile({
        ...userProfile,
        riskCategory: 'high',
        medicalConditions: updatedConditions,
        notes: userProfile.notes ? `${emergencyNote}\n\n${userProfile.notes}` : emergencyNote,
        updatedAt: new Date().toISOString()
      });
    }

    // Add Emergency Notification
    db.addNotification({
      id: `notif_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      title: `🚨 EMERGENCY ALERT: ${emergencyCheck.type}`,
      message: `Patient reported emergency symptom: "${text}". Assigned ASHA Worker & PHC notified immediately.`,
      type: 'general',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      isEnabled: true,
      createdAt: new Date().toISOString()
    });

    logAudit(userId, req.user!.email, 'patient', `EMERGENCY ALERT TRIGGERED: ${emergencyCheck.type}`, `Chat input: "${text}"`, req.ip);

    const alertMessage = `🚨 **EMERGENCY SUSPECTED: ${emergencyCheck.type}** 🚨\n\n${emergencyCheck.recommendation}\n\n*PranAyu AI has automatically alerted your local ASHA Worker & PHC emergency contact.*`;
    
    const botMsg = db.addMessage({
      id: `msg_${Math.random().toString(36).substr(2, 9)}`,
      chatId,
      sender: 'assistant',
      text: alertMessage,
      createdAt: new Date().toISOString()
    });

    res.json({
      userMessage: userMsg,
      botMessage: botMsg
    });
    return;
  }

  // 2. PROCESS SYMPTOM CONTINUITY (e.g. 3-day continuous symptom tracking)
  const symptomLogRes = processSymptomLog(userId, text);

  // 3. RAG RETRIEVAL: Search local remedies/knowledge base
  const retrievedRemedies = db.retrieveRelevantRemedies(text, 3);
  const userProfile = db.getProfiles().find(p => p.userId === userId);
  
  // Create RAG context block
  let ragContext = '';
  if (retrievedRemedies.length > 0) {
    ragContext = retrievedRemedies.map(rem => {
      return `[Remedy: ${rem.title}]
Category: ${rem.category}
Description: ${rem.description}
Ingredients: ${rem.ingredients.join(', ')}
Preparation: ${rem.preparation}
Dosage: ${rem.dosage}
Warnings: ${rem.warnings.join(' | ')}`;
    }).join('\n\n');
  }

  // Get conversation history (last 10 messages for context)
  const history = db.getMessages()
    .filter(m => m.chatId === chatId)
    .slice(-10)
    .map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n');

  // Build the strict System Prompt
  const userMetadataStr = userProfile ? `
User Demographics: Age ${userProfile.age}, Gender ${userProfile.gender}, Weight ${userProfile.weight}kg, Height ${userProfile.height}cm.
Allergies: ${userProfile.allergies && userProfile.allergies.length > 0 ? userProfile.allergies.join(', ') : 'None documented'}.
Medical Conditions: ${userProfile.medicalConditions && userProfile.medicalConditions.length > 0 ? userProfile.medicalConditions.join(', ') : 'None documented'}.
Current Medications: ${userProfile.currentMedication && userProfile.currentMedication.length > 0 ? userProfile.currentMedication.join(', ') : 'None recorded yet in profile'}.
Lifestyle: ${userProfile.lifestyle}, Exercise: ${userProfile.exercise}, Sleep: ${userProfile.sleep} hrs/avg.
` : '';

  const systemInstruction = `You are PranAyu, an intelligent, deeply empathetic, warm, and highly interactive AI Health & Medicine Conversational Companion (powered by Gemini AI, specializing in holistic health, modern/Ayurvedic medicines, dosages, precautions, and remedies).

YOUR CORE CONVERSATIONAL GOALS & INTERACTIVE PERSONALITY:
1. STRICT STEP-BY-STEP INTERACTIVE DIAGNOSTIC FLOW (CRITICAL RULE):
   - When a user mentions a symptom initially (e.g., "I have a fever", "fever", "headache", "cough", "stomach pain"):
     * DO NOT dump a long list of remedies, recipes, or static disclaimers immediately!
     * STEP 1 (Initial symptom mention): Express brief warm empathy (e.g., "I'm so sorry to hear you're dealing with a fever!").
       - IMMEDIATELY ask diagnostic questions about TEMPERATURE and DURATION first!
       - For "fever": Ask "What is your current body temperature (if you've checked with a thermometer), or does it feel like a mild or high fever? How many days have you had it?"
       - ALWAYS include 3-4 "**Quick Options:**" for temperature/duration!
         Example:
         **Quick Options:**
         - Mild fever (~99°F - 100°F)
         - High fever (101°F or higher)
         - Just started today
         - Fever for 2-3 days

     * STEP 2 (When temperature/duration is provided or in the next turn):
       - Acknowledge their temperature and duration.
       - Next, ask specifically about ACCOMPANYING SYMPTOMS like COLD, COUGH, and BODY PAIN!
       - Ask: "Thank you for sharing that. Do you also have a cold, cough, runny nose, sore throat, or body aches/chills?"
       - ALWAYS include 3-4 "**Quick Options:**" for cold/cough symptoms!
         Example:
         **Quick Options:**
         - Yes, I have cold & cough
         - Dry cough & throat irritation
         - Body pain & chills
         - No cold or cough, just fever

     * STEP 3 (ONLY AFTER temperature and cold/cough/symptoms are gathered, or if the user explicitly asks "give me remedies"):
       - NOW provide tailored Ayurvedic home remedies (e.g., Tulsi-Ginger Kadha, Giloy tea, Sudarshan Churna, etc.) along with exact dosage, preparation steps, dietary advice, and safety precautions.
       - Ask if they are currently taking any allopathic medicines (like Paracetamol) and explain dosage timing gaps.
       - ALWAYS end with "**Quick Options:**" for next steps or recipe details!
         Example:
         **Quick Options:**
         - How to prepare Tulsi-Ginger Kadha
         - Taking Paracetamol with herbal tea
         - What foods to eat / avoid during fever

2. INTERACTIVE MEDICINE & DOSAGE COMPANION:
   - Ask if they are taking allopathic medicines (like Paracetamol or antibiotics), check dosages, and explain keeping a 1-hour gap between modern meds and herbal teas.

3. PROACTIVE CONVERSATIONAL FOLLOW-UPS:
   - Keep messages concise, warm, conversational, and caring like a friendly doctor, avoiding overwhelming walls of text.

4. HOLISTIC WELLNESS & AYURVEDA: Integrate Ayurvedic wisdom (Doshas, Agni, Ahara, Vihara, herbal remedies) with modern medicine awareness.

5. MEDICAL SAFETY:
   - If emergency red-flag symptoms are present (chest pain, acute breathlessness, fever > 103°F in adults or > 100.4°F in infants, stiff neck, severe bleeding), urge immediate emergency medical care.

6. MANDATORY LANGUAGE RULE: The target UI language requested by the user is "${userLang === 'te' ? 'TELUGU (తెలుగు)' : userLang === 'hi' ? 'HINDI (हिन्दी)' : 'ENGLISH'}". Regardless of the language or script the user typed in, YOU MUST GENERATE YOUR ENTIRE RESPONSE IN ${userLang === 'te' ? 'Telugu (తెలుగు లిపి)' : userLang === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.

${userMetadataStr ? `--- USER HEALTH PROFILE ---${userMetadataStr}` : ''}

${ragContext ? `--- RETRIEVED AYURVEDIC KNOWLEDGE BASE (RAG) ---
${ragContext}
` : ''}
`;

  // 3. AI GENERATION (Server-Side)
  let responseText = '';
  try {
    if (!ai) {
      throw new Error('Gemini API client not configured. Missing GEMINI_API_KEY.');
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        { role: 'user', parts: [{ text: `Conversation History:\n${history}\n\nLatest User Query: ${text}` }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    responseText = response.text || 'I apologize. I am unable to formulate a response right now. Please consult an Ayurvedic practitioner.';
  } catch (err: any) {
    console.error('Gemini Generation Error:', err);
    
    // Graceful fallback if Gemini API key is missing or fails
    if (retrievedRemedies.length > 0) {
      responseText = `I apologize, our full conversational engine is temporarily unavailable, but I found these relevant Ayurvedic remedies in our knowledge base for you:\n\n` + 
        retrievedRemedies.map(rem => `### ${rem.title}\n**Category:** ${rem.category}\n**Description:** ${rem.description}\n**Ingredients:** ${rem.ingredients.join(', ')}\n**Preparation:**\n${rem.preparation}\n**Dosage:** ${rem.dosage}\n**Warnings:** ${rem.warnings.join(' | ')}`).join('\n\n') +
        `\n\n*Please consult an Ayurvedic doctor or medical professional for custom care.*`;
    } else {
      responseText = `I apologize, I am experiencing temporary connectivity issues and cannot retrieve Ayurvedic knowledge. Please consult an Ayurvedic professional or try again shortly.`;
    }
  }

  // Save Assistant message
  const botMsg = db.addMessage({
    id: `msg_${Math.random().toString(36).substr(2, 9)}`,
    chatId,
    sender: 'assistant',
    text: responseText,
    createdAt: new Date().toISOString()
  });

  res.json({
    userMessage: userMsg,
    botMessage: botMsg
  });
});

// ==========================================
// ACCOUNT TERMINATION ENDPOINT
// ==========================================

app.post('/api/user/delete', authenticateToken, (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  db.deleteUserAccount(userId);
  res.json({ success: true, message: 'Account and all associated health records deleted successfully.' });
});

// ==========================================
// STATIC ASSETS / FRONTEND INTEGRATION
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite development middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PranAyu backend running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
