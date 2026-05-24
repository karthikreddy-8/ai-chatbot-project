# AI Chatbot - Setup & Deployment Guide

## Overview

Your AI chatbot now supports **automatic environment detection**:
- **Development**: Uses local Ollama (free, no API keys needed)
- **Production**: Uses Gemini or OpenAI API (scalable for public users)

The system automatically switches between these based on your environment.

---

## 📋 Quick Start - Local Development

### Requirements
- Node.js 16+
- Ollama installed and running locally
- npm or yarn package manager

### Step 1: Install Ollama

1. Download from https://ollama.ai/download
2. Run the installer
3. After installation, pull the llama3 model:
```bash
ollama pull llama3
```

4. Start Ollama (runs on port 11434 by default):
```bash
ollama serve
```

### Step 2: Setup Backend

```bash
cd node-backend
npm install
```

The `.env` file is already configured for local development:
```
PORT=5000
NODE_ENV=development
OLLAMA_URL=http://localhost:11434
USE_OLLAMA=true
```

### Step 3: Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Step 4: Start Backend

In a new terminal:
```bash
cd node-backend
npm start
# or
node index.js
```

Backend runs on: `http://localhost:5000`

### Step 5: Access the App

Open your browser: `http://localhost:5173`

---

## 🚀 Production Deployment

### Choose Your AI Provider

#### Option A: Google Gemini (Recommended for beginners)

1. **Get API Key**:
   - Go to https://makersuite.google.com/app/apikey
   - Click "Get API Key"
   - Create a new API key (free tier available)
   - Copy your API key

2. **Set Environment Variable**:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   NODE_ENV=production
   ```

#### Option B: OpenAI (More powerful models)

1. **Get API Key**:
   - Go to https://platform.openai.com/api-keys
   - Sign up or log in
   - Create an API key
   - Copy your API key

2. **Set Environment Variable**:
   ```bash
   OPENAI_API_KEY=your_api_key_here
   NODE_ENV=production
   ```

### Deployment Platforms

#### Backend Deployment (Choose one)

**Option 1: Render.com (Easy, Free tier available)**

1. Push your code to GitHub
2. Go to https://render.com
3. Connect your GitHub account
4. Create new Web Service
5. Select your repository
6. Configure:
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Add Environment Variables:
     ```
     NODE_ENV=production
     GEMINI_API_KEY=your_key_here
     # or OPENAI_API_KEY=your_key_here
     ```
7. Deploy

**Option 2: Railway.app**

1. Go to https://railway.app
2. Connect GitHub
3. Create new project
4. Select repository
5. Add environment variables
6. Deploy

**Option 3: Vercel (Paid for serverless)**

1. Deploy to Vercel
2. Add environment variables in project settings

#### Frontend Deployment (Choose one)

**Option 1: Vercel (Easiest for Vite React)**

1. Push code to GitHub
2. Go to https://vercel.com
3. Connect GitHub
4. Import your frontend directory
5. Set environment variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```
6. Deploy

**Option 2: Netlify**

1. Go to https://netlify.com
2. Connect GitHub
3. Select frontend directory
4. Deploy

### Production Environment Setup

**Example: Render.com Backend + Vercel Frontend**

1. **Backend (.env on Render)**:
```env
NODE_ENV=production
PORT=5000
GEMINI_API_KEY=sk-xxx-your-actual-key
CORS_ORIGIN=https://your-frontend.vercel.app
```

2. **Frontend (.env.production)**:
```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

### Update Frontend API Configuration

Create `frontend/.env.production`:
```env
VITE_API_BASE_URL=https://your-backend-url/api
```

Update `frontend/src/services/api.js`:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## 📊 Environment Comparison

| Feature | Development | Production |
|---------|-------------|-----------|
| AI Provider | Local Ollama | Gemini/OpenAI |
| Model | llama3 | gemini-pro / gpt-3.5-turbo |
| Cost | Free | Pay-as-you-go |
| Speed | Slower (local) | Faster (cloud) |
| Privacy | 100% local | Data sent to API |
| Internet | Not required | Required |
| Setup | Simple | Requires API key |

---

## 🔧 Configuration Reference

### Environment Variables

**Development (.env)**:
```env
# Server
PORT=5000
NODE_ENV=development

