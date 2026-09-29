import React, { useState, useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import { useUI } from "../../context/UIContext";

const DOUBLE_CLICK_DELAY = 300;

const styles = stylex.create({
  container: {
    width: "auto",
    height: "auto",
    textAlign: "center",
    overflow: "hidden",
  },
});

const Popup = ({
  src,
  url = "",
  x,
  y,
  isGridLayout = false,
  onHoverChange,
  hoverString = "",
  setShowCursor,
  triggerResize = false,
  content = null,
}) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const { getNextZIndex } = useUI();

  const [position, setPosition] = useState({ x: x, y: y });
  const [localZIndex, setLocalZIndex] = useState(1);
  const minWidth = 900;
  const [width, setWidth] = useState(minWidth);
  const [isWidthCalculated, setIsWidthCalculated] = useState(false);
  const ref = useRef(null);
  const dragRef = useRef(null);
  const clickTimerRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const [imageSize, setImageSize] = useState({ width: "auto", height: "auto" });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleResize = useCallback(() => {
    const divs = document.getElementsByClassName("hover-container");
    if (divs.length > 0) {
      const divWidth = divs[0].clientWidth;
      setWidth(Math.max(divWidth, minWidth));
      setIsWidthCalculated(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    setIsImageLoaded(false);

    img.onload = () => {
      if (cancelled) return;

      isMobile
        ? setImageSize({
            width: `${img.width * 0.85}px`,
            height: `${img.height * 0.85}px`,
          })
        : setImageSize({ width: img.width + "px", height: img.height + "px" });
      setIsImageLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setIsImageLoaded(true);
    };
    img.src = src;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [src, isMobile]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (isWidthCalculated) {
      handleResize();
    }
  }, [triggerResize, isWidthCalculated, handleResize]);

  const handleClickOutside = useCallback((event) => {
    if (!event) return;
    if (ref.current && !ref.current.contains(event.target)) {
      setIsClicked(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const openPopupOnDoubleClick = useCallback(() => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);
    setIsClicked(true);

    clickTimerRef.current = setTimeout(() => {
      if (newCount >= 2 && url) {
        window.open(url, "popupWindow");
      }
      setClickCount(0);
    }, DOUBLE_CLICK_DELAY);
  }, [clickCount, url]);

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y, isGridLayout]);

  const stopDrag = useCallback(() => {
    onHoverChange("");

    if (dragRef.current) {
      dragRef.current.isDragging = false;
    }

    if (ref.current) {
      ref.current.style.cursor = "grab";
    }

    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  }, [onHoverChange]);

  const onDrag = useCallback((e) => {
    if (!dragRef.current || !dragRef.current.isDragging) return;

    e.preventDefault();

    const container = document.querySelector(".hover-container");
    if (!container) return;

    setWidth(Math.max(container.offsetWidth, minWidth));

    const deltaX =
      ((e.clientX - dragRef.current.startX) / container.offsetWidth) * 100;
    const deltaY =
      ((e.clientY - dragRef.current.startY) / container.offsetHeight) * 100;

    setPosition({
      x: dragRef.current.startPosition.x + deltaX,
      y: dragRef.current.startPosition.y + deltaY,
    });
  }, []);

  const startDrag = useCallback((e) => {
    e.preventDefault();
    setLocalZIndex(getNextZIndex());
    setIsClicked(true);

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosition: { ...position },
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  }, [getNextZIndex, position, onDrag, stopDrag]);

  const onHover = useCallback(() => {
    onHoverChange(true, hoverString);
  }, [onHoverChange, hoverString]);

  const stopHover = useCallback((e) => {
    setShowCursor("");
    onHoverChange(false, "");
    e.target.style.cursor = "grab";
  }, [setShowCursor, onHoverChange]);

  return (
    <div {...stylex.props(styles.container)}>
      {isWidthCalculated && isImageLoaded && (
        <div
          style={{
            cursor: "grab",
            position: "absolute",
            zIndex: localZIndex,
            filter: "drop-shadow(8px 8px 10px rgba(0,0,0,0.3))",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
            userSelect: "none",
            borderRadius: 20,
            transition: "transform 0.3s ease-in-out",
            transformOrigin: "top left",
            backgroundSize: "cover",
            backgroundPosition: "center",
            left: `${(position.x * width) / 100}px`,
            top: `${position.y}%`,
            backgroundImage: `url(${src})`,
            ...imageSize,
          }}
          className="draggableImage"
          onMouseDown={startDrag}
          onClick={(e) => {
            handleClickOutside(e);
            openPopupOnDoubleClick();
          }}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopHover}
          onMouseEnter={onHover}
          ref={ref}
        >
          {content}
        </div>
      )}
    </div>
  );
};

Popup.propTypes = {
  src: PropTypes.string.isRequired,
  url: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isGridLayout: PropTypes.bool,
  onHoverChange: PropTypes.func.isRequired,
  hoverString: PropTypes.string,
  setShowCursor: PropTypes.func.isRequired,
  triggerResize: PropTypes.bool,
  content: PropTypes.node,
};

export default Popup;
