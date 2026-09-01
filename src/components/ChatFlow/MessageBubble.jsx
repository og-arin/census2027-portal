import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Bot, User, Volume2, VolumeX, Check } from 'lucide-react';

export default function MessageBubble({ message }) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const isBot = message.sender === 'bot';

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); return; }
    const cleanText = message.text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className={lIdx > 0 ? "mt-1.5 leading-relaxed" : "leading-relaxed"}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className={`font-bold ${isBot ? 'text-gov-blue-700' : 'text-white'}`}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex items-start gap-2.5 my-2 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {/* Asha Avatar */}
      {isBot && (
        <div className="w-9 h-9 rounded-full bg-gov-blue-700 flex items-center justify-center text-white shrink-0 shadow-sm" aria-hidden="true">
          <Bot className="w-4.5 h-4.5" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-[13px] sm:text-sm shadow-sm ${
        isBot 
          ? 'bg-white border border-gray-200 text-gray-700 rounded-tl-md' 
          : 'bg-gov-blue-700 text-white rounded-tr-md'
      }`} role="article" aria-label={isBot ? "Asha's response" : "Your response"}>
        
        {/* Bot Header */}
        {isBot && (
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100">
            <span className="text-[11px] font-semibold text-gov-blue-600">
              {language === 'hi' ? 'आशा • AI सहायक' : 'Asha • AI Assistant'}
            </span>
            <button type="button" onClick={handleSpeak} aria-label={isPlaying ? "Stop audio" : "Read aloud"}
              className={`p-1 rounded-md transition ${isPlaying ? 'bg-gov-saffron-50 text-gov-saffron-600' : 'text-gray-400 hover:text-gov-blue-600 hover:bg-gray-50'}`}>
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        {/* Text Content */}
        <div className={`leading-relaxed font-body ${isBot ? 'text-gray-700' : 'text-white'}`}>
          {renderFormattedText(message.text)}
        </div>

        {/* Timestamp */}
        <div className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${isBot ? 'text-gray-400' : 'text-blue-200'}`}>
          <span>{message.time}</span>
          {!isBot && <Check className="w-3 h-3 text-blue-200" />}
        </div>
      </div>

      {/* User Avatar */}
      {!isBot && (
        <div className="w-9 h-9 rounded-full bg-gov-saffron-500 flex items-center justify-center text-white shrink-0 shadow-sm" aria-hidden="true">
          <User className="w-4.5 h-4.5" />
        </div>
      )}
    </motion.div>
  );
}
