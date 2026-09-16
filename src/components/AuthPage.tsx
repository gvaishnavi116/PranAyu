import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Mail, Lock, User as UserIcon, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface AuthPageProps {
  language: Language;
  onLoginSuccess: (token: string, user: { id: string; email: string; fullName: string }) => void;
  onBack: () => void;
}

export default function AuthPage({ language, onLoginSuccess, onBack }: AuthPageProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'patient' | 'asha_worker'>('patient');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Screen/Alert states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleOfflineLogin = (inputEmail?: string, inputName?: string) => {
    const offlineEmail = inputEmail || email || 'patient@pranayu.health';
    const offlineUser = {
      id: 'offline_user_' + Date.now(),
      email: offlineEmail,
      fullName: inputName || fullName || 'Offline Patient',
      role: userType || 'patient'
    };
    const offlineToken = 'offline_token_' + Date.now();

    if (rememberMe) {
      localStorage.setItem('pranayu_remember_me', 'true');
    }
    setSuccessMessage('Offline Mode Active! Opening dashboard with local data...');
    setTimeout(() => {
      onLoginSuccess(offlineToken, offlineUser);
    }, 600);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const url = activeTab === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const body = activeTab === 'login' 
      ? { email, password } 
      : { email, password, fullName, role: userType };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong during authentication.');
      }

      // Success
      if (rememberMe) {
        localStorage.setItem('pranayu_remember_me', 'true');
      }
      
      setSuccessMessage('Authentication successful! Opening dashboard...');
      setTimeout(() => {
        onLoginSuccess(data.token, data.user);
      }, 1000);

    } catch (err: any) {
      // If network is offline or fetch failed, fallback to local offline login seamlessly
      if (!navigator.onLine || err.message?.toLowerCase().includes('fetch') || err.name === 'TypeError') {
        console.warn('Network offline or fetch failed during auth. Falling back to offline mode.');
        handleOfflineLogin(email, fullName);
      } else {
        setErrorMessage(err.message || 'Server connection failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json();
      setSuccessMessage(data.message || 'Reset link sent!');
      setForgotEmail('');
    } catch (err: any) {
      setErrorMessage('Could not send reset password request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="auth_page_container" className="min-h-screen bg-stone-50/50 flex flex-col justify-center items-center px-4 py-12 relative select-none">
      
      {/* Back button */}
      <button
        onClick={isForgotPassword ? () => setIsForgotPassword(false) : onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-800 font-medium transition-all group cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span>{isForgotPassword ? 'Back to Login' : t.backToLanding}</span>
      </button>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-stone-200 shadow-xl rounded-3xl p-8 space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-50 rounded-2xl">
            <Sprout className="h-8 w-8 text-emerald-700 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">{t.appName}</h2>
          <p className="text-slate-500 text-xs sm:text-sm">{isForgotPassword ? 'Reset your health access' : t.tagline}</p>
        </div>

        {/* Dynamic Forms */}
        <AnimatePresence mode="wait">
          {!isForgotPassword ? (
            <motion.div
              key="auth-fields"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              {/* Tab Selector */}
              <div className="flex bg-stone-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setErrorMessage(null); setSuccessMessage(null); }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.login}
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('signup'); setErrorMessage(null); setSuccessMessage(null); }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.signup}
                </button>
              </div>

              {/* Status messages */}
              {errorMessage && (
                <div className="p-4 bg-red-50 text-red-800 border border-red-200/50 rounded-2xl text-xs sm:text-sm font-medium">
                  ⚠️ {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-4 bg-emerald-50 text-emerald-850 border border-emerald-200/50 rounded-2xl text-xs sm:text-sm font-medium">
                  ✓ {successMessage}
                </div>
              )}

              {/* Main Submit Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {activeTab === 'signup' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 block pl-1">{t.fullName}</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder={t.authNamePlaceholder}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 block pl-1">Select User Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center gap-2 p-3 border rounded-2xl cursor-pointer transition-all ${
                          userType === 'patient' 
                            ? 'border-emerald-700 bg-emerald-50/80 text-emerald-900 font-bold shadow-sm' 
                            : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100'
                        }`}>
                          <input 
                            type="radio" 
                            name="userType" 
                            value="patient" 
                            checked={userType === 'patient'} 
                            onChange={() => setUserType('patient')} 
                            className="accent-emerald-700 h-4 w-4" 
                          />
                          <span className="text-xs sm:text-sm">Patient</span>
                        </label>
                        
                        <label className={`flex items-center gap-2 p-3 border rounded-2xl cursor-pointer transition-all ${
                          userType === 'asha_worker' 
                            ? 'border-emerald-700 bg-emerald-50/80 text-emerald-900 font-bold shadow-sm' 
                            : 'border-stone-200 bg-stone-50 text-slate-600 hover:bg-stone-100'
                        }`}>
                          <input 
                            type="radio" 
                            name="userType" 
                            value="asha_worker" 
                            checked={userType === 'asha_worker'} 
                            onChange={() => setUserType('asha_worker')} 
                            className="accent-emerald-700 h-4 w-4" 
                          />
                          <span className="text-xs sm:text-sm">ASHA Worker</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 flex justify-between items-center pl-1">
                    <span>Email ID or Mobile Number</span>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">🇮🇳 +91 Supported</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={t.authContactPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-semibold text-slate-600 block">Password</label>
                    {activeTab === 'login' && (
                      <button
                        type="button"
                        onClick={() => { setIsForgotPassword(true); setErrorMessage(null); setSuccessMessage(null); }}
                        className="text-xs text-emerald-800 hover:underline font-medium cursor-pointer"
                      >
                        {t.forgotPassword}
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center space-x-2 pt-1 pl-1">
                  <input
                    type="checkbox"
                    id="remember_me_checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-700/20"
                  />
                  <label htmlFor="remember_me_checkbox" className="text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer select-none">
                    {t.rememberMe}
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/50 text-white font-bold rounded-2xl shadow-md transition-all flex justify-center items-center gap-2 mt-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{activeTab === 'login' ? t.login : t.signup}</span>
                  )}
                </button>

                {/* Offline Access Option */}
                <button
                  type="button"
                  onClick={() => handleOfflineLogin()}
                  className="w-full py-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-semibold rounded-2xl text-xs transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span>⚡ Continue in Offline Mode (No Internet Needed)</span>
                </button>
              </form>

              {/* Toggle switch text */}
              <div className="text-center text-xs font-medium text-slate-500">
                {activeTab === 'login' ? (
                  <>
                    <span>{t.noAccount} </span>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('signup'); setErrorMessage(null); setSuccessMessage(null); }}
                      className="text-emerald-800 hover:underline font-bold cursor-pointer"
                    >
                      {t.signup}
                    </button>
                  </>
                ) : (
                  <>
                    <span>{t.haveAccount} </span>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('login'); setErrorMessage(null); setSuccessMessage(null); }}
                      className="text-emerald-800 hover:underline font-bold cursor-pointer"
                    >
                      {t.login}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="forgot-fields"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h3 className="text-lg font-serif font-bold text-slate-800">Trouble Signing In?</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Enter your email address and we will simulate sending a password reset credentials recovery link.
                </p>
              </div>

              {/* Status messages */}
              {errorMessage && (
                <div className="p-4 bg-red-50 text-red-800 border border-red-200/50 rounded-2xl text-xs sm:text-sm">
                  ⚠️ {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="p-4 bg-emerald-50 text-emerald-850 border border-emerald-200/50 rounded-2xl text-xs sm:text-sm">
                  ✓ {successMessage}
                </div>
              )}

              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block pl-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/50 text-white font-bold rounded-2xl shadow-md transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending Link...</span>
                    </>
                  ) : (
                    <span>Send Reset Email</span>
                  )}
                </button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setIsForgotPassword(false); setErrorMessage(null); setSuccessMessage(null); }}
                  className="text-xs text-emerald-800 hover:underline font-bold cursor-pointer"
                >
                  Back to Login Screen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
