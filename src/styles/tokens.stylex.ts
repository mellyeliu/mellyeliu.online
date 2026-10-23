import * as stylex from "@stylexjs/stylex";



export const colors = stylex.defineVars({
  black: "#000",
  darkGray: "#111",
  gray: "#444",
  mediumGray: "rgb(150, 150, 150)",
  white: "#fff",

  bgWhite: "#ffffff",
  bgLight: "#f9f9f9",
  bgLighter: "#f5f5f5",
  bgGray: "rgb(241, 241, 241)",
  bgHover: "rgb(225, 225, 225)",
  bgActive: "#ddd",

  accentBlue: "#3443eb",
  linkPurple: "#B666BA",

  iconGreen: "#00CA4E",
  iconYellow: "#FFBD44",
  iconRed: "#FF605C",

  border: "black",
  borderLight: "rgba(0, 0, 0, 0.5)",
});


export const fonts = stylex.defineVars({
  serif: '"Cormorant Garamond", serif',

  sansLight: '"opensans-light", sans-serif',
  sansBold: '"opensans-bold", sans-serif',

  arimo: "Arimo, sans-serif",
  helvetica: "Helvetica, Arial, sans-serif",
});


export const spacing = stylex.defineVars({
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
});


export const fontSizes = stylex.defineVars({
  xs: "11px",
  sm: "12px",
  md: "14px",
  base: "15px",
  lg: "17px",
  xl: "18px",
  xxl: "24px",
  xxxl: "30px",
});


export const radii = stylex.defineVars({
  sm: "2px",
  md: "5px",
  lg: "6px",
  xl: "20px",
  full: "50%",
});


export const shadows = stylex.defineVars({
  sm: "0 0 0 1px rgba(0, 0, 0, 0.5)",
  md: "0px 3px 3px rgba(0, 0, 0, 0.3)",
  lg: "0px 6px 5px rgba(0, 0, 0, 0.5)",
  popup: "8px 8px 10px rgba(0, 0, 0, 0.3)",
});


export const breakpoints = stylex.defineConsts({
  mobile: "@media (max-width: 767px)",
  smallTablet: "@media (max-width: 860px)",
  tablet: "@media (max-width: 900px)",
  tabletShort: "@media (max-width: 900px) and (max-height: 850px)",
  desktop: "@media (max-width: 1024px)",
  largeDesktop: "@media (min-width: 1350px) and (min-height: 890px)",
});
