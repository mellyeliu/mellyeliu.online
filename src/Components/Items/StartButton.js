import React, { useState, useRef, useEffect } from "react";
import { startData } from "../../Data/StartData";
import * as stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../../styles/tokens.stylex";

const styles = stylex.create({
  hvrShade: {
    backgroundColor: {
      default: "transparent",
      ":hover": "rgb(223, 223, 223)",
    },
  },
  wrapper: {
    position: "relative",
    display: "inline-block",
  },
  dropdown: {
    display: "flex",
    position: "fixed",
    left: 0,
    letterSpacing: 0,
    bottom: 59.5,
    backgroundImage: "none",
    backgroundColor: colors.bgLight,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.black,
    textAlign: "center",
    minWidth: 120,
    maxHeight: "80vh",
    zIndex: 1,
  },
  verticalBlock: {
    backgroundImage: "linear-gradient(to top, #888, #ddd)",
    padding: 1,
    textAlign: "center",
    width: 48,
    lineHeight: "45px",
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 0.5,
    borderRightStyle: "solid",
    borderRightColor: colors.black,
    cursor: "default",
  },
  verticalText: {
    color: colors.white,
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontSize: fontSizes.xl,
    fontStyle: "italic",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 135,
  },
  optionsContainer: {
    flex: 1,
    overflowY: "auto",
    maxHeight: "80vh",
  },
  sidePanel: {
    position: "absolute",
    left: 183,
    bottom: 40,
    width: 220,
    maxHeight: "80vh",
    backgroundImage: "none",
    backgroundColor: colors.bgWhite,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.black,
    zIndex: 2,
    overflowY: "auto",
  },
  sidePanelList: {
    margin: 0,
    padding: 0,
  },
  sidePanelLink: {
    color: colors.black,
    textDecoration: "none",
    display: "block",
  },
  startText: {
    fontWeight: 500,
  },
  tabButton: {
    color: colors.black,
    fontWeight: 500,
    fontStyle: "italic",
    bottom: 60,
    cursor: "pointer",
    paddingLeft: 20,
    borderRightWidth: 0.5,
    borderRightStyle: "solid",
    borderRightColor: colors.black,
    height: 60,
    paddingTop: 15,
  },
  tabButtonActive: {
    backgroundColor: colors.bgActive,
  },
  tabButtonInactive: {
    backgroundColor: "transparent",
  },
  optionButton: {
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    display: "block",
    cursor: "pointer",
    fontSize: fontSizes.lg,
    fontStyle: "normal",
    letterSpacing: 0,
    color: colors.black,
    textAlign: "left",
  },
  optionButtonActive: {
    backgroundColor: colors.bgActive,
  },
  optionButtonInactive: {
    backgroundColor: "transparent",
  },
  sidePanelItem: {
    fontStyle: "normal",
    letterSpacing: -0.3,
    textAlign: "left",
    fontSize: fontSizes.lg,
    color: colors.black,
    paddingTop: 2,
    paddingRight: 10,
    paddingBottom: 2,
    paddingLeft: 10,
  },
  sidePanelItemClickable: {
    cursor: "pointer",
  },
  sidePanelItemDefault: {
    cursor: "default",
  },
});

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

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div
        ref={buttonRef}
        onClick={toggleDropdown}
        {...stylex.props(
          styles.hvrShade,
          styles.tabButton,
          isDropdownVisible
            ? styles.tabButtonActive
            : styles.tabButtonInactive
        )}
      >
        <span {...stylex.props(styles.startText)}>✧</span> Start &nbsp; &nbsp;
      </div>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          {...stylex.props(styles.dropdown)}
          onMouseLeave={() => handleOptionClick(null)}
        >
          <div {...stylex.props(styles.verticalBlock)}>
            <a
              href={"https://linktr.ee/mellye.liu"}
              {...stylex.props(styles.verticalText)}
            >
              @mellye.liu
            </a>
          </div>
          <div {...stylex.props(styles.optionsContainer)}>
            {Object.keys(startData).map((option, index) => (
              <a
                key={index}
                {...stylex.props(
                  styles.hvrShade,
                  styles.optionButton,
                  selectedOption === option
                    ? styles.optionButtonActive
                    : styles.optionButtonInactive
                )}
                onMouseEnter={() => handleOptionClick(option)}
              >
                {option}
              </a>
            ))}
          </div>
          {selectedOption && startData[selectedOption].length !== 0 && (
            <div {...stylex.props(styles.sidePanel)}>
              <ul {...stylex.props(styles.sidePanelList)}>
                {startData[selectedOption].map((subOption, index) => (
                  <li
                    key={index}
                    {...stylex.props(
                      styles.hvrShade,
                      styles.sidePanelItem,
                      subOption[1]
                        ? styles.sidePanelItemClickable
                        : styles.sidePanelItemDefault
                    )}
                  >
                    {subOption[1] ? (
                      <a
                        href={subOption[1]}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...stylex.props(styles.sidePanelLink)}
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
