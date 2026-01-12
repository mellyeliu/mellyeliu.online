import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import "./App.css";
import Header from "./Components/Pages/Home";

import NameTag from "./Components/Items/NameTag";
import Portfolio from "./Components/Pages/Portfolio";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import PortfolioData from "./Data/PortfolioData";
import TextCursor from "./Components/Utils/TextCursor";
import StartBar from "./Components/Items/StartBar";
import * as stylex from "@stylexjs/stylex";

export const Screen = {
  HOME: "HOME",
  PORTFOLIO: "PORTFOLIO",
};

const styles = stylex.create({
  app: {
    overflow: "hidden",
  },
  appContainer: (height) => ({
    overflow: "hidden",
    height: `${height}px`,
  }),
});

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [isFoldersOff, setisFoldersOff] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Determine current screen based on URL
  const isPortfolioPage = location.pathname.startsWith("/portfolio");
  const desktopScreen = isPortfolioPage ? Screen.PORTFOLIO : Screen.HOME;

  const setDesktopScreen = (screen) => {
    if (screen === Screen.HOME) {
      history.push("/");
    } else if (screen === Screen.PORTFOLIO) {
      history.push("/portfolio");
    }
  };

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
            <TextCursor />
            <div
              className={`App ${theme === "dark" ? "" : ""}`}
              {...stylex.props(styles.appContainer(windowHeight))}
            >
              {!isFoldersOff && desktopScreen === Screen.HOME && <NameTag />}
              <Switch>
                <Route exact path="/">
                  <Header
                    dest={"home"}
                    isFoldersOff={isFoldersOff}
                    setisFoldersOff={setisFoldersOff}
                    setDesktopScreen={setDesktopScreen}
                    desktopScreen={desktopScreen}
                  />
                </Route>
                <Route path="/portfolio">
                  <Portfolio
                    data={PortfolioData.portfolio}
                    setDesktopScreen={setDesktopScreen}
                  />
                </Route>
              </Switch>
              <StartBar
                setDesktopScreen={setDesktopScreen}
                desktopScreen={desktopScreen}
              />
            </div>
          </>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;
