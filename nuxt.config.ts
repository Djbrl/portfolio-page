// https://nuxt.com/docs/api/configuration/nuxt-config
const productionNitro = {
  preset: 'cloudflare-pages',
  output: {
    dir: 'dist',
    publicDir: 'dist/client',
    serverDir: 'dist/server',
  },
  rollupConfig: {
    output: { entryFileNames: 'index.js' },
  },
}

export default defineNuxtConfig({
  compatibilityDate: '2026-08-12',
  devtools: { enabled: false },
  css: ['~/css/main.css'],
  // Cloudflare's worker output is a deployment concern; local dev uses Nitro's normal dev server.
  nitro:
    process.env.NODE_ENV !== 'production'
      ? {}
      : process.env.VERCEL
        ? { preset: 'vercel' }
        : productionNitro,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
