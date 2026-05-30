import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Trash2, Edit3, Check, X,
  LogOut, ChevronLeft, Home, FolderKanban, Compass,
  Library, Wrench, Settings, Sparkles, Crown, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * Sidebar — Futuristic dark sidebar with neon accents, menu items,
 * chat history, search, and user profile section.
 */
export default function Sidebar({
  conversations,
  activeConversation,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  isOpen,
  onToggle,
}) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const filteredConversations = conversations.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRename = (id) => {
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const startEditing = (conv) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const menuItems = [
    { icon: Home, label: 'Home', action: () => { onNewChat(); if (window.innerWidth < 1024) onToggle(); } },
    { icon: FolderKanban, label: 'Projects', action: () => { if (window.innerWidth < 1024) onToggle(); } },
    { icon: Compass, label: 'Explore', action: () => { if (window.innerWidth < 1024) onToggle(); } },
    { icon: Library, label: 'Library', action: () => { if (window.innerWidth < 1024) onToggle(); } },
    { icon: Wrench, label: 'AI Tools', action: () => { if (window.innerWidth < 1024) onToggle(); } },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 0, x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:relative z-50 h-full flex flex-col overflow-hidden"
        style={{
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid rgba(124, 58, 237, 0.1)',
        }}
      >
        {/* Header: New Chat */}
        <div className="p-3 pb-1">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-bold text-[20px] text-white font-['Poppins'] tracking-wide">AI Chat</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-glass-hover)] transition-all lg:hidden"
            >
              <X size={16} />
            </button>
          </div>

          <button
            onClick={onNewChat}
            id="new-chat-btn"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[rgba(124,58,237,0.2)] hover:border-[rgba(124,58,237,0.4)] hover:bg-[rgba(124,58,237,0.05)] transition-all duration-300 text-white group"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 border border-[rgba(124,58,237,0.3)] flex items-center justify-center group-hover:from-[var(--neon-purple)]/30 group-hover:to-[var(--neon-cyan)]/30 transition-all">
              <Plus size={14} />
            </div>
            <span className="text-[20px] font-medium">New Chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              id="search-chats"
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[rgba(124,58,237,0.3)] transition-all"
            />
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-3 py-1 space-y-0.5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(124,58,237,0.08)] transition-all duration-200 text-[20px] group"
            >
              <item.icon size={20} className="text-[var(--text-muted)] group-hover:text-[var(--neon-purple-light)] transition-colors" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="px-4 py-2">
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.15)] to-transparent" />
        </div>

        {/* Chat History Label */}
        <div className="px-4 py-1">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">Chat History</span>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-0.5 py-1">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-sm relative ${
                  activeConversation?.id === conv.id
                    ? 'bg-[rgba(124,58,237,0.12)] text-white border border-[rgba(124,58,237,0.2)]'
                    : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.03)] hover:text-white border border-transparent'
                }`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <MessageSquare size={14} className={`shrink-0 ${activeConversation?.id === conv.id ? 'text-[var(--neon-purple-light)]' : 'text-[var(--text-muted)]'}`} />
                <div className="flex-1 truncate pr-6">
                  {editingId === conv.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRename(conv.id)}
                      className="w-full bg-transparent border-b border-[var(--neon-purple)] focus:outline-none py-0.5 text-sm"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="truncate block">{conv.title}</span>
                  )}
                </div>

                {/* Actions */}
                <div className={`absolute right-2 flex items-center gap-0.5 ${activeConversation?.id === conv.id ? 'flex' : 'hidden group-hover:flex'}`}>
                  {editingId === conv.id ? (
                    <button onClick={(e) => { e.stopPropagation(); handleRename(conv.id); }}
                      className="p-1 rounded hover:bg-[rgba(124,58,237,0.2)]">
                      <Check size={12} className="text-green-400" />
                    </button>
                  ) : (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); startEditing(conv); }}
                        className="p-1 rounded hover:bg-[rgba(124,58,237,0.2)]">
                        <Edit3 size={11} className="text-[var(--text-muted)]" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onDeleteConversation(conv.id); }}
                        className="p-1 rounded hover:bg-red-500/10">
                        <Trash2 size={11} className="text-[var(--text-muted)] hover:text-red-400" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-[var(--text-muted)] text-xs">
              {searchQuery ? 'No results found' : 'No conversations yet'}
            </div>
          )}
        </div>

        {/* Upgrade Section */}
        <div className="px-3 py-2">
          <div className="p-3 rounded-xl glass-card">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={14} className="text-[var(--neon-cyan)]" />
              <span className="text-xs font-semibold text-white">Upgrade to Pro</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mb-2 leading-relaxed">
              Unlock unlimited AI, image generation, and more.
            </p>
            <button className="w-full py-1.5 rounded-lg text-[10px] font-semibold bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white hover:opacity-90 transition-opacity">
              Upgrade Plan
            </button>
          </div>
        </div>

        <div className="px-3 py-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(124,58,237,0.08)] transition-all text-[20px] group">
            <Settings size={20} className="text-[var(--text-muted)] group-hover:text-[var(--neon-purple-light)] transition-colors" />
            <span>Settings</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-3 border-t border-[rgba(124,58,237,0.1)]">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[rgba(124,58,237,0.06)] transition-all cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center text-white font-bold text-xs shadow-lg">
              {user?.username?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.username || 'User'}</p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">{user?.email || 'Free Plan'}</p>
            </div>
            <button
              onClick={logout}
              id="logout-btn"
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Sidebar Toggle (Desktop, when closed) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl glass-card text-white z-50 hover:bg-[rgba(124,58,237,0.1)] transition-all hidden lg:flex items-center justify-center"
        >
          <ChevronLeft size={16} className="rotate-180" />
        </button>
      )}
    </>
  );
}
