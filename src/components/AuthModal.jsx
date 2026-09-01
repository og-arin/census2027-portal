import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { loginWithEmail, registerWithEmail, loginWithGoogle, loginAsDemoCitizen, loading } = useAuth();
  const { t, language } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (!email || !password) { setError(language === 'hi' ? 'कृपया सभी फ़ील्ड भरें।' : 'Please fill all fields.'); return; }
    const res = isRegister ? await registerWithEmail(email, password) : await loginWithEmail(email, password);
    if (res.success) { onClose(); } else { setError(res.error || 'Authentication failed'); }
  };

  const handleDemoClick = () => { loginAsDemoCitizen(); onClose(); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden animate-fade-in">
        {/* Tricolor bar */}
        <div className="h-1 tricolor-bar" />

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition">
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gov-blue-50 border border-gov-blue-200 flex items-center justify-center text-gov-blue-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{isRegister ? t('registerHeading') : t('loginHeading')}</h2>
              <p className="text-xs text-gray-500 font-body">{t('loginSubheading')}</p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">
              <AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('emailLabel')}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue-500 focus:border-gov-blue-500"
                  placeholder="citizen@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">{t('passwordLabel')}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gov-blue-500 focus:border-gov-blue-500"
                  placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gov-blue-700 hover:bg-gov-blue-800 text-white font-semibold text-sm disabled:opacity-40 transition">
              {loading ? '...' : (isRegister ? t('registerBtn') : t('loginBtn'))}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400 font-medium">{language === 'hi' ? 'या' : 'OR'}</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className="space-y-2">
            <button type="button" onClick={async () => { const res = await loginWithGoogle(); if (res.success) onClose(); else setError(res.error); }}
              className="w-full py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 flex items-center justify-center gap-2 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span>Google Sign In</span>
            </button>
            <button type="button" onClick={handleDemoClick}
              className="w-full py-2.5 rounded-lg bg-gov-saffron-50 border border-gov-saffron-200 text-gov-saffron-700 text-sm font-semibold hover:bg-gov-saffron-100 flex items-center justify-center gap-2 transition">
              <span>🎯</span><span>{t('demoLoginBtn')}</span>
            </button>
          </div>

          <p className="text-center mt-5 text-xs text-gray-500">
            {isRegister ? t('alreadyHaveAccount') : t('noAccount')}{' '}
            <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-gov-blue-600 font-semibold hover:underline">
              {isRegister ? t('loginLink') : t('registerLink')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
