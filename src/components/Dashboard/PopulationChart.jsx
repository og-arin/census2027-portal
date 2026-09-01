import React, { useMemo } from 'react';
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
import { BarChart3, FileSpreadsheet } from 'lucide-react';

export default function PopulationChart() {
  const { t, language } = useLanguage();

  const data = useMemo(() => populationByStateData, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#070e18] border border-slate-700 p-3 rounded-sm shadow-2xl text-xs font-mono space-y-1">
          <p className="font-bold text-white font-serif">{label}</p>
          <p className="text-amber-400 font-semibold">
            POPULATION: {payload[0].value}M PERSONS
          </p>
          <p className="text-slate-400 text-[10px]">
            HOUSEHOLDS: {payload[0].payload.households}M UNITS
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#0c1829] border border-slate-700 rounded-sm p-5 sm:p-6 shadow-xl font-sans">
      {/* Formal Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
            FIGURE 1.0 • DEMOGRAPHIC PROJECTION
          </div>
          <h3 className="font-serif font-bold text-white text-base sm:text-lg">
            {t('chartPopState')}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {language === 'hi' ? 'शीर्ष १० जनसांख्यिकीय राज्यों में अनुमानित जनसंख्या' : 'Projected 2026-2027 population across top demographic zones'}
          </p>
        </div>
        <span className="badge-formal bg-[#070e18] text-slate-300 border-slate-700 self-start sm:self-center">
          TOP 10 STATES
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="state" 
              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="population" radius={[0, 0, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#d97706'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
