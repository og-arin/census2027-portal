import React, { useState, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CensusDataProvider } from './context/CensusDataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const SelfEnumerationPage = lazy(() => import('./pages/SelfEnumerationPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PrivacyMythsPage = lazy(() => import('./pages/PrivacyMythsPage'));

function PageLoader() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center space-y-4" role="status">
      <div className="w-12 h-12 border-4 border-gov-saffron-200 border-t-gov-saffron-500 rounded-full animate-spin" />
      <p className="text-sm font-medium text-gray-500">Loading...</p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('landing');

  const renderActivePage = () => {
    switch (activePage) {
      case 'chat': return <SelfEnumerationPage />;
      case 'dashboard': return <DashboardPage />;
      case 'privacy': return <PrivacyMythsPage />;
      default: return <LandingPage onNavigate={setActivePage} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <CensusDataProvider>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-1">
              <Suspense fallback={<PageLoader />}>
                {renderActivePage()}
              </Suspense>
            </main>
            <Footer />
          </div>
        </CensusDataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
