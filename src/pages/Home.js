import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import DesktopIcon from "../components/desktop/DesktopIcon";
import Folder from "../components/desktop/Folder";
import Popup from "../components/desktop/Popup";
import FileData from "../data/FileData";
import { socials } from "../data/PortfolioData";
import WindowData from "../data/WindowData";
import { useCursorString, useUIActions } from "../context/UIContext";
import { Screen, useDesktopScreen } from "../routes";
import useIsMobile from "../hooks/useIsMobile";
import { fonts } from "../styles/tokens.stylex";

// Browsers that understand image-set() with type() all decode WebP. site.css
// uses the same check, so the CSS background and this URL always match.
const SUPPORTS_WEBP_BACKGROUND =
  typeof CSS !== "undefined" &&
  CSS.supports("background-image", 'image-set(url("a.webp") type("image/webp"))');
export const HOME_BACKGROUND_SRC = SUPPORTS_WEBP_BACKGROUND
  ? "/images/bgfinal.webp"
  : "/images/bgfinal.png";
const DEFAULT_CAPTION = "( Internet dwelling *ੈ✩‧₊˚ )";

const styles = stylex.create({
  button: {
    zIndex: 1000,
    cursor: "pointer",
  },
  headerImage: {
    opacity: 0,
  },
  pager: {
    position: "fixed",
    right: 10,
    width: 128,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    transform: "scale(0.5)",
    fontFamily: fonts.serif,
    fontStyle: "italic",
    fontSize: 30,
    color: "#111111",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  pagerLabel: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
  },
  pagerArrow: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    color: "inherit",
    font: "inherit",
    fontStyle: "normal",
    lineHeight: 1,
    cursor: {
      default: "pointer",
      ":disabled": "default",
    },
    opacity: {
      default: 1,
      ":disabled": 0.25,
    },
  },
});

const FOLDERS = [
  { key: "games", display: "Games", hoverText: "( Gamemaking as playing god )" },
  {
    key: "fandoms",
    display: "Fandoms",
    hoverText: "( Parallel universes of fictional worlds )",
  },
  {
    key: "tools",
    display: "Wikis",
    hoverText: "( Can we build a collective truth ? )",
  },
  { key: "About Me", display: "About Me", hoverText: "( Autofiction as therapy )" },
];

const SOCIAL_FOLDERS = socials.map((social) => ({
  key: social.url,
  display: social.label,
  hoverText: `( ${social.url.replace(/^https?:\/\//, "")} )`,
  url: social.url,
}));
const FOLDER_PAGES = [SOCIAL_FOLDERS, FOLDERS];
const folderTop = (index) => 150 + 90 * (index + 1);

