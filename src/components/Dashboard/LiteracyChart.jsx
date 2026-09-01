import React from 'react';
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
import { GraduationCap } from 'lucide-react';

export default function LiteracyChart() {
  const { t, language } = useLanguage();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
          <p className="font-bold text-white mb-1">{label}</p>
          <p className="text-sky-400 font-semibold">
            {t('chartMale')} Literacy: {payload[0]?.value}%
          </p>
          <p className="text-pink-400 font-semibold">
            {t('chartFemale')} Literacy: {payload[1]?.value}%
          </p>
          <p className="text-amber-400 font-semibold pt-1 border-t border-slate-800">
            Average: {payload[0]?.payload?.average}%
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
            <GraduationCap className="w-4 h-4 text-sky-400" />
            <span>{t('chartLiteracy')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'hi' ? 'लैंगिक साक्षरता तुलना' : 'State-level gender comparison in educational literacy'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1 text-sky-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
            {t('chartMale')}
          </span>
          <span className="flex items-center gap-1 text-pink-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-pink-500" />
            {t('chartFemale')}
          </span>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={literacyData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <defs>
              <linearGradient id="maleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="femaleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis 
              dataKey="state" 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis domain={[50, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="male" 
              stroke="#38bdf8" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#maleGrad)" 
            />
            <Area 
              type="monotone" 
              dataKey="female" 
              stroke="#f472b6" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#femaleGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
