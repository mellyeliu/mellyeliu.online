import React, { createContext, useContext, useState, useCallback, useRef } from "react";

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
  const zIndexRef = useRef(1);

  const getNextZIndex = useCallback(() => {
    zIndexRef.current += 1;
    return zIndexRef.current;
  }, []);

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
    getNextZIndex,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIContext;
