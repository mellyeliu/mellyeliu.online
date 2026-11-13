import React, { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Screen, useDesktopScreen } from "../../routes";
import { colors, radii } from "../../styles/tokens.stylex";

const styles = stylex.create({
  iconBase: {
    display: "inline-block",
    position: "relative",
    width: 16,
    height: 16,
    textAlign: "center",
    lineHeight: "16px",
    marginRight: 5,
  },
  iconDisabled: {
    cursor: "not-allowed",
  },
  iconClickable: {
    cursor: "pointer",
  },
  hoverCircle: {
    position: "absolute",
    top: 4.7,
    left: 2.5,
    width: "65%",
    height: "65%",
    borderRadius: radii.full,
    opacity: 1,
    zIndex: -1,
  },
  greenCircle: {
    backgroundImage: "none",
    backgroundColor: colors.iconGreen,
  },
  yellowCircle: {
    backgroundImage: "none",
    backgroundColor: colors.iconYellow,
  },
  redCircle: {
    backgroundImage: "none",
    backgroundColor: colors.iconRed,
  },
});

// The traffic-light buttons on the portfolio "browser". Red goes home.
const BrowserIcons = () => {
  const [hovered, setHovered] = useState(false);
  const [, setDesktopScreen] = useDesktopScreen();

  return (
    <span
      className="browsero"
      style={{ cursor: "pointer" }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <span {...stylex.props(styles.iconBase, styles.iconDisabled)}>
        ○
        {hovered && (
          <span
            {...stylex.props(
              styles.hoverCircle,
              styles.greenCircle,
              styles.iconDisabled
            )}
          />
        )}
      </span>
      <span {...stylex.props(styles.iconBase, styles.iconDisabled)}>
        ○
        {hovered && (
          <span {...stylex.props(styles.hoverCircle, styles.yellowCircle)} />
        )}
      </span>
      <span
        {...stylex.props(styles.iconBase, styles.iconClickable)}
        onClick={() => setDesktopScreen(Screen.HOME)}
      >
        ○
        {hovered && (
          <span {...stylex.props(styles.hoverCircle, styles.redCircle)} />
        )}
      </span>
    </span>
  );
};

export default BrowserIcons;
