import React from "react";
import PropTypes from "prop-types";
import useIsMobile from "../../hooks/useIsMobile";

// Building blocks for the text shown inside desktop windows (see data/WindowData.js).

export function CustomLink({ text, href, color = "#B666BA" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "underline",
        pointerEvents: "auto",
        color,
      }}
      onMouseOver={(e) => (e.currentTarget.style.letterSpacing = "1px")}
      onMouseOut={(e) => (e.currentTarget.style.letterSpacing = "0px")}
    >
      {text}
    </a>
  );
}

CustomLink.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export function ContentBlock({
  content,
  textAlign = "left",
  padding = "165px 20px",
  fontSize = 22,
}) {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        color: "#222",
        fontSize: isMobile ? fontSize * 0.9 : fontSize,
        textAlign,
        lineHeight: isMobile ? "1.05" : "1.15",
        padding: isMobile ? "155px 20px" : padding,
        letterSpacing: -0.1,
        fontFamily: "Helvetica",
        zIndex: 1000000,
        pointerEvents: "none",
      }}
    >
      {content}
    </div>
  );
}

ContentBlock.propTypes = {
  content: PropTypes.node.isRequired,
  textAlign: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.number,
};
