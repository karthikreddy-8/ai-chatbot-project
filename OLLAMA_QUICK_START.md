# 🚀 Quick Start: AI Chatbot with Ollama Local AI

## Prerequisites
- Python 3.9+ (for backend)
- Node.js 16+ (for frontend)
- Ollama installed and running

## Step 1: Install & Start Ollama

### Windows
1. Download Ollama from https://ollama.ai
2. Install and run the application
3. Open PowerShell and run:
   ```powershell
   ollama pull llama3
   ollama serve
   ```
   This downloads the llama3 model and starts the Ollama server on `http://localhost:11434`

### macOS/Linux
```bash
ollama pull llama3
ollama serve
```

### Verify Ollama is Running
Open a new terminal and test:
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Hello",
  "stream": false
}'
```

You should get a response like:
```json
{
  "model": "llama3",
  "created_at": "2024-...",
  "response": "Hello! How can I help...",
  "done": true
}
```

---

## Step 2: Backend Setup

### 1. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Create/Update `.env` file
```
JWT_SECRET=your_secret_key_here_change_this
DATABASE_URL=sqlite:///./chatbot.db
GEMINI_API_KEY=  # (not needed with Ollama)
```

### 3. Start Backend Server
```bash
python run.py
```

You should see:
```
==================================================
  NexusAI Backend v2.0.0
  Database initialized successfully
  Server running on http://127.0.0.1:8000
==================================================
```

---

## Step 3: Frontend Setup

### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 2. Start Frontend Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Step 4: Test the Chatbot

### 1. Open Browser
Go to `http://localhost:5173`

### 2. Register/Login
- Create a new account or use existing credentials
- The backend will create the database automatically

### 3. Send a Test Message
- Type "Hi" in the chat input
- Press Enter or click Send button
- You should see:
  - ✅ User message appears in chat
  - ⏳ "AI is thinking..." indicator
  - ✅ Ollama response appears in chat

### 4. Check Logs
**Browser Console (F12):**
- Look for `[ChatInput]`, `[ChatPage]`, `[API]` logs
- Should see successful POST requests to `/api/chat/conversations/{id}/messages`

**Backend Terminal:**
- Look for `DEBUG: ...` logs showing message flow
- Should see `Ollama response received` messages

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to Ollama"
**Solution:**
- Verify Ollama is running: `curl http://localhost:11434/api/generate`
- Check Ollama server is on port 11434
- Restart Ollama if needed

### Issue: Message not sending
**Solutions:**
1. Open browser DevTools (F12) and check Console tab for errors
2. Check Network tab for API requests
3. Verify backend is running on http://localhost:8000
4. Check `/api/health` endpoint: `curl http://localhost:8000/api/health`

### Issue: "Network Error"
**Solutions:**
- Backend not running? Start it with `python run.py`
- CORS issue? The backend already has CORS configured for localhost:5173
- Check backend is listening on port 8000

### Issue: Response taking too long
**Solution:**
- Ollama models can be slow on first run
- Ensure your system has adequate RAM (llama3 needs ~4GB)
- For faster responses, use a smaller model: `ollama pull orca-mini`
- Update config to use smaller model if needed

---

## 📊 Debug Mode

### Enable Verbose Logging
Both frontend and backend already have comprehensive logging:

**Frontend Console Logs:**
- `[ChatInput]` - Input handling
- `[ChatPage]` - Page lifecycle
- `[API]` - API requests
- `[useChat]` - Chat state management

**Backend Logs:**
- `DEBUG:` messages show full request/response flow
- Check terminal where `python run.py` is running

### Monitor Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Send a message
4. Look for requests to:
   - `POST /api/chat/conversations` (create conversation)
   - `POST /api/chat/conversations/{id}/messages` (send message)

---

## 🚀 Performance Tips

1. **First Run:** First query takes longer as model loads (20-60s)
2. **Subsequent Queries:** Usually 3-10 seconds
3. **Optimize:**
   - Keep Ollama running in background
   - Use faster model if needed: `ollama pull orca-mini`
   - Ensure adequate RAM available

---

## 📝 API Endpoints

### Chat Endpoints
- `POST /api/chat/conversations` - Create new conversation
- `GET /api/chat/conversations` - List conversations
- `GET /api/chat/conversations/{id}` - Get conversation details
- `POST /api/chat/conversations/{id}/messages` - Send message
- `PUT /api/chat/conversations/{id}` - Rename conversation
- `DELETE /api/chat/conversations/{id}` - Delete conversation

### Health Check
- `GET /api/health` - Check backend is running
- `GET /` - Root health check

---

## 🎯 Next Steps

1. Customize AI system instructions in `backend/app/services/ai_service.py`
2. Configure database URL if using different database
3. Add additional AI providers as needed
4. Deploy to production (see DEPLOYMENT_GUIDE.md)

---

**Happy Chatting!** 🤖💬
