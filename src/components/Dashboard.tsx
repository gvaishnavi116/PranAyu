import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Droplets, HeartPulse, MessageSquare, Sprout, ArrowRight, Star, Loader2, Sparkles, Volume2, VolumeX, AlertTriangle, Phone, Calendar, CheckCircle2, ShieldAlert, Sun } from 'lucide-react';
import { Language, translations, translateCategory, getRemedyTranslatedContent } from '../utils/translations';
import { Remedy } from '../db/db';
import RemedyArtwork from './RemedyArtwork';
import { speakText, stopSpeech } from '../utils/speechUtils';
import { triggerDirectEmergencyCall } from '../utils/emergency';

interface DashboardProps {
  language: Language;
  token: string;
  onNavigate: (view: 'chat' | 'remedies' | 'herbal_garden' | 'daily_habits' | 'profile' | 'reminders') => void;
  onSelectRemedy: (remedy: Remedy) => void;
}

interface DashboardData {
  healthScore: number;
  dailyTip: string;
  recentRemedies: Remedy[];
  stats: {
    waterToday: number;
    waterTarget: number;
    sleepAverage: number;
    weight: number;
    height: number;
    bmi: string;
  };
  recentChats: Array<{ id: string; title: string; updatedAt: string }>;
}

interface ActiveSymptom {
  symptom: string;
  streak: number;
  lastLoggedAt: string;
}

