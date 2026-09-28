// https://nuxt.com/docs/api/configuration/nuxt-config

// Runs before first paint to restore the user's saved theme (or system preference)
// and avoid a white flash for returning dark-mode users. Keep in sync with the
// 'portfolio-color-theme' key and dataset.theme logic in app.vue.
const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio-color-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`

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
  app: {
    head: {
      script: [
        {
          innerHTML: themeInitScript,
          tagPosition: 'head',
          tagPriority: 'critical',
        },
      ],
    },
  },
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
