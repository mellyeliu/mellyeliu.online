import React, { useState } from "react";
import PropTypes from "prop-types";
import { Screen } from "../../App";
import * as stylex from "@stylexjs/stylex";
import { colors, radii } from "../../styles/tokens.stylex";

const styles = stylex.create({
  container: {
    cursor: "pointer",
  },
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
    top: 3,
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

const BrowserIcons = ({ setDesktopScreen }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setDesktopScreen(Screen.HOME);
  };

  return (
    <span
      className="browsero"
      style={{ cursor: "pointer" }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
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
        onClick={handleClick}
      >
        ○
        {hovered && (
          <span {...stylex.props(styles.hoverCircle, styles.redCircle)} />
        )}
      </span>
    </span>
  );
};

BrowserIcons.propTypes = {
  setDesktopScreen: PropTypes.func.isRequired,
};

export default BrowserIcons;
