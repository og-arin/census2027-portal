import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { kpiSummary } from '../../data/dummyDashboardData';
import { Users, Home, BookOpen, Smartphone, TrendingUp, ShieldCheck } from 'lucide-react';

export default function MetricCards() {
  const { t, language } = useLanguage();

  const cards = [
    {
      title: t('kpiTotalPop'),
      value: kpiSummary.totalProjectedPopulation,
      subtext: t('kpiGrowth'),
      icon: Users,
      color: "from-amber-500 to-amber-600",
      accent: "text-amber-400",
      border: "border-amber-500/30"
    },
    {
      title: t('kpiTotalHouseholds'),
      value: kpiSummary.householdsCompleted,
      subtext: `Target: ${kpiSummary.householdsTargeted}`,
      icon: Home,
      color: "from-blue-500 to-indigo-600",
      accent: "text-sky-400",
      border: "border-blue-500/30"
    },
    {
      title: t('kpiLiteracyRate'),
      value: kpiSummary.nationalLiteracyRate,
      subtext: "+7.4% since 2011",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400",
      border: "border-emerald-500/30"
    },
    {
      title: t('kpiDigitalShare'),
      value: kpiSummary.digitalSelfEnumerationShare,
      subtext: "Self-Enumerated Online",
      icon: Smartphone,
      color: "from-purple-500 to-pink-600",
      accent: "text-purple-400",
      border: "border-purple-500/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-slate-900/80 border ${card.border} backdrop-blur-xl hover:bg-slate-800/80 transition-all duration-300 shadow-xl group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 tracking-wide">
                {card.title}
              </span>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} p-2 text-slate-950 flex items-center justify-center shadow-md`}>
                <Icon className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tight">
                {card.value}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <TrendingUp className={`w-3.5 h-3.5 ${card.accent}`} />
                <span className={card.accent}>{card.subtext}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
