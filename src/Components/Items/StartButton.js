import React, { useState, useRef, useEffect } from "react";
import { startData } from "../../Data/StartData";
import * as stylex from "@stylexjs/stylex";
import { colors, fontSizes } from "../../styles/tokens.stylex";

const styles = stylex.create({
  hvrShade: {
    backgroundColor: {
      default: "transparent",
      ":hover": "rgb(232, 232, 232)",
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
    bottom: 62.5,
    backgroundImage: "none",
    backgroundColor: colors.bgLight,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.black,
    textAlign: "center",
    minWidth: 120,
    maxHeight: "calc(80vh / 1.1)",
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
    maxHeight: "calc(80vh / 1.1)",
  },
  sidePanel: {
    position: "absolute",
    left: "calc(100% - 0.5px)",
    bottom: 40,
    width: 220,
    maxHeight: "calc(80vh / 1.1)",
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
    height: 63,
    paddingTop: 16,
  },
  tabButtonActive: {
    backgroundColor: colors.bgActive,
  },
  tabButtonInactive: {
    backgroundColor: {
      default: "transparent",
      ":hover": "rgb(232, 232, 232)",
    },
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
    letterSpacing: -0.3,
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
    letterSpacing: 0,
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
  const [selectedOption, setSelectedOption] = useState(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close the menu on any click outside it.
  useEffect(() => {
    if (!isDropdownVisible) return undefined;

    const handleMouseDown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
        setSelectedOption(null);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
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
          onMouseLeave={() => setSelectedOption(null)}
        >
          <div {...stylex.props(styles.verticalBlock)}>
            <a
              href="https://linktr.ee/mellye.liu"
              {...stylex.props(styles.verticalText)}
            >
              @mellye.liu
            </a>
          </div>
          <div {...stylex.props(styles.optionsContainer)}>
            {Object.keys(startData).map((option) => (
              <a
                key={option}
                {...stylex.props(
                  styles.hvrShade,
                  styles.optionButton,
                  selectedOption === option
                    ? styles.optionButtonActive
                    : styles.optionButtonInactive
                )}
                onMouseEnter={() => setSelectedOption(option)}
              >
                {option}
              </a>
            ))}
          </div>
          {selectedOption && startData[selectedOption].length > 0 && (
            <div {...stylex.props(styles.sidePanel)}>
              <ul {...stylex.props(styles.sidePanelList)}>
                {startData[selectedOption].map(([label, href], index) => (
                  <li
                    key={index}
                    {...stylex.props(
                      styles.hvrShade,
                      styles.sidePanelItem,
                      href ? styles.sidePanelItemClickable : styles.sidePanelItemDefault
                    )}
                  >
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...stylex.props(styles.sidePanelLink)}
                      >
                        {label}
                      </a>
                    ) : (
                      label
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
