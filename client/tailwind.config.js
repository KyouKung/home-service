/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: {
        100: "#E7EEFF",
        200: "#D2DFFC",
        300: "#A6BFFA",
        400: "#799FF7",
        500: "#4C7FF4",
        600: "#336DF2",
        700: "#1852D6",
        800: "#0E3FB0",
        900: "#022B87",
        950: "#001C59",
      },
      grey: {
        100: "#EFEFF2",
        200: "#E6E7EB",
        300: "#CCD0D7",
        400: "#B3B8C4",
        500: "#9AA1B0",
        600: "#80899C",
        700: "#646C80",
        800: "#4B5160",
        900: "#323640",
        950: "#232630",
      },
      purple: {
        100: "#ECE6FF",
        900: "#4512B4",
      },
      yellow: {
        100: "#FFF3D4",
        900: "#6E5000",
      },
      green: {
        100: "#DFF9F6",
        900: "#00596C",
      },
      utils: {
        black: "#000000",
        white: "#FFFFFF",
        red: "#C82438",
        bg: "#F3F4F6",
      },
    },
    fontFamily: {
      Prompt: ["Prompt", "sans-serif"],
      prompt: ["Prompt"],
    },
    fontSize: {
      fontNav: [
        "24px",
        {
          fontWeight: 500,
        },
      ],
      fontHead1: [
        "32px",
        {
          fontWeight: 500,
          lineHeight: "48px",
        },
      ],
      fontHead2: [
        "20px",
        {
          fontWeight: 500,
          lineHeight: "30px",
        },
      ],
      fontHead3: [
        "32px",
        {
          fontWeight: 400,
          lineHeight: "30px",
        },
      ],
      fontHead4: [
        "18px",
        {
          fontWeight: 500,
          lineHeight: "27px",
        },
      ],
      fontHead5: [
        "16px",
        {
          fontWeight: 500,
          lineHeight: "24px",
        },
      ],
      body1: [
        "20px",
        {
          fontWeight: 400,
          lineHeight: "30px",
        },
      ],
      body2: [
        "16px",
        {
          fontWeight: 300,
          lineHeight: "24px",
        },
      ],
      body3: [
        "14px",
        {
          fontWeight: 400,
          lineHeight: "21px",
        },
      ],
      body4: [
        "12px",
        {
          fontWeight: 400,
          lineHeight: "18px",
        },
      ],
      button: [
        "16px",
        {
          fontWeight: 600,
          lineHeight: "24px",
          textDecoration: "underline",
        },
      ],
    },

    extend: {
      width: {
        128: "32rem",
      },
    },

    plugins: [],
    "tailwindCSS.includeLanguages": {
      javascript: "javascript",
      javascriptreact: "javascriptreact",
      html: "HTML",
    },
    "editor.quickSuggestions": {
      strings: true,
    },
  },
};
