/**
 * OpenAI API Provider
 * For production deployment (ChatGPT, GPT-4, etc.)
 */

const axios = require('axios');

class OpenAIProvider {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }

    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1';
    this.model = 'gpt-3.5-turbo';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  /**
   * Format messages for OpenAI API
   * @param {Array} messages - Conversation history
   * @returns {Array} OpenAI format messages
   */
  formatMessagesForOpenAI(messages) {
    return messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : msg.role === 'assistant' ? 'assistant' : 'system',
      content: msg.content,
    }));
  }

  /**
   * Generate response from OpenAI
   * @param {Array} messages - Conversation history
   * @param {String} model - Model name (gpt-3.5-turbo, gpt-4, etc.)
   * @returns {Promise<Object>} Response object
   */
  async generateResponse(messages, model = 'gpt-3.5-turbo') {
    try {
      const formattedMessages = this.formatMessagesForOpenAI(messages);

      const response = await this.client.post('/chat/completions', {
        model: model || this.model,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 2048,
      });

      const text = response.data?.choices?.[0]?.message?.content || 'No response received from OpenAI';

      return {
        message: {
          role: 'assistant',
          content: text,
        },
        model: model || this.model,
        provider: 'openai',
      };
    } catch (error) {
      console.error('OpenAI Generation Error:', error.response?.data || error.message);
      throw new Error(`OpenAI Error: ${error.message}`);
    }
  }

  /**
   * Stream response from OpenAI
   * @param {Array} messages - Conversation history
   * @param {String} model - Model name
   * @yields {Object} Streamed chunks
   */
  async *streamResponse(messages, model = 'gpt-3.5-turbo') {
    try {
      const formattedMessages = this.formatMessagesForOpenAI(messages);

      const response = await this.client.post(
        '/chat/completions',
        {
          model: model || this.model,
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 2048,
          stream: true,
        },
        {
          responseType: 'stream',
        }
      );

      for await (const chunk of response.data) {
        const line = chunk.toString().trim();

        if (!line.startsWith('data:')) continue;

        const data = line.slice(6).trim();
        if (data === '[DONE]') break;

        try {
          const parsed = JSON.parse(data);
          const content = parsed?.choices?.[0]?.delta?.content || '';

          if (content) {
            yield {
              content: content,
              done: false,
            };
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }

      yield {
        content: '',
        done: true,
      };
    } catch (error) {
      console.error('OpenAI Stream Error:', error.message);
      throw new Error(`OpenAI Stream Error: ${error.message}`);
    }
  }

  /**
   * Health check for OpenAI
   */
  async healthCheck() {
    try {
      const response = await this.client.post('/chat/completions', {
        model: this.model,
        messages: [{ role: 'user', content: 'ping' }],
        max_tokens: 5,
      });

      return {
        status: 'ok',
        provider: 'openai',
        model: this.model,
      };
    } catch (error) {
      return {
        status: 'error',
        provider: 'openai',
        error: error.message,
      };
    }
  }
}

module.exports = OpenAIProvider;
