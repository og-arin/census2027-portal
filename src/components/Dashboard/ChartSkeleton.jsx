import React from 'react';

export default function ChartSkeleton({ title = "Loading Analytics...", height = "h-72" }) {
  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-44 bg-slate-800 rounded-md" />
          <div className="h-3 w-64 bg-slate-800/60 rounded-md" />
        </div>
        <div className="h-6 w-20 bg-slate-800 rounded-full" />
      </div>

      <div className={`w-full ${height} rounded-xl bg-slate-950/60 flex items-end justify-between p-4 gap-2 border border-slate-800/40`}>
        <div className="w-full bg-slate-800/60 rounded-t-lg h-[40%]" />
        <div className="w-full bg-slate-800/70 rounded-t-lg h-[75%]" />
        <div className="w-full bg-slate-800/50 rounded-t-lg h-[55%]" />
        <div className="w-full bg-slate-800/80 rounded-t-lg h-[90%]" />
        <div className="w-full bg-slate-800/60 rounded-t-lg h-[65%]" />
        <div className="w-full bg-slate-800/50 rounded-t-lg h-[35%]" />
        <div className="w-full bg-slate-800/70 rounded-t-lg h-[80%]" />
      </div>

      <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-500">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Synthesizing live demographic data...</span>
      </div>
    </div>
  );
}
