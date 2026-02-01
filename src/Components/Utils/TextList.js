import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { selfFacts } from "../../Data/QuotesData";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  hvrLine: {
    textDecoration: "none",
    color: "black",
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
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const rafRef = useRef(null);

  useEffect(() => {
    setCharIndex(0);
    setIsTyping(true);
    setIsVisible(false);
    setCurrentFact("");
  }, [factIndex]);

  useEffect(() => {
    setShouldAnimate(true);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [factIndex]);

  const advanceToNextFact = useCallback(() => {
    if (order) {
      setFactIndex((prev) => (prev + 1) % textOptions.length);
    } else {
      setFactIndex(Math.floor(Math.random() * textOptions.length));
    }
  }, [order, textOptions.length]);

  useEffect(() => {
    let timer;

    if (!typing) {
      timer = setTimeout(() => {
        setShouldAnimate(true);
        setIsVisible(false);
        setTimeout(advanceToNextFact, 250);
      }, autoplaySpeed);

      return () => clearTimeout(timer);
    }

    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsTyping(false);
      }, autoplaySpeed);
      return () => clearTimeout(timer);
    }

    if (isTyping) {
      timer = setInterval(() => {
        if (charIndex < textOptions[factIndex].length) {
          setCurrentFact((prev) => prev + textOptions[factIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        } else {
          setIsTyping(false);
          setIsPaused(true);
        }
      }, speed);
    } else {
      timer = setInterval(() => {
        if (charIndex >= 0) {
          setCurrentFact((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else {
          advanceToNextFact();
          setIsTyping(true);
        }
      }, speed);
    }

    return () => clearInterval(timer);
  }, [
    charIndex,
    isTyping,
    isPaused,
    typing,
    autoplaySpeed,
    speed,
    factIndex,
    textOptions,
    advanceToNextFact,
  ]);

  const handleClick = useCallback(
    (event) => {
      if (event.target.tagName === "A") return;

      if (!typing) {
        setShouldAnimate(true);
        setIsVisible(false);
        setTimeout(advanceToNextFact, 250);
      } else {
        setIsVisible(false);
        setShouldAnimate(false);
        setCurrentFact("");
        setCharIndex(0);
        setIsTyping(true);
        setIsPaused(false);
        advanceToNextFact();
      }
    },
    [typing, advanceToNextFact]
  );

  const dynamicStyle = !typing
    ? {
        transition: shouldAnimate ? "opacity 0.25s ease-in-out" : "none",
        opacity: isVisible ? 1 : 0,
      }
    : {};

  const displayText = typing ? currentFact : textOptions[factIndex];
  const formattedText = wrapper ? `( ${displayText} [...] )` : displayText;

  return (
    <span
      {...stylex.props(xstyle)}
      style={{ ...style, ...dynamicStyle, cursor: "pointer" }}
      onClick={handleClick}
    >
      {formattedText}
      &nbsp;
      {links.length > 0 && links[factIndex] && (
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

TextList.propTypes = {
  style: PropTypes.object,
  xstyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  wrapper: PropTypes.bool,
  textOptions: PropTypes.arrayOf(PropTypes.string),
  speed: PropTypes.number,
  autoplaySpeed: PropTypes.number,
  order: PropTypes.bool,
  typing: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.string),
};

export default TextList;
