import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  black: "#000",
  darkGray: "#111",
  mediumGray: "rgb(150, 150, 150)",
  white: "#fff",

  bgWhite: "#ffffff",
  bgLight: "#f9f9f9",
  bgGray: "rgb(241, 241, 241)",
  bgHover: "rgb(225, 225, 225)",
  bgActive: "#ddd",

  iconGreen: "#00CA4E",
  iconYellow: "#FFBD44",
  iconRed: "#FF605C",
});

export const fonts = stylex.defineVars({
  serif: '"Cormorant Garamond", serif',
  helvetica: "Helvetica, Arial, sans-serif",
});

export const fontSizes = stylex.defineVars({
  sm: "12px",
  md: "14px",
  lg: "17px",
  xl: "18px",
});

export const radii = stylex.defineVars({
  sm: "2px",
  md: "5px",
  lg: "6px",
  xl: "20px",
  full: "50%",
});
