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

const FADE_DURATION = 250;

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
  const [factIndex, setFactIndex] = useState(() =>
    Math.floor(Math.random() * textOptions.length)
  );
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const transitionTimerRef = useRef(null);

  useEffect(() => {
    setCharIndex(0);
    setIsTyping(true);
    setCurrentFact("");
  }, [factIndex]);

  const advanceToNextFact = useCallback(() => {
    if (textOptions.length === 0) return;

    if (order) {
      setFactIndex((prev) => (prev + 1) % textOptions.length);
    } else {
      setFactIndex(Math.floor(Math.random() * textOptions.length));
    }
  }, [order, textOptions.length]);

  const finishTransition = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    advanceToNextFact();
    setIsVisible(true);
  }, [advanceToNextFact]);

  const startTransition = useCallback(() => {
    // Ignore extra clicks (or an autoplay tick) while a fade is in progress.
    // Otherwise, several delayed advances can race and leave the text hidden.
    if (transitionTimerRef.current !== null) return;

    setIsVisible(false);
    transitionTimerRef.current = setTimeout(
      finishTransition,
      FADE_DURATION
    );
  }, [finishTransition]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Browsers may pause timers while a tab is in the background. Complete
      // an interrupted fade as soon as the page is visible again.
      if (
        document.visibilityState === "visible" &&
        transitionTimerRef.current !== null
      ) {
        finishTransition();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [finishTransition]);

  useEffect(
    () => () => {
      if (transitionTimerRef.current !== null) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    let timer;

    if (!typing && isVisible) {
      timer = setTimeout(() => {
        startTransition();
      }, autoplaySpeed);

      return () => clearTimeout(timer);
    }

    if (!typing) return undefined;

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
    isVisible,
    startTransition,
  ]);

  const handleClick = useCallback(
    (event) => {
      if (event.target.tagName === "A") return;

      if (!typing) {
        startTransition();
      } else {
        setCurrentFact("");
        setCharIndex(0);
        setIsTyping(true);
        setIsPaused(false);
        advanceToNextFact();
      }
    },
    [typing, advanceToNextFact, startTransition]
  );

  const dynamicStyle = !typing
    ? {
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
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
