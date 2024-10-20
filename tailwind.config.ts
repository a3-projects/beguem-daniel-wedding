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
      lg: '1.25rem',
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
          DEFAULT: '#C69F5C',
          50: '#F6EFE4',
          100: '#F0E6D5',
          200: '#E6D4B7',
          300: '#DBC398',
          400: '#D1B17A',
          500: '#C69F5C',
          600: '#AD843D',
          700: '#84642E',
          800: '#5A4520',
          900: '#312511',
          950: '#1C150A',
          fg: '#fff',
        },
        secondary: {
          DEFAULT: '#537665',
          50: '#f3f6f5',
          100: '#e1eae4',
          200: '#c5d5cc',
          300: '#a9bfb3',
          400: '#739483',
          500: '#537665',
          600: '#3f5c4f',
          700: '#324a3f',
          800: '#293c33',
          900: '#23312b',
          950: '#131b18',
          fg: '#fff',
        },
        neutral: { ...colors.stone, fg: '#fff' },
        destructive: { ...colors.rose, fg: '#fff' },
        positive: { ...colors.emerald, fg: '#fff' },
        warn: { ...colors.amber, fg: '#fff' },
        info: { ...colors.blue, fg: '#fff' },
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
    require('tailwindcss-react-aria-components')({ prefix: 'rac' }),
    require('tailwindcss-hero-patterns'),
    require('tailwindcss-animate'),
  ],
} satisfies Config
