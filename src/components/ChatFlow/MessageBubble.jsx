import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Bot, User, Volume2, VolumeX, Sparkles, Check, FileText } from 'lucide-react';

export default function MessageBubble({ message }) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const isBot = message.sender === 'bot';

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

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
        <p key={lIdx} className={lIdx > 0 ? "mt-2 leading-relaxed" : "leading-relaxed"}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-amber-300 font-serif">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-3.5 my-4 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {/* Formal Official Enumerator Badge */}
      {isBot && (
        <div 
          className="w-10 h-10 bg-[#070e18] border border-amber-500/50 rounded-sm flex items-center justify-center text-amber-400 font-bold text-xs shrink-0 shadow-sm font-mono"
          aria-hidden="true"
        >
          ORGI
        </div>
      )}

      {/* Message Box with Formal Document Card Style */}
      <div 
        className={`max-w-[90%] sm:max-w-[78%] rounded-sm p-4 sm:p-5 text-xs sm:text-[13.5px] border shadow-lg ${
          isBot 
            ? 'bg-[#0c1829] border-slate-700 text-slate-200 shadow-black/40' 
            : 'bg-[#112238] border-amber-500/40 text-white shadow-black/40'
        }`}
        role="article"
        aria-label={isBot ? "Inquiry from Official Enumerator" : "Recorded Citizen Response"}
      >
        {/* Formal Header inside bubble */}
        <div className={`flex items-center justify-between gap-4 mb-2.5 pb-1.5 border-b ${isBot ? 'border-slate-800' : 'border-slate-800'}`}>
          <div className="flex items-center gap-2 font-mono">
            {isBot ? (
              <>
                <span className="font-bold text-[11px] text-amber-400 uppercase tracking-wider">
                  {language === 'hi' ? 'प्रगणक: जनगणना मित्र' : 'ENUMERATOR: CENSUS MITRA'}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-slate-900 text-slate-400 border border-slate-800">
                  STATUTORY
                </span>
              </>
            ) : (
              <span className="font-bold text-[11px] text-slate-300 uppercase tracking-wider">
                {language === 'hi' ? 'उत्तर: नागरिक' : 'RESPONDENT: CITIZEN'}
              </span>
            )}
          </div>

          {/* Voice Speech synthesis button */}
          {isBot && (
            <button
              type="button"
              onClick={handleSpeak}
              aria-label={isPlaying ? "Stop audio read out" : "Read question aloud"}
              className={`px-2 py-0.5 rounded-sm font-mono text-[10px] transition flex items-center gap-1 border ${
                isPlaying 
                  ? 'bg-amber-600 text-white border-amber-500 font-bold' 
                  : 'bg-[#070e18] text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              {isPlaying ? <VolumeX className="w-3 h-3 animate-pulse" aria-hidden="true" /> : <Volume2 className="w-3 h-3" aria-hidden="true" />}
              <span>{isPlaying ? "HALT" : "AUDIO"}</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="leading-relaxed font-sans text-slate-200">
          {renderFormattedText(message.text)}
        </div>

        {/* Footer info & timestamp */}
        <div className="mt-2.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="text-slate-500">REF: CEN27-SESSION</span>
          <div className="flex items-center gap-1">
            <span>{message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {!isBot && <Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" aria-hidden="true" />}
          </div>
        </div>
      </div>

      {/* Citizen Avatar */}
      {!isBot && (
        <div 
          className="w-10 h-10 bg-[#0c1829] border border-slate-700 rounded-sm flex items-center justify-center text-slate-300 shrink-0 font-mono text-xs font-bold"
          aria-hidden="true"
        >
          CIT
        </div>
      )}
    </motion.div>
  );
}
