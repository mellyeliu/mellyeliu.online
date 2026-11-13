import { useState, useRef, useCallback, useEffect } from "react";

const CONTAINER_SELECTOR = ".hover-container";
const MIN_CONTAINER_WIDTH = 900;

// Drag an absolutely positioned item around the desktop. Positions are stored
// as percentages of the desktop container. `left` is converted to pixels
// against the container width (never less than 900px) so items keep their
// layout on narrow screens, where the desktop scrolls horizontally.
const useDraggable = ({ initialX = 0, initialY = 0, onDragStart, onDragEnd }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(MIN_CONTAINER_WIDTH);
  const [isReady, setIsReady] = useState(false);
  const dragRef = useRef(null);

  useEffect(() => {
    const updateContainerWidth = () => {
      const container = document.querySelector(CONTAINER_SELECTOR);
      if (container) {
        setContainerWidth(Math.max(container.clientWidth, MIN_CONTAINER_WIDTH));
        setIsReady(true);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handleDragStart = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosition: position,
      };
      onDragStart?.();

      const handleMouseMove = (moveEvent) => {
        moveEvent.preventDefault();
        const container = document.querySelector(CONTAINER_SELECTOR);
        if (!container || !dragRef.current) return;

        const { startX, startY, startPosition } = dragRef.current;
        setPosition({
          x: startPosition.x + ((moveEvent.clientX - startX) / container.offsetWidth) * 100,
          y: startPosition.y + ((moveEvent.clientY - startY) / container.offsetHeight) * 100,
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        dragRef.current = null;
        onDragEnd?.();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position, onDragStart, onDragEnd]
  );

  return {
    isDragging,
    isReady,
    handleDragStart,
    pixelPosition: {
      left: `${(position.x * containerWidth) / 100}px`,
      top: `${position.y}%`,
    },
  };
};

export default useDraggable;
