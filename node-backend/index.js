const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// ============================================
// LOAD ENV
// ============================================

dotenv.config();

// ============================================
// TEST GEMINI KEY
// ============================================

console.log("GEMINI KEY:", process.env.GEMINI_API_KEY);

// ============================================
// EXPRESS APP
// ============================================

const app = express();

// ============================================
// Configuration
// ============================================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

console.log(`
╔════════════════════════════════════════╗
║     AI Chatbot Backend Server          ║
║     Environment: ${NODE_ENV.toUpperCase().padEnd(21)}║
║     Port: ${PORT.toString().padEnd(27)}║
╚════════════════════════════════════════╝
`);

// ============================================
// CHECK GEMINI API KEY
// ============================================

if (!process.env.GEMINI_API_KEY) {

  console.error("❌ GEMINI_API_KEY Missing in .env");

  process.exit(1);

}

console.log("✅ Gemini API Key Loaded");

// ============================================
// Middleware
// ============================================

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isLocal = origin.includes("localhost") ||
      origin.includes("127.0.0.1") ||
      /^http:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(origin);
    if (isLocal || process.env.NODE_ENV === "development") {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
}));

app.use(express.json({
  limit: "50mb",
}));

app.use(express.urlencoded({
  limit: "50mb",
  extended: true,
}));

// ============================================
// Request Logger
// ============================================

app.use((req, res, next) => {

  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path}`
  );

  next();

});

// ============================================
// Routes
// ============================================

const chatRoutes = require("./routes/chat.routes");
// const authRoutes = require("./routes/auth.routes");

app.use("/api/chat", chatRoutes);
//app.use("/api/auth", authRoutes);

// ============================================
// Health Check
// ============================================

app.get("/api/health", async (req, res) => {

  try {

    return res.status(200).json({

      success: true,

      message: "Backend running successfully",

      environment: NODE_ENV,

      aiProvider: "Google Gemini",

      timestamp: new Date().toISOString(),

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

});

// ============================================
// API Info
// ============================================

app.get("/api/info", (req, res) => {

  return res.status(200).json({

    name: "AI Chatbot Backend",

    version: "2.0.0",

    environment: NODE_ENV,

    provider: "Google Gemini",

    port: PORT,

    timestamp: new Date().toISOString(),

  });

});

// ============================================
// Error Handling
// ============================================

app.use((err, req, res, next) => {

  console.error("SERVER ERROR:", err);

  return res.status(
    err.status || 500
  ).json({

    success: false,

    error:
      err.message ||
      "Something went wrong!",

  });

});

// ============================================
// 404
// ============================================

app.use((req, res) => {

  return res.status(404).json({

    success: false,

    error: "Endpoint not found",

  });

});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {

  console.log(`
✅ Server running on:
http://localhost:${PORT}

📍 API Base URL:
http://localhost:${PORT}/api

🚀 Using Google Gemini API
🤖 Model: model: "gemini-1.5-flash-latest"
`);

});