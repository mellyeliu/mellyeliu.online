import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  cursor: {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 1000000000000000,
    fontSize: 16,
    color: "black",
    fontStyle: "italic",
    display: "none",
    textShadow:
      "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
    transform: "translate(10px, -25px)",
  },
});

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { cursorString } = useContext(ThemeContext);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      {...stylex.props(styles.cursor)}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {cursorString}
    </div>
  );
};

export default CustomCursor;
