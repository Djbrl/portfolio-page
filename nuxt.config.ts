// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/css/main.css'],
  nitro: {
    preset: 'cloudflare-pages',
    output: {
      dir: 'dist',
      publicDir: 'dist/client',
      serverDir: 'dist/server',
    },
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
