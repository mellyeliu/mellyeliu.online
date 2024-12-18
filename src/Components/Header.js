import React, { useState, useContext, useEffect, useRef } from "react";
import Fade from "react-reveal/Fade";
import DesktopIcon from "./DesktopIcon";
import Folder from "./Folder";
import FileData, { windowData } from "../Data/FileData";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import { ThemeContext } from "../ThemeContext";
import { Screen } from "../App";
import Popup from "./Popup";

const Header = (props) => {
  const [isGridLayout, setIsGridLayout] = useState(false);
  const [isChildHovered, setIsChildHovered] = useState("");
  const [openStates, setOpenStates] = useState({
    0: [true, false, true, true],
  });
  const [zIndex, setZIndex] = useState(1);
  const { cursorString, setCursorString } = useContext(ThemeContext);
  const [triggerResize, setTriggerResize] = useState(false);
  const [isFoldersVisible, setIsFoldersVisible] = useState(true);
  const parentRef = useRef(null); // Reference to the parent element

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

    const preventVerticalScroll = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventVerticalScroll, {
      passive: false,
    });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", preventVerticalScroll, {
        passive: false,
      });
      document.removeEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      document.removeEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    };
  }, []);

  // Function to check if the parent element is visible in the viewport
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

  // Effect to add window scroll event listener
  useEffect(() => {
    setTriggerResize((prevState) => !prevState);
    const handleScroll = () => {
      if (parentRef.current) {
        setIsFoldersVisible(isElementInViewport(parentRef.current));
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.desktopScreen]);

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
    setIsChildHovered(hoverState);
  };

  const handleFolderHoverChange = (hoverState) => {
    setIsChildHovered(hoverState);
    if (hoverState === "") {
      setCursorString("");
    } else {
      setCursorString("open/close folders");
    }
  };

  const handleSortHoverChange = () => {
    if (cursorString === "") {
      setCursorString("sort/shuffle icons");
    } else {
      setCursorString("");
    }
  };

  const handleFullscreenHoverChange = () => {
    if (cursorString === "") {
      setCursorString("fullscreen!");
    } else {
      setCursorString("");
    }
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
    place: "( Internet gardening )",
    image: "images/bgfinal.png",
  };

  const art = (
    <div className="hover-container" ref={parentRef}>
      <img
        style={{ opacity: 0 }}
        id="headerpic"
        draggable="false"
        src={photoData.src}
      ></img>

      {display_folders.map((folder, ind) => {
        return (openStates && openStates[0][ind]) || false
          ? FileData[folder].map((image) => {
              if (!image.border) {
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
                  content={windowData[image.hoverString]}
                ></Popup>
              ) : (
                <DesktopIcon
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
                ></DesktopIcon>
              );
            })
          : null;
      })}
      {!isGridLayout && (
        <div style={{ position: "absolute", left: 920 }}>.</div>
      )}
      {!props.isFoldersOff && (
        <>
          <Folder
            image={"images/menu/safari.png"}
            isOpen={false}
            hoverString={"( Tinkering... )"}
            onOpen={() => {
              props.setDesktopScreen(Screen.PORTFOLIO);
              setCursorString("");
            }}
            isVisible={isFoldersVisible}
            onHoverChange={handleFolderHoverChange}
            caption={"Projects"}
            x={0}
            y={145}
            scale={0.5}
          />
          {/* <Folder
            image={"images/menu/blog.png"}
            isOpen={false}
            hoverString={"( Neurotic autofiction )"}
            onOpen={() => {
              window.open("https://reading.supply/@mellyeliu", "_blank");
            }}
            isVisible={isFoldersVisible}
            onHoverChange={handleFolderHoverChange}
            caption={"Vsco"}
            x={0}
            y={245}
            scale={0.5}
          />
          <Folder
            image={"images/menu/filep.png"}
            isOpen={false}
            hoverString={"( Neurotic autofiction )"}
            onOpen={() => {
              window.open("https://reading.supply/@mellyeliu", "_blank");
            }}
            isVisible={isFoldersVisible}
            onHoverChange={handleFolderHoverChange}
            caption={"Journal"}
            x={0}
            y={340}
            scale={0.5}
          />
          <Folder
            src={"images/menu/projects.png"}
            isOpen={() => {}}
            onOpen={() => {}}
            isVisible={isFoldersVisible}
            hoverString={"h"}
            key={3}
            onHoverChange={handleFolderHoverChange}
            caption={"Folder"}
            x={0}
            y={440}
            scale={0.5}
          /> */}
        </>
      )}
      {folders.map((folder, index) => {
        return !props.isFoldersOff ? (
          <Folder
            src={"images/folder.png"}
            isOpen={openStates[0][index]}
            onOpen={(isOpen) => handleFolderOpen(index, isOpen, 0)}
            isVisible={isFoldersVisible}
            hoverString={display_strings[index]}
            key={index}
            onHoverChange={handleFolderHoverChange}
            caption={folder}
            x={0}
            y={150 + 90 * (index + 1)}
            scale={0.5}
          />
        ) : null;
      })}
      {isChildHovered === "" ? (
        <div className="bottom-left">{photoData.place} </div>
      ) : (
        <div id="header-hover" className="bottom-left">
          {isChildHovered}{" "}
        </div>
      )}
    </div>
  );

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
              {" "}
              &#40; 🌐🌷 &#41;{" "}
            </div>
            <div
              onClick={() => {
                setCursorString("");
                props.setDesktopScreen(Screen.PORTFOLIO);
                handleFullScreenClick();
              }}
              className="bottom-right"
              style={{ bottom: "20px" }}
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
                {/* &#x2194; */}
              </span>
            </div>
            <div
              onClick={() => {
                props.setisFoldersOff(!props.isFoldersOff);
              }}
              className="bottom-leftt"
              style={{ bottom: "20px" }}
            >
              <span
                style={{
                  zIndex: 1000,
                  cursor: "pointer",
                }}
                id="mobile-only"
              >
                &#40; Menus &#41;
                {/* &#x2194; */}
              </span>
            </div>
            <div className="container" style={{ zIndex: 1 }}>
              {/* <Pet /> */}
              <div
                onClick={toggleButton}
                className="top-left"
                // onMouseEnter={handleSortHoverChange}
                // onMouseLeave={handleSortHoverChange}
              >
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
            {art}
          </div>
        </Fade>
      </header>
    </>
  );
};

export default Header;
