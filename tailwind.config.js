// /** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");


// module.exports = withMT({
//   mode: "jit",
//   content: [
//     "./index.html", 
//     "./src/**/*.{js,ts,jsx,tsx,html,mdx}", 
//   ],
//   darkMode: "class",
//   theme: {
//     screens: {
//       md: { max: "1050px" },
//       sm: { max: "550px" },
//     },
//     extend: {
//       colors: {
//         // Kết hợp các màu từ dự án cũ
//         123329: "var(--123329)",
//         red: { 700: "var(--red_700)", a700: "var(--red_a700)" },
//         gray: {
//           100: "var(--gray_100)",
//           200: "var(--gray_200)",
//           900: "var(--gray_900)",
//           "900_02": "var(--gray_900_02)",
//           "100_01": "var(--gray_100_01)",
//           "100_02": "var(--gray_100_02)",
//           "900_01": "var(--gray_900_01)",
//           "900_99": "var(--gray_900_99)",
//           "900_cc": "var(--gray_900_cc)",
//         },
//         "19b269": { 0: "var(--19b269_0)", 1: "var(--19b269_1)", 2: "var(--19b269_2)" },
//         bg: { 1: "var(--bg_1)", 2: "var(--bg_2)", 4: "var(--bg_4)", white: "var(--bg_white)" },
//         color: {
//           border: "var(--color_border)",
//           text_dark: "var(--color_text_dark)",
//           text_light: "var(--color_text_light)",
//         },
//         f1fff2: "var(--f1fff2)",
//         text: { head: "var(--text_head)" },
//         blue: { 700: "var(--blue_700)", a700: "var(--blue_a700)" },
//         indigo: {
//           100: "var(--indigo_100)",
//           400: "var(--indigo_400)",
//           900: "var(--indigo_900)",
//           "900_01": "var(--indigo_900_01)",
//           "900_02": "var(--indigo_900_02)",
//           "100_01": "var(--indigo_100_01)",
//         },
//         light_blue: { 800: "var(--light_blue_800)" },
//         orange: { 300: "var(--orange_300)", a700: "var(--orange_a700)", "300_26": "var(--orange_300_26)" },
//         yellow: { 800: "var(--yellow_800)", 900: "var(--yellow_900)" },
//         black: { 900: "var(--black_900)" },
//         blue_gray: {
//           600: "var(--blue_gray_600)",
//           900: "var(--blue_gray_900)",
//           "600_01": "var(--blue_gray_600_01)",
//           "900_01": "var(--blue_gray_900_01)",
//           "900_02": "var(--blue_gray_900_02)",
//           "900_0c": "var(--blue_gray_900_0c)",
//           "900_19": "var(--blue_gray_900_19)",
//         },
//         deep_purple: { 800: "var(--deep_purple_800)" },
//         green: {
//           50: "var(--green_50)",
//           400: "var(--green_400)",
//           700: "var(--green_700)",
//           a700: "var(--green_a700)",
//           a700_11: "var(--green_a700_11)",
//           a700_19: "var(--green_a700_19)",
//         },
//         light_green: { "900_99": "var(--light_green_900_99)" },
//         white: { a700_4c: "var(--white_a700_4c)" },
//       },
//       boxShadow: {
//         xs: "0 10px 35px 0 #11213719",
//         sm: "0 10px 50px 0 #041e420c",
//         md: "0 5px 20px 0 #f5c34b26",
//         lg: "0 10px 20px 0 #041e420c",
//       },
//       fontFamily: { jost: "Jost", bevietnampro: "Be Vietnam Pro" },
//     },
//   },
//   plugins: [require("@tailwindcss/forms")],
// });




// sau khi gộp của cả dashboard seller

import plugin from "tailwindcss/plugin";
import forms from "@tailwindcss/forms";
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  mode: "jit",
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html,mdx}', // Merged both content arrays
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',  // From dashboard config
      md: { max: '1050px' },  // From old config
      sm: { max: '550px' },  // From old config
    },
    extend: {
      colors: {
        // Combine both configurations
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#BFC4CD',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
          // Add any additional gray colors from old config
          100_01: "var(--gray_100_01)",
          900_99: "var(--gray_900_99)",
        },
        violet: {
          50: '#F1EEFF',
          100: '#E6E1FF',
          200: '#D2CBFF',
          300: '#B7ACFF',
          400: '#9C8CFF',
          500: '#8470FF',
          600: '#755FF8',
          700: '#5D47DE',
          800: '#4634B1',
          900: '#2F227C',
          950: '#1C1357',
        },
        sky: {
          50: '#E3F3FF',
          100: '#D1ECFF',
          200: '#B6E1FF',
          300: '#A0D7FF',
          400: '#7BC8FF',
          500: '#67BFFF',
          600: '#56B1F3',
          700: '#3193DA',
          800: '#1C71AE',
          900: '#124D79',
          950: '#0B324F',
        },
        // Additional colors from the old config
        red: {
          50: '#FFE8E8',
          100: '#FFD1D1',
          700: 'var(--red_700)',
          a700: 'var(--red_a700)',
        },
        green: {
          50: '#D2FFE2',
          100: '#B1FDCD',
          200: '#8BF0B0',
          300: '#67E294',
          400: '#4BD37D',
          500: '#3EC972',
          600: '#34BD68',
          700: '#239F52',
          800: '#15773A',
          900: '#0F5429',
          950: '#0A3F1E',
        },
        blue: {
          700: 'var(--blue_700)',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],  // From dashboard config
        jost: 'Jost',  // From old config
        bevietnampro: 'Be Vietnam Pro',  // From old config
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5715' }],
        base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      borderWidth: {
        3: '3px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
      boxShadow: {
        xs: '0 10px 35px 0 #11213719',
        sm: '0 10px 50px 0 #041e420c',
        md: '0 5px 20px 0 #f5c34b26',
        lg: '0 10px 20px 0 #041e420c',
      },
    },
  },
  plugins: [
    forms,  // Default forms plugin
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
});
