import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages, Check } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 backdrop-blur-md">
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          language === 'en'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        title="Switch to English"
      >
        <span>English</span>
        {language === 'en' && <Check className="w-3 h-3 stroke-[3]" />}
      </button>

      <button
        onClick={() => setLanguage('hi')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          language === 'hi'
            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        title="हिन्दी में बदलें"
      >
        <span>हिन्दी</span>
        {language === 'hi' && <Check className="w-3 h-3 stroke-[3]" />}
      </button>
    </div>
  );
}
