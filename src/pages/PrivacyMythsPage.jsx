import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import DataSecuritySection from '../components/Privacy/DataSecuritySection';
import MythVsFactCards from '../components/Privacy/MythVsFactCards';
import MisinformationReporter from '../components/Privacy/MisinformationReporter';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyMythsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-gov-saffron-500 uppercase tracking-wider">
            {language === 'hi' ? 'गोपनीयता एवं कानूनी सुरक्षा' : 'Privacy & Legal Safeguards'}
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">{t('privacyTitle')}</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-3 font-body max-w-2xl mx-auto">{t('privacySubtitle')}</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-semibold text-green-600">
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'hi' ? 'वैधानिक गोपनीयता सत्यापित' : 'Statutory Privacy Verified'}</span>
          </div>
        </div>

        <section aria-label="Legal Protections"><DataSecuritySection /></section>
        <section aria-label="Myths vs Facts"><MythVsFactCards /></section>
        <section aria-label="Report Misinformation"><MisinformationReporter /></section>
      </div>
    </div>
  );
}
