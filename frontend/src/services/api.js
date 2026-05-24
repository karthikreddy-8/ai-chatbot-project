import axios from 'axios';

/**
 * API Base URL
 * Backend runs on port 5000
 */
const api = axios.create({

  baseURL: 'http://localhost:5000/api',

  headers: {
    'Content-Type': 'application/json',
  },

  timeout: 120000,
});

/**
 * Request Interceptor
 * Automatically attach token
 */
api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem('AI Chat-token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      'API REQUEST:',
      config.method?.toUpperCase(),
      config.url
    );

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 */
api.interceptors.response.use(

  (response) => {

    console.log(
      'API SUCCESS:',
      response.status,
      response.config.url
    );

    return response;
  },

  (error) => {

    console.error('API ERROR:', error);

    // Unauthorized
    if (error.response?.status === 401) {

      localStorage.removeItem('AI Chat-token');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Network Error
    if (error.message === 'Network Error') {

      console.error(
        'Backend server not running or connection failed'
      );
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {

      console.error(
        'Request timeout exceeded'
      );
    }

    return Promise.reject(error);
  }
);

export default api;