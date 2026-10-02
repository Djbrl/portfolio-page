// https://nuxt.com/docs/api/configuration/nuxt-config

// Runs before first paint to pick the theme, so the page never flashes the wrong one.
// The site is light by default and ignores the system setting. A theme the visitor picked with the
// toggle is kept for 30 days. Without one, the first visit (and again 30 days after the last one)
// opens dark for the "lights on" intro: app.vue then reveals the light theme from the toggle.
// The intro needs view transitions, motion allowed, and a landing on the home page (not a deep link).
// Keep in sync with the storage keys and dataset logic in app.vue.
const themeInitScript = `(function(){var d=document.documentElement,t=null;try{var now=Date.now(),month=2592e6,raw=localStorage.getItem('portfolio-color-theme'),saved=raw&&raw.charAt(0)==='{'?JSON.parse(raw):null;if(saved&&(saved.theme==='dark'||saved.theme==='light')&&now-saved.at<month)t=saved.theme;if(!t){var last=Number(localStorage.getItem('portfolio-lights-on'))||0;if(now-last>month&&'startViewTransition' in document&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!/[?&](project|panel)=/.test(location.search)){t='dark';d.dataset.lightsIntro='pending';}}}catch(e){}d.dataset.theme=t||'light';})();`

// Hides the page until Inter is ready (capped at 1.2s) so the headline never paints in the
// fallback font and then reflows. The font is preloaded below, so this is usually a few frames.
const fontGateScript = `(function(){var d=document.documentElement;if(!document.fonts||!document.fonts.load)return;d.classList.add('fonts-pending');var done=function(){d.classList.remove('fonts-pending');};Promise.race([document.fonts.load('650 1em Inter'),new Promise(function(r){setTimeout(r,1200);})]).then(done,done);})();`

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
      // Fetch the font alongside the CSS instead of after it, so text renders in Inter from the first paint.
      link: [
        { rel: 'preload', href: '/fonts/Inter-Variable.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', tagPriority: 'critical' },
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
