import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      className="flex items-center bg-[#0c1829] p-0.5 rounded-sm border border-slate-750 font-mono text-xs"
      role="region"
      aria-label="Language Switcher"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-wider uppercase transition-colors ${
          language === 'en'
            ? 'bg-amber-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
        title="Switch to English"
      >
        <span>EN</span>
        {language === 'en' && <Check className="w-2.5 h-2.5 stroke-[3]" aria-hidden="true" />}
      </button>

      <button
        type="button"
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-wider transition-colors ${
          language === 'hi'
            ? 'bg-amber-600 text-white shadow-sm'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }`}
        title="हिन्दी में बदलें"
      >
        <span>हिन्दी</span>
        {language === 'hi' && <Check className="w-2.5 h-2.5 stroke-[3]" aria-hidden="true" />}
      </button>
    </div>
  );
}
