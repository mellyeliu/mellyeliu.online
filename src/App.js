import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactGA from "react-ga";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import NameTag from "./Components/Items/NameTag";
import Portfolio from "./Components/Pages/Portfolio";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { UIProvider } from "./context/UIContext";
import StartBar from "./Components/Items/StartBar";

export const Screen = {
  HOME: "HOME",
  PORTFOLIO: "PORTFOLIO",
};

const HOME_BACKGROUND_SRC = "/images/bgfinal.png";
const LOAD_FALLBACK_MS = 4000;
const ZOOM = 1.1;
const IS_SAFARI =
  /Safari/i.test(window.navigator.userAgent) &&
  !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPR|Android/i.test(
    window.navigator.userAgent
  );

const getAppHeight = () => {
  const usesPageZoom = window.innerWidth > 860 && !IS_SAFARI;
  return usesPageZoom ? window.innerHeight / ZOOM : window.innerHeight;
};

const AppContent = () => {
  const location = useLocation();
  const history = useHistory();
  const { theme } = useTheme();
  const [isFoldersOff, setIsFoldersOff] = useState(false);
  const [windowHeight, setWindowHeight] = useState(getAppHeight);

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

  useLayoutEffect(() => {
    if (!IS_SAFARI) return undefined;

    const previousZoom = document.body.style.zoom;
    document.body.style.zoom = "1";
    setWindowHeight(getAppHeight());

    return () => {
      document.body.style.zoom = previousZoom;
    };
  }, []);

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
      setWindowHeight(getAppHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const themeClass = theme === "dark" ? "App dark-theme" : "App";

  return (
    <>
      <div
        className={themeClass}
        aria-busy={!isPageReady}
        style={{
          ...(IS_SAFARI
            ? { position: "fixed", inset: 0, height: "auto" }
            : { height: `${windowHeight}px` }),
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
              isFoldersOff={isFoldersOff}
              setIsFoldersOff={setIsFoldersOff}
              setDesktopScreen={setDesktopScreen}
            />
          </Route>
          <Route path="/portfolio">
            <Portfolio
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
