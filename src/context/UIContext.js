import React, { createContext, useContext, useState, useCallback } from "react";

const UIContext = createContext(null);

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

export const UIProvider = ({ children }) => {
  const [cursorString, setCursorString] = useState("");
  const [globalZIndex, setGlobalZIndex] = useState(1);

  const getNextZIndex = useCallback(() => {
    setGlobalZIndex((prev) => prev + 1);
    return globalZIndex + 1;
  }, [globalZIndex]);

  const handleHover = useCallback((isHovering, hoverString = "") => {
    setCursorString(isHovering ? hoverString : "");
  }, []);

  const clearCursor = useCallback(() => {
    setCursorString("");
  }, []);

  const value = {
    cursorString,
    setCursorString,
    handleHover,
    clearCursor,
    globalZIndex,
    getNextZIndex,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIContext;
