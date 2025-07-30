# speech-frontend

A React-based front end for recording, processing, and transcribing speech.  
Bootstrapped with Create React App and integrated with Supabase for authentication and data storage.

---

## Table of Contents

1. [Introduction](#introduction)  
2. [Features](#features)  
3. [Demo / Screenshots](#demo--screenshots)  
4. [Tech Stack & Dependencies](#tech-stack--dependencies)  
5. [Installation](#installation)  
6. [Configuration](#configuration)  
7. [Available Scripts](#available-scripts)  
8. [Usage](#usage)  
9. [Configuration & Environment Variables](#configuration--environment-variables)  
10. [Troubleshooting](#troubleshooting)  
11. [Contributing](#contributing)  
12. [License](#license)

---

## Introduction

**speech-frontend** is the client-side application for [**speech-backend**][backend-link]. It provides users with:
- User authentication (sign-up / sign-in) via Supabase  
- UI for recording or uploading audio  
- Real-time transcription display  
- History of past recordings and transcripts  

> **[TODO]** Please adjust this paragraph to describe the core purpose and user flows of your app.

---

## Features

- 🎤 **Record** or **upload** audio files  
- 🔍 Interactive **playback** with transcript highlighting  
- 🔐 **User accounts** & session management via Supabase Auth  
- ☁️ **Store** audio & transcripts in Supabase database / storage  
- ↩️ **Fetch** history of past sessions  

> **[TODO]** Add or refine feature list (e.g. real-time streaming, language selection, etc.).

---

## Demo / Screenshots

https://echonote.onurkahan.com


---

## Tech Stack & Dependencies

- **Framework:** React 19 (Create React App)  
- **Routing:** react-router-dom 7  
- **Authentication & Storage:** @supabase/supabase-js, @supabase/auth-ui-react  
- **HTTP Requests:** axios  
- **Icons:** react-icons  
- **Testing:** @testing-library/react, jest-dom, user-event  
- **Build & Tooling:** react-scripts, ESLint  

_All dependencies are pulled from_ `package.json`.

---

## Installation

1. **Clone** the repo  
   ```bash
   git clone https://github.com/htr2b/speech-frontend.git
   cd speech-frontend
