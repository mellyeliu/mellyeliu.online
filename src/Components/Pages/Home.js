import React, { useState, useEffect, useRef, useCallback } from "react";
import Fade from "../Items/Fade";
import DesktopIcon from "../Items/DesktopIcon";
import Folder from "../Items/Folder";
import FileData from "../../Data/FileData";
import WindowData from "../../Data/WindowData";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import { useUI } from "../../context/UIContext";
import { Screen } from "../../App";
import Popup from "../Items/Popup";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  projectsButton: {
    zIndex: 1000,
    cursor: "pointer",
  },
  headerImage: {
    opacity: 0,
  },
});

const FOLDERS = [
  {
    key: "games",
    display: "Games",
    hoverText: "( Gamemaking as playing god )",
  },
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
  {
    key: "About Me",
    display: "About Me",
    hoverText: "( Autofiction as therapy )",
  },
];

const Home = ({ isFoldersOff, setIsFoldersOff, setDesktopScreen }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const { cursorString, setCursorString } = useUI();

  const [isGridLayout, setIsGridLayout] = useState(false);
  const [openStates, setOpenStates] = useState([true, false, true, true]);
  const [triggerResize, setTriggerResize] = useState(false);
  const [isFoldersVisible, setIsFoldersVisible] = useState(true);
  const [zIndex, setZIndex] = useState(1);

  const parentRef = useRef(null);

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const diffX = touch.clientX - startX;
      const diffY = touch.clientY - startY;

      if (Math.abs(diffY) > Math.abs(diffX)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const isElementInViewport = useCallback((el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (parentRef.current) {
        const visible = isElementInViewport(parentRef.current);
        if (visible !== isFoldersVisible) {
          setIsFoldersVisible(visible);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFoldersVisible, isElementInViewport]);

  const handleFullScreenClick = useCallback(() => {
    setTriggerResize((prev) => !prev);
  }, []);

  const handleFolderOpen = useCallback((index, isOpen) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = isOpen;
      return newStates;
    });
  }, []);

  const toggleLayout = useCallback(() => {
    setIsGridLayout((prev) => !prev);
  }, []);

  const handleHoverChange = useCallback(
    (hoverState, hoverString) => {
      setCursorString(hoverState ? hoverString || "" : "");
    },
    [setCursorString]
  );

  const handleFolderHoverChange = useCallback(
    (hoverState, folderIndex) => {
      if (hoverState && folderIndex !== undefined) {
        setCursorString(FOLDERS[folderIndex].hoverText);
      } else {
        setCursorString("");
      }
    },
    [setCursorString]
  );

  const handleSortHover = useCallback(
    (isHovering) => {
      setCursorString(isHovering ? "Shuffle!" : "");
    },
    [setCursorString]
  );

  const handleFullscreenHover = useCallback(
    (isHovering) => {
      setCursorString(isHovering ? "fullscreen!" : "");
    },
    [setCursorString]
  );

  const photoData = {
    place: "( Internet dwelling *ੈ✩‧₊˚ )",
    image: `${window.location.origin}/images/bgfinal.png`,
  };

  const renderItems = useCallback(() => {
    if (!isFoldersVisible) return null;

    let alignX = 0;
    let alignY = 30;
    let counter = 0;

    return FOLDERS.map((folder, folderIndex) => {
      if (!openStates[folderIndex]) return null;

      const folderData = FileData[folder.key];
      if (!folderData) return null;

      return folderData.map((item, itemIndex) => {
        if (isGridLayout && item.hoverString === "") return null;

        if (!item.border && !(isGridLayout && item.hoverString === "")) {
          alignY = counter % 5 === 0 ? 10 : alignY + 16;
          alignX = counter % 5 === 0 ? alignX + 11 : alignX;
          if (counter === 0) alignX = 5;
          counter++;
        }

        const key = `${folder.key}-${itemIndex}`;
        const posX = isGridLayout ? alignX : item.x;
        const posY = isGridLayout ? alignY : item.y;

        if (item.border) {
          if (isGridLayout) return null;

          return (
            <Popup
              key={key}
              url={item.url}
              hoverString={item.hoverString}
              onHoverChange={handleHoverChange}
              src={`${window.location.origin}/${item.src}`}
              x={posX}
              y={posY}
              zIndex={zIndex}
              setZIndex={setZIndex}
              setShowCursor={setCursorString}
              triggerResize={triggerResize}
              isGridLayout={isGridLayout}
              content={WindowData[item.hoverString]}
            />
          );
        }

        if ((isGridLayout || !isMobile) && item.hoverString === "") {
          return null;
        }

        return (
          <DesktopIcon
            key={key}
            url={item.url}
            hoverString={item.hoverString}
            onHoverChange={handleHoverChange}
            src={item.src ? `${window.location.origin}/${item.src}` : ""}
            x={posX}
            y={posY}
            triggerResize={triggerResize}
            isGridLayout={isGridLayout}
            iconText={item.iconText}
          />
        );
      });
    });
  }, [
    isFoldersVisible,
    openStates,
    isGridLayout,
    isMobile,
    triggerResize,
    handleHoverChange,
  ]);

  return (
    <header id="home">
      <Fade duration={500} delay={200}>
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
          <div className="bottom-left-2" style={{ top: 15, display: "none" }}>
            &#40; 🌐🌷 &#41;
          </div>

          <div
            className="bottom-right"
            style={{ bottom: 20 }}
            onClick={() => {
              setCursorString("");
              setDesktopScreen(Screen.PORTFOLIO);
              handleFullScreenClick();
            }}
          >
            <span
              {...stylex.props(styles.projectsButton)}
              id="mobile-only"
              onMouseEnter={() => handleFullscreenHover(true)}
              onMouseLeave={() => handleFullscreenHover(false)}
            >
              &#40; Projects &#41;
            </span>
          </div>

          <div
            className="bottom-leftt"
            style={{ bottom: 20 }}
            onClick={() => setIsFoldersOff(!isFoldersOff)}
          >
            <span {...stylex.props(styles.projectsButton)} id="mobile-only">
              &#40; Menus &#41;
            </span>
          </div>

          <div className="container" style={{ zIndex: 1 }}>
            <div onClick={toggleLayout} className="top-left">
              {isGridLayout ? (
                <span
                  id="play-button"
                  onMouseEnter={() => handleSortHover(true)}
                  onMouseLeave={() => handleSortHover(false)}
                >
                  &#40; Shuffle{" "}
                  <i
                    style={{ fontSize: 11 }}
                    className="fa fa-random"
                    aria-hidden="true"
                  />
                  &#41;
                </span>
              ) : (
                <span
                  id="play-button"
                  onMouseEnter={() => handleSortHover(true)}
                  onMouseLeave={() => handleSortHover(false)}
                >
                  {" "}
                  &#40; Sort &nbsp;
                  <i style={{ fontSize: 8 }} className="fas fa-play" /> &#41;
                </span>
              )}
            </div>
          </div>

          <div className="hover-container" ref={parentRef}>
            <img
              {...stylex.props(styles.headerImage)}
              id="headerpic"
              draggable="false"
              src={photoData.image}
              loading="lazy"
              alt="Background"
            />

            {renderItems()}

            {!isFoldersOff &&
              FOLDERS.map((folder, index) => (
                <Folder
                  key={folder.key}
                  src={`${window.location.origin}/images/folder.png`}
                  isOpen={openStates[index]}
                  onOpen={(isOpen) => handleFolderOpen(index, isOpen)}
                  isVisible={isFoldersVisible}
                  hoverString={folder.hoverText}
                  onHoverChange={(hoverState) =>
                    handleFolderHoverChange(hoverState, index)
                  }
                  caption={folder.display}
                  x={0}
                  y={150 + 90 * (index + 1)}
                  scale={0.5}
                />
              ))}

            {cursorString ? (
              <div id="header-hover" className="bottom-left">
                {cursorString}
              </div>
            ) : (
              <div className="bottom-left">{photoData.place}</div>
            )}
          </div>
        </div>
      </Fade>
    </header>
  );
};

Home.propTypes = {
  setDesktopScreen: PropTypes.func.isRequired,
  isFoldersOff: PropTypes.bool.isRequired,
  setIsFoldersOff: PropTypes.func.isRequired,
};

export default Home;
