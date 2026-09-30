// https://nuxt.com/docs/api/configuration/nuxt-config

// Runs before first paint to restore the user's saved theme (or system preference)
// and avoid a white flash for returning dark-mode users. Keep in sync with the
// 'portfolio-color-theme' key and dataset.theme logic in app.vue.
const themeInitScript = `(function(){try{var t=localStorage.getItem('portfolio-color-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`

// Hides the page until General Sans is ready (capped at 1.2s) so the headline never paints in the
// fallback font and then reflows. The font is preloaded below, so this is usually a few frames.
const fontGateScript = `(function(){var d=document.documentElement;if(!document.fonts||!document.fonts.load)return;d.classList.add('fonts-pending');var done=function(){d.classList.remove('fonts-pending');};Promise.race([document.fonts.load('600 1em "General Sans"'),new Promise(function(r){setTimeout(r,1200);})]).then(done,done);})();`

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
      // Fetch the font alongside the CSS instead of after it, so text renders in General Sans from the first paint.
      link: [
        { rel: 'preload', href: '/fonts/GeneralSans-Variable.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', tagPriority: 'critical' },
      ],
      script: [
        {
          innerHTML: themeInitScript,
          tagPosition: 'head',
          tagPriority: 'critical',
        },
        {
          innerHTML: fontGateScript,
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
