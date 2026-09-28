export type LocalizedText = { fr: string; en: string };

type ProjectGalleryItem = {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  crop?: 'natural' | 'landscape' | 'wide' | 'tight';
  position?: string;
};

export type PortfolioProject = {
  name: string;
  kind: 'personal' | 'client';
  year: string;
  short: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  tags: string[];
  href?: string;
  image: string;
  tileImage?: string;
  alt: LocalizedText;
  imageFit?: 'cover' | 'contain';
  galleryIntro?: LocalizedText;
  gallery?: ProjectGalleryItem[];
};

const galleryShot = (
  project: string,
  file: string,
  alt: LocalizedText,
  caption: LocalizedText,
  crop: ProjectGalleryItem['crop'] = 'landscape',
  position?: string,
): ProjectGalleryItem => ({
  src: `/work/case-studies/${project}/${file}`,
  alt,
  caption,
  crop,
  position,
});

const projectGalleries = {
  cyberlab: [
    galleryShot(
      'cyberlab',
      'landing.webp',
      { fr: 'Page d’accueil de CyberLab avec un exemple d’e-mail de phishing', en: 'CyberLab home page with a sample phishing email' },
      { fr: 'La page d’accueil s’ouvre sur un scénario de phishing réaliste.', en: 'The home page opens with a realistic phishing scenario.' },
    ),
    galleryShot(
      'cyberlab',
      'mfa.webp',
      { fr: 'Écran de saisie du code de sécurité CyberLab', en: 'CyberLab security-code sign-in screen' },
      { fr: 'Connexion multifacteur par application d’authentification ou code de récupération.', en: 'Multi-factor sign-in with an authenticator app or a recovery code.' },
      'natural',
    ),
    galleryShot(
      'cyberlab',
      'roles.webp',
      { fr: 'Cartes des espaces administrateur et apprenant', en: 'Administrator and learner space cards' },
      { fr: 'Les administrateurs pilotent les campagnes, les apprenants reprennent leurs formations.', en: 'Administrators run campaigns; learners pick up where they left off in their training.' },
      'natural',
    ),
    galleryShot(
      'cyberlab',
      'campaigns.webp',
      { fr: 'Tableau de bord des campagnes CyberLab', en: 'CyberLab campaigns dashboard' },
      { fr: 'Les administrateurs lancent des simulations par e-mail et SMS, préparent les destinataires et suivent chaque campagne.', en: 'Administrators launch email and SMS simulations, prepare recipients and track each campaign.' },
      'natural',
    ),
    galleryShot(
      'cyberlab',
      'training-library.webp',
      { fr: 'Liste de la bibliothèque de formations CyberLab', en: 'CyberLab training library list' },
      { fr: 'De courtes formations proposées après une simulation, des mots de passe à la protection des sources.', en: 'Short lessons offered after a simulation, from strong passwords to protecting sources.' },
      'natural',
    ),
  ],
  thequestboard: [
    galleryShot(
      'thequestboard',
      'landing.webp',
      { fr: 'Page d’accueil de TheQuestBoard dans un navigateur', en: 'TheQuestBoard home page in a browser' },
      { fr: 'La page d’accueil publique sur thequestboard.co.', en: 'The public home page at thequestboard.co.' },
      'wide',
    ),
    galleryShot(
      'thequestboard',
      'lead-board.webp',
      { fr: 'Tableau des demandes de commande avec budgets et sources', en: 'Board of commission requests with budgets and sources' },
      { fr: 'Les demandes se filtrent par discipline, source et budget, et les nouvelles annonces sont signalées dès leur arrivée.', en: 'Requests can be filtered by craft, source and budget, with new posts flagged as they arrive.' },
      'wide',
    ),
    galleryShot(
      'thequestboard',
      'discord-alert.webp',
      { fr: 'Message Discord annonçant une nouvelle demande de commande', en: 'Discord message announcing a new commission request' },
      { fr: 'Chaque alerte indique le budget, la source et l’heure de publication, directement dans Discord.', en: 'Each alert shows the budget, source and posting time, right in Discord.' },
      'natural',
    ),
  ],
  skindiff: [
    galleryShot(
      'skindiff',
      'five-stack-overview.webp',
      { fr: 'Cinq cartes de joueurs avec nombre de skins et dépenses', en: 'Five player cards with skin counts and spend' },
      { fr: 'Une équipe de cinq joueurs, chacun avec la taille de sa collection et ses dépenses.', en: 'A five-player team, each with their collection size and total spend.' },
      'wide',
    ),
    galleryShot(
      'skindiff',
      'line-finder-expanded.webp',
      { fr: 'Gamme de skins Chosen of the Wolf sur cinq champions', en: 'Chosen of the Wolf skin line across five champions' },
      { fr: 'La recherche par gamme affiche tous les skins d’un même thème, ici Chosen of the Wolf.', en: 'The line finder shows every skin in a themed line, here Chosen of the Wolf.' },
      'natural',
    ),
    galleryShot(
      'skindiff',
      'collection-builder.webp',
      { fr: 'Éditeur de collection avec liste de champions et grille de skins', en: 'Collection editor with a champion list and skin grid' },
      { fr: 'Les joueurs créent ou importent leur collection, avec le total dépensé calculé en direct.', en: 'Players build or import their collection, with a running total of what it cost.' },
      'natural',
    ),
    galleryShot(
      'skindiff',
      'duo-compare.webp',
      { fr: 'Morgana Coven et Nami Coven côte à côte', en: 'Coven Morgana and Coven Nami side by side' },
      { fr: 'Les skins assortis de deux joueurs, affichés côte à côte.', en: 'Two players’ matching skins shown side by side.' },
      'natural',
    ),
    galleryShot(
      'skindiff',
      'variants-pink.webp',
      { fr: 'Aperçu en jeu de deux skins avec leurs variantes de couleur', en: 'In-game preview of two skins with color options' },
      { fr: 'Les skins assortis se prévisualisent en jeu, avec leurs variantes de couleur (chromas).', en: 'Matching skins can be previewed in game, along with their color variants (chromas).' },
      'natural',
    ),
  ],
  multiprise: [
    galleryShot(
      'multiprise',
      'control-center.webp',
      { fr: 'Fenêtre Multiprise avec services, ports et logs en direct', en: 'Multiprise window with services, ports and live logs' },
      { fr: 'Chaque service d’un projet se démarre et s’arrête ici, avec son port et ses logs dans la même fenêtre.', en: 'Each service in a project can be started and stopped here, with its port and logs in the same window.' },
      'natural',
    ),
    galleryShot(
      'multiprise',
      'embedded-browser.webp',
      { fr: 'Navigateur intégré affichant un site local', en: 'Built-in browser showing a local site' },
      { fr: 'Un navigateur intégré affiche l’application en cours d’exécution sans quitter Multiprise.', en: 'A built-in browser previews the running app without leaving Multiprise.' },
      'natural',
    ),
  ],
  minapro: [
    galleryShot(
      'maeic',
      'programme.webp',
      { fr: 'Page d’accueil de MINAPRO AI Executive Catalyst avec assistant conversationnel', en: 'MINAPRO AI Executive Catalyst home page with chat assistant' },
      { fr: 'La page d’accueil du programme, avec un assistant qui répond aux questions sur les sessions.', en: 'The program home page, with an assistant that answers questions about the sessions.' },
      'wide',
    ),
    galleryShot(
      'maeic',
      'onboarding-intro.webp',
      { fr: 'Écran « Nous aimerions en savoir plus sur vous »', en: '“Tell us about yourself” onboarding screen' },
      { fr: 'Une courte introduction présente le questionnaire, qui prend environ trois minutes.', en: 'A short intro sets up the questionnaire, which takes about three minutes.' },
      'landscape',
    ),
    galleryShot(
      'maeic',
      'questionnaire.webp',
      { fr: 'Question à choix multiples à côté des informations du participant', en: 'Multiple-choice question next to the participant’s details' },
      { fr: 'Des questions guidées, avec le nom, le poste et l’organisation du participant toujours visibles.', en: 'Guided questions, with the participant’s name, role and organization kept in view.' },
      'landscape',
    ),
    galleryShot(
      'maeic',
      'live-summary.webp',
      { fr: 'Questionnaire avec un panneau de synthèse générée', en: 'Questionnaire with a generated summary panel' },
      { fr: 'Une synthèse du profil se construit au fil des réponses, pour préparer la session d’accompagnement.', en: 'A profile summary builds up as the participant answers, ready for the advisory session.' },
      'landscape',
    ),
  ],
  touslespros: [
    galleryShot(
      'touslespros',
      'landing.webp',
      { fr: 'Page d’accueil de TousLesPros avec recherche de professionnels', en: 'TousLesPros home page with a search for professionals' },
      { fr: 'La page d’accueil réunit l’actualité du travail et de l’entrepreneuriat et la recherche de professionnels.', en: 'The home page combines work and business news with a search for professionals.' },
      'wide',
    ),
    galleryShot(
      'touslespros',
      'news.webp',
      { fr: 'Page d’actualités TousLesPros avec financements et marchés', en: 'TousLesPros news page with funding and tenders' },
      { fr: 'Un fil d’actualités économiques, accompagné des financements et des appels d’offres.', en: 'A business news feed, alongside funding opportunities and tenders.' },
      'landscape',
    ),
    galleryShot(
      'touslespros',
      'mobile.webp',
      { fr: 'Deux téléphones affichant l’application TousLesPros', en: 'Two phones showing the TousLesPros app' },
      { fr: 'L’application iOS et Android pour trouver des professionnels et tenir sa fiche à jour.', en: 'The iOS and Android app for finding professionals and keeping a profile up to date.' },
      'natural',
    ),
    galleryShot(
      'touslespros',
      'category-search.webp',
      { fr: 'Champ de recherche avec des catégories de métiers et de secteurs', en: 'Search field with profession and industry categories' },
      { fr: 'La recherche commence par un métier ou un secteur.', en: 'Search starts from a profession or an industry.' },
      'wide',
    ),
    galleryShot(
      'touslespros',
      'map-results.webp',
      { fr: 'Carte des résultats à côté d’une liste de professionnels', en: 'Map of results next to a list of professionals' },
      { fr: 'Les résultats s’affichent sur une carte et dans une liste de profils, avec leur statut de vérification.', en: 'Results appear on a map and in a list of profiles, each with its verification status.' },
      'natural',
    ),
  ],
  brainstorm: [
    galleryShot(
      'brainstorm',
      'landing.webp',
      { fr: 'Page d’accueil de Brainstorm : « A live map of your code. »', en: 'Brainstorm home page: “A live map of your code.”' },
      { fr: 'La page d’accueil présente Brainstorm : une carte en direct du code, et des agents IA qui l’écrivent.', en: 'The home page introduces Brainstorm: a live map of your code, and of the AI agents writing it.' },
      'landscape',
    ),
    galleryShot(
      'brainstorm',
      'setup.webp',
      { fr: 'Écran de démarrage qui lit le code, les imports et se connecte à Claude Code', en: 'Setup screen reading the code, mapping imports and connecting to Claude Code' },
      { fr: 'Au démarrage, Brainstorm lit le code, cartographie les imports, se connecte à Claude Code et fait résumer chaque fichier par Nemotron.', en: 'On startup, Brainstorm reads the code, maps the imports, connects to Claude Code and has Nemotron summarize every file.' },
      'landscape',
    ),
    galleryShot(
      'brainstorm',
      'map-agents.webp',
      { fr: 'Carte du code avec quatre sous-agents en train de modifier des fichiers', en: 'Code map with four subagents editing files' },
      { fr: 'Sur la carte, chaque agent apparaît sur le fichier qu’il modifie, et les fichiers s’allument selon leur dernière modification.', en: 'On the map, each agent sits on the file it’s editing, and files glow by how recently they changed.' },
      'natural',
    ),
    galleryShot(
      'brainstorm',
      'follow-session.webp',
      { fr: 'Chronologie d’une session Claude Code avec des étapes annotées', en: 'Timeline of a Claude Code session with labeled steps' },
      { fr: 'Chaque session se suit en direct : messages, commandes et modifications, chacun résumé en quelques mots, et rejouable sur la carte.', en: 'Each session can be followed live: messages, commands and edits, each summed up in a few words, and replayed on the map.' },
      'natural',
    ),
    galleryShot(
      'brainstorm',
      'failures.webp',
      { fr: 'Liste des échecs récurrents regroupés par cause', en: 'List of recurring failures grouped by cause' },
      { fr: 'Les commandes qui échouent sont regroupées par cause et classées par urgence, avec les preuves à un clic.', en: 'Failing commands are grouped by cause and ranked by urgency, with the evidence one click away.' },
      'landscape',
    ),
  ],
};

