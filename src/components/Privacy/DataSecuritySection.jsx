import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Scale, Lock, EyeOff, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function DataSecuritySection() {
  const { t, language } = useLanguage();

  const securityFeatures = [
    {
      code: "CLAUSE-15",
      title: t('secCensusActTitle'),
      desc: t('secCensusActDesc'),
      icon: Scale,
      color: "text-amber-400"
    },
    {
      code: "DPDP-2023",
      title: t('secDPDPTitle'),
      desc: t('secDPDPDesc'),
      icon: ShieldCheck,
      color: "text-emerald-400"
    },
    {
      code: "CRYPTO-256",
      title: t('secEncryptionTitle'),
      desc: t('secEncryptionDesc'),
      icon: Lock,
      color: "text-sky-400"
    },
    {
      code: "NON-DISCLOSURE",
      title: t('secAnonymizationTitle'),
      desc: t('secAnonymizationDesc'),
      icon: EyeOff,
      color: "text-rose-400"
    }
  ];

  return (
    <div className="w-full bg-[#0a1424] border border-slate-700 rounded-sm p-6 sm:p-8 shadow-xl font-sans space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
          STATUTORY COMPLIANCE & LEGAL ASSURANCES
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
          {t('dataSecurityHeading')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
          {t('dataSecuritySubheading')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
        {securityFeatures.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-5 bg-[#070e18] border border-slate-800 rounded-sm hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-850 pb-2">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {feat.code}
                </span>
                <Icon className={`w-4 h-4 ${feat.color}`} aria-hidden="true" />
              </div>
              <h3 className="font-serif font-bold text-white text-sm sm:text-base">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
