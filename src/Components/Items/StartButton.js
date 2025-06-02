import React, { useState, useRef, useEffect } from "react";
import { startData } from "../../Data/StartData";

const StartButton = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    setSelectedOption(null);
  };

  const tabStyle = {
    color: "black",
    fontWeight: "500",
    fontStyle: "italic",
    bottom: 60,
    cursor: "pointer",
    paddingLeft: 20,
    borderRight: "0.5px solid black",
  };

  const buttonStyle = {
    padding: "8px 12px",
    display: "block",
    // background: "rgb(245 245 245)",
    cursor: "pointer",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "black",
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "flex-start",
    },
    verticalBlock: {
      background: "linear-gradient(to top, #888, #ddd)",
      padding: "1px",
      textAlign: "center",
      width: "48px",
      lineHeight: "45px",
      alignItems: "center",
      justifyContent: "center",
      borderRight: "0.5px solid black",
      cursor: "default",
    },
    verticalText: {
      color: "white",
      writingMode: "vertical-rl",
      transform: "rotate(180deg)",
      // fontFamily: "Arial, sans-serif",
      fontSize: "18px",
      fontStyle: "italic",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      marginTop: "135px",
      // verticalAlign: "center",
    },
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        ref={buttonRef}
        onClick={toggleDropdown}
        className="hvr-shade"
        style={{
          ...tabStyle,
          cursor: "pointer",
          height: 60,
          paddingTop: "15px",
          marginLeft: "20px !important",
          fontWeight: 500,
          background: isDropdownVisible ? "#ddd" : "none",
        }}
      >
        <span style={{ fontWeight: 500 }}>✧</span> Start &nbsp; &nbsp;
      </div>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          style={{
            display: "flex",
            position: "fixed",
            left: 0,
            letterSpacing: 0,
            bottom: 59.5,
            background: "rgb(235 235 235)",
            borderTop: "0.5px solid black",
            borderLeft: "0.5px solid black",
            borderRight: "0.5px solid black",
            borderBottom: "0.5px solid black",
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            minWidth: "120px",
            zIndex: 1,
          }}
          onMouseLeave={() => handleOptionClick(null)}
        >
          <div style={styles.verticalBlock}>
            <a
              href={"https://linktr.ee/mellye.liu"}
              style={styles.verticalText}
            >
              @mellye.liu
            </a>
          </div>
          <div className="options" style={{ flex: 1 }}>
            {Object.keys(startData).map((option, index) => (
              <a
                key={index}
                className="hvr-shade"
                style={{
                  ...buttonStyle,
                  textAlign: "left",
                  background: selectedOption === option ? "#ddd" : "none",
                }}
                onMouseEnter={() => handleOptionClick(option)}
              >
                {option}
              </a>
            ))}
          </div>
          {selectedOption && startData[selectedOption].length !== 0 && (
            <div
              className="side-panel"
              style={{
                position: "absolute",
                left: 183,
                bottom: 40,
                width: "220px",
                height: "auto",
                backgroundColor: "#fff",
                border: "0.5px solid black",
                zIndex: 2,
              }}
            >
              <ul>
                {startData[selectedOption].map((subOption, index) => (
                  <li
                    key={index}
                    className="hvr-shade"
                    style={{
                      cursor: subOption[1] ? "pointer" : "default",
                      fontStyle: "normal",
                      letterSpacing: -0.3,
                      textAlign: "left",
                      color: "black",
                      padding: "2px 10px",
                    }}
                  >
                    {subOption[1] ? (
                      <a
                        href={subOption[1]}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "black",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {subOption[0]}
                      </a>
                    ) : (
                      subOption[0]
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StartButton;
