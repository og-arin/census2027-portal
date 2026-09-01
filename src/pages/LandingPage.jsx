import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import StateTable from '../components/StateTable';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Bot, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight, 
  FileText, 
  Layers, 
  Landmark, 
  Compass, 
  Sparkles,
  Home,
  UserCheck
} from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const { t, language } = useLanguage();

  return (
    <div className="w-full space-y-16 pb-12">
      {/* Official Government Notification Gazette Hero Section */}
      <section className="relative pt-6 sm:pt-10 pb-8 border border-slate-800 bg-[#0a1424] rounded-sm shadow-2xl overflow-hidden">
        {/* Mixed-Media Subtle Background Grid & Topographic Watermark */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#d97706 1px, transparent 1px), radial-gradient(#047857 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px'
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-8 text-center space-y-6">
          {/* Official Gazette Reference Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#070e18] border border-amber-600/40 rounded-sm text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest shadow-sm">
            <span className="w-2 h-2 rounded-none bg-amber-500" aria-hidden="true" />
            <span>GAZETTE NOTIFICATION NO. CEN-2027/DIGITAL/01</span>
          </div>

          {/* Main Headline with Authoritative Serif Typography */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {language === 'hi' ? (
              <>
                डिजिटल स्व-गणना से सशक्त <br />
                <span className="italic text-amber-400 font-serif">१४० करोड़ भारतीय नागरिक</span>
              </>
            ) : (
              <>
                Empowering National Planning Through <br />
                <span className="italic text-amber-400 font-serif">Digital Self-Enumeration</span>
              </>
            )}
          </h1>

          {/* Subheading in Clean Sans */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans font-normal">
            {t('heroSubheading')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('chat')}
              aria-label="Begin Self-Enumeration with Census Mitra AI"
              className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-3 border border-amber-400 shadow-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
              <span>{t('heroStartBtn')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              aria-label="View Statistical Analytics Dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-sm bg-[#0c1829] hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-slate-700 flex items-center justify-center gap-2.5 transition"
            >
              <BarChart3 className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>{t('heroExploreData')}</span>
            </button>
          </div>

          {/* Official Statistics Gazette Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 text-left border-t border-slate-800/80">
            <div className="p-4 bg-[#070e18]/90 border border-slate-800 rounded-sm">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                {t('heroStatsHouseholds')}
              </span>
              <p className="font-serif text-xl sm:text-2xl font-black text-amber-400 mt-1">
                32.8 Crore
              </p>
              <span className="text-[10.5px] font-mono text-slate-400 block mt-0.5">
                28 States & 8 UTs
              </span>
            </div>

            <div className="p-4 bg-[#070e18]/90 border border-slate-800 rounded-sm">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                {t('heroStatsPopulation')}
              </span>
              <p className="font-serif text-xl sm:text-2xl font-black text-white mt-1">
                1.44 Billion
              </p>
              <span className="text-[10.5px] font-mono text-emerald-400 block mt-0.5">
                100% Target Scope
              </span>
            </div>

            <div className="p-4 bg-[#070e18]/90 border border-slate-800 rounded-sm">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                AI Enumerator
              </span>
              <p className="font-serif text-xl sm:text-2xl font-black text-slate-200 mt-1">
                Census Mitra
              </p>
              <span className="text-[10.5px] font-mono text-slate-400 block mt-0.5">
                Bilingual Guided Form
              </span>
            </div>

            <div className="p-4 bg-[#070e18]/90 border border-slate-800 rounded-sm">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Legal Protection
              </span>
              <p className="font-serif text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                DPDP 2023
              </p>
              <span className="text-[10.5px] font-mono text-slate-400 block mt-0.5">
                Sec 15 Inadmissible
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Formal Textured Section Divider */}
      <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
        <div className="h-[1px] w-32 sm:w-64 bg-slate-800" />
        <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest">
          <span>🏛️</span>
          <span>STATUTORY SURVEY PHASES</span>
        </div>
        <div className="h-[1px] w-32 sm:w-64 bg-slate-800" />
      </div>

      {/* Two Phases Detailed Overview (Formal Editorial Mixed-Media Layout) */}
      <section className="space-y-8" aria-label="Survey Methodology Phases">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-500">
            {language === 'hi' ? 'द्वि-चरणीय कार्यपद्धति' : 'STATUTORY METHODOLOGY'}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
            {t('phasesHeading')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            {t('phasesSubheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase 1 Card (Formal Mixed Media Architectural / Housing Motif) */}
          <div className="bg-[#0c1829] border border-slate-700 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-amber-500/60 transition duration-200">
            {/* Top formal indicator bar */}
            <div className="h-1 w-full bg-amber-600 absolute top-0 left-0" />

            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#070e18] border border-amber-500/40 rounded-sm flex items-center justify-center text-amber-400 font-serif font-black text-lg">
                    I
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      SCHEDULE A
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {t('phase1Subtitle')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#070e18] border border-slate-800 rounded-sm font-mono text-[10px] text-slate-300">
                  <Home className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                  <span>HOUSING CENSUS</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {t('phase1Title')}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                  {t('phase1Desc')}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 font-sans">
                {t('phase1Points').map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="font-mono text-amber-500 font-bold shrink-0">[{idx + 1}]</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">
                Scope: Housing & Assets
              </span>
              <button
                type="button"
                onClick={() => onNavigate('chat')}
                className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider group-hover:translate-x-1 transition"
              >
                <span>Complete Phase 1</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Phase 2 Card (Formal Mixed Media Demographic / Citizen Portrait Motif) */}
          <div className="bg-[#0c1829] border border-slate-700 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-emerald-500/60 transition duration-200">
            {/* Top formal indicator bar */}
            <div className="h-1 w-full bg-emerald-600 absolute top-0 left-0" />

            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#070e18] border border-emerald-500/40 rounded-sm flex items-center justify-center text-emerald-400 font-serif font-black text-lg">
                    II
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      SCHEDULE B
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {t('phase2Subtitle')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#070e18] border border-slate-800 rounded-sm font-mono text-[10px] text-slate-300">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  <span>DEMOGRAPHIC RECORD</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {t('phase2Title')}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                  {t('phase2Desc')}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 font-sans">
                {t('phase2Points').map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="font-mono text-emerald-500 font-bold shrink-0">[{idx + 1}]</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">
                Scope: Demographics & Education
              </span>
              <button
                type="button"
                onClick={() => onNavigate('chat')}
                className="font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider group-hover:translate-x-1 transition"
              >
                <span>Complete Phase 2</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* State-wise Survey Dates Table */}
      <section className="space-y-4 pt-4">
        <StateTable />
      </section>
    </div>
  );
}
