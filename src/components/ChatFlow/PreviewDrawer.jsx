import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { useAuth } from '../../context/AuthContext';
import { X, Building2, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PreviewDrawer({ isOpen, onClose, onGenerateSlip }) {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const { phase1Data, phase2Data } = useCensusData();

  if (!isOpen) return null;

  const phase1Entries = Object.entries(phase1Data);
  const phase2Entries = Object.entries(phase2Data);
  const formatKey = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl overflow-hidden border-l border-gray-200">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <h3 className="font-bold text-gray-900 text-base">{t('previewTitle')}</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">ID: /enumerations/{currentUser?.uid || 'user_id'}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <p className="text-xs text-green-700 font-body">{t('previewSubtitle')}</p>
          </div>

          {/* Phase 1 */}
          <div className="gov-card rounded-lg p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gov-saffron-600 font-semibold text-xs">
                <Building2 className="w-4 h-4" /><span>{t('phase1Title')}</span>
              </div>
              <span className="badge-gov bg-gray-100 text-gray-600 border border-gray-200">{phase1Entries.length} recorded</span>
            </div>
            {phase1Entries.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-2">{t('previewEmpty')}</p>
            ) : (
              <div className="space-y-2">
                {phase1Entries.map(([k, v]) => (
                  <div key={k} className="p-2.5 bg-gray-50 border border-gray-100 rounded-md">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase block">{formatKey(k)}</span>
                    <span className="text-xs font-semibold text-gray-800 mt-0.5 block font-body">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Phase 2 */}
          <div className="gov-card rounded-lg p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gov-green-500 font-semibold text-xs">
                <Users className="w-4 h-4" /><span>{t('phase2Title')}</span>
              </div>
              <span className="badge-gov bg-gray-100 text-gray-600 border border-gray-200">{phase2Entries.length} recorded</span>
            </div>
            {phase2Entries.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-2">{t('previewEmpty')}</p>
            ) : (
              <div className="space-y-2">
                {phase2Entries.map(([k, v]) => (
                  <div key={k} className="p-2.5 bg-gray-50 border border-gray-100 rounded-md">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase block">{formatKey(k)}</span>
                    <span className="text-xs font-semibold text-gray-800 mt-0.5 block font-body">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button type="button" onClick={() => { onClose(); onGenerateSlip(); }}
            className="w-full py-3 rounded-lg bg-gov-blue-700 hover:bg-gov-blue-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition">
            <CheckCircle2 className="w-4 h-4" /><span>{t('previewSubmitFinal')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
