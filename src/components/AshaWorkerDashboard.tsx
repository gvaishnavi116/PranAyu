import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Search, Filter, Phone, AlertTriangle, HeartPulse, 
  UserCheck, Baby, ShieldAlert, Calendar, Plus, Edit, CheckCircle, CheckCircle2,
  MapPin, Activity, Stethoscope, ChevronRight, X, Loader2, RefreshCw,
  Download, FileText, Bell, CheckSquare, Clock, Map, Sparkles, Navigation,
  Droplets, Pill, Thermometer, ShieldCheck, PieChart as PieIcon, BarChart2
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar 
} from 'recharts';
import { Language, translations } from '../utils/translations';
import { Profile } from '../db/db';
import { triggerDirectEmergencyCall } from '../utils/emergency';

interface AshaWorkerDashboardProps {
  language: Language;
  token: string;
}

// Chart Data Enriched Mock Generators
const DISEASE_DISTRIBUTION = [
  { name: 'Fever / Seasonal Flu', count: 42, color: '#f59e0b' },
  { name: 'Common Cold', count: 35, color: '#3b82f6' },
  { name: 'Anemia (Low Hb)', count: 28, color: '#ef4444' },
  { name: 'Hypertension', count: 22, color: '#8b5cf6' },
  { name: 'Diabetes', count: 18, color: '#10b981' },
  { name: 'Child Malnutrition', count: 14, color: '#ec4899' }
];

const MONTHLY_GROWTH = [
  { month: 'Feb', patients: 85, highRisk: 12, visits: 110 },
  { month: 'Mar', patients: 98, highRisk: 15, visits: 130 },
  { month: 'Apr', patients: 112, highRisk: 18, visits: 145 },
  { month: 'May', patients: 125, highRisk: 21, visits: 160 },
  { month: 'Jun', patients: 138, highRisk: 24, visits: 180 },
  { month: 'Jul', patients: 152, highRisk: 29, visits: 210 }
];

const AGE_DISTRIBUTION = [
  { ageGroup: '0-5 Yrs (Child)', count: 28 },
  { ageGroup: '6-18 Yrs (Youth)', count: 32 },
  { ageGroup: '19-45 Yrs (Adult)', count: 54 },
  { ageGroup: '46-60 Yrs (Middle)', count: 26 },
  { ageGroup: '60+ Yrs (Senior)', count: 18 }
];

const GENDER_DISTRIBUTION = [
  { name: 'Female', value: 88, color: '#ec4899' },
  { name: 'Male', value: 58, color: '#3b82f6' },
  { name: 'Children', value: 28, color: '#f59e0b' }
];

const VILLAGE_DISTRIBUTION = [
  { village: 'Rampur Sector 1', total: 62, highRisk: 14, pregnant: 12 },
  { village: 'Sitapur Sector 2', total: 48, highRisk: 9, pregnant: 8 },
  { village: 'Devpur Sector 3', total: 42, highRisk: 6, pregnant: 5 }
];

const SEASONAL_TRENDS = [
  { month: 'Jan', Dengue: 2, Malaria: 1, ViralFever: 15, Respiratory: 20 },
  { month: 'Mar', Dengue: 1, Malaria: 2, ViralFever: 22, Respiratory: 18 },
  { month: 'May', Dengue: 4, Malaria: 5, ViralFever: 35, Respiratory: 12 },
  { month: 'Jul (Monsoon)', Dengue: 12, Malaria: 18, ViralFever: 48, Respiratory: 28 }
];

const CHATBOT_REMEDIES_USAGE = [
  { remedy: 'Tulsi Ginger Kadha', recommendations: 84 },
  { remedy: 'Shatavari Churna', recommendations: 62 },
  { remedy: 'Punarnava Mandur', recommendations: 45 },
  { remedy: 'Sitopaladi Churna', recommendations: 39 },
  { remedy: 'Triphala Tea', recommendations: 31 }
];

