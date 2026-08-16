import { useState, useCallback } from 'react';
import {
  compareImages,
  getAnalysisHistory,
  getAnalysisDetail,
  deleteAnalysisRecord,
  getDashboardStats
} from '../services/cvService';

export function useAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async (limit = 30) => {
    try {
      const res = await getAnalysisHistory(limit);
      if (res && res.status === 'success') {
        setHistory(res.data || []);
      }
    } catch (err) {
      console.warn('Failed to fetch analysis history:', err);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await getDashboardStats();
      if (res && res.status === 'success') {
        setStats(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch stats:', err);
    }
  }, []);

  const runAnalysis = useCallback(async (baselineFile, modifiedFile, title = '') => {
    setAnalyzing(true);
    setError(null);
    try {
      const res = await compareImages(baselineFile, modifiedFile, title);
      if (res && res.status === 'success') {
        fetchHistory();
        return res.data;
      } else {
        throw new Error(res?.message || 'Analysis pipeline execution failed.');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to complete visual analysis.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setAnalyzing(false);
    }
  }, [fetchHistory]);

  const removeRecord = useCallback(async (id) => {
    try {
      await deleteAnalysisRecord(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to delete analysis record:', err);
    }
  }, []);

  return {
    analyzing,
    history,
    stats,
    error,
    runAnalysis,
    fetchHistory,
    fetchStats,
    removeRecord,
  };
}
