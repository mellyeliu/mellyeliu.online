import React, { createContext, useContext, useState, useCallback } from "react";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  CUSTOM: "custom",
};

const themeList = Object.values(THEMES);

const ThemeContext = createContext({
  theme: THEMES.LIGHT,
  setTheme: () => {},
  cycleTheme: () => {},
  fullScreen: true,
  toggleFullScreen: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(THEMES.LIGHT);
  const [fullScreen, setFullScreen] = useState(true);

  const setTheme = useCallback((newTheme) => {
    if (themeList.includes(newTheme)) {
      setThemeState(newTheme);
    }
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const currentIndex = themeList.indexOf(current);
      const nextIndex = (currentIndex + 1) % themeList.length;
      return themeList[nextIndex];
    });
  }, []);

  const toggleFullScreen = useCallback(() => {
    setFullScreen((prev) => !prev);
  }, []);

  const value = {
    theme,
    setTheme,
    cycleTheme,
    fullScreen,
    toggleFullScreen,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext };
export default ThemeContext;
