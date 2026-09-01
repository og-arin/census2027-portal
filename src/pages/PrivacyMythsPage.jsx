import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import DataSecuritySection from '../components/Privacy/DataSecuritySection';
import MythVsFactCards from '../components/Privacy/MythVsFactCards';
import MisinformationReporter from '../components/Privacy/MisinformationReporter';
import { ShieldCheck, Lock, Sparkles, Scale } from 'lucide-react';

export default function PrivacyMythsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full space-y-12 pb-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'hi' ? 'कानूनी गोपनीयता एवं सुरक्षा' : 'Data Integrity & Legal Safeguards'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('privacyHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {t('privacySubheading')}
        </p>
      </div>

      {/* 1. Data Security & DPDP Compliance */}
      <DataSecuritySection />

      {/* 2. Myth vs Official Fact Interactive Cards */}
      <MythVsFactCards />

      {/* 3. Live Misinformation Fact-Checking Feed & Report Form */}
      <MisinformationReporter />
    </div>
  );
}
