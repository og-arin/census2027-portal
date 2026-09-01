export const phase1Questions = [
  {
    id: "building_number",
    field: "building_number",
    phase: "phase1",
    question_en: "Let's start Phase 1 (House Listing). What is your Building / Census House Number and Municipal Ward?",
    question_hi: "आइए चरण 1 (मकान सूचीकरण) से शुरुआत करें। आपका भवन / जनगणना मकान नंबर और वार्ड क्या है?",
    type: "text",
    placeholder_en: "e.g., Flat 402, Lotus Heights, Ward 12",
    placeholder_hi: "उदा. फ्लैट 402, लोटस हाइट्स, वार्ड 12",
    quickReplies: ["Flat 101, Block A", "House #45, Main Road", "Plot 12, Green Avenue"],
    category: "Building Identity"
  },
  {
    id: "ownership_status",
    field: "ownership_status",
    phase: "phase1",
    question_en: "What is the ownership status of this residential house?",
    question_hi: "इस आवासीय मकान के स्वामित्व की स्थिति क्या है?",
    type: "select",
    quickReplies: ["Owned (स्वामित्व)", "Rented (किराए का)", "Company Quarters (सरकारी/कंपनी आवास)", "Any Other (अन्य)"],
    category: "Ownership"
  },
  {
    id: "drinking_water_source",
    field: "drinking_water_source",
    phase: "phase1",
    question_en: "What is the primary source of drinking water available to your household?",
    question_hi: "आपके परिवार के लिए पीने के पानी का मुख्य स्रोत क्या है?",
    type: "select",
    quickReplies: ["Treated Piped Tap Water (नल का उपचारित जल)", "Covered Well / Borewell (ढका कुआं/बोरवेल)", "Hand Pump (हैंडपंप)", "RO / Bottled Water (RO/जार जल)"],
    category: "Water & Sanitation"
  },
  {
    id: "cooking_fuel",
    field: "cooking_fuel",
    phase: "phase1",
    question_en: "What is the primary clean cooking fuel used in your kitchen?",
    question_hi: "आपकी रसोई में खाना पकाने के लिए मुख्य स्वच्छ ईंधन क्या है?",
    type: "select",
    quickReplies: ["LPG / PNG Gas Connection", "Induction / Electric Cooking", "Biogas", "Firewood / Kerosene"],
    category: "Energy"
  },
  {
    id: "lighting_source",
    field: "lighting_source",
    phase: "phase1",
    question_en: "What is the main source of lighting in your house?",
    question_hi: "आपके घर में प्रकाश का मुख्य साधन क्या है?",
    type: "select",
    quickReplies: ["Grid Electricity (ग्रिड बिजली)", "Solar Power (सौर ऊर्जा)", "Generator/Battery Inverter", "Other"],
    category: "Energy"
  },
  {
    id: "toilet_facility",
    field: "toilet_facility",
    phase: "phase1",
    question_en: "What type of latrine/toilet facility is accessible within the premises?",
    question_hi: "परिसर के भीतर किस प्रकार की शौचालय सुविधा उपलब्ध है?",
    type: "select",
    quickReplies: ["Flush / Piped Sewer System (फ्लश/सीवर)", "Septic Tank Latrine (सेप्टिक टैंक)", "Twin Pit Latrine (ट्विन पिट)", "Community Toilet (सामुदायिक शौचालय)"],
    category: "Water & Sanitation"
  },
  {
    id: "digital_assets",
    field: "digital_assets",
    phase: "phase1",
    question_en: "Which of the following digital and mobility assets are available in your household?",
    question_hi: "आपके परिवार में इनमें से कौन सी डिजिटल और वाहन संपत्तियां उपलब्ध हैं?",
    type: "multiselect",
    quickReplies: [
      "Smartphones & Broadband (स्मार्टफोन और ब्रॉडबैंड)",
      "Smart TV & Laptop / Computer",
      "Two-Wheeler / Scooter (दुपहिया)",
      "Four-Wheeler / Car (चौपहिया)",
      "All of the above (उपरोक्त सभी)"
    ],
    category: "Assets"
  }
];

