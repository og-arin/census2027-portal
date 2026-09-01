import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';

export default function AgePyramidChart() {
  const { t, language } = useLanguage();
  const { censusData } = useCensusData();

  const pyramidData = censusData.agePyramid.map(d => ({
    ...d,
    maleNeg: -d.male,
    age_group: d.age_group,
  }));

  return (
    <div className="gov-card gov-card-hover rounded-lg p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900">{t('chartAgePyramidTitle')}</h3>
          <p className="text-xs text-gray-500 mt-0.5 font-body">{language === 'hi' ? 'आयु एवं लिंग आधारित वितरण' : 'Age & gender distribution'}</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gov-blue-500" />{language === 'hi' ? 'पुरुष' : 'Male'}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gov-saffron-500" />{language === 'hi' ? 'महिला' : 'Female'}</span>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={pyramidData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${Math.abs(v / 1000)}K`} />
            <YAxis dataKey="age_group" type="category" tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'Poppins' }} axisLine={false} tickLine={false} width={50} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Poppins' }}
              formatter={(value) => [Math.abs(value).toLocaleString('en-IN'), '']}
              labelStyle={{ fontWeight: 600, color: '#111827' }}
            />
            <ReferenceLine x={0} stroke="#d1d5db" />
            <Bar dataKey="maleNeg" fill="#2563eb" radius={[4, 0, 0, 4]} maxBarSize={16} name={language === 'hi' ? 'पुरुष' : 'Male'} />
            <Bar dataKey="female" fill="#FF9933" radius={[0, 4, 4, 0]} maxBarSize={16} name={language === 'hi' ? 'महिला' : 'Female'} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
