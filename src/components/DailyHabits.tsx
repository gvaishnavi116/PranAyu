import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Sun, Moon, Utensils, Droplets, Sparkles, ShieldCheck, Heart, Footprints, Flame, Calendar, X, Check } from 'lucide-react';
import { DINACHARYA_HABITS, RITUCHARYA_SEASONS, HabitItem } from '../data/habitsData';
import { HABITS_UI, TIME_CATEGORY_TRANSLATIONS, LOCALIZED_HABITS_DATA, LOCALIZED_SEASONS_DATA } from '../utils/habitsTranslations';

interface DailyHabitsProps {
  language?: 'en' | 'hi' | 'te';
  userId?: string;
}

export default function DailyHabits({ language = 'en', userId = 'default_user' }: DailyHabitsProps) {
  const [activeTab, setActiveTab] = useState<'dinacharya' | 'ritucharya'>('dinacharya');
  const [completedHabitIds, setCompletedHabitIds] = useState<string[]>([]);
  const [streakCount, setStreakCount] = useState<number>(1);
  const [activeHabitModal, setActiveHabitModal] = useState<HabitItem | null>(null);
  const [selectedHabitCategory, setSelectedHabitCategory] = useState<string>('All');

  const ui = HABITS_UI[language] || HABITS_UI.en;

  // Ritucharya season state
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>('summer');

  // Determine current season automatically on mount & load user data
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // 0 to 11
    if (currentMonth >= 4 && currentMonth <= 6) {
      setSelectedSeasonId('summer');
    } else if (currentMonth >= 7 && currentMonth <= 8) {
      setSelectedSeasonId('monsoon');
    } else if (currentMonth >= 9 && currentMonth <= 10) {
      setSelectedSeasonId('autumn');
    } else if (currentMonth === 11 || currentMonth <= 1) {
      setSelectedSeasonId('winter');
    } else {
      setSelectedSeasonId('spring');
    }

    // Load completed habits for today for this specific user account
    const todayKey = `dinacharya_habits_${userId}_${new Date().toISOString().slice(0, 10)}`;
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      try {
        setCompletedHabitIds(JSON.parse(saved));
      } catch (_) {}
    } else {
      setCompletedHabitIds([]);
    }

    const savedStreak = localStorage.getItem(`dinacharya_streak_${userId}`);
    if (savedStreak) {
      setStreakCount(parseInt(savedStreak, 10) || 1);
    } else {
      setStreakCount(1);
    }
  }, [userId]);

  // Toggle habit check
  const toggleHabit = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    let updated: string[];
    if (completedHabitIds.includes(id)) {
      updated = completedHabitIds.filter(hId => hId !== id);
    } else {
      updated = [...completedHabitIds, id];
    }

    setCompletedHabitIds(updated);

    const todayKey = `dinacharya_habits_${userId}_${new Date().toISOString().slice(0, 10)}`;
    localStorage.setItem(todayKey, JSON.stringify(updated));

    // If all completed, bump streak
    if (updated.length === DINACHARYA_HABITS.length) {
      const newStreak = streakCount + 1;
      setStreakCount(newStreak);
      localStorage.setItem(`dinacharya_streak_${userId}`, newStreak.toString());
    }
  };

  const rawSeason = RITUCHARYA_SEASONS.find(s => s.id === selectedSeasonId) || RITUCHARYA_SEASONS[0];
  const locSeasonData = LOCALIZED_SEASONS_DATA[selectedSeasonId]?.[language];
  const selectedSeason = {
    ...rawSeason,
    name: locSeasonData?.name || rawSeason.name,
    doshaEffect: locSeasonData?.doshaEffect || rawSeason.doshaEffect,
    primaryFocus: locSeasonData?.primaryFocus || rawSeason.primaryFocus,
    recommendedFoods: locSeasonData?.recommendedFoods || rawSeason.recommendedFoods,
    foodsToAvoid: locSeasonData?.foodsToAvoid || rawSeason.foodsToAvoid,
    lifestyleTips: locSeasonData?.lifestyleTips || rawSeason.lifestyleTips,
    herbalTea: locSeasonData?.herbalTea || rawSeason.herbalTea,
  };

  // Helper for localized habits
  const getLocalizedHabit = (habit: HabitItem) => {
    const loc = LOCALIZED_HABITS_DATA[habit.id]?.[language];
    if (!loc) return habit;
    return {
      ...habit,
      title: loc.title || habit.title,
      description: loc.description || habit.description,
      benefits: loc.benefits || habit.benefits,
      howToPerform: loc.howToPerform || habit.howToPerform,
    };
  };

  // Filter habits
  const filteredHabits = DINACHARYA_HABITS.filter(h => {
    if (selectedHabitCategory === 'All') return true;
    return h.category === selectedHabitCategory;
  });

  const completionPercentage = Math.round((completedHabitIds.length / DINACHARYA_HABITS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-900 via-emerald-950 to-stone-900 text-white p-6 sm:p-10 shadow-xl border border-amber-800/50">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 border border-amber-600/60 text-amber-200 text-xs font-bold uppercase">
              <Sun className="h-4 w-4 text-amber-300 animate-spin-slow" />
              <span>{ui.tagline}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight leading-tight">
              {ui.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
              {ui.subtitle}
            </p>
          </div>

          {/* Top Streak & Progress Ring Counter */}
          <div className="bg-white/10 dark:bg-stone-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-stone-800 shrink-0 flex items-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-xl">
                <Flame className="h-5 w-5 fill-amber-400 text-amber-400 animate-bounce" />
                <span>{streakCount} Days</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-stone-300">{ui.streakLabel}</span>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <span className="text-xl font-black text-emerald-300">{completedHabitIds.length}/{DINACHARYA_HABITS.length}</span>
              <span className="text-[10px] uppercase font-bold text-stone-300 block">{ui.progressLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('dinacharya')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'dinacharya'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 dark:text-stone-300 hover:text-slate-900 dark:hover:text-stone-100'
          }`}
        >
          <Sun className="h-4 w-4" />
          <span>{ui.tabDinacharya}</span>
        </button>
        <button
          onClick={() => setActiveTab('ritucharya')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'ritucharya'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-slate-600 dark:text-stone-300 hover:text-slate-900 dark:hover:text-stone-100'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>{ui.tabRitucharya}</span>
        </button>
      </div>

      {/* TAB 1: DINACHARYA DAILY HABITS */}
      {activeTab === 'dinacharya' && (
        <div className="space-y-6">
          {/* Daily Progress Tracker Card */}
          <div className="bg-white dark:bg-[#13201c] p-6 rounded-3xl border border-stone-200 dark:border-[#243c36] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-stone-100">
                  {ui.todaysHabitsTitle}
                </h2>
                <p className="text-xs text-stone-500">
                  {ui.todaysHabitsSub}
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {['All', 'Morning', 'Afternoon', 'Evening', 'Night'].map((cat) => {
                  const translatedCat = TIME_CATEGORY_TRANSLATIONS[cat]?.[language] || cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedHabitCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        selectedHabitCategory === cat
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-slate-700 dark:text-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {translatedCat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-stone-600 dark:text-stone-300">
                <span>{ui.completionStatus}</span>
                <span className="text-emerald-700 dark:text-emerald-400">{completionPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-200/50 dark:border-stone-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Habits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHabits.map((rawHabit) => {
              const habit = getLocalizedHabit(rawHabit);
              const isDone = completedHabitIds.includes(rawHabit.id);
              const translatedCategory = TIME_CATEGORY_TRANSLATIONS[rawHabit.category]?.[language] || rawHabit.category;

              return (
                <div
                  key={rawHabit.id}
                  onClick={() => setActiveHabitModal(rawHabit)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isDone
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 shadow-xs'
                      : 'bg-white dark:bg-[#13201c] border-stone-200 dark:border-[#243c36] shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                >
                  {/* Checkbox button */}
                  <button
                    onClick={(e) => toggleHabit(rawHabit.id, e)}
                    className="mt-0.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="h-6 w-6 text-stone-300 dark:text-stone-600 hover:text-emerald-600" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                        {translatedCategory} • {rawHabit.timeSlot}
                      </span>
                      <span className="text-[10px] font-bold text-stone-400 italic">
                        {rawHabit.sanskritName}
                      </span>
                    </div>

                    <h3 className={`text-base font-serif font-bold ${isDone ? 'line-through text-stone-500 dark:text-stone-400' : 'text-slate-900 dark:text-stone-100'}`}>
                      {habit.title}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {habit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: RITUCHARYA SEASONAL LIVING */}
      {activeTab === 'ritucharya' && (
        <div className="space-y-6">
          {/* Season Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {RITUCHARYA_SEASONS.map((season) => {
              const locS = LOCALIZED_SEASONS_DATA[season.id]?.[language];
              const sName = locS?.name || season.name;
              return (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeasonId(season.id)}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer border flex items-center gap-2 ${
                    selectedSeasonId === season.id
                      ? 'bg-emerald-800 text-white border-emerald-700 shadow-md scale-105'
                      : 'bg-white dark:bg-[#13201c] border-stone-200 dark:border-[#243c36] text-slate-700 dark:text-stone-300 hover:border-stone-300'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <div className="text-left">
                    <div className="leading-none">{sName}</div>
                    <div className="text-[10px] opacity-80 font-normal">{season.sanskritName}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Season Details Card */}
          <div className="bg-white dark:bg-[#13201c] rounded-3xl border border-stone-200 dark:border-[#243c36] p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-stone-100 dark:border-stone-800">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                  {selectedSeason.months} • {ui.dominantDoshaLabel}: {selectedSeason.dominantDosha}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-stone-100 mt-2">
                  {selectedSeason.name} ({selectedSeason.sanskritName})
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-right">
                <span className="text-[10px] font-bold uppercase text-stone-400 block">{ui.focusLabel}</span>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400">{selectedSeason.primaryFocus}</span>
              </div>
            </div>

            {/* Effect on Body */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-950 dark:text-amber-200">
              <span className="font-bold block mb-1">{ui.doshaEffectLabel}</span>
              <p>{selectedSeason.doshaEffect}</p>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recommended Foods */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wide text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-emerald-600" /> {ui.recommendedFoodsLabel}
                </h3>
                <ul className="space-y-2 text-xs text-emerald-950 dark:text-emerald-200">
                  {selectedSeason.recommendedFoods.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Foods to Avoid */}
              <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/80 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wide text-rose-900 dark:text-rose-300 flex items-center gap-2">
                  <X className="h-4 w-4 text-rose-600" /> {ui.foodsToAvoidLabel}
                </h3>
                <ul className="space-y-2 text-xs text-rose-950 dark:text-rose-200">
                  {selectedSeason.foodsToAvoid.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lifestyle & Herbal Tea */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-stone-100 flex items-center gap-2">
                  <Sun className="h-4 w-4 text-amber-500" /> {ui.lifestyleTipLabel}
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-stone-300">
                  {selectedSeason.lifestyleTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-2 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-400">{ui.seasonalInfusionLabel}</span>
                <p className="text-sm font-serif font-bold text-amber-950 dark:text-amber-200">{selectedSeason.herbalTea}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Habit Detail Modal */}
      <AnimatePresence>
        {activeHabitModal && (() => {
          const habit = getLocalizedHabit(activeHabitModal);
          const translatedCategory = TIME_CATEGORY_TRANSLATIONS[activeHabitModal.category]?.[language] || activeHabitModal.category;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#13201c] w-full max-w-lg rounded-3xl border border-stone-200 dark:border-[#243c36] shadow-2xl p-6 space-y-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      {translatedCategory} • {activeHabitModal.timeSlot}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-stone-100 mt-1">
                      {habit.title}
                    </h3>
                    <p className="text-xs text-emerald-800 dark:text-emerald-400 font-mono italic">
                      Sanskrit: {activeHabitModal.sanskritName}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveHabitModal(null)}
                    className="p-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs text-slate-700 dark:text-stone-200">
                  <div className="bg-stone-50 dark:bg-stone-900/60 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800">
                    <span className="font-bold text-slate-900 dark:text-stone-100 block mb-1">{ui.howToPerformLabel}</span>
                    <p>{habit.howToPerform}</p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-900 dark:text-stone-100 block mb-2">{ui.keyBenefitsLabel}</span>
                    <ul className="space-y-1.5">
                      {habit.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    toggleHabit(activeHabitModal.id);
                    setActiveHabitModal(null);
                  }}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    completedHabitIds.includes(activeHabitModal.id)
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-emerald-700 text-white hover:bg-emerald-800'
                  }`}
                >
                  {completedHabitIds.includes(activeHabitModal.id) ? ui.markUncompletedBtn : ui.markCompletedBtn}
                </button>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
