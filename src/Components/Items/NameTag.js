import React from "react";
import TypingToggleTextList from "../Utils/TextList";
import { useMediaQuery } from "react-responsive";

const NameTag = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const styles = {
    container: {
      width: isMobile ? "320px" : "clamp(400px, 20vw, 500px)",
      height: isMobile ? "105px" : "clamp(125px, 10vh, 200px)",
      backgroundColor: "white",
      border: "0.5px solid #111",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      padding: "10px",
      boxSizing: "border-box",
      position: "absolute",
      left: "50%",
      top: "7.5vh",
      transform: "translateX(-50%)",
      color: "#111",
      zIndex: 100000,
    },
    title: {
      fontWeight: 700,
      letterSpacing: 0.4,
      fontFamily: "Cormorant Garamond",
      fontSize: isMobile ? 24 : "clamp(28px, 2vh, 38px)",
    },
    funFacts: {
      letterSpacing: 1,
      fontFamily: "Cormorant Garamond",
      fontWeight: 300,
      fontStyle: "italic",
      fontSize: isMobile ? 14 : "clamp(17px, 1vh, 26px)",
      paddingTop: isMobile ? 2 : 6,
      color: "rgb(150,150,150)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title} className="control">
        {"mellye.liu ໒ ྀིྀིྀིྀིྀི꒰っ˕ -｡꒱ ྀིྀིྀིྀིྀི১ ♡ "}
      </div>
      <TypingToggleTextList
        wrapper={true}
        className="control"
        style={styles.funFacts}
      ></TypingToggleTextList>
    </div>
  );
};

export default NameTag;
