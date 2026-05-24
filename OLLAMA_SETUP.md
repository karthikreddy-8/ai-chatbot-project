# AI Chatbot - Ollama Integration Guide

## 🚀 Quick Start

### Prerequisites
- **Ollama installed** and running locally on `http://localhost:11434`
- **Node.js** (v14+) installed
- **npm** or **yarn** package manager

### 1. Backend Setup

```bash
cd node-backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start backend
npm start
# Backend runs on http://localhost:5000
```

**Backend .env Configuration:**
```env
NODE_ENV=development
PORT=5000
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

**Frontend .env Configuration:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Verify Ollama is Running

```bash
# Check if Ollama is accessible
curl http://localhost:11434/api/tags

# You should see a list of available models including llama3
```

If Ollama is not running, install it from: https://ollama.ai

Then pull the llama3 model:
```bash
ollama pull llama3
```

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React/Vite)               │
│           http://localhost:5173                          │
│                                                         │
│  - Modern UI with dark theme                          │
│  - Real-time chat interface                           │
│  - Message history & projects                         │
└────────────────────┬────────────────────────────────────┘
                     │ API Calls
                     ↓
┌─────────────────────────────────────────────────────────┐
│            Backend (Node.js/Express)                   │
│           http://localhost:5000                         │
│                                                         │
│  - API endpoints for chat                             │
│  - User authentication                                │
│  - Conversation management                           │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP Requests
                     ↓
┌─────────────────────────────────────────────────────────┐
│              Ollama Local AI                            │
│          http://localhost:11434                         │
│                                                         │
│  - llama3 model                                        │
│  - Fast local inference                               │
│  - No API keys required                               │
└─────────────────────────────────────────────────────────┘
```

## 🔌 API Endpoints

### Chat Endpoints

**Generate Response (Non-streaming)**
```
POST /api/chat/generate
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi!"},
    {"role": "user", "content": "How are you?"}
  ]
}

Response:
{
  "message": {
    "role": "assistant",
    "content": "I'm doing well, thank you for asking!"
  },
  "model": "llama3",
  "provider": "ollama",
  "responseTime": 2341
}
```

**Stream Response (Server-Sent Events)**
```
POST /api/chat/stream
Content-Type: application/json

{
  "messages": [...]
}

Response: Server-Sent Events stream
```

**Health Check**
```
GET /api/chat/health

Response:
{
  "status": "ok",
  "provider": "ollama",
  "url": "http://localhost:11434",
  "model": "llama3"
}
```

### Conversation Management

**Create Conversation**
```
POST /api/chat/conversations
Response: { id, title, created_at }
```

**Get All Conversations**
```
GET /api/chat/conversations
Response: [{ id, title, created_at, updated_at }, ...]
```

**Get Single Conversation**
```
GET /api/chat/conversations/:id
Response: { id, title, messages: [] }
```

**Send Message**
```
POST /api/chat/conversations/:id/messages
{ "content": "User message" }
Response: { id, role, content, timestamp }
```

**Rename Conversation**
```
PUT /api/chat/conversations/:id
{ "title": "New Title" }
```

**Delete Conversation**
```
DELETE /api/chat/conversations/:id
```

## 🎨 UI Features

### Landing Page
- Hero section with AI-themed design
- Features showcase
- Call-to-action button
- Dark/Light theme toggle
- Responsive mobile layout

### Authentication
- User registration
- Secure login
- JWT token-based sessions
- Password hashing with bcrypt

### Chat Dashboard
- Modern black-themed interface
- Real-time message display
- Auto-scrolling
- Typing indicators
- Message timestamps
- Loading animations

### Sidebar Navigation
- New chat button
- Chat history
- Search conversations
- Quick access to Projects & Library
- User profile section

### Projects
- Create and manage projects
- Organize conversations by project
- Delete projects
- Project metadata (creation date, chat count)

### Library
- Save important conversations
- Filter by type (chat, file, image)
- Search functionality
- Download/export capabilities

## 🔐 Security Features

- JWT authentication
- Password hashing with bcrypt
- CORS protection
- Environment variable secrets
- Input validation

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive design)

## 🐛 Troubleshooting

### Issue: "Ollama connection failed"

**Solution:**
1. Ensure Ollama is running: `ollama serve`
2. Check if accessible: `curl http://localhost:11434/api/tags`
3. Verify port 11434 is not blocked by firewall

### Issue: "No response from AI"

**Solution:**
1. Check backend logs for errors
2. Verify Ollama has llama3 model: `ollama list`
3. If not installed: `ollama pull llama3`
4. Restart both Ollama and backend

### Issue: "Frontend can't connect to backend"

**Solution:**
1. Verify backend is running on port 5000
2. Check CORS is enabled in backend
3. Verify VITE_API_URL in frontend .env
4. Clear browser cache and restart dev server

### Issue: Slow responses

**Solution:**
1. Lower system load
2. Reduce model size (switch model in OLLAMA_MODEL)
3. Increase timeout in requests
4. Check system RAM availability

## 📚 Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express 5, SQLite3
- **AI**: Ollama with llama3 model
- **Auth**: JWT, bcrypt
- **HTTP**: Axios, CORS

## 🚀 Production Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy 'dist' folder to Vercel
```

### Backend (Render/Railway)
```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# Deploy from GitHub using Render/Railway
```

### Environment Variables (Production)
```
NODE_ENV=production
OLLAMA_URL=http://your-ollama-server:11434
GEMINI_API_KEY=your_key_here  (if using fallback)
JWT_SECRET=production_secret_key
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs
3. Check frontend console errors
4. Verify Ollama is running and has models

## 📄 License

MIT License - Free for personal and commercial use

---

**Last Updated**: May 2026
**Version**: 2.0
**Status**: Production Ready ✅
