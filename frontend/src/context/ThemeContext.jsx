import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('eduvision_theme') || 'dark';
  });

  const [activeTheme, setActiveTheme] = useState('dark');

  useEffect(() => {
    const applyTheme = () => {
      let resolved = themeMode;
      if (themeMode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        resolved = isDark ? 'dark' : 'light';
      }
      setActiveTheme(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
      localStorage.setItem('eduvision_theme', themeMode);
    };

    applyTheme();

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  const cycleTheme = () => {
    setThemeMode((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'system';
      return 'dark';
    });
  };

  const setTheme = (mode) => {
    if (['dark', 'light', 'system'].includes(mode)) {
      setThemeMode(mode);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, themeMode, cycleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
