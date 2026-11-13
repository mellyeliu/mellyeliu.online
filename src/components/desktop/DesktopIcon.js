import React, { memo, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import SplitTextByWidth from "./SplitTextByWidth";
import useDraggable from "../../hooks/useDraggable";
import useIsMobile from "../../hooks/useIsMobile";
import { useUIActions } from "../../context/UIContext";
import whenDecoded from "../../utils/whenDecoded";
import { radii } from "../../styles/tokens.stylex";

const DOUBLE_CLICK_DELAY = 300;
const NO_BOUNDS = [0, 0, 0, 0];

const styles = stylex.create({
  container: {
    width: "auto",
    height: "auto",
    textAlign: "center",
  },
  group: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    userSelect: "none",
    gap: 10,
  },
  imageFrame: {
    position: "relative",
  },
  selectionOutline: {
    position: "absolute",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ffffff",
    borderRadius: 1.5,
    pointerEvents: "none",
    filter: "drop-shadow(0px 6px 5px rgba(0,0,0,0.5))",
  },
  image: {
    cursor: "grab",
    display: "block",
    borderRadius: radii.md,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    filter: "drop-shadow(0px 6px 5px rgba(0,0,0,0.5))",
    userSelect: "none",
  },
  imageDesktop: {
    width: "clamp(100px, 3vw, 122px)",
    height: "clamp(100px, 3vw, 122px)",
  },
  imageMobile: {
    width: 85,
    height: 85,
  },
});

const DesktopIcon = ({
  src,
  url = "",
  x,
  y,
  onHoverChange,
  hoverString = "",
  iconText,
  bounds = NO_BOUNDS,
}) => {
  const isMobile = useIsMobile();
  const { getNextZIndex } = useUIActions();

  const [zIndex, setZIndex] = useState(1);
  const [isSelected, setIsSelected] = useState(false);
  const [readySrc, setReadySrc] = useState(null);
  const isImageReady = !src || readySrc === src;

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const bringToFront = () => {
    setZIndex(getNextZIndex());
    setIsSelected(true);
  };

  const { isDragging, isReady, handleDragStart, pixelPosition } = useDraggable({
    initialX: x,
    initialY: y,
    onDragStart: bringToFront,
    onDragEnd: () => onHoverChange(false, ""),
  });

  // Deselect when clicking anywhere outside the icon.
  useEffect(() => {
    const handleMouseDown = (event) => {
      if (
        !imageRef.current?.contains(event.target) &&
        !textRef.current?.contains(event.target)
      ) {
        setIsSelected(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  useEffect(() => () => clearTimeout(clickTimerRef.current), []);

  // Double click opens the link in a new window.
  const handleClick = () => {
    clearTimeout(clickTimerRef.current);
    clickCountRef.current += 1;
    bringToFront();

    clickTimerRef.current = setTimeout(() => {
      if (clickCountRef.current >= 2 && url) {
        window.open(url, `popupWindow_${Date.now()}`);
      }
      clickCountRef.current = 0;
    }, DOUBLE_CLICK_DELAY);
  };

  const handleImageLoad = (event) => {
    whenDecoded(event.currentTarget, () => setReadySrc(src));
  };

  if (!isReady) {
    return null;
  }

  const isActive = isDragging || isSelected;

  return (
    <div {...stylex.props(styles.container)}>
      <div
        {...stylex.props(styles.group)}
        style={{
          ...pixelPosition,
          zIndex,
          opacity: isImageReady ? 1 : 0,
          transition: "opacity 160ms ease-out",
        }}
        aria-busy={!isImageReady}
        onMouseDown={handleDragStart}
        onClick={handleClick}
        onMouseEnter={() => onHoverChange(true, hoverString)}
        onMouseLeave={() => onHoverChange(false, "")}
      >
        <div
          ref={imageRef}
          {...stylex.props(styles.imageFrame, isMobile ? styles.imageMobile : styles.imageDesktop)}
        >
          <img
            src={src}
            alt={iconText}
            draggable={false}
            decoding="async"
            onLoad={handleImageLoad}
            onError={() => setReadySrc(src)}
            {...stylex.props(styles.image)}
          />
          {isActive && src && (
            <span
              aria-hidden="true"
              {...stylex.props(styles.selectionOutline)}
              style={{
                left: `calc(${bounds[0]}% - 9px)`,
                top: `calc(${bounds[1]}% - 9px)`,
                right: `calc(${bounds[2]}% - 9px)`,
                bottom: `calc(${bounds[3]}% - 9px)`,
              }}
            />
          )}
        </div>
        <div ref={textRef}>
          <SplitTextByWidth
            text={iconText}
            maxWidth={isMobile ? 75 : 80}
            style={{
              fontWeight: 600,
              color: "white",
              fontFamily: "Arimo",
              lineHeight: "14px",
              filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.3))",
              textShadow: "0px 3px 3px rgba(0,0,0,0.4)",
              letterSpacing: "0.5px",
              borderRadius: "2px",
              padding: "2px",
              display: "inline-block",
              fontSize: isMobile ? 14 : 15,
              backgroundColor: isActive ? "#3443eb" : "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
};

DesktopIcon.propTypes = {
  src: PropTypes.string.isRequired,
  url: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onHoverChange: PropTypes.func.isRequired,
  hoverString: PropTypes.string,
  iconText: PropTypes.string.isRequired,
  // Transparent padding around the artwork, as [left, top, right, bottom] percentages,
  // so the selection outline hugs the visible image.
  bounds: PropTypes.arrayOf(PropTypes.number),
};

export default memo(DesktopIcon);
