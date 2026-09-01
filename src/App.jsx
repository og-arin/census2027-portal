import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CensusDataProvider } from './context/CensusDataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SelfEnumerationPage from './pages/SelfEnumerationPage';
import DashboardPage from './pages/DashboardPage';
import PrivacyMythsPage from './pages/PrivacyMythsPage';

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
            <div className="fixed inset-0 pointer-events-none tricolor-glow opacity-60 z-0" />

            {/* Top Navigation */}
            <Navbar activePage={activePage} setActivePage={setActivePage} />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
              {renderActivePage()}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </CensusDataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
