<template>
  <div class="site-shell">
    <a class="skip-link" href="#main">{{ copy.skip }}</a>

    <header class="intro" id="top">
      <div class="hero-controls">
        <a
          class="language-toggle"
          :href="isFrench ? '/?lang=en' : '/'"
          :aria-label="copy.switchLanguage"
        >
          <span :class="{ active: isFrench }">FR</span>
          <span aria-hidden="true">/</span>
          <span :class="{ active: !isFrench }">EN</span>
        </a>

        <button
          class="theme-toggle"
          type="button"
          :aria-label="isDark ? copy.lightMode : copy.darkMode"
          :title="isDark ? copy.lightMode : copy.darkMode"
          @click="toggleTheme"
        >
          <span class="theme-dot" aria-hidden="true"></span>
        </button>
      </div>

      <div class="masthead">
        <h1>Djibril Sy</h1>
        <p class="role-line">{{ copy.role }}</p>
      </div>

      <p class="focus-line">
        <span aria-hidden="true">→</span>
        {{ copy.focus }}
      </p>

      <p class="intro-copy">{{ copy.intro }}</p>

      <nav class="primary-nav" :aria-label="copy.primaryNavigation">
        <a href="#work"><span>_</span>{{ copy.navWork }}</a>
        <a href="#experience"><span>_</span>{{ copy.navClients }}</a>
        <a href="#background"><span>_</span>{{ copy.navBackground }}</a>
        <a href="#contact"><span>_</span>{{ copy.navContact }}</a>
      </nav>
    </header>

    <main id="main">
      <section class="section" id="work" aria-labelledby="work-title">
        <div class="section-heading">
          <p class="section-number">_</p>
          <div>
            <h2 id="work-title">{{ copy.workTitle }}</h2>
            <p>{{ copy.workIntro }}</p>
          </div>
        </div>

        <div class="project-index">
          <div class="project-list">
            <article
              v-for="(project, index) in projects"
              :key="project.name"
              class="project-item"
              :class="{ active: activeProjectIndex === index }"
              @mouseenter="activeProjectIndex = index"
              @focusin="activeProjectIndex = index"
            >
              <a
                class="project-link"
                :href="project.href"
                target="_blank"
                rel="noreferrer"
                :aria-label="`${project.name} — ${copy.openProject}`"
              >
                <span class="project-number">_</span>

                <span class="project-copy">
                  <span class="project-title-row">
                    <strong>{{ project.name }}</strong>
                    <span>{{ localize(project.meta) }}</span>
                  </span>
                  <span class="project-description">{{ localize(project.description) }}</span>
                  <span class="project-tags" :aria-label="copy.technologies">
                    <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                  </span>
                </span>

                <span class="project-arrow" aria-hidden="true">↗</span>
              </a>

              <figure class="mobile-project-media" :class="project.previewClass">
                <img
                  :src="project.image"
                  :alt="localize(project.alt)"
                  :class="project.imageFit === 'contain' ? 'contain' : ''"
                  loading="lazy"
                />
              </figure>
            </article>
          </div>

          <aside class="project-preview" aria-live="polite">
            <figure class="preview-window">
              <div class="preview-toolbar" aria-hidden="true">
                <span></span><span></span><span></span>
                <p>{{ activeProject.domain }}</p>
              </div>
              <div class="preview-media" :class="activeProject.previewClass">
                <img
                  :key="activeProject.image"
                  :src="activeProject.image"
                  :alt="localize(activeProject.alt)"
                  :class="activeProject.imageFit === 'contain' ? 'contain' : ''"
                />
              </div>
              <figcaption>
                <span>{{ localize(activeProject.short) }}</span>
                <span>{{ activeProject.year }}</span>
              </figcaption>
            </figure>
            <p class="preview-hint"><span>{{ copy.hover }}</span> {{ copy.inspect }}</p>
          </aside>
        </div>
      </section>

      <section class="section" id="experience" aria-labelledby="experience-title">
        <div class="section-heading">
          <p class="section-number">_</p>
          <div>
            <h2 id="experience-title">{{ copy.clientsTitle }}</h2>
            <p>{{ copy.clientsIntro }}</p>
          </div>
        </div>

        <div class="project-index client-index">
          <div class="project-list">
            <article
              v-for="(project, index) in clientProjects"
              :key="project.name"
              class="project-item"
              :class="{ active: activeClientIndex === index }"
              @mouseenter="activeClientIndex = index"
              @focusin="activeClientIndex = index"
            >
              <a
                class="project-link"
                :href="project.href"
                target="_blank"
                rel="noreferrer"
                :aria-label="`${project.name} — ${copy.openProject}`"
              >
                <span class="project-number">_</span>

                <span class="project-copy">
                  <span class="project-title-row">
                    <strong>{{ project.name }}</strong>
                    <span>{{ localize(project.meta) }}</span>
                  </span>
                  <span class="project-description">{{ localize(project.description) }}</span>
                  <span class="project-tags" :aria-label="copy.technologies">
                    <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                  </span>
                </span>

                <span class="project-arrow" aria-hidden="true">↗</span>
              </a>

              <figure class="mobile-project-media" :class="project.previewClass">
                <img
                  :src="project.image"
                  :alt="localize(project.alt)"
                  loading="lazy"
                />
              </figure>
            </article>
          </div>

          <aside class="project-preview" aria-live="polite">
            <figure class="preview-window">
              <div class="preview-toolbar" aria-hidden="true">
                <span></span><span></span><span></span>
                <p>{{ activeClient.domain }}</p>
              </div>
              <div class="preview-media preview-top">
                <img
                  :key="activeClient.image"
                  :src="activeClient.image"
                  :alt="localize(activeClient.alt)"
                />
              </div>
              <figcaption>
                <span>{{ localize(activeClient.short) }}</span>
                <span>{{ activeClient.year }}</span>
              </figcaption>
            </figure>
            <p class="preview-hint"><span>{{ copy.hover }}</span> {{ copy.inspect }}</p>
          </aside>
        </div>
      </section>

      <section class="section" id="background" aria-labelledby="background-title">
        <div class="section-heading">
          <p class="section-number">_</p>
          <div>
            <h2 id="background-title">{{ copy.backgroundTitle }}</h2>
            <p>{{ copy.backgroundIntro }}</p>
          </div>
        </div>

        <div class="background-grid">
          <div class="about-copy">
            <p v-html="copy.aboutSystems"></p>
            <p>{{ copy.aboutVisual }}</p>
          </div>

          <aside class="highlights" :aria-labelledby="`highlights-${locale}`">
            <p class="highlights-label" :id="`highlights-${locale}`">{{ copy.highlights }}</p>
            <div class="highlights-list">
              <article v-for="highlight in highlights" :key="highlight.title" class="highlight-item">
                <span class="highlight-marker" aria-hidden="true">_</span>
                <div>
                  <p class="highlight-meta">{{ localize(highlight.meta) }}</p>
                  <h3>{{ highlight.title }}</h3>
                  <p>{{ localize(highlight.description) }}</p>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section class="contact-section" id="contact" aria-labelledby="contact-title">
        <p class="terminal-note"><span>_</span> {{ copy.collaboration }}</p>
        <h2 id="contact-title">{{ copy.contactTitle }}</h2>
        <p>{{ copy.contactIntro }}</p>
        <a class="email-link" href="mailto:sydjbrl@gmail.com">
          sydjbrl@gmail.com <span aria-hidden="true">↗</span>
        </a>

        <nav class="contact-links" :aria-label="copy.contactNavigation">
          <a href="https://github.com/djbrl" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/djibril-sy" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/documents/djibril-sy-cv.pdf" target="_blank">CV / résumé</a>
        </nav>
      </section>
    </main>

    <footer class="site-footer">
      <p>Djibril Sy · {{ copy.footerRole }}</p>
      <a href="#top">{{ copy.backToTop }} ↑</a>
      <p>Dakar, Sénégal · 2026</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

