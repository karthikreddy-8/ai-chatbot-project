# Quick Start Guide - 5 Minutes to Running

## 🎯 Goal
Get your AI chatbot running locally in 5 minutes with Ollama (free, no API keys).

---

## Step 1: Install Ollama (2 minutes)

1. Go to: https://ollama.ai/download
2. Download for your OS (Windows, Mac, Linux)
3. Install and run the installer
4. Ollama will start automatically
5. **Verify**: Open http://localhost:11434/api/tags in browser
   - Should show JSON with available models

---

## Step 2: Get llama3 Model (2 minutes)

Open terminal/PowerShell and run:

```bash
ollama pull llama3
```

Wait for download to complete (the model will be downloaded locally).

**Verify**: Open terminal and run:
```bash
ollama list
```

You should see `llama3` in the list.

---

## Step 3: Start Backend (1 minute)

```bash
cd node-backend
npm install
npm start
```

You should see:
```
✅ Server is running on http://localhost:5000
📍 API Base URL: http://localhost:5000/api
```

---

## Step 4: Start Frontend (1 minute)

Open NEW terminal/PowerShell:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

---

## Step 5: Open in Browser

Open: http://localhost:5173

🎉 **You should see the chatbot UI!**

---

## 🧪 Test It

1. Click "New Chat" or start typing
2. Send a message: "Hello, who are you?"
3. Wait for response (2-10 seconds on first run)
4. See the AI response

---

## ✅ If Everything Works

Congratulations! 🎉

Your AI chatbot is running with:
- ✅ Free local Ollama
- ✅ No API keys needed
- ✅ All data stays on your computer
- ✅ Completely free to use

---

## ❌ If Something Doesn't Work

### Problem: "Connection refused" at http://localhost:11434

**Fix**:
1. Check Ollama is running
2. Look for Ollama icon in system tray/taskbar
3. Restart Ollama if needed

### Problem: Backend won't start

**Fix**:
```bash
# Check Node.js is installed
node --version

# Should show: v16.x.x or higher
```

If not, install Node.js from https://nodejs.org

### Problem: Model not found

**Fix**:
```bash
# Pull the model
ollama pull llama3

# Verify it's there
ollama list
```

### Problem: Port already in use

**Fix**:
```bash
# Use different port
PORT=5001 npm start
```

---

## 📊 What's Running

```
Your Computer
├── Ollama (port 11434)      ← AI Brain
├── Backend (port 5000)      ← API Server
└── Frontend (port 5173)     ← Web Interface
```

---

## 🚀 Next Steps

### Later: Deploy Online

Once you confirm it works locally, you can:

1. Deploy backend to: Render.com or Railway.app
2. Deploy frontend to: Vercel.com
3. Get API key (Gemini or OpenAI) for production
4. Share URL with anyone online

See: `DEPLOYMENT_GUIDE.md` for details

---

## 📚 Need More Help?

- **Local setup issues**: See `CONFIGURATION.md`
- **Deployment guide**: See `DEPLOYMENT_GUIDE.md`
- **Backend details**: See `node-backend/README.md`
- **Full summary**: See `IMPLEMENTATION_SUMMARY.md`

---

## ⚡ Performance Tips

1. **First response is slow** (5-10 seconds) - normal, it's loading the model
2. **Subsequent responses are faster** (2-5 seconds)
3. **Quit and restart for fresh start** if needed
4. **Check CPU/RAM usage** - Ollama needs resources

---

## 💡 How It Works

```
You: "Hello!"
  ↓
Frontend: Sends message to backend
  ↓
Backend: Sends to local Ollama
  ↓
Ollama: Runs AI model (llama3)
  ↓
AI: Generates response
  ↓
Backend: Returns to frontend
  ↓
You: See response! ✨
```

All local, all free! 🎉

---

## 🎓 Key Concepts

**Ollama**: Local AI that runs on your computer
- Free
- No internet needed
- Everything stays private
- Slower than cloud AI

**Backend**: Node.js server that handles requests
- Connects frontend to Ollama
- Manages conversations
- Saves messages to database

**Frontend**: React web app
- User interface
- Shows chatbot
- Sends your messages

---

## 🔄 Restart Everything

If something feels broken:

1. Stop frontend: Press `Ctrl+C` in terminal
2. Stop backend: Press `Ctrl+C` in terminal
3. Restart Ollama: Close and reopen
4. Restart backend: `npm start`
5. Restart frontend: `npm run dev`
6. Refresh browser

---

## ✨ Advanced (Optional)

### Switch Models

Want to try different AI models?

```bash
# See available models
ollama pull

# Pull a different model (smaller, faster)
ollama pull neural-chat

# Then restart backend and select it
```

### Use Cloud AI

When ready for production:

1. Get Google Gemini key: https://makersuite.google.com/app/apikey
2. Add to backend: `GEMINI_API_KEY=your_key`
3. Set: `NODE_ENV=production`
4. Restart backend
5. It will use cloud AI instead

---

## 🎯 Success Criteria

You're good if:

- ✅ Backend starts without errors
- ✅ Frontend loads in browser
- ✅ You can type a message
- ✅ AI responds with text
- ✅ Conversations are saved

**Congratulations, you're done!** 🚀

---

**Pro Tip**: Bookmark this guide! You'll need it when deploying or troubleshooting.

Need help? Check the other `.md` files for detailed guides.

---

**Time to complete**: ~5-10 minutes  
**Cost**: $0  
**Difficulty**: Easy  
**Result**: Working AI chatbot! 🎉
