import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('census_portal_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('census_portal_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key, fallback = '') => {
    const currentDict = translations[language] || translations['en'];
    if (currentDict && currentDict[key] !== undefined) {
      return currentDict[key];
    }
    const fallbackDict = translations['en'];
    return fallbackDict?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
