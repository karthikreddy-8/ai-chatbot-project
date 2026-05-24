# 🤖 NexusAI — AI-Powered Smart Chatbot Assistant

A full-stack AI chatbot web application with a premium futuristic UI, intelligent conversational AI powered by Google Gemini, and production-ready architecture.

**B.Tech Final Year Project — 2026**

---

## ✨ Features

- 🧠 **AI-Powered Chat** — Natural language conversations using Google Gemini API
- 💻 **Code Assistant** — Write, debug, and optimize code in any language
- 🎨 **Futuristic UI** — Dark glassmorphism theme with neon glow effects
- 🌓 **Dark/Light Mode** — Smooth theme switching
- 🔐 **Authentication** — JWT-based register/login system
- 💬 **Chat History** — Save, search, rename, and delete conversations
- 🎤 **Voice Input** — Speak your messages using Web Speech API
- 📱 **Responsive** — Works on desktop, tablet, and mobile
- ⚡ **Real-time** — Instant message rendering with typing indicators
- 📝 **Markdown** — Rich formatting with syntax-highlighted code blocks

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Python FastAPI |
| **AI** | Google Gemini API |
| **Database** | SQLite + SQLAlchemy |
| **Auth** | JWT (PyJWT + bcrypt) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ → [Download](https://nodejs.org/)
- **Python** 3.10+ → [Download](https://python.org/)
- **Google Gemini API Key** (free) → [Get Key](https://aistudio.google.com/apikey)

### 1. Clone & Setup Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure API Key

Edit `backend/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
JWT_SECRET=change_this_to_a_random_string
```

### 3. Start Backend

```bash
cd backend
python run.py
```

The API will start at `http://localhost:8000`

### 4. Start Frontend

```bash
# In a new terminal
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📁 Project Structure

```
AI CHABOT/
├── frontend/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/          # Login & Register forms
│   │   │   ├── chat/          # Chat interface components
│   │   │   ├── landing/       # Landing page sections
│   │   │   ├── layout/        # Sidebar & layout
│   │   │   └── ui/            # Reusable UI components
│   │   ├── context/           # React Context (Auth, Theme)
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Route pages
│   │   ├── services/          # API services
│   │   ├── App.jsx            # Root component
│   │   └── main.jsx           # Entry point
│   └── index.html
├── backend/                   # FastAPI Backend
│   ├── app/
│   │   ├── models/            # SQLAlchemy models
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth middleware
│   │   ├── main.py            # FastAPI app
│   │   └── database.py        # DB config
│   ├── .env                   # Environment variables
│   ├── requirements.txt       # Python deps
│   └── run.py                 # Entry point
└── README.md
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get profile |
| POST | `/api/chat/conversations` | New conversation |
| GET | `/api/chat/conversations` | List conversations |
| GET | `/api/chat/conversations/:id` | Get conversation |
| POST | `/api/chat/conversations/:id/messages` | Send message |
| PUT | `/api/chat/conversations/:id` | Rename |
| DELETE | `/api/chat/conversations/:id` | Delete |

---

## 📸 Screenshots

The application features:
- **Landing Page** — Hero section with animated AI illustration
- **Login/Register** — Glassmorphism auth forms
- **Chat Interface** — Full-featured chat with sidebar
- **Dark/Light Mode** — Theme switching support

---

## 👨‍💻 Team

**Project by:** NexusAI Team  
**Course:** B.Tech Computer Science  
**Year:** 2026

---

## 📄 License

This project is for educational purposes (B.Tech academic project).
