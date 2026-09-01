import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function QuickResponses({ options = [], onSelect, disabled }) {
  const { t, language } = useLanguage();

  if (!options || options.length === 0) return null;

  return (
    <div className="w-full py-2 px-1">
      <div className="flex items-center gap-1.5 mb-2 text-[11px] font-bold text-amber-400">
        <Sparkles className="w-3 h-3" />
        <span>{t('quickSuggestion')}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={disabled}
            onClick={() => onSelect(option)}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700/80 hover:border-amber-400 text-xs font-medium transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            <span>{option}</span>
            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
