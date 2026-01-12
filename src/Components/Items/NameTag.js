import React from "react";
import TypingToggleTextList from "../Utils/TextList";
import { useMediaQuery } from "react-responsive";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, breakpoints } from "../../styles/tokens.stylex";

const styles = stylex.create({
  control: {
    display: "block",
    letterSpacing: "2.5px",
    height: {
      default: null,
      [breakpoints.tabletShort]: "28px",
      [breakpoints.smallTablet]: "38px",
    },
    fontSize: {
      default: null,
      [breakpoints.tabletShort]: "12px",
      [breakpoints.smallTablet]: "11.5px",
    },
    marginTop: {
      default: null,
      [breakpoints.tabletShort]: "-8px",
      [breakpoints.smallTablet]: "-22px",
    },
  },
  container: {
    backgroundImage: "none",
    backgroundColor: colors.bgWhite,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.darkGray,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    boxSizing: "border-box",
    position: "absolute",
    left: "50%",
    top: "9vh",
    transform: "translateX(-50%)",
    color: colors.darkGray,
    zIndex: 100000,
  },
  containerDesktop: {
    width: "clamp(400px, 20vw, 500px)",
    height: "clamp(125px, 12vh, 200px)",
  },
  containerMobile: {
    width: 320,
    height: 105,
  },
  title: {
    fontWeight: 700,
    letterSpacing: 0.5,
    transform: "scaleY(1.05)",
    fontFamily: fonts.serif,
  },
  titleDesktop: {
    fontSize: "clamp(28px, 2vh, 34px)",
  },
  titleMobile: {
    fontSize: 24,
  },
  funFacts: {
    letterSpacing: 1,
    fontFamily: fonts.serif,
    fontWeight: 300,
    fontStyle: "italic",
    color: colors.mediumGray,
  },
  funFactsDesktop: {
    fontSize: "clamp(17px, 1vh, 26px)",
    paddingTop: 6,
  },
  funFactsMobile: {
    fontSize: 14,
    paddingTop: 2,
  },
});

const NameTag = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <div
      {...stylex.props(
        styles.container,
        isMobile ? styles.containerMobile : styles.containerDesktop
      )}
    >
      <div
        {...stylex.props(
          styles.title,
          isMobile ? styles.titleMobile : styles.titleDesktop
        )}
      >
        {"mellye.liu ໒ ྀིྀིྀིྀིྀི꒰っ˕ -｡꒱ ྀིྀིྀིྀིྀི১ ♡ "}
      </div>
      <TypingToggleTextList
        wrapper={true}
        {...stylex.props(styles.control)}
        xstyle={[
          styles.funFacts,
          isMobile ? styles.funFactsMobile : styles.funFactsDesktop,
        ]}
      />
    </div>
  );
};

export default NameTag;
