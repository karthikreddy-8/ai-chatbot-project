/**
 * Optimized AI Service
 * Faster responses + better error handling
 */

const axios = require('axios');

class AIService {

  constructor() {

    this.provider = this.detectProvider();

    this.defaultModel = 'phi3';

    this.initializeProvider();
  }

  /**
   * Detect AI Provider
   */
  detectProvider() {

    // Development → Ollama
    if (
      process.env.NODE_ENV !== 'production' ||
      process.env.USE_OLLAMA === 'true'
    ) {
      return 'ollama';
    }

    // Gemini
    if (process.env.GEMINI_API_KEY) {
      return 'gemini';
    }

    // OpenAI
    if (process.env.OPENAI_API_KEY) {
      return 'openai';
    }

    console.warn('⚠ No API keys found. Using Ollama.');

    return 'ollama';
  }

  /**
   * Initialize Provider
   */
  initializeProvider() {

    console.log(
      `🤖 AI Service initialized with provider: ${this.provider.toUpperCase()}`
    );

    try {

      if (this.provider === 'ollama') {

        const OllamaService = require('./providers/ollama.provider');

        this.aiProvider = new OllamaService();

      } else if (this.provider === 'gemini') {

        const GeminiService = require('./providers/gemini.provider');

        this.aiProvider = new GeminiService(
          process.env.GEMINI_API_KEY
        );

      } else if (this.provider === 'openai') {

        const OpenAIService = require('./providers/openai.provider');

        this.aiProvider = new OpenAIService(
          process.env.OPENAI_API_KEY
        );
      }

    } catch (error) {

      console.error(
        '❌ Provider initialization failed:',
        error.message
      );
    }
  }

  /**
   * Generate AI Response
   */
  async generateResponse(
    messages,
    model = this.defaultModel
  ) {

    try {

      if (!this.aiProvider) {

        throw new Error(
          'AI Provider not initialized'
        );
      }

      console.log(
        `⚡ Generating AI response using ${model}...`
      );

      // Timeout protection
      const timeoutPromise = new Promise((_, reject) => {

        setTimeout(() => {

          reject(
            new Error(
              'AI response timeout exceeded'
            )
          );

        }, 120000);

      });

      // Real AI request
      const aiPromise =
        this.aiProvider.generateResponse(
          messages,
          model
        );

      const response = await Promise.race([
        aiPromise,
        timeoutPromise,
      ]);

      console.log('✅ AI response generated');

      return response;

    } catch (error) {

      console.error(
        `❌ AI Service Error (${this.provider}):`,
        error.message
      );

      return {
        role: 'assistant',
        content:
          'AI response failed. Please try again.',
      };
    }
  }

  /**
   * Stream Response
   */
  async *streamResponse(
    messages,
    model = this.defaultModel
  ) {

    try {

      if (!this.aiProvider?.streamResponse) {

        throw new Error(
          'Streaming not supported'
        );
      }

      for await (
        const chunk of this.aiProvider.streamResponse(
          messages,
          model
        )
      ) {

        yield chunk;
      }

    } catch (error) {

      console.error(
        `❌ Stream Error (${this.provider}):`,
        error.message
      );

      yield {
        error: true,
        content: 'Streaming failed',
      };
    }
  }

  /**
   * Provider Name
   */
  getProvider() {

    return this.provider;
  }

  /**
   * Health Check
   */
  async healthCheck() {

    try {

      if (this.aiProvider?.healthCheck) {

        return await this.aiProvider.healthCheck();
      }

      return {
        status: 'ok',
        provider: this.provider,
      };

    } catch (error) {

      return {
        status: 'error',
        provider: this.provider,
        error: error.message,
      };
    }
  }
}

module.exports = new AIService();