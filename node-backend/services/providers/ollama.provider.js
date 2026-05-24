/**
 * Ollama Provider - Local AI Service (OPTIMIZED)
 * Uses locally installed Ollama with llama3 model
 * Connect to: http://localhost:11434/api/generate
 * Optimized for fast responses with streaming support
 */

const axios = require('axios');

class OllamaProvider {
  constructor() {
    this.baseURL = process.env.OLLAMA_URL || 'http://localhost:11434';
    this.model = process.env.OLLAMA_MODEL || 'llama3';
    this.timeout = 180000; // 3 minutes for long responses
    this.connectionRetries = 0;
    this.maxRetries = 3;
    
    // Create axios instance with optimization
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      keepAlive: true,
    });

    this.validateConnection();
  }

  async validateConnection() {
    try {
      const response = await this.client.get('/api/tags');
      const models = response.data.models || [];
      const hasLlama = models.some(m => m.name.includes('llama'));
      
      if (hasLlama) {
        console.log(`✅ Ollama connection successful | Model: ${this.model}`);
        this.connectionRetries = 0;
      } else {
        console.warn('⚠️  llama3 model not found. Available models:', models.map(m => m.name).join(', '));
      }
    } catch (error) {
      this.connectionRetries++;
      if (this.connectionRetries < this.maxRetries) {
        console.warn(`⚠️  Ollama connection attempt ${this.connectionRetries}/${this.maxRetries} failed`);
        setTimeout(() => this.validateConnection(), 2000);
      } else {
        console.error('❌ Failed to connect to Ollama. Make sure it\'s running:', this.baseURL);
      }
    }
  }

  /**
   * Convert messages array to optimized prompt for Ollama
   * Formats conversation history for faster processing
   * @param {Array} messages - Conversation history
   * @returns {String} Optimized prompt
   */
  formatMessagesAsPrompt(messages) {
    const systemPrompts = messages
      .filter(msg => msg.role === 'system')
      .map(msg => msg.content)
      .join('\n');

    const conversationHistory = messages
      .filter(msg => msg.role !== 'system')
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    const system = systemPrompts
      ? `${systemPrompts}\n\n`
      : 'You are a helpful AI assistant. Provide concise, clear, and accurate responses.\n\n';

    return system + conversationHistory + '\nAssistant:';
  }

  /**
   * Generate response from Ollama (optimized)
   * @param {Array} messages - Conversation history
   * @param {String} model - Model name (uses llama3)
   * @returns {Promise<Object>} Response object with timing
   */
  async generateResponse(messages, model = 'llama3') {
    try {
      const startTime = Date.now();
      const prompt = this.formatMessagesAsPrompt(messages);

      const response = await this.client.post('/api/generate', {
        model: this.model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_k: 40,
          top_p: 0.9,
          num_predict: 512, // Limit response length for speed
        },
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      console.log(`⚡ Ollama response generated in ${responseTime}ms`);

      return {
        message: {
          role: 'assistant',
          content: response.data.response.trim(),
        },
        model: this.model,
        provider: 'ollama',
        responseTime,
      };
    } catch (error) {
      console.error('Ollama Generation Error:', error.message);
      throw new Error(`Ollama Error: ${error.message}`);
    }
  }

  /**
   * Stream response from Ollama
   * @param {Array} messages - Conversation history
   * @param {String} model - Model name
   * @yields {Object} Streamed chunks
   */
  async *streamResponse(messages, model = 'llama3') {
    try {
      const prompt = this.formatMessagesAsPrompt(messages);

      const response = await this.client.post(
        '/api/generate',
        {
          model: this.model,
          prompt: prompt,
          stream: true,
        },
        {
          responseType: 'stream',
        }
      );

      for await (const line of response.data) {
        const chunk = line.toString().trim();
        if (chunk) {
          try {
            const data = JSON.parse(chunk);
            if (data.response) {
              yield {
                content: data.response,
                done: data.done || false,
              };
            }
          } catch (e) {
            // Skip invalid JSON lines
          }
        }
      }
    } catch (error) {
      console.error('Ollama Stream Error:', error.message);
      throw new Error(`Ollama Stream Error: ${error.message}`);
    }
  }

  /**
   * Health check for Ollama
   */
  async healthCheck() {
    try {
      const response = await this.client.get('/api/tags');
      return {
        status: 'ok',
        provider: 'ollama',
        url: this.baseURL,
        model: this.model,
      };
    } catch (error) {
      return {
        status: 'error',
        provider: 'ollama',
        url: this.baseURL,
        error: error.message,
      };
    }
  }
}

module.exports = OllamaProvider;
