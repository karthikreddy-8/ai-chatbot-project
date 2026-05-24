import api from './api';

export const authService = {
  async register(username, email, password) {
    const res = await api.post('/auth/register', { username, email, password });
    return res.data;
  },

  async login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },

  async getProfile(token) {
    const res = await api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
