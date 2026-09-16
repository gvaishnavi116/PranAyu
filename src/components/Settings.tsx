import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Languages, Sun, Volume2, ShieldAlert, Loader2, Trash2 } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface AppSettings {
  language: Language;
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  voiceEnabled: boolean;
  voiceName: string;
  privacyEnabled: boolean;
}

interface SettingsProps {
  language: Language;
  token: string;
  onLanguageChange: (lang: Language) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onLogout: () => void;
}

export default function Settings({ language, token, onLanguageChange, onThemeChange, onLogout }: SettingsProps) {
  const t = translations[language];
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [token]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        if (data.theme) {
          onThemeChange(data.theme);
        }
      }
    } catch (e) {
      console.error('Error fetching settings', e);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (updates: Partial<AppSettings>) => {
    if (!settings) return;
    setSaving(true);
    
    // Optimistic local state update
    const updated = { ...settings, ...updates };
    setSettings(updated);

    if (updates.language) {
      onLanguageChange(updates.language);
    }

    if (updates.theme) {
      onThemeChange(updates.theme);
    }

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const fresh = await res.json();
        setSettings(fresh);
      }
    } catch (e) {
      console.error('Error saving settings', e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm(t.deleteConfirm)) return;
    
    setDeleting(true);
    try {
      const res = await fetch('/api/user/delete', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        alert('Your medical records and account have been deleted permanently.');
        onLogout();
      }
    } catch (e) {
      console.error('Error deleting account', e);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center gap-3">
        <Loader2 className="h-10 w-10 text-emerald-700 animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Loading settings consoles...</span>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div id="settings_preferences_module" className="max-w-4xl mx-auto space-y-8 select-none">
      
      {/* Title */}
      <div className="space-y-1">
        <h3 className="text-2xl font-serif font-bold text-slate-900">{t.settingsTitle}</h3>
        <p className="text-xs text-slate-500">Customize display localization, audio voice guides, and privacy controls.</p>
      </div>

      <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-xl space-y-8">
        
        {/* Language preference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-3 bg-stone-50 border border-stone-150 rounded-2xl shrink-0">
              <Languages className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-none mb-1">
                {t.language}
              </h4>
              <p className="text-xs text-slate-500">Set your preferred dialect. Supports full translation across features.</p>
            </div>
          </div>

          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl shrink-0 border border-stone-200/50">
            <button
              onClick={() => updateSetting({ language: 'en' })}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                settings.language === 'en' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => updateSetting({ language: 'hi' })}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                settings.language === 'hi' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी (Hindi)
            </button>
            <button
              onClick={() => updateSetting({ language: 'te' })}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                settings.language === 'te' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              తెలుగు (Telugu)
            </button>
          </div>
        </div>

        {/* Visual Theme preference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-3 bg-stone-50 border border-stone-150 rounded-2xl shrink-0">
              <Sun className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-none mb-1">
                {t.theme}
              </h4>
              <p className="text-xs text-slate-500">Toggle dark visual spectrums (Default to light scheme optimization).</p>
            </div>
          </div>

          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl shrink-0 border border-stone-200/50">
            <button
              onClick={() => updateSetting({ theme: 'light' })}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                settings.theme === 'light' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Light Theme
            </button>
            <button
              onClick={() => updateSetting({ theme: 'dark' })}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                settings.theme === 'dark' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dark Theme
            </button>
          </div>
        </div>

        {/* Voice Speech settings */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-3 bg-stone-50 border border-stone-150 rounded-2xl shrink-0">
              <Volume2 className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-none mb-1">
                {t.voiceSynth}
              </h4>
              <p className="text-xs text-slate-500">Configure AI read-aloud voice support synthesized directly in browser.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {settings.voiceEnabled ? 'On' : 'Off'}
            </label>
            <button
              type="button"
              onClick={() => updateSetting({ voiceEnabled: !settings.voiceEnabled })}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                settings.voiceEnabled ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                settings.voiceEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Local Security and Encryption privacy mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-3 bg-stone-50 border border-stone-150 rounded-2xl shrink-0">
              <SettingsIcon className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-none mb-1">
                {t.privacyMode}
              </h4>
              <p className="text-xs text-slate-500">Guarantees data sits locked safely in server-side sandboxes.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {settings.privacyEnabled ? 'Active' : 'Bypassed'}
            </label>
            <button
              type="button"
              onClick={() => updateSetting({ privacyEnabled: !settings.privacyEnabled })}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                settings.privacyEnabled ? 'bg-emerald-600' : 'bg-stone-300'
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                settings.privacyEnabled ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 bg-red-50 border border-red-200/50 rounded-2xl space-y-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-6 w-6 text-red-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-red-850 text-sm">{t.dangerZone}</h5>
              <p className="text-xs text-red-700 leading-relaxed">
                Deleting your account will permanently wipe out all diagnostic logs, clinical profiles, settings, and custom reminders instantly. This is completely irreversible.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-500/50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Cleansing database...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  <span>{t.deleteAccount}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
