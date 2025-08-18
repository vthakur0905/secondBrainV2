/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    name: "Bluewave",
    fontFamily: {
      sans: [
        "Open Sans",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ],
      title: [
        "Lato",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ],
      body: [
        "Open Sans",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ]
    },
    extend: {
      colors: {
        neutral: {
          50: "#f7f7f7",
          100: "#eeeeee",
          200: "#e0e0e0",
          300: "#cacaca",
          400: "#b1b1b1",
          500: "#999999",
          600: "#7f7f7f",
          700: "#676767",
          800: "#545454",
          900: "#464646",
          950: "#282828"
        },
        primary: {
          DEFAULT: "#611bf8",
          50: "#f3f1ff",
          100: "#e9e5ff",
          200: "#d5cfff",
          300: "#b7a9ff",
          400: "#9478ff",
          500: "#7341ff",
          600: "#631bff",
          700: "#611bf8",
          800: "#4607d0",
          900: "#3c08aa",
          950: "#220174"
        }
      }
    },
    fontSize: {
      xs: ["12px", { lineHeight: "19.2px" }],
      sm: ["14px", { lineHeight: "21px" }],
      base: ["16px", { lineHeight: "25.6px" }],
      lg: ["18px", { lineHeight: "27px" }],
      xl: ["20px", { lineHeight: "28px" }],
      "2xl": ["24px", { lineHeight: "31.2px" }],
      "3xl": ["30px", { lineHeight: "36px" }],
      "4xl": ["36px", { lineHeight: "41.4px" }],
      "5xl": ["48px", { lineHeight: "52.8px" }],
      "6xl": ["60px", { lineHeight: "66px" }],
      "7xl": ["72px", { lineHeight: "75.6px" }],
      "8xl": ["96px", { lineHeight: "100.8px" }],
      "9xl": ["128px", { lineHeight: "134.4px" }]
    },
    borderRadius: {
      none: "0px",
      sm: "6px",
      DEFAULT: "12px",
      md: "18px",
      lg: "24px",
      xl: "36px",
      "2xl": "48px",
      "3xl": "72px",
      full: "9999px"
    },
    spacing: {
      0: "0px",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      14: "56px",
      16: "64px",
      20: "80px",
      24: "96px",
      28: "112px",
      32: "128px",
      36: "144px",
      40: "160px",
      44: "176px",
      48: "192px",
      52: "208px",
      56: "224px",
      60: "240px",
      64: "256px",
      72: "288px",
      80: "320px",
      96: "384px",
      px: "1px",
      "0.5": "2px",
      "1.5": "6px",
      "2.5": "10px",
      "3.5": "14px"
    }
  },
  plugins: [],
  important: '#webcrumbs'
};
