import { useState, useEffect } from 'react';
import { Menu, ChevronDown, Sparkles } from 'lucide-react';

import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';

import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';

export default function ChatPage() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { user } = useAuth();

  const {
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
  } = useChat();

  // Load conversations
  useEffect(() => {
    loadConversations();
  }, []);

  // Responsive sidebar
  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }

    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  // Send Message
  const handleSend = async (content, file) => {

    // Prevent empty message
    if (!content?.trim() && !file) return;

    try {

      let finalContent = content || '';

      // Add file info if uploaded
      if (file) {
        finalContent += `\n\n[File: ${file.name}]`;
      }

      // Send to backend
      await sendMessage(finalContent);

      // Reload conversations
      await loadConversations();

    } catch (error) {

      console.error('Message Send Error:', error);

    }

  };

  const isNewChat = messages.length === 0;

  return (

    <div className="h-screen flex bg-black text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onNewChat={newChat}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        onRenameConversation={renameConversation}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none z-0">

          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
            style={{
              background:
                'radial-gradient(circle, rgba(124, 58, 237, 0.8), transparent)',
            }}
          />

          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
            style={{
              background:
                'radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent)',
            }}
          />

        </div>

        {/* Header */}
        <header className="flex items-center justify-between p-3 px-4 z-20 relative">

          <div className="flex items-center gap-3">

            {!sidebarOpen && (

              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-gray-400 hover:text-white transition"
              >
                <Menu size={20} />
              </button>

            )}

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl">

              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              <span className="font-semibold text-sm">
                AI Chat
              </span>

              <ChevronDown size={14} />

            </div>

          </div>

        </header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">

          {/* Messages */}
          <div
            className={`flex-1 overflow-hidden flex flex-col ${
              isNewChat
                ? 'justify-center items-center'
                : ''
            }`}
          >

            <ChatWindow
              messages={messages}
              isSending={isSending}
              onSuggestionClick={(text) => handleSend(text)}
            />

          </div>

          {/* Input */}
          <div
            className={`w-full flex justify-center z-10 ${
              isNewChat ? 'pb-8' : 'pb-3'
            }`}
          >

            <div className="w-full max-w-3xl px-4">

              <ChatInput
                onSend={handleSend}
                disabled={isSending}
                showActions={isNewChat}
                onActionClick={(text) => handleSend(text)}
              />

            </div>

          </div>

        </div>

        {/* Footer */}
        <p className="text-[10px] text-gray-500 text-center pb-2 z-10">
          AI Chat can make mistakes. Verify important information.
        </p>

      </div>

    </div>

  );
}