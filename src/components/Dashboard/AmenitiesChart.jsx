import React from 'react';
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
import { Home, Zap, Flame, Droplets, Smartphone, Wifi, CreditCard, Car } from 'lucide-react';

export default function AmenitiesChart() {
  const { t, language } = useLanguage();

  const getIcon = (name) => {
    if (name.includes('Electricity')) return Zap;
    if (name.includes('Cooking')) return Flame;
    if (name.includes('Water')) return Droplets;
    if (name.includes('Smartphone')) return Smartphone;
    if (name.includes('Broadband')) return Wifi;
    if (name.includes('Bank')) return CreditCard;
    if (name.includes('Vehicle')) return Car;
    return Home;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{payload[0]?.payload?.name}</p>
          <p className="text-amber-400 font-semibold">
            Coverage: {payload[0]?.value}% of Households
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
            <Home className="w-4 h-4 text-purple-400" />
            <span>{t('chartAmenities')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'hi' ? 'आवासीय सुविधाओं की पहुंच और डिजिटल समावेशन' : 'Phase 1 House Listing infrastructure & digital asset penetration'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Recharts Bar Chart */}
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={householdAmenitiesData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                tickFormatter={(v) => `${v}%`} 
                tick={{ fill: '#94a3b8', fontSize: 10 }} 
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={140}
                tick={{ fill: '#cbd5e1', fontSize: 10 }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="coverage" radius={[0, 6, 6, 0]}>
                {householdAmenitiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || '#8b5cf6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Highlight Badges Grid */}
        <div className="grid grid-cols-2 gap-3">
          {householdAmenitiesData.slice(0, 6).map((item, idx) => {
            const Icon = getIcon(item.name);
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.fill}20`, color: item.fill }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-[10px] text-slate-400 block truncate font-medium">
                    {item.name}
                  </span>
                  <span className="text-sm font-black text-white">
                    {item.coverage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
