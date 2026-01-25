import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import SplitTextByWidth from "../Utils/SplitTextByWidth";
import { useMediaQuery } from "react-responsive";
import useDraggable from "../../hooks/useDraggable";
import { useUI } from "../../context/UIContext";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, radii, fontSizes } from "../../styles/tokens.stylex";

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
  imageActive: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.white,
  },
  text: {
    fontWeight: 600,
    color: colors.white,
    fontFamily: fonts.arimo,
    lineHeight: "14px",
    filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.3))",
    textShadow: "0px 3px 3px rgba(0,0,0,0.4)",
    letterSpacing: "0.5px",
    borderRadius: radii.sm,
    paddingTop: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    display: "inline-block",
  },
  textMobile: {
    fontSize: fontSizes.md,
  },
  textDesktop: {
    fontSize: fontSizes.base,
  },
  textActive: {
    backgroundImage: "none",
    backgroundColor: colors.accentBlue,
  },
});

const DesktopIcon = ({
  src,
  url = "",
  x,
  y,
  isGridLayout = false,
  onHoverChange = () => {},
  hoverString = "",
  border = false,
  triggerResize = false,
  iconText,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const { setCursorString, getNextZIndex } = useUI();

  const [localZIndex, setLocalZIndex] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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
        }}
        onMouseDown={handleDragStart}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <img
          src={src}
          alt={iconText}
          ref={imageRef}
          draggable={false}
          {...stylex.props(
            styles.image,
            isMobile ? styles.imageMobile : styles.imageDesktop,
            border && styles.imageShadow,
            isActive && styles.imageActive
          )}
        />
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
  isGridLayout: PropTypes.bool,
  onHoverChange: PropTypes.func,
  hoverString: PropTypes.string,
  border: PropTypes.bool,
  triggerResize: PropTypes.bool,
  iconText: PropTypes.string.isRequired,
};

export default DesktopIcon;
