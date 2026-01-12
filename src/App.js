import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import NameTag from "./Components/Items/NameTag";
import Portfolio from "./Components/Pages/Portfolio";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { UIProvider } from "./context/UIContext";
import PortfolioData from "./Data/PortfolioData";
import TextCursor from "./Components/Utils/TextCursor";
import StartBar from "./Components/Items/StartBar";

export const Screen = {
  HOME: "HOME",
  PORTFOLIO: "PORTFOLIO",
};

const AppContent = () => {
  const location = useLocation();
  const history = useHistory();
  const { theme } = useTheme();
  const [isFoldersOff, setIsFoldersOff] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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

  const themeClass = theme === "dark" ? "App dark-theme" : "App";

  return (
    <>
      <TextCursor />
      <div
        className={themeClass}
        style={{ height: `${windowHeight}px`, overflow: "hidden" }}
      >
        {!isFoldersOff && desktopScreen === Screen.HOME && <NameTag />}
        <Switch>
          <Route exact path="/">
            <Home
              dest="home"
              isFoldersOff={isFoldersOff}
              setIsFoldersOff={setIsFoldersOff}
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
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <UIProvider>
        <AppContent />
      </UIProvider>
    </ThemeProvider>
  );
};

export default App;
