export type LocalizedText = { fr: string; en: string };

type ProjectGalleryItem = {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  crop?: 'natural' | 'landscape' | 'wide' | 'browser' | 'tight';
  position?: string;
};

export type PortfolioProject = {
  name: string;
  kind: 'personal' | 'client';
  meta: LocalizedText;
  year: string;
  short: LocalizedText;
  description: LocalizedText;
  detail: LocalizedText;
  role: LocalizedText;
  outcome: LocalizedText;
  tags: string[];
  href: string;
  image: string;
  tileImage?: string;
  media?: 'image' | 'dot-solid';
  alt: LocalizedText;
  domain: string;
  imageFit?: 'cover' | 'contain';
  previewClass?: string;
  galleryIntro?: LocalizedText;
  gallery?: ProjectGalleryItem[];
};

const galleryShot = (
  project: string,
  file: string,
  fr: string,
  en: string,
  crop: ProjectGalleryItem['crop'] = 'landscape',
  position?: string,
): ProjectGalleryItem => ({
  src: `/work/case-studies/${project}/${file}`,
  alt: { fr, en },
  caption: { fr, en },
  crop,
  position,
});

const projectGalleries = {
  cyberlab: [
    galleryShot('cyberlab', 'landing.png', 'Accueil de CyberLab et mise en situation du phishing', 'CyberLab landing page introducing the phishing simulation'),
    galleryShot('cyberlab', 'mfa.png', 'Vérification multifacteur de CyberLab', 'CyberLab multi-factor identity verification', 'natural'),
    galleryShot('cyberlab', 'roles.png', 'Choix entre les espaces administrateur et apprenant', 'Administrator and learner workspace selection', 'wide'),
    galleryShot('cyberlab', 'campaigns.png', 'Tableau de pilotage des campagnes de simulation', 'Simulation campaign control dashboard', 'wide'),
    galleryShot('cyberlab', 'training-library.png', 'Bibliothèque de formations de sensibilisation', 'Security-awareness training library', 'wide'),
  ],
  thequestboard: [
    galleryShot('thequestboard', 'landing.png', 'Page d’accueil de TheQuestBoard', 'TheQuestBoard landing page', 'browser', 'center 68%'),
    galleryShot('thequestboard', 'lead-board.png', 'Tableau filtrable des missions et budgets', 'Filterable opportunity and budget board', 'wide'),
    galleryShot('thequestboard', 'discord-alert.png', 'Alerte Discord enrichie pour une nouvelle mission', 'Rich Discord alert for a new opportunity', 'natural'),
  ],
  skindiff: [
    galleryShot('skindiff', 'five-stack-overview.png', 'Vue d’ensemble d’une équipe de cinq joueurs', 'Five-player team overview', 'wide'),
    galleryShot('skindiff', 'line-finder-expanded.png', 'Ligne complète et variantes disponibles', 'Expanded line with available variants', 'wide'),
    galleryShot('skindiff', 'collection-builder.png', 'Constructeur de collection avec estimation de valeur', 'Collection builder with value estimate', 'wide'),
    galleryShot('skindiff', 'duo-compare.png', 'Comparaison instantanée de deux skins Coven', 'Instant comparison of two Coven skins', 'wide'),
    galleryShot('skindiff', 'variants-pink.png', 'Aperçu en jeu d’une première variante de duo', 'In-game preview of a first duo variant', 'wide'),
  ],
  multiprise: [
    galleryShot('multiprise', 'control-center.png', 'Centre de contrôle Multiprise avec services, ports et logs', 'Multiprise control center with services, ports and logs', 'wide'),
    galleryShot('multiprise', 'embedded-browser.png', 'Aperçu web intégré à l’espace du projet', 'Web preview embedded in the project workspace', 'tight', 'center 66%'),
  ],
  maeic: [
    galleryShot('maeic', 'programme.png', 'Accueil du programme exécutif et assistant conversationnel', 'Executive programme landing page and conversational assistant', 'wide'),
    galleryShot('maeic', 'onboarding-intro.png', 'Introduction concise au parcours de qualification', 'Concise introduction to the qualification journey', 'natural'),
    galleryShot('maeic', 'questionnaire.png', 'Questionnaire guidé avec contexte persistant', 'Guided questionnaire with persistent context', 'browser', 'center 67%'),
    galleryShot('maeic', 'live-summary.png', 'Synthèse générée au fil des réponses', 'Summary generated as answers are collected', 'browser', 'center 67%'),
  ],
  touslespros: [
    galleryShot('touslespros', 'landing.png', 'Accueil du portail professionnel TousLesPros', 'TousLesPros professional portal landing page', 'wide'),
    galleryShot('touslespros', 'news.png', 'Flux éditorial consacré au travail et à l’entrepreneuriat', 'Editorial feed for work and entrepreneurship', 'browser', 'center 66%'),
    galleryShot('touslespros', 'mobile.png', 'Présentation de l’expérience mobile TousLesPros', 'TousLesPros mobile experience presentation', 'wide'),
    galleryShot('touslespros', 'category-search.png', 'Recherche guidée par métier et secteur', 'Search guided by profession and industry', 'wide'),
    galleryShot('touslespros', 'map-results.png', 'Résultats professionnels organisés autour d’une carte', 'Professional results organized around a map', 'wide'),
  ],
};

