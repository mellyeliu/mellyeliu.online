import React, { useRef, useEffect, useState } from "react";

const SplitTextByWidth = ({
  text,
  maxWidth,
  backgroundColor,
  style,
  className,
}) => {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      // Split text by spaces or periods, preserving both spaces and periods
      const words = text.split(/(\s+|\.)/).filter(Boolean);
      const lines = [];
      let currentLine = "";
      let testLine = "";

      words.forEach((word, index) => {
        if (word === ".") {
          // If the word is a period, attach it to the next word
          if (index + 1 < words.length && words[index + 1].trim()) {
            word = word + words[index + 1];
            words[index + 1] = ""; // Clear the next word as it is now combined with the period
          }
        }

        testLine = currentLine + word;

        // Measure the test line width
        const span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";
        span.textContent = testLine;
        containerRef.current.appendChild(span);
        const testLineWidth = span.offsetWidth;
        containerRef.current.removeChild(span);

        if (testLineWidth > maxWidth && currentLine.trim()) {
          lines.push(currentLine.trim());
          currentLine = word.trim();
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }

      setLines(lines);
    }
  }, [text, maxWidth]);

  return (
    <div ref={containerRef} style={{ lineHeight: "1px", textAlign: "center" }}>
      {lines.map((line, index) => (
        <>
          {" "}
          <div key={index} style={style} className={className}>
            {line}
          </div>
          <span style={{ display: "block" }} />
        </>
      ))}
    </div>
  );
};

export default SplitTextByWidth;
