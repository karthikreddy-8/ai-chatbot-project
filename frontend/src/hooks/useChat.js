import { useState, useRef, useCallback } from "react";
import api from "../services/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const useChat = () => {
  // ============================================
  // STATES
  // ============================================
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);

  const abortControllerRef = useRef(null);

  // ============================================
  // CONVERSATION MANAGEMENT
  // ============================================
  const loadConversations = useCallback(async () => {
    return [];
  }, []);

  const selectConversation = async (id) => {
    setActiveConversation(id);
  };

  const newChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMessages([]);
    setActiveConversation(null);
    setIsSending(false);
    setIsThinking(false);
    setIsStreaming(false);
    setStreamingMessageId(null);
  };

  const deleteConversation = async (id) => {
    console.log("Delete:", id);
  };

  const renameConversation = async (id, title) => {
    console.log("Rename:", id, title);
  };

  // ============================================
  // STOP GENERATION
  // ============================================
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      console.log("🛑 Stopping stream generation...");
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSending(false);
    setIsThinking(false);
    setIsStreaming(false);
    setStreamingMessageId(null);
  }, []);

  // ============================================
  // STREAMING SEND MESSAGE
  // ============================================
  const sendMessage = async (content) => {
    const trimmed = content?.trim();
    if (!trimmed) return;

    // 0-150ms: Show user message immediately
    const userMsgId = `user_${Date.now()}`;
    const userMessage = {
      id: userMsgId,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toISOString(),
    };

    // 150-500ms: Set thinking state immediately
    setIsSending(true);
    setIsThinking(true);
    setIsStreaming(false);

    // Prepare current history window (last 10)
    const historySnapshot = messages.slice(-10).map((m) => ({
      sender: m.sender,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMessage]);

    // Setup AbortController for stop button support
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const aiMsgId = `ai_${Date.now()}`;

    try {
      // Stream request to backend FastAPI endpoint
      const response = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          history: historySnapshot,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported in response body.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let fullText = '';
      let firstTokenArrived = false;
      let buffer = '';

      // Smooth render cadence (20-30ms) to avoid React render thrashing
      let lastRenderTime = Date.now();
      const RENDER_CADENCE_MS = 25;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || ''; // Keep incomplete trailing chunk in buffer

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data: ')) continue;

          const dataStr = trimmedLine.replace(/^data:\s*/, '');
          if (dataStr === '[DONE]') {
            break;
          }

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.token) {
              fullText += parsed.token;

              // As soon as first token arrives: replace thinking state with real message bubble
              if (!firstTokenArrived) {
                firstTokenArrived = true;
                setIsThinking(false);
                setIsStreaming(true);
                setStreamingMessageId(aiMsgId);

                // Initialize AI message entry
                setMessages((prev) => [
                  ...prev,
                  {
                    id: aiMsgId,
                    sender: "ai",
                    text: fullText,
                    timestamp: new Date().toISOString(),
                  },
                ]);
                lastRenderTime = Date.now();
              } else {
                // Throttle updates slightly to maintain 60fps rendering without jank
                const now = Date.now();
                if (now - lastRenderTime >= RENDER_CADENCE_MS) {
                  const currentText = fullText;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === aiMsgId ? { ...msg, text: currentText } : msg
                    )
                  );
                  lastRenderTime = now;
                }
              }
            }
          } catch (e) {
            if (e.message && e.message.includes('Ollama')) {
              throw e;
            }
            // Ignore token JSON parse glitches
          }
        }
      }

      // Flush final text
      if (fullText) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId ? { ...msg, text: fullText } : msg
          )
        );
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Stream aborted by user.');
        // Keep whatever partial message was already generated
        return;
      }

      console.error("Stream Error:", error);

      let cleanErrorMsg = "AI service is temporarily unavailable. Please make sure Ollama is running.";
      if (error.message && (error.message.includes("Ollama") || error.message.includes("unavailable") || error.message.includes("busy"))) {
        cleanErrorMsg = error.message;
      }

      setIsThinking(false);
      
      // If error happened before first token, add clean error message bubble
      setMessages((prev) => {
        const hasPartialAiMsg = prev.some((m) => m.id === aiMsgId);
        if (hasPartialAiMsg) {
          return prev.map((msg) =>
            msg.id === aiMsgId
              ? { ...msg, text: msg.text + `\n\n⚠️ *${cleanErrorMsg}*` }
              : msg
          );
        } else {
          return [
            ...prev,
            {
              id: `err_${Date.now()}`,
              sender: "ai",
              text: `⚠️ **${cleanErrorMsg}**`,
              timestamp: new Date().toISOString(),
            },
          ];
        }
      });
    } finally {
      setIsSending(false);
      setIsThinking(false);
      setIsStreaming(false);
      setStreamingMessageId(null);
      abortControllerRef.current = null;
    }
  };

  return {
    conversations,
    activeConversation,
    messages,
    isLoading,
    isSending,
    isThinking,
    isStreaming,
    streamingMessageId,
    loadConversations,
    selectConversation,
    sendMessage,
    stopGeneration,
    deleteConversation,
    renameConversation,
    newChat,
    setMessages,
  };
};