export const translations = {
  fr: {
    skip: 'Aller au contenu',
    switchLanguage: 'Afficher le site en anglais',
    lightMode: 'Passer au thème clair',
    darkMode: 'Passer au thème sombre',
    projectNavigation: 'Navigation entre les projets',
    backHome: 'Retour au portfolio',
    role: 'Ingénieur produit',
    tagline: 'Je conçois et livre des solutions logicielles pour résoudre des problèmes concrets.',
    projectsCue: 'Projets ↓',
    openProjects: 'Voir les projets',
    pageNavigation: 'Navigation entre les pages',
    pageLabels: ['Présentation', 'Projets', 'Biographie'],
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
      'Formé à <strong>42 Paris</strong> et en génie électrique et informatique industrielle à <strong>l’UVSQ</strong>, j’aborde les produits comme des systèmes : comprendre les pièces en mouvement, leurs interactions et ce qui rend le résultat utile aux personnes qui s’en servent.',
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
    projectMeta: 'Projet',
    roleLabel: 'Mon rôle',
    outcomeLabel: 'Résultat',
    technologies: 'Technologies',
    description: 'Portfolio de Djibril Sy, ingénieur produit spécialisé dans les produits web, mobiles et desktop.',
    socialDescription: 'Produits web, mobiles et desktop, du premier modèle jusqu’à la mise en production.',
  },
  en: {
    skip: 'Skip to content',
    switchLanguage: 'Display the site in French',
    lightMode: 'Switch to light theme',
    darkMode: 'Switch to dark theme',
    projectNavigation: 'Project navigation',
    backHome: 'Back to the portfolio',
    role: 'Product engineer',
    tagline: 'I design and ship software solutions to solve real world problems.',
    projectsCue: 'Projects ↓',
    openProjects: 'View projects',
    pageNavigation: 'Page navigation',
    pageLabels: ['Introduction', 'Projects', 'Biography'],
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
      'I trained at <strong>42 Paris</strong> and studied electrical engineering and industrial computing at <strong>UVSQ</strong>. I approach products as systems: understanding the moving parts, how they work together, and what makes the result useful to the people who rely on it.',
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
    projectMeta: 'Project',
    roleLabel: 'My role',
    outcomeLabel: 'Outcome',
    technologies: 'Technologies',
    description: 'Portfolio of Djibril Sy, a product engineer building web, mobile and desktop products.',
    socialDescription: 'Web, mobile and desktop products shaped from first model to production.',
  },
};

