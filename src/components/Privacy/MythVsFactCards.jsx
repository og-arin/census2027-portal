import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mythVsFactList } from '../../data/dummyMisinformation';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function MythVsFactCards() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full bg-[#0a1424] border border-slate-700 rounded-sm p-6 sm:p-8 shadow-xl font-sans space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">
          OFFICIAL FACT-CHECK DIRECTIVE
        </span>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
          {t('mythFactHeading')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
          {t('mythFactSubheading')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mythVsFactList.map((item) => (
          <div
            key={item.id}
            className="bg-[#070e18] border border-slate-800 rounded-sm p-5 space-y-4 hover:border-slate-700 transition"
          >
            {/* Myth Block */}
            <div className="space-y-1.5 border-l-2 border-rose-600 pl-3">
              <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[10.5px] font-bold uppercase">
                <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>RUMOR / MISCONCEPTION</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">
                "{language === 'hi' ? item.myth_hi : item.myth}"
              </p>
            </div>

            {/* Fact Block */}
            <div className="space-y-1.5 border-l-2 border-emerald-600 pl-3 bg-[#0c1829] p-3 rounded-none">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10.5px] font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>OFFICIAL STATUTORY FACT</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {language === 'hi' ? item.fact_hi : item.fact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
