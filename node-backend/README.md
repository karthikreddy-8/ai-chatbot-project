# Backend - Node.js + Express AI Chatbot

Professional backend server for AI Chatbot with support for multiple AI providers.

## Features

✅ **Multi-Provider AI Support**
- Local Ollama (Development)
- Google Gemini API (Production)
- OpenAI API (Production)
- Automatic environment detection

✅ **Conversation Management**
- Create, read, update, delete conversations
- Persistent message history with SQLite
- Auto-title generation

✅ **Advanced Features**
- Server-Sent Events (SSE) streaming
- Error handling and fallback messages
- CORS support
- Health check endpoints
- Comprehensive logging

✅ **Production Ready**
- Environment-based configuration
- Scalable architecture
- Multiple deployment options

## Project Structure

```
node-backend/
├── controllers/
│   ├── auth.controller.js          # Authentication logic
│   └── chat.controller.js          # Chat logic
├── routes/
│   ├── auth.routes.js              # Auth endpoints
│   └── chat.routes.js              # Chat endpoints
├── services/
│   ├── ai.service.js               # Unified AI service
│   └── providers/
│       ├── ollama.provider.js       # Local Ollama
│       ├── gemini.provider.js       # Google Gemini
│       └── openai.provider.js       # OpenAI
├── index.js                         # Entry point
├── package.json                     # Dependencies
├── .env                             # Environment (local)
├── .env.example                     # Template
└── .env.production                  # Production config
```

## Setup

### Prerequisites
- Node.js 16+
- npm/yarn
- For development: Ollama installed

### Installation

```bash
cd node-backend
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. For development (default):
```env
PORT=5000
NODE_ENV=development
OLLAMA_URL=http://localhost:11434
USE_OLLAMA=true
```

3. For production with Gemini:
```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=your_api_key
```

## Running

### Development

```bash
npm start
```

Server starts at: `http://localhost:5000`

### Production

```bash
NODE_ENV=production npm start
```

## API Endpoints

### Health & Info

```
GET /api/health           - Server health check
GET /api/info             - Server information
GET /api/chat/health      - AI provider status
```

### Chat Endpoints

```
POST /api/chat/generate   - Generate AI response
POST /api/chat/stream     - Stream AI response (SSE)
```

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello"}
  ]
}
```

**Response:**
```json
{
  "message": {
    "role": "assistant",
    "content": "Hi! How can I help?"
  },
  "provider": "ollama",
  "model": "llama3"
}
```

### Conversations

```
POST   /api/chat/conversations           - Create
GET    /api/chat/conversations           - List
GET    /api/chat/conversations/:id       - Get one
POST   /api/chat/conversations/:id/messages - Send message
PUT    /api/chat/conversations/:id       - Update
DELETE /api/chat/conversations/:id       - Delete
```

## Architecture

### Unified AI Service

The `ai.service.js` automatically selects the best AI provider:

```javascript
// Automatic detection
NODE_ENV === 'production' 
  ? Use Gemini/OpenAI API
  : Use Local Ollama
```

### Provider System

Each provider implements the same interface:

```javascript
generateResponse(messages, model)    // Non-streaming
streamResponse(messages, model)      // Streaming
healthCheck()                        // Status check
```

## Development with Ollama

### Quick Start

1. Start Ollama:
```bash
ollama serve
```

2. Pull model:
```bash
ollama pull llama3
```

3. Start backend:
```bash
npm start
```

4. Test:
```bash
curl http://localhost:5000/api/chat/health
```

### Response Format

```json
{
  "status": "ok",
  "provider": "ollama",
  "url": "http://localhost:11434",
  "model": "llama3"
}
```

## Production Deployment

### Option 1: Render.com

```bash
# Deploy from GitHub
# Add environment variables in dashboard:
NODE_ENV=production
GEMINI_API_KEY=your_key
```

### Option 2: Railway.app

```bash
# Connect GitHub
# Railway auto-detects Node.js
# Add environment variables
```

### Option 3: Self-hosted

```bash
# Build Docker image or
# Run directly on server:
NODE_ENV=production GEMINI_API_KEY=xxx npm start
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `NODE_ENV` | development | Environment |
| `OLLAMA_URL` | http://localhost:11434 | Ollama address |
| `USE_OLLAMA` | true | Force Ollama use |
| `GEMINI_API_KEY` | - | Google Gemini key |
| `OPENAI_API_KEY` | - | OpenAI key |
| `CORS_ORIGIN` | localhost:* | Allowed origins |

## Troubleshooting

### "Ollama connection failed"
- Ensure Ollama is running: `ollama serve`
- Check URL in `.env`: `http://localhost:11434`

### "Invalid API key"
- Verify key is correct and active
- Check NODE_ENV is `production`
- Ensure key has API usage enabled

### "Port already in use"
- Change PORT in .env: `PORT=5001`
- Or kill process: `lsof -i :5000 | kill -9`

### "CORS error"
- Update `CORS_ORIGIN` in .env
- Include your frontend URL exactly

## Database

Uses SQLite with tables:
- `users` - User accounts
- `conversations` - Chat conversations
- `messages` - Chat messages

Database file: `chat_history.db`

## Dependencies

```json
{
  "express": "^5.2.1",          // Web framework
  "cors": "^2.8.6",             // CORS middleware
  "dotenv": "^17.4.2",          // Environment variables
  "ollama": "^0.6.3",           // Ollama client
  "axios": "^1.6.0",            // HTTP client
  "sqlite3": "^6.0.1",          // Database
  "bcrypt": "^6.0.0",           // Password hashing
  "jsonwebtoken": "^9.0.3"      // JWT auth
}
```

## Performance

- Streaming responses for better UX
- Caching support (implement as needed)
- Async/await for non-blocking operations
- Connection pooling ready

## Security

- CORS validation
- Input validation
- Error handling (no sensitive data leak)
- Environment variable secrets
- JWT token support (configurable)

## Monitoring

Check health:
```bash
curl http://localhost:5000/api/health
```

View logs:
```bash
# Development
npm start

# Production (with PM2)
pm2 start index.js --name "chatbot"
pm2 logs chatbot
```

## Advanced Configuration

### Custom Models

Edit provider files:
- `services/providers/ollama.provider.js` - Change `llama3`
- `services/providers/gemini.provider.js` - Change `gemini-pro`
- `services/providers/openai.provider.js` - Change `gpt-3.5-turbo`

### Rate Limiting

Add rate limiter middleware:
```bash
npm install express-rate-limit
```

### Database Migrations

Currently using SQLite. To modify schema:
1. Edit `controllers/auth.controller.js` (db initialization)
2. Recreate `chat_history.db` or migrate

## Contributing

To add a new AI provider:

1. Create file: `services/providers/newprovider.provider.js`
2. Implement interface:
   - `generateResponse(messages, model)`
   - `streamResponse(messages, model)`
   - `healthCheck()`
3. Update `ai.service.js` to recognize provider
4. Test thoroughly

## License

MIT

## Support

- Documentation: See `DEPLOYMENT_GUIDE.md` and `CONFIGURATION.md`
- Issues: Check troubleshooting section
- Questions: Review code comments

---

**Version:** 2.0.0  
**Last Updated:** 2024  
**Status:** Production Ready
