<template>
  <div class="site-shell">
    <a class="skip-link" href="#main">{{ copy.skip }}</a>

    <header class="intro" id="top">
      <div class="hero-controls">
        <button
          class="language-toggle"
          type="button"
          :aria-label="copy.switchLanguage"
          @click="switchLanguage"
        >
          <span :class="{ active: isFrench }">FR</span>
          <span aria-hidden="true">/</span>
          <span :class="{ active: !isFrench }">EN</span>
        </button>

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
        <span class="focus-arrow" aria-hidden="true">→</span>
        <span class="focus-terms">{{ copy.focus.join(', ') }}</span>
      </p>

      <p class="intro-copy">{{ copy.intro }}</p>

      <nav class="primary-nav" :aria-label="copy.primaryNavigation">
        <a href="#work">{{ copy.navWork }}</a>
        <a href="#background">{{ copy.navBackground }}</a>
        <a href="#contact">{{ copy.navContact }}</a>
      </nav>
    </header>

    <main id="main">
      <section ref="workSection" class="section project-section" id="work" aria-labelledby="work-title">
        <div class="section-heading">
          <p class="section-number">01</p>
          <div>
            <h2 id="work-title">{{ copy.workTitle }}</h2>
            <p>{{ copy.workIntro }}</p>
          </div>
        </div>

        <div
          class="work-grid"
          :class="{ 'motion-ready': workMotionReady, 'in-view': workVisible }"
        >
          <div
            v-for="(column, columnIndex) in projectColumns"
            :key="columnIndex"
            class="project-list work-column"
            :class="columnIndex === 0 ? 'work-column-left' : 'work-column-right'"
          >
            <article
              v-for="(project, index) in column"
              :key="project.name"
              class="project-item"
            >
              <a
                class="project-link"
                :href="project.href"
                target="_blank"
                rel="noreferrer"
                :aria-label="`${project.name}, ${copy.openProject}`"
              >
                <span class="project-number">{{ String(columnIndex * 3 + index + 1).padStart(2, '0') }}</span>

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
            </article>
          </div>
        </div>
      </section>

      <section class="section about-section" id="background" aria-labelledby="background-title">
        <div class="section-heading">
          <p class="section-number">02</p>
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
        </div>
      </section>

      <section class="contact-section" id="contact" aria-labelledby="contact-title">
        <p class="terminal-note"><span>03</span> {{ copy.collaboration }}</p>
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
      <p>42 Paris Alumni · Remote · 2026</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

type LocalizedText = { fr: string; en: string };

type PortfolioProject = {
  name: string;
  meta: LocalizedText;
  year: string;
  short: LocalizedText;
  description: LocalizedText;
  detail: LocalizedText;
  tags: string[];
  href: string;
  image: string;
  media?: 'image' | 'dot-solid';
  alt: LocalizedText;
  domain: string;
  imageFit?: 'cover' | 'contain';
  previewClass?: string;
};

const route = useRoute();
const locale = ref<'fr' | 'en'>(route.query.lang === 'en' ? 'en' : 'fr');
const isFrench = computed(() => locale.value === 'fr');
const localize = (value: LocalizedText) => value[locale.value];

