import React, { useContext } from "react";
import PortfolioData from "../Data/PortfolioData";
import { ThemeContext } from "../ThemeContext";
import Clock from "./Clock";
import TypingToggleTextList from "./TextList";
import { quotes } from "../Data/QuotesData";
import { isMobile } from "react-device-detect";
import StartButton from "./StartButton";

const StartBar = ({ setDesktopScreen, desktopScreen }) => {
  const { cursorString, setCursorString } = useContext(ThemeContext);

  const newQuotes = quotes.map((item) => item[0]);
  const linkQuotes = quotes.map((item) => item[1]);

  const tabStyle = {
    padding: "12.5px 10px",
    color: "black",
    // fontWeight: "500",
    fontStyle: "italic",
    fontSize: 16,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 110000000,
        background: "rgb(241 241 241)",
        height: 55,
        width: "100%",
        padding: "0px",
        display: "flex",
        letterSpacing: 1,
        fontSize: 16,
        overflow: "hidden",
        bottom: 0,
        border: "0.5px solid black",
      }}
    >
      <StartButton />
      <div
        onClick={() => {
          if (isMobile) {
            window.location.reload();
          }
          setDesktopScreen("HOME");
          setCursorString("");
        }}
        onMouseEnter={() => {
          setCursorString("home page!");
        }}
        onMouseLeave={() => {
          setCursorString("");
        }}
        style={{
          padding: "12.5px 15px 5px 15px",
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
        onMouseEnter={() => {
          setCursorString("see projects!");
        }}
        onMouseLeave={() => {
          setCursorString("");
        }}
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
          height: 50,
          paddingTop: 12.5,
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
            letterSpacing: 0,
            marginBottom: 5,
            fontFamily: "Cormorant Garamond",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 15,
            color: "black",
          }}
        ></TypingToggleTextList>{" "}
      </div>
      <Clock />
    </div>
  );
};

export default StartBar;
