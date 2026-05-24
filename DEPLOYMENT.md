# Deployment Guide - AI Chatbot with Ollama

## Overview

This guide covers deploying the AI Chatbot with:
- **Development**: Ollama local AI (free, no API keys)
- **Production**: Gemini/OpenAI API (with fallback to Ollama)

## Architecture Decisions

### Development Environment
- Uses Ollama running on localhost:11434
- Completely free - no API keys needed
- Fast local inference
- Perfect for development and testing

### Production Environment
Options:
1. **Ollama on Server** - Deploy Ollama on your server
2. **Cloud API with Fallback** - Use Gemini/OpenAI with Ollama as fallback
3. **Hybrid** - Use cloud API in production, Ollama in development

## Option 1: Frontend-Only Deployment (Vercel)

### Prerequisites
- Vercel account (free)
- GitHub repository

### Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Deploy on Vercel**
- Go to https://vercel.com
- Click "New Project"
- Select your GitHub repository
- Framework: React
- Output Directory: dist
- Environment Variables:
  ```
  VITE_API_URL=https://your-backend-url.com/api
  ```
- Click Deploy

### Result
Frontend deployed at: `https://your-project.vercel.app`

---

## Option 2: Backend Deployment (Render)

### Prerequisites
- Render account (free tier available)
- GitHub repository with backend code

### Steps

1. **Create Render Service**
- Go to https://render.com
- Click "New +"
- Select "Web Service"
- Connect GitHub repository

2. **Configure Service**
- **Name**: ai-chatbot-backend
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `node index.js`
- **Instance Type**: Free tier (optional)

3. **Add Environment Variables**
In Render dashboard:
```
NODE_ENV=production
PORT=5000
OLLAMA_URL=http://your-ollama-server:11434
OLLAMA_MODEL=llama3
JWT_SECRET=your_production_secret_key_here
```

4. **Optional: Add Gemini API Key**
```
GEMINI_API_KEY=your_key_here
```

5. **Deploy**
- Click Deploy
- Wait for build to complete

### Result
Backend deployed at: `https://your-project.onrender.com`

---

## Option 3: Docker Deployment

### Create Docker Files

**Backend Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
```

**Docker Compose**
```yaml
version: '3.8'

services:
  backend:
    build: ./node-backend
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      OLLAMA_URL: http://ollama:11434
      PORT: 5000
    depends_on:
      - ollama

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    command: serve

volumes:
  ollama_data:
```

**Deploy with Docker**
```bash
docker-compose up -d
```

---

## Option 4: Full Stack on VPS (AWS EC2, DigitalOcean, Linode)

### Prerequisites
- VPS with Ubuntu/Debian
- SSH access
- Domain name (optional)

### Installation Steps

1. **SSH into VPS**
```bash
ssh root@your_vps_ip
```

2. **Update System**
```bash
apt update && apt upgrade -y
```

3. **Install Dependencies**
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Ollama (optional, if hosting on same server)
curl https://ollama.ai/install.sh | sh

# Nginx (reverse proxy)
apt install -y nginx
```

4. **Clone Repository**
```bash
cd /home
git clone https://github.com/your/repo.git ai-chatbot
cd ai-chatbot/node-backend
```

5. **Setup Backend**
```bash
npm install
cp .env.example .env
# Edit .env with your settings
nano .env
```

6. **Start Ollama** (if on same server)
```bash
ollama serve &
ollama pull llama3
```

7. **Start Backend with PM2**
```bash
npm install -g pm2
pm2 start index.js --name "ai-backend"
pm2 save
pm2 startup
```

8. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
upstream backend {
    server 127.0.0.1:5000;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name your_domain.com;

    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

9. **Deploy Frontend**
```bash
cd ../frontend
npm run build
cp -r dist/* /var/www/html/
```

10. **Setup SSL (Let's Encrypt)**
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com
```

11. **Restart Nginx**
```bash
sudo systemctl restart nginx
```

---

## Environment Switching Logic

### Automatic Detection

The backend automatically detects the environment:

```javascript
// In ai.service.js
detectProvider() {
  // Development: Use Ollama
  if (process.env.NODE_ENV !== 'production' || process.env.USE_OLLAMA === 'true') {
    return 'ollama';
  }

  // Production: Check for API keys
  if (process.env.GEMINI_API_KEY) {
    return 'gemini';
  }

  if (process.env.OPENAI_API_KEY) {
    return 'openai';
  }

  // Fallback to Ollama
  return 'ollama';
}
```

### Configuration Examples

**Local Development (.env)**
```env
NODE_ENV=development
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=llama3
```

**Production with Ollama Server**
```env
NODE_ENV=production
OLLAMA_URL=http://ollama-server.example.com:11434
OLLAMA_MODEL=llama3
```

**Production with Gemini API**
```env
NODE_ENV=production
GEMINI_API_KEY=sk-xxx...
```

**Force Ollama in Production**
```env
NODE_ENV=production
OLLAMA_URL=http://ollama-server:11434
USE_OLLAMA=true
```

---

## Monitoring & Maintenance

### Health Check Endpoint
```bash
curl https://your-backend.com/api/chat/health
```

Response:
```json
{
  "status": "ok",
  "provider": "ollama",
  "url": "http://localhost:11434",
  "model": "llama3"
}
```

### Logs

**PM2 Logs**
```bash
pm2 logs
```

**Render Logs**
- Go to Render dashboard → Select service → Logs tab

**Docker Logs**
```bash
docker-compose logs -f backend
```

### Performance Optimization

1. **Enable Caching**
   - Add Redis for response caching
   - Cache common queries

2. **Load Balancing**
   - Use multiple backend instances
   - Use Nginx for load balancing

3. **CDN**
   - Use Cloudflare for frontend caching
   - Serve static assets from CDN

4. **Database**
   - Switch from SQLite to PostgreSQL for production
   - Add database backups

---

## Cost Analysis

### Free Tier Options
- **Vercel**: Free for frontend
- **Render**: Free tier with limitations
- **Ollama**: Free (self-hosted)
- **Total**: Free

### Budget Options
- **VPS**: $5-10/month (DigitalOcean, Linode)
- **Render**: $7+/month for paid tiers
- **CloudFlare**: Free/Paid options
- **Domain**: $10-15/year

### Cost Optimization
1. Use free tiers when possible
2. Host Ollama on same server as backend
3. Use SQLite instead of PostgreSQL
4. Use Vercel for frontend (free)

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS/SSL certificates
- [ ] Enable CORS only for your domain
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Database backups
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all endpoints

---

## Troubleshooting

### Backend Not Starting
```bash
pm2 logs
# Check for errors in logs
```

### Ollama Connection Failed
```bash
# Test Ollama connection
curl http://ollama-server:11434/api/tags
```

### Slow Responses
- Check server resources
- Monitor Ollama performance
- Consider upgrading instance

### Frontend Can't Connect to Backend
- Check VITE_API_URL environment variable
- Verify backend is running
- Check CORS configuration
- Check firewall rules

---

## Rollback Strategy

### Using Git
```bash
# View deployment history
git log --oneline

# Rollback to previous version
git revert HEAD
git push origin main
```

### Using PM2
```bash
# Save current state
pm2 save

# Rollback version
git checkout previous_version
npm install
pm2 restart all
```

---

## Next Steps

1. Choose deployment option
2. Set up environment variables
3. Deploy frontend and backend
4. Test all features
5. Set up monitoring
6. Document your deployment

---

**Last Updated**: May 2026
**Version**: 2.0
**Status**: Production Ready ✅
