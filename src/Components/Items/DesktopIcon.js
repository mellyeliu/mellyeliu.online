import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import SplitTextByWidth from "../Utils/SplitTextByWidth";
import { useMediaQuery } from "react-responsive";
import useDraggable from "../../hooks/useDraggable";
import { useUI } from "../../context/UIContext";
import IconBoundsData from "../../Data/IconBoundsData";
import * as stylex from "@stylexjs/stylex";
import { radii } from "../../styles/tokens.stylex";

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
  imageShadow: {
    boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
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
  onHoverChange = () => {},
  hoverString = "",
  border = false,
  iconText,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const { setCursorString, getNextZIndex } = useUI();

  const [localZIndex, setLocalZIndex] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isImageReady, setIsImageReady] = useState(!src);

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const clickTimerRef = useRef(null);

  const { isDragging, isReady, handleDragStart, getPixelPosition } =
    useDraggable({
      initialX: x,
      initialY: y,
      onDragStart: () => {
        const newZ = getNextZIndex();
        setLocalZIndex(newZ);
        setIsClicked(true);
      },
      onDragEnd: () => {
        if (onHoverChange) {
          onHoverChange(false, "");
        }
      },
    });

  useEffect(() => {
    setIsImageReady(!src);
  }, [src]);

  const handleImageLoad = useCallback((event) => {
    const image = event.currentTarget;
    const reveal = () => setIsImageReady(true);

    if (typeof image.decode === "function") {
      image.decode().then(reveal, reveal);
    } else {
      reveal();
    }
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (!event) return;
    const clickedImage =
      imageRef.current && imageRef.current.contains(event.target);
    const clickedText =
      textRef.current && textRef.current.contains(event.target);
    if (!clickedImage && !clickedText) {
      setIsClicked(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleClick = useCallback(() => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);
    setIsClicked(true);

    const newZ = getNextZIndex();
    setLocalZIndex(newZ);

    clickTimerRef.current = setTimeout(() => {
      if (newCount >= 2 && url) {
        const uniqueName = `popupWindow_${Date.now()}`;
        window.open(url, uniqueName);
      }
      setClickCount(0);
    }, 300);
  }, [clickCount, url, getNextZIndex]);

  const handleMouseEnter = useCallback(() => {
    if (!border) {
      setCursorString("double click me!");
    }
    if (onHoverChange) {
      onHoverChange(true, hoverString);
    }
  }, [border, hoverString, onHoverChange, setCursorString]);

  const handleMouseLeave = useCallback(() => {
    setCursorString("");
    if (onHoverChange) {
      onHoverChange(false, "");
    }
  }, [onHoverChange, setCursorString]);

  const imageBounds =
    IconBoundsData[new URL(src, window.location.origin).pathname] || [0, 0, 0, 0];
  const isActive = isDragging || isClicked;
  const pixelPos = getPixelPosition();

  if (!isReady) {
    return null;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div
        {...stylex.props(styles.group)}
        style={{
          left: pixelPos.left,
          top: pixelPos.top,
          zIndex: localZIndex,
          opacity: isImageReady ? 1 : 0,
          transition: "opacity 160ms ease-out",
        }}
        aria-busy={!isImageReady}
        onMouseDown={handleDragStart}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <div
          ref={imageRef}
          {...stylex.props(
            styles.imageFrame,
            isMobile ? styles.imageMobile : styles.imageDesktop
          )}
        >
          <img
            src={src}
            alt={iconText}
            draggable={false}
            decoding="async"
            onLoad={handleImageLoad}
            onError={() => setIsImageReady(true)}
            {...stylex.props(styles.image, border && styles.imageShadow)}
          />
          {isActive && src && (
            <span
              aria-hidden="true"
              {...stylex.props(styles.selectionOutline)}
              style={{
                left: `calc(${imageBounds[0]}% - 9px)`,
                top: `calc(${imageBounds[1]}% - 9px)`,
                right: `calc(${imageBounds[2]}% - 9px)`,
                bottom: `calc(${imageBounds[3]}% - 9px)`,
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
  onHoverChange: PropTypes.func,
  hoverString: PropTypes.string,
  border: PropTypes.bool,
  iconText: PropTypes.string.isRequired,
};

export default DesktopIcon;
