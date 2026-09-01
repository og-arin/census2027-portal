import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getStatesData } from '../services/firestoreService';
import { Search, Filter, Calendar, Users, MapPin, CheckCircle2, Clock, Landmark } from 'lucide-react';

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

  const filteredStates = useMemo(() => {
    const term = search.toLowerCase().trim();
    return states.filter((st) => {
      const nameMatch = 
        st.name.toLowerCase().includes(term) || 
        (st.name_hi && st.name_hi.includes(term));
      
      if (phaseFilter === 'all') return nameMatch;
      if (phaseFilter === 'phase1') return nameMatch && st.phase.includes('Phase 1');
      if (phaseFilter === 'phase2') return nameMatch && st.phase.includes('Phase 2');
      return nameMatch;
    });
  }, [states, search, phaseFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="badge-formal bg-emerald-950/40 text-emerald-400 border-emerald-700">
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>{language === 'hi' ? 'सक्रिय' : 'ACTIVE'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className="badge-formal bg-sky-950/40 text-sky-400 border-sky-700">
            <span>{language === 'hi' ? 'पूर्ण' : 'COMPLETED'}</span>
          </span>
        );
      default:
        return (
          <span className="badge-formal bg-amber-950/40 text-amber-400 border-amber-700">
            <span>{language === 'hi' ? 'आगामी' : 'UPCOMING'}</span>
          </span>
        );
    }
  };

  return (
    <section 
      className="w-full bg-[#0a1424] border border-slate-700 rounded-sm shadow-xl overflow-hidden font-sans"
      aria-label="State-wise Survey Schedule Table"
    >
      {/* Formal Header with Search and Filter */}
      <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-[#070e18]">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">
            <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ANNEXURE A • FIELD OPERATIONS SCHEDULE</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
            {t('stateScheduleHeading')}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {t('stateScheduleSubheading')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto font-mono text-xs">
          {/* Search bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search state or union territory"
              placeholder={t('searchStatePlaceholder')}
              className="w-full bg-[#070e18] border border-slate-700 rounded-sm pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition font-sans"
            />
          </div>

          {/* Phase Filter dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              aria-label="Filter survey phase"
              className="w-full bg-[#070e18] border border-slate-700 rounded-sm px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 transition pr-8 cursor-pointer"
            >
              <option value="all">{t('filterPhaseAll')}</option>
              <option value="phase1">{t('filterPhase1')}</option>
              <option value="phase2">{t('filterPhase2')}</option>
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Desktop Table (Formal Report Ledger Layout) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#070e18] text-slate-400 uppercase font-mono font-bold tracking-wider border-b border-slate-800">
            <tr>
              <th scope="col" className="py-3 px-5 border-r border-slate-800/80">{t('tableColState')}</th>
              <th scope="col" className="py-3 px-4 border-r border-slate-800/80">{t('tableColPhase')}</th>
              <th scope="col" className="py-3 px-4 border-r border-slate-800/80">{t('tableColStart')}</th>
              <th scope="col" className="py-3 px-4 border-r border-slate-800/80">{t('tableColEnd')}</th>
              <th scope="col" className="py-3 px-4 border-r border-slate-800/80">{t('tableColSurveyors')}</th>
              <th scope="col" className="py-3 px-5 text-right">{t('tableColStatus')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-sans">
            {filteredStates.map((st) => (
              <tr key={st.id} className="hover:bg-[#0f1f35] transition-colors">
                <td className="py-3 px-5 border-r border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-amber-500 font-bold px-1 bg-[#070e18] border border-slate-800">
                      {st.id}
                    </span>
                    <div>
                      <p className="font-bold text-white text-xs sm:text-sm font-serif">
                        {language === 'hi' && st.name_hi ? st.name_hi : st.name}
                      </p>
                      {language === 'hi' && (
                        <p className="text-[10px] text-slate-400 font-sans">{st.name}</p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4 border-r border-slate-800/80 text-slate-300 font-mono text-[11.5px]">
                  {language === 'hi' && st.phase_hi ? st.phase_hi : st.phase}
                </td>

                <td className="py-3 px-4 border-r border-slate-800/80 text-slate-300 font-mono text-[11px]">
                  {st.survey_start_date}
                </td>

                <td className="py-3 px-4 border-r border-slate-800/80 text-slate-300 font-mono text-[11px]">
                  {st.survey_end_date}
                </td>

                <td className="py-3 px-4 border-r border-slate-800/80 text-slate-300 font-mono text-[11.5px]">
                  {st.surveyors_deployed?.toLocaleString('en-IN')} Field Officers
                </td>

                <td className="py-3 px-5 text-right">
                  {getStatusBadge(st.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Optimized for 375px screens) */}
      <div className="sm:hidden divide-y divide-slate-800 p-3 space-y-3 font-mono">
        {filteredStates.map((st) => (
          <div key={st.id} className="p-3.5 bg-[#070e18] border border-slate-800 rounded-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-amber-500 font-bold px-1 bg-[#0c1829] border border-slate-800">
                  {st.id}
                </span>
                <h4 className="font-serif font-bold text-white text-sm">
                  {language === 'hi' && st.name_hi ? st.name_hi : st.name}
                </h4>
              </div>
              <div>{getStatusBadge(st.status)}</div>
            </div>

            <div className="text-xs text-slate-300 space-y-1 pt-1 border-t border-slate-800/80 font-sans">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Phase:</span>
                <span className="font-bold text-amber-400">{language === 'hi' && st.phase_hi ? st.phase_hi : st.phase}</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Dates:</span>
                <span>{st.survey_start_date} → {st.survey_end_date}</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-400">Surveyors:</span>
                <span className="font-bold text-slate-200">{st.surveyors_deployed?.toLocaleString('en-IN')} Officers</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="p-8 text-center text-slate-400 text-xs font-mono">
          NO MATCHING STATE RECORDS FOUND IN GAZETTE SCHEDULE.
        </div>
      )}
    </section>
  );
}
