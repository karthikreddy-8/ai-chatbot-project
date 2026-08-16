import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SquarePen,
  Library,
  Clock,
  Puzzle,
  Terminal,
  MoreHorizontal,
  Folder,
  Search,
  Settings,
  User,
  LogOut,
  X,
  ChevronLeft,
  Sparkles,
  Image as ImageIcon,
  Bot,
  MessageSquare,
  Moon,
  Sun,
  Layers,
  ChevronDown,
  Pin
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';

export default function WorkspaceSidebar({
  conversations = [],
  activeConversation,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onOpenLibrary,
  onOpenScheduled,
  onOpenPlugins,
  onOpenCodex,
  onOpenImages,
  onOpenGPTs,
  onOpenAccount,
  onOpenSettings,
  isOpen,
  onToggle,
}) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef(null);

  // Close "More" menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredConversations = conversations.filter((c) =>
    c.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 272 : 0, x: isOpen ? 0 : -272 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:relative z-50 h-full flex flex-col justify-between overflow-hidden sidebar select-none"
      >
        {/* TOP SECTION */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          
          {/* Header Title: AI CHATBOT */}
          <div className="p-3.5 pb-2 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                <Sparkles size={15} className="text-white" />
              </div>
              <span className="font-extrabold text-base text-[var(--text-primary)] font-['Poppins'] tracking-tight">
                AI <span className="gradient-text-cyan">CHATBOT</span>
              </span>
            </Link>

            <button
              onClick={onToggle}
              className="p-1 rounded-lg text-[var(--text-muted)] hover:text-white lg:hidden"
            >
              <X size={16} />
            </button>
          </div>

          {/* MAIN MENU ITEMS (Exact 2nd Image Structure) */}
          <div className="px-2.5 py-1 space-y-0.5">
            {/* 1. New chat */}
            <button
              onClick={onNewChat}
              className="nav-item group"
              title="Start a new chat"
            >
              <SquarePen size={17} className="text-[var(--text-primary)] group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-white">New chat</span>
            </button>

            {/* 2. Library */}
            <button
              onClick={onOpenLibrary}
              className="nav-item group"
            >
              <Library size={17} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              <span>Library</span>
            </button>

            {/* 3. Scheduled */}
            <button
              onClick={onOpenScheduled}
              className="nav-item group"
            >
              <Clock size={17} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              <span>Scheduled</span>
            </button>

            {/* 4. Plugins */}
            <button
              onClick={onOpenPlugins}
              className="nav-item group"
            >
              <Puzzle size={17} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              <span>Plugins</span>
            </button>

            {/* 5. Codex */}
            <button
              onClick={onOpenCodex}
              className="nav-item group"
            >
              <Terminal size={17} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              <span>Codex</span>
            </button>

            {/* 6. ... More (Dropdown Popup) */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`nav-item group justify-between ${showMoreMenu ? 'active' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <MoreHorizontal size={17} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
                  <span>More</span>
                </div>
                <ChevronDown size={14} className={`text-[var(--text-muted)] transition-transform ${showMoreMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Popup Dropdown Menu (Images, GPTs) */}
              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute left-4 top-10 z-50 card p-1.5 min-w-[160px] shadow-2xl border-[var(--border-accent)] bg-[var(--bg-tertiary)]"
                  >
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        if (onOpenImages) onOpenImages();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)] transition-all text-left"
                    >
                      <ImageIcon size={15} className="text-[var(--neon-purple-light)]" />
                      <span>Images</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        if (onOpenGPTs) onOpenGPTs();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)] transition-all text-left"
                    >
                      <Bot size={15} className="text-[var(--neon-cyan)]" />
                      <span>GPTs</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* PINNED SECTION */}
          <div className="px-3 pt-3 pb-1">
            <div className="px-1 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>Pinned</span>
            </div>
            <button
              onClick={() => {
                if (onNewChat) onNewChat();
              }}
              className="nav-item text-xs group"
            >
              <Folder size={15} className="text-[var(--text-muted)] group-hover:text-[var(--neon-cyan)] transition-colors" />
              <span className="truncate">car racing</span>
            </button>
          </div>

          {/* PROJECTS SECTION */}
          <div className="px-3 pt-2 pb-1">
            <div className="px-1 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
              <span>Projects</span>
            </div>
            <button
              onClick={onNewChat}
              className="nav-item text-xs group"
            >
              <Folder size={15} className="text-[var(--text-muted)] group-hover:text-[var(--neon-purple-light)] transition-colors" />
              <span className="truncate">Computer Vision Project</span>
            </button>
          </div>

          {/* HISTORY OF SEARCHING SECTION */}
          <div className="px-3 pt-3 flex-1 flex flex-col min-h-0">
            <div className="px-1 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
              <span>History</span>
            </div>

            {/* Search Bar */}
            <div className="relative mb-2">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search history..."
                className="input-field pl-8 pr-2 py-1.5 text-xs rounded-lg"
              />
            </div>

            {/* Search History List */}
            <div className="flex-1 overflow-y-auto space-y-0.5 pr-1">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => onSelectConversation && onSelectConversation(conv.id)}
                    className={`nav-item text-xs justify-between group ${
                      activeConversation?.id === conv.id ? 'active font-bold' : ''
                    }`}
                  >
                    <span className="truncate">{conv.title || 'Untitled search'}</span>
                  </button>
                ))
              ) : (
                <div className="text-[11px] text-[var(--text-muted)] px-2 py-2 italic">
                  {searchQuery ? 'No matching history' : 'No recent searches'}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: ACCOUNT AND SETTINGS */}
        <div className="p-2.5 border-t border-[var(--border-primary)] space-y-1 bg-[var(--bg-glass)]">
          {/* Account Option */}
          <button
            onClick={onOpenAccount}
            className="nav-item justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <User size={16} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              <span className="font-semibold text-xs text-white">Account</span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[90px]">
              {user?.username || 'Profile'}
            </span>
          </button>

          {/* Settings Option */}
          <button
            onClick={onOpenSettings}
            className="nav-item justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <Settings size={16} className="text-[var(--text-muted)] group-hover:text-white transition-colors" />
              <span className="font-semibold text-xs text-white">Settings</span>
            </div>
          </button>
        </div>
      </motion.aside>

      {/* Desktop Drawer Toggle button when collapsed */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl glass text-[var(--text-primary)] z-50 hover:border-[var(--border-accent)] hidden lg:flex items-center justify-center shadow-lg"
          aria-label="Open AI Chatbot Sidebar"
        >
          <ChevronLeft size={16} className="rotate-180 text-[var(--neon-purple-light)]" />
        </button>
      )}
    </>
  );
}
