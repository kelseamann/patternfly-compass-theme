import * as React from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  // Always use dark theme
  const isDarkTheme = true;

  React.useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.add('pf-v6-theme-dark');
    localStorage.setItem('pf-theme', 'dark');
  }, []);

  const value = React.useMemo(() => ({ isDarkTheme }), [isDarkTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

