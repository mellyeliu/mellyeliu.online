import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import "./App.css";
import Header from "./Components/Pages/Home";

import NameTag from "./Components/Items/NameTag";
import Portfolio from "./Components/Pages/Portfolio";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import PortfolioData from "./Data/PortfolioData";
import TextCursor from "./Components/Utils/TextCursor";
import { useMediaQuery } from "react-responsive";
import StartBar from "./Components/Items/StartBar";

export const Screen = {
  HOME: "HOME",
  PORTFOLIO: "PORTFOLIO",
};

const App = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px) or (max-height: 767px)",
  });

  const [isFoldersOff, setisFoldersOff] = useState(false);
  const [desktopScreen, setDesktopScreen] = useState(Screen.HOME);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <>
            {!isMobile && <TextCursor />}
            <div
              className={`App ${theme === "dark" ? "" : ""}`}
              style={{
                overflow: "hidden",
                height: `${windowHeight}px`,
              }}
            >
              {!isFoldersOff && desktopScreen === Screen.HOME && <NameTag />}
              {desktopScreen === Screen.HOME ? (
                <Header
                  dest={"home"}
                  isFoldersOff={isFoldersOff}
                  setisFoldersOff={setisFoldersOff}
                  setDesktopScreen={setDesktopScreen}
                  desktopScreen={desktopScreen}
                />
              ) : (
                <Portfolio
                  style={{ zIndex: 1000000, position: "relative" }}
                  data={PortfolioData.portfolio}
                  setDesktopScreen={setDesktopScreen}
                />
              )}
              {!isMobile && (
                <StartBar
                  setDesktopScreen={setDesktopScreen}
                  desktopScreen={desktopScreen}
                />
              )}
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;
