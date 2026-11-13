import React, { createContext, useContext, useState, useRef, useMemo } from "react";

// The hover caption changes often, so it lives in its own context. Components
// that only need the (stable) actions don't re-render when it changes.
const CursorContext = createContext(null);
const UIActionsContext = createContext(null);

const useRequiredContext = (context, name) => {
  const value = useContext(context);
  if (value === null) {
    throw new Error(`${name} must be used within a UIProvider`);
  }
  return value;
};

export const useCursorString = () => useRequiredContext(CursorContext, "useCursorString");
export const useUIActions = () => useRequiredContext(UIActionsContext, "useUIActions");

export const UIProvider = ({ children }) => {
  const [cursorString, setCursorString] = useState("");
  const zIndexRef = useRef(1);

  const actions = useMemo(
    () => ({
      setCursorString,
      // Each call returns a higher z-index, so the last touched item is on top.
      getNextZIndex: () => ++zIndexRef.current,
    }),
    []
  );

  return (
    <UIActionsContext.Provider value={actions}>
      <CursorContext.Provider value={cursorString}>{children}</CursorContext.Provider>
    </UIActionsContext.Provider>
  );
};
