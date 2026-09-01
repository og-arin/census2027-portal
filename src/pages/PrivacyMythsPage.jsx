import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import DataSecuritySection from '../components/Privacy/DataSecuritySection';
import MythVsFactCards from '../components/Privacy/MythVsFactCards';
import MisinformationReporter from '../components/Privacy/MisinformationReporter';
import { ShieldCheck, Scale, FileText, Lock, Landmark } from 'lucide-react';

export default function PrivacyMythsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full space-y-10 pb-12 font-sans">
      {/* Formal Header */}
      <div className="p-6 sm:p-8 bg-[#0a1424] border border-slate-700 rounded-sm shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-amber-500 uppercase tracking-widest">
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            <span>STATUTORY BULLETIN • CITIZEN PRIVACY & LEGAL SAFEGUARDS</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('privacyTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
            {t('privacySubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-[#070e18] border border-emerald-800 rounded-sm font-mono text-xs text-emerald-400 self-start md:self-center">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          <span>STATUTORY PRIVACY VERIFIED</span>
        </div>
      </div>

      {/* Statutory Security & Legal Provisions */}
      <section aria-label="Legal Protections and Encryption">
        <DataSecuritySection />
      </section>

      {/* Myth vs Fact Debunking Panels */}
      <section aria-label="Fact Checked Rumor Clarifications">
        <MythVsFactCards />
      </section>

      {/* Verified Fact-Check Feed & Community Reporter */}
      <section aria-label="Misinformation Reporting and Verified Feed">
        <MisinformationReporter />
      </section>
    </div>
  );
}