type LocalizedText = { fr: string; en: string };

type PortfolioProject = {
  name: string;
  meta: LocalizedText;
  year: string;
  short: LocalizedText;
  description: LocalizedText;
  tags: string[];
  href: string;
  image: string;
  alt: LocalizedText;
  domain: string;
  imageFit?: 'cover' | 'contain';
  previewClass?: string;
};

const route = useRoute();
const locale = computed<'fr' | 'en'>(() => (route.query.lang === 'en' ? 'en' : 'fr'));
const isFrench = computed(() => locale.value === 'fr');
const localize = (value: LocalizedText) => value[locale.value];

const translations = {
  fr: {
    skip: 'Aller au contenu',
    switchLanguage: 'Afficher le site en anglais',
    lightMode: 'Passer au thème clair',
    darkMode: 'Passer au thème sombre',
    role: 'Ingénieur produit · Dakar, Sénégal',
    focus: 'systèmes produits, interfaces utiles, outils locaux, plateformes, infrastructure & livraison',
    intro:
      'Je conçois et mets en production des produits web, mobiles et desktop, du premier modèle au système exploitable. Mon travail se situe à l’intersection du produit, de l’architecture backend et d’interfaces qui rendent les systèmes complexes lisibles.',
    primaryNavigation: 'Navigation principale',
    navWork: 'Projets sélectionnés',
    navClients: 'Missions client',
    navBackground: 'Parcours',
    navContact: 'Contact',
    workTitle: 'Projets sélectionnés',
    workIntro: 'Des produits indépendants menés d’une idée ou d’une contrainte jusqu’à un système fonctionnel.',
    clientsTitle: 'Missions client',
    clientsIntro: 'Des collaborations récentes où les décisions produit et la réalisation technique se rejoignent.',
    backgroundTitle: 'Parcours',
    backgroundIntro: 'Fondamentaux d’ingénierie, pratique visuelle et transmission.',
    aboutSystems:
      'Formé à <strong>42 Paris</strong> et en génie électrique et informatique industrielle à <strong>l’UVSQ</strong>, j’aborde les produits comme des systèmes : comprendre les pièces, retirer le superflu, puis rendre l’ensemble observable et fiable.',
    aboutVisual:
      'Je travaille aussi en développement visuel pour le jeu et l’édition. Cette pratique nourrit mon travail d’ingénieur : composition, hiérarchie et clarté comptent autant dans une interface que dans une image.',
    highlights: 'Temps forts',
    collaboration: 'nouvelle-collaboration',
    contactTitle: 'Un problème utile à résoudre ?',
    contactIntro:
      'Je suis disponible pour des créations produit, des modernisations et des intégrations — surtout quand le besoin est encore flou et qu’il faut le transformer en système concret.',
    contactNavigation: 'Liens de contact et profils',
    footerRole: 'ingénieur produit',
    backToTop: 'Retour en haut',
    openProject: 'ouvrir le projet',
    technologies: 'Technologies',
    hover: 'survoler / cibler',
    inspect: 'pour découvrir',
    description: 'Portfolio de Djibril Sy, ingénieur produit à Dakar, spécialisé dans les produits web, mobiles et desktop.',
    socialDescription: 'Produits web, mobiles et desktop, du premier modèle jusqu’à la mise en production.',
  },
  en: {
    skip: 'Skip to content',
    switchLanguage: 'Display the site in French',
    lightMode: 'Switch to light theme',
    darkMode: 'Switch to dark theme',
    role: 'Product engineer · Dakar, Senegal',
    focus: 'product systems, useful interfaces, local tooling, platforms, infrastructure & delivery',
    intro:
      'I design and ship web, mobile and desktop products from first model to production. My work sits between product thinking, backend architecture and interfaces that make complicated systems feel straightforward.',
    primaryNavigation: 'Primary navigation',
    navWork: 'Selected work',
    navClients: 'Client work',
    navBackground: 'Background',
    navContact: 'Contact',
    workTitle: 'Selected work',
    workIntro: 'Independent products taken from an idea or constraint to a working system.',
    clientsTitle: 'Client work',
    clientsIntro: 'Recent engagements where product decisions and implementation meet.',
    backgroundTitle: 'Background',
    backgroundIntro: 'Engineering fundamentals, visual practice and knowledge sharing.',
    aboutSystems:
      'I trained at <strong>42 Paris</strong> and studied electrical engineering and industrial computing at <strong>UVSQ</strong>. I still approach products as systems: understand the moving parts, remove what is unnecessary, then make the whole dependable and observable.',
    aboutVisual:
      'I also work in visual development for games and publishing. That practice informs my engineering: composition, hierarchy and clarity matter as much in an interface as they do in an image.',
    highlights: 'Highlights',
    collaboration: 'new-collaboration',
    contactTitle: 'Have a useful problem?',
    contactIntro:
      'I’m available for product builds, modernization work and integrations—especially when the brief is still messy and someone needs to turn it into a working system.',
    contactNavigation: 'Contact and profile links',
    footerRole: 'product engineer',
    backToTop: 'Back to top',
    openProject: 'open project',
    technologies: 'Technologies',
    hover: 'hover / focus',
    inspect: 'to inspect',
    description: 'Portfolio of Djibril Sy, a Dakar-based product engineer building web, mobile and desktop products.',
    socialDescription: 'Web, mobile and desktop products shaped from first model to production.',
  },
};

