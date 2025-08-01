import React, { useState, useRef, useEffect } from "react";
import SplitTextByWidth from "../Utils/SplitTextByWidth";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const [position, setPosition] = useState({ x: x, y: y });
  const [dragging, setDragging] = useState(false);
  const minWidth = 900;
  const [width, setWidth] = useState(minWidth);
  const [isWidthCalculated, setIsWidthCalculated] = useState(false);
  const ref = useRef(null);
  const dragRef = useRef(null); // Track drag state across fast movements

  const [mobileWidth, setMobileWidth] = useState(window.screen.width);

  useEffect(() => {
    const handleResize = () => setMobileWidth(window.screen.width);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const iconTextStyle = {
    fontWeight: 600,
    color: "white",
    position: "relative",
    bottom: 0,
    fontFamily: "Arimo",
    fontSize: isMobile ? 14 : 15,
    lineHeight: "14px",
    filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.3))",
    letterSpacing: "0.5px",
    top: isMobile ? 75 : 98,
    borderRadius: "2px",
    padding: "2px",
    marginLeft: "5px",
    display: "inline-block",
    backgroundColor: dragging || isClicked ? "#3443eb" : "transparent",
  };

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
    if (ref.current && !ref.current.contains(event.target)) {
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
    setDragging(true);
    setZIndex(zIndex + 1);
    setIsClicked(true);

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startPosition: { ...position },
    };

    if (ref.current) {
      ref.current.style.zIndex = zIndex + 1;
    }

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
    onHoverChange(hoverString);
  };

  const stopHover = (e) => {
    setShowCursor("");
    onHoverChange("");
    e.target.style.cursor = "grab";
  };

  const imageContainerStyle = {
    width: "auto",
    height: "auto",
    textAlign: "center",
  };

  return (
    <div style={imageContainerStyle}>
      {isWidthCalculated && (
        <div>
          <img
            src={src}
            style={{
              cursor: "grab",
              position: "absolute",
              left: `${(position.x * width) / 100}px`,
              display: "block",
              zIndex: 1,
              top: `${position.y}%`,
              border: dragging || isClicked ? "1px solid white" : "none",
              borderRadius: "5px",
              maxWidth: isMobile ? "70px" : "clamp(98px, 3vh, 120px)",
              maxHeight: isMobile ? "65px" : "clamp(95px, 3vw, 120px)",
              width: "auto",
              height: "auto",
              filter: "drop-shadow(0px 6px 5px rgba(0,0,0,0.5))",
              boxShadow: border ? "0 0 0 1px rgba(0,0,0,0.5)" : "none",
              userSelect: "none",
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
            ref={ref}
            draggable={false}
          />
          <div
            style={{
              cursor: "grab",
              position: "absolute",
              left: `${(position.x * width) / 100}px`,
              zIndex: 1,
              top: `${position.y}%`,
              filter: "drop-shadow(0px 6px 5px rgba(0,0,0,0.8))",
              boxShadow: "none",
              userSelect: "none",
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
            ref={ref}
          >
            <SplitTextByWidth
              text={iconText}
              maxWidth={isMobile ? 75 : 80}
              backgroundColor={"red"}
              style={iconTextStyle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopIcon;
