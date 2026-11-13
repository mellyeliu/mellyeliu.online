import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import useDraggable from "../../hooks/useDraggable";
import useIsMobile from "../../hooks/useIsMobile";
import { useUIActions } from "../../context/UIContext";

const MOBILE_SCALE = 0.85;

const styles = stylex.create({
  container: {
    width: "auto",
    height: "auto",
    textAlign: "center",
    overflow: "hidden",
  },
  window: {
    cursor: "grab",
    position: "absolute",
    filter: "drop-shadow(8px 8px 10px rgba(0,0,0,0.3))",
    boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
    userSelect: "none",
    borderRadius: 20,
    transition: "transform 0.3s ease-in-out",
    transformOrigin: "top left",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
});

// Natural size of the window image, scaled down on mobile. Null until loaded.
const useImageSize = (src, isMobile) => {
  const key = `${src}|${isMobile}`;
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled) return;
      const scale = isMobile ? MOBILE_SCALE : 1;
      setLoaded({ key, size: { width: `${image.width * scale}px`, height: `${image.height * scale}px` } });
    };
    image.onerror = () => {
      if (!cancelled) setLoaded({ key, size: { width: "auto", height: "auto" } });
    };
    image.src = src;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [key, src, isMobile]);

  return loaded?.key === key ? loaded.size : null;
};

// A draggable "window" on the desktop: an image with optional content on top.
const Popup = ({ src, x, y, onHoverChange, hoverString = "", content = null }) => {
  const isMobile = useIsMobile();
  const { getNextZIndex } = useUIActions();
  const [zIndex, setZIndex] = useState(1);
  const imageSize = useImageSize(src, isMobile);

  const { isReady, handleDragStart, pixelPosition } = useDraggable({
    initialX: x,
    initialY: y,
    onDragStart: () => setZIndex(getNextZIndex()),
    onDragEnd: () => onHoverChange(false, ""),
  });

  return (
    <div {...stylex.props(styles.container)}>
      {isReady && imageSize && (
        <div
          className={`${stylex.props(styles.window).className} draggableImage`}
          style={{
            ...pixelPosition,
            zIndex,
            backgroundImage: `url(${src})`,
            ...imageSize,
          }}
          onMouseDown={handleDragStart}
          onMouseEnter={() => onHoverChange(true, hoverString)}
          onMouseLeave={() => onHoverChange(false, "")}
        >
          {content}
        </div>
      )}
    </div>
  );
};

Popup.propTypes = {
  src: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onHoverChange: PropTypes.func.isRequired,
  hoverString: PropTypes.string,
  content: PropTypes.node,
};

export default memo(Popup);
