import React, { useState } from "react";
import { Screen } from "../../App";

const BrowserIcons = ({ setDesktopScreen }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    window.location.reload();
    setDesktopScreen(Screen.HOME);
  };

  return (
    <span
      className="browsero"
      style={{ cursor: "pointer" }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span
        style={{
          display: "inline-block",
          position: "relative",
          width: "16px",
          height: "16px",
          textAlign: "center",
          lineHeight: "16px",
          cursor: "not-allowed",
          marginRight: "5px",
        }}
      >
        ○
        {hovered && (
          <span
            style={{
              content: "",
              position: "absolute",
              top: 3,
              left: 2.5,
              cursor: "not-allowed",
              width: "65%",
              height: "65%",
              borderRadius: "50%",
              backgroundColor: "#00CA4E",
              opacity: 1,
              zIndex: -1,
            }}
          />
        )}
      </span>
      <span
        style={{
          display: "inline-block",
          position: "relative",
          width: "16px",
          height: "16px",
          cursor: "not-allowed",
          textAlign: "center",
          lineHeight: "16px",
          marginRight: "5px",
        }}
      >
        ○
        {hovered && (
          <span
            style={{
              content: "",
              position: "absolute",
              top: 3,
              left: 2.5,
              width: "65%",
              height: "65%",
              borderRadius: "50%",
              backgroundColor: "#FFBD44",
              opacity: 1,
              zIndex: -1,
            }}
          />
        )}
      </span>
      <span
        style={{
          cursor: "pointer",
          display: "inline-block",
          position: "relative",
          width: "16px",
          height: "16px",
          textAlign: "center",
          lineHeight: "16px",
        }}
        onClick={handleClick}
      >
        ○
        {hovered && (
          <span
            style={{
              content: "",
              position: "absolute",
              top: 3,
              left: 2.5,
              width: "65%",
              height: "65%",
              borderRadius: "50%",
              backgroundColor: "#FF605C",
              opacity: 1,
              zIndex: -1,
            }}
          />
        )}
      </span>
    </span>
  );
};

export default BrowserIcons;
