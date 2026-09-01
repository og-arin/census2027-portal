import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { literacyData } from '../../data/dummyDashboardData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function LiteracyChart() {
  const { t, language } = useLanguage();

  const data = useMemo(() => literacyData, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#070e18] border border-slate-700 p-3 rounded-sm shadow-2xl text-xs font-mono space-y-1">
          <p className="font-bold text-white font-serif">{label}</p>
          <p className="text-sky-400 font-semibold">
            MALE LITERACY: {payload[0]?.value}%
          </p>
          <p className="text-rose-400 font-semibold">
            FEMALE LITERACY: {payload[1]?.value}%
          </p>
          <p className="text-amber-400 font-bold pt-1 border-t border-slate-800">
            STATE AVERAGE: {payload[0]?.payload?.average}%
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
          <div className="text-[10px] font-mono font-bold text-sky-500 uppercase tracking-widest">
            FIGURE 3.0 • EDUCATIONAL ATTAINMENT
          </div>
          <h3 className="font-serif font-bold text-white text-base sm:text-lg">
            {t('chartLiteracy')}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {language === 'hi' ? 'लैंगिक साक्षरता तुलना व राज्यवार आंकड़े' : 'State-level gender comparison in educational literacy rates'}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="badge-formal bg-[#070e18] text-sky-400 border-sky-800">
            MALE
          </span>
          <span className="badge-formal bg-[#070e18] text-rose-400 border-rose-800">
            FEMALE
          </span>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="formalMaleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="formalFemaleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#be123c" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#be123c" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" />
            <XAxis 
              dataKey="state" 
              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis domain={[50, 100]} tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="male" 
              stroke="#0284c7" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#formalMaleGrad)" 
            />
            <Area 
              type="monotone" 
              dataKey="female" 
              stroke="#be123c" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#formalFemaleGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
