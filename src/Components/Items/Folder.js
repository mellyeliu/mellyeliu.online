import React, { useCallback } from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import { fonts } from "../../styles/tokens.stylex";

const styles = stylex.create({
  container: {
    position: "fixed",
    cursor: "pointer",
    right: 10,
    filter: "drop-shadow(0px 6px 6px rgba(0,0,0,0.4))",
    userSelect: "none",
    zIndex: 100,
    display: "block",
  },
  folder: {
    transform: {
      default: "scale(1)",
      "@media (max-width: 1024px)": "scale(1.05)",
    },
  },
  text: {
    fontSize: 30,
    color: "#111111",
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontWeight: 400,
    letterSpacing: {
      default: 0.5,
      [stylex.when.ancestor(":hover")]: 2,
    },
    transition: "letter-spacing 120ms ease",
  },
  textOpen: {
    fontWeight: 500,
  },
});

const Folder = ({
  scale = 1,
  y = 0,
  hoverString = "",
  onHoverChange,
  caption,
  isOpen = false,
  onOpen,
  image,
}) => {
  const handleClick = useCallback(() => {
    onOpen(!isOpen);
  }, [isOpen, onOpen]);

  const handleMouseEnter = useCallback(() => {
    onHoverChange(true, hoverString);
  }, [hoverString, onHoverChange]);

  const handleMouseLeave = useCallback(() => {
    onHoverChange(false, "");
  }, [onHoverChange]);

  const folderImage = image
    ? image
    : isOpen
    ? `${window.location.origin}/images/menu/folderNewOpen.png`
    : `${window.location.origin}/images/menu/folder.png`;

  return (
    <div
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      {...stylex.props(stylex.defaultMarker(), styles.container)}
      style={{
        top: y,
        transform: `scale(${scale})`,
      }}
    >
      <img
        src={folderImage}
        alt={caption || "folder"}
        draggable={false}
        {...stylex.props(styles.folder)}
      />
      {caption && (
        <div {...stylex.props(styles.text, isOpen && styles.textOpen)}>
          {caption}
        </div>
      )}
    </div>
  );
};

Folder.propTypes = {
  scale: PropTypes.number,
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hoverString: PropTypes.string,
  onHoverChange: PropTypes.func.isRequired,
  caption: PropTypes.string,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  image: PropTypes.string,
};

export default Folder;
