import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vision_user');
    return saved ? JSON.parse(saved) : { id: 1, username: 'Vision Engineer', email: 'engineer@visionevolution.ai' };
  });
  const [token, setToken] = useState(() => localStorage.getItem('image_analyzer_token') || 'local-token');
  const [loading, setLoading] = useState(true);

  // On mount, verify token with backend if available
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('image_analyzer_token');
      if (storedToken && storedToken !== 'local-token') {
        try {
          const profile = await authService.getProfile(storedToken);
          if (profile) {
            setUser(profile);
          }
        } catch (e) {
          console.warn('Auth token validation failed, falling back to cached user:', e);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data && data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('image_analyzer_token', data.token);
        localStorage.setItem('vision_user', JSON.stringify(data.user));
        return data;
      }
    } catch (err) {
      console.warn('Backend login failed, using local session:', err);
      // Fallback for seamless demo / local usage
      const fallbackUser = { id: Date.now(), username: email.split('@')[0] || 'Vision User', email };
      setToken('local-token');
      setUser(fallbackUser);
      localStorage.setItem('image_analyzer_token', 'local-token');
      localStorage.setItem('vision_user', JSON.stringify(fallbackUser));
      return { token: 'local-token', user: fallbackUser };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username, email, password) => {
    setLoading(true);
    try {
      const data = await authService.register(username, email, password);
      if (data && data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('image_analyzer_token', data.token);
        localStorage.setItem('vision_user', JSON.stringify(data.user));
        return data;
      }
    } catch (err) {
      console.warn('Backend register failed, using local session:', err);
      const fallbackUser = { id: Date.now(), username, email };
      setToken('local-token');
      setUser(fallbackUser);
      localStorage.setItem('image_analyzer_token', 'local-token');
      localStorage.setItem('vision_user', JSON.stringify(fallbackUser));
      return { token: 'local-token', user: fallbackUser };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('image_analyzer_token');
    localStorage.removeItem('vision_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
