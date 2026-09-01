import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { useAuth } from '../../context/AuthContext';
import { X, Building2, Users, Database, ShieldCheck, CheckCircle2, FileSpreadsheet } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="w-full max-w-lg bg-[#0a1424] border-l border-slate-700 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#070e18]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0c1829] border border-amber-500/40 rounded-sm flex items-center justify-center text-amber-400 font-mono text-sm font-bold">
              DOC
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base">{t('previewTitle')}</h3>
              <p className="text-[10.5px] text-slate-400 font-mono">
                RECORD ID: /enumerations/{currentUser?.uid || 'user_id'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Statutory Notice */}
          <div className="p-3.5 bg-[#070e18] border border-emerald-800/80 rounded-sm flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-emerald-300 leading-relaxed font-sans">
              {t('previewSubtitle')}
            </p>
          </div>

          {/* Phase 1 Summary */}
          <div className="bg-[#070e18] rounded-sm border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span>{t('phase1Title')}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-slate-900 text-slate-300 border border-slate-800">
                {phase1Entries.length} RECORDED
              </span>
            </div>

            {phase1Entries.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">{t('previewEmpty')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {phase1Entries.map(([k, v]) => (
                  <div key={k} className="p-2.5 bg-[#0c1829] border border-slate-800 rounded-sm">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">
                      {formatKey(k)}
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5 block font-sans">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Phase 2 Summary */}
          <div className="bg-[#070e18] rounded-sm border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>{t('phase2Title')}</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-slate-900 text-slate-300 border border-slate-800">
                {phase2Entries.length} RECORDED
              </span>
            </div>

            {phase2Entries.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">{t('previewEmpty')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {phase2Entries.map(([k, v]) => (
                  <div key={k} className="p-2.5 bg-[#0c1829] border border-slate-800 rounded-sm">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 block uppercase">
                      {formatKey(k)}
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5 block font-sans">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-[#070e18]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onGenerateSlip();
            }}
            className="w-full py-3 rounded-sm bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
          >
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>{t('previewSubmitFinal')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
