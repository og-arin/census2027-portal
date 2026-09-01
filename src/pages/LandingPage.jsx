import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import StateTable from '../components/StateTable';
import { 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Users, 
  ShieldCheck, 
  Bot, 
  CheckCircle2, 
  BarChart3, 
  Clock, 
  Award,
  Globe2,
  Lock
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const { t, language } = useLanguage();

  return (
    <div className="w-full space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 md:pt-12 pb-8 overflow-hidden">
        {/* Background tricolor glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>{t('heroBadge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {language === 'hi' ? (
              <>
                डिजिटल स्व-गणना से सशक्त बनता <br />
                <span className="text-gradient-saffron">हर भारतीय नागरिक</span>
              </>
            ) : (
              <>
                Empowering 1.4 Billion Citizens Through <br />
                <span className="text-gradient-saffron">Digital Self-Enumeration</span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('heroSubheading')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('chat')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Bot className="w-5 h-5" />
              <span>{t('heroStartBtn')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm sm:text-base border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2.5 transition"
            >
              <BarChart3 className="w-5 h-5 text-sky-400" />
              <span>{t('heroExploreData')}</span>
            </button>
          </div>

          {/* Key Quick Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 text-left">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {t('heroStatsHouseholds')}
              </span>
              <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">
                32.8 Crore
              </p>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Across 28 States & 8 UTs
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {t('heroStatsPopulation')}
              </span>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">
                1.44 Billion
              </p>
              <span className="text-[11px] text-emerald-400 block mt-0.5">
                100% Coverage Target
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                AI Enumeration
              </span>
              <p className="text-xl sm:text-2xl font-black text-sky-400 mt-1">
                Census Mitra
              </p>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Multi-lingual Voice & Chat
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Privacy Guarantee
              </span>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                DPDP 2023
              </p>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Sec 15 Census Act Protected
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Phases Detailed Overview */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            {language === 'hi' ? 'सर्वेक्षण प्रक्रिया' : 'Systematic Methodology'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('phasesHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t('phasesSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase 1 Card */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-amber-500/30 p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between group hover:border-amber-500/60 transition duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  {t('phase1Subtitle')}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {t('phase1Title')}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {t('phase1Desc')}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {t('phase1Points').map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Focus: Living Conditions & Infrastructure
              </span>
              <button
                onClick={() => onNavigate('chat')}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition"
              >
                <span>Start Phase 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900/80 border border-emerald-500/30 p-6 md:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between group hover:border-emerald-500/60 transition duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                  {t('phase2Subtitle')}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {t('phase2Title')}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {t('phase2Desc')}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {t('phase2Points').map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                Focus: Demographics, Education & Occupation
              </span>
              <button
                onClick={() => onNavigate('chat')}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition"
              >
                <span>Start Phase 2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* State-wise Survey Dates Table */}
      <section className="space-y-4">
        <StateTable />
      </section>
    </div>
  );
}
