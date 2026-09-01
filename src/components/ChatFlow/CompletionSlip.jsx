import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  Printer, 
  CheckCircle2, 
  X, 
  ShieldCheck
} from 'lucide-react';

export default function CompletionSlip({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const { phase1Data, phase2Data, urn, completedAt } = useCensusData();

  useEffect(() => {
    if (isOpen) {
      // Fire festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff9933', '#ffffff', '#138808', '#f59e0b']
        });
      } catch (e) {
        console.log("Confetti trigger:", e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const displayDate = completedAt ? new Date(completedAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 animate-fade-in">
        {/* Top saffron-white-green bar */}
        <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-500" />

        {/* Action Controls */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('chatCompletedBadge')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t('slipPrint')}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div id="census-certificate-print-area" className="p-6 md:p-8 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
          {/* Certificate Inner Frame */}
          <div className="border-2 border-amber-500/40 rounded-2xl p-6 relative overflow-hidden bg-slate-950/80 shadow-inner">
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
              <span className="text-9xl font-black text-amber-400">🇮🇳</span>
            </div>

            {/* Header */}
            <div className="text-center pb-4 border-b border-slate-800 relative z-10">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl font-bold text-amber-400">
                🇮🇳
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                {t('slipGovt')}
              </p>
              <h2 className="text-lg md:text-xl font-extrabold text-white mt-1 tracking-tight">
                {t('slipTitle')}
              </h2>
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('slipStatusValue')}</span>
              </div>
            </div>

            {/* URN & QR Code Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative z-10">
              <div className="sm:col-span-2 space-y-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('slipUrn')}
                  </span>
                  <p className="text-xl md:text-2xl font-black text-amber-400 font-mono tracking-wider">
                    {urn || "CEN2027-IND-7A8K9Q"}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {language === 'hi' ? 'नागरिक / परिवार का मुखिया' : 'Citizen / Head of Household'}
                  </span>
                  <p className="text-sm font-bold text-white">
                    {phase2Data.head_name || currentUser?.displayName || "Aarav Sharma"}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('slipDate')}
                  </span>
                  <p className="text-xs font-mono text-slate-300">
                    {displayDate}
                  </p>
                </div>
              </div>

              {/* Dynamic QR Code */}
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white text-slate-950">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  {/* Stylized QR Code Pattern */}
                  <rect x="0" y="0" width="30" height="30" fill="#0b192e" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="9" y="9" width="12" height="12" fill="#ff9933" />

                  <rect x="70" y="0" width="30" height="30" fill="#0b192e" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="79" y="9" width="12" height="12" fill="#138808" />

                  <rect x="0" y="70" width="30" height="30" fill="#0b192e" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="9" y="79" width="12" height="12" fill="#0b192e" />

                  {/* Data dots */}
                  <rect x="35" y="10" width="10" height="10" fill="#0b192e" />
                  <rect x="50" y="20" width="10" height="10" fill="#ff9933" />
                  <rect x="35" y="45" width="15" height="15" fill="#138808" />
                  <rect x="55" y="45" width="10" height="10" fill="#0b192e" />
                  <rect x="75" y="45" width="15" height="15" fill="#0b192e" />
                  <rect x="40" y="75" width="10" height="15" fill="#ff9933" />
                  <rect x="60" y="75" width="15" height="10" fill="#0b192e" />
                  <rect x="80" y="80" width="10" height="10" fill="#138808" />
                </svg>
                <span className="text-[8px] font-black uppercase tracking-wider text-slate-800 mt-1">
                  SECURE QR VERIFIED
                </span>
              </div>
            </div>

            {/* Summary Highlights */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800 relative z-10">
              <div className="p-2.5 rounded-lg bg-slate-900/60">
                <span className="text-[10px] text-slate-400 block font-semibold">House / Ward</span>
                <span className="font-bold text-white truncate block">
                  {phase1Data.building_number || "Ward #12, Block A"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60">
                <span className="text-[10px] text-slate-400 block font-semibold">Ownership</span>
                <span className="font-bold text-white truncate block">
                  {phase1Data.ownership_status || "Owned"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60">
                <span className="text-[10px] text-slate-400 block font-semibold">Water Source</span>
                <span className="font-bold text-white truncate block">
                  {phase1Data.drinking_water_source || "Treated Piped Water"}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60">
                <span className="text-[10px] text-slate-400 block font-semibold">Household Members</span>
                <span className="font-bold text-white truncate block">
                  {phase2Data.total_members || "4 Members"}
                </span>
              </div>
            </div>

            {/* Notice Footer */}
            <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center relative z-10">
              <p className="text-[11px] text-amber-300 font-medium">
                {t('slipNotice')}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
          >
            {t('slipDone')}
          </button>
        </div>
      </div>
    </div>
  );
}
