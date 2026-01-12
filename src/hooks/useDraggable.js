import { useState, useRef, useCallback, useEffect } from "react";

const useDraggable = ({
  initialX = 0,
  initialY = 0,
  containerSelector = ".hover-container",
  minWidth = 900,
  onDragStart,
  onDragEnd,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(minWidth);
  const [isReady, setIsReady] = useState(false);

  const dragRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const updateContainerWidth = () => {
      const container = document.querySelector(containerSelector);
      if (container) {
        const newWidth = Math.max(container.clientWidth, minWidth);
        setContainerWidth(newWidth);
        setIsReady(true);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    return () => window.removeEventListener("resize", updateContainerWidth);
  }, [containerSelector, minWidth]);

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handleDragStart = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);

      dragRef.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startPosition: { ...position },
      };

      onDragStart?.();

      const handleMouseMove = (moveEvent) => {
        if (!dragRef.current?.isDragging) return;

        moveEvent.preventDefault();

        const container = document.querySelector(containerSelector);
        if (!container) return;

        const deltaX =
          ((moveEvent.clientX - dragRef.current.startX) /
            container.offsetWidth) *
          100;
        const deltaY =
          ((moveEvent.clientY - dragRef.current.startY) /
            container.offsetHeight) *
          100;

        setPosition({
          x: dragRef.current.startPosition.x + deltaX,
          y: dragRef.current.startPosition.y + deltaY,
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        if (dragRef.current) {
          dragRef.current.isDragging = false;
        }
        onDragEnd?.();

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [position, containerSelector, onDragStart, onDragEnd]
  );

  const getPixelPosition = useCallback(() => {
    return {
      left: `${(position.x * containerWidth) / 100}px`,
      top: `${position.y}%`,
    };
  }, [position, containerWidth]);

  return {
    position,
    setPosition,
    isDragging,
    isReady,
    containerWidth,
    elementRef,
    handleDragStart,
    getPixelPosition,
  };
};

export default useDraggable;