const copy = computed(() => translations[locale.value]);

const projects: PortfolioProject[] = [
  {
    name: 'TheQuestBoard',
    meta: { fr: 'produit indépendant · en ligne', en: 'independent product · live' },
    year: '2023—2026',
    short: { fr: 'repérage de commandes pour artistes', en: 'commission discovery for artists' },
    description: {
      fr: 'Un produit en ligne qui transforme les annonces de recrutement d’illustrateurs en tableau consultable et envoie aux artistes des alertes Discord personnalisées.',
      en: 'A live product that turns illustration hiring posts into a searchable board and sends personalized Discord alerts to artists.',
    },
    tags: ['Vue 3', 'NestJS', 'Discord', 'PostgreSQL'],
    href: 'https://www.thequestboard.co',
    image: '/tqb1.png',
    alt: { fr: 'Interface de TheQuestBoard', en: 'TheQuestBoard interface' },
    domain: 'thequestboard.co',
  },
  {
    name: 'SkinDiff',
    meta: { fr: 'produit social · League of Legends', en: 'social product · League of Legends' },
    year: '2026',
    short: { fr: 'lookbook social de collections', en: 'a social lookbook for collections' },
    description: {
      fr: 'Un outil de création et de comparaison de collections coordonnées en duo ou en équipe, avec profils publics, connexion Discord et commande slash.',
      en: 'A collection builder and comparison tool for coordinated duo and full-team looks, with public profiles, Discord sign-in and a slash command.',
    },
    tags: ['Nuxt', 'Vue 3', 'Discord', 'Supabase'],
    href: 'https://github.com/Djbrl/skindiff',
    image: '/work/skindiff.png',
    alt: { fr: 'Visuel du lookbook social SkinDiff', en: 'SkinDiff social lookbook artwork' },
    domain: 'skindiff / compare-collections',
  },
  {
    name: 'Multiprise',
    meta: { fr: 'application macOS · open source', en: 'macOS app · open source' },
    year: '2026',
    short: { fr: 'centre de contrôle pour projets locaux', en: 'one control center for local projects' },
    description: {
      fr: 'Un centre de contrôle desktop qui découvre les services d’un projet, attribue des ports sans conflit, gère les processus et rassemble logs et aperçus dans un seul espace.',
      en: 'A desktop control center that discovers project services, assigns collision-free ports, owns process groups and brings logs and previews into one workspace.',
    },
    tags: ['Electron', 'TypeScript', 'Vue 3'],
    href: 'https://github.com/Djbrl/multiprise',
    image: '/work/multiprise.svg',
    alt: { fr: 'Symbole de l’application Multiprise', en: 'Multiprise application mark' },
    domain: 'multiprise / local-orchestrator',
    imageFit: 'contain',
    previewClass: 'preview-electric',
  },
];

