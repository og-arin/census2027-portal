import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, Lock, Scale, Server } from 'lucide-react';

export default function DataSecuritySection() {
  const { language } = useLanguage();

  const provisions = [
    {
      icon: Scale,
      title: language === 'hi' ? 'जनगणना अधिनियम, 1948 — धारा 15' : 'Census Act, 1948 — Section 15',
      desc: language === 'hi' ? 'सभी व्यक्तिगत डेटा कानूनी रूप से गोपनीय है। किसी अन्य विभाग, अदालत या कानून प्रवर्तन को साझा नहीं किया जा सकता।' : 'All individual data is legally confidential. Cannot be shared with any other department, court, or law enforcement.',
      color: 'gov-blue',
    },
    {
      icon: Lock,
      title: language === 'hi' ? 'DPDP अधिनियम, 2023' : 'DPDP Act, 2023',
      desc: language === 'hi' ? 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम के तहत पूर्ण सहमति-आधारित प्रसंस्करण और एन्क्रिप्शन।' : 'Full consent-based processing and encryption under the Digital Personal Data Protection Act.',
      color: 'gov-saffron',
    },
    {
      icon: Server,
      title: language === 'hi' ? 'AES-256 एन्क्रिप्शन' : 'AES-256 Encryption',
      desc: language === 'hi' ? 'सभी डेटा ट्रांजिट और स्टोरेज में एन्क्रिप्टेड। भारत में स्थित सरकारी सर्वर पर संग्रहीत।' : 'All data encrypted in transit and at rest. Stored on government servers located in India.',
      color: 'gov-green',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {provisions.map((p, i) => {
        const Icon = p.icon;
        const bgMap = { 'gov-blue': 'bg-gov-blue-50 border-gov-blue-200 text-gov-blue-700', 'gov-saffron': 'bg-gov-saffron-50 border-gov-saffron-200 text-gov-saffron-600', 'gov-green': 'bg-gov-green-50 border-gov-green-200 text-gov-green-500' };
        return (
          <div key={i} className="gov-card gov-card-hover rounded-lg p-5 sm:p-6">
            <div className={`w-11 h-11 rounded-lg border flex items-center justify-center mb-4 ${bgMap[p.color]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-2">{p.title}</h3>
            <p className="text-xs text-gray-500 font-body leading-relaxed">{p.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
