import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Volume2, VolumeX, X, Sprout, Sparkles, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { AYURVEDIC_HERBS, Herb } from '../data/herbsData';
import { HERBAL_GARDEN_UI, HERB_CATEGORY_TRANSLATIONS, HERB_LOCALIZED_DATA } from '../utils/herbsTranslations';

interface HerbalGardenProps {
  language?: 'en' | 'hi' | 'te';
}

export default function HerbalGarden({ language = 'en' }: HerbalGardenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDosha, setSelectedDosha] = useState<string>('All');
  const [activeHerb, setActiveHerb] = useState<Herb | null>(null);
  const [speakingHerbId, setSpeakingHerbId] = useState<string | null>(null);

  const ui = HERBAL_GARDEN_UI[language] || HERBAL_GARDEN_UI.en;

  // Categories list
  const categories = ['All', 'Adaptogen', 'Immunity', 'Skin & Hair', 'Digestion', 'Cognition'];
  const doshas = ['All', 'Vata', 'Pitta', 'Kapha', 'Tridoshic'];

  // Helper to get localized herb data
  const getLocalizedHerb = (herb: Herb) => {
    const loc = HERB_LOCALIZED_DATA[herb.id]?.[language];
    if (!loc) return herb;
    return {
      ...herb,
      name: loc.name || herb.name,
      summary: loc.summary || herb.summary,
      therapeuticUses: loc.therapeuticUses || herb.therapeuticUses,
      safetyPrecautions: loc.safetyPrecautions || herb.safetyPrecautions,
      recommendedForm: loc.recommendedForm || herb.recommendedForm,
      doshaKarma: loc.doshaKarma || herb.doshaKarma,
    };
  };

  // Filter herbs
  const filteredHerbs = AYURVEDIC_HERBS.filter((herb) => {
    const localizedHerb = getLocalizedHerb(herb);
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      localizedHerb.name.toLowerCase().includes(query) ||
      herb.sanskritName.toLowerCase().includes(query) ||
      herb.botanicalName.toLowerCase().includes(query) ||
      localizedHerb.summary.toLowerCase().includes(query) ||
      localizedHerb.therapeuticUses.some((u) => u.toLowerCase().includes(query));

    const matchesCategory = selectedCategory === 'All' || herb.category === selectedCategory;
    const matchesDosha = selectedDosha === 'All' || herb.primaryDosha === selectedDosha;

    return matchesSearch && matchesCategory && matchesDosha;
  });

  // Text-To-Speech Handler with language support
  const handleSpeakHerb = (herb: Herb, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if ('speechSynthesis' in window) {
      if (speakingHerbId === herb.id) {
        window.speechSynthesis.cancel();
        setSpeakingHerbId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const locHerb = getLocalizedHerb(herb);
      const textToRead = `${locHerb.name}, ${herb.sanskritName}. ${locHerb.summary}. ${locHerb.doshaKarma}. ${locHerb.therapeuticUses.join('. ')}.`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-US';

      utterance.onend = () => setSpeakingHerbId(null);
      utterance.onerror = () => setSpeakingHerbId(null);

      setSpeakingHerbId(herb.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-6 sm:p-10 shadow-xl border border-emerald-800/50">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/60 text-emerald-200 text-xs font-bold tracking-wide uppercase">
            <Sprout className="h-4 w-4 text-emerald-300 animate-pulse" />
            <span>{ui.tagline}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight leading-tight">
            {ui.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
            {ui.subtitle}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-[#13201c] p-4 sm:p-6 rounded-2xl border border-stone-200 dark:border-[#243c36] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-slate-800 dark:text-stone-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Dosha Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400 flex items-center gap-1 mr-1 shrink-0">
              <Filter className="h-3.5 w-3.5" /> {ui.doshaLabel}
            </span>
            {doshas.map((dosha) => {
              const translatedDosha = HERB_CATEGORY_TRANSLATIONS[dosha]?.[language] || dosha;
              return (
                <button
                  key={dosha}
                  onClick={() => setSelectedDosha(dosha)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedDosha === dosha
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-slate-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {translatedDosha}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-stone-100 dark:border-stone-800/80 scrollbar-none">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0">{ui.categoryLabel}</span>
          {categories.map((cat) => {
            const translatedCat = HERB_CATEGORY_TRANSLATIONS[cat]?.[language] || cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-300 font-bold shadow-xs'
                    : 'bg-white dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 text-slate-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                {translatedCat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Herb Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHerbs.map((rawHerb) => {
          const herb = getLocalizedHerb(rawHerb);
          const isSpeaking = speakingHerbId === rawHerb.id;
          const translatedCategory = HERB_CATEGORY_TRANSLATIONS[rawHerb.category]?.[language] || rawHerb.category;
          const translatedDosha = HERB_CATEGORY_TRANSLATIONS[rawHerb.primaryDosha]?.[language] || rawHerb.primaryDosha;

          return (
            <motion.div
              key={rawHerb.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveHerb(rawHerb)}
              className="bg-white dark:bg-[#13201c] rounded-2xl border border-stone-200 dark:border-[#243c36] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer group"
            >
              {/* Herb Header / Banner */}
              <div className={`p-5 bg-gradient-to-br ${rawHerb.colorScheme.bgGradient} relative overflow-hidden border-b border-stone-100 dark:border-stone-800`}>
                <div className="flex justify-between items-start gap-2 relative z-10">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${rawHerb.colorScheme.badgeBg} ${rawHerb.colorScheme.badgeText}`}>
                    {translatedCategory}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Audio Reader button */}
                    <button
                      onClick={(e) => handleSpeakHerb(rawHerb, e)}
                      title={ui.audioTitle}
                      className={`p-2 rounded-full backdrop-blur-md border shadow-xs transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                          : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:bg-emerald-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/80 dark:bg-stone-900/80 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">
                      {translatedDosha}
                    </span>
                  </div>
                </div>

                {/* Herb Name & Botanical Name */}
                <div className="mt-4 relative z-10">
                  <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {herb.name}
                  </h2>
                  <p className="text-xs font-mono text-emerald-800 dark:text-emerald-400 italic font-semibold">
                    {rawHerb.botanicalName} ({rawHerb.sanskritName})
                  </p>
                </div>
              </div>

              {/* Herb Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                  {herb.summary}
                </p>

                {/* Dravyaguna Pills */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 dark:border-stone-800/80 text-[11px]">
                  <div className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-xl border border-stone-100 dark:border-stone-800">
                    <span className="text-stone-400 dark:text-stone-500 font-bold block">{ui.veeryaLabel}</span>
                    <span className="font-semibold text-slate-800 dark:text-stone-200">{rawHerb.veerya}</span>
                  </div>
                  <div className="bg-stone-50 dark:bg-stone-900/60 p-2 rounded-xl border border-stone-100 dark:border-stone-800">
                    <span className="text-stone-400 dark:text-stone-500 font-bold block">{ui.vipakaLabel}</span>
                    <span className="font-semibold text-slate-800 dark:text-stone-200">{rawHerb.vipaka}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>{ui.exploreCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredHerbs.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-[#13201c] rounded-2xl border border-stone-200 dark:border-[#243c36] p-8 space-y-3">
          <Sprout className="h-10 w-10 text-stone-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700 dark:text-stone-300">{ui.noResultsTitle}</p>
          <p className="text-xs text-stone-500">{ui.noResultsDesc}</p>
        </div>
      )}

      {/* Dravyaguna Deep-Dive Modal / Drawer */}
      <AnimatePresence>
        {activeHerb && (() => {
          const herb = getLocalizedHerb(activeHerb);
          const translatedCategory = HERB_CATEGORY_TRANSLATIONS[activeHerb.category]?.[language] || activeHerb.category;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white dark:bg-[#13201c] w-full max-w-3xl max-h-[90vh] rounded-3xl border border-stone-200 dark:border-[#243c36] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className={`p-6 bg-gradient-to-r ${activeHerb.colorScheme.bgGradient} relative border-b border-stone-200 dark:border-stone-800 flex items-center justify-between`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${activeHerb.colorScheme.badgeBg} ${activeHerb.colorScheme.badgeText}`}>
                        {translatedCategory}
                      </span>
                      <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                        Sanskrit: {activeHerb.sanskritName}
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-stone-100">
                      {herb.name}
                    </h2>
                    <p className="text-xs font-mono italic text-emerald-700 dark:text-emerald-400 font-semibold">
                      Botanical: {activeHerb.botanicalName}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveHerb(null)}
                    className="p-2 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Modal Scrollable Content */}
                <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-stone-200">
                  {/* Summary */}
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-stone-200 bg-stone-50 dark:bg-stone-900/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800">
                    {herb.summary}
                  </p>

                  {/* Dravyaguna Matrix (Rasa, Guna, Veerya, Vipaka) */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" /> {ui.dravyagunaHeader}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-stone-50 dark:bg-stone-900/60 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-stone-400">{ui.rasaLabel}</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-stone-100">{activeHerb.rasa.join(', ')}</p>
                      </div>
                      <div className="bg-stone-50 dark:bg-stone-900/60 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-stone-400">{ui.gunaLabel}</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-stone-100">{activeHerb.guna.join(', ')}</p>
                      </div>
                      <div className="bg-stone-50 dark:bg-stone-900/60 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-stone-400">{ui.veeryaLabel}</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-stone-100">{activeHerb.veerya}</p>
                      </div>
                      <div className="bg-stone-50 dark:bg-stone-900/60 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-stone-400">{ui.vipakaLabel}</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-stone-100">{activeHerb.vipaka}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dosha Karma */}
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-900 dark:text-emerald-300">
                      {ui.doshaKarmaLabel}
                    </h4>
                    <p className="text-xs text-emerald-950 dark:text-emerald-200 font-medium">
                      {herb.doshaKarma}
                    </p>
                  </div>

                  {/* Therapeutic Uses */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-stone-100 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {ui.therapeuticUsesLabel}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {herb.therapeuticUses.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-stone-50 dark:bg-stone-900/60 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Form & Habitat */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-stone-50 dark:bg-stone-900/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1">
                      <span className="font-bold text-stone-500 block">{ui.recommendedFormLabel}</span>
                      <p className="text-slate-800 dark:text-stone-200 font-medium">{herb.recommendedForm}</p>
                    </div>
                    <div className="bg-stone-50 dark:bg-stone-900/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-1">
                      <span className="font-bold text-stone-500 block">{ui.habitatLabel}</span>
                      <p className="text-slate-800 dark:text-stone-200 font-medium">{activeHerb.harvestingSeason} • {activeHerb.naturalHabitat}</p>
                    </div>
                  </div>

                  {/* Safety Precautions */}
                  <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/80 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <ShieldAlert className="h-4 w-4 text-amber-600" /> {ui.safetyLabel}
                    </h4>
                    <ul className="space-y-1 text-xs text-amber-950 dark:text-amber-200">
                      {herb.safetyPrecautions.map((pre, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span>•</span>
                          <span>{pre}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