const clientProjects: PortfolioProject[] = [
  {
    name: 'MAEIC',
    meta: { fr: 'programme exécutif · MINAPRO', en: 'executive programme · MINAPRO' },
    year: '2025—2026',
    short: { fr: 'parcours bilingue & opérations', en: 'bilingual journey & operations' },
    description: {
      fr: 'Conception d’un parcours d’onboarding bilingue sur invitation, avec machine à états déterministe, planification des sessions, analytics et emails transactionnels.',
      en: 'Built a bilingual, invitation-only onboarding journey with a deterministic state machine, session planning, analytics and transactional email.',
    },
    tags: ['TypeScript', 'Supabase', 'Analytics'],
    href: 'https://minaproai.nelamservices.com',
    image: '/work/maeic.png',
    alt: { fr: 'Page d’accueil du programme MAEIC', en: 'MAEIC programme landing page' },
    domain: 'minaproai.nelamservices.com',
    previewClass: 'preview-top',
  },
  {
    name: 'TousLesPros',
    meta: { fr: 'plateforme professionnelle · Sénégal', en: 'professional platform · Senegal' },
    year: '2026',
    short: { fr: 'travail & entrepreneuriat au Sénégal', en: 'work & entrepreneurship in Senegal' },
    description: {
      fr: 'Refonte d’un portail sénégalais de découverte professionnelle et création de son application mobile, avec sessions sécurisées, cache hors ligne, cartes et livraisons EAS.',
      en: 'Rebuilt a Senegal-focused professional discovery portal and delivered its mobile app, including secure sessions, offline caching, maps and EAS releases.',
    },
    tags: ['Nuxt', 'Vue 3', 'Expo', 'PostgreSQL'],
    href: 'https://touslespros.sn',
    image: '/work/touslespros-live.png',
    alt: { fr: 'Page d’accueil de TousLesPros', en: 'TousLesPros landing page' },
    domain: 'touslespros.sn',
    previewClass: 'preview-top',
  },
  {
    name: 'CyberLab',
    meta: { fr: 'sensibilisation cybersécurité · RSF', en: 'cybersecurity awareness · RSF' },
    year: '2026',
    short: { fr: 'apprentissage & simulation du phishing', en: 'phishing learning & simulation' },
    description: {
      fr: 'Une plateforme de simulation du phishing et de sensibilisation, avec orchestration de campagnes, événements de livraison, parcours apprenants et administration par rôles.',
      en: 'A phishing-simulation and security-learning platform with campaign orchestration, delivery events, learner journeys and role-aware administration.',
    },
    tags: ['NestJS', 'Vue 3', 'Supabase'],
    href: 'https://cyberlab-web-ten.vercel.app/',
    image: '/work/cyberlab-live.png',
    alt: { fr: 'Page d’accueil de CyberLab', en: 'CyberLab landing page' },
    domain: 'cyberlab-web-ten.vercel.app',
    previewClass: 'preview-top',
  },
];

