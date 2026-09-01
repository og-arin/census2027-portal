import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mythVsFactList } from '../../data/dummyMisinformation';
import { XCircle, CheckCircle2 } from 'lucide-react';

export default function MythVsFactCards() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('mythFactHeading')}</h2>
        <p className="text-sm text-gray-500 mt-1 font-body">{t('mythFactSubheading')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mythVsFactList.map((item) => (
          <div key={item.id} className="gov-card gov-card-hover rounded-lg p-5 space-y-4">
            {/* Myth */}
            <div className="space-y-1.5 border-l-3 border-red-400 pl-3">
              <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold uppercase">
                <XCircle className="w-3.5 h-3.5" /><span>{language === 'hi' ? 'भ्रम' : 'Myth'}</span>
              </div>
              <p className="text-sm font-semibold text-gray-800 font-body">
                "{language === 'hi' ? item.myth_hi : item.myth}"
              </p>
            </div>
            {/* Fact */}
            <div className="space-y-1.5 border-l-3 border-green-500 pl-3 bg-green-50 p-3 rounded-md">
              <div className="flex items-center gap-1.5 text-green-600 text-[11px] font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" /><span>{language === 'hi' ? 'तथ्य' : 'Fact'}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-body">
                {language === 'hi' ? item.fact_hi : item.fact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
