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

const HOME_BACKGROUND_SRC = "/images/bgfinal.png";
const LOAD_FALLBACK_MS = 4000;

const AppContent = () => {
  const location = useLocation();
  const history = useHistory();
  const { theme } = useTheme();
  const [isFoldersOff, setIsFoldersOff] = useState(false);
  const isMobile = window.innerWidth <= 767;
  const ZOOM = 1.1;
  // body zoom:1.1 is only active above 860px (it's reset to 1 at <=860 in
  // media-queries.css), so only divide by ZOOM where the zoom actually applies.
  const isZoomed = window.innerWidth > 860;
  const [windowHeight, setWindowHeight] = useState(
    isZoomed ? window.innerHeight / ZOOM : window.innerHeight
  );

  const isPortfolioPage = location.pathname.startsWith("/portfolio");
  const desktopScreen = isPortfolioPage ? Screen.PORTFOLIO : Screen.HOME;
  const [isHomeReady, setIsHomeReady] = useState(false);
  const isPageReady = isPortfolioPage || isHomeReady;

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
    if (isPortfolioPage || isHomeReady) return undefined;

    let cancelled = false;
    let fallbackTimer;
    const backgroundImage = new Image();
    const preloadLink = document.createElement("link");

    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = HOME_BACKGROUND_SRC;
    preloadLink.fetchPriority = "high";
    document.head.appendChild(preloadLink);

    backgroundImage.fetchPriority = "high";
    backgroundImage.decoding = "async";

    const revealPage = () => {
      if (cancelled) return;
      window.clearTimeout(fallbackTimer);
      setIsHomeReady(true);
    };

    const handleLoad = () => {
      if (typeof backgroundImage.decode === "function") {
        backgroundImage.decode().then(revealPage, revealPage);
      } else {
        revealPage();
      }
    };

    backgroundImage.addEventListener("load", handleLoad);
    backgroundImage.addEventListener("error", revealPage);
    fallbackTimer = window.setTimeout(revealPage, LOAD_FALLBACK_MS);
    backgroundImage.src = HOME_BACKGROUND_SRC;

    if (backgroundImage.complete) {
      handleLoad();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      backgroundImage.removeEventListener("load", handleLoad);
      backgroundImage.removeEventListener("error", revealPage);
      preloadLink.remove();
    };
  }, [isPortfolioPage, isHomeReady]);

  useEffect(() => {
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const zoomed = window.innerWidth > 860;
      setWindowHeight(zoomed ? window.innerHeight / ZOOM : window.innerHeight);
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
        aria-busy={!isPageReady}
        style={{
          height: `${windowHeight}px`,
          overflow: "hidden",
          opacity: isPageReady ? 1 : 0,
          pointerEvents: isPageReady ? "auto" : "none",
          transition: "opacity 250ms ease-out",
        }}
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