export const translations = {
  fr: {
    skip: 'Aller au contenu',
    switchLanguage: 'Afficher le site en anglais',
    lightMode: 'Passer au thème clair',
    darkMode: 'Passer au thème sombre',
    role: 'Ingénieur produit',
    tagline: 'Je conçois et livre des produits logiciels qui résolvent des problèmes concrets.',
    pageNavigation: 'Navigation entre les pages',
    pageLabels: ['Introduction', 'Projets', 'À propos'],
    primaryNavigation: 'Navigation principale',
    navWork: 'Projets',
    navBackground: 'À propos',
    navContact: 'Contact',
    workTitle: 'Projets sélectionnés',
    backgroundTitle: 'À propos',
    contactIntro:
      'Je suis disponible pour des créations produit, des modernisations et des intégrations, surtout quand le besoin est encore flou et qu’il faut le transformer en système concret.',
    contactNavigation: 'Liens de contact et profils',
    roleLabel: 'Mon rôle',
    technologies: 'Technologies',
    description: 'Portfolio de Djibril Sy, ingénieur produit spécialisé dans les produits web, mobiles et desktop.',
    socialDescription:
      'Djibril Sy, ingénieur produit. Je conçois et livre des produits web et mobiles, du premier prototype à la mise en production, pour des clients comme Reporters sans frontières et MINAPRO.',
  },
  en: {
    skip: 'Skip to content',
    switchLanguage: 'Display the site in French',
    lightMode: 'Switch to light theme',
    darkMode: 'Switch to dark theme',
    role: 'Product engineer',
    tagline: 'I design and ship software products that solve real-world problems.',
    pageNavigation: 'Page navigation',
    pageLabels: ['Introduction', 'Projects', 'About me'],
    primaryNavigation: 'Primary navigation',
    navWork: 'Projects',
    navBackground: 'About me',
    navContact: 'Contact',
    workTitle: 'Selected work',
    backgroundTitle: 'About me',
    contactIntro:
      'I’m available for product builds, modernization work and integrations, especially when the brief is still messy and someone needs to turn it into a working system.',
    contactNavigation: 'Contact and profile links',
    roleLabel: 'My role',
    technologies: 'Technologies',
    description: 'Portfolio of Djibril Sy, a product engineer building web, mobile and desktop products.',
    socialDescription:
      'Djibril Sy, product engineer. I design and ship web and mobile products, from first prototype to production, for clients like Reporters Without Borders and MINAPRO.',
  },
};

