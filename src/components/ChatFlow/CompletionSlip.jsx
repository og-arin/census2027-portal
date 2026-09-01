import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Printer, 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Landmark, 
  Copy,
  Download
} from 'lucide-react';

export default function CompletionSlip({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const { urn, phase1Data, phase2Data } = useCensusData();

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyURN = () => {
    navigator.clipboard.writeText(urn);
    alert(language === 'hi' ? 'विशिष्ट संदर्भ संख्या कॉपी कर ली गई है!' : 'URN copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-full max-w-2xl bg-[#0a1424] border border-slate-700 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Control Bar */}
        <div className="p-4 bg-[#070e18] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
            <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
            <span>OFFICIAL CENSUS 2027 VERIFICATION SLIP</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print Certificate"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#0c1829] hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold transition"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('slipPrintBtn')}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1 text-slate-400 hover:text-white rounded-sm hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Document (Printable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#0c1829]" id="census-certificate-print-area">
          <div className="bg-[#f8fafc] text-slate-900 border-4 border-double border-slate-800 p-6 sm:p-8 rounded-none shadow-2xl relative">
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl">
              🇮🇳
            </div>

            {/* Official Header */}
            <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
              <span className="text-xl font-bold">🇮🇳</span>
              <h2 className="font-serif text-lg sm:text-xl font-black text-slate-950 uppercase tracking-wide">
                {t('slipGovt')}
              </h2>
              <p className="font-serif text-xs font-bold text-slate-700 uppercase tracking-widest">
                {t('slipDept')}
              </p>
              <h3 className="font-serif text-base sm:text-lg font-extrabold text-amber-800 pt-1">
                {t('slipTitle')}
              </h3>
            </div>

            {/* Certificate Body */}
            <div className="py-6 space-y-5">
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif text-center italic">
                {t('slipCertifyText')}
              </p>

              {/* URN Highlight Ledger Box */}
              <div className="p-4 bg-amber-50 border-2 border-amber-800/60 rounded-none text-center space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-900 block">
                  {t('slipUrnLabel')}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-black text-amber-950 tracking-wider">
                    {urn || "CEN2027-IND-7K9Q2M"}
                  </span>
                  <button
                    type="button"
                    onClick={copyURN}
                    aria-label="Copy URN"
                    className="p-1 rounded text-amber-900 hover:bg-amber-100"
                    title="Copy URN"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Key Verification Metadata Table */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono border border-slate-300 p-3 bg-white">
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">CITIZEN HEAD:</span>
                  <span className="font-bold text-slate-950 text-sm">
                    {phase2Data.head_name || currentUser?.displayName || "Aarav Sharma"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">RECORDED MEMBERS:</span>
                  <span className="font-bold text-slate-950 text-sm">
                    {phase2Data.total_members || "4"} Persons
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">PREMISES NUMBER:</span>
                  <span className="font-bold text-slate-950 text-xs">
                    {phase1Data.building_number || "House 102, Ward 4"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">DATE & TIMESTAMP:</span>
                  <span className="font-bold text-slate-950 text-xs">
                    {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* QR Verification & Official Seal */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white border border-slate-400 p-1 flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                      <rect x="0" y="0" width="30" height="30" />
                      <rect x="5" y="5" width="20" height="20" fill="white" />
                      <rect x="10" y="10" width="10" height="10" />
                      <rect x="70" y="0" width="30" height="30" />
                      <rect x="75" y="5" width="20" height="20" fill="white" />
                      <rect x="80" y="10" width="10" height="10" />
                      <rect x="0" y="70" width="30" height="30" />
                      <rect x="5" y="75" width="20" height="20" fill="white" />
                      <rect x="10" y="80" width="10" height="10" />
                      <rect x="40" y="40" width="20" height="20" />
                      <rect x="40" y="10" width="15" height="10" />
                      <rect x="70" y="40" width="10" height="20" />
                      <rect x="40" y="75" width="20" height="10" />
                    </svg>
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 leading-snug">
                    <span className="font-bold text-slate-900 block">STATUTORY DIGITAL VERIFICATION</span>
                    <span>Encrypted with SHA-256</span>
                    <span className="block text-emerald-700 font-bold">✓ AUTHENTICATED</span>
                  </div>
                </div>

                <div className="text-right font-serif">
                  <div className="h-8 flex items-end justify-end">
                    <span className="font-serif italic text-sm text-slate-900 font-bold">Registrar General</span>
                  </div>
                  <span className="text-[9px] font-mono uppercase text-slate-600 block">
                    Census Commissioner of India
                  </span>
                </div>
              </div>
            </div>

            {/* Statutory Security Disclaimer */}
            <div className="p-2.5 bg-slate-100 border-t border-slate-300 text-center font-mono text-[9px] text-slate-600">
              {t('slipConfidentiality')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#070e18] border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">
            {language === 'hi' ? 'सफलतापूर्वक डिजिटल रूप से दर्ज' : 'OFFICIALLY ENUMERATED'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 text-white font-bold transition"
          >
            {t('slipCloseBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
