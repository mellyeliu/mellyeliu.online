import React from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";

const Folder = ({
  scale,
  y,
  hoverString,
  onHoverChange,
  caption,
  isOpen,
  onOpen,
  image,
}) => {
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
    folderIcon: {
      // Base styles for folderIcon
    },
    folder: {
      transform: {
        default: "scale(1)",
        "@media (max-width: 1024px)": "scale(1.05)",
      },
    },
    text: {
      fontSize: "30px",
      color: "#111111",
      fontFamily: "Cormorant Garamond",
      fontStyle: "italic",
      fontWeight: 400,
    },
    textOpen: {
      fontWeight: "500",
    },
    textClosed: {
      fontWeight: "400",
    },
    textSpacing: {
      letterSpacing: {
        default: "0.5px",
        [stylex.when.ancestor(":hover")]: "2px",
      },
      transition: "letter-spacing 120ms ease",
    },
  });
  const handleClick = () => {
    onOpen(!isOpen);
  };

  const onHover = () => {
    onHoverChange(true, hoverString);
  };

  const stopHover = () => {
    onHoverChange(false, "");
  };

  return (
    <div
      onClick={handleClick}
      {...stylex.props(
        stylex.defaultMarker(),
        styles.container,
        styles.folderIcon
      )}
      onMouseLeave={stopHover}
      onMouseEnter={onHover}
      style={{
        top: y,
        transform: `scale(${scale})`,
      }}
    >
      <img
        src={
          image
            ? image
            : isOpen
            ? window.location.origin + "/images/menu/folderNewOpen.png"
            : window.location.origin + "/images/menu/folder.png"
        }
        // onMouseLeave={stopHover}
        // onMouseEnter={onHover}
        {...stylex.props(styles.folder)}
        draggable={false}
      />
      {caption && (
        <div
          {...stylex.props(
            styles.text,
            isOpen ? styles.textOpen : styles.textClosed,
            styles.textSpacing
          )}
        >
          {caption}
        </div>
      )}{" "}
    </div>
  );
};

export default Folder;

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
