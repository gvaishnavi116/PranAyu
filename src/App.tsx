import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Bot, BookOpen, User, Bell, Settings as SettingsIcon, LogOut, Languages, Star, Menu, X, Activity, Sun, Moon, Check, ChevronDown, ShieldAlert } from 'lucide-react';

// Subcomponents
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AshaWorkerDashboard from './components/AshaWorkerDashboard';
import AdminDashboard from './components/AdminDashboard';
import Chatbot from './components/Chatbot';
import Remedies from './components/Remedies';
import Profile from './components/Profile';
import Reminders from './components/Reminders';
import Settings from './components/Settings';
import HerbalGarden from './components/HerbalGarden';
import DailyHabits from './components/DailyHabits';

import { Language, translations } from './utils/translations';
import { Remedy } from './db/db';

export default function App() {
  // Global States
  const [user, setUser] = useState<{ id: string; email: string; fullName: string; role?: 'patient' | 'asha_worker' | 'admin' } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'landing' | 'auth' | 'dashboard' | 'asha_dashboard' | 'admin_dashboard' | 'chat' | 'remedies' | 'herbal_garden' | 'daily_habits' | 'profile' | 'reminders' | 'settings'>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Compulsory Onboarding & Profile Gatekeeping State
  const [mustCompleteProfile, setMustCompleteProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // UX Linking State
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = translations[language];

  // Listen to network status online/offline
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Try to restore user sessions on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('pranayu_auth_token');
    const savedUser = localStorage.getItem('pranayu_auth_user');
    const savedLang = localStorage.getItem('pranayu_language') as Language;
    const savedTheme = localStorage.getItem('pranayu_theme') as 'light' | 'dark';

    if (savedToken && savedUser) {
      setToken(savedToken);
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // Check profile completion status for gatekeeping
      fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${savedToken}` }
      })
      .then(res => res.ok ? res.json() : null)
      .then(profileData => {
        if (profileData) {
          setUserProfile(profileData);
          localStorage.setItem('pranayu_user_profile', JSON.stringify(profileData));
          if ((!parsedUser.role || parsedUser.role === 'patient') && !profileData.profileCompleted) {
            setMustCompleteProfile(true);
            setActiveView('profile');
          } else {
            setMustCompleteProfile(false);
            setActiveView('dashboard');
          }
        } else {
          // No server profile data found yet - if patient, require profile completion
          const cachedProfileStr = localStorage.getItem('pranayu_user_profile');
          let isCompleted = false;
          if (cachedProfileStr) {
            try {
              const cachedObj = JSON.parse(cachedProfileStr);
              setUserProfile(cachedObj);
              isCompleted = !!cachedObj.profileCompleted;
            } catch (_) {}
          }
          if ((!parsedUser.role || parsedUser.role === 'patient') && !isCompleted) {
            setMustCompleteProfile(true);
            setActiveView('profile');
          } else {
            setMustCompleteProfile(false);
            setActiveView('dashboard');
          }
        }
      })
      .catch(() => {
        // Fallback to cached profile if offline
        const cachedProfile = localStorage.getItem('pranayu_user_profile');
        let isCompleted = false;
        if (cachedProfile) {
          try {
            const parsed = JSON.parse(cachedProfile);
            setUserProfile(parsed);
            isCompleted = !!parsed.profileCompleted;
          } catch (_) {}
        }
        if ((!parsedUser.role || parsedUser.role === 'patient') && !isCompleted) {
          setMustCompleteProfile(true);
          setActiveView('profile');
        } else {
          setMustCompleteProfile(false);
          setActiveView('dashboard');
        }
      });
    }
    if (savedLang) {
      setLanguage(savedLang);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Sync html element class & local storage whenever theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark', 'dark-theme-active');
    } else {
      document.documentElement.classList.remove('dark', 'dark-theme-active');
    }
    localStorage.setItem('pranayu_theme', theme);
  }, [theme]);

  // Sync settings when language changes
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('pranayu_language', lang);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('pranayu_theme', newTheme);
  };

  // Guard logged-in only views from guest access
  useEffect(() => {
    const protectedViews = ['dashboard', 'chat', 'herbal_garden', 'daily_habits', 'profile', 'reminders', 'settings', 'asha_dashboard', 'admin_dashboard'];
    if (!user && protectedViews.includes(activeView)) {
      setActiveView('auth');
    }
  }, [user, activeView]);

  const handleLoginSuccess = async (userToken: string, userData: { id: string; email: string; fullName: string; role?: 'patient' | 'asha_worker' | 'admin' }) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('pranayu_auth_token', userToken);
    localStorage.setItem('pranayu_auth_user', JSON.stringify(userData));

    const isPatientRole = !userData.role || userData.role === 'patient';

    // Check profile completion status for gatekeeping
    try {
      const res = await fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      if (res.ok) {
        const profileData = await res.json();
        setUserProfile(profileData);
        if (isPatientRole && !profileData.profileCompleted) {
          setMustCompleteProfile(true);
          setActiveView('profile');
          return;
        }
      } else if (isPatientRole) {
        setMustCompleteProfile(true);
        setActiveView('profile');
        return;
      }
    } catch (e) {
      console.error('Error verifying login profile state', e);
      // If offline or network error on login, check cached profile or require onboarding
      const cachedProfileStr = localStorage.getItem('pranayu_user_profile');
      let isCompleted = false;
      if (cachedProfileStr) {
        try {
          const cachedObj = JSON.parse(cachedProfileStr);
          isCompleted = !!cachedObj.profileCompleted;
        } catch (_) {}
      }
      if (isPatientRole && !isCompleted) {
        setMustCompleteProfile(true);
        setActiveView('profile');
        return;
      }
    }

    setMustCompleteProfile(false);
    setActiveView('dashboard');
  };

  const handleProfileSaved = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    setMustCompleteProfile(false);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setUserProfile(null);
    setMustCompleteProfile(false);
    localStorage.removeItem('pranayu_auth_token');
    localStorage.removeItem('pranayu_auth_user');
    setActiveView('landing');
    setMobileMenuOpen(false);
  };

  // Deep-linking helper
  const handleSelectRemedyFromDashboard = (rem: Remedy) => {
    if (mustCompleteProfile) return;
    setSelectedRemedy(rem);
    setActiveView('remedies');
  };

  const clearSelectedRemedy = () => {
    setSelectedRemedy(null);
  };

  // Render the currently selected main workspace panel view
  const renderViewContent = () => {
    // If patient HAS NOT completed compulsory first-login profile setup, lock view to Profile onboarding
    if (user && mustCompleteProfile) {
      return (
        <Profile
          language={language}
          token={token!}
          isMandatoryOnboarding={true}
          onProfileSaved={handleProfileSaved}
        />
      );
    }

    switch (activeView) {
      case 'dashboard':
        if (user?.role === 'admin') {
          return <AdminDashboard language={language} token={token!} />;
        }
        if (user?.role === 'asha_worker') {
          return <AshaWorkerDashboard language={language} token={token!} />;
        }
        return (
          <Dashboard
            language={language}
            token={token!}
            onNavigate={(view) => {
              if (mustCompleteProfile) return;
              setActiveView(view);
            }}
            onSelectRemedy={handleSelectRemedyFromDashboard}
          />
        );
      case 'asha_dashboard':
        return <AshaWorkerDashboard language={language} token={token!} />;
      case 'admin_dashboard':
        return <AdminDashboard language={language} token={token!} />;
      case 'chat':
        return <Chatbot language={language} token={token!} />;
      case 'remedies':
        return (
          <Remedies
            language={language}
            token={token || undefined}
            selectedRemedy={selectedRemedy}
            onClearSelectedRemedy={clearSelectedRemedy}
          />
        );
      case 'herbal_garden':
        return <HerbalGarden language={language} />;
      case 'daily_habits':
        return <DailyHabits language={language} userId={user?.id} />;
      case 'profile':
        return (
          <Profile
            language={language}
            token={token!}
            isMandatoryOnboarding={mustCompleteProfile}
            onProfileSaved={handleProfileSaved}
          />
        );
      case 'reminders':
        return <Reminders language={language} token={token!} />;
      case 'settings':
        return (
          <Settings
            language={language}
            token={token!}
            onLanguageChange={handleLanguageChange}
            onThemeChange={handleThemeChange}
            onLogout={handleLogout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="app_root_layout" className={`min-h-screen ${theme === 'dark' ? 'dark-theme-active bg-stone-900 text-stone-100' : 'bg-stone-50/40 text-slate-800'} transition-colors duration-300 antialiased`}>
      
      {/* Top Header bar */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-stone-200 z-40 px-3 sm:px-6 py-2.5 sm:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          
          {/* App Brand Logo */}
          <button
            onClick={() => {
              if (mustCompleteProfile) return;
              user ? setActiveView('dashboard') : setActiveView('landing');
            }}
            className="flex items-center gap-1.5 sm:gap-2 text-left bg-transparent border-none cursor-pointer shrink min-w-0"
          >
            <Sprout className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-700 animate-pulse shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-base sm:text-2xl font-serif font-black text-slate-900 tracking-tight leading-none truncate">
                  {t.appName}
                </h1>
                {user && (
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-900 border border-purple-200' :
                    user.role === 'asha_worker' ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                    'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {user.role === 'admin' ? t.roleAdmin : user.role === 'asha_worker' ? t.roleAsha : t.rolePatient}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-800 font-medium hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Navigation link widgets */}
          {user ? (
            mustCompleteProfile ? (
              <div className="hidden md:flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-xs font-bold text-amber-900 shadow-xs">
                <ShieldAlert className="h-4 w-4 text-amber-700 animate-bounce shrink-0" />
                <span>{t.completeProfileFirst}</span>
              </div>
            ) : (
              /* Logged-In desktop Navigation */
              <nav className="hidden md:flex items-center gap-1.5 bg-stone-50 border border-stone-200/60 p-1.5 rounded-2xl">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'dashboard' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <Activity className="h-4 w-4" />
                  <span>{t.dashboard}</span>
                </button>
                <button
                  onClick={() => setActiveView('chat')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'chat' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <Bot className="h-4 w-4" />
                  <span>{t.chat}</span>
                </button>
                <button
                  onClick={() => setActiveView('remedies')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'remedies' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>{t.remediesTab}</span>
                </button>
                <button
                  onClick={() => setActiveView('herbal_garden')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'herbal_garden' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <Sprout className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.herbalGardenTab}</span>
                </button>
                <button
                  onClick={() => setActiveView('daily_habits')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'daily_habits' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>{t.dailyHabitsTab}</span>
                </button>
                <button
                  onClick={() => setActiveView('profile')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'profile' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>{t.profileTab}</span>
                </button>
                <button
                  onClick={() => setActiveView('reminders')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'reminders' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  <span>{t.remindersTab}</span>
                </button>
                <button
                  onClick={() => setActiveView('settings')}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeView === 'settings' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-800'
                  }`}
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span>{t.settingsTab}</span>
                </button>
              </nav>
            )
          ) : (
            /* Logged-Out desktop navigation - Remedies only */
            <div className="hidden sm:flex items-center gap-5">
              <button 
                onClick={() => setActiveView('remedies')}
                className="text-sm font-bold text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer"
              >
                {t.remediesTab}
              </button>
            </div>
          )}

          {/* Action corner: Language selectors & session controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* PranAyu Healthcare Theme Toggle Switch */}
            <button 
              onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
              className={`relative flex items-center h-8 sm:h-10 w-[62px] sm:w-[72px] p-0.5 sm:p-1 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-stone-300 dark:focus-visible:ring-stone-600 shrink-0 ${
                theme === 'dark'
                  ? 'bg-[#13201c] border border-[#243c36] shadow-inner hover:border-stone-600'
                  : 'bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:border-stone-300'
              }`}
            >
              {/* Background indicator icons */}
              <div className="w-full flex items-center justify-between px-1 text-xs">
                <Sun className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-opacity duration-300 ${
                  theme === 'dark' ? 'text-amber-400 opacity-60' : 'opacity-0'
                }`} />
                <Moon className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-opacity duration-300 ${
                  theme === 'dark' ? 'opacity-0' : 'text-slate-400 opacity-60'
                }`} />
              </div>

              {/* Sliding Knob */}
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute top-0.5 bottom-0.5 sm:top-1 sm:bottom-1 w-6 sm:w-7 rounded-full shadow-sm flex items-center justify-center transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'left-[32px] sm:left-[38px] bg-stone-800 border border-stone-700 text-amber-300' 
                    : 'left-0.5 sm:left-1 bg-[#faf6f0] border border-stone-200 text-slate-700'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-300/20 text-amber-300" />
                ) : (
                  <Sun className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-500/20 text-amber-600" />
                )}
              </motion.div>
            </button>

            {/* PranAyu Regional Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`h-8 sm:h-10 px-2 sm:px-3.5 rounded-xl sm:rounded-2xl flex items-center gap-1 sm:gap-2 transition-all cursor-pointer focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-stone-300 dark:focus-visible:ring-stone-600 ${
                  theme === 'dark'
                    ? 'bg-[#13201c] border border-[#243c36] text-stone-100 hover:border-stone-600 hover:bg-[#1a2c27] shadow-xs'
                    : 'bg-white border border-stone-200/90 text-slate-800 hover:border-stone-300 hover:bg-stone-50/60 shadow-xs hover:shadow-sm'
                }`}
                title="Select Language"
                aria-expanded={langMenuOpen}
              >
                <Languages className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${
                  theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                }`} />
                <span className={`text-[11px] sm:text-xs font-bold ${
                  theme === 'dark' ? 'text-stone-100' : 'text-slate-800'
                }`}>
                  {language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                </span>
                <ChevronDown className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 ${
                  theme === 'dark' ? 'text-stone-400' : 'text-slate-600'
                } ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <>
                    {/* Backdrop overlay */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setLangMenuOpen(false)} 
                    />
                    
                    <motion.div 
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className={`absolute right-0 top-12 shadow-xl rounded-2xl p-1.5 z-50 min-w-[170px] space-y-1 ${
                        theme === 'dark'
                          ? 'bg-[#13201c] border border-[#243c36]'
                          : 'bg-white border border-stone-200'
                      }`}
                    >
                      {[
                        { code: 'en', label: 'English', native: 'English' },
                        { code: 'hi', label: 'Hindi', native: 'हिंदी' },
                        { code: 'te', label: 'Telugu', native: 'తెలుగు' }
                      ].map((item) => {
                        const isActive = language === item.code;
                        return (
                          <button
                            key={item.code}
                            onClick={() => {
                              handleLanguageChange(item.code as Language);
                              setLangMenuOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              isActive 
                                ? (theme === 'dark' 
                                    ? 'bg-stone-800 text-stone-100 border border-stone-700 shadow-xs' 
                                    : 'bg-stone-100 text-stone-900 border border-stone-250 shadow-xs')
                                : (theme === 'dark' 
                                    ? 'text-stone-200 hover:bg-[#1a2c27]' 
                                    : 'text-slate-800 hover:bg-stone-50')
                            }`}
                          >
                            <div className="flex flex-col">
                              <span className={`font-bold ${
                                isActive 
                                  ? (theme === 'dark' ? 'text-white' : 'text-slate-900') 
                                  : (theme === 'dark' ? 'text-stone-100' : 'text-slate-800')
                              }`}>
                                {item.native}
                              </span>
                              {item.native !== item.label && (
                                <span className={`text-[10px] ${
                                  isActive 
                                    ? (theme === 'dark' ? 'text-stone-300' : 'text-slate-600') 
                                    : (theme === 'dark' ? 'text-stone-400' : 'text-slate-500')
                                }`}>
                                  ({item.label})
                                </span>
                              )}
                            </div>
                            {isActive && (
                              <Check className={`h-4 w-4 shrink-0 ml-2 ${
                                theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                              }`} />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Logout button or login widgets */}
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-stone-50 border border-stone-200 text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t.logout}</span>
              </button>
            ) : (
              activeView !== 'auth' && (
                <button
                  onClick={() => setActiveView('auth')}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold transition-all cursor-pointer"
                >
                  {t.login}
                </button>
              )
            )}

            {/* Responsive hamburger widget */}
            {user && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 bg-stone-50 border border-stone-200 text-slate-600 rounded-2xl cursor-pointer"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}

          </div>

        </div>
      </header>

      {/* Offline Status Alert Banner */}
      {isOffline && (
        <div className="bg-amber-500 text-stone-950 px-4 py-2 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs border-b border-amber-600">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-950 animate-ping" />
          <span>⚡ Offline Mode Active — Home remedies, water tracking, dosage guides, and health profile are fully functional locally.</span>
        </div>
      )}

      {/* Mobile navigation side menu drawer */}
      <AnimatePresence>
        {mobileMenuOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 shadow-lg px-6 py-4 flex flex-col gap-2 z-30 relative"
          >
            {mustCompleteProfile ? (
              <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
                <span>Compulsory Patient Profile Setup Pending</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'dashboard' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <Activity className="h-4.5 w-4.5" />
                  <span>{t.dashboard}</span>
                </button>
                <button
                  onClick={() => { setActiveView('chat'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'chat' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <Bot className="h-4.5 w-4.5" />
                  <span>{t.chat}</span>
                </button>
                <button
                  onClick={() => { setActiveView('remedies'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'remedies' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <BookOpen className="h-4.5 w-4.5" />
                  <span>{t.remediesTab}</span>
                </button>
                <button
                  onClick={() => { setActiveView('herbal_garden'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'herbal_garden' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <Sprout className="h-4.5 w-4.5 text-emerald-600" />
                  <span>{t.herbalGardenTab}</span>
                </button>
                <button
                  onClick={() => { setActiveView('daily_habits'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'daily_habits' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <Sun className="h-4.5 w-4.5 text-amber-500" />
                  <span>{t.dailyHabitsTab}</span>
                </button>
                <button
                  onClick={() => { setActiveView('profile'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'profile' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <User className="h-4.5 w-4.5" />
                  <span>{t.profileTab}</span>
                </button>
                <button
                  onClick={() => { setActiveView('reminders'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'reminders' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <Bell className="h-4.5 w-4.5" />
                  <span>{t.remindersTab}</span>
                </button>
                <button
                  onClick={() => { setActiveView('settings'); setMobileMenuOpen(false); }}
                  className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                    activeView === 'settings' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  <SettingsIcon className="h-4.5 w-4.5" />
                  <span>{t.settingsTab}</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace Frame */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          
          {activeView === 'landing' && !user && (
            <motion.div
              key="landing-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage
                language={language}
                onNavigate={(view) => setActiveView(view)}
              />
            </motion.div>
          )}

          {activeView === 'auth' && !user && (
            <motion.div
              key="auth-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AuthPage
                language={language}
                onLoginSuccess={handleLoginSuccess}
                onBack={() => setActiveView('landing')}
              />
            </motion.div>
          )}

          {/* Logged-in screens */}
          {user && (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderViewContent()}
            </motion.div>
          )}

          {/* Guest view for public remedies without Auth */}
          {!user && activeView === 'remedies' && (
            <motion.div
              key="guest-remedies"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveView('landing')}
                  className="text-sm font-bold text-slate-500 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
                >
                  ← Back to Home
                </button>
              </div>
              {renderViewContent()}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
}
