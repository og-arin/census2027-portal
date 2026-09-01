import { phase1Questions, phase2Questions, allQuestions } from '../data/formSchema';

export const CENSUS_MITRA_SYSTEM_PROMPT = `
You are "Census Mitra" (जनगणना मित्र), the official, highly respectful, and helpful AI Enumeration Assistant for the Census of India 2027.
Your mission is to guide Indian citizens step-by-step through their digital self-enumeration for:
1. Phase 1: House Listing and Housing Census (building material, amenities, drinking water, cooking fuel, lighting, toilet, digital assets).
2. Phase 2: Population Enumeration (head of household, member count, age, gender, marital status, education, mother tongue, occupation, migration).

Rules of Interaction:
1. Ask ONE clear question at a time. Never overwhelm the citizen with multiple questions at once.
2. Be polite, warm, and encourage citizen participation ("नमस्ते / Welcome to Census 2027").
3. Language: Match the user's language (English or Hindi/Hinglish). If user speaks Hindi, answer warmly in pure/clear Hindi.
4. Privacy Reassurance: If the user is hesitant or asks why a detail is needed, explain that all data is strictly confidential under Section 15 of the Census Act, 1948 and DPDP Act 2023, used exclusively for national policy, healthcare, and infrastructure planning.
5. Structured Extraction: At the end of your response, ALWAYS include a hidden JSON tag with the extracted field and clean value if the user just provided an answer, formatted as:
<!--EXTRACT:{"field":"<field_id>","value":"<extracted_value>","phase":"<phase1|phase2>"}-->
6. Keep answers concise, clear, and reassuring.
`.trim();

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

/**
 * Call Google Gemini API (gemini-1.5-flash or gemini-2.0-flash)
 */
export async function sendCensusMessageToGemini({
  messages,
  currentQuestionIndex,
  phase,
  language = 'en',
  formData = {}
}) {
  // If Gemini API key is configured, call official Gemini API
  if (GEMINI_API_KEY && GEMINI_API_KEY !== "your-gemini-api-key") {
    try {
      const systemInstruction = `${CENSUS_MITRA_SYSTEM_PROMPT}\n\nCurrent Form State: ${JSON.stringify(formData)}\nActive Phase: ${phase}\nUser Preferred Language: ${language === 'hi' ? 'Hindi' : 'English'}`;
      
      const contents = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Direct Gemini REST API endpoint
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: systemInstruction }]
            },
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 600,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      const botText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (botText) {
        const extractedData = parseExtractedJSON(botText);
        const cleanText = botText.replace(/<!--EXTRACT:[\s\S]*?-->/g, '').trim();
        return {
          text: cleanText,
          extracted: extractedData,
          source: 'gemini-live'
        };
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart local Census Mitra engine:", err);
    }
  }

  // Smart Offline/Demo Census Mitra Engine
  return generateLocalCensusMitraResponse({
    messages,
    currentQuestionIndex,
    phase,
    language,
    formData
  });
}

/**
 * Parses hidden extraction tag if provided by Gemini
 */
function parseExtractedJSON(text) {
  const match = text.match(/<!--EXTRACT:([\s\S]*?)-->/);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Intelligent Local Census Mitra Assistant for smooth offline/hackathon experience
 */
export function generateLocalCensusMitraResponse({
  messages,
  currentQuestionIndex,
  phase,
  language = 'en',
  formData = {}
}) {
  const lastUserMsg = messages[messages.length - 1]?.text || "";
  const questionsList = phase === 'phase1' ? phase1Questions : phase2Questions;
  const currentQ = questionsList[currentQuestionIndex];

  // Acknowledgment phrases
  const ackEn = ["Got it, recorded!", "Thank you for providing that detail.", "Perfect, noted securely.", "Understood."];
  const ackHi = ["धन्यवाद, यह विवरण दर्ज कर लिया गया है।", "बहुत अच्छा, यह जानकारी सुरक्षित रूप से सहेजी गई है।", "नोट कर लिया गया है।", "ठीक है, अगला विवरण दर्ज करते हैं।"];
  
  const randomAck = language === 'hi' 
    ? ackHi[Math.floor(Math.random() * ackHi.length)] 
    : ackEn[Math.floor(Math.random() * ackEn.length)];

  // If user just answered the current question
  let nextIndex = currentQuestionIndex;
  let extracted = null;

  if (currentQ) {
    extracted = {
      field: currentQ.field,
      value: lastUserMsg,
      phase: phase
    };
    nextIndex = currentQuestionIndex + 1;
  }

  const nextQ = questionsList[nextIndex];

  let replyText = "";
  if (nextQ) {
    const questionText = language === 'hi' ? nextQ.question_hi : nextQ.question_en;
    replyText = `${randomAck}\n\n👉 **${questionText}**`;
  } else {
    // Phase completed!
    if (phase === 'phase1') {
      replyText = language === 'hi'
        ? "🎉 **बधाई! चरण 1 (मकान सूचीकरण) के सभी प्रश्न पूरे हो गए हैं।**\n\nआपकी जानकारी सुरक्षित रूप से सहेज ली गई है। अब आप **चरण 2 (जनसंख्या गणना)** पर आगे बढ़ सकते हैं।"
        : "🎉 **Splendid! Phase 1 (House Listing & Housing Census) is complete!**\n\nAll housing details have been securely recorded. You can now proceed to **Phase 2 (Population Enumeration)**.";
    } else {
      replyText = language === 'hi'
        ? "🇮🇳 **शुभकामनाएं! आपने जनगणना 2027 की दोनों चरणों की स्व-गणना सफलतापूर्वक पूरी कर ली है।**\n\nआपकी विशिष्ट संदर्भ संख्या (URN) तैयार हो गई है। आप नीचे दिए गए बटन से अपनी आधिकारिक सत्यापन पावती रसीद डाउनलोड कर सकते हैं।"
        : "🇮🇳 **Congratulations! You have successfully completed your Census 2027 Digital Self-Enumeration.**\n\nYour Unique Reference Number (URN) and verified digital certificate are now generated. Click below to view and download your official Acknowledgment Slip.";
    }
  }

  return {
    text: replyText,
    extracted: extracted,
    nextIndex: nextIndex,
    isCompleted: !nextQ,
    source: 'census-mitra-engine'
  };
}