const translations = {
  fr: {
    skip: 'Aller au contenu',
    switchLanguage: 'Afficher le site en anglais',
    lightMode: 'Passer au thème clair',
    darkMode: 'Passer au thème sombre',
    role: 'Ingénieur produit · 42 Paris Alumni · Remote',
    focus: ['systèmes produits', 'interfaces utiles', 'outils locaux', 'plateformes', 'infrastructure & livraison'],
    intro:
      'Je conçois et mets en production des produits web, mobiles et desktop, du premier modèle au système exploitable. Mon travail se situe à l’intersection du produit, de l’architecture backend et d’interfaces qui rendent les systèmes complexes lisibles.',
    primaryNavigation: 'Navigation principale',
    navWork: 'Projets sélectionnés',
    navBackground: 'À propos',
    navContact: 'Contact',
    workTitle: 'Projets sélectionnés',
    workIntro: 'Des produits indépendants et des plateformes client menés d’une idée ou d’une contrainte jusqu’à un système fonctionnel.',
    backgroundTitle: 'À propos',
    backgroundIntro: 'Fondamentaux d’ingénierie, pratique visuelle et transmission.',
    aboutSystems:
      'Formé à <strong>42 Paris</strong> et en génie électrique et informatique industrielle à <strong>l’UVSQ</strong>, j’aborde les produits comme des systèmes : comprendre les pièces, retirer le superflu, puis rendre l’ensemble observable et fiable.',
    aboutVisual:
      'Je travaille aussi en développement visuel dans le milieu du jeu vidéo et de l’édition, ayant travaillé pour des clients tels que QuasiReal Publishing, Wolfpack Games Studio et Riot Games.',
    collaboration: 'nouvelle-collaboration',
    contactTitle: 'Un problème à résoudre ?',
    contactIntro:
      'Je suis disponible pour des créations produit, des modernisations et des intégrations, surtout quand le besoin est encore flou et qu’il faut le transformer en système concret.',
    contactNavigation: 'Liens de contact et profils',
    footerRole: 'ingénieur produit',
    backToTop: 'Retour en haut',
    openProject: 'ouvrir le projet',
    visitProject: 'Voir le projet',
    technologies: 'Technologies',
    description: 'Portfolio de Djibril Sy, ingénieur produit spécialisé dans les produits web, mobiles et desktop.',
    socialDescription: 'Produits web, mobiles et desktop, du premier modèle jusqu’à la mise en production.',
  },
  en: {
    skip: 'Skip to content',
    switchLanguage: 'Display the site in French',
    lightMode: 'Switch to light theme',
    darkMode: 'Switch to dark theme',
    role: 'Product engineer · 42 Paris Alumni · Remote',
    focus: ['product systems', 'useful interfaces', 'local tooling', 'platforms', 'infrastructure & delivery'],
    intro:
      'I design and ship web, mobile and desktop products from first model to production. My work sits between product thinking, backend architecture and interfaces that make complicated systems feel straightforward.',
    primaryNavigation: 'Primary navigation',
    navWork: 'Selected work',
    navBackground: 'About me',
    navContact: 'Contact',
    workTitle: 'Selected work',
    workIntro: 'Independent products and client platforms taken from an idea or constraint to a working system.',
    backgroundTitle: 'About me',
    backgroundIntro: 'Engineering fundamentals, visual practice and knowledge sharing.',
    aboutSystems:
      'I trained at <strong>42 Paris</strong> and studied electrical engineering and industrial computing at <strong>UVSQ</strong>. I still approach products as systems: understand the moving parts, remove what is unnecessary, then make the whole dependable and observable.',
    aboutVisual:
      'I also work in visual development for video games and publishing, with clients including QuasiReal Publishing, Wolfpack Games Studio and Riot Games.',
    collaboration: 'new-collaboration',
    contactTitle: 'Have a problem to solve?',
    contactIntro:
      'I’m available for product builds, modernization work and integrations, especially when the brief is still messy and someone needs to turn it into a working system.',
    contactNavigation: 'Contact and profile links',
    footerRole: 'product engineer',
    backToTop: 'Back to top',
    openProject: 'open project',
    visitProject: 'Visit project',
    technologies: 'Technologies',
    description: 'Portfolio of Djibril Sy, a product engineer building web, mobile and desktop products.',
    socialDescription: 'Web, mobile and desktop products shaped from first model to production.',
  },
};

const copy = computed(() => translations[locale.value]);

