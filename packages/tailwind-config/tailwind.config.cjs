const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: 'class',
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: { krona: ['Krona One'], poppins: ['Poppins'] },
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
    },
  },
  plugins: [],
};