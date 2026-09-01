import React, { useState, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CensusDataProvider } from './context/CensusDataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Code-split / lazy load pages for maximum efficiency
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SelfEnumerationPage = lazy(() => import('./pages/SelfEnumerationPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PrivacyMythsPage = lazy(() => import('./pages/PrivacyMythsPage'));

function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4 animate-fade-in" role="status">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-emerald-500/20 border-b-emerald-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-amber-400">
          🇮🇳
        </div>
      </div>
      <p className="text-xs sm:text-sm font-semibold text-slate-400">
        Loading Census 2027 Portal...
      </p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('landing');

  const renderActivePage = () => {
    switch (activePage) {
      case 'chat':
        return <SelfEnumerationPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'privacy':
        return <PrivacyMythsPage />;
      default:
        return <LandingPage onNavigate={setActivePage} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <CensusDataProvider>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
            {/* Ambient Tricolor background glow */}
            <div className="fixed inset-0 pointer-events-none tricolor-glow opacity-60 z-0" aria-hidden="true" />

            {/* Top Navigation */}
            <Navbar activePage={activePage} setActivePage={setActivePage} />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10">
              <Suspense fallback={<PageLoader />}>
                {renderActivePage()}
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </CensusDataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
