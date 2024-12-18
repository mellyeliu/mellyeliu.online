import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const containerStyle = {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    padding: "10px",
    color: "black",
    cursor: "default",
    lineHeight: 0,
    top: 10,
    height: 10,
    fontWeight: "500",
  };

  const elementStyle = {
    position: "absolute",
    right: 0,
    bottom: 0,
    lineHeight: "55px",
    borderLeft: "0.5px solid black",
  };

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
    <div style={containerStyle}>
      <div style={elementStyle}>
        &nbsp; &nbsp; {formatTime(currentTime)}&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default Clock;
