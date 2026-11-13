import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const Screen = {
  HOME: "HOME",
  PORTFOLIO: "PORTFOLIO",
};

const SCREEN_PATHS = {
  [Screen.HOME]: "/",
  [Screen.PORTFOLIO]: "/portfolio",
};

export const useDesktopScreen = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const screen = pathname.startsWith("/portfolio")
    ? Screen.PORTFOLIO
    : Screen.HOME;
  const setScreen = useCallback(
    (next) => history.push(SCREEN_PATHS[next]),
    [history]
  );
  return [screen, setScreen];
};
