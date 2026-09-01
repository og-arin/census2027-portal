import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getStatesData } from '../services/firestoreService';
import { Search, Filter, Calendar, Users, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function StateTable() {
  const { t, language } = useLanguage();
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getStatesData();
      setStates(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filteredStates = states.filter((st) => {
    const nameMatch = 
      st.name.toLowerCase().includes(search.toLowerCase()) || 
      (st.name_hi && st.name_hi.includes(search));
    
    if (phaseFilter === 'all') return nameMatch;
    if (phaseFilter === 'phase1') return nameMatch && st.phase.includes('Phase 1');
    if (phaseFilter === 'phase2') return nameMatch && st.phase.includes('Phase 2');
    return nameMatch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {language === 'hi' ? 'सर्वेक्षण सक्रिय' : 'Survey Active'}
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === 'hi' ? 'पूर्ण' : 'Completed'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            {language === 'hi' ? 'आगामी' : 'Upcoming'}
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl">
      {/* Header with Search and Filter */}
      <div className="p-5 md:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>{t('stateScheduleHeading')}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {t('stateScheduleSubheading')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('searchStatePlaceholder')}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          {/* Phase Filter dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition appearance-none pr-8 cursor-pointer"
            >
              <option value="all">{t('filterPhaseAll')}</option>
              <option value="phase1">{t('filterPhase1')}</option>
              <option value="phase2">{t('filterPhase2')}</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-5">{t('tableColState')}</th>
              <th className="py-3.5 px-4">{t('tableColPhase')}</th>
              <th className="py-3.5 px-4">{t('tableColStart')}</th>
              <th className="py-3.5 px-4">{t('tableColEnd')}</th>
              <th className="py-3.5 px-4">{t('tableColSurveyors')}</th>
              <th className="py-3.5 px-5 text-right">{t('tableColStatus')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredStates.map((st) => (
              <tr key={st.id} className="hover:bg-slate-800/40 transition">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-amber-400">
                      {st.id}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        {language === 'hi' && st.name_hi ? st.name_hi : st.name}
                      </p>
                      {language === 'hi' && (
                        <p className="text-[10px] text-slate-400">{st.name}</p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 text-slate-300 font-medium">
                  {language === 'hi' && st.phase_hi ? st.phase_hi : st.phase}
                </td>

                <td className="py-4 px-4 text-slate-300 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{st.survey_start_date}</span>
                  </div>
                </td>

                <td className="py-4 px-4 text-slate-300 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{st.survey_end_date}</span>
                  </div>
                </td>

                <td className="py-4 px-4 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-semibold">{st.surveyors_deployed?.toLocaleString('en-IN')}</span>
                  </div>
                </td>

                <td className="py-4 px-5 text-right">
                  {getStatusBadge(st.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStates.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            {language === 'hi' ? 'कोई राज्य नहीं मिला।' : 'No states matched your filter.'}
          </div>
        )}
      </div>
    </div>
  );
}
