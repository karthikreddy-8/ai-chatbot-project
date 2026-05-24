# ✅ Installation & Verification Checklist

## 🔍 Pre-Installation Check

- [ ] Ollama downloaded from https://ollama.ai
- [ ] Node.js 14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Ports available: 5000, 5173, 11434
- [ ] No conflicting services running

---

## 🚀 Installation Steps

### Step 1: Start Ollama

- [ ] Start Ollama application
- [ ] Run `ollama serve` in terminal
- [ ] Verify "Listening on" message appears

**Expected Output:**
```
Listening on 127.0.0.1:11434
```

### Step 2: Pull llama3 Model

- [ ] Run `ollama pull llama3`
- [ ] Wait for download to complete (~5GB)

**Expected Output:**
```
...pulling layers...
...success
```

### Step 3: Backend Setup

- [ ] Navigate to `node-backend` folder
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Backend should start on port 5000

**Expected Output:**
```
╔════════════════════════════════════════╗
║     AI Chatbot Backend Server          ║
║     Environment: development           ║
║     Port: 5000                         ║
╚════════════════════════════════════════╝
```

### Step 4: Frontend Setup

- [ ] Navigate to `frontend` folder
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Frontend should start on port 5173

**Expected Output:**
```
VITE v8.0.10  ready in 123 ms

➜  Local:   http://localhost:5173
```

---

## 🔗 Connectivity Verification

### Check Ollama

- [ ] Run in terminal: `curl http://localhost:11434/api/tags`
- [ ] Should return list of models including llama3

**Expected Output:**
```json
{
  "models": [
    {"name": "llama3:latest", ...}
  ]
}
```

### Check Backend

- [ ] Run in terminal: `curl http://localhost:5000/api/chat/health`
- [ ] Should return health status

**Expected Output:**
```json
{
  "status": "ok",
  "provider": "ollama",
  "url": "http://localhost:11434",
  "model": "llama3"
}
```

### Check Frontend

- [ ] Open browser: http://localhost:5173
- [ ] Page should load without errors
- [ ] Logo and login form should be visible

---

## 🔐 Login Verification

### Test Credentials

- [ ] Email: `test@example.com`
- [ ] Password: `password123`

### Login Process

- [ ] Click login on landing page
- [ ] Enter test credentials
- [ ] Click login button
- [ ] Should redirect to chat page

---

## 💬 Chat Functionality Test

### Send First Message

- [ ] Type: "Hello, can you help me?"
- [ ] Click send button
- [ ] Should see loading animation
- [ ] AI response should appear in 2-5 seconds

**Expected:**
- Loading spinner visible while generating
- Response appears as AI message
- Timestamp shows current time
- Message scrolls into view

### Test Features

- [ ] **Copy button**: Click copy on AI response
- [ ] **Rename chat**: Right-click chat in sidebar
- [ ] **Delete chat**: Hover over chat, click delete
- [ ] **New chat**: Click "New Chat" button
- [ ] **Search**: Type in search box, history filters

### Projects Page

- [ ] Click "Projects" in sidebar
- [ ] Should show Projects page
- [ ] Click "New Project" button
- [ ] Create a test project named "Test Project"
- [ ] Should appear in project list
- [ ] Delete icon appears on hover
- [ ] Can delete project

### Library Page

- [ ] Click "Library" in sidebar
- [ ] Should show Library page
- [ ] Should show empty state initially
- [ ] Search/filter controls work

---

## 📱 Responsive Design Check

### Desktop (1920×1080)
- [ ] All content visible
- [ ] Sidebar visible
- [ ] Chat takes full width
- [ ] No horizontal scrolling

### Tablet (768×1024)
- [ ] Layout adapts
- [ ] Sidebar toggles
- [ ] Chat area responsive
- [ ] Touch-friendly buttons

### Mobile (375×667)
- [ ] Layout single column
- [ ] Sidebar hidden, toggle works
- [ ] Messages readable
- [ ] Input box accessible

---

## 🌓 Theme Testing

### Dark Mode
- [ ] Default is dark theme
- [ ] All text readable
- [ ] Accents visible (purple/cyan)
- [ ] No harsh contrast