const projects: PortfolioProject[] = [
  {
    name: 'TheQuestBoard',
    kind: 'personal',
    tileImage: '/work/logos/thequestboard.jpeg',
    year: '2023–2026',
    short: { fr: 'Repérage de commandes pour artistes', en: 'Commission discovery for artists' },
    description: {
      fr: 'Réunit en un seul tableau consultable les demandes de commandes d’artistes publiées sur plus de 20 forums, avec des alertes Discord personnalisées.',
      en: 'Aggregates artist commission requests from 20+ forums into one searchable board, with personalized Discord alerts.',
    },
    role: {
      fr: 'Conception produit et développement full-stack, de la collecte des annonces sur les forums jusqu’à la recherche et aux alertes Discord.',
      en: 'Product design and full-stack development, from gathering posts across forums to search and Discord alerts.',
    },
    tags: ['Vue 3', 'NestJS', 'Discord', 'PostgreSQL'],
    href: 'https://thequestboard.co',
    image: '/work/thequestboard-live.webp',
    alt: { fr: 'Interface de TheQuestBoard', en: 'TheQuestBoard interface' },
    galleryIntro: {
      fr: 'Les artistes parcourent et filtrent les nouvelles demandes au même endroit, et reçoivent directement sur Discord celles qui leur correspondent.',
      en: 'Artists browse and filter new commission requests in one place, and get the relevant ones sent straight to Discord.',
    },
    gallery: projectGalleries.thequestboard,
  },
  {
    name: 'SkinDiff',
    kind: 'personal',
    year: '2026',
    short: { fr: 'Lookbook social pour les skins de League of Legends', en: 'A social lookbook for League of Legends skins' },
    description: {
      fr: 'Les joueurs de League of Legends importent leur collection de skins et la comparent à celles de leurs amis pour trouver des skins assortis en duo ou à cinq, avec profils publics et connexion Discord.',
      en: 'League of Legends players import their skin collections and compare them with friends’ to find matching skins for duos and five-player teams, with public profiles and Discord sign-in.',
    },
    role: {
      fr: 'Conception produit et développement full-stack, dont les profils, la connexion Discord et l’intégration des données du jeu.',
      en: 'Product design and full-stack development, including profiles, Discord sign-in and game-data integrations.',
    },
    tags: ['Nuxt', 'Vue 3', 'Discord', 'Supabase'],
    href: 'https://skindiff.lol',
    image: '/work/skindiff.webp',
    alt: { fr: 'Visuel du lookbook social SkinDiff', en: 'SkinDiff social lookbook artwork' },
    galleryIntro: {
      fr: 'Importez votre collection, ajoutez vos coéquipiers, puis parcourez les gammes de skins que vous possédez en commun et comparez les looks côte à côte.',
      en: 'Players import their collection, add teammates, then browse the skin lines they share and compare matching looks side by side.',
    },
    gallery: projectGalleries.skindiff,
  },
  {
    name: 'Multiprise',
    kind: 'personal',
    year: '2026',
    short: { fr: 'Centre de contrôle pour projets en local', en: 'A control center for local development projects' },
    description: {
      fr: 'Une application macOS qui repère les services d’un projet, attribue à chacun un port libre, les démarre et les arrête, et affiche leurs logs et un aperçu en direct dans une seule fenêtre.',
      en: 'A macOS app that finds the services in a project, gives each one a free port, starts and stops them, and shows their logs and a live preview in one window.',
    },
    role: {
      fr: 'Conception et développement de l’application desktop, de la détection des services à la gestion des processus, des ports et des logs.',
      en: 'Product design and development of the desktop app, from detecting services to managing processes, ports and logs.',
    },
    tags: ['Electron', 'TypeScript', 'Vue 3'],
    image: '/work/multiprise.svg',
    alt: { fr: 'Symbole de l’application Multiprise', en: 'Multiprise application mark' },
    imageFit: 'contain',
    galleryIntro: {
      fr: 'Au lieu de jongler entre plusieurs terminaux, on retrouve au même endroit les services, les ports, les logs et l’aperçu d’un projet.',
      en: 'Instead of juggling terminal tabs, developers see every service, port, log and preview of a project in one place.',
    },
    gallery: projectGalleries.multiprise,
  },
  {
    name: 'Brainstorm',
    kind: 'personal',
    tileImage: '/work/logos/brainstorm.svg',
    year: '2026',
    short: { fr: 'Une carte en direct du code et des agents IA qui l’écrivent', en: 'A live map of your code and the AI agents writing it' },
    description: {
      fr: 'Brainstorm tourne à côté de Claude Code et montre ce que les agents ont fait, où et pourquoi : une chronologie en direct de chaque session, une carte du code qui s’allume là où ils travaillent, et une question « pourquoi ? » sur n’importe quelle étape ou fichier. Conçu en un après-midi lors d’un hackathon.',
      en: 'Brainstorm runs next to Claude Code and shows what the agents did, where and why: a live timeline of each session, a map of the code that lights up where they’re working, and a “why?” you can ask about any step or file. Built in one afternoon at a hackathon.',
    },
    role: {
      fr: 'Concept, conception produit et développement full-stack, de l’interface au modèle Nemotron hébergé sur GPU NVIDIA.',
      en: 'Concept, product design and full-stack development, from the interface to a Nemotron model hosted on an NVIDIA GPU.',
    },
    tags: ['React', 'NestJS', 'Claude API', 'Nemotron'],
    href: 'https://brainstorm-landing.vercel.app',
    image: '/work/case-studies/brainstorm/landing.webp',
    alt: { fr: 'Page d’accueil de Brainstorm', en: 'Brainstorm home page' },
    galleryIntro: {
      fr: 'Les développeurs suivent le travail des agents étape par étape, voient où il se situe dans le code et repèrent les erreurs qui reviennent.',
      en: 'Developers follow the agents’ work step by step, see where it lands in the codebase and spot the failures that keep coming back.',
    },
    gallery: projectGalleries.brainstorm,
  },
];

