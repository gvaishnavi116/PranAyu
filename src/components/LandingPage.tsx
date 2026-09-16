import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sprout, Bot, ShieldAlert, Activity, Compass, HeartPulse, ArrowRight, CheckCircle } from 'lucide-react';
import { Language, translations } from '../utils/translations';

interface LandingPageProps {
  language: Language;
  onNavigate: (view: 'auth' | 'remedies') => void;
}

export default function LandingPage({ language, onNavigate }: LandingPageProps) {
  const t = translations[language];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Bot className="h-6 w-6 text-emerald-600" />,
      title: t.feat1Title || 'AI Ayurvedic Chatbot',
      desc: t.feat1Desc || 'Symptom analysis and health guidance grounded in real-time context retrieval and ancient holistic wisdom.'
    },
    {
      icon: <Compass className="h-6 w-6 text-emerald-600" />,
      title: t.feat2Title || 'RAG Knowledge System',
      desc: t.feat2Desc || 'Retrieves highly verified, non-hallucinated home remedies, preparation steps, and herbal dosages instantly.'
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-emerald-600" />,
      title: t.feat3Title || 'Emergency Safety Shields',
      desc: t.feat3Desc || 'Built-in clinical safety models that instantly flag life-threatening symptoms and redirect you to medical care.'
    },
    {
      icon: <Activity className="h-6 w-6 text-emerald-600" />,
      title: t.feat4Title || 'Interactive Health Score',
      desc: t.feat4Desc || 'Track sleep, water, and exercise to dynamically compute your Ayurvedic wellness quotient.'
    }
  ];

  const faqs = [
    {
      q: t.faq1Q || 'Is PranAyu a replacement for a professional medical practitioner?',
      a: t.faq1A || 'No. PranAyu is an educational wellness assistant designed to provide Ayurvedic insight and lifestyle suggestions.'
    },
    {
      q: t.faq2Q || 'How does the RAG system prevent AI hallucinations?',
      a: t.faq2A || 'PranAyu integrates a Retrieval-Augmented Generation (RAG) system.'
    },
    {
      q: t.faq3Q || 'What is a Dosha (Vata, Pitta, Kapha)?',
      a: t.faq3A || 'In Ayurveda, Doshas are the three biological energies that govern our physical and mental processes.'
    },
    {
      q: t.faq4Q || 'Does this app support regional languages?',
      a: t.faq4A || 'Yes! PranAyu is fully localized in English, Hindi, and Telugu.'
    }
  ];

  return (
    <div id="landing_page_container" className="min-h-screen bg-stone-50/70 text-slate-800 selection:bg-emerald-150">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-24 pb-12 sm:pb-24 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-emerald-100/90 text-emerald-950 text-xs sm:text-sm font-extrabold border-none shadow-xs">
            <Sprout className="h-4 w-4 animate-spin-slow text-emerald-700" />
            <span className="font-semibold text-emerald-950">{t.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight tracking-tight max-w-3xl">
            {t.landingHeroTitle}
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            {t.landingHeroDesc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('auth')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-2xl shadow-md shadow-emerald-700/10 transition-all flex items-center justify-center gap-2 group cursor-pointer w-full sm:w-auto"
            >
              <span>{t.getStarted}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('remedies')}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-stone-50 text-emerald-800 font-semibold rounded-2xl border border-stone-200 shadow-sm transition-all cursor-pointer w-full sm:w-auto"
            >
              {t.exploreRemedies}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-y border-stone-200 py-6 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-12 text-slate-500 font-serif text-sm sm:text-lg">
          <div className="flex items-center gap-2"><CheckCircle className="text-emerald-600 h-4 sm:h-5 w-4 sm:w-5" /> {t.trustHerbology}</div>
          <div className="flex items-center gap-2"><CheckCircle className="text-emerald-600 h-4 sm:h-5 w-4 sm:w-5" /> {t.trustRag}</div>
          <div className="flex items-center gap-2"><CheckCircle className="text-emerald-600 h-4 sm:h-5 w-4 sm:w-5" /> {t.trustSafety}</div>
          <div className="flex items-center gap-2"><CheckCircle className="text-emerald-600 h-4 sm:h-5 w-4 sm:w-5" /> {t.trustLocalization}</div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
            {t.featuresMainTitle}
          </h2>
          <p className="text-xs sm:text-base text-slate-600">
            {t.featuresMainSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all space-y-3 sm:space-y-4 hover:-translate-y-1"
            >
              <div className="p-3 bg-emerald-50 rounded-2xl inline-block">
                {feat.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Expandable FAQs */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-center text-slate-900 mb-8 sm:mb-12">
          {t.faqTitle}
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-stone-200 rounded-2xl bg-white overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left p-4 sm:p-6 text-sm sm:text-base font-semibold flex justify-between items-center text-slate-900 hover:bg-stone-50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-emerald-700 text-lg sm:text-xl font-bold ml-2 shrink-0">{activeFaq === index ? '−' : '+'}</span>
              </button>
              {activeFaq === index && (
                <div className="p-4 sm:p-6 pt-0 text-slate-600 border-t border-stone-100 text-xs sm:text-sm leading-relaxed bg-stone-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Safety Banner */}
      <section className="bg-amber-50/60 border-t border-amber-200/80 p-5 sm:p-8 text-center max-w-5xl mx-auto rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <ShieldAlert className="h-7 sm:h-8 w-7 sm:w-8 text-amber-700 animate-pulse" />
          <h3 className="font-bold text-amber-900 text-base sm:text-lg">{t.safetyNoticeTitle}</h3>
          <p className="text-amber-800 text-xs sm:text-sm max-w-3xl leading-relaxed">
            {t.safetyDisclaimer} {t.safetyNoticeText}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 text-center border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Sprout className="h-6 w-6 text-emerald-500" />
            <span className="font-serif font-bold text-white text-xl">{t.appName}</span>
          </div>
          <p className="text-xs max-w-2xl mx-auto">
            {t.footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}
