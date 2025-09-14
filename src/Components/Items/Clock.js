import React, { useState, useEffect } from "react";
import * as stylex from "@stylexjs/stylex";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const styles = stylex.create({
    container: {
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
      padding: "10px",
      color: "black",
      cursor: "default",
      lineHeight: 0,
      top: 10,
      fontFamily: "Cormorant Garamond",
      height: 10,
      fontWeight: "500",
    },
    element: {
      position: "absolute",
      right: 0,
      bottom: 0,
      lineHeight: "60px",
      borderLeftWidth: "0.5px",
      borderLeftStyle: "solid",
      borderLeftColor: "black",
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.element)}>
        &nbsp;&nbsp;{formatTime(currentTime)}&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default Clock;
