import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Lock, EyeOff, Scale, Server, FileCheck2 } from 'lucide-react';

export default function DataSecuritySection() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Lock,
      title: t('secTitle1'),
      desc: t('secDesc1'),
      tag: "AES-256 Cloud"
    },
    {
      icon: EyeOff,
      title: t('secTitle2'),
      desc: t('secDesc2'),
      tag: "Differential Privacy"
    },
    {
      icon: Scale,
      title: t('secTitle3'),
      desc: t('secDesc3'),
      tag: "Legal Immunity"
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Main DPDP Act Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('dpdpBadge')}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {t('dpdpTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('dpdpDesc')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shrink-0 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Confidentiality Standard
            </span>
            <p className="text-2xl font-black text-emerald-400">
              100% SECURE
            </p>
            <span className="text-[10px] text-slate-400 block">
              Govt. of India Cloud
            </span>
          </div>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl hover:border-slate-700 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {feat.tag}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">
                {feat.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
