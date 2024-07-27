import React, { useContext } from "react";
import PortfolioData from "../Data/PortfolioData";
import { ThemeContext } from "../ThemeContext";
import Clock from "./Clock";
import TypingToggleTextList from "./TypingToggleTextList";
import { quotes } from "../Data/QuotesData";
import { isMobile } from "react-device-detect";
import StartButton from "./StartButton";

const StartBar = ({ setDesktopScreen, desktopScreen }) => {
  const { cursorString, setCursorString } = useContext(ThemeContext);

  const tabStyle = {
    padding: "5px 10px",
    color: "black",
    fontWeight: "500",
    fontStyle: "italic",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 110000000,
        background: "rgb(241 241 241)",
        height: 40,
        width: "100%",
        padding: "0px",
        display: "flex",
        letterSpacing: 1,
        bottom: 0,
        border: "0.5px solid black",
      }}
    >
      <StartButton />
      {/* <div
        style={{
          ...tabStyle,
          cursor: "default",
          marginLeft: "20px !important",
        }}
      >
        Start &nbsp; &nbsp;›
      </div> */}
      <div
        onClick={() => {
          if (isMobile) {
            console.log("reloading");
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
          padding: "5px 10px 5px 20px",
          color: "black",
          fontWeight: "500",
          fontStyle: "italic",
          cursor: "pointer",
          // background: desktopScreen === "HOME" && "rgb(215 215 215)",
        }}
        className="hvr-shade"
      >
        {desktopScreen === "HOME" && "𐙚"} Home{" "}
      </div>
      <div
        style={{
          ...tabStyle,
          // background: desktopScreen === "PORTFOLIO" && "rgb(215 215 215)",
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
        {desktopScreen === "PORTFOLIO" && "𐙚"} Projects{" "}
      </div>
      <div
        style={{
          textAlign: "right",
          position: "absolute",
          right: "125px",
          height: 40,
          paddingTop: 5,
          maxWidth: "60%",
        }}
        id="desktop-only"
      >
        <TypingToggleTextList
          className="control"
          textOptions={quotes}
          wrapper={false}
          autoplay={false}
          speed={35}
          autoplaySpeed={50000}
          style={{
            letterSpacing: 0.5,
            marginBottom: 5,
            fontFamily: "Cormorant Garamond",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: 14,
            color: "black",
          }}
        ></TypingToggleTextList>{" "}
      </div>
      <Clock />
      {/* <ul
        style={{ color: "black !important", float: "right" }}
        className="social-links"
      >
        {networks}
      </ul> */}
    </div>
  );
};

export default StartBar;
