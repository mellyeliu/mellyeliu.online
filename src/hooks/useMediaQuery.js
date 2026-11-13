import { useSyncExternalStore } from "react";

// Live result of a CSS media query, e.g. useMediaQuery("(max-width: 767px)").
const useMediaQuery = (query) =>
  useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches
  );

export default useMediaQuery;
