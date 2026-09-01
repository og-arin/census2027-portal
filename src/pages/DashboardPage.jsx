import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import MetricCards from '../components/Dashboard/MetricCards';
import PopulationChart from '../components/Dashboard/PopulationChart';
import AgePyramidChart from '../components/Dashboard/AgePyramidChart';
import LiteracyChart from '../components/Dashboard/LiteracyChart';
import AmenitiesChart from '../components/Dashboard/AmenitiesChart';
import { BarChart3, Database, FileSpreadsheet, Download, RefreshCw, Landmark } from 'lucide-react';

export default function DashboardPage() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full space-y-8 pb-12 font-sans">
      {/* Formal Statistical Bulletin Header */}
      <div className="p-6 sm:p-8 bg-[#0a1424] border border-slate-700 rounded-sm shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-amber-500 uppercase tracking-widest">
            <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
            <span>STATISTICAL BULLETIN NO. CEN2027-REP-01 • DEMOGRAPHIC REPOSITORY</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('dashTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
            {t('dashSubtitle')}
          </p>
        </div>

        {/* Report Metadata Controls */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="p-2.5 px-3 bg-[#070e18] border border-slate-800 rounded-sm text-left">
            <span className="text-[9px] text-slate-500 block uppercase">LAST SYNCHRONIZED:</span>
            <span className="font-bold text-slate-200 text-xs">
              {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0c1829] hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-sm font-bold transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span>PRINT BULLETIN</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Panels */}
      <section aria-label="Key Demographic Indicators">
        <MetricCards />
      </section>

      {/* Primary Visualizations Grid (Styled like Official Report Panels) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Population and Demographics">
        <PopulationChart />
        <AgePyramidChart />
      </section>

      {/* Secondary Socio-Economic Visualizations */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Literacy and Household Infrastructure">
        <LiteracyChart />
        <AmenitiesChart />
      </section>

      {/* Official Data Source Attribution Footer */}
      <div className="p-4 bg-[#070e18] border border-slate-800 rounded-sm font-mono text-[10.5px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>DATA SOURCE: OFFICE OF THE REGISTRAR GENERAL & CENSUS COMMISSIONER, INDIA</span>
        <span>AGGREGATE STATISTICAL DISCLOSURE • SECTION 15 COMPLIANT</span>
      </div>
    </div>
  );
}
