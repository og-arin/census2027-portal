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
  RotateCcw, 
  Eye, 
  Award, 
  Mic, 
  ArrowRight,
  FileCheck2,
  FileText
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    initChatForPhase(currentPhase);
  }, [currentPhase, language]);

  const initChatForPhase = (phase) => {
    const isPhase1 = phase === 'phase1';
    const questions = isPhase1 ? phase1Questions : phase2Questions;
    const firstQ = questions[0];
    const initialGreeting = language === 'hi'
      ? (isPhase1 
          ? `नमस्ते ${currentUser?.displayName || 'नागरिक'} जी! 🙏\n\nमैं **जनगणना मित्र** हूँ, भारत सरकार का आधिकारिक डिजिटल जनगणना प्रगणक सहायक।\n\nआइए **चरण 1 (मकान सूचीकरण एवं आवास गणना)** प्रारंभ करते हैं। आपकी सभी प्रविष्टियां जनगणना अधिनियम, १९४८ की धारा १५ के तहत पूर्णतः गोपनीय हैं।\n\n👉 **${firstQ.question_hi}**`
          : `नमस्ते! आइए अब **चरण 2 (जनसंख्या गणना)** प्रारंभ करते हैं।\n\nहम परिवार के सभी सदस्यों के जनसांख्यिकीय व शैक्षणिक विवरण दर्ज करेंगे।\n\n👉 **${firstQ.question_hi}**`)
      : (isPhase1
          ? `Namaste ${currentUser?.displayName || 'Citizen'}! 🙏\n\nI am **Census Mitra**, the official AI Enumeration Assistant for Census of India 2027.\n\nLet's begin **Phase 1: House Listing & Housing Census**. All entries are confidential and protected under Section 15 of the Census Act, 1948.\n\n👉 **${firstQ.question_en}**`
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

      if (response.extracted && response.extracted.field) {
        await updateAnswer(currentPhase, response.extracted.field, response.extracted.value);
      } else if (currentQ) {
        await updateAnswer(currentPhase, currentQ.field, textToSend);
      }

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
    <section 
      className="w-full max-w-4xl mx-auto flex flex-col h-[82vh] bg-[#091220] border border-slate-700 rounded-sm shadow-2xl relative overflow-hidden font-sans"
      aria-label="Census Mitra Guided Self-Enumeration Interview"
    >
      {/* Top Gazette Progress Tracker */}
      <ProgressTracker />

      {/* Control sub-bar */}
      <div className="bg-[#0c1829] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-emerald-500" aria-hidden="true" />
          <span className="text-slate-400">
            {language === 'hi' ? 'सक्रिय अनुसूची:' : 'SCHEDULE:'}
          </span>
          <span className="font-bold text-amber-400">
            {currentPhase === 'phase1' ? t('chatPhase1Tab') : t('chatPhase2Tab')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Review Data drawer button */}
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            aria-label="Inspect recorded survey schedule entries"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#070e18] hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            <span className="font-bold">{t('chatViewSummary')}</span>
          </button>

          {/* Verification slip trigger if completed */}
          {(isPhase2Done || status === 'completed') && (
            <button
              type="button"
              onClick={() => setIsSlipOpen(true)}
              aria-label="Download verified census slip"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition shadow-sm"
            >
              <Award className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('chatDownloadSlip')}</span>
            </button>
          )}

          {/* Restart */}
          <button
            type="button"
            onClick={handleRestart}
            aria-label="Reset current survey schedule"
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-sm hover:bg-slate-800 transition"
            title={t('chatRestart')}
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 bg-[#08111e]"
        role="log"
        aria-live="polite"
        aria-label="Official Enumeration Transcript"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Formal Typing / Verification indicator */}
        {isTyping && (
          <div 
            className="flex items-center gap-2 text-slate-400 text-xs p-3 rounded-sm bg-[#0c1829] border border-slate-700 w-max shadow-sm font-mono"
            role="status"
            aria-label="Verifying and generating official query"
          >
            <div className="w-2 h-2 rounded-none bg-amber-400 animate-ping" aria-hidden="true" />
            <span className="text-slate-300">VALIDATING RECORD WITH STATISTICAL REGISTRY...</span>
          </div>
        )}

        {/* Phase transition helper prompt */}
        {currentPhase === 'phase1' && isPhase1Done && (
          <div className="p-5 my-4 bg-[#0c1829] border border-emerald-600 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <p className="font-serif font-bold text-white text-sm sm:text-base">
                {language === 'hi' ? 'चरण १ (मकान सूचीकरण) पूर्ण हुआ' : 'SCHEDULE A (HOUSING CENSUS) RECORDED'}
              </p>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                {language === 'hi' ? 'अब परिवार के सदस्यों का जनसांख्यिकीय विवरण (चरण २) दर्ज करने के लिए आगे बढ़ें।' : 'Proceed to record individual demographic & educational data in Schedule B.'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleFinishPhase1}
              aria-label="Proceed to Schedule B Population Enumeration"
              className="px-5 py-2.5 rounded-sm bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <span>{t('chatFillPhase2Prompt')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Interactive Area */}
      <div className="p-3 sm:p-5 bg-[#0a1424] border-t border-slate-800">
        {/* Smart Quick Reply Chips */}
        {currentQ && currentQ.quickReplies && (
          <QuickResponses
            options={currentQ.quickReplies}
            onSelect={(option) => handleSendMessage(option)}
            disabled={isTyping}
          />
        )}

        {/* Formal Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2.5 mt-2"
        >
          {/* Voice Input button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            aria-label={isListening ? "Voice recording active" : "Dictate response"}
            className={`p-3 rounded-sm border font-mono text-xs transition-all ${
              isListening
                ? 'bg-rose-700 text-white border-rose-500 shadow-md animate-pulse'
                : 'bg-[#070e18] border-slate-700 text-slate-400 hover:text-amber-400 hover:border-slate-600'
            }`}
            title={isListening ? t('chatVoiceListen') : "Voice input"}
          >
            <Mic className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              aria-label="Census Mitra conversation input"
              placeholder={
                currentQ 
                  ? (language === 'hi' ? currentQ.placeholder_hi || t('chatInputPlaceholder') : currentQ.placeholder_en || t('chatInputPlaceholder')) 
                  : t('chatInputPlaceholder')
              }
              disabled={isTyping}
              className="w-full bg-[#070e18] border border-slate-700 rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition font-sans"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            aria-label="Submit recorded answer"
            className="px-5 py-3 rounded-sm bg-amber-600 hover:bg-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider disabled:opacity-40 disabled:pointer-events-none shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>SUBMIT</span>
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
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
    </section>
  );
}
