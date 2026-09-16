import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Users, Stethoscope, FileText, Activity, Database, 
  Search, Filter, Plus, Trash2, Edit, CheckCircle, RefreshCw, 
  MapPin, AlertTriangle, ChevronRight, Upload, BookOpen, Clock, Lock, Download, Zap, Cpu, Server,
  CheckCircle2, HeartPulse, ShieldAlert, X, UserCheck, UserPlus
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Language, translations } from '../utils/translations';
import { Profile, AuditLog, KnowledgeDocument, Remedy } from '../db/db';

interface AdminDashboardProps {
  language: Language;
  token: string;
}

const DISTRICT_DISEASE_TRENDS = [
  { month: 'Jan', Rampur: 45, Sitapur: 32, Devpur: 28 },
  { month: 'Mar', Rampur: 52, Sitapur: 38, Devpur: 31 },
  { month: 'May', Rampur: 68, Sitapur: 46, Devpur: 42 },
  { month: 'Jul', Rampur: 92, Sitapur: 74, Devpur: 65 }
];

const MONTHLY_REGISTRATIONS = [
  { month: 'Feb', patients: 120, ashaWorkers: 12 },
  { month: 'Mar', patients: 145, ashaWorkers: 15 },
  { month: 'Apr', patients: 180, ashaWorkers: 18 },
  { month: 'May', patients: 210, ashaWorkers: 22 },
  { month: 'Jun', patients: 250, ashaWorkers: 25 },
  { month: 'Jul', patients: 310, ashaWorkers: 28 }
];

const MOST_ASKED_QUESTIONS = [
  { topic: 'Fever & Kadha Recipe', count: 342 },
  { topic: 'Anemia Hb Improvement', count: 289 },
  { topic: 'Postnatal Diet Advice', count: 215 },
  { topic: 'Child Weight & Malnutrition', count: 178 },
  { topic: 'BP & Salt Reduction', count: 142 }
];

const MEDICINE_USAGE_TRENDS = [
  { name: 'Paracetamol', usage: 480 },
  { name: 'Iron Folic Acid (IFA)', usage: 420 },
  { name: 'Punarnava Mandur', usage: 310 },
  { name: 'Shatavari Churna', usage: 260 },
  { name: 'ORS & Zinc', usage: 220 }
];

