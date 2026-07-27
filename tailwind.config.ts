import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { fontFamily: { sans: ['var(--font-inter)','sans-serif'] }, boxShadow: { soft: '0 12px 30px rgba(120,53,15,.10)' } } }, plugins: [] };
export default config;
