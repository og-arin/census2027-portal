import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import ChatContainer from '../components/ChatFlow/ChatContainer';
import { Bot, UserCheck } from 'lucide-react';

export default function SelfEnumerationPage() {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-gov">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-gov-blue-50 border border-gov-blue-200 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-gov-blue-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('chatTitle')}</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gov-saffron-50 text-gov-saffron-600 border border-gov-saffron-200">
                  {language === 'hi' ? 'आशा AI' : 'Asha AI'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 font-body">{t('chatSubtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg text-xs">
            <UserCheck className="w-4 h-4 text-green-500" />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider">
                {language === 'hi' ? 'नागरिक' : 'Citizen'}
              </span>
              <span className="text-xs font-semibold text-gray-800 truncate max-w-[140px] block">
                {currentUser?.displayName || "Aarav Sharma"}
              </span>
            </div>
          </div>
        </div>

        <ChatContainer />
      </div>
    </div>
  );
}
