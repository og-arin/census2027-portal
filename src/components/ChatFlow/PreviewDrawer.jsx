import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { useAuth } from '../../context/AuthContext';
import { X, Building2, Users, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PreviewDrawer({ isOpen, onClose, onGenerateSlip }) {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const { phase1Data, phase2Data } = useCensusData();

  if (!isOpen) return null;

  const phase1Entries = Object.entries(phase1Data);
  const phase2Entries = Object.entries(phase2Data);

  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{t('previewTitle')}</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                /enumerations/{currentUser?.uid || 'user_id'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Notice */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-300 leading-relaxed">
              {t('previewSubtitle')}
            </p>
          </div>

          {/* Phase 1 Summary */}
          <div className="bg-slate-950/50 rounded-2xl border border-slate-800/80 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>{t('phase1Title')}</span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {phase1Entries.length} Recorded
              </span>
            </div>

            {phase1Entries.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">{t('previewEmpty')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {phase1Entries.map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                      {formatKey(k)}
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5 block">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Phase 2 Summary */}
          <div className="bg-slate-950/50 rounded-2xl border border-slate-800/80 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>{t('phase2Title')}</span>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {phase2Entries.length} Recorded
              </span>
            </div>

            {phase2Entries.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">{t('previewEmpty')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {phase2Entries.map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                      {formatKey(k)}
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5 block">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 space-y-2">
          <button
            onClick={() => {
              onClose();
              onGenerateSlip();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('previewSubmitFinal')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
