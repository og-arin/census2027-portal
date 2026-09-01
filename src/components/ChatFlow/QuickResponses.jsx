import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CornerDownRight } from 'lucide-react';

export default function QuickResponses({ options = [], onSelect, disabled }) {
  const { t, language } = useLanguage();

  if (!options || options.length === 0) return null;

  return (
    <div className="w-full py-2.5 px-1 font-mono">
      <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
        <CornerDownRight className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{t('quickSuggestion')}</span>
      </div>

      <div 
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Standard Survey Options"
      >
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option)}
            aria-label={`Select option: ${option}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0c1829] hover:bg-[#152948] text-slate-200 hover:text-amber-300 border border-slate-700 hover:border-amber-500/60 text-xs font-sans font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none shadow-sm focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <span className="font-mono text-[10px] text-amber-500 font-bold">[{index + 1}]</span>
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
