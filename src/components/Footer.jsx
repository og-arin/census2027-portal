import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, PhoneCall, FileText, Lock, ExternalLink, Scale, Landmark } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full bg-[#050a12] border-t border-slate-800 pt-12 pb-8 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Upper Gazette Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80 text-xs">
          {/* Col 1: Government Authority */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#0c1829] border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
                🇮🇳
              </div>
              <div>
                <span className="font-serif font-bold text-white text-sm block">
                  {t('portalTitle')}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">
                  STATUTORY REPOSITORY
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {t('slipGovt')}
            </p>
            <div className="pt-1">
              <span className="badge-formal bg-emerald-950/40 text-emerald-400 border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t('dpdpBadge')}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Official Portals */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1">
              {language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portals'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://censusindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center justify-between transition group">
                  <span>Census of India (ORGI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center justify-between transition group">
                  <span>Digital India Initiative</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a href="https://mha.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center justify-between transition group">
                  <span>Ministry of Home Affairs</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-amber-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Safeguards */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1">
              {language === 'hi' ? 'वैधानिक सुरक्षा' : 'Statutory Safeguards'}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-slate-300">
                <Scale className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden="true" />
                <span>Census Act 1948 (Sec 15 Inadmissible)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                <span>DPDP Act 2023 Statutory Privacy</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-sky-500 shrink-0" aria-hidden="true" />
                <span>Zero Commercial Data Dissemination</span>
              </li>
            </ul>
          </div>

          {/* Col 4: National Helpdesk */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-1">
              {language === 'hi' ? 'राष्ट्रीय सहायता केंद्र' : 'National Helpdesk'}
            </h4>
            <div className="p-3 bg-[#0c1829] border border-slate-800 rounded-sm">
              <div className="flex items-center gap-2 text-amber-400 font-mono">
                <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-sm font-bold tracking-wider">1800-11-2027</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                {language === 'hi' ? 'टोल-फ्री राष्ट्रीय हेल्पलाइन (24x7 उपलब्ध)' : 'Toll-Free National Helpline (24x7 Multi-lingual)'}
              </p>
            </div>
          </div>
        </div>

        {/* Lower Gazette Ribbon */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <p className="text-center md:text-left">
            {t('footerRights')}
          </p>
          <p className="text-amber-500/80 text-center font-sans">
            {t('footerDisclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
