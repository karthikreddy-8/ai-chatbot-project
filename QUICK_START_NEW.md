# 🚀 Quick Start - 5 Minutes to AI Chatbot

## ⚡ Super Fast Setup (Copy & Paste)

### Step 1: Start Ollama (Terminal 1)
```bash
# Download Ollama from https://ollama.ai
# Then run:
ollama serve
```

### Step 2: Start Backend (Terminal 2)
```bash
cd node-backend
npm install
npm start
```
✅ Backend runs on http://localhost:5000

### Step 3: Start Frontend (Terminal 3)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend runs on http://localhost:5173

### Step 4: Open Browser
```
http://localhost:5173
```

**Test Login:**
- Email: `test@example.com`
- Password: `password123`

---

## 📋 Pre-Flight Checklist

- [ ] Ollama installed? (https://ollama.ai)
- [ ] Ollama pulling llama3? (`ollama pull llama3`)
- [ ] Node.js installed? (v14+)
- [ ] npm installed?
- [ ] Port 5000 free?
- [ ] Port 5173 free?
- [ ] Port 11434 free? (Ollama)

---

## 🔧 If Something Fails

### "Ollama not found"
```bash
# Install from https://ollama.ai
# Or on Mac:
brew install ollama

# Start Ollama:
ollama serve
```

### "Port 5000 in use"
```bash
# Kill the process on port 5000
lsof -i :5000
kill -9 <PID>

# Or change backend port in .env
PORT=5001
```

### "Module not found"
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### "Ollama connection failed"
```bash
# Make sure Ollama is running
curl http://localhost:11434/api/tags

# Should return list of models including llama3
```

---

## 📁 Directory Guide

```
AI CHATBOT/
├── node-backend/      ← Backend (http://localhost:5000)
├── frontend/          ← Frontend (http://localhost:5173)
└── README_NEW.md      ← Full documentation
```

---

## 🎯 First Test

1. Open http://localhost:5173
2. Login with test credentials
3. Type: "Hello! What can you do?"
4. Wait for response from Ollama
5. Enjoy! 🎉

---

## 💡 Key Points

✅ **No API keys needed** - Uses local Ollama  
✅ **100% private** - Everything runs on your computer  
✅ **Fast** - Local inference, no network latency  
✅ **Free** - No subscription costs  

---

## 🎨 UI Tour

- **Sidebar** - Chat history and menu (Projects, Library)
- **Main Chat** - Message interface
- **Top Bar** - AI Chat selector
- **Input Box** - Type messages (Shift+Enter for new line)

---

## 🌙 Dark/Light Mode

Toggle in top-right corner (sun/moon icon)

---

## 🛑 Stop Everything

```bash
# Terminal 1 (Ollama)
Ctrl+C

# Terminal 2 (Backend)
Ctrl+C

# Terminal 3 (Frontend)
Ctrl+C
```

---

## 📚 Next Steps

1. Read [OLLAMA_SETUP.md](OLLAMA_SETUP.md) for detailed config
2. Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy online
3. Read [README_NEW.md](README_NEW.md) for full documentation

---

## 🎓 Learn More

- Ollama: https://ollama.ai
- React: https://react.dev
- Express: https://expressjs.com

---

## ✨ Features to Try

- ✅ Create new chats
- ✅ Rename conversations
- ✅ Search chat history
- ✅ Copy responses
- ✅ Create projects
- ✅ Save to library
- ✅ Dark/light theme

---

## 🆘 Quick Support

| Issue | Solution |
|-------|----------|
| Slow response | Check system resources, ensure Ollama has CPU access |
| No connection | Verify Ollama running on 11434, backend on 5000 |
| Can't login | Clear cookies, try incognito mode |
| Crashes on start | Check Node version (need 14+), clear node_modules |

---

## 📞 Getting Help

1. Check error messages in terminal
2. Look at browser console (F12)
3. Verify all three services are running
4. Restart everything in order: Ollama → Backend → Frontend

---

**You're ready! Happy chatting! 🚀**

Last Updated: May 2026
