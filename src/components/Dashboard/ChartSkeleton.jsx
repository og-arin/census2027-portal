import React from 'react';

export default function ChartSkeleton({ title = "Loading...", height = "h-72" }) {
  return (
    <div className="w-full gov-card rounded-lg p-5 sm:p-6">
      <div className="h-4 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className={`${height} w-full flex flex-col items-center justify-center gap-4`}>
        <div className="flex items-end gap-3 h-36">
          {[40, 65, 80, 55, 70, 45, 60, 75, 50].map((h, i) => (
            <div key={i} className="w-6 rounded-t animate-pulse bg-gray-200" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <p className="text-xs text-gray-400 font-medium">{title}</p>
      </div>
    </div>
  );
}
