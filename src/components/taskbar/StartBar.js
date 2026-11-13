import React from "react";
import * as stylex from "@stylexjs/stylex";
import Clock from "./Clock";
import useMediaQuery from "../../hooks/useMediaQuery";
import StartButton from "./StartButton";
import { colors, fonts, fontSizes } from "../../styles/tokens.stylex";
import { useUIActions } from "../../context/UIContext";
import { Screen, useDesktopScreen } from "../../routes";

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

const StartBar = () => {
  // Hide below 860px to match the CSS zoom reset breakpoint; above 860px the
  // body zoom is a constant 1.1, so the bar renders at a consistent height.
  const isMobile = useMediaQuery("(max-width: 860px)");
  const { setCursorString } = useUIActions();
  const [desktopScreen, setDesktopScreen] = useDesktopScreen();

  if (isMobile) {
    return null;
  }

  const goTo = (screen) => {
    setDesktopScreen(screen);
    setCursorString("");
  };

  return (
    <div {...stylex.props(styles.container)}>
      <StartButton />
      <div
        onClick={() => goTo(Screen.HOME)}
        {...stylex.props(
          styles.hvrShade,
          styles.homeButton,
          desktopScreen === Screen.HOME
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
          desktopScreen === Screen.PORTFOLIO
            ? styles.projectsButtonActive
            : styles.projectsButtonInactive
        )}
        onClick={() => goTo(Screen.PORTFOLIO)}
      >
        ッ <span {...stylex.props(styles.projectsText)}>Projects</span>
      </div>
      <Clock />
    </div>
  );
};

export default StartBar;
