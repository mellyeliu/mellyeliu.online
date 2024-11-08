import React, { useState } from "react";
import { isMobile } from "react-device-detect";

const Folder = ({
  scale,
  y,
  hoverString,
  onHoverChange,
  caption,
  isOpen,
  onOpen,
  image,
}) => {
  const handleClick = () => {
    onOpen(!isOpen);
  };

  const onHover = () => {
    onHoverChange(hoverString);
  };

  const stopHover = () => {
    onHoverChange("");
  };

  return (
    <div
      onClick={handleClick}
      className="folderIcon"
      style={{
        position: "fixed",
        cursor: "pointer",
        right: 10,
        filter: "drop-shadow(0px 6px 6px rgba(0,0,0,0.4))",
        top: y,
        userSelect: "none",
        zIndex: 100,
        display: "block",
        transform: `scale(${scale})`,
      }}
    >
      <img
        src={
          image
            ? image
            : isOpen
            ? "/images/menu/folderNewOpen.png"
            : "/images/menu/folder.png"
        }
        onMouseLeave={stopHover}
        onMouseEnter={onHover}
        className="folder"
        draggable={false}
      />
      {caption && (
        <div
          className="folderText"
          style={{
            fontSize: 30,
            color: "black",
            fontFamily: "Cormorant Garamond",
            fontStyle: "italic",
            fontWeight: isOpen ? "500" : "400",
            fontColor: "#111111",
          }}
        >
          {caption}
        </div>
      )}{" "}
    </div>
  );
};

export default Folder;