export const phase2Questions = [
  {
    id: "head_name",
    field: "head_name",
    phase: "phase2",
    question_en: "Moving to Phase 2 (Population Enumeration). What is the Full Name of the Head of the Household?",
    question_hi: "अब चरण 2 (जनसंख्या गणना) पर आते हैं। परिवार के मुखिया का पूरा नाम क्या है?",
    type: "text",
    placeholder_en: "e.g., Rajesh Sharma",
    placeholder_hi: "उदा. राजेश शर्मा",
    quickReplies: ["Rajesh Sharma", "Priya Verma", "Amit Kumar Patel", "Sunita Devi"],
    category: "Household Head"
  },
  {
    id: "total_members",
    field: "total_members",
    phase: "phase2",
    question_en: "How many members normally reside in this household? (Male / Female / Transgender)",
    question_hi: "इस परिवार में सामान्यतः कितने सदस्य निवास करते हैं? (पुरुष / महिला / थर्ड जेंडर)",
    type: "number",
    quickReplies: ["3 Members (2M, 1F)", "4 Members (2M, 2F)", "5 Members (3M, 2F)", "2 Members (1M, 1F)"],
    category: "Demographics"
  },
  {
    id: "marital_status",
    field: "marital_status",
    phase: "phase2",
    question_en: "What is the marital status of the person / household head?",
    question_hi: "मुखिया / सदस्य की वैवाहिक स्थिति क्या है?",
    type: "select",
    quickReplies: ["Currently Married (विवाहित)", "Never Married / Single (अविवाहित)", "Widowed (विधवा/विधुर)", "Separated / Divorced (तलाकशुदा)"],
    category: "Marital Status"
  },
  {
    id: "highest_education",
    field: "highest_education",
    phase: "phase2",
    question_en: "What is the highest educational level attained by the member?",
    question_hi: "सदस्य द्वारा प्राप्त उच्चतम शैक्षणिक योग्यता क्या है?",
    type: "select",
    quickReplies: ["Post Graduate / Doctorate (स्नातकोत्तर/पीएचडी)", "Graduate / Degree (स्नातक)", "Higher Secondary (12th Pass)", "Secondary (10th Pass)", "Primary / Literate"],
    category: "Education"
  },
  {
    id: "mother_tongue",
    field: "mother_tongue",
    phase: "phase2",
    question_en: "What is the primary Mother Tongue (मातृभाषा) and subsidiary languages known?",
    question_hi: "प्राथमिक मातृभाषा और अन्य ज्ञात भाषाएं क्या हैं?",
    type: "select",
    quickReplies: ["Hindi (हिन्दी)", "English", "Marathi (मराठी)", "Tamil (தமிழ்)", "Bengali (বাংলা)", "Telugu (తెలుగు)", "Gujarati (ગુજરાતી)", "Kannada (ಕನ್ನಡ)"],
    category: "Culture & Language"
  },
  {
    id: "primary_occupation",
    field: "primary_occupation",
    phase: "phase2",
    question_en: "What is the principal economic activity / occupation of the working members?",
    question_hi: "कार्यरत सदस्यों की मुख्य आर्थिक गतिविधि / व्यवसाय क्या है?",
    type: "select",
    quickReplies: ["Professional / IT / Services (सॉफ्टवेयर/सेवाएं)", "Government / Public Sector Employee", "Business / Self-Employed Trader", "Agriculture / Cultivator (कृषि)", "Student / Homemaker"],
    category: "Economic Activity"
  },
  {
    id: "migration_status",
    field: "migration_status",
    phase: "phase2",
    question_en: "What is the place of birth / reason for migration to the current location?",
    question_hi: "जन्म स्थान या वर्तमान स्थान पर प्रवासन का मुख्य कारण क्या है?",
    type: "select",
    quickReplies: ["Resident since Birth (जन्म से यहीं निवासी)", "Employment / Business Relocation (रोजगार/व्यवसाय)", "Marriage (विवाह)", "Education / Studies (शिक्षा)"],
    category: "Migration"
  }
];

export const allQuestions = [...phase1Questions, ...phase2Questions];
