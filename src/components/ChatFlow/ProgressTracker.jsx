import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { Building2, Users, CheckCircle, Sparkles, Cloud } from 'lucide-react';

export default function ProgressTracker() {
  const { t, language } = useLanguage();
  const { 
    currentPhase, 
    setCurrentPhase, 
    getPhase1Progress, 
    getPhase2Progress, 
    getTotalProgress,
    isSaving
  } = useCensusData();

  const phase1Prog = getPhase1Progress();
  const phase2Prog = getPhase2Progress();
  const totalProg = getTotalProgress();

  return (
    <div className="w-full bg-slate-900/80 border-b border-slate-800 p-3 sm:p-4 backdrop-blur-md">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Phase Tabs */}
        <div className="flex items-center gap-2">
          {/* Phase 1 Pill */}
          <button
            onClick={() => setCurrentPhase('phase1')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentPhase === 'phase1'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('chatPhase1Tab')}</span>
            {phase1Prog === 100 ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            ) : (
              <span className="text-[10px] opacity-80">({phase1Prog}%)</span>
            )}
          </button>

          {/* Phase 2 Pill */}
          <button
            onClick={() => setCurrentPhase('phase2')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentPhase === 'phase2'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t('chatPhase2Tab')}</span>
            {phase2Prog === 100 ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
            ) : (
              <span className="text-[10px] opacity-80">({phase2Prog}%)</span>
            )}
          </button>
        </div>

        {/* Progress bar & Sync Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">
              {t('chatProgress')}:
            </span>
            <div className="w-24 sm:w-32 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${totalProg}%` }}
              />
            </div>
            <span className="text-xs font-bold text-amber-400 min-w-[32px]">
              {totalProg}%
            </span>
          </div>

          {/* Sync indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800">
            {isSaving ? (
              <span className="text-amber-400 animate-pulse flex items-center gap-1">
                <Cloud className="w-3 h-3 animate-bounce" />
                <span>Saving...</span>
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <Cloud className="w-3 h-3" />
                <span>Firestore Synced</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
