import React, { useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { householdAmenitiesData } from '../../data/dummyDashboardData';
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

export default function AmenitiesChart() {
  const { t, language } = useLanguage();

  const data = useMemo(() => householdAmenitiesData, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#070e18] border border-slate-700 p-3 rounded-sm shadow-2xl text-xs font-mono space-y-1">
          <p className="font-bold text-white font-serif">{payload[0]?.payload?.name}</p>
          <p className="text-amber-400 font-semibold">
            COVERAGE: {payload[0]?.value}% OF HOUSEHOLDS
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#0c1829] border border-slate-700 rounded-sm p-5 sm:p-6 shadow-xl font-sans">
      {/* Formal Panel Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div>
          <div className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
            FIGURE 4.0 • HOUSEHOLD AMENITIES & INFRASTRUCTURE
          </div>
          <h3 className="font-serif font-bold text-white text-base sm:text-lg">
            {t('chartAmenities')}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {language === 'hi' ? 'आवासीय सुविधाओं की पहुंच और डिजिटल परिसंपत्ति आंकड़े' : 'Phase 1 House Listing basic infrastructure & digital asset penetration'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Recharts Bar Chart */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" horizontal={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickFormatter={(v) => `${v}%`} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={130}
                tick={{ fill: '#cbd5e1', fontSize: 10, fontFamily: 'sans-serif' }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="coverage" radius={[0, 0, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Highlight Summary Ledger Grid */}
        <div className="grid grid-cols-2 gap-2.5 font-mono">
          {data.slice(0, 6).map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#070e18] border border-slate-800 rounded-sm flex flex-col justify-between"
            >
              <span className="text-[10px] text-slate-400 block truncate font-sans">
                {item.name}
              </span>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-black text-amber-400 font-serif">
                  {item.coverage}%
                </span>
                <span className="text-[9px] text-slate-500">COVERAGE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
