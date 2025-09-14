module.exports = {
  plugins: {
    "@stylexjs/postcss-plugin": {
      include: [
        "./**/*.{js,jsx,ts,tsx}",
        // any other files that should be included
        // this should include NPM dependencies that use StyleX
      ],
      useCSSLayers: true,
    },
    autoprefixer: {},
  },
};