export default function AdminDashboard({ language, token }: AdminDashboardProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'analytics' | 'patients' | 'asha' | 'knowledge' | 'remedies' | 'audit'>('analytics');
  
  // Data States
  const [analytics, setAnalytics] = useState<any>(null);
  const [patients, setPatients] = useState<Profile[]>([]);
  const [ashaWorkers, setAshaWorkers] = useState<Profile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDocument[]>([]);
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [selectedPatientForAssign, setSelectedPatientForAssign] = useState<Profile | null>(null);
  const [assignVillage, setAssignVillage] = useState('Rampur');
  const [assignPhc, setAssignPhc] = useState('Rampur Primary Health Center');
  const [selectedAshaId, setSelectedAshaId] = useState('');
  const [assignRiskCategory, setAssignRiskCategory] = useState<string>('low');
  const [assignSuccess, setAssignSuccess] = useState(false);

  // New Member Modal State
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newMemName, setNewMemName] = useState('');
  const [newMemAge, setNewMemAge] = useState('28');
  const [newMemGender, setNewMemGender] = useState('Female');
  const [newMemMobile, setNewMemMobile] = useState('');
  const [newMemVillage, setNewMemVillage] = useState('Rampur');
  const [newMemPhc, setNewMemPhc] = useState('Rampur Primary Health Center');
  const [newMemRisk, setNewMemRisk] = useState('low');
  const [newMemAshaId, setNewMemAshaId] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Knowledge Upload Modal
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Maternal & Child Health');
  const [newDocFormat, setNewDocFormat] = useState<'txt' | 'pdf' | 'docx'>('pdf');
  const [newDocContent, setNewDocContent] = useState('');
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, [token]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [resAnal, resPat, resAsha, resAudit, resKdoc, resRem] = await Promise.all([
        fetch('/api/admin/analytics', { headers }),
        fetch('/api/admin/patients', { headers }),
        fetch('/api/admin/asha-workers', { headers }),
        fetch('/api/admin/audit-logs', { headers }),
        fetch('/api/admin/knowledge-base', { headers }),
        fetch('/api/remedies', { headers })
      ]);

      if (resAnal.ok) setAnalytics(await resAnal.json());
      if (resPat.ok) setPatients(await resPat.json());
      if (resAsha.ok) setAshaWorkers(await resAsha.json());
      if (resAudit.ok) setAuditLogs(await resAudit.json());
      if (resKdoc.ok) setKnowledgeDocs(await resKdoc.json());
      if (resRem.ok) setRemedies(await resRem.json());
    } catch (e) {
      console.error('Failed to load admin dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientForAssign) return;

    try {
      const res = await fetch('/api/admin/assign-patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          patientId: selectedPatientForAssign.userId,
          ashaId: selectedAshaId || undefined,
          village: assignVillage,
          phcCenter: assignPhc,
          riskCategory: assignRiskCategory
        })
      });

      if (res.ok) {
        setAssignSuccess(true);
        setTimeout(() => setAssignSuccess(false), 3000);
        fetchAllData();
      }
    } catch (e) {
      console.error('Failed patient assignment', e);
    }
  };

  const handleRegisterNewPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemName.trim()) return;

    setIsRegistering(true);
    try {
      const res = await fetch('/api/admin/create-patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fullName: newMemName,
          age: Number(newMemAge) || 28,
          gender: newMemGender,
          mobileNumber: newMemMobile,
          village: newMemVillage,
          phcCenter: newMemPhc,
          riskCategory: newMemRisk,
          assignedAshaId: newMemAshaId || undefined
        })
      });

      if (res.ok) {
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterSuccess(false);
          setShowRegisterModal(false);
          setNewMemName('');
          setNewMemMobile('');
        }, 1500);
        fetchAllData();
      }
    } catch (e) {
      console.error('Failed creating patient member', e);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleUploadKnowledgeDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle || !newDocContent) return;

    setIsUploadingDoc(true);
    try {
      const res = await fetch('/api/admin/knowledge-base', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newDocTitle,
          category: newDocCategory,
          fileFormat: newDocFormat,
          content: newDocContent
        })
      });

      if (res.ok) {
        setUploadSuccess(true);
        setNewDocTitle('');
        setNewDocContent('');
        setTimeout(() => setUploadSuccess(false), 3000);
        fetchAllData();
      }
    } catch (e) {
      console.error('Failed knowledge document upload', e);
    } finally {
      setIsUploadingDoc(false);
    }
  };

  const handleDeleteKnowledgeDoc = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/knowledge-base/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchAllData();
    } catch (e) {
      console.error('Failed deleting knowledge doc', e);
    }
  };

  return (
    <div id="admin_system_dashboard" className="space-y-8 select-none">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>State Healthcare Director Console</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              PranAyu System Administration & RBAC
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Oversee rural patient assignments, ASHA field workers, AYUSH knowledge base RAG indices, and system audit security logs.
            </p>
          </div>

          <button
            onClick={fetchAllData}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sync System Metrics</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2 pb-1 scrollbar-none">
        {[
          { id: 'analytics', label: 'System Analytics', icon: Activity },
          { id: 'patients', label: 'Patient Assignment', icon: Users },
          { id: 'asha', label: 'ASHA Workers', icon: Stethoscope },
          { id: 'knowledge', label: 'Knowledge Base RAG', icon: BookOpen },
          { id: 'remedies', label: 'Ayurvedic Remedies', icon: Database },
          { id: 'audit', label: 'Security Audit Logs', icon: Lock }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-t-2xl transition-all cursor-pointer whitespace-nowrap border-b-2 ${
                active 
                  ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 shadow-sm' 
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-stone-50'
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? 'text-emerald-700' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Administrator System Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Top Operational Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Patients</span>
              <p className="text-xl font-serif font-bold text-slate-900">{analytics?.totalPatients || 152}</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-blue-700">ASHA Workers</span>
              <p className="text-xl font-serif font-bold text-blue-900">{analytics?.totalAshaWorkers || 12}</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-emerald-700">Villages Covered</span>
              <p className="text-xl font-serif font-bold text-emerald-900">3 Sectors</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-purple-700">AI Chatbot Queries</span>
              <p className="text-xl font-serif font-bold text-purple-900">1,420</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-pink-700">KB RAG Index</span>
              <p className="text-xl font-serif font-bold text-pink-900">{knowledgeDocs.length || 18} Docs</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-amber-700">Avg Response</span>
              <p className="text-xl font-serif font-bold text-amber-900">1.18 sec</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-teal-700">New Registrations</span>
              <p className="text-xl font-serif font-bold text-teal-900">+48 / Mo</p>
            </div>

            <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-1 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-rose-700">System Uptime</span>
              <p className="text-xl font-serif font-bold text-rose-800">99.98%</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center bg-stone-100 p-4 rounded-2xl">
            <div>
              <p className="font-serif font-bold text-slate-900 text-sm">State & District Health Report Generator</p>
              <p className="text-xs text-slate-500">Download compiled analytics for National Health Mission submission</p>
            </div>
            <button
              onClick={() => {
                const csv = "Metric,Value\nTotal Patients,152\nASHA Workers,12\nAI Queries,1420\nAvg AI Response Time,1.18s\nSystem Uptime,99.98%\n";
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Admin_State_Health_Summary_${new Date().toISOString().slice(0,10)}.csv`;
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export All State Reports</span>
            </button>
          </div>

          {/* Interactive Recharts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Disease Trends Across Districts */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">District-wide Disease Trends</h3>
                  <p className="text-xs text-slate-500">Comparative health load across Rampur, Sitapur & Devpur</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Quarterly</span>
              </div>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DISTRICT_DISEASE_TRENDS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="Rampur" stroke="#e11d48" strokeWidth={2} />
                    <Line type="monotone" dataKey="Sitapur" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="Devpur" stroke="#059669" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Monthly New Registrations */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-base">Monthly Registrations & ASHA Onboarding</h3>
                  <p className="text-xs text-slate-500">Growth trajectory over the past 6 months</p>
                </div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">+24% YoY</span>
              </div>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MONTHLY_REGISTRATIONS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip />
                    <Area type="monotone" dataKey="patients" name="Patients" stroke="#059669" fill="#d1fae5" />
                    <Area type="monotone" dataKey="ashaWorkers" name="ASHA Staff" stroke="#2563eb" fill="#dbeafe" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 3: Most Asked AI Questions */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-slate-900 text-base">Most Frequently Asked Health Queries (AI Chat)</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOST_ASKED_QUESTIONS} layout="vertical">
                    <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                    <YAxis dataKey="topic" type="category" stroke="#475569" fontSize={10} width={130} />
                    <Tooltip />
                    <Bar dataKey="count" name="Queries" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 4: Medicine Usage Trends */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-slate-900 text-base">Medicine & Herbal Supplement Dispensing</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MEDICINE_USAGE_TRENDS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="usage" name="Doses Dispensed" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Patient Assignment System & Resolution Supervision */}
      {activeTab === 'patients' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg">{t.adminSupervisionTitle || 'Patient Directory & Case Supervision'}</h3>
                  <p className="text-xs text-slate-500">{t.adminSupervisionSub || 'Assign ASHA workers, supervise patient risk status, and monitor field resolution logs.'}</p>
                </div>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl text-xs font-bold shadow-md transition-all cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>+ Register New Member</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-1/2">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.adminSearchPlaceholder || 'Search by member name or village...'}
                    className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setRiskFilter('all')}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                      riskFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                    }`}
                  >
                    All ({patients.length})
                  </button>
                  <button
                    onClick={() => setRiskFilter('high')}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                      riskFilter === 'high' ? 'bg-rose-600 text-white shadow-xs' : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                    }`}
                  >
                    🔴 {t.statusHighRisk || 'High Risk'} ({patients.filter(p => (p.riskCategory||'').includes('high') || (p.riskCategory||'').includes('chronic')).length})
                  </button>
                  <button
                    onClick={() => setRiskFilter('low')}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                      riskFilter === 'low' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    🟢 {t.statusHealthy || 'Green / Resolved'} ({patients.filter(p => (p.riskCategory||'low') === 'low').length})
                  </button>
                </div>
              </div>

              <div className="divide-y divide-stone-100 max-h-[440px] overflow-y-auto pr-1">
                {patients
                  .filter(p => {
                    const matchSearch = !searchQuery || p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || p.village?.toLowerCase().includes(searchQuery.toLowerCase());
                    if (!matchSearch) return false;
                    if (riskFilter === 'high') return p.riskCategory === 'high' || p.riskCategory === 'chronic';
                    if (riskFilter === 'low') return (p.riskCategory || 'low') === 'low';
                    return true;
                  })
                  .map(p => {
                    const hasResolvedNote = p.notes && (p.notes.includes('[RESOLVED') || p.notes.includes('RISK LEVEL CHANGED'));
                    return (
                      <div
                        key={p.userId}
                        onClick={() => {
                          setSelectedPatientForAssign(p);
                          setAssignVillage(p.village || 'Rampur');
                          setAssignPhc(p.phcCenter || 'Rampur Primary Health Center');
                          setSelectedAshaId(p.assignedAshaId || '');
                          setAssignRiskCategory(p.riskCategory || 'low');
                        }}
                        className={`py-3.5 px-3 rounded-2xl transition-all cursor-pointer flex justify-between items-center ${
                          selectedPatientForAssign?.userId === p.userId ? 'bg-emerald-50 border border-emerald-200 shadow-xs' : 'hover:bg-stone-50'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{p.fullName}</h4>
                            {hasResolvedNote && (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold text-[9px] rounded-full border border-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                <span>{t.conditionResolvedBadge || 'Condition Resolved'}</span>
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                            <span>Village: <strong className="text-slate-700">{p.village || 'Rampur'}</strong></span>
                            <span>•</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              (p.riskCategory || 'low').toLowerCase() === 'high' || (p.riskCategory || 'low').toLowerCase() === 'chronic' ? 'bg-rose-100 text-rose-900 border-rose-300' :
                              (p.riskCategory || 'low').toLowerCase() === 'pregnant' ? 'bg-orange-100 text-orange-900 border-orange-300' :
                              (p.riskCategory || 'low').toLowerCase() === 'child' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                              (p.riskCategory || 'low').toLowerCase() === 'senior' ? 'bg-purple-100 text-purple-900 border-purple-300' :
                              'bg-emerald-100 text-emerald-900 border-emerald-300'
                            }`}>
                              {p.riskCategory === 'low' ? `🟢 ${t.statusHealthy || 'Healthy/Resolved'}` : p.riskCategory === 'high' ? `🔴 ${t.statusHighRisk || 'High Risk'}` : p.riskCategory}
                            </span>
                            <span>•</span>
                            <span className="text-[10px] font-semibold text-slate-700 bg-stone-100 px-2 py-0.5 rounded-md">
                              👥 ASHA: {p.assignedAshaName || 'Unassigned'}
                            </span>
                          </div>
                        </div>

                        <button className="px-3 py-1.5 bg-stone-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 rounded-xl text-[11px] font-bold transition-colors shrink-0">
                          {t.inspectAssignBtn || 'Inspect & Assign'}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Assignment & Case Supervision Form */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-5 shadow-sm h-fit">
              <h3 className="font-serif font-bold text-slate-900 text-base">Assign ASHA & Control Health Status</h3>
              {selectedPatientForAssign ? (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 text-sm">{selectedPatientForAssign.fullName}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        selectedPatientForAssign.riskCategory === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Status: {selectedPatientForAssign.riskCategory || 'low'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">ID: {selectedPatientForAssign.userId} • Age: {selectedPatientForAssign.age} Yrs • Mobile: {selectedPatientForAssign.mobileNumber || 'N/A'}</p>
                  </div>

                  {/* Display ASHA Field Resolution Reason Log */}
                  {selectedPatientForAssign.notes ? (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{t.ashaResolutionLogTitle || 'ASHA Field Resolution Log'}</span>
                      </div>
                      <p className="text-[11px] text-emerald-900 leading-relaxed font-sans whitespace-pre-line bg-white/70 p-2.5 rounded-xl border border-emerald-100">
                        {selectedPatientForAssign.notes}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl text-[11px] text-slate-400 italic">
                      No field resolution notes entered yet by assigned ASHA worker.
                    </div>
                  )}

                  <form onSubmit={handleAssignPatient} className="space-y-3 pt-2 border-t border-stone-100">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 flex items-center justify-between">
                        <span>Assign ASHA Field Worker</span>
                        {selectedAshaId && <span className="text-[10px] text-emerald-700 font-bold">Assigned</span>}
                      </label>
                      <select
                        value={selectedAshaId}
                        onChange={(e) => setSelectedAshaId(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">-- Unassigned --</option>
                        {ashaWorkers.map(a => (
                          <option key={a.userId} value={a.userId}>
                            {a.fullName} ({a.village || 'Rampur Sector'})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Patient Health Status</label>
                      <select
                        value={assignRiskCategory}
                        onChange={(e) => setAssignRiskCategory(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="low">🟢 Green - Healthy / Resolved</option>
                        <option value="high">🔴 Red - High Risk Emergency</option>
                        <option value="pregnant">🟠 Orange - Pregnant Mother</option>
                        <option value="child">🟡 Yellow - Child (&lt;5 Yrs)</option>
                        <option value="senior">🟣 Purple - Senior Citizen</option>
                        <option value="chronic">🟤 Brown - Chronic NCD Care</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Assigned Village</label>
                      <select
                        value={assignVillage}
                        onChange={(e) => setAssignVillage(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                      >
                        <option value="Rampur">Rampur</option>
                        <option value="Sitapur">Sitapur</option>
                        <option value="Devpur">Devpur</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Primary Health Center (PHC)</label>
                      <input
                        type="text"
                        value={assignPhc}
                        onChange={(e) => setAssignPhc(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                    >
                      Save Patient Assignment & Status
                    </button>

                    {assignSuccess && (
                      <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-[11px] font-bold text-center border border-emerald-300">
                        Assignment & Status Saved Successfully!
                      </div>
                    )}
                  </form>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Select a patient from the directory to assign ASHA worker & control health status.</p>
              )}
            </div>
          </div>

          {/* District ASHA Case Resolution Audit Ledger */}
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <h3 className="font-serif font-bold text-slate-900 text-base">{t.districtLedgerTitle || 'District ASHA Field Case Resolution Ledger'}</h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {patients.filter(p => p.notes && p.notes.includes('[RESOLVED')).length} {t.resolvedCasesCount || 'Resolved Cases'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients
                .filter(p => p.notes && (p.notes.includes('[RESOLVED') || p.notes.includes('RISK LEVEL CHANGED')))
                .map(p => (
                  <div key={p.userId} className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-slate-900 text-xs">{p.fullName}</p>
                      <span className="px-2 py-0.5 bg-emerald-600 text-white font-mono text-[9px] rounded-md font-bold">
                        {t.resolvedTag || 'RESOLVED'} ({p.riskCategory || 'low'})
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-950 font-medium bg-white p-2.5 rounded-xl border border-emerald-200 line-clamp-3">
                      {p.notes}
                    </p>
                    <p className="text-[10px] text-slate-400">Village: {p.village || 'Rampur'} • Patient ID: {p.userId}</p>
                  </div>
                ))}

              {patients.filter(p => p.notes && (p.notes.includes('[RESOLVED') || p.notes.includes('RISK LEVEL CHANGED'))).length === 0 && (
                <div className="col-span-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-center text-xs text-slate-500">
                  {t.noResolvedCases || 'No case resolutions logged yet today. When ASHA workers update patient conditions from Red to Green/Yellow with a resolution reason, they will appear here for supervision.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: ASHA Workers List */}
      {activeTab === 'asha' && (
        <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-lg">ASHA Health Field Force Directory</h3>
              <p className="text-xs text-slate-500">Supervise ASHA workforce, view assigned patient loads, and reassign cases</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-stone-100 px-3 py-1 rounded-full">{ashaWorkers.length} Active ASHA Workers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ashaWorkers.map(a => {
              const assignedPatientsList = patients.filter(p => p.assignedAshaId === a.userId);
              return (
                <div key={a.userId} className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                        {a.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{a.fullName}</h4>
                        <p className="text-xs text-slate-500">Village: <span className="font-bold text-slate-700">{a.village || 'Rampur'}</span></p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold text-xs rounded-full border border-emerald-300">
                      {assignedPatientsList.length} Assigned Members
                    </span>
                  </div>

                  {/* Display list of assigned patients under this ASHA worker */}
                  {assignedPatientsList.length > 0 ? (
                    <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1.5 text-xs">
                      <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Assigned Members:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {assignedPatientsList.map(pat => (
                          <span key={pat.userId} className="px-2 py-0.5 bg-stone-100 border border-stone-200 text-slate-800 text-[11px] font-semibold rounded-md">
                            {pat.fullName} ({pat.riskCategory || 'low'})
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
                      No members assigned yet. Click "Manage / Assign" below to link field cases.
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-200 text-xs flex justify-between items-center text-slate-600">
                    <span>Mobile: {a.mobileNumber || '+91 98765 99999'}</span>
                    <button
                      onClick={() => {
                        setActiveTab('patients');
                        if (assignedPatientsList.length > 0) {
                          setSelectedPatientForAssign(assignedPatientsList[0]);
                        }
                        setSelectedAshaId(a.userId);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                    >
                      Manage / Assign
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Knowledge Base RAG Manager */}
      {activeTab === 'knowledge' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-slate-900 text-lg">AYUSH RAG Knowledge Base Index</h3>
              <span className="text-xs text-slate-500 font-semibold">{knowledgeDocs.length} Indexed Files</span>
            </div>

            <div className="space-y-3">
              {knowledgeDocs.map(doc => (
                <div key={doc.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold uppercase">{doc.fileFormat}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{doc.content}</p>
                    <p className="text-[10px] text-slate-400">Uploaded by: {doc.uploadedBy} • {new Date(doc.createdAt).toLocaleDateString()}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteKnowledgeDoc(doc.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload New Document Form */}
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm h-fit">
            <h3 className="font-serif font-bold text-slate-900 text-base">Index New Knowledge File</h3>
            <form onSubmit={handleUploadKnowledgeDoc} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Document Title</label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder={t.adminTitlePlaceholder}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Category</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Maternal & Child Health">Maternal & Child</option>
                    <option value="Respiratory Health">Respiratory</option>
                    <option value="Field Operations">Field Ops</option>
                    <option value="Herbal Remedies">Herbal Remedies</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Format</label>
                  <select
                    value={newDocFormat}
                    onChange={(e) => setNewDocFormat(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="docx">DOCX Word</option>
                    <option value="txt">TXT Plain Text</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Knowledge Content / Text</label>
                <textarea
                  rows={4}
                  required
                  value={newDocContent}
                  onChange={(e) => setNewDocContent(e.target.value)}
                  placeholder={t.adminKnowledgePlaceholder}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isUploadingDoc}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span>Index into RAG Vector Store</span>
              </button>

              {uploadSuccess && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-[11px] font-bold text-center">
                  Indexed into RAG Knowledge Store!
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Tab 5: Remedies Management */}
      {activeTab === 'remedies' && (
        <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-slate-900 text-lg">Curated Ayurvedic Remedies</h3>
            <span className="text-xs text-slate-500 font-semibold">{remedies.length} High Quality Remedies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remedies.map(r => (
              <div key={r.id} className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded uppercase">{r.category}</span>
                <h4 className="font-bold text-slate-900 text-sm">{r.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{r.description}</p>
                <p className="text-[10px] text-emerald-800 font-bold">Image Status: Medically Approved SVG</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Security Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-slate-900 text-lg">System Security Audit Trail</h3>
            <span className="text-xs text-slate-500 font-semibold">{auditLogs.length} Security Audit Entries</span>
          </div>

          <div className="divide-y divide-stone-100 max-h-96 overflow-y-auto">
            {auditLogs.map(log => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      log.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      log.role === 'asha_worker' ? 'bg-blue-100 text-blue-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {log.role}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px]">User: {log.userEmail} • Resource: <span className="font-semibold text-slate-700">{log.resource}</span></p>
                </div>

                <div className="text-right text-[10px] text-slate-400 font-mono">
                  <p>{new Date(log.timestamp).toLocaleString()}</p>
                  <p>IP: {log.ipAddress || '127.0.0.1'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Register New Patient Member Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl border border-stone-200">
            <div className="flex justify-between items-center pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-lg">Register New Member</h3>
                <p className="text-xs text-slate-500">Add a patient to district registry & assign ASHA worker</p>
              </div>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterNewPatient} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meena Kumari"
                  value={newMemName}
                  onChange={(e) => setNewMemName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Age (Years)</label>
                  <input
                    type="number"
                    value={newMemAge}
                    onChange={(e) => setNewMemAge(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Gender</label>
                  <select
                    value={newMemGender}
                    onChange={(e) => setNewMemGender(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 12345"
                    value={newMemMobile}
                    onChange={(e) => setNewMemMobile(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Village</label>
                  <select
                    value={newMemVillage}
                    onChange={(e) => setNewMemVillage(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800"
                  >
                    <option value="Rampur">Rampur</option>
                    <option value="Sitapur">Sitapur</option>
                    <option value="Devpur">Devpur</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Health Status Category</label>
                <select
                  value={newMemRisk}
                  onChange={(e) => setNewMemRisk(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800 font-semibold"
                >
                  <option value="low">🟢 Green - Healthy / Normal</option>
                  <option value="high">🔴 Red - High Risk Emergency</option>
                  <option value="pregnant">🟠 Orange - Pregnant Mother</option>
                  <option value="child">🟡 Yellow - Child (&lt;5 Yrs)</option>
                  <option value="senior">🟣 Purple - Senior Citizen</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Assign ASHA Field Worker</label>
                <select
                  value={newMemAshaId}
                  onChange={(e) => setNewMemAshaId(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-slate-800 font-semibold"
                >
                  <option value="">-- Unassigned --</option>
                  {ashaWorkers.map(a => (
                    <option key={a.userId} value={a.userId}>
                      {a.fullName} ({a.village || 'Rampur Sector'})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isRegistering && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
                <span>Register Member & Assign ASHA</span>
              </button>

              {registerSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold text-center border border-emerald-300">
                  Member registered & ASHA assigned successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
