import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import MetricCards from '../components/Dashboard/MetricCards';
import PopulationChart from '../components/Dashboard/PopulationChart';
import AgePyramidChart from '../components/Dashboard/AgePyramidChart';
import LiteracyChart from '../components/Dashboard/LiteracyChart';
import AmenitiesChart from '../components/Dashboard/AmenitiesChart';
import { BarChart3, TrendingUp, Sparkles, Database } from 'lucide-react';

export default function DashboardPage() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('dashTitle')}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {t('dashSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Data Sync (2026-27)</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <MetricCards />

      {/* Charts Grid: Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopulationChart />
        <AgePyramidChart />
      </div>

      {/* Charts Grid: Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiteracyChart />
        <AmenitiesChart />
      </div>
    </div>
  );
}
