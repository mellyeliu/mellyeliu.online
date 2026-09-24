import React from "react";
import { useMediaQuery } from "react-responsive";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../../styles/tokens.stylex";

const styles = stylex.create({
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
    </div>
  );
};

export default NameTag;
