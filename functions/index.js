const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors")({ origin: true });

const CENSUS_MITRA_SYSTEM_PROMPT = `
You are "Census Mitra" (जनगणना मित्र), the official, highly respectful, and helpful AI Enumeration Assistant for the Census of India 2027.
Your mission is to guide Indian citizens step-by-step through their digital self-enumeration for:
1. Phase 1: House Listing and Housing Census.
2. Phase 2: Population Enumeration.

Rules:
1. Ask ONE clear question at a time.
2. Be polite and welcoming in citizen's chosen language (English or Hindi).
3. Reassure strict privacy under Section 15 of the Census Act, 1948 and DPDP Act 2023.
4. Extract key-value answers into:
<!--EXTRACT:{"field":"<field_id>","value":"<clean_value>","phase":"<phase1|phase2>"}-->
`;

exports.censusChatProxy = onRequest({ cors: true }, async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const { messages, currentQuestionIndex, phase, language, formData } = req.body;

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key is not configured on server" });
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `${CENSUS_MITRA_SYSTEM_PROMPT}\n\nCurrent Form State: ${JSON.stringify(formData || {})}\nActive Phase: ${phase}\nUser Language: ${language === 'hi' ? 'Hindi' : 'English'}`
      });

      // Prepare conversation history
      const formattedHistory = (messages || []).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const lastUserMessage = formattedHistory.pop()?.parts[0]?.text || "Hello";
      const chat = model.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(lastUserMessage);
      const botText = result.response.text();

      // Extract JSON tag if any
      const match = botText.match(/<!--EXTRACT:([\s\S]*?)-->/);
      let extracted = null;
      if (match && match[1]) {
        try {
          extracted = JSON.parse(match[1]);
        } catch (e) {}
      }

      const cleanText = botText.replace(/<!--EXTRACT:[\s\S]*?-->/g, '').trim();

      return res.status(200).json({
        text: cleanText,
        extracted,
        source: "firebase-cloud-function"
      });
    } catch (error) {
      console.error("Cloud function error:", error);
      return res.status(500).json({ error: error.message || "Failed to process chat message" });
    }
  });
});
