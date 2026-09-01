import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { kpiSummary } from '../../data/dummyDashboardData';
import { Users, Home, BookOpen, Smartphone, TrendingUp, FileText } from 'lucide-react';

export default function MetricCards() {
  const { t, language } = useLanguage();

  const cards = useMemo(() => [
    {
      code: "METRIC-01",
      title: t('kpiTotalPop'),
      value: kpiSummary.totalProjectedPopulation,
      subtext: t('kpiGrowth'),
      icon: Users,
      accent: "text-amber-400",
      border: "border-slate-700 hover:border-amber-500/60"
    },
    {
      code: "METRIC-02",
      title: t('kpiTotalHouseholds'),
      value: kpiSummary.householdsCompleted,
      subtext: `Target Scope: ${kpiSummary.householdsTargeted}`,
      icon: Home,
      accent: "text-sky-400",
      border: "border-slate-700 hover:border-sky-500/60"
    },
    {
      code: "METRIC-03",
      title: t('kpiLiteracyRate'),
      value: kpiSummary.nationalLiteracyRate,
      subtext: "+7.4% Net Gain over 2011 Benchmark",
      icon: BookOpen,
      accent: "text-emerald-400",
      border: "border-slate-700 hover:border-emerald-500/60"
    },
    {
      code: "METRIC-04",
      title: t('kpiDigitalShare'),
      value: kpiSummary.digitalSelfEnumerationShare,
      subtext: "Self-Enumerated via Digital Portal",
      icon: Smartphone,
      accent: "text-amber-400",
      border: "border-slate-700 hover:border-amber-500/60"
    }
  ], [t]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full font-sans">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 bg-[#0c1829] border ${card.border} rounded-sm shadow-xl transition-colors duration-150 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {card.code}
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {card.title}
                </span>
              </div>

              <div className="py-1">
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                  {card.value}
                </h3>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 mt-2 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">{card.subtext}</span>
              <Icon className={`w-3.5 h-3.5 ${card.accent}`} aria-hidden="true" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
