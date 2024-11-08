import React, { useState, useRef, useEffect } from "react";
import { event } from "react-ga";
import PortfolioData from "../Data/PortfolioData";
import SplitTextByWidth from "./SplitTextByWidth";
import { isMobile } from "react-device-detect";

const DesktopIcon = ({
  src,
  scale,
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
  const [position, setPosition] = useState({ x: x, y: y });
  const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const minWidth = 900;
  const [width, setWidth] = useState(minWidth);
  const ref = useRef(null);

  const [mobileWidth, setMobileWidth] = useState(window.screen.width);

  const [imageSize, setImageSize] = useState({ width: "auto", height: "auto" });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width + "px", height: img.height + "px" });
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    const handleResize = () => setMobileWidth(window.screen.width);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [triggerResize]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    fontSize: isMobile ? 14 : 14.5,
    lineHeight: "14px",
    filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.3))",
    letterSpacing: "0.5px",
    top: isMobile ? 75 : 95,
    borderRadius: "2px",
    padding: "2px",
    marginLeft: "3px",
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
    setIsClicked(false);
    if (ref.current && !ref.current.contains(event.target)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    handleClickOutside(event);

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
          window.open(url, "popupWindow");
        }
      }
      setClickCount(0);
    }, delay);
  };

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y, isGridLayout]);

  const startDrag = (e) => {
    setDragging(true);
    setIsHovered(true);
    setZIndex(zIndex + 1);
    setIsClicked(true);
    e.target.style.zIndex = zIndex + 1;
    ref.current.style.zIndex = zIndex + 1;
    e.target.style.cursor = "grabbing";
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const stopDrag = (e) => {
    setIsHovered(false);
    onHoverChange("");
    setDragging(false);

    const draggableElement = document.querySelector(".draggableImage");
    if (draggableElement) {
      draggableElement.style.cursor = "grab";
    }
    // Remove event listeners from document
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const onDrag = (e) => {
    if (dragging) {
      const container = e.target.closest(".hover-container");
      setWidth(Math.max(container.offsetWidth, minWidth));
      const deltaX = (e.movementX / container.offsetWidth) * 100;
      const deltaY = (e.movementY / container.offsetHeight) * 100;
      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }
  };

  const onHover = () => {
    setIsHovered(true);
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

  const startTouchDrag = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      // Store initial touch position
      ref.current.initialTouchX = touch.clientX;
      ref.current.initialTouchY = touch.clientY;

      setDragging(true);
      setZIndex(zIndex + 1);
      e.target.style.zIndex = zIndex + 1;
      ref.current.style.zIndex = zIndex + 1;
      e.target.style.cursor = "grabbing";
    }
  };

  const onTouchMove = (e) => {
    if (dragging && e.touches.length > 0) {
      const touch = e.touches[0];
      const container = e.target.closest(".hover-container");

      const deltaX =
        ((touch.clientX - ref.current.initialTouchX) / mobileWidth) * 50;
      const deltaY =
        ((touch.clientY - ref.current.initialTouchY) / container.offsetHeight) *
        100;

      ref.current.initialTouchX = touch.clientX;
      ref.current.initialTouchY = touch.clientY;
      document.querySelector(".hover-container").classList.add("no-scroll");

      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    }
  };

  const stopTouchDrag = () => {
    setDragging(false);
    onHoverChange("");
    document.querySelector(".hover-container").classList.remove("no-scroll");
    // Reset initial touch positions
    if (ref.current) {
      ref.current.initialTouchX = 0;
      ref.current.initialTouchY = 0;
    }
  };

  return (
    <div style={imageContainerStyle}>
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
            maxWidth: isMobile ? "70px" : "90px",
            maxHeight: isMobile ? "65px" : "90px",
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
    </div>
  );
};

export default DesktopIcon;