export default function Dashboard({ language, token, onNavigate, onSelectRemedy }: DashboardProps) {
  const t = translations[language];
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingWater, setLoggingWater] = useState(false);
  const [speakingRemedyId, setSpeakingRemedyId] = useState<string | null>(null);

  // Symptom Check-in & Continuous Day Escalation State
  const [activeSymptoms, setActiveSymptoms] = useState<ActiveSymptom[]>([]);
  const [symptomInput, setSymptomInput] = useState('');
  const [loggingSymptom, setLoggingSymptom] = useState(false);
  const [checkinSuccessMsg, setCheckinSuccessMsg] = useState<string | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const fetchActiveSymptoms = async () => {
    try {
      const res = await fetch('/api/symptoms/active', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setActiveSymptoms(json);
      }
    } catch (e) {
      console.warn('Error fetching active symptoms', e);
    }
  };

  const handleSymptomCheckin = async (symptomName: string, status: 'better' | 'same' | 'worse') => {
    setLoggingSymptom(true);
    setCheckinSuccessMsg(null);
    try {
      const res = await fetch('/api/symptoms/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ symptomName, status })
      });

      if (res.ok) {
        const result = await res.json();
        fetchActiveSymptoms();

        if (result.continuousAlertCreated || result.streak >= 3) {
          setCheckinSuccessMsg((t.ashaAlertMsg || '🚨 Alert Escalated: You have reported {symptom} for 3 continuous days. Your assigned ASHA worker has been notified for a health visit.').replace('{symptom}', result.symptom));
        } else if (status === 'better') {
          setCheckinSuccessMsg((t.feelingBetterMsg || 'Glad to hear you are feeling better from your {symptom}! Keep taking warm hydration & rest.').replace('{symptom}', result.symptom));
        } else {
          setCheckinSuccessMsg((t.symptomLoggedMsg || "Logged today's symptom check-in for {symptom} (Day {streak}). Take care & follow AYUSH remedies.").replace('{symptom}', result.symptom).replace('{streak}', String(result.streak)));
        }
      }
    } catch (e) {
      console.error('Error recording symptom checkin', e);
    } finally {
      setLoggingSymptom(false);
    }
  };

  const handleLogNewSymptom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomInput.trim()) return;
    await handleSymptomCheckin(symptomInput.trim(), 'same');
    setSymptomInput('');
  };

  const handleSpeakRemedy = (id: string, title: string, description: string, ingredients: string[], preparation: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (speakingRemedyId === id) {
      stopSpeech();
      setSpeakingRemedyId(null);
      return;
    }

    const fullText = `${title}. ${description}. ${t.ingredients}: ${ingredients.join(', ')}. ${t.preparation}: ${preparation}`;
    speakText(
      fullText,
      language,
      () => setSpeakingRemedyId(id),
      () => setSpeakingRemedyId(null),
      () => setSpeakingRemedyId(null)
    );
  };

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`/api/dashboard?lang=${language}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        localStorage.setItem('pranayu_dashboard_data', JSON.stringify(json));
      } else {
        throw new Error('Failed to fetch from server');
      }
    } catch (e) {
      console.warn('Failed to fetch dashboard data, loading offline fallback data', e);
      const cached = localStorage.getItem('pranayu_dashboard_data');
      if (cached) {
        try {
          setData(JSON.parse(cached));
        } catch (_) {}
      } else {
        // Fallback default dashboard state for offline mode
        setData({
          healthScore: 82,
          dailyTip: 'Sip warm water with a pinch of cumin or dry ginger after meals to boost Agni (digestive fire).',
          stats: {
            waterToday: 1.5,
            waterTarget: 2.5,
            sleepAverage: 7.5,
            weight: 65,
            height: 168,
            bmi: '23.0'
          },
          recentRemedies: [
            {
              id: 'rem_1',
              title: 'Turmeric Milk (Haldi Doodh) for Immunity & Pain',
              description: 'Golden milk prepared with fresh turmeric, black pepper, and warm milk to reduce inflammation, heal tissues, and promote deep sleep.',
              category: 'Immunity & Cold',
              ingredients: ['Turmeric powder (1/2 tsp)', 'Milk (1 cup)', 'Black pepper (1 pinch)', 'Honey (1 tsp)'],
              preparationSteps: ['Warm 1 cup milk in a small saucepan.', 'Add 1/2 tsp turmeric powder and 1 pinch black pepper.', 'Simmer gently for 3-5 minutes.', 'Allow to cool slightly, add 1 tsp honey, and drink warm before sleep.'],
              dosageInstructions: 'Drink once daily at bedtime.',
              precautions: 'Avoid adding honey to boiling hot milk.',
              safetyDisclaimer: 'AYUSH Ministry Guidelines • Safe for daily household use.'
            },
            {
              id: 'rem_2',
              title: 'Cumin-Coriander-Fennel (CCF) Tea for Agni',
              description: 'Classic tri-doshic herbal tea formulated to calm gas, balance stomach acid, and cleanse digestive toxins gently.',
              category: 'Digestion & Gut',
              ingredients: ['Cumin seeds (1/2 tsp)', 'Coriander seeds (1/2 tsp)', 'Fennel seeds (1/2 tsp)', 'Water (3 cups)'],
              preparationSteps: ['Boil 3 cups of water in a pan.', 'Add seeds and reduce heat.', 'Simmer until water reduces to 2 cups.', 'Strain and sip warm throughout the day.'],
              dosageInstructions: 'Sip warm 2-3 times daily after meals.',
              precautions: 'Do not boil excessively.',
              safetyDisclaimer: 'AYUSH Ministry Guidelines • Suitable for all body types.'
            }
          ],
          recentChats: []
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchActiveSymptoms();
  }, [token, language]);

  const handleLogWater = async () => {
    setLoggingWater(true);
    // Optimistic local water log update for offline support
    if (data) {
      const updatedData = {
        ...data,
        stats: {
          ...data.stats,
          waterToday: Math.min(data.stats.waterTarget, parseFloat((data.stats.waterToday + 0.25).toFixed(2)))
        }
      };
      setData(updatedData);
      localStorage.setItem('pranayu_dashboard_data', JSON.stringify(updatedData));
    }

    try {
      await fetch('/api/health-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'water',
          value: '0.25',
          notes: 'Log from quick dashboard button'
        })
      });
    } catch (e) {
      console.warn('Network offline during water log. Logged locally.', e);
    } finally {
      setLoggingWater(false);
    }
  };

  if (loading) {
    return (
      <div id="dashboard_loader" className="min-h-[70vh] flex flex-col justify-center items-center gap-3">
        <Loader2 className="h-10 w-10 text-emerald-700 animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Retrieving health logs...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-800 rounded-3xl border border-red-200">
        Could not retrieve dashboard data. Please try logging in again.
      </div>
    );
  }

  // Determine BMI category & Ayurvedic advice
  const bmiVal = parseFloat(data.stats.bmi);
  let bmiDesc = '';
  let bmiAyurAdvice = '';
  if (bmiVal < 18.5) {
    bmiDesc = 'Underweight';
    bmiAyurAdvice = 'Indicates potential Vata excess. Focus on sweet, warming, nourishing, and heavy organic foods (ghee, cooked grains) to build tissue.';
  } else if (bmiVal >= 18.5 && bmiVal < 25) {
    bmiDesc = 'Normal Weight';
    bmiAyurAdvice = 'Balanced state of physical body. Maintain this harmony by balancing your primary dosha with seasonal eating (Ritucharya).';
  } else if (bmiVal >= 25 && bmiVal < 30) {
    bmiDesc = 'Overweight';
    bmiAyurAdvice = 'Kapha accumulation is high. Focus on spicy, bitter, light, dry, and warm foods to invigorate metabolism and eliminate toxins (Ama).';
  } else {
    bmiDesc = 'Obese';
    bmiAyurAdvice = 'Significant Kapha excess. Favor active workouts, limit sweet/salty meals, consume bitter/astringent elements, and consult an Ayurvedic doctor.';
  }

  // Circle gauge calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.healthScore / 100) * circumference;

  return (
    <div id="user_dashboard_container" className="space-y-8 sm:space-y-12 select-none">
      
      {/* 🚨 Emergency Situations Direct Call Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white rounded-3xl p-5 sm:p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl animate-pulse">
            <ShieldAlert className="h-8 w-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">{t.sosLabel || 'Emergency SOS'}</span>
              <span className="text-xs text-red-100">{t.sosTags || 'Heart pain, chest discomfort, severe breathlessness'}</span>
            </div>
            <h4 className="text-lg font-serif font-bold mt-1">{t.sosTitle || 'Medical Emergency Situation?'}</h4>
            <p className="text-xs text-red-100 mt-0.5">{t.sosSub || 'Click to directly call emergency services (108 / 112) or your personal emergency contact instantly.'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => triggerDirectEmergencyCall('108')}
            className="flex-1 md:flex-initial px-5 py-3 bg-white text-red-700 hover:bg-red-50 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
          >
            <Phone className="h-4.5 w-4.5 text-red-600 fill-current animate-bounce" />
            <span>{t.callEmergency108 || '📞 Call Emergency 108'}</span>
          </button>

          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="px-4 py-3 bg-red-900/40 hover:bg-red-900/60 border border-white/30 text-white font-medium rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>{t.options || 'Options'}</span>
          </button>
        </div>
      </div>

      {/* 🌡️ Daily Symptom Check-in & Continuous Tracker Widget */}
      <div className="bg-amber-50/80 border border-amber-200/80 dark:bg-[#201a14] dark:border-[#382b1d] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-700 dark:text-amber-400">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 dark:text-amber-100 text-lg">{t.symptomCheckinTitle || 'Daily Symptom Check-in & Reminders'}</h3>
              <p className="text-xs text-slate-600 dark:text-amber-200/70">
                {t.symptomCheckinSub || 'Logged symptoms are monitored daily. If the same symptom persists for 3 continuous days, an alert is automatically escalated to your assigned ASHA worker.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleLogNewSymptom} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder={t.symptomInputPlaceholder || 'e.g. Cold, Fever, Cough...'}
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              className="px-3.5 py-2.5 bg-white dark:bg-[#18130f] border border-amber-200 dark:border-[#3d2f21] text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-slate-800 dark:text-stone-200"
            />
            <button
              type="submit"
              disabled={loggingSymptom || !symptomInput.trim()}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              {t.logSymptomBtn || '+ Log'}
            </button>
          </form>
        </div>

        {checkinSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl text-xs sm:text-sm font-medium border flex items-start gap-2.5 ${
              checkinSuccessMsg.includes('🚨')
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{checkinSuccessMsg}</span>
          </motion.div>
        )}

        {/* Active Tracked Symptoms List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {activeSymptoms.length === 0 ? (
            <div className="col-span-full p-4 bg-white/60 dark:bg-black/20 rounded-2xl border border-amber-100 text-center text-xs text-slate-500">
              {t.noActiveSymptoms || 'No active symptoms currently tracked today. Log "Cold" or "Fever" above to activate daily check-in reminders.'}
            </div>
          ) : (
            activeSymptoms.map((sym) => (
              <div
                key={sym.symptom}
                className={`p-4 rounded-2xl border bg-white dark:bg-[#18130f] flex flex-col justify-between space-y-3 shadow-sm ${
                  sym.streak >= 3 ? 'border-red-300 ring-2 ring-red-500/20' : 'border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤒</span>
                    <span className="font-bold text-slate-900 dark:text-stone-100 text-sm">{sym.symptom}</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      sym.streak >= 3
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 animate-pulse'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'
                    }`}
                  >
                    {sym.streak >= 3 
                      ? (t.ashaAlertedLabel || '🚨 Day {streak} (ASHA Alerted)').replace('{streak}', String(sym.streak))
                      : (t.dayStreak || '📅 Day {streak} Streak').replace('{streak}', String(sym.streak))}
                  </span>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <p>{t.dailyPrompt || 'Daily Prompt'}: <strong>"{(t.howIsYourSymptomToday || 'How is your {symptom} today?').replace('{symptom}', sym.symptom)}"</strong></p>
                  {sym.streak >= 3 && (
                    <p className="text-red-600 font-semibold">{t.ashaAlertWarning || '⚠️ 3 continuous days reported. Alert updated on ASHA Worker dashboard.'}</p>
                  )}
                </div>

                {/* Response Buttons */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => handleSymptomCheckin(sym.symptom, 'better')}
                    disabled={loggingSymptom}
                    className="py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-xs transition-all border border-emerald-200 text-center cursor-pointer"
                  >
                    {t.statusBetter || '🟢 Better'}
                  </button>
                  <button
                    onClick={() => handleSymptomCheckin(sym.symptom, 'same')}
                    disabled={loggingSymptom}
                    className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold rounded-xl text-xs transition-all border border-amber-200 text-center cursor-pointer"
                  >
                    {t.statusSame || '🟡 Same'}
                  </button>
                  <button
                    onClick={() => handleSymptomCheckin(sym.symptom, 'worse')}
                    disabled={loggingSymptom}
                    className="py-1.5 px-2 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold rounded-xl text-xs transition-all border border-rose-200 text-center cursor-pointer"
                  >
                    {t.statusWorse || '🔴 Worse'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Emergency Call Dialog Modal */}
      <AnimatePresence>
        {emergencyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-stone-900 max-w-md w-full rounded-3xl p-6 border border-stone-200 shadow-2xl space-y-5"
            >
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-3 bg-red-100 rounded-2xl">
                  <ShieldAlert className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">{t.emergencyModalTitle || 'Emergency Direct Call'}</h3>
                  <p className="text-xs text-slate-500">{t.emergencyModalSub || 'Immediate telephone connection'}</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-xs text-red-800 space-y-2">
                <p className="font-bold">{t.emergencyProtocolActivated || '🚨 Emergency Protocol Activated'}</p>
                <p>{t.emergencyProtocolDesc || 'If you are experiencing severe chest pain, heart tightness, severe shortness of breath, or heavy bleeding, make a direct call immediately.'}</p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => triggerDirectEmergencyCall('108')}
                  className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer text-sm"
                >
                  <Phone className="h-5 w-5 fill-current animate-bounce" />
                  <span>{t.callAmbulance108 || 'Call Ambulance Hotline (108 / 112)'}</span>
                </button>

                <button
                  onClick={() => triggerDirectEmergencyCall('+919876500000')}
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer text-sm"
                >
                  <Phone className="h-5 w-5" />
                  <span>{t.callDoctorKin || 'Call Emergency Contact / Doctor'}</span>
                </button>
              </div>

              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 text-center font-medium cursor-pointer"
              >
                {t.closeWindow || 'Close Window'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Top Main Grid: Health Score, Daily Tip, and Recent Conversations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        
        {/* Score Ring Card */}
        <div className="bg-white border border-stone-200 p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-opacity">
            <Activity className="h-20 w-20 text-emerald-800" />
          </div>

          <h3 className="font-serif font-bold text-slate-900 text-base sm:text-lg mb-4 sm:mb-6">{t.healthScore}</h3>

          {/* Svg Radial Progress */}
          <div className="relative h-32 w-32 sm:h-36 sm:w-36 mb-4 sm:mb-6">
            <svg className="absolute inset-0 h-full w-full transform -rotate-90">
              {/* Back Circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-stone-100 fill-none"
                strokeWidth="10"
              />
              {/* Active Circle */}
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-emerald-600 fill-none"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeDasharray={circumference}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-serif font-black text-slate-900">{data.healthScore}</span>
              <span className="text-xs font-semibold text-slate-400">/ 100</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
            {t.scoreDesc}
          </p>
        </div>

        {/* Daily Tip Card */}
        <div className="bg-gradient-to-br from-emerald-50 to-stone-50 dark:from-[#13201c] dark:to-[#182a24] border border-emerald-100/60 dark:border-[#243c36] p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -top-8 p-6 bg-emerald-100/30 dark:bg-emerald-900/20 rounded-full">
            <Sparkles className="h-16 w-16 text-emerald-700/20 dark:text-emerald-400/20" />
          </div>

          <div className="space-y-4 max-w-xl z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Sprout className="h-3.5 w-3.5" />
              <span>{t.dailyTip}</span>
            </div>
            <h4 className="text-base sm:text-xl font-serif font-bold text-slate-900 dark:text-stone-100 leading-relaxed">
              "{data.dailyTip}"
            </h4>
          </div>

          <div className="mt-6 flex flex-col items-start gap-4 pt-4 border-t border-emerald-100/50 dark:border-[#243c36]">
            <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-medium">
              *Daily recommendations are adjusted to help harmonize your biological rhythms.
            </p>
            <button
              onClick={() => onNavigate('remedies')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 hover:translate-x-1 transition-all cursor-pointer"
            >
              <span>{t.exploreRemedies}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Conversations */}
        <div className="bg-white border border-stone-200 p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-serif font-bold text-slate-900 text-base sm:text-lg">{t.recentChats}</h4>
              <div className="p-2 bg-emerald-50 rounded-2xl">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
              </div>
            </div>

            {data.recentChats.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 leading-relaxed">
                No active chat sessions. Tap the button below to start consulting PranAyu AI.
              </p>
            ) : (
              <div className="space-y-2">
                {data.recentChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onNavigate('chat')}
                    className="w-full text-left p-2.5 hover:bg-stone-50 rounded-xl border border-transparent hover:border-stone-150 transition-all flex items-center justify-between gap-2 group/btn cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover/btn:text-emerald-800">
                        {chat.title}
                      </p>
                      <p className="text-[9px] text-slate-400">
                        Updated {new Date(chat.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <ArrowRight className="h-3 w-3 text-slate-300 group-hover/btn:translate-x-1 group-hover/btn:text-emerald-700 transition-all" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-xs transition-all text-center mt-6 cursor-pointer"
          >
            {t.newChat}
          </button>
        </div>

      </div>

      {/* Quick Access Feature Cards for Interactive Herbal Garden & Daily Habit Planner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => onNavigate('herbal_garden')}
          className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white p-6 rounded-3xl border border-emerald-800/80 shadow-md hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              <Sprout className="h-3.5 w-3.5 text-emerald-300" />
              <span>Dravyaguna Explorer</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-100 group-hover:text-emerald-300 transition-colors">
              Interactive Herbal Garden 🌺
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Explore botanical profiles for raw herbs (Neem, Ashwagandha, Tulsi, Brahmi) with Rasa, Guna, Veerya, and safety precautions.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-300 relative z-10 group-hover:translate-x-1 transition-transform">
            <span>Explore Raw Herbs</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('daily_habits')}
          className="bg-gradient-to-br from-amber-900 via-stone-900 to-emerald-950 text-white p-6 rounded-3xl border border-amber-800/80 shadow-md hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between"
        >
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-[10px] font-bold uppercase tracking-wider">
              <Sun className="h-3.5 w-3.5 text-amber-300" />
              <span>Ayurvedic Routines</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
              Dinacharya & Ritucharya Planner ☀️
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Daily morning & evening habit checklists with streak tracking, plus seasonal living tips (Summer, Winter, Monsoon).
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-bold text-amber-300 relative z-10 group-hover:translate-x-1 transition-transform">
            <span>Track Daily Habits</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Suggested remedies list */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          <h3 className="font-serif font-bold text-slate-900 text-lg sm:text-xl">{t.suggestedRemedies}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {data.recentRemedies.map((rawRem, idx) => {
            const rem = getRemedyTranslatedContent(rawRem.id, rawRem, language);
            return (
              <motion.div
                key={rem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onSelectRemedy(rem)}
                className="bg-white border border-stone-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group relative"
              >
                <div>
                  <div className="h-40 sm:h-44 relative overflow-hidden bg-stone-100">
                    <RemedyArtwork id={rem.id} title={rem.title} category={rem.category} />
                    
                    {/* Quick Audio Voice Reader button */}
                    <button
                      onClick={(e) => handleSpeakRemedy(
                        rem.id,
                        rem.title,
                        rem.description,
                        rem.ingredients,
                        rem.preparation || rawRem.preparation || '',
                        e
                      )}
                      title="Listen to remedy"
                      className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md border shadow-md transition-all hover:scale-110 cursor-pointer z-10 ${
                        speakingRemedyId === rem.id
                          ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                          : 'bg-white/90 dark:bg-stone-900/90 text-slate-800 dark:text-emerald-300 border-stone-200/90 dark:border-emerald-800/80 hover:text-emerald-700 dark:hover:text-emerald-200 dark:hover:bg-stone-800'
                      }`}
                    >
                      {speakingRemedyId === rem.id ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#13201c]/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-bold text-emerald-800 dark:text-emerald-300 shadow-sm border border-emerald-50 dark:border-[#243c36]">
                      {translateCategory(rem.category, language)}
                    </div>

                    {/* AYUSH Ministry Certified tag */}
                    <div className="absolute top-4 left-4 bg-amber-500/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-amber-400 flex items-center gap-1 z-10">
                      <Star className="h-2.5 w-2.5 fill-white text-white" />
                      <span>{t.ayushCertified}</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-2">
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1 text-sm sm:text-base">
                      {rem.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {rem.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0">
                  <span className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1">
                    <span>{t.viewRecipe}</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