const projects: PortfolioProject[] = [
  {
    name: 'TheQuestBoard',
    kind: 'personal',
    tileImage: '/work/logos/thequestboard.jpeg',
    meta: { fr: 'produit indépendant · en ligne', en: 'independent product · live' },
    year: '2023–2026',
    short: { fr: 'Repérage de commandes pour artistes', en: 'Commission discovery for artists' },
    description: {
      fr: 'Un produit en ligne qui transforme des annonces de recrutement dispersées sur plus de 20 forums en un tableau consultable, avec alertes Discord personnalisées.',
      en: 'An online product that turns recruiting posts scattered across more than 20 forums into one searchable board with personalized Discord alerts.',
    },
    detail: {
      fr: 'J’en ai conçu le pipeline de collecte, la recherche, les filtres et la diffusion des opportunités pour réduire le temps passé à surveiller plusieurs plateformes.',
      en: 'I designed its collection pipeline, search, filters and opportunity delivery to cut the time artists spend monitoring multiple platforms.',
    },
    role: {
      fr: 'Conception produit et développement full-stack, du pipeline de collecte à la recherche et aux alertes Discord.',
      en: 'Product design and full-stack development, from the collection pipeline to search and Discord alerts.',
    },
    outcome: {
      fr: 'Plus de 20 forums réunis dans un tableau consultable avec des alertes personnalisées.',
      en: 'More than 20 forums brought into one searchable board with personalized alerts.',
    },
    tags: ['Vue 3', 'NestJS', 'Discord', 'PostgreSQL'],
    href: 'https://thequestboard.co',
    image: '/work/thequestboard-live.png',
    media: 'dot-solid',
    alt: { fr: 'Interface de TheQuestBoard', en: 'TheQuestBoard interface' },
    domain: 'thequestboard.co',
    galleryIntro: {
      fr: 'Le tableau transforme une veille fragmentée en flux exploitable, puis pousse les missions pertinentes directement dans Discord.',
      en: 'The board turns fragmented monitoring into an actionable feed, then pushes relevant opportunities directly into Discord.',
    },
    gallery: projectGalleries.thequestboard,
  },
  {
    name: 'SkinDiff',
    kind: 'personal',
    meta: { fr: 'produit social · League of Legends', en: 'social product · League of Legends' },
    year: '2026',
    short: { fr: 'Lookbook social de collections', en: 'A social lookbook for collections' },
    description: {
      fr: 'Un outil qui permet aux joueurs de League of Legends de coordonner leurs skins, avec profils publics, connexion Discord et importation automatique.',
      en: 'A tool that lets League of Legends players coordinate their skins, with public profiles, Discord sign-in and automatic imports.',
    },
    detail: {
      fr: 'Le produit réunit composition visuelle, partage public et usages communautaires dans un parcours léger, pensé autour des joueurs de League of Legends.',
      en: 'The product combines visual composition, public sharing and community workflows in a lightweight experience built around League of Legends players.',
    },
    role: {
      fr: 'Conception du produit, de l’expérience sociale et de l’intégration des profils, de Discord et des données de jeu.',
      en: 'Product and social experience design, including profiles, Discord and game-data integrations.',
    },
    outcome: {
      fr: 'Un parcours léger pour composer, comparer et partager des collections entre joueurs.',
      en: 'A lightweight flow for composing, comparing and sharing collections between players.',
    },
    tags: ['Nuxt', 'Vue 3', 'Discord', 'Supabase'],
    href: 'https://skindiff.lol',
    image: '/work/skindiff.png',
    alt: { fr: 'Visuel du lookbook social SkinDiff', en: 'SkinDiff social lookbook artwork' },
    domain: 'skindiff / compare-collections',
    galleryIntro: {
      fr: 'Import de collection, composition d’équipe, comparaison de lignes et aperçu des variantes donnent au produit le rythme d’un outil conçu pour les joueurs.',
      en: 'Collection imports, team composition, line comparison and variant previews give the product the pace of a tool made for players.',
    },
    gallery: projectGalleries.skindiff,
  },
  {
    name: 'Multiprise',
    kind: 'personal',
    meta: { fr: 'application macOS · open source', en: 'macOS app · open source' },
    year: '2026',
    short: { fr: 'Centre de contrôle pour projets locaux', en: 'One control center for local projects' },
    description: {
      fr: 'Un centre de contrôle desktop qui découvre les services d’un projet, attribue des ports sans conflit, gère les processus et rassemble logs et aperçus dans un seul espace.',
      en: 'A desktop control center that discovers project services, assigns collision-free ports, owns process groups and brings logs and previews into one workspace.',
    },
    detail: {
      fr: 'Multiprise remplace la jonglerie entre terminaux par une vue opérationnelle unique, sans imposer une nouvelle manière de structurer les projets existants.',
      en: 'Multiprise replaces terminal juggling with one operational view, without forcing an unfamiliar structure onto existing projects.',
    },
    role: {
      fr: 'Conception de l’application desktop et développement de l’orchestration des services, ports, processus et logs.',
      en: 'Desktop product design and development of service, port, process and log orchestration.',
    },
    outcome: {
      fr: 'Les outils locaux d’un projet sont réunis dans une seule vue opérationnelle.',
      en: 'A project’s local tools are brought together in one operational view.',
    },
    tags: ['Electron', 'TypeScript', 'Vue 3'],
    href: 'https://github.com/Djbrl/multiprise',
    image: '/work/multiprise.svg',
    alt: { fr: 'Symbole de l’application Multiprise', en: 'Multiprise application mark' },
    domain: 'multiprise / local-orchestrator',
    imageFit: 'contain',
    previewClass: 'preview-electric',
    galleryIntro: {
      fr: 'Services, ports, processus, logs et navigateur restent visibles dans un même espace pour réduire les changements de contexte pendant le développement.',
      en: 'Services, ports, processes, logs and the browser stay visible in one workspace to reduce context switching during development.',
    },
    gallery: projectGalleries.multiprise,
  },
];

