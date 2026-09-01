import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, PhoneCall, Globe, FileText, Lock, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">
          {/* Col 1: Government Brand & Emblem */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-sm font-bold text-amber-400">
                🇮🇳
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">
                {t('portalTitle')}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('slipGovt')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t('dpdpBadge')}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {language === 'hi' ? 'महत्वपूर्ण लिंक्स' : 'Quick Portals'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://censusindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition">
                  <span>Census of India (ORGI)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition">
                  <span>Digital India Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://mha.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition">
                  <span>Ministry of Home Affairs</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Privacy */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {language === 'hi' ? 'कानूनी व गोपनीयता' : 'Confidentiality & Laws'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Census Act, 1948 (Sec 15 Protected)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>DPDP Act 2023 Safe Compliance</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Zero Commercial Data Sharing</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Toll-Free Helpline */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {language === 'hi' ? 'सहायता केंद्र' : 'Citizen Helpdesk'}
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400">
                <PhoneCall className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">1800-11-2027</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {language === 'hi' ? 'टोल-फ्री राष्ट्रीय हेल्पलाइन (24x7 उपलब्ध)' : 'Toll-Free National Helpline (24x7 Multi-lingual)'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p className="text-center md:text-left">
            {t('footerRights')}
          </p>
          <p className="text-amber-500/80 text-center font-medium">
            {t('footerDisclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}
