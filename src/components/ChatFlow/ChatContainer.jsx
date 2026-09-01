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

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);
  useEffect(() => { initChatForPhase(currentPhase); }, [currentPhase, language]);

  const initChatForPhase = (phase) => {
    const isPhase1 = phase === 'phase1';
    const questions = isPhase1 ? phase1Questions : phase2Questions;
    const firstQ = questions[0];
    const initialGreeting = language === 'hi'
      ? (isPhase1 
          ? `नमस्ते ${currentUser?.displayName || 'नागरिक'} जी! 🙏\n\nमैं **आशा** हूँ, भारत सरकार का आधिकारिक डिजिटल जनगणना प्रगणक सहायक।\n\nआइए **चरण 1 (मकान सूचीकरण एवं आवास गणना)** प्रारंभ करते हैं। आपकी सभी प्रविष्टियां जनगणना अधिनियम, १९४८ की धारा १५ के तहत पूर्णतः गोपनीय हैं।\n\n👉 **${firstQ.question_hi}**`
          : `नमस्ते! आइए अब **चरण 2 (जनसंख्या गणना)** प्रारंभ करते हैं।\n\nहम परिवार के सभी सदस्यों के जनसांख्यिकीय व शैक्षणिक विवरण दर्ज करेंगे।\n\n👉 **${firstQ.question_hi}**`)
      : (isPhase1
          ? `Namaste ${currentUser?.displayName || 'Citizen'}! 🙏\n\nI am **Asha**, the official AI Enumeration Assistant for Census of India 2027.\n\nLet's begin **Phase 1: House Listing & Housing Census**. All entries are confidential and protected under Section 15 of the Census Act, 1948.\n\n👉 **${firstQ.question_en}**`
          : `Namaste! Let's proceed to **Phase 2: Population Enumeration**.\n\nWe will now record the demographic and socio-economic details of your household members.\n\n👉 **${firstQ.question_en}**`);

    setMessages([{
      id: 'msg_welcome',
      sender: 'bot',
      text: initialGreeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setCurrentQuestionIndex(0);
  };

  const handleSendMessage = async (customText = null) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isTyping) return;
    setInputText('');

    const userMessage = {
      id: `user_${Date.now()}`, sender: 'user', text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await sendCensusMessageToGemini({
        messages: newMessages, currentQuestionIndex, phase: currentPhase,
        language, formData: currentPhase === 'phase1' ? phase1Data : phase2Data
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

      setMessages(prev => [...prev, {
        id: `bot_${Date.now()}`, sender: 'bot', text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

      if (response.isCompleted || currentQuestionIndex + 1 >= activeQuestions.length) {
        if (currentPhase === 'phase1') { await completePhase1(); }
        else { await completeFinalEnumeration(); setIsSlipOpen(true); }
      }
    } catch (err) { console.error("Chat error:", err); }
    finally { setIsTyping(false); }
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Voice input is not supported. Please use Chrome/Edge."); return; }
    if (isListening) { setIsListening(false); return; }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false; recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => { setInputText(event.results[0][0].transcript); setIsListening(false); };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) { setIsListening(false); }
  };

  const handleRestart = () => {
    if (confirm(language === 'hi' ? 'क्या आप इस चरण को पुनः प्रारंभ करना चाहते हैं?' : 'Restart this phase survey?')) {
      resetEnumeration(); initChatForPhase('phase1');
    }
  };

  const handleFinishPhase1 = () => { completePhase1(); setCurrentPhase('phase2'); };
  const isPhase1Done = getPhase1Progress() === 100;
  const isPhase2Done = getPhase2Progress() === 100;

  return (
    <section 
      className="w-full max-w-4xl mx-auto flex flex-col h-[82vh] bg-white border border-gray-200 rounded-lg shadow-gov-lg relative overflow-hidden"
      aria-label="Asha AI Guided Self-Enumeration Interview"
    >
      {/* Progress Tracker */}
      <ProgressTracker />

      {/* Control Bar */}
      <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-gray-500 font-medium">{language === 'hi' ? 'अनुसूची:' : 'Schedule:'}</span>
          <span className="font-bold text-gov-blue-700">{currentPhase === 'phase1' ? t('chatPhase1Tab') : t('chatPhase2Tab')}</span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setIsPreviewOpen(true)} aria-label="Review recorded data"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-100 text-gray-600 hover:text-gov-blue-700 border border-gray-200 transition text-xs font-semibold">
            <Eye className="w-3.5 h-3.5 text-gov-saffron-500" /> <span>{t('chatViewSummary')}</span>
          </button>
          {(isPhase2Done || status === 'completed') && (
            <button type="button" onClick={() => setIsSlipOpen(true)} aria-label="Download census slip"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gov-green-500 hover:bg-gov-green-600 text-white font-semibold transition text-xs">
              <Award className="w-3.5 h-3.5" /> <span>{t('chatDownloadSlip')}</span>
            </button>
          )}
          <button type="button" onClick={handleRestart} aria-label="Restart survey" title={t('chatRestart')}
            className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-gray-100 transition">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-gov-cream" role="log" aria-live="polite">
        {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500 text-xs p-3 rounded-lg bg-white border border-gray-200 w-max shadow-sm" role="status">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-gov-saffron-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-gov-saffron-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-gov-saffron-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-gray-500 font-medium">{language === 'hi' ? 'आशा टाइप कर रही हैं...' : 'Asha is typing...'}</span>
          </div>
        )}

        {currentPhase === 'phase1' && isPhase1Done && (
          <div className="p-5 my-3 bg-green-50 border border-green-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-green-800 text-sm">
                {language === 'hi' ? '✅ चरण 1 (मकान सूचीकरण) पूर्ण' : '✅ Phase 1 (Housing Census) Complete'}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {language === 'hi' ? 'अब चरण 2 (जनसंख्या गणना) के लिए आगे बढ़ें।' : 'Proceed to Phase 2 (Population Enumeration).'}
              </p>
            </div>
            <button type="button" onClick={handleFinishPhase1}
              className="px-5 py-2.5 rounded-lg bg-gov-blue-700 hover:bg-gov-blue-800 text-white font-semibold text-xs flex items-center gap-2 transition">
              <span>{t('chatFillPhase2Prompt')}</span><ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
        {currentQ && currentQ.quickReplies && (
          <QuickResponses options={currentQ.quickReplies} onSelect={(option) => handleSendMessage(option)} disabled={isTyping} />
        )}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2 mt-2">
          <button type="button" onClick={toggleSpeechRecognition} aria-label={isListening ? "Listening..." : "Voice input"}
            className={`p-3 rounded-lg border transition ${isListening ? 'bg-red-50 text-red-600 border-red-300 animate-pulse' : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gov-blue-600 hover:border-gov-blue-300'}`}>
            <Mic className="w-4 h-4" />
          </button>
          <div className="flex-1 relative">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
              aria-label="Type your response"
              placeholder={currentQ ? (language === 'hi' ? currentQ.placeholder_hi || t('chatInputPlaceholder') : currentQ.placeholder_en || t('chatInputPlaceholder')) : t('chatInputPlaceholder')}
              disabled={isTyping}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gov-blue-500 focus:border-gov-blue-500 transition" />
          </div>
          <button type="submit" disabled={!inputText.trim() || isTyping} aria-label="Send message"
            className="px-5 py-3 rounded-lg bg-gov-blue-700 hover:bg-gov-blue-800 text-white font-semibold text-sm disabled:opacity-40 disabled:pointer-events-none shadow-sm transition flex items-center gap-2">
            <span>{language === 'hi' ? 'भेजें' : 'Send'}</span><Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <PreviewDrawer isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} onGenerateSlip={() => setIsSlipOpen(true)} />
      <CompletionSlip isOpen={isSlipOpen} onClose={() => setIsSlipOpen(false)} />
    </section>
  );
}
