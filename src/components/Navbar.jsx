import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from './LanguageToggle';
import AuthModal from './AuthModal';
import { 
  Building2, 
  Bot, 
  BarChart3, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles, 
  LogIn, 
  LogOut, 
  User 
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { t, language } = useLanguage();
  const { currentUser, logout, isGuest } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: t('navHome'), icon: Building2 },
    { 
      id: 'chat', 
      label: t('navSelfEnumeration'), 
      icon: Bot, 
      badge: 'AI Mitra' 
    },
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
      <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        {/* Top official banner line */}
        <div className="w-full h-1 bg-gradient-to-r from-amber-500 via-white to-emerald-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Logo & Emblem */}
            <div 
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-emerald-500/20 border border-slate-700/60 group-hover:border-amber-500/50 transition-all duration-300 shadow-inner">
                <div className="w-6 h-6 text-amber-400 flex items-center justify-center font-black text-xs tracking-tighter rounded-full border-2 border-amber-400/80">
                  🇮🇳
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    {language === 'hi' ? 'जनगणना 2027' : 'Census 2027'}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    PORTAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-none mt-0.5 hidden sm:block">
                  {t('portalSubtitle')}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: Language Switcher & Auth */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageToggle />

              {/* User Profile / Login */}
              {currentUser ? (
                <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 pl-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center text-xs font-bold text-slate-950">
                      {currentUser.displayName?.charAt(0) || "C"}
                    </div>
                    <div className="text-left leading-tight pr-1">
                      <p className="text-xs font-bold text-slate-200 truncate max-w-[110px]">
                        {currentUser.displayName}
                      </p>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        {isGuest ? (language === 'hi' ? 'डेमो नागरिक' : 'Demo Verified') : 'Citizen'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                    title={t('logout')}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('login')}</span>
                </button>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              {currentUser ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      {currentUser.displayName?.charAt(0) || "C"}
                    </div>
                    <span className="text-xs text-white font-medium">{currentUser.displayName}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t('login')}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
