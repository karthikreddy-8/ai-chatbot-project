import { useState } from "react";
import api from "../services/api";

export const useChat = () => {

  // ============================================
  // STATES
  // ============================================

  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // ============================================
  // LOAD CONVERSATIONS
  // ============================================

  const loadConversations = async () => {
    return [];
  };

  // ============================================
  // SELECT CONVERSATION
  // ============================================

  const selectConversation = async (id) => {
    setActiveConversation(id);
  };

  // ============================================
  // NEW CHAT
  // ============================================

  const newChat = () => {
    setMessages([]);
    setActiveConversation(null);
  };

  // ============================================
  // DELETE CONVERSATION
  // ============================================

  const deleteConversation = async (id) => {
    console.log("Delete:", id);
  };

  // ============================================
  // RENAME CONVERSATION
  // ============================================

  const renameConversation = async (id, title) => {
    console.log("Rename:", id, title);
  };

  // ============================================
  // SEND MESSAGE
  // ============================================

  const sendMessage = async (content) => {

    // Prevent empty messages
    if (!content.trim()) return;

    // ========================================
    // ADD USER MESSAGE
    // ========================================

    const userMessage = {
      sender: "user",
      text: content,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      setIsSending(true);

      console.log("Sending message:", content);

      // ====================================
      // API REQUEST - Using configured API instance
      // ====================================

      const response = await api.post(
        "/api/chat",
        {
          prompt: content,
        }
      );

      console.log("Backend Response:", response.data);

      // ====================================
      // GET AI RESPONSE
      // ====================================

      const aiText =
        response.data.content ||
        response.data.message ||
        response.data.response ||
        response.data.reply ||
        response.data.data ||
        "No response from AI.";

      // ====================================
      // ADD AI MESSAGE
      // ====================================

      const aiMessage = {
        sender: "ai",
        text: aiText,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error("FULL ERROR:", error);

      let errorText = "Backend connection failed.";

      // ====================================
      // ERROR HANDLING
      // ====================================

      if (error.response) {

        errorText =
          "Server Error: " +
          JSON.stringify(error.response.data);

      } else if (error.request) {

        errorText =
          "Cannot connect to backend server.";

      } else {

        errorText = error.message;

      }

      // ====================================
      // SHOW ERROR MESSAGE
      // ====================================

      const errorMessage = {
        sender: "ai",
        text: errorText,
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {

      setIsSending(false);

    }

  };

  // ============================================
  // RETURN VALUES
  // ============================================

  return {
    conversations,
    activeConversation,
    messages,
    isLoading,
    isSending,
    loadConversations,
    selectConversation,
    sendMessage,
    deleteConversation,
    renameConversation,
    newChat,
  };

};