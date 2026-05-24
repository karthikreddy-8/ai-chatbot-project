# Environment Variables Reference

Complete reference for all environment variables used in the AI Chatbot.

## Quick Reference Table

| Variable | Required | Default | Example | Purpose |
|----------|----------|---------|---------|---------|
| `PORT` | No | 5000 | 5000 | Backend server port |
| `NODE_ENV` | No | development | development/production | Execution environment |
| `OLLAMA_URL` | No | http://localhost:11434 | http://localhost:11434 | Ollama server address |
| `USE_OLLAMA` | No | true | true/false | Force use of Ollama |
| `GEMINI_API_KEY` | No (prod) | - | AIzaSy... | Google Gemini API key |
| `OPENAI_API_KEY` | No (prod) | - | sk-... | OpenAI API key |
| `CORS_ORIGIN` | No | localhost:* | http://localhost:5173 | Allowed frontend origins |
| `DATABASE_URL` | No | ./chat_history.db | ./chat_history.db | SQLite database path |

---

## Detailed Variable Descriptions

### Server Configuration

#### `PORT`
- **Type**: Number
- **Default**: 5000
- **Example**: 5000, 8000, 3000
- **Description**: The port on which the backend server listens
- **Usage**: `PORT=5000 npm start`

#### `NODE_ENV`
- **Type**: String
- **Default**: development
- **Options**: `development`, `production`
- **Description**: Sets the execution environment
  - `development`: Uses local Ollama
  - `production`: Uses Gemini/OpenAI API
- **Usage**: `NODE_ENV=production npm start`

---

### AI Provider Configuration

#### `OLLAMA_URL`
- **Type**: URL String
- **Default**: http://localhost:11434
- **Example**: http://localhost:11434, http://192.168.1.5:11434
- **Description**: Address where Ollama service is running
- **When Used**: Development environment (local AI)
- **Note**: Only used if `USE_OLLAMA=true` or `NODE_ENV=development`

#### `USE_OLLAMA`
- **Type**: Boolean (string)
- **Default**: true
- **Options**: `true`, `false`
- **Description**: Force use of local Ollama regardless of environment
- **Usage**: 
  ```bash
  USE_OLLAMA=true npm start    # Always use Ollama
  USE_OLLAMA=false npm start   # Use cloud API if available
  ```

#### `GEMINI_API_KEY`
- **Type**: String (API Key)
- **Default**: None (empty)
- **Example**: AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
- **Description**: Google Gemini API key for production AI
- **Required**: Yes, for production if OpenAI not used
- **Where to Get**: https://makersuite.google.com/app/apikey
- **Setup**:
  ```bash
  GEMINI_API_KEY=your_key_here npm start
  ```

#### `OPENAI_API_KEY`
- **Type**: String (API Key)
- **Default**: None (empty)
- **Example**: sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxx
- **Description**: OpenAI API key for production AI (ChatGPT, GPT-4)
- **Required**: Yes, for production if Gemini not used
- **Where to Get**: https://platform.openai.com/api-keys
- **Setup**:
  ```bash
  OPENAI_API_KEY=your_key_here npm start
  ```

---

### Network Configuration

#### `CORS_ORIGIN`
- **Type**: String (comma-separated URLs)
- **Default**: http://localhost:5173,http://localhost:3000,http://localhost:5000
- **Example**: 
  - Development: `http://localhost:5173`
  - Production: `https://my-app.vercel.app`
  - Multiple: `https://app.com,https://admin.app.com`
- **Description**: Allowed frontend URLs that can access the API
- **Security**: Prevents unauthorized API access from other domains
- **Setup**:
  ```bash
  # Production
  CORS_ORIGIN=https://my-frontend.vercel.app npm start
  
  # Multiple domains
  CORS_ORIGIN=https://app.com,https://mobile.app.com npm start
  ```

---

### Database Configuration

#### `DATABASE_URL`
- **Type**: String (File path)
- **Default**: ./chat_history.db
- **Example**: ./chat_history.db, /data/chatbot.db
- **Description**: Path to SQLite database file
- **Note**: Automatically created if doesn't exist
- **Setup**:
  ```bash
  DATABASE_URL=/var/data/chatbot.db npm start
  ```

---

## Configuration Scenarios

### Scenario 1: Local Development

```env
PORT=5000
NODE_ENV=development
OLLAMA_URL=http://localhost:11434
USE_OLLAMA=true
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
DATABASE_URL=./chat_history.db
```

**Startup**:
```bash
npm start
```

**Result**: Uses local Ollama, free, no API keys needed

---

### Scenario 2: Production with Gemini

```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CORS_ORIGIN=https://my-app.vercel.app
DATABASE_URL=./chat_history.db
```

**Startup**:
```bash
npm start
```

**Result**: Uses cloud Gemini API, accessible online

---

### Scenario 3: Production with OpenAI

```env
PORT=5000
NODE_ENV=production
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxx
CORS_ORIGIN=https://my-app.vercel.app
DATABASE_URL=./chat_history.db
```