export default function AshaWorkerDashboard({ language, token }: AshaWorkerDashboardProps) {
  const t = translations[language];
  const [patients, setPatients] = useState<Profile[]>([]);
  const [alertsList, setAlertsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation View Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'monitoring' | 'map' | 'tasks' | 'alerts'>('overview');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('All Villages');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All Risk Levels');
  const [selectedGender, setSelectedGender] = useState('All Genders');
  const [selectedPregnancyStatus, setSelectedPregnancyStatus] = useState('All');

  // Patient Detail Drawer / Form
  const [activePatient, setActivePatient] = useState<Profile | null>(null);
  const [visitNoteText, setVisitNoteText] = useState('');
  const [newMedicationText, setNewMedicationText] = useState('');
  const [newConditionText, setNewConditionText] = useState('');
  const [newRiskCategory, setNewRiskCategory] = useState<Profile['riskCategory']>('low');
  const [resolutionReasonText, setResolutionReasonText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Today's Task Checklist State
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'High-risk HB checkup for Sita Devi', village: 'Rampur', category: 'Pregnant Checkup', completed: false, urgency: 'high' },
    { id: 't2', title: 'Child polio vaccination visit (Baby Aarav)', village: 'Sitapur', category: 'Vaccination', completed: true, urgency: 'medium' },
    { id: 't3', title: 'Hypertension follow-up for Ramesh Verma', village: 'Devpur', category: 'Senior Care', completed: false, urgency: 'medium' },
    { id: 't4', title: 'Iron-folic acid tablet distribution', village: 'Rampur', category: 'Anemia Care', completed: false, urgency: 'low' },
    { id: 't5', title: 'Emergency fever check - Radha Kumari', village: 'Rampur', category: 'Emergency', completed: false, urgency: 'critical' }
  ]);

  useEffect(() => {
    fetchPatients();
    fetchAlerts();
    const interval = setInterval(() => {
      fetchPatients();
      fetchAlerts();
    }, 4000);
    return () => clearInterval(interval);
  }, [searchQuery, selectedVillage, selectedRiskLevel, token]);

  const fetchPatients = async () => {
    try {
      let url = '/api/asha/patients';
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedVillage !== 'All Villages') params.append('village', selectedVillage);
      if (selectedRiskLevel !== 'All Risk Levels') params.append('riskCategory', selectedRiskLevel.toLowerCase());

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setPatients(data);
      }
    } catch (e) {
      console.error('Error fetching ASHA patient list', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await fetch('/api/asha/alerts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAlertsList(data);
      }
    } catch (e) {
      console.error('Error fetching alerts list', e);
    }
  };

  const handleOpenPatient = (p: Profile) => {
    setActivePatient(p);
    setVisitNoteText(p.notes || '');
    setNewMedicationText(p.currentMedication ? p.currentMedication.join(', ') : '');
    setNewConditionText(p.medicalConditions ? p.medicalConditions.join(', ') : '');
    setNewRiskCategory(p.riskCategory || 'low');
    setResolutionReasonText('');
    setUpdateSuccess(false);
  };

  const handleUpdatePatientRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePatient) return;

    setIsUpdating(true);
    try {
      const updatedMedications = newMedicationText.split(',').map(s => s.trim()).filter(Boolean);
      let updatedConditions = newConditionText.split(',').map(s => s.trim()).filter(Boolean);

      let updatedNote = visitNoteText;
      if (resolutionReasonText.trim()) {
        const resolutionHeader = `[RESOLVED / RISK LEVEL CHANGED TO ${newRiskCategory.toUpperCase()} on ${new Date().toLocaleDateString()}]: ${resolutionReasonText.trim()}`;
        updatedNote = updatedNote ? `${resolutionHeader}\n\n${updatedNote}` : resolutionHeader;
      }

      // If downgraded to Green (low) or Yellow (child/pregnant), clean alert markers in medical conditions
      if ((newRiskCategory === 'low' || newRiskCategory === 'child') && resolutionReasonText.trim()) {
        updatedConditions = updatedConditions.map(c => {
          if (c.includes('🚨') || c.toLowerCase().includes('3-day') || c.toLowerCase().includes('alert')) {
            return `[RESOLVED]: ${c.replace(/🚨/g, '').trim()}`;
          }
          return c;
        });
      }

      const res = await fetch(`/api/asha/patients/${activePatient.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          notes: updatedNote,
          currentMedication: updatedMedications,
          medicalConditions: updatedConditions,
          riskCategory: newRiskCategory
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setActivePatient(updated);
        setVisitNoteText(updated.notes || '');
        setNewConditionText(updated.medicalConditions ? updated.medicalConditions.join(', ') : '');
        setResolutionReasonText('');
        setPatients(prev => prev.map(p => p.userId === updated.userId ? updated : p));
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to update patient record', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleExportReport = (reportName: string) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Patient ID,Full Name,Village,Risk Category,Medical Conditions,Mobile Number\n"
      + patients.map(p => `"${p.userId}","${p.fullName}","${p.village || 'Rampur'}","${p.riskCategory || 'low'}","${(p.medicalConditions||[]).join('; ')}","${p.mobileNumber||''}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ASHA_Report_${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculated Metrics
  const totalAssigned = patients.length || 152;
  const activePatients = patients.filter(p => p.riskCategory !== 'low').length || 48;
  
  const emergencyPatientsList = patients.filter(p => 
    p.riskCategory === 'high' || 
    p.riskCategory === 'chronic' || 
    (p.medicalConditions && p.medicalConditions.some(c => c.includes('🚨') || c.toLowerCase().includes('heart') || c.toLowerCase().includes('chest') || c.toLowerCase().includes('emergency')))
  );

  const highRiskPatients = emergencyPatientsList.length || 18;
  const pregnantWomen = patients.filter(p => p.riskCategory === 'pregnant').length || 15;
  const childrenUnder5 = patients.filter(p => p.riskCategory === 'child').length || 24;
  const seniorCitizens = patients.filter(p => p.riskCategory === 'senior').length || 18;
  const followUpRequired = 12;
  const todaysVisits = 8;
  const missedVisits = 2;
  const completedVisits = 6;
  const upcomingAppointments = 14;
  const emergencyAlertsCount = alertsList.length || emergencyPatientsList.length;

  // Helper to resolve exact badge styling and colors according to selected option labels
  const getBadgeConfig = (p: Profile) => {
    const hasEmergencyCond = p.medicalConditions && p.medicalConditions.some(c => 
      c.includes('🚨') || 
      c.toLowerCase().includes('heart') || 
      c.toLowerCase().includes('chest') || 
      c.toLowerCase().includes('emergency')
    );

    if (hasEmergencyCond) {
      return {
        bg: 'bg-rose-600 text-white border-rose-700 shadow-sm animate-pulse',
        dot: 'bg-white animate-ping',
        label: '🚨 EMERGENCY CASE',
        rowBg: 'bg-rose-100/90 hover:bg-rose-200 border-l-4 border-l-rose-600',
        selectBg: 'bg-rose-100 border-rose-400 text-rose-900 font-bold'
      };
    }

    const category = (p.riskCategory || 'low').toLowerCase();

    switch (category) {
      case 'high':
        return {
          bg: 'bg-rose-100 text-rose-900 border-rose-300 shadow-sm font-bold',
          dot: 'bg-rose-600',
          label: t.statusHighRisk || 'High Risk Case',
          rowBg: 'bg-rose-50/40 hover:bg-rose-100/50',
          selectBg: 'bg-rose-100 border-rose-300 text-rose-900 font-bold'
        };
      case 'chronic':
        return {
          bg: 'bg-red-100 text-red-900 border-red-300 shadow-sm font-bold',
          dot: 'bg-red-600',
          label: 'Chronic Condition',
          rowBg: 'bg-red-50/40 hover:bg-red-100/50',
          selectBg: 'bg-red-100 border-red-300 text-red-900 font-bold'
        };
      case 'pregnant':
        return {
          bg: 'bg-orange-100 text-orange-900 border-orange-300 shadow-sm font-bold',
          dot: 'bg-orange-500',
          label: t.statusPregnant || 'Pregnant Mother',
          rowBg: 'bg-orange-50/40 hover:bg-orange-100/50',
          selectBg: 'bg-orange-100 border-orange-300 text-orange-900 font-bold'
        };
      case 'child':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm font-bold',
          dot: 'bg-amber-500',
          label: t.statusChild || 'Child (<5 Yrs)',
          rowBg: 'bg-amber-50/40 hover:bg-amber-100/50',
          selectBg: 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
        };
      case 'senior':
        return {
          bg: 'bg-purple-100 text-purple-900 border-purple-300 shadow-sm font-bold',
          dot: 'bg-purple-600',
          label: 'Senior Citizen',
          rowBg: 'bg-purple-50/40 hover:bg-purple-100/50',
          selectBg: 'bg-purple-100 border-purple-300 text-purple-900 font-bold'
        };
      case 'low':
      case 'healthy':
      default:
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-sm font-bold',
          dot: 'bg-emerald-600',
          label: t.statusHealthy || 'Healthy',
          rowBg: 'hover:bg-stone-50',
          selectBg: 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
        };
    }
  };

  const getSelectStyleClass = (cat: string) => {
    switch (cat) {
      case 'low': return 'bg-emerald-100 border-emerald-400 text-emerald-900 font-extrabold';
      case 'high': return 'bg-rose-100 border-rose-400 text-rose-900 font-extrabold';
      case 'pregnant': return 'bg-orange-100 border-orange-400 text-orange-900 font-extrabold';
      case 'child': return 'bg-amber-100 border-amber-400 text-amber-900 font-extrabold';
      case 'senior': return 'bg-purple-100 border-purple-400 text-purple-900 font-extrabold';
      case 'chronic': return 'bg-red-100 border-red-400 text-red-900 font-extrabold';
      default: return 'bg-stone-50 border-stone-200 text-slate-900 font-bold';
    }
  };

  // Filtered Patients List - Emergency cases prioritized at top
  const filteredPatients = patients.filter(p => {
    const matchesSearch = !searchQuery || p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || (p.village && p.village.toLowerCase().includes(searchQuery.toLowerCase())) || p.userId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVillage = selectedVillage === 'All Villages' || p.village === selectedVillage;
    const matchesRisk = selectedRiskLevel === 'All Risk Levels' || 
      p.riskCategory === selectedRiskLevel.toLowerCase() ||
      (selectedRiskLevel.toLowerCase() === 'low' && (p.riskCategory === 'healthy' || !p.riskCategory));
    const matchesGender = selectedGender === 'All Genders' || p.gender === selectedGender;
    const matchesPregnancy = selectedPregnancyStatus === 'All' || (selectedPregnancyStatus === 'Pregnant Only' ? p.riskCategory === 'pregnant' : p.riskCategory !== 'pregnant');
    return matchesSearch && matchesVillage && matchesRisk && matchesGender && matchesPregnancy;
  }).sort((a, b) => {
    const aEmerg = a.riskCategory === 'high' || (a.medicalConditions && a.medicalConditions.some(c => c.includes('🚨') || c.toLowerCase().includes('heart') || c.toLowerCase().includes('chest') || c.toLowerCase().includes('emergency')));
    const bEmerg = b.riskCategory === 'high' || (b.medicalConditions && b.medicalConditions.some(c => c.includes('🚨') || c.toLowerCase().includes('heart') || c.toLowerCase().includes('chest') || c.toLowerCase().includes('emergency')));
    if (aEmerg && !bEmerg) return -1;
    if (!aEmerg && bEmerg) return 1;
    return 0;
  });

  return (
    <div id="asha_analytics_dashboard_main" className="space-y-8 select-none">
      
      {/* Real-time Immediate Emergency Alert Banner */}
      {emergencyPatientsList.length > 0 && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-5 shadow-2xl border-2 border-red-300 animate-pulse relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-white/20 rounded-2xl shrink-0">
                <AlertTriangle className="h-6 w-6 text-white animate-bounce" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-white text-red-700 font-extrabold rounded-full text-[10px] uppercase tracking-wider shadow">
                    🚨 CRITICAL EMERGENCY ALERT ({emergencyPatientsList.length} Active)
                  </span>
                  <span className="text-xs text-red-100 font-mono">Real-Time Sync Active</span>
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  {emergencyPatientsList[0].fullName} ({emergencyPatientsList[0].village || 'Rampur'}) - Emergency Situation Detected!
                </h3>
                <p className="text-xs text-red-100 font-medium">
                  {emergencyPatientsList[0].medicalConditions?.find(c => c.includes('🚨') || c.toLowerCase().includes('heart') || c.toLowerCase().includes('chest') || c.toLowerCase().includes('emergency')) || 'Patient reported emergency symptom (e.g. Heart Pain / Chest Discomfort) via Patient AI Chat!'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenPatient(emergencyPatientsList[0])}
                className="px-4 py-2.5 bg-white text-red-700 hover:bg-red-50 font-extrabold rounded-xl text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                <span>View Emergency Case / Action</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Power BI Style Banner Header */}
      <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/30 text-xs font-semibold">
              <Stethoscope className="h-3.5 w-3.5 text-rose-400" />
              <span>National Health Mission • ASHA Field Analytics Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Rampur PHC Community Health Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Real-time epidemiological insights, maternal milestone tracking, high-risk patient surveillance, and field visit management.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleExportReport('Village_Health_Overview')}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold shadow-lg transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export Power BI Report</span>
            </button>

            <button
              onClick={fetchPatients}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all cursor-pointer"
              title="Refresh Live Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2 pb-1 scrollbar-none">
        {[
          { id: 'overview', label: '12-Metric Overview', icon: BarChart2 },
          { id: 'analytics', label: 'Interactive Charts & Trends', icon: PieIcon },
          { id: 'monitoring', label: 'Patient Surveillance Panel', icon: Activity },
          { id: 'map', label: 'Village GIS Spatial Map', icon: Map },
          { id: 'tasks', label: "Today's Field Tasks", icon: CheckSquare },
          { id: 'alerts', label: 'Emergency Notifications', icon: Bell }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-t-2xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                active 
                  ? 'border-rose-700 bg-rose-50/90 text-rose-950 shadow-sm' 
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-stone-50'
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? 'text-rose-700' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: 12-Metric Overview Cards */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm hover:border-emerald-300 transition-all">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-bold uppercase">Total Patients</span>
                <Users className="h-4 w-4 text-emerald-700" />
              </div>
              <p className="text-2xl font-serif font-bold text-slate-900">{totalAssigned}</p>
              <p className="text-[10px] text-emerald-700 font-semibold">100% Village Coverage</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-bold uppercase">Active Care</span>
                <Activity className="h-4 w-4 text-blue-700" />
              </div>
              <p className="text-2xl font-serif font-bold text-blue-900">{activePatients}</p>
              <p className="text-[10px] text-blue-700 font-semibold">Under active monitoring</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm hover:border-rose-300 transition-all">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-bold uppercase">High Risk</span>
                <AlertTriangle className="h-4 w-4 text-rose-700" />
              </div>
              <p className="text-2xl font-serif font-bold text-rose-800">{highRiskPatients}</p>
              <p className="text-[10px] text-rose-700 font-semibold">Requires Doctor Referral</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm hover:border-pink-300 transition-all">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-bold uppercase">Pregnant Mothers</span>
                <HeartPulse className="h-4 w-4 text-pink-600" />
              </div>
              <p className="text-2xl font-serif font-bold text-pink-800">{pregnantWomen}</p>
              <p className="text-[10px] text-pink-700 font-semibold">ANC Checkup due</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm hover:border-amber-300 transition-all">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-bold uppercase">Children &lt; 5 Yrs</span>
                <Baby className="h-4 w-4 text-amber-600" />
              </div>
              <p className="text-2xl font-serif font-bold text-amber-900">{childrenUnder5}</p>
              <p className="text-[10px] text-amber-700 font-semibold">Immunization tracked</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm hover:border-purple-300 transition-all">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-bold uppercase">Senior Citizens</span>
                <ShieldCheck className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-2xl font-serif font-bold text-purple-900">{seniorCitizens}</p>
              <p className="text-[10px] text-purple-700 font-semibold">NCD screening complete</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-stone-900 text-white p-4 rounded-2xl space-y-1 shadow-md">
              <span className="text-[10px] font-bold uppercase text-stone-400">Follow-up Needed</span>
              <p className="text-2xl font-serif font-bold text-amber-400">{followUpRequired}</p>
              <p className="text-[10px] text-stone-300">Overdue visits</p>
            </div>

            <div className="bg-stone-900 text-white p-4 rounded-2xl space-y-1 shadow-md">
              <span className="text-[10px] font-bold uppercase text-stone-400">Today's Visits</span>
              <p className="text-2xl font-serif font-bold text-emerald-400">{todaysVisits}</p>
              <p className="text-[10px] text-stone-300">{completedVisits} Completed / {missedVisits} Missed</p>
            </div>

            <div className="bg-stone-900 text-white p-4 rounded-2xl space-y-1 shadow-md">
              <span className="text-[10px] font-bold uppercase text-stone-400">Upcoming Appointments</span>
              <p className="text-2xl font-serif font-bold text-blue-400">{upcomingAppointments}</p>
              <p className="text-[10px] text-stone-300">Next 7 days</p>
            </div>

            <div className="bg-rose-950 text-white p-4 rounded-2xl space-y-1 shadow-md border border-rose-800">
              <span className="text-[10px] font-bold uppercase text-rose-300">Emergency Alerts</span>
              <p className="text-2xl font-serif font-bold text-rose-400">{emergencyAlertsCount}</p>
              <p className="text-[10px] text-rose-200">High fever / SOS</p>
            </div>

            <div className="bg-stone-900 text-white p-4 rounded-2xl space-y-1 shadow-md col-span-2">
              <span className="text-[10px] font-bold uppercase text-stone-400">Medication Adherence Rate</span>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-serif font-bold text-emerald-400">88.4%</p>
                <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '88.4%' }} />
                </div>
              </div>
              <p className="text-[10px] text-stone-300">Target: 85% National Benchmark</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Charts & Analytics (Power BI / Looker Studio style) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Disease Distribution */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">Community Disease Distribution</h3>
                  <p className="text-xs text-slate-500">Most prevalent conditions across Rampur PHC sector</p>
                </div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">Monsoon Surge</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DISEASE_DISTRIBUTION} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                    <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} width={110} />
                    <Tooltip />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {DISEASE_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Monthly Patient & High-Risk Growth */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">Monthly Health Growth & Home Visits</h3>
                  <p className="text-xs text-slate-500">Surveillance progression over 6 months</p>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">+18% MoM</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MONTHLY_GROWTH} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHighRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <Tooltip />
                    <Area type="monotone" dataKey="visits" name="Home Visits" stroke="#059669" fillOpacity={1} fill="url(#colorVisits)" />
                    <Area type="monotone" dataKey="highRisk" name="High Risk Cases" stroke="#e11d48" fillOpacity={1} fill="url(#colorHighRisk)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart 3: Gender & Demographics */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-slate-900 text-base">Demographic Composition</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={GENDER_DISTRIBUTION} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                      {GENDER_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend textAnchor="middle" wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Village-wise Patient Breakdown */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-slate-900 text-base">Village Sector Comparison</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={VILLAGE_DISTRIBUTION}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="village" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="total" name="Total Patients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="pregnant" name="Pregnant" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 5: Most Common Remedies */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-slate-900 text-base">Top Ayurvedic AI Advice</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHATBOT_REMEDIES_USAGE} layout="vertical">
                    <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                    <YAxis dataKey="remedy" type="category" stroke="#475569" fontSize={10} width={110} />
                    <Tooltip />
                    <Bar dataKey="recommendations" name="AI Suggests" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: Patient Surveillance & Monitoring Panel */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-lg">Patient Surveillance Panel</h3>
                <p className="text-xs text-slate-500">Color-coded real-time triage for assigned households</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Follow-up
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-800 rounded-full font-bold">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Moderate Risk
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 rounded-full font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> High Risk
                </div>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              <div className="relative">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.ashaSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-700/20 text-slate-800"
                />
              </div>

              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800 font-semibold"
              >
                <option value="All Villages">All Villages</option>
                <option value="Rampur">Rampur</option>
                <option value="Sitapur">Sitapur</option>
                <option value="Devpur">Devpur</option>
              </select>

              <select
                value={selectedRiskLevel}
                onChange={(e) => setSelectedRiskLevel(e.target.value)}
                className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800 font-semibold"
              >
                <option value="All Risk Levels">All Risk Levels</option>
                <option value="Low">Low Risk / Healthy</option>
                <option value="High">High Risk</option>
                <option value="Pregnant">Pregnant Mothers</option>
                <option value="Child">Children &lt; 5</option>
                <option value="Senior">Seniors</option>
              </select>

              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800 font-semibold"
              >
                <option value="All Genders">All Genders</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>

              <select
                value={selectedPregnancyStatus}
                onChange={(e) => setSelectedPregnancyStatus(e.target.value)}
                className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800 font-semibold"
              >
                <option value="All">All Statuses</option>
                <option value="Pregnant Only">Pregnant Mothers Only</option>
              </select>
            </div>

            {/* Interactive Monitoring Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-100/80 text-slate-700 border-y border-stone-200">
                    <th className="p-3 font-bold">Patient Name & ID</th>
                    <th className="p-3 font-bold">Village</th>
                    <th className="p-3 font-bold">Assigned ASHA</th>
                    <th className="p-3 font-bold">Status & Risk</th>
                    <th className="p-3 font-bold">Conditions / Symptoms</th>
                    <th className="p-3 font-bold">Medication</th>
                    <th className="p-3 font-bold">Last Visit</th>
                    <th className="p-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPatients.map(p => {
                    const badge = getBadgeConfig(p);
                    const isEmergency = badge.label.includes('EMERGENCY');

                    return (
                      <tr key={p.userId} className={`${badge.rowBg} transition-colors`}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                <span>{p.fullName}</span>
                                {isEmergency && (
                                  <span className="px-2 py-0.5 bg-rose-600 text-white text-[9px] font-extrabold rounded-md animate-pulse">
                                    🚨 EMERGENCY
                                  </span>
                                )}
                              </p>
                              <p className="text-[10px] text-slate-500">ID: {p.userId} • {p.gender}, {p.age} Yrs</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-slate-700">
                          {p.village || 'Rampur'}
                        </td>
                        <td className="p-3">
                          {p.assignedAshaName ? (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-md text-[10px] font-bold inline-flex items-center gap-1">
                              <UserCheck className="h-3 w-3 text-emerald-700" />
                              {p.assignedAshaName}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[10px] font-medium italic">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 border ${badge.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700">
                          {p.medicalConditions && p.medicalConditions.length > 0 ? (
                            <span className={isEmergency ? 'font-extrabold text-rose-800 bg-rose-100/80 px-2 py-1 rounded-lg border border-rose-200 inline-block' : 'font-semibold'}>
                              {p.medicalConditions.join(', ')}
                            </span>
                          ) : (
                            <span className="text-slate-400">Routine Check</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-600">
                          {p.currentMedication && p.currentMedication.length > 0 ? (
                            <span>{p.currentMedication.slice(0, 2).join(', ')}</span>
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </td>
                        <td className="p-3 text-slate-500 text-[11px]">
                          {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : 'Yesterday'}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => triggerDirectEmergencyCall(p.mobileNumber || '+919876500000')}
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1"
                              title="Call Patient Directly"
                            >
                              <Phone className="h-3 w-3" />
                              <span>Call</span>
                            </button>
                            <button
                              onClick={() => handleOpenPatient(p)}
                              className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-[11px] font-bold shadow-sm transition-all cursor-pointer"
                            >
                              Update Field Note
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Interactive Village Map & Spatial View */}
      {activeTab === 'map' && (
        <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">Rampur Sector Spatial Health Map</h3>
              <p className="text-xs text-slate-500">GIS overlay showing patient density, PHC center, nearby hospitals, and pharmacies</p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-rose-500" /> High Risk Hotspot</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500" /> Primary Health Center</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Jan Aushadhi Pharmacy</span>
            </div>
          </div>

          {/* Interactive Vector GIS Canvas */}
          <div className="w-full h-96 bg-stone-900 rounded-3xl relative overflow-hidden p-6 flex flex-col justify-between border border-stone-800 shadow-inner">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Map Labels & Nodes */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-stone-950/80 backdrop-blur-md p-3 rounded-2xl border border-stone-800 text-white text-xs space-y-1">
                <p className="font-bold text-emerald-400">Rampur Rural District Sector 4</p>
                <p className="text-[10px] text-stone-400">Coordinates: 26.8467° N, 80.9462° E</p>
              </div>

              <div className="bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800 text-white text-[11px] font-bold">
                Live GPS Active
              </div>
            </div>

            {/* Village Cluster Nodes */}
            <div className="relative z-10 grid grid-cols-3 gap-6 my-auto">
              
              {/* Node 1: Rampur */}
              <div className="bg-slate-900/90 border border-rose-500/50 p-4 rounded-2xl text-white space-y-2 relative group hover:border-rose-400 transition-all cursor-pointer">
                <div className="absolute -top-3 -right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                  14 High Risk
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  <h4 className="font-bold text-sm">Rampur Village</h4>
                </div>
                <p className="text-[11px] text-stone-300">62 Households • 12 Pregnant Mothers</p>
                <div className="text-[10px] text-rose-300 font-semibold">Nearest PHC: 1.2 km</div>
              </div>

              {/* Node 2: Sitapur */}
              <div className="bg-slate-900/90 border border-blue-500/50 p-4 rounded-2xl text-white space-y-2 relative group hover:border-blue-400 transition-all cursor-pointer">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <h4 className="font-bold text-sm">Sitapur Sector</h4>
                </div>
                <p className="text-[11px] text-stone-300">48 Households • 9 High Risk</p>
                <div className="text-[10px] text-emerald-300 font-semibold">Pharmacy: 0.5 km</div>
              </div>

              {/* Node 3: Devpur */}
              <div className="bg-slate-900/90 border border-emerald-500/50 p-4 rounded-2xl text-white space-y-2 relative group hover:border-emerald-400 transition-all cursor-pointer">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <h4 className="font-bold text-sm">Devpur PHC Hub</h4>
                </div>
                <p className="text-[11px] text-stone-300">Main District Hospital & Ambulance Stand</p>
                <div className="text-[10px] text-emerald-400 font-semibold">108 Emergency Standby</div>
              </div>

            </div>

            <div className="relative z-10 flex justify-between items-center text-[11px] text-stone-400">
              <span>Map Data © Survey of India • NHM GIS Layer</span>
              <span className="font-bold text-white">ASHA Field Route Optimized</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Today's Tasks & Checklists */}
      {activeTab === 'tasks' && (
        <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">Today's Scheduled Field Work</h3>
              <p className="text-xs text-slate-500">Prioritized checklist for household visits & checkups</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold">
              {tasks.filter(t => t.completed).length} / {tasks.length} Done
            </span>
          </div>

          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  task.completed 
                    ? 'bg-stone-50 border-stone-200 opacity-60 line-through' 
                    : task.urgency === 'critical' ? 'bg-rose-50 border-rose-200 text-rose-950 font-bold'
                    : 'bg-white border-stone-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="h-5 w-5 rounded border-stone-300 text-rose-700 focus:ring-rose-700"
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">{task.title}</p>
                    <p className="text-[11px] text-slate-500">
                      Village: <span className="font-semibold text-slate-700">{task.village}</span> • Category: <span className="font-semibold text-rose-800">{task.category}</span>
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  task.urgency === 'critical' ? 'bg-rose-600 text-white' :
                  task.urgency === 'high' ? 'bg-amber-100 text-amber-800' :
                  'bg-stone-100 text-slate-600'
                }`}>
                  {task.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Emergency Alerts & Notifications */}
      {activeTab === 'alerts' && (
        <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">Emergency Alerts & System Notifications</h3>
              <p className="text-xs text-slate-500">Automated AI anomaly detection & real-time patient chat sync</p>
            </div>
            <span className="px-3 py-1 bg-rose-100 text-rose-900 rounded-full text-xs font-bold border border-rose-200">
              {alertsList.length > 0 ? `${alertsList.length} Active Emergency Alerts` : 'System Normal'}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {alertsList.length > 0 ? (
              alertsList.map((alt: any) => {
                const targetPatient = patients.find(p => p.userId === alt.patientId);
                return (
                  <div key={alt.id} className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-rose-950 text-sm">🚨 {alt.patientName} ({alt.village})</p>
                          <span className="px-2 py-0.5 bg-rose-600 text-white font-mono text-[9px] rounded-md font-bold uppercase">CRITICAL</span>
                        </div>
                        <p className="text-rose-900 font-bold">{alt.type}</p>
                        <p className="text-rose-700 text-[11px]">{alt.notes}</p>
                        <p className="text-[10px] text-rose-500 font-mono">Mobile: {alt.mobileNumber} • Last Sync: {new Date(alt.updatedAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                    {targetPatient && (
                      <button
                        onClick={() => handleOpenPatient(targetPatient)}
                        className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
                      >
                        Update Field Record
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-6 bg-stone-50 border border-stone-200 rounded-2xl text-center text-slate-500 font-medium">
                No active emergency alerts recorded. System is operating normally.
              </div>
            )}

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-950">Pregnancy Milestone Alert - Sunita Devi</p>
                <p className="text-amber-800">Entered 3rd Trimester (Week 28). ANC 3rd visit and Tetanus Toxoid booster immunization due this week.</p>
                <span className="text-[10px] text-amber-600 font-mono">1 hour ago</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
              <Pill className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-blue-950">Missed Iron-Folic Acid Dose</p>
                <p className="text-blue-800">2 pregnant mothers in Sitapur reported missed weekly IFA supplement intake.</p>
                <span className="text-[10px] text-blue-500 font-mono">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Detail Modal Drawer */}
      <AnimatePresence>
        {activePatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end p-4"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="w-full max-w-lg bg-white h-full rounded-3xl p-6 overflow-y-auto space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setActivePatient(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-2 border-b border-stone-200 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getBadgeConfig(activePatient).bg}`}>
                    <span className={`w-2 h-2 rounded-full ${getBadgeConfig(activePatient).dot}`} />
                    <span>{getBadgeConfig(activePatient).label}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">ID: {activePatient.userId}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">{activePatient.fullName}</h3>
                <p className="text-xs text-slate-500">
                  {activePatient.gender}, {activePatient.age} Yrs • Village: <span className="font-bold text-slate-800">{activePatient.village || 'Rampur'}</span>
                </p>
              </div>

              <form onSubmit={handleUpdatePatientRecord} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">{t.triageStatusLabel || 'Triage Risk Level Status'}</label>
                  <select
                    value={newRiskCategory}
                    onChange={(e) => setNewRiskCategory(e.target.value as any)}
                    className={`w-full p-3 border rounded-xl text-xs transition-colors cursor-pointer ${getSelectStyleClass(newRiskCategory)}`}
                  >
                    <option value="low" className="bg-emerald-100 text-emerald-900 font-bold">{t.riskGreenOpt || '🟢 Green - Low Risk / Resolved / Recovered'}</option>
                    <option value="child" className="bg-amber-100 text-amber-900 font-bold">{t.riskYellowOpt || '🟡 Yellow - Moderate Risk / Child / Under Observation'}</option>
                    <option value="high" className="bg-rose-100 text-rose-900 font-bold">{t.riskRedOpt || '🔴 Red - High Risk Case / Urgent'}</option>
                    <option value="pregnant" className="bg-orange-100 text-orange-900 font-bold">{t.riskOrangeOpt || '🟠 Orange - Pregnant Mother'}</option>
                    <option value="senior" className="bg-purple-100 text-purple-900 font-bold">{t.riskPurpleOpt || '🟣 Purple - Senior Citizen'}</option>
                    <option value="chronic" className="bg-red-100 text-red-900 font-bold">{t.riskRedOpt || '🔴 Red - Chronic Condition'}</option>
                  </select>
                </div>

                {/* 🟢 Condition Resolution & Reason Input Box */}
                <div className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{t.resolutionReasonLabel || 'Condition Resolution Reason / How Problem Was Solved'}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-snug">
                    {t.resolutionReasonHelp || "If patient's symptoms/condition have improved or resolved, specify how it was resolved below. This reason will be logged for Admin Supervision."}
                  </p>
                  <textarea
                    rows={3}
                    value={resolutionReasonText}
                    onChange={(e) => setResolutionReasonText(e.target.value)}
                    placeholder={t.resolutionReasonPlaceholder || 'e.g. Prescribed Tulsi & Ginger Kadha + STEAM inhalation. Fever & cold completely subsided after 2 days. Recovery confirmed during home visit.'}
                    className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Current Medical Conditions (Comma separated)</label>
                  <input
                    type="text"
                    value={newConditionText}
                    onChange={(e) => setNewConditionText(e.target.value)}
                    placeholder={t.ashaConditionsPlaceholder}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Prescribed Medications / Ayurvedic Remedies</label>
                  <input
                    type="text"
                    value={newMedicationText}
                    onChange={(e) => setNewMedicationText(e.target.value)}
                    placeholder={t.ashaMedsPlaceholder}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">ASHA Home Visit Field Notes</label>
                  <textarea
                    rows={4}
                    value={visitNoteText}
                    onChange={(e) => setVisitNoteText(e.target.value)}
                    placeholder={t.ashaNotesPlaceholder}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex justify-center items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>Save Field Visit Record</span>}
                </button>

                {updateSuccess && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-[11px] font-bold text-center">
                    Field Visit Record Saved Successfully!
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
