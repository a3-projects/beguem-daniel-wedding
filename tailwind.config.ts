import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import fluid, { extract, screens } from 'fluid-tailwind'

export default {
  content: { files: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'], extract },
  darkMode: 'class',
  theme: {
    borderRadius: {
      DEFAULT: '0.5rem',
      full: defaultTheme.borderRadius.full,
    },
    screens,
    fontFamily: {
      sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      spacing: { header: '4rem', input: '35rem' },
      maxWidth: {
        input: '35rem',
      },
      colors: {
        primary: {
          '50': '#f7f6f5',
          '100': '#edebe7',
          '200': '#dbd6cd',
          '300': '#cdc7bb',
          '400': '#aa9f8d',
          '500': '#998976',
          '600': '#8c7b6a',
          '700': '#756559',
          '800': '#61544b',
          '900': '#4f453f',
          '950': '#2a2420',
          fg: '#fff',
        },
        secondary: {
          50: '#F9FCFF',
          100: '#E2EFFF',
          200: '#B4D5FF',
          300: '#86BBFF',
          400: '#58A2FF',
          500: '#2B88FF',
          600: '#006FFC',
          700: '#005ACE',
          800: '#0046A0',
          900: '#003272',
          950: '#00285B',
          fg: '#fff',
        },
        neutral: { ...colors.stone, fg: '#fff' },
        destructive: { ...colors.rose, fg: '#fff' },
        positive: { ...colors.emerald, fg: '#fff' },
        warn: { ...colors.amber, fg: '#fff' },
        info: { ...colors.blue, fg: '#fff' },
        black: '#000',
        white: '#fff',
      },
      /* @ts-ignore*/
      //   typography: ({ theme }) => ({
      //     DEFAULT: {
      //       css: {
      //         "--tw-prose-body": theme("colors.neutral[400]"),
      //         "--tw-prose-headings": theme("colors.neutral[50]"),
      //         "--tw-prose-lead": theme("colors.neutral[400]"),
      //         "--tw-prose-links": theme("colors.neutral[50]"),
      //         "--tw-prose-bullets": theme("colors.primary[500]"),
      //         "--tw-prose-hr": theme("colors.primary[200]"),
      //       },
      //     },
      //   }),

      animation: {
        'pulse-fade': 'pulse-fade 1.5s ease-out infinite both',
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    fluid,
    require('tailwindcss-hero-patterns'),
    require('tailwindcss-animate'),
  ],
} satisfies Config
