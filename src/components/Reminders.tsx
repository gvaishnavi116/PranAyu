import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bell, Droplets, HeartPulse, Moon, Activity, Plus, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface Reminder {
  id: string;
  title: string;
  message: string;
  type: 'water' | 'medicine' | 'exercise' | 'sleep' | 'general';
  time: string;
  isEnabled: boolean;
}

interface RemindersProps {
  language: Language;
  token: string;
}

export default function Reminders({ language, token }: RemindersProps) {
  const t = translations[language];
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Reminder form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newType, setNewType] = useState<'water' | 'medicine' | 'exercise' | 'sleep' | 'general'>('general');
  const [newTime, setNewTime] = useState('08:00');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, [token]);

  const fetchReminders = async () => {
    try {
      const res = await fetch('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setReminders(data);
      }
    } catch (e) {
      console.error('Error fetching reminders', e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleReminder = async (id: string, currentStatus: boolean) => {
    // Optimistic local state update
    setReminders(prev => prev.map(rem => rem.id === id ? { ...rem, isEnabled: !currentStatus } : rem));
    
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isEnabled: !currentStatus })
      });
      if (!res.ok) {
        // Rollback on failure
        setReminders(prev => prev.map(rem => rem.id === id ? { ...rem, isEnabled: currentStatus } : rem));
      }
    } catch (e) {
      console.error('Error toggling reminder', e);
    }
  };

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newMessage.trim()) return;

    setAdding(true);
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newTitle,
          message: newMessage,
          type: newType,
          time: newTime
        })
      });

      if (res.ok) {
        const added = await res.json();
        setReminders(prev => [...prev, added]);
        setShowAddForm(false);
        setNewTitle('');
        setNewMessage('');
        setNewType('general');
        setNewTime('08:00');
      }
    } catch (e) {
      console.error('Error adding reminder', e);
    } finally {
      setAdding(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets className="h-5 w-5 text-blue-600" />;
      case 'medicine':
        return <HeartPulse className="h-5 w-5 text-red-600" />;
      case 'sleep':
        return <Moon className="h-5 w-5 text-indigo-600" />;
      case 'exercise':
        return <Activity className="h-5 w-5 text-emerald-600" />;
      default:
        return <Bell className="h-5 w-5 text-amber-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center gap-3">
        <Loader2 className="h-10 w-10 text-emerald-700 animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Retrieving personalized routine calendars...</span>
      </div>
    );
  }

  return (
    <div id="reminders_module" className="max-w-4xl mx-auto space-y-8 select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-serif font-bold text-slate-900">{t.notificationsTitle}</h3>
          <p className="text-xs text-slate-500">Sustain daily wellness paces through reminders synced straight to your device.</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>{t.addNewReminder}</span>
        </button>
      </div>

      {/* New Reminder Form Drawer overlay */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-50 border border-stone-250 rounded-3xl p-6 shadow-md"
        >
          <form onSubmit={handleAddReminder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block pl-1">Reminder Title</label>
                <input
                  type="text"
                  required
                  placeholder={t.reminderTitlePlaceholder}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block pl-1">Daily Schedule Time</label>
                <input
                  type="time"
                  required
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block pl-1">Reminder Advice Message</label>
                <input
                  type="text"
                  required
                  placeholder={t.reminderNotesPlaceholder}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block pl-1">Reminders Classification Category</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-slate-800"
                >
                  <option value="water">Hydration (Water tracker)</option>
                  <option value="medicine">Medicines & Decoctions</option>
                  <option value="exercise">Yoga / Breath control (Exercise)</option>
                  <option value="sleep">Bedtime & Sleep routines</option>
                  <option value="general">General Wellness alert</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-200/50">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={adding}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                <span>Add Daily Schedule</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Reminders List directory */}
      {reminders.length === 0 ? (
        <div className="py-16 text-center bg-white border border-stone-200 rounded-3xl space-y-2">
          <Bell className="h-8 w-8 text-slate-350 mx-auto animate-bounce" />
          <h4 className="font-bold text-slate-800">No Reminders set</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            You do not have any active reminders. Click "Add New Reminder" to set schedules.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reminders.map(rem => (
            <div
              key={rem.id}
              className={`bg-white border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-6 ${
                rem.isEnabled ? 'border-stone-250' : 'border-stone-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-3 bg-stone-50 border border-stone-150 rounded-2xl shrink-0">
                  {getIconForType(rem.type)}
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-none truncate">
                      {rem.title}
                    </h4>
                    <span className="px-2.5 py-0.5 bg-stone-100 border border-stone-200 text-slate-500 font-bold text-[9px] uppercase tracking-wider rounded-full">
                      {rem.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed truncate">
                    {rem.message}
                  </p>

                  {/* Quick checkin response buttons for symptom check reminders */}
                  {(rem.title.toLowerCase().includes('symptom') || rem.message.toLowerCase().includes('cold') || rem.message.toLowerCase().includes('fever') || rem.message.toLowerCase().includes('how is your')) && (
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={async () => {
                          const symName = rem.title.replace(/Daily Symptom Check:\s*How is your\s*/i, '').replace(/\?/g, '').trim() || 'cold';
                          await fetch('/api/symptoms/checkin', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({ symptomName: symName, status: 'better' })
                          });
                          alert(`Glad you feel better from your ${symName}! Updated in your log.`);
                        }}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg text-[11px] border border-emerald-200 cursor-pointer"
                      >
                        🟢 Better
                      </button>
                      <button
                        onClick={async () => {
                          const symName = rem.title.replace(/Daily Symptom Check:\s*How is your\s*/i, '').replace(/\?/g, '').trim() || 'cold';
                          const res = await fetch('/api/symptoms/checkin', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({ symptomName: symName, status: 'same' })
                          });
                          const data = await res.json();
                          if (data.continuousAlertCreated || data.streak >= 3) {
                            alert(`🚨 Alert: You have reported ${symName} for 3 continuous days. An update has been automatically sent to your ASHA worker!`);
                          } else {
                            alert(`Logged symptom check-in for ${symName} (Day ${data.streak}).`);
                          }
                        }}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold rounded-lg text-[11px] border border-amber-200 cursor-pointer"
                      >
                        🟡 Same
                      </button>
                      <button
                        onClick={async () => {
                          const symName = rem.title.replace(/Daily Symptom Check:\s*How is your\s*/i, '').replace(/\?/g, '').trim() || 'cold';
                          const res = await fetch('/api/symptoms/checkin', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({ symptomName: symName, status: 'worse' })
                          });
                          const data = await res.json();
                          if (data.continuousAlertCreated || data.streak >= 3) {
                            alert(`🚨 Alert: You have reported ${symName} for 3 continuous days. An update has been automatically sent to your ASHA worker!`);
                          } else {
                            alert(`Logged symptom check-in for ${symName} (Day ${data.streak}). Take rest & follow remedies.`);
                          }
                        }}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold rounded-lg text-[11px] border border-rose-200 cursor-pointer"
                      >
                        🔴 Worse
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggle Enable Checkbox */}
              <div className="flex items-center space-x-3 shrink-0">
                <label className="text-[10px] font-bold text-slate-400 block tracking-wider uppercase">
                  {rem.isEnabled ? 'Active' : 'Muted'}
                </label>
                <button
                  type="button"
                  onClick={() => handleToggleReminder(rem.id, rem.isEnabled)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                    rem.isEnabled ? 'bg-emerald-600' : 'bg-stone-300'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    rem.isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
