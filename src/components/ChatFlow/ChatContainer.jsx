import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCensusData } from '../../context/CensusDataContext';
import { useAuth } from '../../context/AuthContext';
import { sendCensusMessageToGemini } from '../../services/gemini';
import { phase1Questions, phase2Questions } from '../../data/formSchema';
import MessageBubble from './MessageBubble';
import QuickResponses from './QuickResponses';
import ProgressTracker from './ProgressTracker';
import PreviewDrawer from './PreviewDrawer';
import CompletionSlip from './CompletionSlip';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Eye, 
  Award, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function ChatContainer() {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const {
    phase1Data,
    phase2Data,
    currentPhase,
    setCurrentPhase,
    status,
    updateAnswer,
    completePhase1,
    completeFinalEnumeration,
    resetEnumeration,
    getPhase1Progress,
    getPhase2Progress
  } = useCensusData();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef(null);
  const activeQuestions = currentPhase === 'phase1' ? phase1Questions : phase2Questions;
  const currentQ = activeQuestions[currentQuestionIndex];

  // Auto-scroll to bottom on message updates
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial welcome greeting & first question
  useEffect(() => {
    initChatForPhase(currentPhase);
  }, [currentPhase, language]);

  const initChatForPhase = (phase) => {
    const isPhase1 = phase === 'phase1';
    const questions = isPhase1 ? phase1Questions : phase2Questions;
    const firstQ = questions[0];
    const initialGreeting = language === 'hi'
      ? (isPhase1 
          ? `नमस्ते ${currentUser?.displayName || 'नागरिक'} जी! 🙏\n\nमैं **जनगणना मित्र** हूँ, आपका डिजिटल जनगणना 2027 सहायक।\n\nआइए **चरण 1 (मकान सूचीकरण एवं आवास गणना)** प्रारंभ करते हैं। आपकी सभी प्रविष्टियां पूर्णतः गोपनीय और सुरक्षित रहेंगी।\n\n👉 **${firstQ.question_hi}**`
          : `नमस्ते ${currentUser?.displayName || 'Citizen'}! 🙏\n\nI am **Census Mitra**, your official AI Assistant for Census 2027.\n\nLet's begin **Phase 1: House Listing & Housing Census**. Your answers are protected under the Census Act and strictly confidential.\n\n👉 **${firstQ.question_en}**`)
      : (isPhase1
          ? `Namaste ${currentUser?.displayName || 'Citizen'}! 🙏\n\nI am **Census Mitra**, your official AI Assistant for Census 2027.\n\nLet's begin **Phase 1: House Listing & Housing Census**. Your responses are protected under the Census Act.\n\n👉 **${firstQ.question_en}**`
          : `Namaste! Let's proceed to **Phase 2: Population Enumeration**.\n\nWe will now record the demographic and socio-economic details of your household members.\n\n👉 **${firstQ.question_en}**`);

    setMessages([
      {
        id: 'msg_welcome',
        sender: 'bot',
        text: initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setCurrentQuestionIndex(0);
  };

  // Handle sending a message
  const handleSendMessage = async (customText = null) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isTyping) return;

    setInputText('');

    const userMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await sendCensusMessageToGemini({
        messages: newMessages,
        currentQuestionIndex: currentQuestionIndex,
        phase: currentPhase,
        language: language,
        formData: currentPhase === 'phase1' ? phase1Data : phase2Data
      });

      // Save extracted answer to context & Firestore
      if (response.extracted && response.extracted.field) {
        await updateAnswer(currentPhase, response.extracted.field, response.extracted.value);
      } else if (currentQ) {
        await updateAnswer(currentPhase, currentQ.field, textToSend);
      }

      // Update question index
      if (response.nextIndex !== undefined) {
        setCurrentQuestionIndex(response.nextIndex);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }

      const botMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);

      // If phase completed, trigger completion
      if (response.isCompleted || currentQuestionIndex + 1 >= activeQuestions.length) {
        if (currentPhase === 'phase1') {
          await completePhase1();
        } else {
          await completeFinalEnumeration();
          setIsSlipOpen(true);
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  // Voice recognition (Speech to text) for accessibility
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome/Edge or type directly.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleRestart = () => {
    if (confirm(language === 'hi' ? 'क्या आप इस चरण को पुनः प्रारंभ करना चाहते हैं?' : 'Restart this phase survey?')) {
      resetEnumeration();
      initChatForPhase('phase1');
    }
  };

  const handleFinishPhase1 = () => {
    completePhase1();
    setCurrentPhase('phase2');
  };

  const isPhase1Done = getPhase1Progress() === 100;
  const isPhase2Done = getPhase2Progress() === 100;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[82vh] bg-slate-950/70 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl relative">
      {/* Top Progress Tracker */}
      <ProgressTracker />

      {/* Control sub-bar */}
      <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">
            {language === 'hi' ? 'सक्रिय सत्र:' : 'Active Phase:'}
          </span>
          <span className="font-bold text-amber-400">
            {currentPhase === 'phase1' ? t('chatPhase1Tab') : t('chatPhase2Tab')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Review Data drawer button */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('chatViewSummary')}</span>
          </button>

          {/* Verification slip trigger if completed */}
          {(isPhase2Done || status === 'completed') && (
            <button
              onClick={() => setIsSlipOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition shadow-md shadow-emerald-500/20"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t('chatDownloadSlip')}</span>
            </button>
          )}

          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
            title={t('chatRestart')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 w-max animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Census Mitra is typing response & verifying data...</span>
          </div>
        )}

        {/* Phase transition helper prompt */}
        {currentPhase === 'phase1' && isPhase1Done && (
          <div className="p-4 my-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-transparent border border-emerald-500/30 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-sm">
                {language === 'hi' ? 'चरण 1 पूर्ण हो गया है!' : 'Phase 1 Complete!'}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {language === 'hi' ? 'अब परिवार के सदस्यों का विवरण दर्ज करने के लिए चरण 2 शुरू करें।' : 'Ready to record individual demographic data in Phase 2.'}
              </p>
            </div>
            <button
              onClick={handleFinishPhase1}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 whitespace-nowrap transition"
            >
              <span>{t('chatFillPhase2Prompt')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Interactive Area */}
      <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-slate-800">
        {/* Smart Quick Reply Chips */}
        {currentQ && currentQ.quickReplies && (
          <QuickResponses
            options={currentQ.quickReplies}
            onSelect={(option) => handleSendMessage(option)}
            disabled={isTyping}
          />
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 mt-2"
        >
          {/* Voice Input button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-3 rounded-2xl border transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-slate-700'
            }`}
            title={isListening ? t('chatVoiceListen') : "Voice input"}
          >
            {isListening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                currentQ 
                  ? (language === 'hi' ? currentQ.placeholder_hi || t('chatInputPlaceholder') : currentQ.placeholder_en || t('chatInputPlaceholder')) 
                  : t('chatInputPlaceholder')
              }
              disabled={isTyping}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Preview Side Drawer */}
      <PreviewDrawer
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onGenerateSlip={() => setIsSlipOpen(true)}
      />

      {/* Completion & Official Verification Slip Modal */}
      <CompletionSlip
        isOpen={isSlipOpen}
        onClose={() => setIsSlipOpen(false)}
      />
    </div>
  );
}
