import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, DownloadCloud, Book, Filter } from 'lucide-react';

/**
 * LibraryPage — Saved chats, files, and images library with search
 */
export default function LibraryPage() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, chat, file, image

  // Load library items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user_library');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load library:', e);
      }
    }
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Delete item
  const handleDelete = (itemId) => {
    if (confirm('Delete this item?')) {
      const updated = items.filter(i => i.id !== itemId);
      localStorage.setItem('user_library', JSON.stringify(updated));
      setItems(updated);
    }
  };

  // Download item
  const handleDownload = (item) => {
    const element = document.createElement('a');
    const file = new Blob([item.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${item.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(124, 58, 237, 0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Library</h1>
            <p className="text-[var(--text-muted)]">Your saved chats, files, and important conversations</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
              }}
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <Filter size={20} className="text-[var(--text-muted)] my-auto" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
              }}
            >
              <option value="all">All Types</option>
              <option value="chat">Chats</option>
              <option value="file">Files</option>
              <option value="image">Images</option>
            </select>
          </div>
        </motion.div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Book size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {items.length === 0 ? 'Your library is empty' : 'No items match your search'}
            </h3>
            <p className="text-[var(--text-muted)]">
              {items.length === 0
                ? 'Save chats and files to build your library'
                : 'Try adjusting your search or filters'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-xl glass hover:glass-strong transition-all"
              >
                {/* Type Badge */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold uppercase"
                    style={{
                      background: item.type === 'chat' ? 'rgba(139, 92, 246, 0.2)' :
                        item.type === 'file' ? 'rgba(59, 130, 246, 0.2)' :
                          'rgba(168, 85, 247, 0.2)',
                      color: item.type === 'chat' ? '#C084FC' :
                        item.type === 'file' ? '#60A5FA' :
                          '#D8B4FE'
                    }}
                  >
                    {item.type}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(255, 0, 0, 0.1)' }}
                  >
                    <Trash2 size={16} style={{ color: '#EF4444' }} />
                  </motion.button>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">{item.description}</p>
                )}

                {/* Meta Info */}
                <div className="text-xs text-[var(--text-muted)] mb-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>

                {/* Actions */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownload(item)}
                  className="w-full py-2 rounded-lg flex items-center justify-center gap-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'rgba(124, 58, 237, 0.2)',
                    color: 'var(--neon-purple)',
                  }}
                >
                  <DownloadCloud size={16} />
                  Download
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
