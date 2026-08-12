// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/css/main.css'],
  nitro: {
    preset: 'cloudflare-module',
    output: { dir: 'dist' },
    rollupConfig: {
      output: { entryFileNames: 'index.js' },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
