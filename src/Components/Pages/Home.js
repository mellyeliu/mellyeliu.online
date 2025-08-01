import React, { useState, useContext, useEffect, useRef } from "react";
import Fade from "react-reveal/Fade";
import DesktopIcon from "../Items/DesktopIcon";
import Folder from "../Items/Folder";
import FileData from "../../Data/FileData";
import WindowData from "../../Data/WindowData";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import { ThemeContext } from "../../ThemeContext";
import { Screen } from "../../App";
import Popup from "../Items/Popup";
import { useMediaQuery } from "react-responsive";

const Header = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [openStates, setOpenStates] = useState({
    0: [true, false, true, true],
  });
  const [zIndex, setZIndex] = useState(1);
  const { cursorString, setCursorString } = useContext(ThemeContext);
  const [triggerResize, setTriggerResize] = useState(false);
  const [isFoldersVisible, setIsFoldersVisible] = useState(true);
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

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFullScreenClick = () => {
    setTriggerResize((prevState) => !prevState);
  };

  const handleFolderOpen = (index, isOpen, key) => {
    setOpenStates((prevOpenStates) => {
      const newOpenStates = { ...prevOpenStates };
      newOpenStates[key][index] = isOpen;
      return newOpenStates;
    });
  };

  const toggleButton = () => {
    setIsGridLayout((prevIsGridLayout) => !prevIsGridLayout);
  };

  const handleHoverChange = (hoverState) => {
    setCursorString(hoverState ? "open/close folders" : "");
  };

  const handleFolderHoverChange = (hoverState) => {
    setCursorString(hoverState ? "open/close folders" : "");
  };

  const handleSortHoverChange = () => {
    setCursorString(cursorString === "" ? "sort/shuffle icons" : "");
  };

  const handleFullscreenHoverChange = () => {
    setCursorString(cursorString === "" ? "fullscreen!" : "");
  };

  const folders = ["Games", "Fandoms", "Wikis", "About Me"];
  const display_folders = ["games", "fandoms", "tools", "About Me"];
  const display_strings = [
    "( Gamemaking as playing god )",
    "( Parallel universes of fictional worlds )",
    "( Can we build a collective truth ? )",
    "( Autofiction as therapy )",
  ];
  let alignX = 0;
  let alignY = 30;
  let counter = 0;
  const photoData = {
    place: "( Internet dwelling *ੈ✩‧₊˚ )",
    image: "images/bgfinal.png",
  };

  const renderItems = () => {
    if (isFoldersVisible) {
      return display_folders.map((folder, ind) =>
        openStates && openStates[0][ind]
          ? FileData[folder].map((image) => {
              if (
                !image.border &&
                !(isGridLayout && image.hoverString === "")
              ) {
                alignY = counter % 5 === 0 ? 10 : alignY + 16;
                alignX = counter % 5 === 0 ? alignX + 11 : alignX;
                if (counter === 0) {
                  alignX = 5;
                }
                counter++;
              }
              return image.border && isGridLayout ? (
                <></>
              ) : image.border ? (
                <Popup
                  key={image.url}
                  url={image.url}
                  setZIndex={setZIndex}
                  zIndex={zIndex}
                  setShowCursor={setCursorString}
                  border={true}
                  hoverString={image.hoverString}
                  onHoverChange={handleHoverChange}
                  src={image.src}
                  scale={image.scale}
                  x={isGridLayout ? alignX : image.x}
                  y={isGridLayout ? alignY : image.y}
                  triggerResize={triggerResize}
                  isGridLayout={isGridLayout}
                  content={WindowData[image.hoverString]}
                />
              ) : (
                !((isGridLayout || !isMobile) && image.hoverString === "") && (
                  <DesktopIcon
                    key={image.url}
                    url={image.url}
                    setZIndex={setZIndex}
                    zIndex={zIndex}
                    setShowCursor={setCursorString}
                    border={image.border ? true : false}
                    hoverString={image.hoverString}
                    onHoverChange={handleHoverChange}
                    src={image.src}
                    scale={image.scale}
                    x={isGridLayout ? alignX : image.x}
                    y={isGridLayout ? alignY : image.y}
                    triggerResize={triggerResize}
                    isGridLayout={isGridLayout}
                    iconText={image.iconText}
                  />
                )
              );
            })
          : null
      );
    }
    return null;
  };

  return (
    <>
      <header id="home">
        <Fade duration={500} delay={200}>
          <div
            className="banner"
            style={{
              transition: "height 1s ease",
              display: "inline-block",
              margin: "0px auto",
              padding: "0px",
              width: "100%",
              maxWidth: "100%",
              textAlign: "center",
              position: "relative",
              height: "100%",
              overflow: "hidden",
              clipPath: "inset(0 0 0 0)",
            }}
          >
            <div
              className="bottom-left-2"
              style={{ top: "15px", display: "none" }}
            >
              &#40; 🌐🌷 &#41;
            </div>
            <div
              className="bottom-right"
              style={{ bottom: "20px" }}
              onClick={() => {
                setCursorString("");
                props.setDesktopScreen(Screen.PORTFOLIO);
                handleFullScreenClick();
              }}
            >
              <span
                style={{
                  zIndex: 1000,
                  cursor: "pointer",
                }}
                id="mobile-only"
                onMouseEnter={handleFullscreenHoverChange}
                onMouseLeave={handleFullscreenHoverChange}
              >
                &#40; Projects &#41;
              </span>
            </div>
            <div
              className="bottom-leftt"
              style={{ bottom: "20px" }}
              onClick={() => {
                props.setisFoldersOff(!props.isFoldersOff);
              }}
            >
              <span
                style={{
                  zIndex: 1000,
                  cursor: "pointer",
                }}
                id="mobile-only"
              >
                &#40; Menus &#41;
              </span>
            </div>
            <div className="container" style={{ zIndex: 1 }}>
              <div onClick={toggleButton} className="top-left">
                {isGridLayout ? (
                  <span
                    id="play-button"
                    onMouseEnter={handleSortHoverChange}
                    onMouseLeave={handleSortHoverChange}
                  >
                    &#40; Shuffle{" "}
                    <i
                      style={{ fontSize: 11 }}
                      class="fa fa-random"
                      aria-hidden="true"
                    ></i>
                    &#41;
                  </span>
                ) : (
                  <span
                    id="play-button"
                    onMouseEnter={handleSortHoverChange}
                    onMouseLeave={handleSortHoverChange}
                  >
                    {" "}
                    &#40; Sort &nbsp;
                    <i style={{ fontSize: 8 }} className="fas fa-play"></i>{" "}
                    &#41;
                  </span>
                )}{" "}
              </div>
            </div>
            <div className="hover-container" ref={parentRef}>
              <img
                style={{ opacity: 0 }}
                id="headerpic"
                draggable="false"
                src={photoData.image}
                loading="lazy"
                alt="Background"
              />
              {renderItems()}
              {!props.isFoldersOff &&
                folders.map((folder, index) => (
                  <Folder
                    key={index}
                    src="images/folder.png"
                    isOpen={openStates[0][index]}
                    onOpen={(isOpen) => handleFolderOpen(index, isOpen, 0)}
                    isVisible={isFoldersVisible}
                    hoverString={display_strings[index]}
                    onHoverChange={handleFolderHoverChange}
                    caption={folder}
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
    </>
  );
};

export default Header;
