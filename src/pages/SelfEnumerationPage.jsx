import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import ChatContainer from '../components/ChatFlow/ChatContainer';
import { ShieldCheck, Bot, Sparkles, UserCheck, Scale, FileText } from 'lucide-react';

export default function SelfEnumerationPage() {
  const { t, language } = useLanguage();
  const { currentUser, isGuest } = useAuth();

  return (
    <div className="w-full space-y-6 pb-8">
      {/* Formal Interview Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 bg-[#0c1829] border border-slate-700 rounded-sm shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-[#070e18] border border-amber-500/40 rounded-sm flex items-center justify-center text-amber-400 font-serif font-black text-xl">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t('chatTitle')}
              </h1>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-400 border border-amber-500/30">
                OFFICIAL DIGITAL INTERVIEW
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans mt-0.5">
              {t('chatSubtitle')}
            </p>
          </div>
        </div>

        {/* Citizen Official Verification Stamp */}
        <div className="flex items-center gap-3 p-2.5 px-4 bg-[#070e18] border border-slate-800 rounded-sm font-mono text-xs self-start sm:self-center">
          <UserCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
              {language === 'hi' ? 'नागरिक रिकॉर्ड' : 'CITIZEN RECORD'}
            </span>
            <span className="text-xs font-bold text-white truncate max-w-[140px] block">
              {currentUser?.displayName || "Aarav Sharma"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Guided Interview Flow */}
      <ChatContainer />
    </div>
  );
}
