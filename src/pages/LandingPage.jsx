import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import StateTable from '../components/StateTable';
import { Bot, ArrowRight, BarChart3, Home, UserCheck, ShieldCheck, Users, Building2, Sparkles } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  const { t, language } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero Section with Citizen Photo Background */}
      <section className="relative bg-gov-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/citizens_hero.jpg" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-gov-blue-800/95 via-gov-blue-700/90 to-gov-blue-700/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur rounded-full text-white/90 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{language === 'hi' ? 'डिजिटल स्व-गणना अब शुरू' : 'Digital Self-Enumeration Now Open'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              {language === 'hi' ? (
                <>हर नागरिक की गिनती,<br /><span className="text-gov-saffron-300">हर नागरिक का योगदान</span></>
              ) : (
                <>Every Citizen Counts,<br /><span className="text-gov-saffron-300">Every Citizen Contributes</span></>
              )}
            </h1>

            <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl font-body">
              {t('heroSubheading')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('chat')}
                className="px-6 py-3 rounded-lg bg-gov-saffron-500 hover:bg-gov-saffron-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition"
              >
                <Bot className="w-5 h-5" />
                <span>{language === 'hi' ? 'आशा से शुरू करें' : 'Start with Asha AI'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 backdrop-blur border border-white/20 transition"
              >
                <BarChart3 className="w-5 h-5" />
                <span>{t('heroExploreData')}</span>
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/15">
            {[
              { label: language === 'hi' ? 'लक्षित परिवार' : 'Target Households', value: '32.8 Cr', sub: '28 States & 8 UTs' },
              { label: language === 'hi' ? 'जनसंख्या' : 'Population', value: '1.44 B', sub: '100% Coverage' },
              { label: 'AI Assistant', value: 'Asha', sub: language === 'hi' ? 'द्विभाषी सहायक' : 'Bilingual Guide' },
              { label: language === 'hi' ? 'गोपनीयता' : 'Privacy', value: 'DPDP 2023', sub: 'Sec 15 Protected' }
            ].map((stat, i) => (
              <div key={i} className="text-white/90">
                <p className="text-[11px] font-medium text-blue-200 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-0.5">{stat.value}</p>
                <p className="text-xs text-blue-200 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Phases Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm font-semibold text-gov-saffron-500 uppercase tracking-wider">{language === 'hi' ? 'द्वि-चरणीय कार्यपद्धति' : 'Two-Phase Methodology'}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{t('phasesHeading')}</h2>
          <p className="text-sm text-gray-500 mt-2 font-body">{t('phasesSubheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phase 1 */}
          <div className="gov-card gov-card-hover rounded-lg p-6 sm:p-8 relative overflow-hidden">
            <div className="h-1 w-full bg-gov-saffron-500 absolute top-0 left-0 rounded-t-lg" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gov-saffron-50 border border-gov-saffron-200 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gov-saffron-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gov-saffron-500 uppercase tracking-wider">Phase 1</p>
                <h3 className="text-lg font-bold text-gray-900">{t('phase1Title')}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 font-body">{t('phase1Desc')}</p>
            <ul className="space-y-2">
              {t('phase1Points').map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded bg-gov-saffron-50 text-gov-saffron-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                  <span className="font-body">{pt}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => onNavigate('chat')} className="mt-6 text-sm font-semibold text-gov-saffron-600 hover:text-gov-saffron-700 flex items-center gap-1 transition">
              <span>Begin Phase 1</span><ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Phase 2 */}
          <div className="gov-card gov-card-hover rounded-lg p-6 sm:p-8 relative overflow-hidden">
            <div className="h-1 w-full bg-gov-green-500 absolute top-0 left-0 rounded-t-lg" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gov-green-50 border border-gov-green-200 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-gov-green-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gov-green-500 uppercase tracking-wider">Phase 2</p>
                <h3 className="text-lg font-bold text-gray-900">{t('phase2Title')}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 font-body">{t('phase2Desc')}</p>
            <ul className="space-y-2">
              {t('phase2Points').map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-5 h-5 rounded bg-gov-green-50 text-gov-green-500 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                  <span className="font-body">{pt}</span>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => onNavigate('chat')} className="mt-6 text-sm font-semibold text-gov-green-600 hover:text-gov-green-700 flex items-center gap-1 transition">
              <span>Begin Phase 2</span><ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* State Schedule Table */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StateTable />
        </div>
      </section>
    </div>
  );
}
