import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { populationByStateData } from '../../data/dummyDashboardData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function PopulationChart() {
  const { t, language } = useLanguage();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{label}</p>
          <p className="text-amber-400 font-semibold">
            Population: {payload[0].value} Million
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Households: {payload[0].payload.households} Million
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>{t('chartPopState')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'hi' ? '2026-2027 के लिए अनुमानित जनसांख्यिकी आंकड़े' : 'Projected 2026-2027 population across top demographic zones'}
          </p>
        </div>
        <span className="text-[11px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold">
          Top 10 States
        </span>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={populationByStateData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="state" 
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="population" radius={[6, 6, 0, 0]}>
              {populationByStateData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#ff9933'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