const highlights = [
  {
    title: '42 Paris',
    meta: { fr: '2022—2023 · informatique', en: '2022—2023 · computer science' },
    description: {
      fr: 'Formation intensive par projets, du C aux systèmes, réseaux et architectures logicielles.',
      en: 'Intensive project-based training spanning C, systems, networking and software architecture.',
    },
  },
  {
    title: 'UVSQ',
    meta: { fr: '2018—2020 · DUT GEII', en: '2018—2020 · electrical engineering' },
    description: {
      fr: 'Génie électrique et informatique industrielle : électronique, automatismes et programmation.',
      en: 'Electrical engineering and industrial computing: electronics, automation and programming.',
    },
  },
  {
    title: 'Riot Games & QuasiReal Publishing',
    meta: { fr: 'développement visuel & illustration', en: 'visual development & illustration' },
    description: {
      fr: 'Travaux créatifs pour le jeu et l’édition, entre narration visuelle, composition et production d’images.',
      en: 'Creative work for games and publishing, spanning visual storytelling, composition and image production.',
    },
  },
  {
    title: 'Git Peer Class',
    meta: { fr: 'transmission · apprentissage entre pairs', en: 'teaching · peer learning' },
    description: {
      fr: 'Ateliers pratiques autour de Git et des méthodes de collaboration pour aider d’autres développeurs à gagner en autonomie.',
      en: 'Hands-on Git and collaboration workshops helping other developers become more autonomous.',
    },
  },
];

const activeProjectIndex = ref(0);
const activeClientIndex = ref(0);
const activeProject = computed(() => projects[activeProjectIndex.value]);
const activeClient = computed(() => clientProjects[activeClientIndex.value]);

const isDark = ref(false);

const applyTheme = () => {
  if (!import.meta.client) return;
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', isDark.value ? 'dark' : 'light');
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  applyTheme();
};

onMounted(() => {
  const savedTheme = localStorage.getItem('portfolio-theme');
  isDark.value = savedTheme
    ? savedTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme();
});

useHead(() => ({
  title: isFrench.value
    ? 'Djibril Sy — Ingénieur produit à Dakar'
    : 'Djibril Sy — Product Engineer in Dakar',
  link: [{ rel: 'canonical', href: 'https://djibrilsy.vercel.app/' }],
  meta: [
    { name: 'description', content: copy.value.description },
    { name: 'theme-color', content: isDark.value ? '#10100f' : '#f1f0ec' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://djibrilsy.vercel.app/' },
    {
      property: 'og:title',
      content: isFrench.value
        ? 'Djibril Sy — Ingénieur produit à Dakar'
        : 'Djibril Sy — Product Engineer in Dakar',
    },
    { property: 'og:description', content: copy.value.socialDescription },
    { property: 'og:image', content: 'https://djibrilsy.vercel.app/og.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: isFrench.value
        ? 'Djibril Sy — Ingénieur produit à Dakar'
        : 'Djibril Sy — Product Engineer in Dakar',
    },
    { name: 'twitter:description', content: copy.value.socialDescription },
    { name: 'twitter:image', content: 'https://djibrilsy.vercel.app/og.png' },
  ],
  htmlAttrs: { lang: locale.value },
}));
</script>
