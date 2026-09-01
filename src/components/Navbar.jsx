import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from './LanguageToggle';
import AuthModal from './AuthModal';
import { Bot, BarChart3, ShieldCheck, Menu, X, LogIn, LogOut, Home } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { t, language } = useLanguage();
  const { currentUser, logout, isGuest } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: t('navHome'), icon: Home },
    { id: 'chat', label: language === 'hi' ? 'आशा से बात करें' : 'Talk to Asha', icon: Bot, badge: 'AI' },
    { id: 'dashboard', label: t('navDashboard'), icon: BarChart3 },
    { id: 'privacy', label: t('navPrivacy'), icon: ShieldCheck }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-gray-100">
        {/* Tricolor Strip */}
        <div className="h-1 tricolor-bar" />

        {/* Official Header Row */}
        <div className="bg-gov-blue-700 text-white px-4 py-1.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <span className="font-medium tracking-wide">
              {language === 'hi' ? 'भारत सरकार | गृह मंत्रालय' : 'Government of India | Ministry of Home Affairs'}
            </span>
            <div className="flex items-center gap-3">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              onClick={() => handleNavClick('landing')}
              aria-label="Home"
              className="flex items-center gap-3 rounded-md p-1 -ml-1 focus-visible:ring-2 focus-visible:ring-gov-blue-500"
            >
              <div className="w-10 h-10 rounded-lg bg-gov-saffron-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                🇮🇳
              </div>
              <div>
                <span className="font-sans font-bold text-lg text-gray-900 leading-tight block">
                  {language === 'hi' ? 'जनगणना 2027' : 'Census 2027'}
                </span>
                <span className="text-[11px] text-gray-500 leading-none block">
                  {language === 'hi' ? 'डिजिटल स्व-गणना पोर्टल' : 'Digital Self-Enumeration Portal'}
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      isActive
                        ? 'bg-gov-blue-50 text-gov-blue-700 border border-gov-blue-200'
                        : 'text-gray-600 hover:text-gov-blue-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gov-saffron-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Auth */}
            <div className="hidden md:flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 pl-3 rounded-lg border border-gray-200">
                  <div className="w-8 h-8 rounded-lg bg-gov-blue-700 text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.displayName?.charAt(0) || "C"}
                  </div>
                  <div className="pr-1">
                    <p className="text-xs font-semibold text-gray-800 truncate max-w-[100px]">{currentUser.displayName}</p>
                    <span className="text-[10px] text-gov-green-500 font-semibold">{isGuest ? 'Demo' : 'Verified'}</span>
                  </div>
                  <button type="button" onClick={logout} aria-label="Sign out" className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100 transition">
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setIsAuthOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gov-blue-700 hover:bg-gov-blue-800 text-white text-sm font-semibold transition">
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  <span>{t('login')}</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition ${
                    isActive ? 'bg-gov-blue-50 text-gov-blue-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-gray-100">
              {currentUser ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">{currentUser.displayName}</span>
                  <button type="button" onClick={logout} className="text-xs text-red-500 font-semibold">{t('logout')}</button>
                </div>
              ) : (
                <button type="button" onClick={() => { setIsMobileMenuOpen(false); setIsAuthOpen(true); }} className="w-full py-2.5 rounded-lg bg-gov-blue-700 text-white font-semibold text-sm">
                  {t('login')}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
