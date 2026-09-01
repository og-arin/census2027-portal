import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gov-blue-900 text-white mt-auto" role="contentinfo">
      <div className="h-1 tricolor-bar" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-base text-white mb-3">
              {language === 'hi' ? 'जनगणना 2027 पोर्टल' : 'Census 2027 Portal'}
            </h4>
            <p className="text-sm text-blue-200 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'भारत के महापंजीयक एवं जनगणना आयुक्त कार्यालय, गृह मंत्रालय, भारत सरकार'
                : 'Office of the Registrar General & Census Commissioner, Ministry of Home Affairs, Government of India'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-blue-200 uppercase tracking-wider mb-3">
              {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="https://censusindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition">Census India <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition">India.gov.in <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="https://mha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition">{language === 'hi' ? 'गृह मंत्रालय' : 'MHA'} <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-blue-200 uppercase tracking-wider mb-3">
              {language === 'hi' ? 'कानूनी' : 'Legal'}
            </h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>{language === 'hi' ? 'जनगणना अधिनियम, 1948' : 'Census Act, 1948'}</li>
              <li>{language === 'hi' ? 'DPDP अधिनियम, 2023' : 'DPDP Act, 2023'}</li>
              <li>{language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300">
          <p>© 2027 {language === 'hi' ? 'भारत सरकार' : 'Government of India'} | {language === 'hi' ? 'हैकाथॉन डेमो प्रोटोटाइप' : 'Hackathon Demo Prototype'}</p>
          <p className="flex items-center gap-1">
            <span>{language === 'hi' ? 'आशा AI द्वारा संचालित' : 'Powered by Asha AI'}</span>
            <span className="text-gov-saffron-400">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
