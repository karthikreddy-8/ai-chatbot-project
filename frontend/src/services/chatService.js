import api from './api';

export const chatService = {
  /**
   * Create a new conversation
   */
  async createConversation() {
    console.log('[chatService] Creating new conversation');
    try {
      const res = await api.post('/api/chat/conversations');
      console.log('[chatService] Conversation created:', res.data);
      return res.data;
    } catch (err) {
      console.error('[chatService] Failed to create conversation:', err);
      throw err;
    }
  },

  /**
   * Get all conversations for the current user
   */
  async getConversations() {
    console.log('[chatService] Fetching conversations');
    try {
      const res = await api.get('/api/chat/conversations');
      console.log('[chatService] Conversations fetched:', res.data?.length);
      return res.data;
    } catch (err) {
      console.error('[chatService] Failed to fetch conversations:', err);
      throw err;
    }
  },

  /**
   * Get a specific conversation with all messages
   */
  async getConversation(id) {
    console.log('[chatService] Fetching conversation:', id);
    try {
      const res = await api.get(`/api/chat/conversations/${id}`);
      console.log('[chatService] Conversation fetched:', res.data);
      return res.data;
    } catch (err) {
      console.error('[chatService] Failed to fetch conversation:', err);
      throw err;
    }
  },

  /**
   * Send a message to a conversation and get AI response
   * @param {string} conversationId - The conversation ID
   * @param {string} content - The message content
   * @returns {Promise} AI response message
   */
  async sendMessage(conversationId, content) {
    console.log('[chatService] Sending message to conversation:', conversationId);
    console.log('[chatService] Message content length:', content?.length);
    
    if (!content || !content.trim()) {
      console.error('[chatService] Message content is empty');
      throw new Error('Message content cannot be empty');
    }

    try {
      const res = await api.post(`/api/chat/conversations/${conversationId}/messages`, {
        content,
      });
      console.log('[chatService] Message sent successfully, AI response received');
      console.log('[chatService] AI response:', res.data?.content?.substring(0, 100));
      return res.data;
    } catch (err) {
      console.error('[chatService] Failed to send message:', err);
      console.error('[chatService] Error response:', err.response?.data);
      throw err;
    }
  },

  /**
   * Rename a conversation
   */
  async renameConversation(id, title) {
    console.log('[chatService] Renaming conversation:', id, 'to:', title);
    try {
      const res = await api.put(`/api/chat/conversations/${id}`, { title });
      console.log('[chatService] Conversation renamed successfully');
      return res.data;
    } catch (err) {
      console.error('[chatService] Failed to rename conversation:', err);
      throw err;
    }
  },

  /**
   * Delete a conversation
   */
  async deleteConversation(id) {
    await api.delete(`/api/chat/conversations/${id}`);
  },

  /**
   * Get AI provider health status
   */
  async getAIHealth() {
    const res = await api.get('/api/chat/health');
    return res.data;
  },
};
