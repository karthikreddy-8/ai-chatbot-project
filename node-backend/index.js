const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ============================================
// Configuration
// ============================================
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`
╔════════════════════════════════════════╗
║     AI Chatbot Backend Server          ║
║     Environment: ${NODE_ENV.toUpperCase().padEnd(21)}║
║     Port: ${PORT.toString().padEnd(27)}║
╚════════════════════════════════════════╝
`);

// ============================================
// Middleware
// ============================================
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:5000'
  ],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// Routes
// ============================================
const chatRoutes = require('./routes/chat.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);

// ============================================
// Environment Configuration
// ============================================
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const IS_PRODUCTION = NODE_ENV === 'production';

// ============================================
// Health check endpoint
// ============================================
app.get('/api/health', async (req, res) => {
  try {
    res.json({
      status: 'ok',
      message: 'Backend running successfully',
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      environment: NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  }
});

// Server info endpoint
app.get('/api/info', (req, res) => {
  const aiService = require('./services/ai.service');
  res.json({
    name: 'AI Chatbot Backend',
    version: '2.0.0',
    environment: NODE_ENV,
    provider: aiService.getProvider(),
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Error Handling
// ============================================
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Something went wrong!',
    stack: NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ============================================
// Startup
// ============================================
app.listen(PORT, () => {
  console.log(`
✅ Server is running on http://localhost:${PORT}
📍 API Base URL: http://localhost:${PORT}/api

Available Endpoints:
  • GET  /api/health          - Server health check
  • GET  /api/info            - Server information
  • POST /api/chat/generate   - Generate AI response
  • POST /api/chat/stream     - Stream AI response
  • GET  /api/chat/health     - AI provider health

Conversation Management:
  • POST   /api/chat/conversations          - Create conversation
  • GET    /api/chat/conversations          - List conversations
  • GET    /api/chat/conversations/:id      - Get conversation
  • POST   /api/chat/conversations/:id/messages - Send message
  • PUT    /api/chat/conversations/:id      - Rename conversation
  • DELETE /api/chat/conversations/:id      - Delete conversation

Documentation:
  • Ollama URL: ${process.env.OLLAMA_URL || 'http://localhost:11434'}
  • ${process.env.NODE_ENV === 'production' ? 'Production Mode - Using Cloud AI' : 'Development Mode - Using Local Ollama'}
  `)
});
