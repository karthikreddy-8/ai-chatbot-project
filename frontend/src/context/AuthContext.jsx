import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({ id: 1, username: 'Local User', email: 'local@ai.chatbot' });
  const [token, setToken] = useState('local-token');
  const [loading, setLoading] = useState(false);

  // On mount, verify token and load user (Disabled for local Ollama integration)
  useEffect(() => {
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const mockUser = { id: 1, username: 'Local User', email };
    setUser(mockUser);
    setToken('local-token');
    return { token: 'local-token', user: mockUser };
  }, []);

  const register = useCallback(async (username, email, password) => {
    const mockUser = { id: 1, username, email };
    setUser(mockUser);
    setToken('local-token');
    return { token: 'local-token', user: mockUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
