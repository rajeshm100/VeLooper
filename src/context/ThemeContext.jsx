import { createContext, useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEFAULT_THEME, normalizeTheme, themeColor } from '../utils/theme';

const ThemeContext = createContext({ theme: DEFAULT_THEME, setTheme: () => {} });

// Keeps the chosen theme in localStorage and writes it to <html data-theme="...">,
// which is what the CSS variables in styles/tokens.css react to.
export function ThemeProvider({ children }) {
  const [stored, setStored] = useLocalStorage('veloop:theme', DEFAULT_THEME);
  const theme = normalizeTheme(stored);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', themeColor[theme]);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme: (t) => setStored(normalizeTheme(t)) }), [theme, setStored]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
