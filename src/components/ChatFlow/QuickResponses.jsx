import React from 'react';

export default function QuickResponses({ options, onSelect, disabled }) {
  if (!options || options.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mb-1" role="group" aria-label="Quick response options">
      {options.map((opt, i) => (
        <button key={i} type="button" onClick={() => onSelect(opt)} disabled={disabled}
          className="px-3 py-1.5 rounded-full bg-gov-blue-50 border border-gov-blue-200 text-gov-blue-700 text-xs font-semibold hover:bg-gov-blue-100 hover:border-gov-blue-300 disabled:opacity-40 transition">
          {opt}
        </button>
      ))}
    </div>
  );
}
