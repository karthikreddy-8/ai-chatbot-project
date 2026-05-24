const ollama = require('ollama').default;

class OllamaService {

  async generateChat(messages, model = 'tinyllama') {

    try {

      const response = await ollama.chat({

        model,

        messages,

        stream: false,

        options: {
          num_predict: 64,
          temperature: 0.5,
          top_k: 10,
          top_p: 0.8,
          num_thread: 8,
        },

      });

      return response;

    } catch (error) {

      console.error('Ollama Chat Generation Error:', error);

      throw error;

    }

  }

  async streamChat(messages, model = 'tinyllama') {

    try {

      const stream = await ollama.chat({

        model,

        messages,

        stream: true,

        options: {
          num_predict: 64,
          temperature: 0.5,
          top_k: 10,
          top_p: 0.8,
          num_thread: 8,
        },

      });

      return stream;

    } catch (error) {

      console.error('Ollama Chat Streaming Error:', error);

      throw error;

    }

  }

}

module.exports = new OllamaService();