/**
 * Google Gemini API Provider
 * For production deployment
 */

const axios = require('axios');

class GeminiProvider {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }

    this.apiKey = apiKey;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models';
    this.model = 'gemini-pro';
    this.client = axios.create({
      timeout: 30000,
    });
  }

  /**
   * Convert messages to Gemini format
   * @param {Array} messages - Conversation history
   * @returns {Object} Gemini API format
   */
  formatMessagesForGemini(messages) {
    const contents = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

    return contents;
  }

  /**
   * Generate response from Gemini
   * @param {Array} messages - Conversation history
   * @param {String} model - Model name
   * @returns {Promise<Object>} Response object
   */
  async generateResponse(messages, model = 'gemini-pro') {
    try {
      const contents = this.formatMessagesForGemini(messages);
      const systemInstruction =
        messages.find(msg => msg.role === 'system')?.content || 'You are a helpful AI assistant.';

      const response = await this.client.post(
        `${this.baseURL}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }
      );

      const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response received from Gemini';

      return {
        message: {
          role: 'assistant',
          content: text,
        },
        model: this.model,
        provider: 'gemini',
      };
    } catch (error) {
      console.error('Gemini Generation Error:', error.response?.data || error.message);
      throw new Error(`Gemini Error: ${error.message}`);
    }
  }

  /**
   * Stream response from Gemini
   * Note: Gemini doesn't support native streaming in this implementation
   * Falls back to regular generation
   */
  async *streamResponse(messages, model = 'gemini-pro') {
    try {
      const response = await this.generateResponse(messages, model);
      yield {
        content: response.message.content,
        done: true,
      };
    } catch (error) {
      console.error('Gemini Stream Error:', error.message);
      throw error;
    }
  }

  /**
   * Health check for Gemini
   */
  async healthCheck() {
    try {
      // Try a simple API call to verify connection
      const response = await this.client.post(
        `${this.baseURL}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [
            {
              role: 'user',
              parts: [{ text: 'ping' }],
            },
          ],
        }
      );

      return {
        status: 'ok',
        provider: 'gemini',
        model: this.model,
      };
    } catch (error) {
      return {
        status: 'error',
        provider: 'gemini',
        error: error.message,
      };
    }
  }
}

module.exports = GeminiProvider;
