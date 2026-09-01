# Census 2027 Portal 🇮🇳

> A GenAI-powered self-enumeration platform for India's first fully digital census.

Built for **PromptWars x ADYPU** (Build with AI Hackathon).

## 🎯 Problem Statement

India's Census 2027 is going fully digital. This portal lets citizens self-enumerate online — no enumerator visit required — guided by a conversational AI assistant, while addressing data privacy concerns and visualizing census data meaningfully.

## ✨ Features

- **Two-Phase Explainer** — House Listing (Phase 1) & Population Enumeration (Phase 2) breakdown
- **State-Wise Survey Schedule** — searchable/filterable dates per state
- **AI Self-Enumeration Assistant ("Census Mitra")** — Gemini-powered conversational form filling with real-time Firestore sync
- **Digital Certificate** — URN + QR code on completion
- **Analytics Dashboard** — population, age pyramid, literacy, amenities visualizations (Recharts)
- **Privacy & Myth-Busting Hub** — DPDP Act compliance info, myth vs fact cards
- **Bilingual (EN/HI)** — full app-wide language toggle

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite, Tailwind CSS, Framer Motion |
| Charts | Recharts |
| Auth & DB | Firebase Auth, Cloud Firestore |
| AI | Google Gemini API |
| Deployment | Vercel |
| Dev Tool | Google Antigravity IDE |

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/census2027-portal.git
cd census2027-portal
npm install
cp .env.example .env   # fill in Firebase + Gemini keys
npm run dev
```

## 🔐 Environment Variables

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GEMINI_API_KEY=


## 🧪 Testing

```bash
npm run test
```

## 📦 Build

```bash
npm run build
```

## 🌐 Live Demo

[your-vercel-url-here]

## 👤 Team

- Arin Kulkarni — [GitHub](https://github.com/og-arin)

## 📄 License

MIT
