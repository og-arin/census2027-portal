import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { Users, Home, GraduationCap, TrendingUp, BarChart3, Percent } from 'lucide-react';

export default function MetricCards() {
  const { t, language } = useLanguage();
  const { censusData } = useCensusData();

  const totalPop = censusData.population.reduce((s, d) => s + d.population, 0);
  const avgLit = (censusData.literacy.reduce((s, d) => s + d.male + d.female, 0) / (censusData.literacy.length * 2)).toFixed(1);
  const totalHouseholds = Math.round(totalPop / 4.5);
  const growthRate = "1.12%";

  const cards = [
    {
      label: language === 'hi' ? 'कुल जनसंख्या' : 'Total Population',
      value: totalPop.toLocaleString('en-IN'),
      icon: Users,
      color: 'gov-blue',
      bg: 'bg-gov-blue-50',
      border: 'border-gov-blue-200',
      text: 'text-gov-blue-700',
    },
    {
      label: language === 'hi' ? 'कुल परिवार' : 'Total Households',
      value: totalHouseholds.toLocaleString('en-IN'),
      icon: Home,
      color: 'gov-saffron',
      bg: 'bg-gov-saffron-50',
      border: 'border-gov-saffron-200',
      text: 'text-gov-saffron-600',
    },
    {
      label: language === 'hi' ? 'साक्षरता दर' : 'Avg Literacy Rate',
      value: `${avgLit}%`,
      icon: GraduationCap,
      color: 'gov-green',
      bg: 'bg-gov-green-50',
      border: 'border-gov-green-200',
      text: 'text-gov-green-500',
    },
    {
      label: language === 'hi' ? 'वार्षिक वृद्धि' : 'Annual Growth',
      value: growthRate,
      icon: TrendingUp,
      color: 'purple',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className={`gov-card gov-card-hover rounded-lg p-5 border ${card.border}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.text}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1 font-body">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