### Light Mode
- [ ] Toggle available (usually top-right)
- [ ] Light background appears
- [ ] Text remains readable
- [ ] Accents still visible

---

## ⚙️ Performance Check

### Response Speed
- [ ] First response: < 10 seconds
- [ ] Subsequent responses: 2-5 seconds
- [ ] No timeouts or errors
- [ ] Message displays smoothly

### Loading Animation
- [ ] Spinner visible while loading
- [ ] Typing indicator works
- [ ] Smooth animations, no lag
- [ ] CPU usage reasonable (<50%)

---

## 🐛 Error Handling

### Test Error Scenarios

- [ ] Clear browser cookies, try to access /chat
  - [ ] Should redirect to login

- [ ] Disconnect Ollama, try to send message
  - [ ] Should show error message
  - [ ] Error message readable
  - [ ] Can retry

- [ ] Invalid credentials
  - [ ] Should show "Login failed" or similar
  - [ ] Can retry login

- [ ] Very long message (>5000 characters)
  - [ ] Should handle gracefully
  - [ ] Sent successfully

---

## 🔐 Security Check

- [ ] No passwords visible in browser console
- [ ] No API keys exposed
- [ ] JWT token in localStorage
- [ ] HTTPS ready for deployment
- [ ] Input validated (no obvious injection)

---

## 📊 Console Check

### Browser Console (F12)
- [ ] No critical errors (red)
- [ ] Warnings acceptable (yellow)
- [ ] API calls show in Network tab
- [ ] Messages show successful responses

### Backend Terminal
- [ ] Requests logged
- [ ] No error traces
- [ ] Response times shown
- [ ] No memory leaks

---

## 🧪 Full User Journey

1. [ ] Start at landing page
2. [ ] Click "Get Started"
3. [ ] Redirects to login
4. [ ] Enter test credentials
5. [ ] Click login
6. [ ] Lands on chat page
7. [ ] Send test message
8. [ ] Receive AI response
9. [ ] Click "Projects"
10. [ ] Create new project
11. [ ] Back to chat
12. [ ] Click "Library"
13. [ ] Verify page works
14. [ ] Toggle dark/light theme
15. [ ] Test on mobile view

---

## 📋 Final Verification

### Backend Ready?
- [ ] Running on http://localhost:5000
- [ ] Health check passes
- [ ] Connected to Ollama
- [ ] Database initialized

### Frontend Ready?
- [ ] Running on http://localhost:5173
- [ ] No console errors
- [ ] All pages accessible
- [ ] Animations smooth

### Ollama Ready?
- [ ] Running on http://localhost:11434
- [ ] llama3 model available
- [ ] Connection stable
- [ ] Responding to requests

### All Systems Go? 🚀
- [ ] YES - Ready for use!

---

## 🔧 Troubleshooting

### If Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

### If Frontend Won't Load
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

### If Ollama Connection Fails
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama if needed
# Close and reopen Ollama application
```

### If Chat Response Takes Too Long
- Check system resources (CPU, RAM)
- Verify no other heavy processes
- Check network connection
- Try shorter message first

---

## 📞 Getting Help

### Check Logs
1. Backend terminal → Look for errors
2. Frontend terminal → Look for warnings
3. Browser console (F12) → Check for messages
4. Network tab → Check API requests

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process using the port, use different port |
| Ollama not found | Download and install Ollama |
| llama3 not available | Run `ollama pull llama3` |
| Slow responses | Check system resources, close other apps |
| Login fails | Clear cookies, check credentials |
| Chat page blank | Check browser console for errors |
| Sidebar not working | Refresh page, clear cache |

---

## ✨ Next Steps

After verification:

1. [ ] Read [QUICK_START_NEW.md](QUICK_START_NEW.md)
2. [ ] Read [OLLAMA_SETUP.md](OLLAMA_SETUP.md)
3. [ ] Read [DEPLOYMENT.md](DEPLOYMENT.md)
4. [ ] Customize UI/colors if desired
5. [ ] Add custom system prompt
6. [ ] Plan deployment strategy

---

## 🎉 Congratulations!

If you checked all boxes, your AI Chatbot is fully functional! 

**Happy chatting! 🚀**

---

**Last Updated**: May 2026  
**Version**: 2.0  
**Checklist Version**: 1.0
