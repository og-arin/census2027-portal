import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';

const COLORS = ['#2563eb', '#FF9933', '#138808', '#7c3aed', '#dc2626', '#0891b2'];

export default function AmenitiesChart() {
  const { t, language } = useLanguage();
  const { censusData } = useCensusData();

  return (
    <div className="gov-card gov-card-hover rounded-lg p-5 sm:p-6">
      <div className="mb-5 border-b border-gray-100 pb-3">
        <h3 className="text-sm font-bold text-gray-900">{t('chartAmenitiesTitle')}</h3>
        <p className="text-xs text-gray-500 mt-0.5 font-body">{language === 'hi' ? 'घरेलू सुविधाओं का वितरण' : 'Household amenities distribution'}</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={censusData.amenities}
              cx="50%" cy="50%"
              innerRadius={55} outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              nameKey={language === 'hi' ? 'name_hi' : 'name'}
              stroke="#fff"
              strokeWidth={2}
            >
              {censusData.amenities.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12, fontFamily: 'Poppins' }}
              formatter={(value) => [`${value}%`, '']}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, fontFamily: 'Poppins', color: '#4b5563' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
