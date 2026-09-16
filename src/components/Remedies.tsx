import React, { useState, useEffect } from 'react';
import { Search, Sprout, ArrowRight, X, AlertCircle, CheckCircle, Flame, Star, Volume2, VolumeX, Copy, Check, BookOpen, Sparkles } from 'lucide-react';
import { Language, translations, translateCategory, getRemedyTranslatedContent } from '../utils/translations';
import { Remedy } from '../db/db';
import RemedyArtwork from './RemedyArtwork';
import { speakText, stopSpeech } from '../utils/speechUtils';

interface RemediesProps {
  language: Language;
  token?: string;
  selectedRemedy: Remedy | null;
  onClearSelectedRemedy: () => void;
}

const CATEGORIES = [
  'All Categories',
  'Joints & Pain',
  'Cold & Cough',
  'Digestion',
  'Stress & Sleep',
  'Skin & Hair',
  'Immunity',
  'General Wellness'
];

export default function Remedies({ language, token, selectedRemedy, onClearSelectedRemedy }: RemediesProps) {
  const t = translations[language];
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeRemedy, setActiveRemedy] = useState<Remedy | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Interactive recipe state for modal
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [speakingRemedyId, setSpeakingRemedyId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchRemedies();
  }, [searchQuery, activeCategory, language]);

  useEffect(() => {
    if (selectedRemedy) {
      setActiveRemedy(selectedRemedy);
      setCheckedSteps({});
      stopSpeech();
      setSpeakingRemedyId(null);
    }
  }, [selectedRemedy]);

  useEffect(() => {
    // Stop speech synthesis when closing modal or changing language or unmounting
    return () => {
      stopSpeech();
      setSpeakingRemedyId(null);
    };
  }, [activeRemedy, language]);

  const fetchRemedies = async () => {
    try {
      let url = '/api/remedies';
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (activeCategory !== 'All Categories') params.append('category', activeCategory);
      params.append('lang', language);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRemedies(data);
        // Cache for offline access
        try {
          localStorage.setItem('pranayu_offline_remedies', JSON.stringify(data));
        } catch (_) {}
      }
    } catch (e) {
      console.error('Error fetching remedies, loading offline fallback', e);
      try {
        const cached = localStorage.getItem('pranayu_offline_remedies');
        if (cached) {
          setRemedies(JSON.parse(cached));
        }
      } catch (_) {}
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleOpenRemedy = (rem: Remedy) => {
    setActiveRemedy(rem);
    setCheckedSteps({});
    stopSpeech();
    setSpeakingRemedyId(null);
    setCopied(false);
  };

  const handleCloseOverlay = () => {
    stopSpeech();
    setSpeakingRemedyId(null);
    setActiveRemedy(null);
    onClearSelectedRemedy();
  };

  const toggleStepCheck = (stepIdx: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepIdx]: !prev[stepIdx]
    }));
  };

  const handleSpeakRecipe = (id: string, title: string, description: string, ingredients: string[], preparation: string) => {
    if (speakingRemedyId === id) {
      stopSpeech();
      setSpeakingRemedyId(null);
      return;
    }

    // Build comprehensive, clean speech string in current language
    const fullText = `${title}. ${description}. ${t.ingredients}: ${ingredients.join(', ')}. ${t.preparation}: ${preparation}`;

    speakText(
      fullText,
      language,
      () => setSpeakingRemedyId(id),
      () => setSpeakingRemedyId(null),
      () => setSpeakingRemedyId(null)
    );
  };

  const handleCopyRecipe = (title: string, ingredients: string[], prepText: string) => {
    const recipeString = `${title}\n\n[Ingredients]\n${ingredients.map(i => `• ${i}`).join('\n')}\n\n[Preparation Recipe]\n${prepText}`;
    navigator.clipboard.writeText(recipeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div id="remedies_directory" className="space-y-8 select-none">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-serif font-bold text-slate-900">{t.remediesTab}</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {remedies.length}
            </span>
          </div>
          <p className="text-xs text-slate-500">{t.remediesSubtext}</p>
        </div>

        {/* Search Input bar */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchRemedyPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-850 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Horizontal scrollbar bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeCategory === cat
                ? 'bg-emerald-700 border-emerald-700 text-white shadow-md scale-[1.02]'
                : 'bg-white border-stone-200 text-slate-650 hover:bg-stone-50 hover:border-stone-300'
            }`}
          >
            <span>{translateCategory(cat, language)}</span>
          </button>
        ))}
      </div>

      {/* Remedies Grid */}
      {remedies.length === 0 ? (
        <div className="py-20 text-center bg-stone-50 border border-dashed border-stone-200 rounded-3xl space-y-2 animate-pulse">
          <AlertCircle className="h-10 w-10 text-slate-350 mx-auto" />
          <h4 className="font-bold text-slate-800">No Remedies Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We could not find remedies matching your query. Inquire about custom home remedies directly in the AI Chatbot!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remedies.map((rem, idx) => {
            const isFav = favorites.includes(rem.id);
            const remContent = getRemedyTranslatedContent(rem.id, rem, language);
            return (
              <div
                key={rem.id}
                onClick={() => handleOpenRemedy(rem)}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-stone-100">
                    <RemedyArtwork id={rem.id} title={remContent.title} category={rem.category} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                    
                    {/* Quick Audio Voice Reader button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakRecipe(
                          rem.id,
                          remContent.title,
                          remContent.description,
                          remContent.ingredients,
                          remContent.preparation || rem.preparation || ''
                        );
                      }}
                      title="Listen to remedy in your selected language"
                      className={`absolute top-4 right-16 p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all hover:scale-110 cursor-pointer z-10 ${
                        speakingRemedyId === rem.id
                          ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                          : 'bg-white/90 dark:bg-stone-900/90 text-slate-800 dark:text-emerald-400 border-stone-200/90 dark:border-emerald-800/80 hover:text-emerald-700 dark:hover:text-emerald-300 dark:hover:bg-stone-800'
                      }`}
                    >
                      {speakingRemedyId === rem.id ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
                    </button>

                    {/* Favorite flag button */}
                    <button
                      onClick={(e) => toggleFavorite(rem.id, e)}
                      title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border shadow-md transition-all hover:scale-110 cursor-pointer z-10 ${
                        isFav
                          ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-500 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                          : 'bg-white/90 dark:bg-stone-900/90 text-slate-700 dark:text-stone-300 border-stone-200/90 dark:border-emerald-800/80 hover:text-amber-500 dark:hover:text-amber-400 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Star className={`h-4.5 w-4.5 transition-colors ${
                        isFav ? 'text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400' : 'text-slate-600 dark:text-stone-300'
                      }`} />
                    </button>

                    {/* AYUSH Ministry Certified tag */}
                    <div className="absolute top-4 left-4 bg-amber-500/95 text-white backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm border border-amber-400/80 flex items-center gap-1 z-10">
                      <Star className="h-2.5 w-2.5 fill-white text-white" />
                      <span>{t.ayushCertified}</span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-emerald-800/90 text-white backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold shadow-sm z-10">
                      {translateCategory(rem.category, language)}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h4 className="font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-base sm:text-lg leading-snug line-clamp-2">
                      {remContent.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {remContent.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center border-t border-stone-100 mt-4 pt-4">
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{remContent.ingredients.length} {t.ingredientsText}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all">
                    <span>{t.preparationRecipeText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Remedy Overlay Modal */}
      {activeRemedy && (() => {
        const activeContent = getRemedyTranslatedContent(activeRemedy.id, activeRemedy, language);
        
        // Parse step-by-step preparation array
        const prepTextRaw = activeContent.preparation || activeRemedy.preparation || '';
        const prepSteps = prepTextRaw.split('\n').filter(s => s.trim().length > 0);
        const completedCount = Object.values(checkedSteps).filter(Boolean).length;
        const progressPct = prepSteps.length > 0 ? Math.round((completedCount / prepSteps.length) * 100) : 0;

        return (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex justify-center items-center z-50 p-3 sm:p-6 overflow-y-auto select-none animate-fadeIn">
            <div className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto">
              
              {/* Image banner */}
              <div className="h-64 sm:h-72 relative overflow-hidden bg-stone-100">
                <RemedyArtwork id={activeRemedy.id} title={activeContent.title} category={activeRemedy.category} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={handleCloseOverlay}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 hover:bg-white text-slate-800 hover:text-black rounded-full shadow-lg cursor-pointer z-20 transition-all hover:scale-105"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2.5 z-10 text-left">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-3 py-1 bg-emerald-600/90 backdrop-blur-sm rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                      {translateCategory(activeRemedy.category, language)}
                    </span>
                    <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white text-white" />
                      <span>{t.ayushCertified}</span>
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black leading-tight text-white drop-shadow-md">
                    {activeContent.title}
                  </h3>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="bg-stone-50 border-b border-stone-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeakRecipe(
                      activeRemedy.id,
                      activeContent.title,
                      activeContent.description,
                      activeContent.ingredients,
                      prepTextRaw
                    )}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      speakingRemedyId === activeRemedy.id 
                        ? 'bg-rose-600 text-white animate-pulse' 
                        : 'bg-emerald-700 text-white hover:bg-emerald-800'
                    }`}
                  >
                    {speakingRemedyId === activeRemedy.id ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    <span>
                      {speakingRemedyId === activeRemedy.id 
                        ? (language === 'hi' ? 'पढ़ना रोकें' : language === 'te' ? 'ఆపండి' : 'Stop Reading')
                        : (language === 'hi' ? 'रेसिपी सुनें' : language === 'te' ? 'వినండి' : 'Listen Recipe')
                      }
                    </span>
                  </button>

                  <button
                    onClick={() => handleCopyRecipe(activeContent.title, activeContent.ingredients, prepTextRaw)}
                    className="px-3.5 py-1.5 bg-white border border-stone-200 hover:border-stone-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-slate-500" />}
                    <span>{copied ? 'Copied!' : 'Copy Recipe'}</span>
                  </button>
                </div>

                {prepSteps.length > 0 && (
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                    <span>Recipe Progress:</span>
                    <span className="font-bold text-emerald-700">{progressPct}%</span>
                  </div>
                )}
              </div>

              {/* Content body */}
              <div className="p-6 space-y-6">
                
                {/* Description */}
                <div className="space-y-1 bg-stone-50/70 p-4 rounded-2xl border border-stone-150">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {activeContent.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-700" />
                    <span>{t.benefits}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(activeContent.benefits || activeRemedy.benefits).map((b, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-semibold border border-emerald-200/60 shadow-2xs">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="space-y-2.5 bg-stone-50 border border-stone-200 p-5 rounded-2xl">
                  <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-emerald-700" />
                    <span>{t.ingredients}</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    {activeContent.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-stone-200/80 shadow-2xs">
                        <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Preparation Steps - Interactive Animated Recipe */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Flame className="h-4 w-4 text-amber-600" />
                      <span>{t.preparation}</span>
                    </h4>
                    {prepSteps.length > 0 && (
                      <span className="text-xs text-slate-400 font-medium">
                        Click step to check off
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {prepSteps.map((step, idx) => {
                      const isChecked = !!checkedSteps[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStepCheck(idx)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                            isChecked
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs line-through opacity-80'
                              : 'bg-white border-stone-200 text-slate-800 hover:border-emerald-500 shadow-2xs'
                          }`}
                        >
                          <div className={`mt-0.5 h-5 w-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-stone-50'
                          }`}>
                            {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium leading-relaxed">
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dosage */}
                <div className="space-y-2 border-t border-stone-200 pt-4">
                  <h4 className="font-serif font-bold text-slate-900 text-sm block">{t.dosageHeading || t.dosage}</h4>
                  <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl text-xs sm:text-sm text-emerald-900 font-semibold flex items-center gap-2">
                    <Flame className="h-4 w-4 text-emerald-700 shrink-0" />
                    <span>{activeContent.dosage}</span>
                  </div>
                </div>

                {/* Warnings */}
                <div className="space-y-2.5 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-amber-950">
                  <h4 className="font-serif font-bold text-amber-950 text-sm flex items-center gap-1.5">
                    <AlertCircle className="h-4.5 w-4.5 text-amber-700 shrink-0" />
                    <span>{t.precautionsHeading || t.warnings}</span>
                  </h4>
                  <ul className="list-disc pl-5 text-[11px] sm:text-xs text-amber-900 space-y-1 font-semibold">
                    {(activeContent.precautions || activeContent.warnings || activeRemedy.warnings).map((warn, idx) => (
                      <li key={idx}>{warn}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}

