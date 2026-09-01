import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { Building2, Users, CheckCircle, Cloud, FileSpreadsheet } from 'lucide-react';

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
    <div className="w-full bg-[#0c1829] border-b border-slate-800 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-xs">
        {/* Phase Tabs with Formal Document Tabs */}
        <div className="flex items-center gap-2">
          {/* Phase 1 Pill */}
          <button
            type="button"
            onClick={() => setCurrentPhase('phase1')}
            aria-pressed={currentPhase === 'phase1'}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold tracking-wide transition-all border ${
              currentPhase === 'phase1'
                ? 'bg-[#112238] text-amber-300 border-amber-500 shadow-sm'
                : 'bg-[#070e18] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('chatPhase1Tab')}</span>
            {phase1Prog === 100 ? (
              <span className="text-[10px] text-emerald-400 font-bold">[VERIFIED]</span>
            ) : (
              <span className="text-[10px] text-slate-400">({phase1Prog}%)</span>
            )}
          </button>

          {/* Phase 2 Pill */}
          <button
            type="button"
            onClick={() => setCurrentPhase('phase2')}
            aria-pressed={currentPhase === 'phase2'}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold tracking-wide transition-all border ${
              currentPhase === 'phase2'
                ? 'bg-[#112238] text-amber-300 border-amber-500 shadow-sm'
                : 'bg-[#070e18] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('chatPhase2Tab')}</span>
            {phase2Prog === 100 ? (
              <span className="text-[10px] text-emerald-400 font-bold">[VERIFIED]</span>
            ) : (
              <span className="text-[10px] text-slate-400">({phase2Prog}%)</span>
            )}
          </button>
        </div>

        {/* Formal Progress bar & Sync Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase text-slate-400">
              {t('chatProgress')}:
            </span>
            <div className="w-24 sm:w-32 bg-[#070e18] rounded-none h-2 overflow-hidden border border-slate-800">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${totalProg}%` }}
              />
            </div>
            <span className="text-xs font-bold text-amber-400 min-w-[32px]">
              {totalProg}%
            </span>
          </div>

          {/* Sync indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400 px-2 py-1 bg-[#070e18] border border-slate-800 rounded-sm">
            {isSaving ? (
              <span className="text-amber-400 flex items-center gap-1">
                <Cloud className="w-3 h-3 animate-pulse" aria-hidden="true" />
                <span>SAVING...</span>
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <Cloud className="w-3 h-3" aria-hidden="true" />
                <span>FIRESTORE SYNCED</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
