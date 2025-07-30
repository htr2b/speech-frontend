Core Features

User management

Email/password signup & login flows powered by Supabase Auth

Session persistence via local storage

Audio capture & upload

In‑browser recording using the Web Speech API (or similar)

Drag‑and‑drop or file‑select upload of existing audio files

Transcription

HTTP calls (via Axios) to a configured speech‑to‑text API (e.g. Whisper, an Edge Function, etc.)

Displays interim loading states and error messages

Renders the final transcript in a scrollable view with “download as .txt” support

Responsive UI

Functional components with React Hooks (useState, useEffect, etc.)

Client‑side routing with React Router

Modular CSS (CSS modules or styled‑components) for clean, maintainable styling

Tech Stack & Dependencies

Framework: React (Create React App)

Auth & Storage: @supabase/supabase‑js

HTTP client: Axios

Routing: react‑router‑dom

State & effects: React Hooks & Context

Build toolchain: npm scripts (npm start, npm run build, npm test)

Project Structure

csharp
Kopyala
Düzenle
speech-frontend/
├── public/                  # Static assets (favicon, index.html, etc.)
├── src/
│   ├── index.js             # App entry point
│   ├── App.js               # Top‑level routes & layout
│   ├── services/
│   │   ├── supabaseClient.js  # Initializes Supabase client
│   │   └── api.js             # Axios instance & API wrappers
│   ├── components/          # Reusable UI bits
│   │   ├── AuthForm.jsx
│   │   ├── AudioRecorder.jsx
│   │   └── TranscriptView.jsx
│   └── pages/               # Route views
│       ├── LoginPage.jsx
│       ├── Dashboard.jsx
│       └── NotFound.jsx
├── .env.local               # Your REACT_APP_SUPABASE_URL/ANON_KEY & SPEECH_API_URL
├── package.json
└── README.md
Getting Started

Clone & install

bash
Kopyala
Düzenle
git clone https://github.com/htr2b/speech-frontend.git
cd speech-frontend
npm install
Configure environment
Create a .env.local at the project root with:

text
Kopyala
Düzenle
REACT_APP_SUPABASE_URL=https://<your‑project>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<your‑anon‑public‑key>
REACT_APP_SPEECH_API_URL=https://api.your‑speech‑service/transcribe
Run & build

npm start to launch in development (http://localhost:3000)

npm run build to produce a production bundle

That’s the full‐stack flow: users authenticate → record/upload audio → frontend sends it off → receive & display transcript.
