import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mythVsFactList } from '../../data/dummyMisinformation';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Fingerprint, 
  ShieldAlert, 
  Scale, 
  Home,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function MythVsFactCards() {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState('mf_1');

  const getIcon = (name) => {
    switch (name) {
      case 'Fingerprint': return Fingerprint;
      case 'ShieldAlert': return ShieldAlert;
      case 'Scale': return Scale;
      default: return Home;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>{t('mythsHeading')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('mythsSubheading')}
          </p>
        </div>
        <span className="text-[11px] text-slate-400 italic">
          {t('sourceOfficial')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mythVsFactList.map((item) => {
          const Icon = getIcon(item.icon);
          const isExpanded = expandedId === item.id;
          const mythText = language === 'hi' ? item.myth_hi : item.myth;
          const factText = language === 'hi' ? item.fact_hi : item.fact;

          return (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 backdrop-blur-xl hover:border-slate-700 transition flex flex-col justify-between shadow-lg"
            >
              {/* Myth Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{t('mythTag')}</span>
                  </span>
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                  "{mythText}"
                </p>
              </div>

              {/* Fact Box */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('factTag')}</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
                    {factText}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
