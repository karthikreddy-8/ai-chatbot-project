import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, MoreVertical, FolderOpen, Calendar, MessageSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/**
 * ProjectsPage — Modern projects management with create/delete functionality
 */
export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(false);

  // Load projects from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load projects:', e);
      }
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (updatedProjects) => {
    localStorage.setItem('user_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  // Create new project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setLoading(true);
    const newProject = {
      id: Date.now().toString(),
      name: newProjectName,
      description: '',
      chats: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...projects, newProject];
    saveProjects(updated);
    setNewProjectName('');
    setShowNewProject(false);
    setLoading(false);
  };

  // Delete project
  const handleDeleteProject = (projectId) => {
    if (confirm('Delete this project? This cannot be undone.')) {
      const updated = projects.filter(p => p.id !== projectId);
      saveProjects(updated);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(124, 58, 237, 0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
              <p className="text-[var(--text-muted)]">Organize your AI conversations by project</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewProject(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
              style={{
                background: 'linear-gradient(135deg, var(--neon-purple), rgba(124, 58, 237, 0.5))',
                color: 'white',
              }}
            >
              <Plus size={20} />
              New Project
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* New Project Form */}
        <AnimatePresence>
          {showNewProject && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-6 rounded-xl glass"
            >
              <form onSubmit={handleCreateProject} className="flex gap-3">
                <input
                  type="text"
                  placeholder="Project name..."
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                  }}
                  autoFocus
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg font-medium"
                  style={{
                    background: 'var(--neon-purple)',
                    color: 'white',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? 'Creating...' : 'Create'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="px-4 py-3 rounded-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                  }}
                >
                  Cancel
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FolderOpen size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-[var(--text-muted)] mb-6">Create your first project to organize conversations</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewProject(true)}
              className="px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2"
              style={{
                background: 'var(--neon-purple)',
                color: 'white',
              }}
            >
              <Plus size={18} />
              Create First Project
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-xl glass hover:glass-strong transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-lg"
                      style={{ background: 'rgba(124, 58, 237, 0.2)' }}
                    >
                      <FolderOpen size={24} style={{ color: 'var(--neon-purple)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{project.name}</h3>
                      <p className="text-sm text-[var(--text-muted)]">
                        {project.chats?.length || 0} chats
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(255, 0, 0, 0.1)' }}
                  >
                    <Trash2 size={18} style={{ color: '#EF4444' }} />
                  </motion.button>
                </div>

                <div className="space-y-2 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} />
                    Last updated {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
