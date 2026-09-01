export const dummyMisinformation = [
  {
    id: "flag_001",
    claim_text: "Census officers will ask for bank account PINs, OTPs, and property registration documents.",
    claim_text_hi: "जनगणना अधिकारी बैंक खाता पिन, ओटीपी और संपत्ति के मूल रजिस्ट्री दस्तावेज मांगेंगे।",
    verdict: "FALSE / SCAM ALERT",
    verdict_hi: "झूठ / फर्जी दावा",
    is_false: true,
    fact_explanation: "Census of India NEVER asks for financial details, bank balances, passwords, OTPs, or property ownership deeds. Questions only ask if a bank account exists in the household.",
    fact_explanation_hi: "जनगणना में कभी भी बैंक बैलेंस, पिन, ओटीपी या संपत्ति के दस्तावेज नहीं मांगे जाते। केवल यह पूछा जाता है कि क्या परिवार में बैंक खाता है।",
    source_url: "https://censusindia.gov.in/official-notices/safety-guidelines-2027",
    category: "Financial Scam"
  },
  {
    id: "flag_002",
    claim_text: "Individual census data will be shared with the Income Tax Department to track unearned income.",
    claim_text_hi: "व्यक्तिगत जनगणना डेटा आयकर विभाग के साथ साझा किया जाएगा ताकि अघोषित आय पकड़ी जा सके।",
    verdict: "FALSE / LEGALLY PROHIBITED",
    verdict_hi: "निराधार / कानूनी रूप से प्रतिबंधित",
    is_false: true,
    fact_explanation: "Section 15 of the Census Act, 1948 strictly prohibits sharing individual census data with any taxation, law enforcement, or judicial bodies. Data is only used in aggregated macro statistics.",
    fact_explanation_hi: "जनगणना अधिनियम 1948 की धारा 15 के तहत व्यक्तिगत डेटा किसी भी कर विभाग या पुलिस के साथ साझा करना पूरी तरह प्रतिबंधित है।",
    source_url: "https://censusindia.gov.in/privacy-protection-act-1948",
    category: "Data Privacy"
  },
  {
    id: "flag_003",
    claim_text: "Citizens who do not participate in online self-enumeration will be removed from electoral rolls.",
    claim_text_hi: "जो नागरिक ऑनलाइन स्व-गणना नहीं करेंगे, उनके नाम मतदाता सूची से हटा दिए जाएंगे।",
    verdict: "FALSE",
    verdict_hi: "असत्य",
    is_false: true,
    fact_explanation: "Online self-enumeration is an optional convenience. If a citizen does not self-enumerate online, an official field enumerator will visit in person to record the data.",
    fact_explanation_hi: "ऑनलाइन स्व-गणना वैकल्पिक सुविधा है। यदि आप ऑनलाइन नहीं भरते, तो प्रगणक घर आकर विवरण दर्ज करेंगे।",
    source_url: "https://eci.gov.in/electoral-rolls-independence",
    category: "Electoral Rumors"
  },
  {
    id: "flag_004",
    claim_text: "Digital Census 2027 allows citizens to fill Phase 1 and Phase 2 details online through official portal.",
    claim_text_hi: "डिजिटल जनगणना 2027 में नागरिक आधिकारिक पोर्टल के माध्यम से चरण 1 व चरण 2 का विवरण ऑनलाइन भर सकते हैं।",
    verdict: "TRUE / OFFICIAL FEATURE",
    verdict_hi: "सत्य / आधिकारिक सुविधा",
    is_false: false,
    fact_explanation: "The Government of India has introduced digital self-enumeration to empower citizens with secure, instant, and accessible census submission.",
    fact_explanation_hi: "भारत सरकार ने पहली बार डिजिटल स्व-गणना की सुविधा दी है ताकि नागरिक सुविधापूर्वक डेटा दर्ज कर सकें।",
    source_url: "https://censusindia.gov.in/digital-portal-announcement",
    category: "Official Policy"
  }
];

export const mythVsFactList = [
  {
    id: "mf_1",
    myth: "Census 2027 requires submitting biometrics like fingerprint and iris scans at home.",
    myth_hi: "जनगणना 2027 में घर पर बायोमेट्रिक्स जैसे फिंगरप्रिंट और आईरिस स्कैन देना अनिवार्य है।",
    fact: "No biometrics are collected during Census. The survey only collects basic demographic, educational, occupational, and household amenities information.",
    fact_hi: "जनगणना में कोई बायोमेट्रिक डेटा नहीं लिया जाता। इसमें केवल बुनियादी जनसांख्यिकीय, शैक्षणिक और आवास सुविधाओं की जानकारी ली जाती है।",
    icon: "Fingerprint"
  },
  {
    id: "mf_2",
    myth: "Self-enumeration requires paying a verification fee or downloading third-party APKs.",
    myth_hi: "स्व-गणना के लिए सत्यापन शुल्क देना होता है या थर्ड-पार्टी ऐप डाउनलोड करना पड़ता है।",
    fact: "Census 2027 self-enumeration is 100% FREE and accessible solely through official government web portals. Never pay anyone or download unofficial APKs.",
    fact_hi: "जनगणना स्व-गणना पूर्णतः निःशुल्क है और केवल आधिकारिक वेब पोर्टल पर उपलब्ध है। कभी भी किसी को शुल्क न दें।",
    icon: "ShieldAlert"
  },
  {
    id: "mf_3",
    myth: "My answers can be produced in court or used against me in legal disputes.",
    myth_hi: "मेरे द्वारा दिए गए उत्तर अदालत में साक्ष्य के रूप में मेरे खिलाफ इस्तेमाल किए जा सकते हैं।",
    fact: "Under Section 15 of the Census Act 1948, census records are immune to judicial subpoena and cannot be presented as evidence in any court of law.",
    fact_hi: "जनगणना अधिनियम की धारा 15 के अनुसार, व्यक्तिगत प्रविष्टियां किसी भी अदालत में साक्ष्य के रूप में अप्रमाण्य हैं।",
    icon: "Scale"
  },
  {
    id: "mf_4",
    myth: "If I live in rented accommodation, only the building landlord can fill the census.",
    myth_hi: "यदि मैं किराए के मकान में रहता हूँ, तो केवल मकान मालिक ही जनगणना भर सकता है।",
    fact: "Every independent household, whether owner or tenant, must be enumerated independently as a distinct household unit.",
    fact_hi: "प्रत्येक स्वतंत्र परिवार, चाहे वह मकान मालिक हो या किराएदार, अपनी अलग पारिवारिक इकाई के रूप में गणना दर्ज करा सकता है।",
    icon: "Home"
  }
];
