import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Check } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 bg-white/20 rounded-md p-0.5 text-xs" role="region" aria-label="Language Switcher">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-2.5 py-1 rounded font-semibold transition ${
          language === 'en' ? 'bg-white text-gov-blue-700 shadow-sm' : 'text-white/80 hover:text-white'
        }`}
        title="Switch to English"
      >
        ENG
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
        className={`px-2.5 py-1 rounded font-semibold transition ${
          language === 'hi' ? 'bg-white text-gov-blue-700 shadow-sm' : 'text-white/80 hover:text-white'
        }`}
        title="हिन्दी में बदलें"
      >
        हिन्दी
      </button>
    </div>
  );
}