// Stops the page from scrolling or bouncing on vertical swipes (mobile).
const usePreventVerticalSwipe = () => {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const diffX = e.touches[0].clientX - startX;
      const diffY = e.touches[0].clientY - startY;
      if (Math.abs(diffY) > Math.abs(diffX)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

// Grid ("sorted") layout: columns of five, 11% apart, starting at x=5%.
const gridPosition = (index) => ({
  x: 5 + Math.floor(index / 5) * 11,
  y: 10 + (index % 5) * 16,
});

const Home = ({ isFoldersOff, setIsFoldersOff }) => {
  const isMobile = useIsMobile();
  const cursorString = useCursorString();
  const { setCursorString } = useUIActions();
  const [, setDesktopScreen] = useDesktopScreen();
  usePreventVerticalSwipe();

  const [isGridLayout, setIsGridLayout] = useState(false);
  const [openStates, setOpenStates] = useState([true, false, true, true]);
  const [folderPage, setFolderPage] = useState(0);
  const pageFolders = FOLDER_PAGES[folderPage];

  const hoverHandlers = (text) => ({
    onMouseEnter: () => setCursorString(text),
    onMouseLeave: () => setCursorString(""),
  });

  const handleHoverChange = useCallback(
    (isHovering, hoverString) => {
      setCursorString(isHovering ? hoverString || "" : "");
    },
    [setCursorString]
  );

  const toggleFolder = (index, isOpen) => {
    setOpenStates((prev) => prev.map((open, i) => (i === index ? isOpen : open)));
  };

  const renderItems = () => {
    let gridIndex = 0;

    return FOLDERS.flatMap((folder, folderIndex) => {
      if (!openStates[folderIndex]) return [];

      return FileData[folder.key].map((item, itemIndex) => {
        const key = `${folder.key}-${itemIndex}`;
        const hasHoverText = item.hoverString !== "";

        if (item.window) {
          if (isGridLayout) return null;
          return (
            <Popup
              key={key}
              hoverString={item.hoverString}
              onHoverChange={handleHoverChange}
              src={`/${item.src}`}
              x={item.x}
              y={item.y}
              content={WindowData[item.window]}
            />
          );
        }

        // Icons without hover text only show on mobile, and never in the grid.
        if (!hasHoverText && (isGridLayout || !isMobile)) return null;

        const position = isGridLayout ? gridPosition(gridIndex++) : item;
        return (
          <DesktopIcon
            key={key}
            url={item.url}
            hoverString={item.hoverString}
            onHoverChange={handleHoverChange}
            src={item.src ? `/${item.src}` : ""}
            x={position.x}
            y={position.y}
            iconText={item.iconText}
            bounds={item.bounds}
          />
        );
      });
    });
  };

  return (
    <header id="home" style={{ height: "100%" }}>
      <div
        className="banner"
        style={{
          transition: "height 1s ease",
          display: "inline-block",
          margin: 0,
          padding: 0,
          width: "100%",
          maxWidth: "100%",
          textAlign: "center",
          position: "relative",
          height: "100%",
          overflow: "hidden",
          clipPath: "inset(0 0 0 0)",
        }}
      >
        {/* Hidden by default; site.css shows it on small screens. */}
        <div className="bottom-left-2" style={{ top: 15, display: "none" }}>
          &#40; 🌐🌷 &#41;
        </div>

        <div
          className="bottom-right"
          style={{ bottom: 20 }}
          onClick={() => {
            setCursorString("");
            setDesktopScreen(Screen.PORTFOLIO);
          }}
        >
          <span
            {...stylex.props(styles.button)}
            id="mobile-only"
            {...hoverHandlers("fullscreen!")}
          >
            &#40; Projects &#41;
          </span>
        </div>

        <div
          className="bottom-leftt"
          style={{ bottom: 20 }}
          onClick={() => setIsFoldersOff(!isFoldersOff)}
        >
          <span {...stylex.props(styles.button)} id="mobile-only">
            &#40; Menus &#41;
          </span>
        </div>

        <div className="container" style={{ zIndex: 1 }}>
          <div onClick={() => setIsGridLayout((prev) => !prev)} className="top-left">
            <span id="play-button" {...hoverHandlers("Shuffle!")}>
              {isGridLayout ? (
                <>
                  &#40; Shuffle{" "}
                  <i style={{ fontSize: 11 }} className="fa fa-random" aria-hidden="true" />
                  &#41;
                </>
              ) : (
                <>
                  {" "}
                  &#40; Sort &nbsp;
                  <i style={{ fontSize: 8 }} className="fas fa-play" /> &#41;
                </>
              )}
            </span>
          </div>
        </div>

        <div className="hover-container">
          <img
            {...stylex.props(styles.headerImage)}
            id="headerpic"
            draggable="false"
            src={HOME_BACKGROUND_SRC}
            loading="eager"
            fetchPriority="high"
            alt="Background"
          />

          {renderItems()}

          {!isFoldersOff &&
            pageFolders.map((folder, index) => (
              <Folder
                key={folder.key}
                isOpen={folder.url ? false : openStates[index]}
                onOpen={(isOpen) =>
                  folder.url
                    ? window.open(folder.url, "_blank", "noopener,noreferrer")
                    : toggleFolder(index, isOpen)
                }
                hoverString={folder.hoverText}
                onHoverChange={(isHovering) =>
                  setCursorString(isHovering ? folder.hoverText : "")
                }
                caption={folder.display}
                y={folderTop(index)}
                scale={0.5}
              />
            ))}

          {!isFoldersOff && (
            <div
              {...stylex.props(styles.pager)}
              style={{ top: folderTop(pageFolders.length) + 45 }}
            >
              <button
                type="button"
                aria-label="Previous folders"
                disabled={folderPage === 0}
                onClick={() => setFolderPage((page) => page - 1)}
                {...stylex.props(styles.pagerArrow)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Switch folder page"
                onClick={() => setFolderPage((page) => (page + 1) % FOLDER_PAGES.length)}
                {...stylex.props(styles.pagerLabel)}
              >
                ( {folderPage + 1}/{FOLDER_PAGES.length} )
              </button>
              <button
                type="button"
                aria-label="Next folders"
                disabled={folderPage === FOLDER_PAGES.length - 1}
                onClick={() => setFolderPage((page) => page + 1)}
                {...stylex.props(styles.pagerArrow)}
              >
                ›
              </button>
            </div>
          )}

          {cursorString ? (
            <div id="header-hover" className="bottom-left">
              {cursorString}
            </div>
          ) : (
            <div className="bottom-left">{DEFAULT_CAPTION}</div>
          )}
        </div>
      </div>
    </header>
  );
};

Home.propTypes = {
  isFoldersOff: PropTypes.bool.isRequired,
  setIsFoldersOff: PropTypes.func.isRequired,
};

export default Home;
