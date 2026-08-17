import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./app/**/*.{vue,ts}', './server/**/*.ts'],
  theme: {
    extend: {
      colors: {
        primary: { 25: '#f1e9ff', 100: '#bf99ff', 200: '#a772ff', 600: '#4f00d0', 700: '#3f00a6', 800: '#2d0078' },
        error: { 50: '#fff4f3', 100: '#fee4e2', 500: '#f04438', 600: '#d92d20' },
        success: { 50: '#ecfdf3', 100: '#d1fadf', 200: '#a6f4c5', 600: '#039855', 700: '#027948' },
        warning: { 100: '#feefc6', 500: '#f79009' },
        info: { 50: '#eff8ff', 200: '#b2ddff', 500: '#2e90fa' }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['DM Sans', 'sans-serif']
      },
      boxShadow: {
        card: '0 2px 4px rgb(0 0 0 / 4%)',
        dropdown: '0 4px 10px rgb(0 0 0 / 9%)'
      }
    }
  }
}
