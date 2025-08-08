import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const Popup = ({
  src,
  url,
  x,
  y,
  isGridLayout,
  onHoverChange,
  hoverString,
  zIndex,
  setZIndex,
  setShowCursor,
  triggerResize,
  content,
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

  const [imageSize, setImageSize] = useState({ width: "auto", height: "auto" });

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      isMobile
        ? setImageSize({
            width: `${img.width * 0.85}px`,
            height: `${img.height * 0.85}px`,
          })
        : setImageSize({ width: img.width + "px", height: img.height + "px" });
    };
    img.src = src;
  }, [src, isMobile]);

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
  const delay = 300; // milliseconds
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
    e.preventDefault();
    setDragging(true);
    setZIndex(zIndex + 1);
    setIsClicked(true);

    // Store drag state in ref for consistency across fast movements
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
    onHoverChange(true, hoverString);
  };

  const stopHover = (e) => {
    setShowCursor("");
    onHoverChange(false, "");
    e.target.style.cursor = "grab";
  };

  const imageContainerStyle = {
    width: "auto",
    height: "auto",
    textAlign: "center",
    overflow: "hidden",
  };

  return (
    <div style={imageContainerStyle}>
      {isWidthCalculated && (
        <div
          style={{
            cursor: "grab",
            position: "absolute",
            left: `${(position.x * width) / 100}px`,
            zIndex: 1,
            top: `${position.y}%`,
            filter: "drop-shadow(8px 8px 10px rgba(0,0,0,0.3))",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
            userSelect: "none",
            borderRadius: "20px",
            transition: "transform 0.3s ease-in-out",
            transformOrigin: "top left",
            backgroundImage: `url(${src})`,
            backgroundSize: isMobile ? "cover" : "cover",
            backgroundPosition: "center",
            ...imageSize,
          }}
          className="draggableImage"
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
          {content}
        </div>
      )}
    </div>
  );
};

export default Popup;
