import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

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
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 1000000000000000,
        fontSize: "16px",
        color: "black",
        fontStyle: "italic",
        display: "none",
        left: `${position.x}px`,
        textShadow:
          "1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
        top: `${position.y}px`,
        transform: "translate(10px, -25px)", // Offset the text from the mouse pointer
      }}
    >
      {cursorString}
    </div>
  );
};

export default CustomCursor;
