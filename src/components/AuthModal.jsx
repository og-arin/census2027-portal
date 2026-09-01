import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, ShieldCheck, Mail, Lock, UserCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { loginWithEmail, registerWithEmail, loginWithGoogle, loginAsDemoCitizen, loading } = useAuth();
  const { t, language } = useLanguage();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError(language === 'hi' ? 'कृपया सभी फ़ील्ड भरें।' : 'Please fill all fields.');
      return;
    }

    const res = isRegister 
      ? await registerWithEmail(email, password)
      : await loginWithEmail(email, password);

    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  const handleDemoClick = () => {
    loginAsDemoCitizen();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Top saffron-green gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {isRegister ? (language === 'hi' ? 'नागरिक खाता बनाएं' : 'Citizen Registration') : (language === 'hi' ? 'पोर्टल में साइन इन करें' : 'Citizen Sign In')}
              </h2>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'सुरक्षित डिजिटल स्व-गणना एक्सेस' : 'Official Census 2027 Digital Portal'}
              </p>
            </div>
          </div>

          {/* Quick Demo Access banner for Hackathon Demo */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-800/40 to-emerald-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white">
                  {language === 'hi' ? 'त्वरित हैकथॉन डेमो मोड' : 'Instant Demo Citizen Access'}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {language === 'hi' ? 'बिना पासवर्ड तुरंत स्व-गणना शुरू करें।' : 'Skip sign-up and test the full AI chat & verification workflow instantly.'}
                </p>
                <button
                  type="button"
                  onClick={handleDemoClick}
                  className="mt-3 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
                >
                  <UserCheck className="w-4 h-4" />
                  {language === 'hi' ? 'डेमो नागरिक के रूप में प्रवेश करें' : 'Enter as Verified Demo Citizen'}
                </button>
              </div>
            </div>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 font-medium">
                {language === 'hi' ? 'या ईमेल से लॉगिन करें' : 'or continue with credentials'}
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {language === 'hi' ? 'ईमेल आईडी' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.com"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {language === 'hi' ? 'पासवर्ड' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition border border-slate-700"
            >
              {loading ? 'Processing...' : isRegister ? (language === 'hi' ? 'पंजीकरण करें' : 'Sign Up') : (language === 'hi' ? 'साइन इन करें' : 'Sign In')}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-slate-400 hover:text-amber-400 transition"
            >
              {isRegister 
                ? (language === 'hi' ? 'पहले से खाता है? साइन इन करें' : 'Already have an account? Sign In')
                : (language === 'hi' ? 'नया खाता बनाना चाहते हैं? रजिस्टर करें' : "Don't have an account? Register")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
