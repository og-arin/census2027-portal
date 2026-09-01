import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { agePyramidData } from '../../data/dummyDashboardData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function AgePyramidChart() {
  const { t, language } = useLanguage();

  const data = useMemo(() => agePyramidData, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const maleVal = Math.abs(payload[0]?.value || 0);
      const femaleVal = payload[1]?.value || 0;
      return (
        <div className="bg-[#070e18] border border-slate-700 p-3 rounded-sm shadow-2xl text-xs font-mono space-y-1">
          <p className="font-bold text-white font-serif">AGE COHORT: {label}</p>
          <p className="text-amber-400 font-semibold">
            {t('chartMale')}: {maleVal}%
          </p>
          <p className="text-emerald-400 font-semibold">
            {t('chartFemale')}: {femaleVal}%
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
          <div className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest">
            FIGURE 2.0 • DEMOGRAPHIC AGE-SEX COHORT
          </div>
          <h3 className="font-serif font-bold text-white text-base sm:text-lg">
            {t('chartAgePyramid')}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {language === 'hi' ? 'पुरुष (बाएं) बनाम महिला (दाएं) आयु वितरण' : 'Male (Left) vs Female (Right) age distribution cohorts'}
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="badge-formal bg-[#070e18] text-amber-400 border-amber-800">
            MALE (L)
          </span>
          <span className="badge-formal bg-[#070e18] text-emerald-400 border-emerald-800">
            FEMALE (R)
          </span>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            stackOffset="sign"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" horizontal={false} />
            <XAxis 
              type="number" 
              tickFormatter={(v) => `${Math.abs(v)}%`} 
              domain={[-12, 12]} 
              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
            />
            <YAxis 
              dataKey="ageGroup" 
              type="category" 
              tick={{ fill: '#cbd5e1', fontSize: 11, fontFamily: 'monospace' }} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="male" fill="#d97706" stackId="stack" radius={[0, 0, 0, 0]} />
            <Bar dataKey="female" fill="#047857" stackId="stack" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
