import { useState, useCallback } from 'react';

export function useEduAssistant() {
  const [activeModule, setActiveModule] = useState('home'); // 'home' | 'subjects' | 'coding' | 'pdf' | 'project' | 'resume' | 'interview' | 'progress'
  const [selectedSubject, setSelectedSubject] = useState('Python');
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [activeTabRight, setActiveTabRight] = useState('tools'); // 'tools' | 'bigo' | 'pdf' | 'viva' | 'notes'

  // Code Complexity state
  const [codeAnalysis, setCodeAnalysis] = useState({
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    language: 'Python',
    rating: 'Optimized',
    suggestions: [
      'Use memory-efficient generators for large datasets',
      'Consider iterative approach to reduce call stack overhead'
    ]
  });

  // PDF Summary & MCQs state
  const [pdfData, setPdfData] = useState({
    filename: 'Sample_Engineering_Notes.pdf',
    pages: 14,
    summary: 'Comprehensive guide covering Data Structures, Sorting Algorithms, Tree Traversals, and Graph Theory.',
    mcqs: [
      { q: 'What is the worst-case time complexity of QuickSort?', options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'], ans: 'O(N²)' },
      { q: 'Which data structure follows LIFO order?', options: ['Queue', 'Stack', 'Tree', 'Graph'], ans: 'Stack' }
    ]
  });

  // Project Guide Viva state
  const [projectViva, setProjectViva] = useState({
    title: 'EduVision AI — B.Tech Final Year Project',
    architecture: 'FastAPI + OpenCV + Gemini AI + React 19 + Vite + SQLite',
    vivaQuestions: [
      { q: 'How does SSIM calculate image similarity?', a: 'SSIM evaluates luminance, contrast, and structural information across corresponding windows.' },
      { q: 'Why use FastAPI over Flask?', a: 'FastAPI offers async performance, automatic OpenAPI docs, and Pydantic data validation.' }
    ]
  });

  // Quick Notes List
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('eduvision_notes');
    return saved ? JSON.parse(saved) : [
      'Master MergeSort & QuickSort space-time trade-offs.',
      'Review ACID properties in DBMS for viva examination.',
      'Prepare OpenCV SSIM math formulas for final presentation.'
    ];
  });

  const addNote = useCallback((text) => {
    if (!text.trim()) return;
    setNotes((prev) => {
      const updated = [text.trim(), ...prev];
      localStorage.setItem('eduvision_notes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeNote = useCallback((index) => {
    setNotes((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('eduvision_notes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const selectModule = useCallback((moduleName, subject = null) => {
    setActiveModule(moduleName);
    if (subject) setSelectedSubject(subject);
    if (moduleName === 'coding') setActiveTabRight('bigo');
    else if (moduleName === 'pdf') setActiveTabRight('pdf');
    else if (moduleName === 'project' || moduleName === 'interview') setActiveTabRight('viva');
    else setActiveTabRight('tools');
  }, []);

  return {
    activeModule,
    selectedSubject,
    rightPanelOpen,
    activeTabRight,
    codeAnalysis,
    pdfData,
    projectViva,
    notes,
    setRightPanelOpen,
    setActiveTabRight,
    selectModule,
    setSelectedSubject,
    setCodeAnalysis,
    setPdfData,
    setProjectViva,
    addNote,
    removeNote,
  };
}
