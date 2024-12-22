import React, { useState, useEffect, useContext } from "react";
import { selfFacts } from "../../Data/QuotesData";
import { ThemeContext } from "../../ThemeContext";
import { Fade } from "react-reveal";

const TextList = ({
  style,
  wrapper = true,
  textOptions = selfFacts,
  speed = 50,
  autoplaySpeed = 10000,
  order = false,
  typing = true,
  links = [],
}) => {
  const [currentFact, setCurrentFact] = useState("");
  const [factIndex, setFactIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [reset, setReset] = useState(false);
  const { cursorString, setCursorString } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Ensure charIndex is reset to start typing the new fact from the beginning
    setCharIndex(0);
    setIsTyping(true);
    // Reset visibility and animation states if needed
    setIsVisible(false);
    setShouldAnimate(false);
    // Reset currentFact to start displaying the new fact
    setCurrentFact("");

    // This effect runs every time factIndex changes, ensuring textOptions[factIndex] accesses the updated factIndex
  }, [factIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Start fade-in
      setShouldAnimate(true);
    }, 150); // Short delay to trigger fade-in effect

    return () => clearTimeout(timer); // Clean up the timer on component unmount or before the next effect
  }, [factIndex]);

  const styles =
    typing === false
      ? {
          transition: shouldAnimate ? "opacity 1s ease-in-out" : "none",
          opacity: isVisible ? 1 : 0,
        }
      : {};

  const handleHoverChange = () => {
    if (cursorString === "") {
      setCursorString("click for more!");
    } else {
      setCursorString("");
    }
  };

  useEffect(() => {
    let typingInterval;

    if (reset) {
      if (typing) {
        setIsVisible(false); // Start fade-out
        setShouldAnimate(false);
      }
      setCurrentFact("");
      setCharIndex(0);
      setIsTyping(true);
      setIsPaused(false);
      setReset(false);
      return;
    }

    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, autoplaySpeed);
      return () => clearTimeout(pauseTimeout);
    }

    if (isTyping) {
      typingInterval = setInterval(() => {
        if (charIndex < textOptions[factIndex].length) {
          setCurrentFact((prev) => prev + textOptions[factIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsTyping(false);
          setIsPaused(true);
        }
      }, speed);
    } else {
      typingInterval = setInterval(() => {
        if (charIndex >= 0) {
          setCurrentFact((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          setReset(true);
          order
            ? setFactIndex((prev) => (prev + 1) % textOptions.length)
            : setFactIndex(Math.floor(Math.random() * textOptions.length));
          setIsTyping(true);
        }
      }, speed);
    }

    return () => clearInterval(typingInterval);
  }, [charIndex, isTyping, isPaused, reset]);

  const handleClick = (event) => {
    if (event.target.tagName !== "A") {
      setIsVisible(false); // Start fade-out
      setShouldAnimate(false); // Reset animation state
      setReset(true);
      order
        ? setFactIndex((prev) => (prev + 1) % textOptions.length)
        : setFactIndex(Math.floor(Math.random() * textOptions.length));
    }
  };

  return (
    <span
      style={{
        ...style,
        cursor: "pointer",
        ...styles,
      }}
      onClick={handleClick}
      onMouseEnter={handleHoverChange}
      onMouseLeave={handleHoverChange}
      className="hvr-line"
    >
      {typing === false
        ? wrapper === true
          ? "( " + textOptions[factIndex] + " [...]" + " )"
          : textOptions[factIndex]
        : wrapper === true
        ? "( " + currentFact + " [...]" + " )"
        : currentFact}
      &nbsp;
      {links.length > 0 && (
        <a
          className="hvr-line"
          href={links[factIndex]}
          target="_blank"
          rel="noreferrer"
        >
          [*]
        </a>
      )}
    </span>
  );
};

export default TextList;
