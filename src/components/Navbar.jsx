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
  Landmark
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const { t, language } = useLanguage();
  const { currentUser, logout, isGuest } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: t('navHome'), icon: Landmark, refCode: '01' },
    { 
      id: 'chat', 
      label: t('navSelfEnumeration'), 
      icon: Bot, 
      badge: 'Census Mitra',
      refCode: '02' 
    },
    { id: 'dashboard', label: t('navDashboard'), icon: BarChart3, refCode: '03' },
    { id: 'privacy', label: t('navPrivacy'), icon: ShieldCheck, refCode: '04' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#070e18]/95 border-b border-slate-800 backdrop-blur-md">
        {/* Top official Tricolor Ribbon line */}
        <div className="w-full h-1 gazette-header-ribbon" />

        {/* Official Sub-header notice */}
        <div className="bg-[#050a12] border-b border-slate-800/80 px-4 py-1 text-[11px] text-slate-400">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-amber-500 font-bold">GOVERNMENT OF INDIA</span>
              <span className="text-slate-600">•</span>
              <span className="hidden sm:inline">OFFICE OF THE REGISTRAR GENERAL & CENSUS COMMISSIONER</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                OFFICIAL PORTAL
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Brand Logo & Formal Emblem */}
            <button 
              type="button"
              onClick={() => handleNavClick('landing')}
              aria-label="Census 2027 Portal Home"
              className="flex items-center gap-3.5 group select-none text-left p-1 rounded-sm transition focus-visible:ring-1 focus-visible:ring-amber-500"
            >
              <div className="flex items-center justify-center w-11 h-11 bg-[#0c1829] border border-amber-500/40 rounded-sm shadow-inner text-amber-400 font-black text-xl">
                🇮🇳
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    {language === 'hi' ? 'जनगणना २०२७' : 'CENSUS 2027'}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    DIGITAL PORTAL
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400 font-sans tracking-wide leading-none mt-1 hidden sm:block">
                  {t('portalSubtitle')}
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
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
                    className={`relative flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-semibold tracking-wide transition-all border ${
                      isActive
                        ? 'bg-[#112238] text-amber-300 border-amber-500/50 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900 border-transparent'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
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
                <div className="flex items-center gap-2 bg-[#0c1829] p-1.5 pl-3 rounded-sm border border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-sm bg-amber-600 flex items-center justify-center text-xs font-bold text-white">
                      {currentUser.displayName?.charAt(0) || "C"}
                    </div>
                    <div className="text-left leading-tight pr-1">
                      <p className="text-xs font-bold text-slate-200 truncate max-w-[110px]">
                        {currentUser.displayName}
                      </p>
                      <span className="text-[9px] font-mono text-emerald-400 font-semibold block">
                        {isGuest ? (language === 'hi' ? 'नागरिक आईडी: डेमो' : 'CITIZEN: DEMO') : 'VERIFIED CITIZEN'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    aria-label="Sign out"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-sm transition"
                    title={t('logout')}
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  aria-label="Sign in to portal"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-sm bg-[#112238] hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>{t('login')}</span>
                </button>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageToggle />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-sm bg-[#0c1829] border border-slate-800 text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5 text-amber-400" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#070e18] border-b border-slate-800 px-4 pt-3 pb-6 space-y-1.5 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between p-3 rounded-sm text-xs font-bold transition border ${
                    isActive
                      ? 'bg-[#112238] text-amber-400 border-amber-500/40'
                      : 'text-slate-300 hover:bg-slate-900 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-sm bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              {currentUser ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-sm bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                      {currentUser.displayName?.charAt(0) || "C"}
                    </div>
                    <span className="text-xs text-white font-bold">{currentUser.displayName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    aria-label="Sign out"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  aria-label="Sign In"
                  className="w-full py-2.5 rounded-sm bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" aria-hidden="true" />
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
