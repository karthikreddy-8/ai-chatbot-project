# Configuration Guide

## Table of Contents

1. [Development Setup](#development-setup)
2. [Production Setup](#production-setup)
3. [AI Provider Setup](#ai-provider-setup)
4. [Environment Variables](#environment-variables)
5. [Troubleshooting](#troubleshooting)

---

## Development Setup

### Local Development with Ollama

Ollama provides free, local AI inference without internet or API keys.

#### Prerequisites
- Ollama installed: https://ollama.ai/download
- Node.js 16 or higher
- Port 11434 available (Ollama default)

#### Installation Steps

1. **Install Ollama** and start the service:
   ```bash
   # On macOS/Linux:
   ollama serve

   # On Windows: Ollama should auto-start after installation
   # Check: http://localhost:11434/api/tags in browser
   ```

2. **Pull llama3 model**:
   ```bash
   ollama pull llama3
   ```

3. **Clone/Navigate to project**:
   ```bash
   cd AI\ CHABOT/node-backend
   npm install
   ```

4. **Verify .env**:
   ```env
   PORT=5000
   NODE_ENV=development
   OLLAMA_URL=http://localhost:11434
   USE_OLLAMA=true
   ```

5. **Start backend**:
   ```bash
   npm start
   ```

6. **Test API**:
   ```bash
   curl http://localhost:5000/api/health
   ```

---

## Production Setup

### Choosing a Provider

#### 1. Google Gemini (Recommended for beginners)

**Pros:**
- Free tier available
- Easy setup
- No credit card initially

**Cons:**
- Rate limited on free tier
- May require payment for heavy usage

**Setup:**

a. Get API Key:
```
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key
```

b. Set Environment Variable:
```bash
# On Render/Railway/etc.
GEMINI_API_KEY=your_actual_key_here
```

c. Test:
```bash
curl -X POST http://localhost:5000/api/chat/generate \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'
```

#### 2. OpenAI (More powerful models)

**Pros:**
- Better quality responses
- More model options
- High rate limits

**Cons:**
- Requires credit card
- Paid service (no free tier)
- Slightly more expensive

**Setup:**

a. Get API Key:
```
1. Go to https://platform.openai.com/api-keys
2. Sign up or login
3. Create new secret key
4. Copy the key (starts with sk-...)
```

b. Set Environment Variable:
```bash
# On Render/Railway/etc.
OPENAI_API_KEY=your_actual_key_here
```

c. Test:
```bash
curl -X POST http://localhost:5000/api/chat/generate \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello"}
    ]
  }'
```

---

## Environment Variables

### Development (.env)

```env
# ============ Server ============
PORT=5000
NODE_ENV=development

# ============ AI Provider ============
# Use local Ollama
OLLAMA_URL=http://localhost:11434
USE_OLLAMA=true

# ============ CORS ============
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:5000

# ============ Database ============
DATABASE_URL=./chat_history.db
```

### Production (.env or Platform Environment Variables)

#### For Gemini:
```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=your_actual_api_key
USE_OLLAMA=false
CORS_ORIGIN=https://your-frontend-domain.com
```

#### For OpenAI:
```env
PORT=5000
NODE_ENV=production
OPENAI_API_KEY=your_actual_api_key
USE_OLLAMA=false
CORS_ORIGIN=https://your-frontend-domain.com
```

### Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `OLLAMA_URL` | Local Ollama server address | `http://localhost:11434` |
| `USE_OLLAMA` | Force use of Ollama | `true` / `false` |
| `GEMINI_API_KEY` | Google Gemini API key | (get from console) |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `CORS_ORIGIN` | Allowed frontend URLs | `http://localhost:5173` |
| `DATABASE_URL` | SQLite database path | `./chat_history.db` |

---

## AI Provider Setup Details

### Gemini API Setup

**Step-by-step with screenshots equivalent:**

1. Visit: https://makersuite.google.com/app/apikey
2. Look for "Create API Key" button
3. Select a project or create new one
4. Copy the generated API key
5. Add to environment:
   ```bash
   GEMINI_API_KEY=AIzaSy...
   ```

**Note:** Free tier includes:
- 60 requests per minute
- Up to 32,000 tokens per request
- Billing only if exceeding free tier

### OpenAI API Setup

**Step-by-step:**

1. Visit: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Give it a name (e.g., "AI Chatbot")
4. Copy immediately (won't show again)
5. Add to environment:
   ```bash
   OPENAI_API_KEY=sk-...
   ```

**Pricing (approximate):**
- GPT-3.5 Turbo: $0.0005 per 1K tokens
- GPT-4: $0.03 per 1K tokens
- Monitor usage: https://platform.openai.com/account/billing/overview

---

## Deployment Configuration

### Render.com

1. Create account at https://render.com
2. Connect GitHub
3. Create new "Web Service"
4. Select your repo
5. Build Command: `npm install`
6. Start Command: `node index.js`
7. Add Environment Variables:
   ```
   NODE_ENV=production
   GEMINI_API_KEY=your_key
   CORS_ORIGIN=https://your-frontend.com
   ```
8. Deploy

### Railway.app

1. Create account at https://railway.app
2. Connect GitHub
3. Import project
4. Add `package.json` in root
5. Railway detects Node.js automatically
6. Add Environment Variables in Variables tab
7. Deploy

### Vercel (Frontend)

1. Go to https://vercel.com
2. Import project
3. Select frontend folder
4. Add Environment Variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url/api
   ```
5. Deploy

---

## Testing

### Test Local Development

```bash
# Test Ollama connection
curl http://localhost:11434/api/tags

# Test backend health
curl http://localhost:5000/api/health

# Test AI response
curl -X POST http://localhost:5000/api/chat/generate \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello, who are you?"}
    ]
  }'
```

### Test Production

```bash
# Test backend health
curl https://your-backend-url.com/api/health

# Test AI response
curl -X POST https://your-backend-url.com/api/chat/generate \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello, who are you?"}
    ]
  }'
```

---

## Troubleshooting

### Ollama Issues

**Problem:** "Connection refused" on localhost:11434

**Solution:**
1. Check Ollama is running: `ollama serve`
2. Verify port: `netstat -an | grep 11434`
3. Check .env: `OLLAMA_URL=http://localhost:11434`

---

**Problem:** "Model not found"

**Solution:**
1. Pull model: `ollama pull llama3`
2. Verify: `ollama list`

---

### API Key Issues

**Problem:** "Invalid API key" for Gemini/OpenAI

**Solution:**
1. Verify key is correct (copy-paste carefully)
2. Check key has not expired
3. Ensure NODE_ENV is set to `production`
4. Check API has sufficient quota

---

**Problem:** "Quota exceeded"

**Solution:**
1. Check usage at API console
2. Implement rate limiting
3. Consider upgrading plan or using Ollama

---

### CORS Issues

**Problem:** "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution:**
1. Update `CORS_ORIGIN` environment variable
2. Include exact frontend URL (with https://)
3. Restart backend

---

### Port Already in Use

**Problem:** "Port 5000 already in use"

**Solution:**
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm start
```

---

Last Updated: 2024
