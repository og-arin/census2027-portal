import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getStatesData } from '../services/firestoreService';
import { useState as useS, useEffect } from 'react';
import { Search, Filter, Calendar, Users, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function StateTable() {
  const { t, language } = useLanguage();
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('all');

  useEffect(() => {
    (async () => { const d = await getStatesData(); setStates(d || []); })();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return states.filter(st => {
      const nameMatch = st.name.toLowerCase().includes(term) || (st.name_hi && st.name_hi.includes(term));
      if (phaseFilter === 'all') return nameMatch;
      if (phaseFilter === 'phase1') return nameMatch && st.phase.includes('Phase 1');
      if (phaseFilter === 'phase2') return nameMatch && st.phase.includes('Phase 2');
      return nameMatch;
    });
  }, [states, search, phaseFilter]);

  const statusBadge = (status) => {
    const map = {
      active: 'bg-green-50 text-green-700 border-green-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200',
    };
    const cls = map[status] || 'bg-amber-50 text-amber-700 border-amber-200';
    const label = status === 'active' ? (language === 'hi' ? 'सक्रिय' : 'Active') : status === 'completed' ? (language === 'hi' ? 'पूर्ण' : 'Done') : (language === 'hi' ? 'आगामी' : 'Upcoming');
    return (
      <span className={`badge-gov border ${cls}`}>
        {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
        <span>{label}</span>
      </span>
    );
  };

  return (
    <div className="gov-card rounded-lg overflow-hidden" aria-label="State-wise Survey Schedule">
      <div className="p-5 sm:p-6 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{t('stateScheduleHeading')}</h3>
          <p className="text-sm text-gray-500 mt-0.5 font-body">{t('stateScheduleSubheading')}</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('searchStatePlaceholder')} aria-label="Search" className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue-500 focus:border-gov-blue-500" />
          </div>
          <select value={phaseFilter} onChange={e => setPhaseFilter(e.target.value)} aria-label="Filter phase" className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue-500">
            <option value="all">{t('filterPhaseAll')}</option>
            <option value="phase1">{t('filterPhase1')}</option>
            <option value="phase2">{t('filterPhase2')}</option>
          </select>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 px-5">{t('tableColState')}</th>
              <th className="py-3 px-4">{t('tableColPhase')}</th>
              <th className="py-3 px-4">{t('tableColStart')}</th>
              <th className="py-3 px-4">{t('tableColEnd')}</th>
              <th className="py-3 px-4">{t('tableColSurveyors')}</th>
              <th className="py-3 px-5 text-right">{t('tableColStatus')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(st => (
              <tr key={st.id} className="hover:bg-blue-50/30 transition">
                <td className="py-3 px-5 font-semibold text-gray-900">{language === 'hi' && st.name_hi ? st.name_hi : st.name}</td>
                <td className="py-3 px-4 text-gray-600">{language === 'hi' && st.phase_hi ? st.phase_hi : st.phase}</td>
                <td className="py-3 px-4 text-gray-600 font-mono text-xs">{st.survey_start_date}</td>
                <td className="py-3 px-4 text-gray-600 font-mono text-xs">{st.survey_end_date}</td>
                <td className="py-3 px-4 text-gray-600">{st.surveyors_deployed?.toLocaleString('en-IN')}</td>
                <td className="py-3 px-5 text-right">{statusBadge(st.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden p-3 space-y-3">
        {filtered.map(st => (
          <div key={st.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">{language === 'hi' && st.name_hi ? st.name_hi : st.name}</span>
              {statusBadge(st.status)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              <span>Phase: <strong className="text-gray-700">{st.phase}</strong></span>
              <span>Surveyors: <strong className="text-gray-700">{st.surveyors_deployed?.toLocaleString('en-IN')}</strong></span>
              <span>{st.survey_start_date} → {st.survey_end_date}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No matching records found.</div>}
    </div>
  );
}
