import React, { useState } from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import { fonts } from "../../styles/tokens.stylex";
import whenDecoded from "../../utils/whenDecoded";

const FOLDER_IMAGE = "/images/menu/folder.png";
const FOLDER_OPEN_IMAGE = "/images/menu/folderNewOpen.png";

const styles = stylex.create({
  container: {
    position: "fixed",
    cursor: "pointer",
    right: 10,
    filter: "drop-shadow(0px 6px 6px rgba(0,0,0,0.4))",
    userSelect: "none",
    zIndex: 100,
    display: "block",
    width: 128,
  },
  caption: {
    display: "flex",
    justifyContent: "center",
    whiteSpace: "nowrap",
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
}) => {
  const folderImage = isOpen ? FOLDER_OPEN_IMAGE : FOLDER_IMAGE;
  // The folder fades in once its current image (open or closed) is decoded.
  const [readyImage, setReadyImage] = useState(null);
  const isImageReady = readyImage === folderImage;

  const handleImageLoad = (event) => {
    whenDecoded(event.currentTarget, () => setReadyImage(folderImage));
  };

  return (
    <div
      onClick={() => onOpen(!isOpen)}
      onMouseEnter={() => onHoverChange(true, hoverString)}
      onMouseLeave={() => onHoverChange(false, "")}
      {...stylex.props(stylex.defaultMarker(), styles.container)}
      style={{
        top: y,
        transform: `scale(${scale})`,
        opacity: isImageReady ? 1 : 0,
        transition: "opacity 160ms ease-out",
      }}
      aria-busy={!isImageReady}
    >
      <img
        src={folderImage}
        alt={caption || "folder"}
        draggable={false}
        decoding="async"
        onLoad={handleImageLoad}
        onError={() => setReadyImage(folderImage)}
        {...stylex.props(styles.folder)}
      />
      {caption && (
        <div {...stylex.props(styles.caption)}>
          <div {...stylex.props(styles.text, isOpen && styles.textOpen)}>{caption}</div>
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
};

export default Folder;