# Ollama (Local AI)
OLLAMA_URL=http://localhost:11434
USE_OLLAMA=true

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,http://localhost:5000
```

**Production (.env or Platform Settings)**:
```env
# Server
PORT=5000
NODE_ENV=production

# Cloud AI (choose one)
GEMINI_API_KEY=your_gemini_key
# or
OPENAI_API_KEY=your_openai_key

# Disable Local Ollama
USE_OLLAMA=false

# CORS (your frontend URL)
CORS_ORIGIN=https://your-frontend.vercel.app
```

### API Endpoints

All endpoints are prefixed with `/api`:

```
POST   /chat/generate              - Generate AI response
POST   /chat/stream                - Stream AI response (Server-Sent Events)
GET    /chat/health                - Check AI provider status

POST   /chat/conversations         - Create conversation
GET    /chat/conversations         - List conversations
GET    /chat/conversations/:id     - Get conversation
POST   /chat/conversations/:id/messages - Send message
PUT    /chat/conversations/:id     - Rename conversation
DELETE /chat/conversations/:id     - Delete conversation

GET    /health                     - Server health check
GET    /info                       - Server information
```

### Response Format

**Success Response**:
```json
{
  "message": {
    "role": "assistant",
    "content": "AI response text"
  },
  "provider": "ollama|gemini|openai",
  "model": "llama3|gemini-pro|gpt-3.5-turbo"
}
```

**Error Response**:
```json
{
  "error": "Error message",
  "provider": "ollama|gemini|openai",
  "details": "Additional error info"
}
```

---

## 🐛 Troubleshooting

### Development Issues

**Issue**: "Ollama connection failed"
- Solution: Make sure Ollama is running (`ollama serve`)
- Check Ollama URL: Should be `http://localhost:11434`

**Issue**: Port 11434 already in use
- Solution: Stop other Ollama instances or change the port in `.env`

**Issue**: Model not found
- Solution: Pull the model: `ollama pull llama3`

### Production Issues

**Issue**: "API key invalid"
- Solution: Check that your API key is correctly set as environment variable
- Verify key hasn't expired or been revoked

**Issue**: CORS errors
- Solution: Update `CORS_ORIGIN` environment variable with your frontend URL
- Ensure frontend URL matches exactly

**Issue**: 500 errors on chat endpoint
- Solution: Check backend logs for AI provider connection issues
- Verify API key has sufficient quota

---

## 📈 Performance Tips

1. **Cache responses** for common questions
2. **Implement rate limiting** to prevent abuse
3. **Use database** to persist conversations (already implemented)
4. **Monitor API usage** for production costs
5. **Set max token limits** for API responses

---

## 🔒 Security Considerations

1. **Never commit API keys** - Use environment variables only
2. **Enable CORS** for your frontend domain only
3. **Add rate limiting** to prevent abuse
4. **Use HTTPS** in production
5. **Validate user input** before sending to AI
6. **Add authentication** if storing user data

---

## 📞 Support

For issues:
1. Check troubleshooting section above
2. Review backend logs: `NODE_ENV=development npm start`
3. Test API directly: `http://localhost:5000/api/health`
4. Check AI provider status page

---

## 📝 Architecture

```
┌─────────────────────────────────────────────────┐
│              Frontend (React + Vite)            │
│  Vercel / Netlify / GitHub Pages                │
│              http://localhost:5173              │
└────────────────┬────────────────────────────────┘
                 │ API Calls (/api/...)
                 │
┌────────────────▼────────────────────────────────┐
│         Backend (Node.js + Express)             │
│  Render / Railway / Vercel Serverless           │
│            http://localhost:5000                │
│                                                 │
│  Unified AI Service                             │
│  ├─ Development: Ollama (Local)                 │
│  ├─ Production: Gemini (Cloud)                  │
│  └─ Production: OpenAI (Cloud)                  │
└────────────────┬────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼────┐      ┌────▼────┐
   │ Ollama  │      │ Cloud    │
   │ Local   │      │ API      │
   │ llama3  │      │ gemini/  │
   │         │      │ openai   │
   └─────────┘      └──────────┘
```

---

Last Updated: 2024
Version: 2.0.0 (Multi-Provider Support)
