import React, { useState, useEffect, useContext } from "react";
import { selfFacts } from "../../Data/QuotesData";
import { ThemeContext } from "../../ThemeContext";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  hvrLine: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
  },
});

const TextList = ({
  style,
  xstyle,
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
  useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setCharIndex(0);
    setIsTyping(true);
    setIsVisible(false);
    setCurrentFact("");
  }, [factIndex]);

  useEffect(() => {
    setShouldAnimate(true);
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setIsVisible(true);
      });
      (window.__textlist_raf2_ids || (window.__textlist_raf2_ids = [])).push(
        raf2
      );
    });

    return () => {
      cancelAnimationFrame(raf1);
      const ids = window.__textlist_raf2_ids || [];
      while (ids.length) cancelAnimationFrame(ids.pop());
    };
  }, [factIndex]);

  useEffect(() => {
    let typingInterval;

    if (typing === false) {
      const showTimer = setTimeout(() => {
        setShouldAnimate(true);
        setIsVisible(false);
        const switchTimer = setTimeout(() => {
          order
            ? setFactIndex((prev) => (prev + 1) % textOptions.length)
            : setFactIndex(Math.floor(Math.random() * textOptions.length));
        }, 250);
        return () => clearTimeout(switchTimer);
      }, autoplaySpeed);

      return () => clearTimeout(showTimer);
    }

    if (reset) {
      setIsVisible(false);
      setShouldAnimate(false);
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
      if (typing === false) {
        setShouldAnimate(true);
        setIsVisible(false);
        setTimeout(() => {
          order
            ? setFactIndex((prev) => (prev + 1) % textOptions.length)
            : setFactIndex(Math.floor(Math.random() * textOptions.length));
        }, 250);
      } else {
        setIsVisible(false);
        setShouldAnimate(false);
        setReset(true);
        order
          ? setFactIndex((prev) => (prev + 1) % textOptions.length)
          : setFactIndex(Math.floor(Math.random() * textOptions.length));
      }
    }
  };

  // Dynamic styles that need runtime values
  const dynamicStyle =
    typing === false
      ? {
          transition: shouldAnimate ? "opacity 0.25s ease-in-out" : "none",
          opacity: isVisible ? 1 : 0,
        }
      : {};

  return (
    <span
      {...stylex.props(styles.hvrLine, xstyle)}
      style={{ ...style, ...dynamicStyle, cursor: "pointer" }}
      onClick={handleClick}
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
          {...stylex.props(styles.hvrLine)}
          href={links[factIndex]}
          target="_blank"
          rel="noopener noreferrer"
        >
          [*]
        </a>
      )}
    </span>
  );
};

export default TextList;