const clientProjects: PortfolioProject[] = [
  {
    name: 'MINAPRO AI Executive Catalyst',
    kind: 'client',
    tileImage: '/work/logos/maeic.webp',
    year: '2025–2026',
    short: { fr: 'Plateforme d’un programme IA pour dirigeants', en: 'AI program platform for executives' },
    description: {
      fr: 'Une plateforme complète pour le programme d’initiation à l’IA de MINAPRO destiné aux dirigeants : invitations individuelles ou groupées, questionnaire d’accueil des participants, planification des sessions et back-office avec statistiques pour l’équipe qui anime le programme.',
      en: 'An end-to-end platform for MINAPRO’s AI program for executives: individual and group invitations, an onboarding questionnaire for each participant, session scheduling, and a back office with analytics for the team running the program.',
    },
    role: {
      fr: 'Conception et architecture du parcours participant bilingue, ainsi que du back-office utilisé par l’équipe pour piloter le programme.',
      en: 'Design and architecture of the bilingual participant experience, plus the back office the team uses to run the program.',
    },
    tags: ['TypeScript', 'Supabase', 'Analytics'],
    href: 'https://minaproai.nelamservices.com',
    image: '/work/maeic.webp',
    alt: { fr: 'Page d’accueil du programme MINAPRO AI Executive Catalyst', en: 'MINAPRO AI Executive Catalyst program home page' },
    galleryIntro: {
      fr: 'Les dirigeants répondent à un court questionnaire qui s’adapte à leurs réponses ; la plateforme en tire une synthèse pour préparer leur session d’accompagnement.',
      en: 'Executives answer a short questionnaire that adapts as they go; the platform turns their answers into a summary that prepares their advisory session.',
    },
    gallery: projectGalleries.minapro,
  },
  {
    name: 'TousLesPros',
    kind: 'client',
    tileImage: '/work/logos/touslespros.jpeg',
    year: '2026',
    short: { fr: 'Travail & entrepreneuriat au Sénégal', en: 'Work & entrepreneurship in Senegal' },
    description: {
      fr: 'TousLesPros est la nouvelle version de Bount-bi, le portail du travail et de l’entrepreneuriat au Sénégal, entièrement reconstruit. Site web et applications iOS/Android avec annuaire, profils, recherche, favoris, contenus éditoriaux, appels d’offres et financements.',
      en: 'TousLesPros is the new version of Bount-bi, Senegal’s portal for work and entrepreneurship, rebuilt from the ground up. Web and iOS/Android apps with a directory, profiles, search, favorites, editorial content, tenders and funding.',
    },
    role: {
      fr: 'Refonte produit et technique, puis livraison de la plateforme web et des applications mobiles.',
      en: 'Product and technical redesign, and delivery of the web platform and mobile apps.',
    },
    tags: ['Nuxt', 'Vue 3', 'Expo', 'PostgreSQL'],
    href: 'https://touslespros.sn',
    image: '/work/touslespros-live.webp',
    alt: { fr: 'Page d’accueil de TousLesPros', en: 'TousLesPros home page' },
    galleryIntro: {
      fr: 'Les visiteurs lisent l’actualité du travail et de l’entrepreneuriat, cherchent un professionnel par métier ou par secteur et retrouvent les résultats sur une carte, sur le web comme sur mobile.',
      en: 'Visitors read work and business news, search for a professional by trade or industry, and see results on a map, on the web or on their phone.',
    },
    gallery: projectGalleries.touslespros,
  },
  {
    name: 'CyberLab',
    kind: 'client',
    tileImage: '/work/logos/cyberlab.png',
    year: '2026–',
    short: { fr: 'Simulation de phishing & formation à la sécurité', en: 'Phishing simulation & security training' },
    description: {
      fr: 'Une plateforme de simulation de phishing et de sensibilisation à la sécurité conçue pour Reporters sans frontières (RSF) : campagnes de phishing par e-mail et SMS, suivi des envois, courtes formations pour les apprenants et accès distincts administrateur et apprenant.',
      en: 'A phishing-simulation and security-awareness platform built for Reporters Without Borders (RSF): email and SMS phishing campaigns, delivery tracking, short training for learners, and separate admin and learner access.',
    },
    role: {
      fr: 'Architecture produit et développement full-stack : campagnes, parcours de formation, rôles utilisateurs et tableaux de bord.',
      en: 'Product architecture and full-stack development: campaigns, training paths, user roles and dashboards.',
    },
    tags: ['NestJS', 'Vue 3', 'Supabase'],
    href: 'https://cyberlab.sine.sn',
    image: '/work/cyberlab-live.webp',
    alt: { fr: 'Page d’accueil de CyberLab', en: 'CyberLab home page' },
    galleryIntro: {
      fr: 'Les administrateurs lancent des campagnes de phishing simulé par e-mail ou SMS et en suivent les résultats ; les apprenants reçoivent ensuite de courtes formations sur les risques rencontrés.',
      en: 'Administrators launch simulated phishing campaigns by email or SMS and follow the results; learners then get short lessons on the risks they just faced.',
    },
    gallery: projectGalleries.cyberlab,
  },
];

export const gridProjects = [clientProjects[2], projects[0], projects[1], projects[3], projects[2], clientProjects[1], clientProjects[0]];
