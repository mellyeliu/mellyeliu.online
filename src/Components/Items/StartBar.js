import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import Clock from "./Clock";
import TypingToggleTextList from "../Utils/TextList";
import { quotes } from "../../Data/QuotesData";
import { useMediaQuery } from "react-responsive";
import StartButton from "./StartButton";
import PropTypes from "prop-types";

const StartBar = ({ setDesktopScreen, desktopScreen }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const { setCursorString } = useContext(ThemeContext);

  const newQuotes = quotes.map((item) => item[0]);
  const linkQuotes = quotes.map((item) => item[1]);

  const tabStyle = {
    padding: "15px 10px",
    color: "black",
    fontStyle: "italic",
    fontSize: 17,
    cursor: "pointer",
  };

  // Hide StartBar on mobile screens
  if (isMobile) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 110000000,
        background: "rgb(241 241 241)",
        height: 60,
        width: "100%",
        padding: "0px",
        display: "flex",
        fontFamily: "Cormorant Garamond",
        fontSize: 17,
        letterSpacing: 1,
        fontSize: 16,
        overflow: "hidden",
        bottom: 0,
        border: "0.5px solid black",
      }}
    >
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
        style={{
          padding: "15px 15px 5px 15px",
          color: "black",
          fontWeight: "500",
          fontStyle: "italic",
          cursor: "pointer",
          background: desktopScreen === "HOME" && "rgb(225 225 225)",
        }}
        className="hvr-shade"
      >
        {desktopScreen === "𐙚 HOME" && "𐙚"} 𐙚 Home{" "}
      </div>
      <div
        style={{
          ...tabStyle,
          background: desktopScreen === "PORTFOLIO" && "rgb(225 225 225)",
        }}
        className="hvr-shade"
        onClick={() => {
          setDesktopScreen("PORTFOLIO");
          setCursorString("");
        }}
      >
        ッ <span style={{ fontWeight: 500 }}>Projects </span>
      </div>
      <div
        style={{
          textAlign: "right",
          position: "absolute",
          right: "130px",
          height: 60,
          paddingTop: 15,
          maxWidth: "50%",
        }}
        id="desktop-only"
      >
        <TypingToggleTextList
          className="control"
          textOptions={newQuotes}
          wrapper={false}
          autoplay={false}
          order={true}
          typing={false}
          speed={30}
          autoplaySpeed={50000}
          links={linkQuotes}
          style={{
            letterSpacing: -0.2,
            marginBottom: 5,
            fontFamily: "Cormorant Garamond",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 15,
            color: "black",
            maxHeight: "40px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
          }}
        ></TypingToggleTextList>{" "}
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
