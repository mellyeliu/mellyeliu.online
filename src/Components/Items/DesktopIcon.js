import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SplitTextByWidth from "../Utils/SplitTextByWidth";
import { useMediaQuery } from "react-responsive";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, radii, fontSizes } from "../../styles/tokens.stylex";

const DesktopIcon = ({
  src,
  url,
  x,
  y,
  isGridLayout,
  onHoverChange,
  hoverString,
  border,
  zIndex,
  setZIndex,
  setShowCursor,
  triggerResize,
  iconText,
}) => {
  // Local z-index state for this specific icon
  const [localZIndex, setLocalZIndex] = useState(zIndex);
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const [position, setPosition] = useState({ x: x, y: y });
  const [dragging, setDragging] = useState(false);
  const minWidth = 900;
  const [width, setWidth] = useState(minWidth);
  const [isWidthCalculated, setIsWidthCalculated] = useState(false);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const dragRef = useRef(null); // Track drag state across fast movements

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
      width: "85px",
      height: "85px",
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

  useEffect(() => {
    const handleResize = () => {
      const divs = document.getElementsByClassName("hover-container");
      if (divs.length > 0) {
        const divWidth = divs[0].clientWidth;
        const newWidth = Math.max(divWidth, minWidth);
        setWidth(newWidth);
        setIsWidthCalculated(true);
      }
    };

    // Calculate initial width
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isWidthCalculated) {
      handleResize();
    }
  }, [triggerResize, isWidthCalculated]);

  let timer = 0;
  const delay = 300;
  const [clickCount, setClickCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleResize = () => {
    const divs = document.getElementsByClassName("hover-container");
    if (divs.length > 0) {
      const divWidth = divs[0].clientWidth;
      setWidth(Math.max(divWidth, minWidth));
    }
  };

  const handleClickOutside = (event) => {
    if (!event) return;
    setIsClicked(false);
    if (imageRef.current && !imageRef.current.contains(event.target)) {
      setIsClicked(false);
    }
    if (textRef.current && !textRef.current.contains(event.target)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openPopupOnDoubleClick = () => {
    clearTimeout(timer);
    setClickCount(clickCount + 1);
    setIsClicked(true);

    // Bring element to front on click
    const newZIndex = zIndex + 1;
    setZIndex(newZIndex);
    setLocalZIndex(newZIndex);

    timer = setTimeout(() => {
      if (clickCount === 1) {
        if (url) {
          const uniqueName = "popupWindow_" + new Date().getTime();
          window.open(url, uniqueName);
        }
      }
      setClickCount(0);
    }, delay);
  };

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y, isGridLayout]);

  const startDrag = (e) => {
    e.preventDefault();
    const newZIndex = zIndex + 1;
    setDragging(true);
    setZIndex(newZIndex);
    setLocalZIndex(newZIndex); // Update local z-index immediately
    setIsClicked(true);

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosition: { ...position },
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = () => {
    onHoverChange("");
    setDragging(false);

    // Clear drag state
    if (dragRef.current) {
      dragRef.current.isDragging = false;
    }

    const draggableElement = document.querySelector(".draggableImage");
    if (draggableElement) {
      draggableElement.style.cursor = "grab";
    }

    // Remove event listeners from document
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    if (!dragRef.current || !dragRef.current.isDragging) return;

    e.preventDefault();

    // Get container more reliably
    const container = document.querySelector(".hover-container");
    if (!container) return;

    setWidth(Math.max(container.offsetWidth, minWidth));

    // Calculate movement based on absolute positions for better accuracy
    const deltaX =
      ((e.clientX - dragRef.current.startX) / container.offsetWidth) * 100;
    const deltaY =
      ((e.clientY - dragRef.current.startY) / container.offsetHeight) * 100;

    setPosition({
      x: dragRef.current.startPosition.x + deltaX,
      y: dragRef.current.startPosition.y + deltaY,
    });
  };

  const onHover = () => {
    if (!border) {
      setShowCursor("double click me!");
    }
    onHoverChange(true, hoverString);
  };

  const stopHover = (e) => {
    setShowCursor("");
    onHoverChange(false, "");
    e.target.style.cursor = "grab";
  };

  return (
    <div {...stylex.props(styles.container)}>
      {isWidthCalculated && (
        <div
          {...stylex.props(styles.group)}
          style={{
            left: `${(position.x * width) / 100}px`,
            top: `${position.y}%`,
            zIndex: localZIndex,
          }}
          onMouseDown={startDrag}
          onClick={(e) => {
            handleClickOutside(e);
            openPopupOnDoubleClick(e);
          }}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopHover}
          onMouseEnter={onHover}
        >
          <img
            src={src}
            {...stylex.props(
              styles.image,
              isMobile ? styles.imageMobile : styles.imageDesktop,
              border ? styles.imageShadow : null
            )}
            style={{
              border: dragging || isClicked ? "1px solid white" : "none",
            }}
            ref={imageRef}
            draggable={false}
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
                backgroundColor:
                  dragging || isClicked ? "#3443eb" : "transparent",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

DesktopIcon.propTypes = {
  src: PropTypes.string.isRequired,
  url: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isGridLayout: PropTypes.bool,
  onHoverChange: PropTypes.func.isRequired,
  hoverString: PropTypes.string,
  border: PropTypes.bool,
  zIndex: PropTypes.number.isRequired,
  setZIndex: PropTypes.func.isRequired,
  setShowCursor: PropTypes.func.isRequired,
  triggerResize: PropTypes.number,
  iconText: PropTypes.string.isRequired,
};

export default DesktopIcon;
