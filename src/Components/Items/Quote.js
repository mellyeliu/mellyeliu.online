import React, { useState, useRef, useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { quotes } from "../../Data/QuotesData";
import { colors, fonts, fontSizes } from "../../styles/tokens.stylex";

const styles = stylex.create({
  quoteIcon: {
    width: 28,
    height: 28,
    position: "absolute",
    left: 0,
    top: 3,
  },
  quotePanel: {
    padding: 14,
    backgroundColor: colors.bgGray,
    borderTopWidth: 0.5,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0, 0, 0, 0.15)",
    fontFamily: fonts.serif,
    boxSizing: "border-box",
    textAlign: "left",
  },
  quoteText: {
    margin: 0,
    position: "relative",
    paddingLeft: 40,
    content: {
      "::before": "none",
    },
    fontSize: fontSizes.base,
    fontStyle: "italic",
    lineHeight: 1.5,
    letterSpacing: 0,
    color: colors.black,
    transitionProperty: "opacity",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },
  quoteAdvance: {
    cursor: "pointer",
  },
  quoteSource: {
    color: colors.black,
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  quoteReference: {
    verticalAlign: "super",
    fontSize: "0.65em",
    lineHeight: 0,
  },
});

const shuffleQuotes = (previousQuote) => {
  const order = quotes.map((_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  if (order.length > 1 && order[0] === previousQuote) {
    const swapIndex = 1 + Math.floor(Math.random() * (order.length - 1));
    [order[0], order[swapIndex]] = [order[swapIndex], order[0]];
  }
  return order;
};

const Quote = () => {
  const quotePanelRef = useRef(null);
  const [quoteOrder, setQuoteOrder] = useState(() => shuffleQuotes());
  const [quoteIndex, setQuoteIndex] = useState(0);
  const currentQuote = quotes[quoteOrder[quoteIndex]];
  const [isQuoteFading, setIsQuoteFading] = useState(false);
  const advanceQuote = () => {
    setIsQuoteFading(true);
  };

  useEffect(() => {
    if (!isQuoteFading) return undefined;

    const timer = setTimeout(() => {
      if (quoteIndex === quoteOrder.length - 1) {
        setQuoteOrder(shuffleQuotes(quoteOrder[quoteIndex]));
        setQuoteIndex(0);
      } else {
        setQuoteIndex(quoteIndex + 1);
      }
      setIsQuoteFading(false);
    }, 140);

    return () => clearTimeout(timer);
  }, [isQuoteFading, quoteIndex, quoteOrder]);

  useEffect(() => {
    const panel = quotePanelRef.current;
    if (!panel) return undefined;

    let scrollDistance = 0;
    let lastChange = -Infinity;
    const handleWheel = (event) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      event.preventDefault();

      const now = performance.now();
      if (now - lastChange < 500) return;

      const delta = event.deltaMode === 1
        ? event.deltaY * 16
        : event.deltaMode === 2
          ? event.deltaY * panel.clientHeight
          : event.deltaY;
      scrollDistance += Math.abs(delta);
      if (scrollDistance < 40) return;

      scrollDistance = 0;
      lastChange = now;
      setIsQuoteFading(true);
    };

    panel.addEventListener("wheel", handleWheel, { passive: false });
    return () => panel.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div ref={quotePanelRef} {...stylex.props(styles.quotePanel)}>
      <blockquote
        {...stylex.props(styles.quoteText)}
        style={{ opacity: isQuoteFading ? 0 : 1 }}
        aria-live="polite"
      >
        <span
          role="button"
          tabIndex={0}
          onClick={advanceQuote}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              advanceQuote();
            }
          }}
          {...stylex.props(styles.quoteAdvance)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeLinejoin="round"
            aria-hidden="true"
            {...stylex.props(styles.quoteIcon)}
          >
            <path d="M3 20h7v-8H6c0-3 1-5 4-7L8 3c-4 2-5 5-5 9v8Z M14 20h7v-8h-4c0-3 1-5 4-7l-2-2c-4 2-5 5-5 9v8Z" />
          </svg>
          {currentQuote[0]}
        </span>{" "}
        <a
          href={currentQuote[1]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read quote source"
          {...stylex.props(styles.quoteSource)}
        >
          <sup {...stylex.props(styles.quoteReference)}>[ref]</sup>
        </a>
      </blockquote>
    </div>
  );
};

export default Quote;
