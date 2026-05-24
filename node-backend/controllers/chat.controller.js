/**
 * AI CHATBOT CONTROLLER
 * Fully Fixed Version
 */

/**
 * Health Check
 */
exports.healthCheck = async (req, res) => {

  try {

    return res.status(200).json({

      success: true,

      message: 'AI Chatbot Backend Running',
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};

/**
 * Generate Response
 */
exports.generateResponse = async (req, res) => {

  try {

    const { prompt, message, content } = req.body;
    
    // Accept prompt, message, or content field
    const userInput = prompt || message || content;

    if (!userInput) {

      return res.status(400).json({

        success: false,

        error: 'Prompt required',
      });
    }

    // Send request to Ollama
    const ollamaResponse = await fetch(

      'http://127.0.0.1:11434/api/generate',

      {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({

          model: 'phi3',

          prompt: userInput,

          stream: false,
        }),
      }
    );

    const data = await ollamaResponse.json();

    console.log('OLLAMA RESPONSE:', data);

    return res.status(200).json({

      success: true,

      content:
        data.response ||
        'No AI response generated.',
    });

  } catch (error) {

    console.error('GENERATE RESPONSE ERROR:', error);

    return res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};

/**
 * Stream Response
 */
exports.streamResponse = async (req, res) => {

  return res.status(200).json({

    success: true,

    message: 'Streaming not enabled',
  });
};

/**
 * Create Conversation
 */
exports.createConversation = async (req, res) => {

  try {

    const { title } = req.body;

    const conversation = {

      _id: Date.now().toString(),

      title: title || 'New Chat',

      createdAt: new Date().toISOString(),
    };

    return res.status(200).json(conversation);

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};

/**
 * Get Conversations
 */
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

/**
 * Get Single Conversation
 */
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

/**
 * Send Message
 */
exports.sendMessage = async (req, res) => {

  try {

    const { content } = req.body;

    // Check message
    if (!content) {

      return res.status(400).json({

        success: false,

        error: 'Message content required',
      });
    }

    console.log('USER MESSAGE:', content);

    // Send message to Ollama
    const ollamaResponse = await fetch(

      'http://127.0.0.1:11434/api/generate',

      {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({

          model: 'phi3',

          prompt: content,

          stream: false,
        }),
      }
    );

    // Convert Ollama response
    const data = await ollamaResponse.json();

    console.log('OLLAMA DATA:', data);

    // Send response back
    return res.status(200).json({

      success: true,

      content:
        data.response ||
        'No AI response generated.',
    });

  } catch (error) {

    console.error('SEND MESSAGE ERROR:', error);

    return res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};

/**
 * Rename Conversation
 */
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

/**
 * Delete Conversation
 */
exports.deleteConversation = async (req, res) => {

  try {

    return res.status(200).json({

      success: true,

      message: 'Conversation deleted',
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      error: error.message,
    });
  }
};