import React, { useState, useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../../styles/tokens.stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: colors.black,
    cursor: "default",
    lineHeight: 0,
    top: 10,
    fontFamily: fonts.serif,
    height: 10,
    fontWeight: "500",
  },
  element: {
    position: "absolute",
    right: 0,
    bottom: 0,
    lineHeight: "60px",
    borderLeftWidth: 0.5,
    borderLeftStyle: "solid",
    borderLeftColor: colors.black,
  },
});

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
