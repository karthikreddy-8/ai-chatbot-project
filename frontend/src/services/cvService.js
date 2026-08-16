import api from './api';

export const compareImages = async (baselineFile, modifiedFile, title = '') => {
  const formData = new FormData();
  formData.append('baseline', baselineFile);
  formData.append('modified', modifiedFile);
  if (title) {
    formData.append('title', title);
  }

  const response = await api.post('/analyze/compare', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAnalysisHistory = async (limit = 20) => {
  const response = await api.get(`/analyze/history?limit=${limit}`);
  return response.data;
};

export const getAnalysisDetail = async (analysisId) => {
  const response = await api.get(`/analyze/detail/${analysisId}`);
  return response.data;
};

export const deleteAnalysisRecord = async (analysisId) => {
  const response = await api.delete(`/analyze/delete/${analysisId}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/analyze/stats');
  return response.data;
};
