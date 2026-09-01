import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';

const COLORS = ['#2563eb', '#FF9933', '#138808', '#7c3aed', '#dc2626', '#0891b2', '#ea580c'];

export default function PopulationChart() {
  const { t, language } = useLanguage();
  const { censusData } = useCensusData();

  return (
    <div className="gov-card gov-card-hover rounded-lg p-5 sm:p-6">
      <div className="flex items-center justify-between mb-5 border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900">{t('chartPopulationTitle')}</h3>
          <p className="text-xs text-gray-500 mt-0.5 font-body">{language === 'hi' ? 'राज्यवार जनसंख्या वितरण' : 'State-wise population distribution'}</p>
        </div>
        <span className="badge-gov bg-gov-blue-50 text-gov-blue-700 border border-gov-blue-200">{language === 'hi' ? 'लाखों में' : 'In Lakhs'}</span>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={censusData.population} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey={language === 'hi' ? 'state_hi' : 'state'} tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'Poppins' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Poppins' }}
              labelStyle={{ fontWeight: 600, color: '#111827' }}
              formatter={(value) => [value.toLocaleString('en-IN'), language === 'hi' ? 'जनसंख्या' : 'Population']}
            />
            <Bar dataKey="population" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {censusData.population.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
