import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { Building2, Users, Cloud, CheckCircle2 } from 'lucide-react';

export default function ProgressTracker() {
  const { t, language } = useLanguage();
  const { currentPhase, setCurrentPhase, getPhase1Progress, getPhase2Progress, getTotalProgress, isSaving } = useCensusData();
  const phase1Prog = getPhase1Progress();
  const phase2Prog = getPhase2Progress();
  const totalProg = getTotalProgress();

  return (
    <div className="w-full bg-white border-b border-gray-200 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
        {/* Phase Tabs */}
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setCurrentPhase('phase1')} aria-pressed={currentPhase === 'phase1'}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition border ${
              currentPhase === 'phase1' ? 'bg-gov-blue-50 text-gov-blue-700 border-gov-blue-200' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}>
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('chatPhase1Tab')}</span>
            {phase1Prog === 100 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <span className="text-[10px] font-bold text-gray-400">{phase1Prog}%</span>
            )}
          </button>
          <button type="button" onClick={() => setCurrentPhase('phase2')} aria-pressed={currentPhase === 'phase2'}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition border ${
              currentPhase === 'phase2' ? 'bg-gov-blue-50 text-gov-blue-700 border-gov-blue-200' : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}>
            <Users className="w-3.5 h-3.5" />
            <span>{t('chatPhase2Tab')}</span>
            {phase2Prog === 100 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <span className="text-[10px] font-bold text-gray-400">{phase2Prog}%</span>
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-gray-500">{t('chatProgress')}:</span>
            <div className="w-24 sm:w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-gov-saffron-500 h-full rounded-full transition-all duration-300" style={{ width: `${totalProg}%` }} />
            </div>
            <span className="text-xs font-bold text-gov-blue-700">{totalProg}%</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-gray-400 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md">
            {isSaving ? (
              <span className="text-gov-saffron-500 flex items-center gap-1"><Cloud className="w-3 h-3 animate-pulse" /> Saving...</span>
            ) : (
              <span className="text-green-500 flex items-center gap-1"><Cloud className="w-3 h-3" /> Synced</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
