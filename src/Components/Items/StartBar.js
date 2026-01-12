import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import Clock from "./Clock";
import TypingToggleTextList from "../Utils/TextList";
import { quotes } from "../../Data/QuotesData";
import { useMediaQuery } from "react-responsive";
import StartButton from "./StartButton";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, fontSizes } from "../../styles/tokens.stylex";

const styles = stylex.create({
  hvrShade: {
    backgroundColor: {
      default: "transparent",
      ":hover": "rgb(223, 223, 223)",
    },
  },
  container: {
    position: "absolute",
    zIndex: 110000000,
    backgroundImage: "none",
    backgroundColor: colors.bgGray,
    height: 60,
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
  quotesContainer: {
    textAlign: "right",
    position: "absolute",
    right: 130,
    height: 60,
    paddingTop: 15,
    maxWidth: "50%",
  },
  quoteStyle: {
    letterSpacing: -0.2,
    marginBottom: 5,
    fontFamily: fonts.serif,
    fontWeight: 300,
    fontStyle: "italic",
    fontSize: fontSizes.base,
    color: colors.black,
    maxHeight: 40,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
  },
  homeButton: {
    paddingTop: 15,
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
    paddingTop: 15,
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
    backgroundColor: "transparent",
  },
});

const StartBar = ({ setDesktopScreen, desktopScreen }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const { setCursorString } = useContext(ThemeContext);

  const newQuotes = quotes.map((item) => item[0]);
  const linkQuotes = quotes.map((item) => item[1]);

  // Hide StartBar on mobile screens
  if (isMobile) {
    return null;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <StartButton
        onMouseEnter={() => {
          setCursorString("home page!");
        }}
        onMouseLeave={() => {
          setCursorString("");
        }}
      />
      <div
        onClick={() => {
          if (isMobile) {
            window.location.reload();
          }
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
        {desktopScreen === "𐙚 HOME" && "𐙚"} 𐙚 Home{" "}
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
        ッ <span {...stylex.props(styles.projectsText)}>Projects </span>
      </div>
      <div {...stylex.props(styles.quotesContainer)} id="desktop-only">
        <TypingToggleTextList
          textOptions={newQuotes}
          wrapper={false}
          autoplay={false}
          order={true}
          typing={false}
          speed={30}
          autoplaySpeed={50000}
          links={linkQuotes}
          xstyle={styles.quoteStyle}
        />
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
