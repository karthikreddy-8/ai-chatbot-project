const { GoogleGenerativeAI } = require("@google/generative-ai");

// ==========================================
// GEMINI CONFIGURATION
// ==========================================

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// ==========================================
// HEALTH CHECK
// ==========================================

exports.healthCheck = async (req, res) => {

  try {

    return res.status(200).json({

      success: true,

      message: "AI Chatbot Backend Running",

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

// ==========================================
// GENERATE RESPONSE
// ==========================================

exports.generateResponse = async (req, res) => {

  try {

    const { prompt, message, content } = req.body;

    // Accept prompt OR message OR content
    const userInput =
      prompt || message || content;

    // Validate Input
    if (!userInput) {

      return res.status(400).json({

        success: false,

        error: "Prompt required",

      });

    }

    // ======================================
    // GEMINI MODEL
    // ======================================

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
    });

    // ======================================
    // GENERATE AI RESPONSE
    // ======================================

    const result = await model.generateContent(
      userInput
    );

    const response = result.response.text();

    console.log("GEMINI RESPONSE:", response);

    // ======================================
    // SEND RESPONSE
    // ======================================

    return res.status(200).json({

      success: true,

      content: response,

    });

  } catch (error) {

    console.error(
      "GENERATE RESPONSE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

// ==========================================
// STREAM RESPONSE
// ==========================================

exports.streamResponse = async (req, res) => {

  return res.status(200).json({

    success: true,

    message: "Streaming not enabled",

  });

};

// ==========================================
// CREATE CONVERSATION
// ==========================================

exports.createConversation = async (req, res) => {

  try {

    const { title } = req.body;

    const conversation = {

      _id: Date.now().toString(),

      title: title || "New Chat",

      createdAt: new Date().toISOString(),

    };

    return res.status(200).json(
      conversation
    );

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

// ==========================================
// GET CONVERSATIONS
// ==========================================

exports.getConversations = async (req, res) => {

  try {

    return res.status(200).json([]);

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

// ==========================================
// GET SINGLE CONVERSATION
// ==========================================

exports.getConversation = async (req, res) => {

  try {

    return res.status(200).json({

      messages: [],

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

// ==========================================
// SEND MESSAGE
// ==========================================

exports.sendMessage = async (req, res) => {

  try {

    const { content } = req.body;

    // Validate Input
    if (!content) {

      return res.status(400).json({

        success: false,

        error: "Message content required",

      });

    }

    console.log("USER MESSAGE:", content);

    // ======================================
    // GEMINI MODEL
    // ======================================

    const model = genAI.getGenerativeModel({

      model: "gemini-pro",

    });

    // ======================================
    // GENERATE AI RESPONSE
    // ======================================

    const result = await model.generateContent(
      content
    );

    const response = result.response.text();

    console.log("GEMINI RESPONSE:", response);

    // ======================================
    // SEND RESPONSE
    // ======================================

    return res.status(200).json({

      success: true,

      content: response,

    });

  } catch (error) {

    console.error(
      "SEND MESSAGE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

// ==========================================
// RENAME CONVERSATION
// ==========================================

exports.renameConversation = async (req, res) => {

  try {

    const { title } = req.body;

    return res.status(200).json({

      success: true,

      title,

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};

// ==========================================
// DELETE CONVERSATION
// ==========================================

exports.deleteConversation = async (req, res) => {

  try {

    return res.status(200).json({

      success: true,

      message: "Conversation deleted",

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};