**Startup**:
```bash
npm start
```

**Result**: Uses OpenAI GPT models, higher quality responses

---

### Scenario 4: Testing Production Logic Locally

```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=./chat_history.db
```

**Startup**:
```bash
npm start
```

**Result**: Tests production config without deploying

---

## Setting Environment Variables

### Method 1: .env File (Recommended for Development)

Create `.env` file in `node-backend/`:
```env
PORT=5000
NODE_ENV=development
OLLAMA_URL=http://localhost:11434
CORS_ORIGIN=http://localhost:5173
```

Then start normally:
```bash
npm start
```

### Method 2: Command Line (Best for Production Platforms)

#### On Render.com
1. Go to project dashboard
2. Go to "Environment" tab
3. Add variables in UI
4. Redeploy

#### On Railway.app
1. Go to project
2. Go to "Variables" tab
3. Add variables
4. Auto-redeploys

#### On Vercel
1. Go to project settings
2. Go to "Environment Variables"
3. Add variables
4. Redeploy

### Method 3: Inline (Quick Testing)

```bash
# Unix/Mac/Linux
GEMINI_API_KEY=xyz PORT=5001 npm start

# Windows PowerShell
$env:GEMINI_API_KEY='xyz'; npm start

# Windows CMD
set GEMINI_API_KEY=xyz && npm start
```

### Method 4: .env.production File

Create `.env.production` in `node-backend/`:
```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=your_key
CORS_ORIGIN=https://your-domain.com
```

Auto-loaded by dotenv in production

---

## Validation & Verification

### Check Current Environment

```bash
# These won't work directly, but you can verify in code
node -e "console.log(process.env)"

# Or in your app, add to index.js:
console.log('Environment:', process.env.NODE_ENV);
console.log('Provider:', process.env.GEMINI_API_KEY ? 'Gemini' : 'Ollama');
```

### Test Variables Are Set

```bash
# Linux/Mac
echo $PORT
echo $NODE_ENV
echo $GEMINI_API_KEY

# Windows PowerShell
$env:PORT
$env:NODE_ENV
$env:GEMINI_API_KEY
```

### API Health Check

```bash
# Check if server is running with correct config
curl http://localhost:5000/api/health

# Response should show:
{
  "status": "ok",
  "provider": "ollama|gemini|openai"
}
```

---

## Common Issues

### Issue: AI provider not detected correctly

**Check**:
1. `NODE_ENV` is set to `production`
2. API key is set (no typos)
3. API key is valid and active
4. Environment variables are reloaded (restart server)

**Debug**:
```bash
# See what's loaded
grep -E '^(NODE_ENV|GEMINI_API_KEY|OPENAI_API_KEY)=' .env
```

---

### Issue: CORS errors in browser

**Check**:
1. Frontend URL matches `CORS_ORIGIN` exactly
2. No trailing slashes
3. Protocol (http vs https) matches
4. Server is restarted

**Example**:
```
Frontend URL: https://my-app.vercel.app
CORS_ORIGIN: https://my-app.vercel.app  ✅ Correct

CORS_ORIGIN: https://my-app.vercel.app/  ❌ Has trailing slash
CORS_ORIGIN: http://my-app.vercel.app   ❌ Wrong protocol
```

---

### Issue: Port already in use

**Fix**:
```bash
# Use different port
PORT=5001 npm start

# Or kill the process on current port
# (See troubleshooting guide)
```

---

## Security Best Practices

### ✅ DO

- Use `.env` files for secrets (development only)
- Use platform environment variables for production
- Rotate API keys regularly
- Use least-privilege API keys
- Store secrets in secure vaults
- Use HTTPS in production

### ❌ DON'T

- Commit `.env` files to Git
- Share API keys in messages/emails
- Use same key for dev and prod
- Leave API keys in code comments
- Use default/weak API keys
- Expose API keys in browser

---

## Frontend Configuration

Frontend also needs environment variables. Create `frontend/.env.production`:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

Then update `frontend/src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## Quick Setup Templates

### Copy-Paste Ready

**Development**:
```bash
PORT=5000
NODE_ENV=development
OLLAMA_URL=http://localhost:11434
USE_OLLAMA=true
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
DATABASE_URL=./chat_history.db
```

**Production (Gemini)**:
```bash
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=YOUR_ACTUAL_KEY_HERE
CORS_ORIGIN=https://your-frontend-url.com
DATABASE_URL=./chat_history.db
```

**Production (OpenAI)**:
```bash
PORT=5000
NODE_ENV=production
OPENAI_API_KEY=YOUR_ACTUAL_KEY_HERE
CORS_ORIGIN=https://your-frontend-url.com
DATABASE_URL=./chat_history.db
```

---

## Support

For issues:
1. Check this reference
2. Verify variables are set correctly
3. Check API status pages
4. Review server logs: `npm start`
5. Test API: `curl http://localhost:5000/api/health`

---

**Last Updated**: 2024  
**Version**: 2.0.0