const projects: PortfolioProject[] = [
  {
    name: 'TheQuestBoard',
    meta: { fr: 'produit indépendant · en ligne', en: 'independent product · live' },
    year: '2023–2026',
    short: { fr: 'repérage de commandes pour artistes', en: 'commission discovery for artists' },
    description: {
      fr: 'Un produit en ligne qui transforme des annonces de recrutement dispersées sur plus de 20 forums en un tableau consultable, avec alertes Discord personnalisées.',
      en: 'An online product that turns recruiting posts scattered across more than 20 forums into one searchable board with personalized Discord alerts.',
    },
    detail: {
      fr: 'J’en ai conçu le pipeline de collecte, la recherche, les filtres et la diffusion des opportunités pour réduire le temps passé à surveiller plusieurs plateformes.',
      en: 'I designed its collection pipeline, search, filters and opportunity delivery to cut the time artists spend monitoring multiple platforms.',
    },
    tags: ['Vue 3', 'NestJS', 'Discord', 'PostgreSQL'],
    href: 'https://thequestboard.co',
    image: '/work/thequestboard-live.png',
    media: 'dot-solid',
    alt: { fr: 'Logo sphérique animé de TheQuestBoard', en: 'Animated spherical TheQuestBoard logo' },
    domain: 'thequestboard.co',
  },
  {
    name: 'SkinDiff',
    meta: { fr: 'produit social · League of Legends', en: 'social product · League of Legends' },
    year: '2026',
    short: { fr: 'lookbook social de collections', en: 'a social lookbook for collections' },
    description: {
      fr: 'Un outil qui permet aux joueurs de League of Legends de coordonner leurs skins, avec profils publics, connexion Discord et importation automatique.',
      en: 'A tool that lets League of Legends players coordinate their skins, with public profiles, Discord sign-in and automatic imports.',
    },
    detail: {
      fr: 'Le produit réunit composition visuelle, partage public et usages communautaires dans un parcours léger, pensé autour des joueurs de League of Legends.',
      en: 'The product combines visual composition, public sharing and community workflows in a lightweight experience built around League of Legends players.',
    },
    tags: ['Nuxt', 'Vue 3', 'Discord', 'Supabase'],
    href: 'https://skindiff.lol',
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
    detail: {
      fr: 'Multiprise remplace la jonglerie entre terminaux par une vue opérationnelle unique, sans imposer une nouvelle manière de structurer les projets existants.',
      en: 'Multiprise replaces terminal juggling with one operational view, without forcing an unfamiliar structure onto existing projects.',
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
    year: '2025–2026',
    short: { fr: 'parcours bilingue & opérations', en: 'bilingual journey & operations' },
    description: {
      fr: 'Une plateforme de bout en bout pour le programme d’initiation à l’IA de MINAPRO : invitations individuelles ou groupées, qualification des dirigeants, planification des sessions et pilotage via un back-office avec analytics.',
      en: 'An end-to-end platform for MINAPRO’s executive AI programme, covering individual and group invitations, participant qualification, session planning and operational oversight through an analytics-enabled back office.',
    },
    detail: {
      fr: 'Le back-office rend chaque étape traçable et donne à l’équipe une vue claire des candidatures, cohortes, présences et communications.',
      en: 'The operations console makes every step traceable and gives the team a clear view of applications, cohorts, attendance and communication.',
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
      fr: 'Refonte complète de TousLesPros, le portail professionnel de Bount-bi qui rend visibles les métiers, savoir-faire et opportunités au Sénégal, avec annuaire, profils, recherche, favoris, contenus, appels d’offres et financements sur le web et mobile.',
      en: 'A complete rebuild of TousLesPros, Bount-bi’s professional portal for making skills, services and opportunities more visible in Senegal, combining a directory, profiles, search, saved professionals, editorial content, tenders and funding across web and mobile.',
    },
    detail: {
      fr: 'Le même écosystème relie recherche d’opportunités, profils, favoris et contenus éditoriaux sur le web comme sur iOS et Android.',
      en: 'One ecosystem now connects opportunity discovery, profiles, saved items and editorial content across web, iOS and Android.',
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
    detail: {
      fr: 'Les tableaux de bord relient l’exécution des simulations aux résultats pédagogiques pour aider les équipes à piloter des campagnes mesurables.',
      en: 'Its dashboards connect simulation delivery with learning outcomes so teams can operate measurable awareness campaigns.',
    },
    tags: ['NestJS', 'Vue 3', 'Supabase'],
    href: 'https://cyberlab-web-ten.vercel.app/',
    image: '/work/cyberlab-live.png',
    alt: { fr: 'Page d’accueil de CyberLab', en: 'CyberLab landing page' },
    domain: 'cyberlab-web-ten.vercel.app',
    previewClass: 'preview-top',
  },
];

const projectColumns = [projects, [clientProjects[0], clientProjects[2], clientProjects[1]]];
const workSection = ref<HTMLElement | null>(null);
const workVisible = ref(false);
const workMotionReady = ref(false);
let workObserver: IntersectionObserver | null = null;

const switchLanguage = () => {
  if (!import.meta.client) return;
  locale.value = locale.value === 'fr' ? 'en' : 'fr';

  const url = new URL(window.location.href);
  if (locale.value === 'en') url.searchParams.set('lang', 'en');
  else url.searchParams.delete('lang');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
};

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

  if (!workSection.value) return;

  workMotionReady.value = true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    workVisible.value = true;
    return;
  }

  workObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      workVisible.value = true;
      workObserver?.disconnect();
    },
    { threshold: 0.14 },
  );
  workObserver.observe(workSection.value);
});

onBeforeUnmount(() => workObserver?.disconnect());

useHead(() => ({
  title: isFrench.value
    ? 'Djibril Sy | Ingénieur produit'
    : 'Djibril Sy | Product Engineer',
  link: [{ rel: 'canonical', href: 'https://djibrilsy.vercel.app/' }],
  meta: [
    { name: 'description', content: copy.value.description },
    { name: 'theme-color', content: isDark.value ? '#10100f' : '#f1f0ec' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://djibrilsy.vercel.app/' },
    {
      property: 'og:title',
      content: isFrench.value
        ? 'Djibril Sy | Ingénieur produit'
        : 'Djibril Sy | Product Engineer',
    },
    { property: 'og:description', content: copy.value.socialDescription },
    { property: 'og:image', content: 'https://djibrilsy.vercel.app/og.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: isFrench.value
        ? 'Djibril Sy | Ingénieur produit'
        : 'Djibril Sy | Product Engineer',
    },
    { name: 'twitter:description', content: copy.value.socialDescription },
    { name: 'twitter:image', content: 'https://djibrilsy.vercel.app/og.png' },
  ],
  htmlAttrs: { lang: locale.value },
}));
</script>
