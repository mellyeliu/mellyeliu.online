import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactGA from "react-ga";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home, { HOME_BACKGROUND_SRC } from "./Components/Pages/Home";
import Portfolio from "./Components/Pages/Portfolio";
import NameTag from "./Components/Items/NameTag";
import StartBar from "./Components/Items/StartBar";
import { UIProvider } from "./context/UIContext";
import { Screen, useDesktopScreen } from "./routes";
import whenDecoded from "./utils/whenDecoded";

const LOAD_FALLBACK_MS = 4000;
const ZOOM = 1.1;
const IS_SAFARI =
  /Safari/i.test(window.navigator.userAgent) &&
  !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPR|Android/i.test(
    window.navigator.userAgent
  );

// Above 860px the body is zoomed (see site.css), except in Safari.
const getAppHeight = () => {
  const usesPageZoom = window.innerWidth > 860 && !IS_SAFARI;
  return usesPageZoom ? window.innerHeight / ZOOM : window.innerHeight;
};

// Resolves once the home background has decoded (or after a fallback delay),
// so the desktop fades in fully drawn.
const useHomeBackgroundReady = (enabled) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!enabled || isReady) return undefined;

    let cancelled = false;
    const image = new Image();
    image.fetchPriority = "high";
    image.decoding = "async";

    const reveal = () => {
      if (!cancelled) setIsReady(true);
    };
    const fallbackTimer = window.setTimeout(reveal, LOAD_FALLBACK_MS);
    image.onload = () => whenDecoded(image, reveal);
    image.onerror = reveal;
    image.src = HOME_BACKGROUND_SRC;

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
      image.onload = null;
      image.onerror = null;
    };
  }, [enabled, isReady]);

  return isReady;
};

const AppContent = () => {
  const [desktopScreen] = useDesktopScreen();
  const [isFoldersOff, setIsFoldersOff] = useState(false);
  const [windowHeight, setWindowHeight] = useState(getAppHeight);

  const isHome = desktopScreen === Screen.HOME;
  const isHomeReady = useHomeBackgroundReady(isHome);
  const isPageReady = !isHome || isHomeReady;

  // Safari skips the CSS page zoom and uses a fixed-position app instead.
  useLayoutEffect(() => {
    if (!IS_SAFARI) return undefined;

    const previousZoom = document.body.style.zoom;
    document.body.style.zoom = "1";

    return () => {
      document.body.style.zoom = previousZoom;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowHeight(getAppHeight());
    window.addEventListener("resize", handleResize);

    // Re-measure once layout and fonts have settled.
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div
      className="App"
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
      {isHome && !isFoldersOff && <NameTag />}
      <Switch>
        <Route exact path="/">
          <Home isFoldersOff={isFoldersOff} setIsFoldersOff={setIsFoldersOff} />
        </Route>
        <Route path="/portfolio">
          <Portfolio />
        </Route>
      </Switch>
      <StartBar />
    </div>
  );
};

const App = () => (
  <UIProvider>
    <AppContent />
  </UIProvider>
);

export default App;
