# 🔧 Troubleshooting Guide - AI Chatbot with Ollama

## Table of Contents
1. [Common Issues](#common-issues)
2. [Debug Steps](#debug-steps)
3. [Ollama Issues](#ollama-issues)
4. [Frontend Issues](#frontend-issues)
5. [Backend Issues](#backend-issues)
6. [Database Issues](#database-issues)

---

## Common Issues

### Issue: "Message not sending" / "Failed to get response"

**Symptoms:**
- User types message but nothing happens
- Chat input feels stuck
- Error: "Failed to get response. Please check your connection and try again."

**Debug Steps:**

1. **Check Browser Console (F12)**
   ```
   Press F12 → Console tab
   Look for [ChatInput], [API], [useChat] logs
   ```

2. **Check Network Tab (F12)**
   ```
   Press F12 → Network tab
   Send a message
   Look for:
   - POST /api/chat/conversations (for first message)
   - POST /api/chat/conversations/{id}/messages (for subsequent)
   Status should be 200 or 201
   ```

3. **Check Backend Logs**
   ```
   Look at terminal where backend is running
   Should show:
   - DEBUG: Receiving message...
   - DEBUG: Sending messages to Ollama
   - DEBUG: AI response received
   ```

4. **If POST request fails:**
   - Status 404: Conversation doesn't exist
   - Status 400: Message content is empty
   - Status 401: User not authenticated (login again)
   - Status 500: Backend error (check backend logs)

5. **Common Fixes:**
   - Refresh page: F5
   - Clear browser cache: F12 → Application → Clear storage
   - Re-login to create new session
   - Check backend is running: `curl http://localhost:8000/api/health`

---

### Issue: Ollama not responding / Timeout

**Symptoms:**
- Message stays in "thinking..." state forever
- After 30+ seconds, "Failed to get response" error
- Error: "Ollama took too long to respond"

**Solutions:**

1. **Check Ollama is Running**
   ```bash
   # Open new terminal and test
   curl http://localhost:11434/api/generate -d '{
     "model": "llama3",
     "prompt": "Hi",
     "stream": false
   }'
   ```

2. **If Ollama not responding:**
   - Check if process is running: `ollama list`
   - Restart Ollama: 
     ```bash
     # Kill existing process
     taskkill /F /IM ollama.exe  # Windows
     # or on Mac/Linux: pkill -f ollama
     
     # Start again
     ollama serve
     ```

3. **Model not loaded:**
   ```bash
   # Download the model
   ollama pull llama3
   
   # Wait for download to complete (can take 5-10 min)
   ```

4. **System performance:**
   - Check available RAM: needs ~4GB for llama3
   - Close other heavy applications
   - If slow, try smaller model: `ollama pull orca-mini`

5. **Network issues:**
   - Check localhost is reachable: `ping localhost`
   - Firewall might be blocking port 11434
   - Check Ollama settings allow connections

---

### Issue: Backend not starting / "Connection refused"

**Symptoms:**
- Backend won't start
- Error: "Address already in use" or "Connection refused"
- Frontend shows "Network Error"

**Solutions:**

1. **Check port 8000 is available**
   ```bash
   # Windows
   netstat -ano | findstr :8000
   
   # Mac/Linux
   lsof -i :8000
   ```

2. **If port in use:**
   ```bash
   # Kill process using port 8000
   # Windows
   taskkill /PID <PID> /F
   
   # Mac/Linux
   kill -9 <PID>
   ```

3. **Start backend with different port:**
   ```bash
   # Edit backend/run.py or use environment variable
   uvicorn app.main:app --host 0.0.0.0 --port 8001
   ```

4. **Check dependencies installed:**
   ```bash
   cd backend
   pip install -r requirements.txt
   pip list | grep fastapi
   ```

5. **Database permission issue:**
   ```bash
   # Ensure backend directory is writable
   # If using sqlite, the chatbot.db file needs write permissions
   ```

---

### Issue: Frontend not loading / "Cannot find module"

**Symptoms:**
- Blank white screen
- Console errors about missing modules
- "Cannot find module 'react'" or similar

**Solutions:**

1. **Check dependencies installed:**
   ```bash
   cd frontend
   npm list react
   ```

2. **If not installed:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Check package.json exists:**
   ```bash
   ls frontend/package.json
   ```

4. **Clear npm cache:**
   ```bash
   npm cache clean --force
   rm -rf frontend/node_modules
   cd frontend
   npm install
   ```

5. **Check Vite config:**
   - Ensure `frontend/vite.config.js` exists
   - Frontend should run on `http://localhost:5173`

---

## Debug Steps

### Step 1: Enable Verbose Logging

**Backend Logs** (already enabled):
- Look at terminal where `python run.py` is running
- Look for `DEBUG:` messages

**Frontend Logs:**
```javascript
// In browser console (F12), look for:
[ChatInput] - Input handling
[ChatPage] - Page lifecycle
[API] - API requests
[useChat] - Chat state
[ChatWindow] - Message display
```

### Step 2: Test Each Component

**Test 1: Ollama**
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Test response",
  "stream": false
}'
# Should return JSON with "response" field
```

**Test 2: Backend Health**
```bash
curl http://localhost:8000/api/health
# Should return {"status": "healthy"}
```

**Test 3: Backend Conversation**
```bash
# First, get auth token (see backend logs after login)
curl -X POST http://localhost:8000/api/chat/conversations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
# Should return conversation with ID
```

**Test 4: Frontend API**
```javascript
// In browser console:
fetch('/api/health').then(r => r.json()).then(console.log)
// Should show {"status": "healthy"}
```

### Step 3: Check Logs in Order

1. **Browser Console (F12)**
   ```
   Look for any error messages in red
   Look for [API] and [useChat] logs
   ```

2. **Network Tab (F12)**
   ```
   Look for failed requests (red ones)
   Check response status codes
   Check response body for error messages
   ```

3. **Backend Terminal**
   ```
   Look for DEBUG: messages
   Look for any Python errors in red
   ```

---

## Ollama Issues

### Ollama won't start

**On Windows:**
```powershell
# Try running from PowerShell with admin
# Check if process already running
Get-Process -Name ollama

# Try explicit path
& "C:\Program Files\Ollama\ollama.exe" serve
```

**On Mac:**
```bash
# Check if brew installation working
brew services restart ollama

# Or run directly
/usr/local/bin/ollama serve
```

### Model not found / Can't pull llama3

```bash
# Check what models you have
ollama list

# Try pulling again (might take time)
ollama pull llama3

# Check disk space (needs ~5GB for llama3)
df -h  # Mac/Linux
diskutil info / # Mac

# If stuck, try smaller model
ollama pull orca-mini
```

### Ollama running but no response

```bash
# Check if model is loaded
ollama show llama3

# Try restarting ollama
killall ollama  # Mac/Linux
# Windows: taskkill /F /IM ollama.exe

# Wait 5 seconds then restart
ollama serve

# Test again
curl http://localhost:11434/api/generate -d '{"model":"llama3","prompt":"hi","stream":false}'
```

---

## Frontend Issues

### "Cannot connect to backend" / "Network Error"

1. **Check backend is running:**
   ```bash
   # Should see output like:
   # ==================================================
   #   NexusAI Backend v2.0.0
   #   Server running on http://127.0.0.1:8000
   # ==================================================
   curl http://localhost:8000/api/health
   ```

2. **Check CORS headers:**
   - Browser console should NOT show CORS error
   - If it does, backend CORS configuration might be wrong
   - Check `backend/app/main.py` has CORSMiddleware configured

3. **Check API URL:**
   ```javascript
   // In browser console:
   import.meta.env.VITE_API_URL
   // Should be /api or http://localhost:8000
   ```

### Typing indicator stuck ("AI is thinking...")

- Message sent successfully
- Waiting for Ollama response
- Normal if first query (model loading)
- If stuck >60s, Ollama might be hanging

```
Check:
1. Browser console for errors
2. Backend logs for Ollama connection issues
3. Ollama is still running
4. System has available resources
```

### Message history not loading

1. **Login status:**
   ```javascript
   // Browser console:
   localStorage.getItem('AI Chat-token')
   // Should show a token value
   ```

2. **Clear cache:**
   - F12 → Application → Clear storage
   - Refresh page F5

3. **Check conversation exists:**
   - Create new conversation first
   - Try sending a message

---

## Backend Issues

### "420 resource exhausted" / API key error

**This should NOT happen with Ollama** - means it's trying to use Gemini/OpenAI

**Fix:**
1. Check `.env` file in backend:
   ```
   USE_OLLAMA=true
   OLLAMA_URL=http://localhost:11434
   ```

2. Restart backend:
   ```bash
   cd backend
   python run.py
   ```

### Database locked / Cannot write

```bash
# Close any other connections
# Kill any running backend instances
pkill -f "python run.py"

# Remove corrupted database
rm backend/chatbot.db

# Restart backend (will recreate DB)
cd backend
python run.py
```

### Import errors / Module not found

```bash
# Make sure you're in backend directory
cd backend

# Install all requirements
pip install -r requirements.txt

# Check specific packages
pip list | grep -i fastapi
pip list | grep -i sqlalchemy
```

---

## Database Issues

### "database is locked" error

**Cause:** Multiple processes accessing database

**Fix:**
```bash
# Close all backend instances
pkill -f "python run.py"

# On Windows
taskkill /F /IM python.exe

# Wait a moment
sleep 2

# Restart backend
cd backend
python run.py
```

### Database corrupted / Can't recover

```bash
# Backup old database
mv backend/chatbot.db backend/chatbot.db.backup

# Delete corrupted database
rm backend/chatbot.db

# Restart backend - will create new DB
cd backend
python run.py
```

---

## Getting More Help

### Collect Debugging Information

When reporting issues, please gather:

1. **Browser Console (F12 → Console):**
   ```javascript
   // Right-click → Save as...
   // Save console output to file
   ```

2. **Backend Logs:**
   ```bash
   # Capture backend output
   cd backend
   python run.py > backend_logs.txt 2>&1
   # Then reproduce the issue and save the log file
   ```

3. **Network Tab (F12 → Network):**
   ```
   Right-click → Save all as with content
   ```

4. **System Info:**
   ```bash
   # Ollama
   ollama list
   ollama --version
   
   # Python
   python --version
   
   # Node
   node --version
   npm --version
   ```

5. **Environment (don't share API keys!):**
   ```bash
   cat backend/.env  # Check USE_OLLAMA=true, don't share keys
   ```

---

## Quick Restart Checklist

If nothing works, try a complete restart:

```bash
# Terminal 1: Stop everything
Ctrl+C  (stop whatever is running)

# Terminal 2: Stop Ollama (if running)
Ctrl+C

# Terminal 1: Clear caches and restart
cd backend
rm -rf __pycache__
rm chatbot.db
python run.py

# Terminal 2: Restart Ollama
ollama serve

# Terminal 3: Restart frontend
cd frontend
npm run dev

# Visit http://localhost:5173 and try again
```

---

**Still stuck?** Check the logs in detail and create an issue with the information above!
