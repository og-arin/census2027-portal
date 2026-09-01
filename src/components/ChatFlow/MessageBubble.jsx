import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, User, Volume2, VolumeX, Sparkles, CheckCheck } from 'lucide-react';

export default function MessageBubble({ message }) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const isBot = message.sender === 'bot';

  // Text-to-speech support for accessibility
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

  // Helper to render bold markdown (**text**)
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className={lIdx > 0 ? "mt-1.5 leading-relaxed" : "leading-relaxed"}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-amber-300">
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
    <div className={`flex items-start gap-3 my-3 animate-fade-in ${isBot ? 'justify-start' : 'justify-end'}`}>
      {/* Bot Avatar */}
      {isBot && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-600 p-[1.5px] shrink-0 shadow-lg shadow-amber-500/10">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
            <Bot className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* Message Box */}
      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm shadow-md transition-all ${
        isBot 
          ? 'bg-slate-900/90 border border-slate-800 text-slate-100 backdrop-blur-md rounded-tl-sm' 
          : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium rounded-tr-sm shadow-amber-500/20'
      }`}>
        {/* Header inside bubble */}
        <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            {isBot ? (
              <>
                <span className="font-bold text-xs text-amber-400">
                  {language === 'hi' ? 'जनगणना मित्र एआई' : 'Census Mitra AI'}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  Official
                </span>
              </>
            ) : (
              <span className="font-bold text-xs text-slate-950">
                {language === 'hi' ? 'आप (नागरिक)' : 'You (Citizen)'}
              </span>
            )}
          </div>

          {/* Voice Speech synthesis button for Bot */}
          {isBot && (
            <button
              onClick={handleSpeak}
              className={`p-1 rounded-md text-[10px] transition flex items-center gap-1 ${
                isPlaying 
                  ? 'bg-amber-500 text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={isPlaying ? "Stop speech" : "Read aloud"}
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Bubble text content */}
        <div className="text-xs sm:text-[13px] leading-relaxed">
          {renderFormattedText(message.text)}
        </div>

        {/* Footer info & timestamp */}
        <div className="mt-2 pt-1 flex items-center justify-end gap-1 text-[10px] opacity-70">
          <span>{message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {!isBot && <CheckCheck className="w-3 h-3 text-slate-900 stroke-[2.5]" />}
        </div>
      </div>

      {/* User Avatar */}
      {!isBot && (
        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 shadow-md">
          <User className="w-5 h-5 text-amber-400" />
        </div>
      )}
    </div>
  );
}
