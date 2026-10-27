import React from "react";
import Clock from "./Clock";
import { useMediaQuery } from "react-responsive";
import StartButton from "./StartButton";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, fontSizes } from "../../styles/tokens.stylex";
import { useUI } from "../../context/UIContext";

const styles = stylex.create({
  hvrShade: {
    backgroundColor: {
      default: "transparent",
      ":hover": "rgb(232, 232, 232)",
    },
  },
  container: {
    position: "absolute",
    zIndex: 110000000,
    backgroundImage: "none",
    backgroundColor: colors.bgGray,
    height: 63,
    width: "100%",
    padding: 0,
    display: "flex",
    fontFamily: fonts.serif,
    fontSize: 16,
    letterSpacing: 1,
    overflow: "hidden",
    bottom: 0,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.black,
  },
  projectsText: {
    fontWeight: 500,
  },
  homeButton: {
    paddingTop: 16,
    paddingRight: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    color: colors.black,
    fontWeight: 500,
    fontStyle: "italic",
    cursor: "pointer",
  },
  homeButtonActive: {
    backgroundColor: colors.bgHover,
  },
  homeButtonInactive: {
    backgroundColor: "transparent",
  },
  projectsButton: {
    paddingTop: 16,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    color: colors.black,
    fontStyle: "italic",
    fontSize: fontSizes.lg,
    cursor: "pointer",
  },
  projectsButtonActive: {
    backgroundColor: colors.bgHover,
  },
  projectsButtonInactive: {
    backgroundColor: {
      default: "transparent",
      ":hover": "rgb(232, 232, 232)",
    },
  },
});

const StartBar = ({ setDesktopScreen, desktopScreen }) => {
  // Hide below 860px to match the CSS zoom reset breakpoint; above 860px the
  // body zoom is a constant 1.1, so the bar renders at a consistent height.
  const isMobile = useMediaQuery({ query: "(max-width: 860px)" });
  const { setCursorString } = useUI();

  if (isMobile) {
    return null;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <StartButton />
      <div
        onClick={() => {
          setDesktopScreen("HOME");
          setCursorString("");
        }}
        {...stylex.props(
          styles.hvrShade,
          styles.homeButton,
          desktopScreen === "HOME"
            ? styles.homeButtonActive
            : styles.homeButtonInactive
        )}
      >
        𐙚 Home
      </div>
      <div
        {...stylex.props(
          styles.hvrShade,
          styles.projectsButton,
          desktopScreen === "PORTFOLIO"
            ? styles.projectsButtonActive
            : styles.projectsButtonInactive
        )}
        onClick={() => {
          setDesktopScreen("PORTFOLIO");
          setCursorString("");
        }}
      >
        ッ <span {...stylex.props(styles.projectsText)}>Projects</span>
      </div>
      <Clock />
    </div>
  );
};

StartBar.propTypes = {
  setDesktopScreen: PropTypes.func.isRequired,
  desktopScreen: PropTypes.string.isRequired,
};

export default StartBar;
