import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import ChatContainer from '../components/ChatFlow/ChatContainer';
import { ShieldCheck, Bot, Sparkles, UserCheck, HelpCircle } from 'lucide-react';

export default function SelfEnumerationPage() {
  const { t, language } = useLanguage();
  const { currentUser, isGuest } = useAuth();

  return (
    <div className="w-full space-y-6 pb-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">
                {t('chatTitle')}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Gemini 2.0 AI
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t('chatSubtitle')}
            </p>
          </div>
        </div>

        {/* Citizen Status Pill */}
        <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block font-medium leading-none">
              {language === 'hi' ? 'सत्यापित नागरिक' : 'Logged Citizen'}
            </span>
            <span className="text-xs font-bold text-white truncate max-w-[130px] block">
              {currentUser?.displayName || "Aarav Sharma"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chat Flow */}
      <ChatContainer />
    </div>
  );
}