const clientProjects: PortfolioProject[] = [
  {
    name: 'MAEIC',
    kind: 'client',
    tileImage: '/work/logos/maeic.png',
    meta: { fr: 'programme exécutif · MINAPRO', en: 'executive programme · MINAPRO' },
    year: '2025–2026',
    short: { fr: 'Parcours bilingue & opérations', en: 'Bilingual journey & operations' },
    description: {
      fr: 'Une plateforme de bout en bout pour le programme d’initiation à l’IA de MINAPRO : invitations individuelles ou groupées, qualification des dirigeants, planification des sessions et pilotage via un back-office avec analytics.',
      en: 'An end-to-end platform for MINAPRO’s executive AI programme, covering individual and group invitations, participant qualification, session planning and operational oversight through an analytics-enabled back office.',
    },
    detail: {
      fr: 'Le back-office rend chaque étape traçable et donne à l’équipe une vue claire des candidatures, cohortes, présences et communications.',
      en: 'The operations console makes every step traceable and gives the team a clear view of applications, cohorts, attendance and communication.',
    },
    role: {
      fr: 'Conception du parcours bilingue, de l’architecture applicative et du back-office opérationnel.',
      en: 'Design of the bilingual journey, application architecture and operations back office.',
    },
    outcome: {
      fr: 'Un flux traçable de l’invitation au suivi des cohortes, présences et communications.',
      en: 'A traceable flow from invitation through cohort, attendance and communication tracking.',
    },
    tags: ['TypeScript', 'Supabase', 'Analytics'],
    href: 'https://minaproai.nelamservices.com',
    image: '/work/maeic.png',
    alt: { fr: 'Page d’accueil du programme MAEIC', en: 'MAEIC programme landing page' },
    domain: 'minaproai.nelamservices.com',
    previewClass: 'preview-top',
    galleryIntro: {
      fr: 'Le parcours recueille le contexte du dirigeant, adapte les questions et construit une synthèse exploitable pour préparer l’accompagnement.',
      en: 'The journey captures each leader’s context, adapts the questions and builds an actionable summary for the advisory session.',
    },
    gallery: projectGalleries.maeic,
  },
  {
    name: 'TousLesPros',
    kind: 'client',
    tileImage: '/work/logos/touslespros.jpeg',
    meta: { fr: 'plateforme professionnelle · Sénégal', en: 'professional platform · Senegal' },
    year: '2026',
    short: { fr: 'Travail & entrepreneuriat au Sénégal', en: 'Work & entrepreneurship in Senegal' },
    description: {
      fr: 'Refonte complète de TousLesPros, le portail professionnel de Bount-bi qui rend visibles les métiers, savoir-faire et opportunités au Sénégal, avec annuaire, profils, recherche, favoris, contenus, appels d’offres et financements sur le web et mobile.',
      en: 'A complete rebuild of TousLesPros, Bount-bi’s professional portal for making skills, services and opportunities more visible in Senegal, combining a directory, profiles, search, saved professionals, editorial content, tenders and funding across web and mobile.',
    },
    detail: {
      fr: 'Le même écosystème relie recherche d’opportunités, profils, favoris et contenus éditoriaux sur le web comme sur iOS et Android.',
      en: 'One ecosystem now connects opportunity discovery, profiles, saved items and editorial content across web, iOS and Android.',
    },
    role: {
      fr: 'Refonte produit et technique de la plateforme, avec livraison des expériences web et mobiles.',
      en: 'Product and technical redesign of the platform, including web and mobile delivery.',
    },
    outcome: {
      fr: 'Un écosystème unifié pour l’annuaire, les profils, les contenus et les opportunités.',
      en: 'One unified ecosystem for the directory, profiles, content and opportunities.',
    },
    tags: ['Nuxt', 'Vue 3', 'Expo', 'PostgreSQL'],
    href: 'https://touslespros.sn',
    image: '/work/touslespros-live.png',
    alt: { fr: 'Page d’accueil de TousLesPros', en: 'TousLesPros landing page' },
    domain: 'touslespros.sn',
    previewClass: 'preview-top',
    galleryIntro: {
      fr: 'Contenus, annuaire, recherche guidée, mobile et carte forment un même parcours pour découvrir les métiers, services et opportunités au Sénégal.',
      en: 'Content, directory, guided search, mobile and map views form one journey for discovering skills, services and opportunities in Senegal.',
    },
    gallery: projectGalleries.touslespros,
  },
  {
    name: 'CyberLab',
    kind: 'client',
    tileImage: '/work/logos/cyberlab.png',
    meta: { fr: 'sensibilisation cybersécurité · RSF', en: 'cybersecurity awareness · RSF' },
    year: '2026',
    short: { fr: 'Apprentissage & simulation du phishing', en: 'Phishing learning & simulation' },
    description: {
      fr: 'Une plateforme de simulation du phishing et de sensibilisation, avec orchestration de campagnes, événements de livraison, parcours apprenants et administration par rôles.',
      en: 'A phishing-simulation and security-learning platform with campaign orchestration, delivery events, learner journeys and role-aware administration.',
    },
    detail: {
      fr: 'Les tableaux de bord relient l’exécution des simulations aux résultats pédagogiques pour aider les équipes à piloter des campagnes mesurables.',
      en: 'Its dashboards connect simulation delivery with learning outcomes so teams can operate measurable awareness campaigns.',
    },
    role: {
      fr: 'Architecture produit et développement full-stack des campagnes, parcours apprenants, rôles et tableaux de bord.',
      en: 'Product architecture and full-stack delivery of campaigns, learner journeys, roles and dashboards.',
    },
    outcome: {
      fr: 'Une boucle mesurable entre diffusion des simulations et résultats pédagogiques.',
      en: 'A measurable loop between simulation delivery and learning outcomes.',
    },
    tags: ['NestJS', 'Vue 3', 'Supabase'],
    href: 'https://cyberlab-web-ten.vercel.app/',
    image: '/work/cyberlab-live.png',
    alt: { fr: 'Page d’accueil de CyberLab', en: 'CyberLab landing page' },
    domain: 'cyberlab-web-ten.vercel.app',
    previewClass: 'preview-top',
    galleryIntro: {
      fr: 'De la création d’une campagne aux formations apprenants, le même système visuel accompagne administrateurs et participants à travers la simulation.',
      en: 'From campaign creation to learner training, one visual system carries administrators and participants through the simulation.',
    },
    gallery: projectGalleries.cyberlab,
  },
];

export const gridProjects = [clientProjects[2], projects[0], projects[1], clientProjects[0], projects[2], clientProjects[1]];
