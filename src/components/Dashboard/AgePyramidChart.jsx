import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { agePyramidData } from '../../data/dummyDashboardData';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { Users2 } from 'lucide-react';

export default function AgePyramidChart() {
  const { t, language } = useLanguage();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const maleVal = Math.abs(payload[0]?.value || 0);
      const femaleVal = payload[1]?.value || 0;
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-white">Age Cohort: {label}</p>
          <p className="text-amber-400 font-semibold">
            {t('chartMale')}: {maleVal}% of male population
          </p>
          <p className="text-emerald-400 font-semibold">
            {t('chartFemale')}: {femaleVal}% of female population
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
            <Users2 className="w-4 h-4 text-emerald-400" />
            <span>{t('chartAgePyramid')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'hi' ? 'पुरुष एवं महिला आयु वर्ग वितरण' : 'Male (Left) vs Female (Right) age distribution cohorts'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
            {t('chartMale')}
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            {t('chartFemale')}
          </span>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={agePyramidData}
            stackOffset="sign"
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
            <XAxis 
              type="number" 
              tickFormatter={(v) => `${Math.abs(v)}%`} 
              domain={[-12, 12]} 
              tick={{ fill: '#94a3b8', fontSize: 10 }} 
            />
            <YAxis 
              dataKey="ageGroup" 
              type="category" 
              tick={{ fill: '#cbd5e1', fontSize: 11 }} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="male" fill="#f59e0b" stackId="stack" radius={[4, 0, 0, 4]} />
            <Bar dataKey="female" fill="#10b981" stackId="stack" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
