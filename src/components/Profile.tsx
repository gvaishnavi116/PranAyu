import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck, HeartPulse, Sparkles, Loader2, Compass, AlertCircle, FileText, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { Language, translations } from '../utils/translations';

export interface UserProfile {
  fullName: string;
  role?: 'patient' | 'asha_worker' | 'admin';
  age: number;
  gender: string;
  village?: string;
  mobileNumber?: string;
  emergencyContact?: string;
  phcCenter?: string;
  riskCategory?: 'low' | 'high' | 'pregnant' | 'child' | 'senior' | 'chronic';
  weight: number;
  height: number;
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  currentMedication: string[];
  lifestyle: string;
  sleep: number;
  waterIntake: number;
  exercise: string;
  smoking: boolean;
  alcohol: boolean;
  consentGiven?: boolean;
  consentTimestamp?: string;
  
  // Health Questionnaire & Onboarding State
  profileCompleted?: boolean;
  primaryDosha?: string;
  primaryHealthGoal?: string;
  dietType?: string;
  digestionStatus?: string;
  sleepQuality?: string;
}

interface ProfileProps {
  language: Language;
  token: string;
  isMandatoryOnboarding?: boolean;
  onProfileSaved?: (updatedProfile: UserProfile) => void;
}

export default function Profile({ language, token, isMandatoryOnboarding = false, onProfileSaved }: ProfileProps) {
  const t = translations[language];
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form input temporary states for list items
  const [allergyInput, setAllergyInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [medicationInput, setMedicationInput] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const merged = {
          ...data,
          primaryDosha: data.primaryDosha || 'unknown',
          primaryHealthGoal: data.primaryHealthGoal || 'Immunity & Energy',
          dietType: data.dietType || 'Vegetarian',
          digestionStatus: data.digestionStatus || 'Normal',
          sleepQuality: data.sleepQuality || 'Restful & Deep',
          village: data.village || '',
          emergencyContact: data.emergencyContact || '',
          riskCategory: data.riskCategory || 'low'
        };
        setProfile(merged);
        localStorage.setItem('pranayu_user_profile', JSON.stringify(merged));
      } else {
        throw new Error('Could not fetch from server');
      }
    } catch (e) {
      console.warn('Error fetching profile, loading offline cached profile', e);
      const cached = localStorage.getItem('pranayu_user_profile');
      if (cached) {
        try {
          setProfile(JSON.parse(cached));
        } catch (_) {}
      } else {
        // Default initial profile for offline user
        setProfile({
          fullName: 'Patient',
          age: 30,
          gender: 'Female',
          weight: 60,
          height: 165,
          bloodGroup: 'O+',
          allergies: [],
          medicalConditions: [],
          currentMedication: [],
          lifestyle: 'active',
          sleep: 7,
          waterIntake: 2.5,
          exercise: 'walking',
          smoking: false,
          alcohol: false,
          profileCompleted: false
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setSaving(true);
    setAlertMessage(null);

    const ageParsed = parseInt(String(profile.age), 10);
    const updatedProfilePayload: UserProfile = {
      ...profile,
      age: isNaN(ageParsed) || ageParsed <= 0 ? 28 : ageParsed,
      ...profile,
      profileCompleted: true, // Mark compulsory onboarding as completed!
      consentGiven: true,
      consentTimestamp: new Date().toISOString()
    };

    // Store in localStorage immediately
    localStorage.setItem('pranayu_user_profile', JSON.stringify(updatedProfilePayload));

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedProfilePayload)
      });

      if (res.ok) {
        const savedData = await res.json();
        setProfile(savedData);
        localStorage.setItem('pranayu_user_profile', JSON.stringify(savedData));
      }
    } catch (err: any) {
      console.warn('Network offline while saving profile. Saved to local storage.', err);
    }

    setAlertMessage({ type: 'success', text: isMandatoryOnboarding ? 'Patient details saved successfully! Opening PranAyu...' : t.saveSuccess });
    
    if (onProfileSaved) {
      setTimeout(() => {
        onProfileSaved(updatedProfilePayload);
      }, 800);
    } else {
      setTimeout(() => setAlertMessage(null), 3000);
    }
    setSaving(false);
  };

  const handleAddAllergy = () => {
    if (!allergyInput.trim() || !profile) return;
    setProfile({
      ...profile,
      allergies: [...profile.allergies, allergyInput.trim()]
    });
    setAllergyInput('');
  };

  const handleRemoveAllergy = (idx: number) => {
    if (!profile) return;
    setProfile({
      ...profile,
      allergies: profile.allergies.filter((_, i) => i !== idx)
    });
  };

  const handleAddCondition = () => {
    if (!conditionInput.trim() || !profile) return;
    setProfile({
      ...profile,
      medicalConditions: [...profile.medicalConditions, conditionInput.trim()]
    });
    setConditionInput('');
  };

  const handleRemoveCondition = (idx: number) => {
    if (!profile) return;
    setProfile({
      ...profile,
      medicalConditions: profile.medicalConditions.filter((_, i) => i !== idx)
    });
  };

  const handleAddMedication = () => {
    if (!medicationInput.trim() || !profile) return;
    setProfile({
      ...profile,
      currentMedication: [...profile.currentMedication, medicationInput.trim()]
    });
    setMedicationInput('');
  };

  const handleRemoveMedication = (idx: number) => {
    if (!profile) return;
    setProfile({
      ...profile,
      currentMedication: profile.currentMedication.filter((_, i) => i !== idx)
    });
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center gap-3">
        <Loader2 className="h-10 w-10 text-emerald-700 animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Retrieving patient record files...</span>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div id="health_profile_suite" className="max-w-4xl mx-auto space-y-6 select-none pb-12">
      
      {/* Onboarding Callout Banner (if mandatory onboarding) */}
      {isMandatoryOnboarding ? (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900 text-stone-100 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl space-y-3 relative overflow-hidden border border-emerald-700/50"
        >
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-widest">
            <AlertCircle className="h-4 w-4 text-emerald-400" />
            <span>{t.compulsoryFirstStep}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {t.welcomePatientTitle}
          </h2>
          <p className="text-stone-300 text-sm max-w-2xl leading-relaxed">
            {t.welcomePatientDesc}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-emerald-700" />
            <h3 className="text-2xl font-serif font-bold text-slate-900">{t.profileTab} & {t.healthQuestionnaire}</h3>
          </div>
          <p className="text-xs text-slate-500">
            {t.profileHeaderSub}
          </p>
        </div>
      )}

      {alertMessage && (
        <div className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border ${
          alertMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200/50 text-emerald-850' : 'bg-red-50 border-red-200/50 text-red-800'
        }`}>
          {alertMessage.type === 'success' ? '✓' : '⚠️'} {alertMessage.text}
        </div>
      )}

      {/* Main Questionnaire Form */}
      <form onSubmit={handleSaveProfile} className="bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl space-y-8">
        
        {/* Section 1: Demographics & Contact */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-slate-800 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <User className="h-5 w-5 text-emerald-700" />
            <span>{t.section1Title}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.fullName} <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                placeholder={t.namePlaceholder}
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.age} ({t.yearsLabel}) <span className="text-red-500">*</span></label>
              <input
                type="number"
                required
                min="1"
                max="120"
                placeholder={t.agePlaceholder}
                value={profile.age === undefined || profile.age === null ? '' : profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value === '' ? ('' as any) : e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.gender} <span className="text-red-500">*</span></label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="Female">{t.genderFemale}</option>
                <option value="Male">{t.genderMale}</option>
                <option value="Non-Binary">{t.genderNonBinary}</option>
                <option value="Not Specified">{t.genderPreferNotToSay}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1 pl-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                <span>{t.villageLabel}</span>
              </label>
              <input
                type="text"
                placeholder={t.villagePlaceholder}
                value={profile.village || ''}
                onChange={(e) => setProfile({ ...profile, village: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1 pl-1">
                <Phone className="h-3.5 w-3.5 text-emerald-700" />
                <span>{t.mobileNumberLabel}</span>
              </label>
              <input
                type="text"
                placeholder={t.mobilePlaceholder}
                value={profile.mobileNumber || ''}
                onChange={(e) => setProfile({ ...profile, mobileNumber: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1 pl-1">
                <Phone className="h-3.5 w-3.5 text-red-600" />
                <span>{t.emergencyContactLabel}</span>
              </label>
              <input
                type="text"
                placeholder={t.emergencyContactPlaceholder}
                value={profile.emergencyContact || ''}
                onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Ayurvedic Constitution & Primary Health Goals */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-slate-800 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <Compass className="h-5 w-5 text-emerald-700" />
            <span>{t.section2Title}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.doshaLabel}</label>
              <select
                value={profile.primaryDosha || 'unknown'}
                onChange={(e) => setProfile({ ...profile, primaryDosha: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="unknown">{t.doshaUnknown}</option>
                <option value="Vata">{t.doshaVata}</option>
                <option value="Pitta">{t.doshaPitta}</option>
                <option value="Kapha">{t.doshaKapha}</option>
                <option value="Tridoshic">{t.doshaTridoshic}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.healthGoalLabel}</label>
              <select
                value={profile.primaryHealthGoal || 'Immunity & Energy'}
                onChange={(e) => setProfile({ ...profile, primaryHealthGoal: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="Immunity & Energy">{t.goalImmunity}</option>
                <option value="Digestion & Gut Health">{t.goalDigestion}</option>
                <option value="Sleep & Stress Relief">{t.goalSleep}</option>
                <option value="Joint & Muscle Pain Relief">{t.goalPain}</option>
                <option value="Weight Management">{t.goalWeight}</option>
                <option value="Skin & Hair Care">{t.goalSkin}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.dietLabel}</label>
              <select
                value={profile.dietType || 'Vegetarian'}
                onChange={(e) => setProfile({ ...profile, dietType: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="Vegetarian">{t.dietVeg}</option>
                <option value="Vegan">{t.dietVegan}</option>
                <option value="Eggetarian">{t.dietEgg}</option>
                <option value="Non-Vegetarian">{t.dietNonVeg}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.digestionLabel}</label>
              <select
                value={profile.digestionStatus || 'Normal'}
                onChange={(e) => setProfile({ ...profile, digestionStatus: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="Normal">{t.digestionNormal}</option>
                <option value="Acidic / Reflux">{t.digestionAcidic}</option>
                <option value="Sluggish / Bloated">{t.digestionSluggish}</option>
                <option value="Irregular">{t.digestionIrregular}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.sleepQualityLabel}</label>
              <select
                value={profile.sleepQuality || 'Restful & Deep'}
                onChange={(e) => setProfile({ ...profile, sleepQuality: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="Restful & Deep">{t.sleepRestful}</option>
                <option value="Light & Restless">{t.sleepLight}</option>
                <option value="Insomnia">{t.sleepInsomnia}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Vitals & Body Metrics */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-slate-800 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <HeartPulse className="h-5 w-5 text-emerald-700" />
            <span>{t.section3Title}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.weight} (kg) <span className="text-red-500">*</span></label>
              <input
                type="number"
                required
                min="1"
                max="300"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: parseFloat(e.target.value) || 70 })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.height} (cm) <span className="text-red-500">*</span></label>
              <input
                type="number"
                required
                min="50"
                max="250"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: parseFloat(e.target.value) || 170 })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.bloodGroup}</label>
              <select
                value={profile.bloodGroup}
                onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="Not Specified">Not Specified</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.riskCategoryLabel}</label>
              <select
                value={profile.riskCategory || 'low'}
                onChange={(e) => setProfile({ ...profile, riskCategory: e.target.value as any })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="low">{t.categoryStandard}</option>
                <option value="pregnant">{t.categoryPregnant}</option>
                <option value="child">{t.categoryChild}</option>
                <option value="senior">{t.categorySenior}</option>
                <option value="chronic">{t.categoryChronic}</option>
                <option value="high">{t.categoryHighRisk}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Clinical & Medical History */}
        <div className="space-y-6">
          <h4 className="font-serif font-bold text-slate-800 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <HeartPulse className="h-5 w-5 text-emerald-700" />
            <span>{t.section4Title}</span>
          </h4>

          {/* Allergies list */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 pl-1 block">
              {t.allergies} {t.allergySafetyNotice}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.allergiesPlaceholder}
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAllergy(); } }}
                className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
              <button
                type="button"
                onClick={handleAddAllergy}
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl text-sm cursor-pointer"
              >
                Add
              </button>
            </div>
            
            {profile.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.allergies.map((all, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-800 border border-red-100 rounded-full text-xs font-medium">
                    <span>{all}</span>
                    <button type="button" onClick={() => handleRemoveAllergy(idx)} className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Conditions list */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 pl-1 block">{t.medicalConditions}</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.conditionsPlaceholder}
                value={conditionInput}
                onChange={(e) => setConditionInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCondition(); } }}
                className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
              <button
                type="button"
                onClick={handleAddCondition}
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl text-sm cursor-pointer"
              >
                Add
              </button>
            </div>
            
            {profile.medicalConditions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.medicalConditions.map((cond, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-100 rounded-full text-xs font-medium">
                    <span>{cond}</span>
                    <button type="button" onClick={() => handleRemoveCondition(idx)} className="text-amber-500 hover:text-amber-700 font-bold ml-1 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Current medications list */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 pl-1 block">{t.currentMedication}</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.medicationsPlaceholder}
                value={medicationInput}
                onChange={(e) => setMedicationInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddMedication(); } }}
                className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl text-sm cursor-pointer"
              >
                Add
              </button>
            </div>
            
            {profile.currentMedication.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {profile.currentMedication.map((med, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-slate-700 border border-stone-200 rounded-full text-xs font-medium">
                    <span>{med}</span>
                    <button type="button" onClick={() => handleRemoveMedication(idx)} className="text-slate-400 hover:text-slate-600 font-bold ml-1 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Lifestyle & Daily Routine */}
        <div className="space-y-6">
          <h4 className="font-serif font-bold text-slate-800 text-base flex items-center gap-2 border-b border-stone-100 pb-2">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
            <span>{t.section5Title}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.lifestyle}</label>
              <select
                value={profile.lifestyle}
                onChange={(e) => setProfile({ ...profile, lifestyle: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="sedentary">{t.lifestyleSedentary}</option>
                <option value="active">{t.lifestyleActive}</option>
                <option value="very active">{t.lifestyleHeavy}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.sleepDuration} (Hours / Night)</label>
              <input
                type="number"
                required
                min="3"
                max="15"
                step="0.5"
                value={profile.sleep}
                onChange={(e) => setProfile({ ...profile, sleep: parseFloat(e.target.value) || 7 })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.exerciseType}</label>
              <select
                value={profile.exercise}
                onChange={(e) => setProfile({ ...profile, exercise: e.target.value })}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              >
                <option value="none">{t.exerciseNone}</option>
                <option value="walking">{t.exerciseWalking}</option>
                <option value="gym">{t.exerciseGym}</option>
                <option value="running">{t.exerciseCardio}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 block pl-1">{t.targetWaterIntakeLabel}</label>
              <input
                type="number"
                required
                min="1"
                max="8"
                step="0.1"
                value={profile.waterIntake}
                onChange={(e) => setProfile({ ...profile, waterIntake: parseFloat(e.target.value) || 2.5 })}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
              />
            </div>

            {/* Smoking */}
            <div className="flex items-center space-x-3 bg-stone-50 border border-stone-200 p-4 rounded-2xl">
              <input
                type="checkbox"
                id="smoking_checkbox"
                checked={profile.smoking}
                onChange={(e) => setProfile({ ...profile, smoking: e.target.checked })}
                className="h-5 w-5 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700/20 cursor-pointer"
              />
              <label htmlFor="smoking_checkbox" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                {t.smokingLabel}
              </label>
            </div>

            {/* Alcohol */}
            <div className="flex items-center space-x-3 bg-stone-50 border border-stone-200 p-4 rounded-2xl">
              <input
                type="checkbox"
                id="alcohol_checkbox"
                checked={profile.alcohol}
                onChange={(e) => setProfile({ ...profile, alcohol: e.target.checked })}
                className="h-5 w-5 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700/20 cursor-pointer"
              />
              <label htmlFor="alcohol_checkbox" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                {t.alcoholLabel}
              </label>
            </div>
          </div>
        </div>

        {/* Section 6: Data Privacy & Medical Consent */}
        <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-2">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-700 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900 block mb-0.5">{t.consentTitle}</span>
              {t.consentDesc}
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/50 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/10 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Saving Patient Report...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>{isMandatoryOnboarding ? t.saveProfileAndAccess : t.saveProfile}</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
