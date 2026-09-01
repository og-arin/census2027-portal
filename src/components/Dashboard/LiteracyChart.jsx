import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';

export default function LiteracyChart() {
  const { t, language } = useLanguage();
  const { censusData } = useCensusData();

  return (
    <div className="gov-card gov-card-hover rounded-lg p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900">{t('chartLiteracyTitle')}</h3>
          <p className="text-xs text-gray-500 mt-0.5 font-body">{language === 'hi' ? 'राज्यवार लिंग आधारित साक्षरता दर' : 'Gender-wise literacy rates by state'}</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gov-blue-500" />{language === 'hi' ? 'पुरुष' : 'Male'}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-gov-saffron-500" />{language === 'hi' ? 'महिला' : 'Female'}</span>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={censusData.literacy} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey={language === 'hi' ? 'state_hi' : 'state'} tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Poppins' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Poppins' }}
              labelStyle={{ fontWeight: 600, color: '#111827' }}
              formatter={(value) => [`${value}%`, '']}
            />
            <Bar dataKey="male" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={24} name={language === 'hi' ? 'पुरुष' : 'Male'} />
            <Bar dataKey="female" fill="#FF9933" radius={[4, 4, 0, 0]} maxBarSize={24} name={language === 'hi' ? 'महिला' : 'Female'} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
