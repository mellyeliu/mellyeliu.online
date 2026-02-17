import React, { useEffect, useState } from "react";

/**
 * Lightweight Fade replacement for react-reveal/Fade.
 * Supports `duration` (ms), `delay` (ms), and `top` (slide-down entrance) props.
 */
const Fade = ({ children, duration = 1000, delay = 0, top = false }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate3d(0, 0, 0)"
      : top
        ? "translate3d(0, -20px, 0)"
        : "translate3d(0, 10px, 0)",
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
  };

  return <div style={style}>{children}</div>;
};

export default Fade;
