'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('willow-theme') as Theme;
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        setThemeState(savedTheme);
      } else {
        // Check system preference
        const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        setThemeState(systemTheme);
      }
    } catch (error) {
      // Fallback to dark theme if localStorage is not available
      setThemeState('dark');
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      try {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(theme);
        localStorage.setItem('willow-theme', theme);
      } catch (error) {
        console.warn('Failed to apply theme:', error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-willow-dark">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
