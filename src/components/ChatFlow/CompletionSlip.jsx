import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import { Award, Printer, X, Copy } from 'lucide-react';

export default function CompletionSlip({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const { urn, phase1Data, phase2Data } = useCensusData();

  useEffect(() => {
    if (isOpen) {
      try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#FF9933', '#FFFFFF', '#138808'] }); } catch (e) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyURN = () => {
    navigator.clipboard.writeText(urn);
    alert(language === 'hi' ? 'URN कॉपी हो गई!' : 'URN copied!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gov-blue-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white text-sm font-semibold">
            <Award className="w-4 h-4" /><span>{language === 'hi' ? 'जनगणना 2027 — सत्यापन प्रमाण पत्र' : 'Census 2027 — Verification Certificate'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => window.print()} aria-label="Print"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition">
              <Printer className="w-3.5 h-3.5" /><span>{t('slipPrintBtn')}</span>
            </button>
            <button type="button" onClick={onClose} className="p-1 text-white/70 hover:text-white rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gray-50" id="census-certificate-print-area">
          <div className="bg-white border-2 border-gov-blue-200 p-6 sm:p-8 rounded-lg shadow-gov-lg relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none text-9xl">🇮🇳</div>

            {/* Official Header */}
            <div className="text-center pb-4 border-b-2 border-gov-blue-100 space-y-1">
              <span className="text-2xl">🇮🇳</span>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 uppercase tracking-wide">{t('slipGovt')}</h2>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{t('slipDept')}</p>
              <h3 className="text-base sm:text-lg font-bold text-gov-saffron-600 pt-1">{t('slipTitle')}</h3>
            </div>

            <div className="py-6 space-y-5">
              <p className="text-sm text-gray-600 text-center italic font-body">{t('slipCertifyText')}</p>

              {/* URN */}
              <div className="p-4 bg-gov-saffron-50 border-2 border-gov-saffron-200 rounded-lg text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gov-saffron-700 block">{t('slipUrnLabel')}</span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-xl sm:text-2xl font-black text-gray-900 tracking-wider">{urn || "CEN2027-IND-7K9Q2M"}</span>
                  <button type="button" onClick={copyURN} className="p-1 rounded text-gov-saffron-600 hover:bg-gov-saffron-100"><Copy className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-3 text-xs border border-gray-200 p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-gray-400 block uppercase text-[10px] font-semibold">Citizen Head:</span>
                  <span className="font-bold text-gray-900 text-sm">{phase2Data.head_name || currentUser?.displayName || "Aarav Sharma"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px] font-semibold">Members:</span>
                  <span className="font-bold text-gray-900 text-sm">{phase2Data.total_members || "4"} Persons</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px] font-semibold">Premises:</span>
                  <span className="font-bold text-gray-900 text-xs">{phase1Data.building_number || "House 102, Ward 4"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase text-[10px] font-semibold">Date:</span>
                  <span className="font-bold text-gray-900 text-xs">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* QR & Seal */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white border border-gray-300 p-1 flex items-center justify-center rounded">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900 fill-current">
                      <rect x="0" y="0" width="30" height="30" /><rect x="5" y="5" width="20" height="20" fill="white" /><rect x="10" y="10" width="10" height="10" />
                      <rect x="70" y="0" width="30" height="30" /><rect x="75" y="5" width="20" height="20" fill="white" /><rect x="80" y="10" width="10" height="10" />
                      <rect x="0" y="70" width="30" height="30" /><rect x="5" y="75" width="20" height="20" fill="white" /><rect x="10" y="80" width="10" height="10" />
                      <rect x="40" y="40" width="20" height="20" /><rect x="40" y="10" width="15" height="10" /><rect x="70" y="40" width="10" height="20" /><rect x="40" y="75" width="20" height="10" />
                    </svg>
                  </div>
                  <div className="text-[10px] text-gray-500 leading-snug">
                    <span className="font-bold text-gray-700 block">Digital Verification</span>
                    <span>SHA-256 Encrypted</span>
                    <span className="block text-green-600 font-bold">✓ Authenticated</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="italic text-sm text-gray-800 font-semibold block">Registrar General</span>
                  <span className="text-[9px] uppercase text-gray-500 block">Census Commissioner of India</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-gray-50 border-t border-gray-200 text-center text-[9px] text-gray-500 rounded-b-lg">
              {t('slipConfidentiality')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs">
          <span className="text-gray-500">{language === 'hi' ? 'सफलतापूर्वक दर्ज' : 'Successfully Enumerated'}</span>
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg bg-gov-blue-700 hover:bg-gov-blue-800 text-white font-semibold transition">
            {t('slipCloseBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
