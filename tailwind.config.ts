import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:  '#0A1628',
        navy2: '#0F1F3D',
        teal:  '#00C9B1',
        coral: '#FF5C3A',
        gold:  '#FFB800',
        sand:  '#F5EDD6',
        card:  '#111D35',
        muted: '#8A9BB0',
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'sans-serif'],
        display: ['var(--font-bebas)', 'sans-serif'],
        condensed: ['var(--font-barlow-condensed)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
