import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, BookOpen, Code2, Link, HelpCircle, Plus, Trash2,
  Lightbulb, FileText, ChevronDown, Check
} from 'lucide-react';

const TABS = [
  { id: 'notes',    icon: BookOpen,    label: 'Study Notes' },
  { id: 'snippets', icon: Code2,       label: 'Code Snippets' },
  { id: 'resources',icon: Link,        label: 'Resources' },
  { id: 'quiz',     icon: HelpCircle,  label: 'Quiz Me' },
];

const SAMPLE_RESOURCES = [
  { title: 'Python Docs', url: 'https://docs.python.org', tag: 'Official' },
  { title: 'GeeksForGeeks DSA', url: 'https://geeksforgeeks.org', tag: 'Tutorial' },
  { title: 'NeetCode 150', url: 'https://neetcode.io', tag: 'Practice' },
];

const SAMPLE_QUIZ = [
  { q: 'What is the time complexity of binary search?', options: ['O(N)', 'O(log N)', 'O(N²)', 'O(1)'], answer: 1 },
  { q: 'Which data structure uses LIFO?', options: ['Queue', 'Array', 'Stack', 'Linked List'], answer: 2 },
  { q: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Logic', 'System Query Language', 'None'], answer: 0 },
];

export default function EduContextPanel({
  isOpen, onClose, activeTab, setActiveTab,
  activeModule, selectedSubject,
  codeAnalysis, pdfData, projectViva,
  notes = [], onAddNote, onRemoveNote,
}) {
  const [newNote, setNewNote] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState({});

  const handleAddNote = () => {
    const trimmed = newNote.trim();
    if (!trimmed) return;
    onAddNote?.({ id: Date.now(), text: trimmed, ts: new Date().toLocaleTimeString() });
    setNewNote('');
  };

  const handleQuizAnswer = (qi, oi) => {
    setQuizAnswers(p => ({ ...p, [qi]: oi }));
    setShowExplanation(p => ({ ...p, [qi]: true }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="workspace-right flex flex-col overflow-hidden"
          aria-label="Context panel"
        >
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-subtle)] shrink-0">
            <span className="text-sm font-semibold text-[var(--text-primary)]">Context Panel</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
              aria-label="Close context panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[var(--border-subtle)] px-2 gap-0.5 shrink-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 py-2 px-2 text-[10px] font-medium rounded-t-lg transition-all flex-1 ${
                  activeTab === tab.id
                    ? 'text-[var(--brand-primary)] border-b-2 border-[var(--brand-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
                aria-label={tab.label}
              >
                <tab.icon size={14} />
                <span className="truncate w-full text-center">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-3">

            {/* Study Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                <p className="text-xs text-[var(--text-muted)]">Quick notes from your session</p>
                {/* Add note */}
                <div className="space-y-2">
                  <textarea
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Add a study note..."
                    rows={2}
                    className="input-field text-xs resize-none"
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddNote(); } }}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="btn-primary w-full justify-center py-2 text-xs disabled:opacity-50"
                  >
                    <Plus size={13} /> Add Note
                  </button>
                </div>
                {/* Notes list */}
                {notes.length === 0 ? (
                  <div className="text-center py-6 space-y-1">
                    <BookOpen size={20} className="mx-auto text-[var(--text-muted)]" />
                    <p className="text-xs text-[var(--text-muted)]">No notes yet. Add one above!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {notes.map(note => (
                      <div key={note.id} className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] group relative">
                        <p className="text-xs text-[var(--text-primary)] leading-relaxed pr-5">{note.text}</p>
                        {note.ts && <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{note.ts}</p>}
                        <button
                          onClick={() => onRemoveNote?.(note.id)}
                          className="absolute top-2 right-2 p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--brand-red)] opacity-0 group-hover:opacity-100 transition-all"
                          aria-label="Delete note"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Code Snippets */}
            {activeTab === 'snippets' && (
              <div className="space-y-3">
                <p className="text-xs text-[var(--text-muted)]">Code blocks from this conversation</p>
                {codeAnalysis ? (
                  <div className="p-3 rounded-xl bg-[#0D1117] border border-[var(--border-subtle)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[var(--brand-cyan)] font-mono">python</span>
                      <span className="badge badge-blue">Big-O: O(N log N)</span>
                    </div>
                    <pre className="text-xs text-white/80 font-mono overflow-x-auto">{codeAnalysis}</pre>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-1">
                    <Code2 size={20} className="mx-auto text-[var(--text-muted)]" />
                    <p className="text-xs text-[var(--text-muted)]">Code blocks will appear here as you chat</p>
                  </div>
                )}
              </div>
            )}

            {/* Resources */}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                <p className="text-xs text-[var(--text-muted)]">Recommended resources</p>
                {SAMPLE_RESOURCES.map(r => (
                  <a
                    key={r.title}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.04)] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Link size={13} className="text-[var(--brand-primary)]" />
                      <span className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--brand-primary)] transition-colors">{r.title}</span>
                    </div>
                    <span className="badge badge-blue text-[10px]">{r.tag}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Quiz Me */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <p className="text-xs text-[var(--text-muted)]">Test your understanding</p>
                {SAMPLE_QUIZ.map((q, qi) => (
                  <div key={qi} className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-3">
                    <p className="text-xs font-semibold text-[var(--text-primary)] leading-relaxed">
                      Q{qi+1}. {q.q}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => {
                        const answered = quizAnswers[qi] !== undefined;
                        const isSelected = quizAnswers[qi] === oi;
                        const isCorrect = oi === q.answer;
                        return (
                          <button
                            key={oi}
                            onClick={() => !answered && handleQuizAnswer(qi, oi)}
                            disabled={answered}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left transition-all ${
                              !answered
                                ? 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
                                : isCorrect
                                  ? 'bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] text-[var(--brand-green)]'
                                  : isSelected
                                    ? 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] text-[var(--brand-red)]'
                                    : 'text-[var(--text-muted)] border border-transparent opacity-60'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md border border-current flex items-center justify-center shrink-0 text-[10px] font-bold">
                              {answered && isCorrect ? <Check size={11} /> : String.fromCharCode(65 + oi)}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {showExplanation[qi] && (
                      <p className="text-[11px] text-[var(--brand-green)] border-t border-[var(--border-subtle)] pt-2">
                        ✓ Correct answer: <strong>{q.options[q.answer]}</strong>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
