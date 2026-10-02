export type LocalizedText = { fr: string; en: string };

type ProjectGalleryItem = {
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  crop?: 'natural' | 'landscape' | 'wide' | 'tight';
  position?: string;
};

type ProjectFeature = { title: LocalizedText; text: LocalizedText };

export type PortfolioProject = {
  name: string;
  kind: 'personal' | 'client';
  year: string;
  short: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  features?: ProjectFeature[];
  tags: string[];
  href?: string;
  image: string;
  tileImage?: string;
  alt: LocalizedText;
  imageFit?: 'cover' | 'contain';
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
      'home.webp',
      { fr: 'Page d’accueil de TheQuestBoard avec le tableau en direct', en: 'TheQuestBoard home page with the live board below' },
      { fr: 'La page d’accueil, avec le nombre de nouvelles demandes et le tableau juste en dessous.', en: 'The home page, with live counts of new requests and the board right below.' },
    ),
    galleryShot(
      'thequestboard',
      'board-filtered.webp',
      { fr: 'Tableau filtré sur les demandes 3D, avec budgets et sources', en: 'Board filtered to 3D requests, with budgets and sources' },
      { fr: 'Le tableau filtré sur la 3D : chaque demande affiche son budget, son ancienneté et sa source.', en: 'The board filtered to 3D work: each request shows its budget, age and source.' },
    ),
    galleryShot(
      'thequestboard',
      'discord-alert.webp',
      { fr: 'Message Discord annonçant une nouvelle demande de commande', en: 'Discord message announcing a new commission request' },
      { fr: 'Une alerte sur Discord, avec le budget, la source et l’heure de publication.', en: 'An alert in Discord, with the budget, source and posting time.' },
    ),
    galleryShot(
      'thequestboard',
      'about.webp',
      { fr: 'Page « À propos » de TheQuestBoard', en: 'TheQuestBoard about page' },
      { fr: 'La page « À propos » : un petit script lancé en 2024, devenu un tableau en direct.', en: 'The about page: it started in 2024 as a small script and grew into a live board.' },
    ),
  ],
  skindiff: [
    galleryShot(
      'skindiff',
      'home.webp',
      { fr: 'Page d’accueil de SkinDiff avec les cartes collection et duo', en: 'SkinDiff home page with collection and duo cards' },
      { fr: 'La page d’accueil : ajoutez vos skins, invitez un ami, et voyez ce que vous pouvez assortir.', en: 'The home page: bring your skins, invite a friend, and see what you can match.' },
    ),
    galleryShot(
      'skindiff',
      'line-finder.webp',
      { fr: 'Recherche de gammes affichant Spirit Blossom pour Ahri et Lux', en: 'Line Finder showing the Spirit Blossom line for Ahri and Lux' },
      { fr: 'La recherche de gammes : choisissez des champions et elle affiche les séries qu’ils partagent, ici Spirit Blossom.', en: 'The line finder: pick champions and it shows the skin series they share, here Spirit Blossom.' },
    ),
    galleryShot(
      'skindiff',
      'collection.webp',
      { fr: 'Éditeur de collection avec des skins d’Ahri sélectionnés et un total de 410 $', en: 'Collection editor with Ahri skins selected and a $410 total' },
      { fr: 'L’éditeur de collection : cochez les skins que vous possédez, le total se met à jour au fur et à mesure.', en: 'The collection editor: pick the skins you own and the total cost updates as you go.' },
    ),
    galleryShot(
      'skindiff',
      'skin-preview.webp',
      { fr: 'Aperçu du skin Arcana Ahri avec ses variantes de couleur', en: 'Arcana Ahri skin preview with its color variants' },
      { fr: 'Un skin en grand, avec ses versions de couleur (chromas) à ajouter à la collection.', en: 'A skin up close, with its color versions (chromas) to add to your collection.' },
    ),
  ],
  multiprise: [
    galleryShot(
      'multiprise',
      'site.webp',
      { fr: 'Page d’accueil du site de Multiprise', en: 'Multiprise website home page' },
      { fr: 'Le site de Multiprise, avec la version préliminaire pour Mac Apple Silicon.', en: 'The Multiprise website, with the early build for Apple Silicon Macs.' },
    ),
    galleryShot(
      'multiprise',
      'launch.webp',
      { fr: 'Multiprise lançant un projet avec deux services et leurs logs', en: 'Multiprise running a project with two services and their logs' },
      { fr: 'Un projet lancé : chaque service a son port et son adresse, avec les logs à côté.', en: 'A running project: each service has its own port and address, with the logs beside them.' },
    ),
    galleryShot(
      'multiprise',
      'add-project.webp',
      { fr: 'Fenêtre d’ajout de projets listant trois services détectés', en: 'Add Projects dialog listing three detected services' },
      { fr: 'Ajout d’un projet : Multiprise liste les services trouvés et la commande qui les lancera.', en: 'Adding a project: Multiprise lists the services it found and how it will start them.' },
    ),
    galleryShot(
      'multiprise',
      'browser.webp',
      { fr: 'Un site lancé, ouvert dans le navigateur intégré de Multiprise', en: 'A running site open in the Multiprise built-in browser' },
      { fr: 'Le navigateur intégré affiche le site lancé sans quitter l’application.', en: 'The built-in browser shows the running site without leaving the app.' },
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
      { fr: 'Page d’accueil de Brainstorm : « A live map of your agents. »', en: 'Brainstorm home page: “A live map of your agents.”' },
      { fr: 'Le site de Brainstorm : une carte en direct de vos agents IA.', en: 'The Brainstorm website: a live map of your AI agents.' },
    ),
    galleryShot(
      'brainstorm',
      'map.webp',
      { fr: 'Carte du code avec quatre agents en train de modifier des fichiers', en: 'Code map with four agents editing files' },
      { fr: 'La carte du code : chaque agent apparaît sur le fichier où il travaille, et les changements récents sont mis en évidence.', en: 'The code map: each agent is shown on the file it’s working on, and recent changes are highlighted.' },
    ),
    galleryShot(
      'brainstorm',
      'replay.webp',
      { fr: 'Une session rejouée sur la carte, avec un parcours numéroté entre les fichiers', en: 'A session replayed on the map, with a numbered path across files' },
      { fr: 'Le replay d’une session : le parcours de l’agent est numéroté étape par étape, avec chaque modification à côté.', en: 'Replaying a session: the agent’s path is numbered step by step, with each change beside it.' },
    ),
    galleryShot(
      'brainstorm',
      'follow.webp',
      { fr: 'Chronologie d’une session avec une modification de fichier et des questions', en: 'Session timeline with a file change and questions about it' },
      { fr: 'La chronologie de la session : ouvrez une étape pour voir ce qui a changé et demander pourquoi.', en: 'The session timeline: open any step to see what changed and ask why.' },
    ),
    galleryShot(
      'brainstorm',
      'places.webp',
      { fr: 'Vue Places montrant les sites, services et applications utilisés par un agent', en: 'Places view showing websites, services and local apps an agent used' },
      { fr: 'Places : ce qu’un agent a fait en dehors du code, comme déployer un site ou publier sur GitHub.', en: 'Places: what an agent did outside the code, like deploying a site or pushing to GitHub.' },
    ),
  ],
};

export const translations = {
  fr: {
    skip: 'Aller au contenu',
    switchLanguage: 'Afficher le site en anglais',
    lightMode: 'Passer au thème clair',
    darkMode: 'Passer au thème sombre',
    role: 'Développeur logiciel',
    tagline: 'Je conçois et livre des produits logiciels qui résolvent des problèmes concrets.',
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
    sectionMenu: 'Aller à une section',
    copyEmail: 'Copier l’adresse',
    emailCopied: 'Copiée',
    roleLabel: 'Mon rôle',
    featuresLabel: 'Fonctionnalités clés',
    screenshotsLabel: 'Captures d’écran',
    technologies: 'Technologies',
    description: 'Portfolio de Djibril Sy, développeur logiciel spécialisé dans les produits web, mobiles et desktop.',
    socialDescription:
      'Djibril Sy, développeur logiciel. Je conçois et livre des produits web et mobiles, du premier prototype à la mise en production, pour des clients comme Reporters sans frontières et MINAPRO.',
  },
  en: {
    skip: 'Skip to content',
    switchLanguage: 'Display the site in French',
    lightMode: 'Switch to light theme',
    darkMode: 'Switch to dark theme',
    role: 'Software developer',
    tagline: 'I design and ship software products that solve real-world problems.',
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
    sectionMenu: 'Go to a section',
    copyEmail: 'Copy to clipboard',
    emailCopied: 'Copied',
    roleLabel: 'My role',
    featuresLabel: 'Key features',
    screenshotsLabel: 'Screenshots',
    technologies: 'Technologies',
    description: 'Portfolio of Djibril Sy, a software developer building web, mobile and desktop products.',
    socialDescription:
      'Djibril Sy, software developer. I design and ship web and mobile products, from first prototype to production, for clients like Reporters Without Borders and MINAPRO.',
  },
};

const projects: PortfolioProject[] = [
  {
    name: 'TheQuestBoard',
    kind: 'personal',
    tileImage: '/work/logos/thequestboard.webp',
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
    features: [
      {
        title: { fr: 'Demandes de plus de 20 forums', en: 'Requests from 20+ forums' },
        text: {
          fr: 'Les demandes de commandes publiées sur plus de 20 forums, rassemblées dans une seule liste consultable.',
          en: 'Commission requests posted on more than 20 forums, collected in one list you can search.',
        },
      },
      {
        title: { fr: 'Filtres', en: 'Filters' },
        text: {
          fr: 'Filtrez par type d’art, par site d’origine et par budget. Les nouvelles annonces sont signalées.',
          en: 'Filter by type of art, where it was posted and budget. New posts are marked.',
        },
      },
      {
        title: { fr: 'Alertes Discord', en: 'Discord alerts' },
        text: {
          fr: 'Les demandes qui vous correspondent arrivent sur Discord, avec leur budget, leur source et leur heure.',
          en: 'Requests that match you are sent to Discord, with their budget, source and time.',
        },
      },
    ],
    tags: ['Vue 3', 'NestJS', 'Discord', 'PostgreSQL'],
    href: 'https://thequestboard.co',
    image: '/work/thequestboard-live.webp',
    alt: { fr: 'Interface de TheQuestBoard', en: 'TheQuestBoard interface' },
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
    features: [
      {
        title: { fr: 'Collection', en: 'Collection' },
        text: {
          fr: 'Ajoutez ou importez les skins que vous possédez. L’application calcule ce qu’ils ont coûté.',
          en: 'Add or import the skins you own. The app adds up what they cost.',
        },
      },
      {
        title: { fr: 'Skins assortis', en: 'Matching skins' },
        text: {
          fr: 'Comparez vos collections avec vos amis pour trouver des skins qui vont ensemble, à deux ou à cinq.',
          en: 'Compare collections with friends to find skins that go together, for two or five players.',
        },
      },
      {
        title: { fr: 'Gammes de skins', en: 'Skin lines' },
        text: {
          fr: 'Voyez tous les skins d’une même série, et les séries que votre groupe a en commun.',
          en: 'See every skin in a themed series, and which series your group has in common.',
        },
      },
      {
        title: { fr: 'Aperçu en jeu', en: 'In-game preview' },
        text: {
          fr: 'Voyez les skins tels qu’ils apparaissent en jeu, avec leurs versions de couleur.',
          en: 'See skins as they look in the game, including their color versions.',
        },
      },
      {
        title: { fr: 'Profils', en: 'Profiles' },
        text: {
          fr: 'Des pages de profil publiques, avec connexion via Discord.',
          en: 'Public profile pages, with sign-in through Discord.',
        },
      },
    ],
    tags: ['Nuxt', 'Vue 3', 'Discord', 'Supabase'],
    href: 'https://skindiff.lol',
    image: '/work/skindiff.webp',
    alt: { fr: 'Visuel du lookbook social SkinDiff', en: 'SkinDiff social lookbook artwork' },
    gallery: projectGalleries.skindiff,
  },
  {
    name: 'Multiprise',
    kind: 'personal',
    year: '2026',
    short: { fr: 'Centre de contrôle pour projets en local', en: 'A control center for local development projects' },
    description: {
      fr: 'Travailler sur plusieurs projets à la fois finit en jonglage de terminaux : quelle commande lance quoi, quel port est libre, quel terminal tient le processus qui refuse de s’arrêter. Multiprise est une application macOS qui lit les fichiers que chaque projet possède déjà, démarre ses services sur des ports qui n’entrent jamais en conflit, et réunit leurs logs, leurs adresses et un aperçu en direct dans une seule fenêtre. Les agents de code s’en servent aussi, via une CLI et un serveur MCP, pour réutiliser les services déjà lancés au lieu d’en démarrer des doublons.',
      en: 'Working on several projects at once turns into terminal juggling: which command starts what, which port is free, which terminal owns the process that won’t stop. Multiprise is a macOS app that reads the files each project already has, starts its services on ports that never collide, and keeps their logs, addresses and a live preview in one window. Coding agents use it too, through a CLI and an MCP server, so they reuse the services already running instead of starting duplicates.',
    },
    role: {
      fr: 'Conception produit et développement complet, d’un premier prototype web en Vue et Rust jusqu’à l’application Electron publiée.',
      en: 'Product design and end-to-end development, from a first web prototype in Vue and Rust to the released Electron app.',
    },
    features: [
      {
        title: { fr: 'Détection des services', en: 'Service detection' },
        text: {
          fr: 'Trouve ce qu’un projet peut lancer en lisant ses fichiers existants. Aucun fichier de réglages à écrire.',
          en: 'Finds what a project can run by reading its existing files. No setup file needed.',
        },
      },
      {
        title: { fr: 'Attribution des ports', en: 'Port assignment' },
        text: {
          fr: 'Donne à chaque service un port libre et garde le même la fois suivante, pour que son adresse ne change pas.',
          en: 'Gives each service a free port and keeps the same one next time, so its address doesn’t change.',
        },
      },
      {
        title: { fr: 'Adresses lisibles', en: 'Readable addresses' },
        text: {
          fr: 'Chaque service a aussi un nom fixe, comme web.shop.localhost.',
          en: 'Each service also gets a fixed name, like web.shop.localhost.',
        },
      },
      {
        title: { fr: 'Logs', en: 'Logs' },
        text: {
          fr: 'Toute la sortie d’un projet dans une seule vue consultable. Les erreurs ont un bouton pour les corriger.',
          en: 'All of a project’s output in one searchable view. Errors come with a button to fix them.',
        },
      },
      {
        title: { fr: 'Accès pour les outils IA', en: 'Access for AI tools' },
        text: {
          fr: 'Les assistants de code comme Claude Code peuvent aussi lister, lancer et lire les services, au lieu d’en démarrer des copies.',
          en: 'Coding assistants like Claude Code can list, start and read services too, instead of starting copies.',
        },
      },
    ],
    tags: ['Electron', 'TypeScript', 'Vue 3', 'MCP'],
    href: 'https://multiprise.vercel.app',
    image: '/work/multiprise.svg',
    alt: { fr: 'Symbole de l’application Multiprise', en: 'Multiprise application mark' },
    imageFit: 'contain',
    gallery: projectGalleries.multiprise,
  },
  {
    name: 'Brainstorm',
    kind: 'personal',
    tileImage: '/work/logos/brainstorm.svg',
    year: '2026',
    short: { fr: 'Une carte en direct des agents IA qui travaillent dans votre code', en: 'A live map of the AI agents working in your code' },
    description: {
      fr: 'Avec les agents de code, on perd vite le fil de son propre projet. Brainstorm tourne à côté de Claude Code et rend chaque session lisible : une chronologie en direct de chaque étape, une carte du code où chaque agent se déplace de fichier en fichier, et une question « pourquoi ? » sur n’importe quelle étape ou fichier. Construit en un après-midi, il a remporté la 3e place du hackathon GOMYCODE × NVIDIA « Come Build with AI » 2026, et s’installe désormais comme plugin Claude Code.',
      en: 'AI coding agents make it easy to lose track of your own project. Brainstorm runs next to Claude Code and makes every session readable: a live timeline of each step, a map of the codebase where each agent moves from file to file, and a “why?” you can ask about any step or file. Built in one afternoon, it took 3rd place at GOMYCODE × NVIDIA’s “Come Build with AI” 2026 hackathon, and now installs as a Claude Code plugin.',
    },
    role: {
      fr: 'Idée, conception produit et architecture. J’ai dirigé un agent Claude Code principal et quatre sous-agents qui construisaient en parallèle, puis fait passer le prototype du hackathon au plugin installable.',
      en: 'Idea, product design and architecture. I directed a lead Claude Code agent and four subagents building in parallel, then took the hackathon prototype to an installable plugin.',
    },
    features: [
      {
        title: { fr: 'Chronologie des sessions', en: 'Session timeline' },
        text: {
          fr: 'Chaque étape de Claude Code, en direct, résumée en quelques mots.',
          en: 'Every step Claude Code takes, as it happens, each summed up in a few words.',
        },
      },
      {
        title: { fr: 'Carte du code', en: 'Code map' },
        text: {
          fr: 'Les fichiers du projet et leurs liens, avec chaque agent affiché sur le fichier où il travaille.',
          en: 'The project’s files and how they connect, with each agent shown on the file it’s working on.',
        },
      },
      {
        title: { fr: 'Questions', en: 'Questions' },
        text: {
          fr: 'Demandez pourquoi une étape ou un fichier a changé et obtenez une réponse de Claude, pour environ 0,03 $.',
          en: 'Ask why a step or file changed and get an answer from Claude, for about $0.03.',
        },
      },
      {
        title: { fr: 'Résumés des fichiers', en: 'File summaries' },
        text: {
          fr: 'Chaque fichier reçoit un résumé de deux phrases. 81 000 lignes en 73 secondes, pour 0,02 $.',
          en: 'Every file gets a two-sentence summary. 81,000 lines took 73 seconds and cost $0.02.',
        },
      },
      {
        title: { fr: 'Confidentialité et partage', en: 'Privacy and sharing' },
        text: {
          fr: 'Tout reste sur votre ordinateur, les mots de passe et les clés sont masqués, et une session s’enregistre en un seul fichier à partager.',
          en: 'Everything stays on your computer, passwords and keys are hidden, and a session can be saved as one file to share.',
        },
      },
    ],
    tags: ['React', 'NestJS', 'Claude API', 'Nemotron'],
    href: 'https://brainstorm-landing.vercel.app',
    image: '/work/case-studies/brainstorm/landing.webp',
    alt: { fr: 'Page d’accueil de Brainstorm', en: 'Brainstorm home page' },
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
    features: [
      {
        title: { fr: 'Assistant du programme', en: 'Program assistant' },
        text: {
          fr: 'Un assistant conversationnel sur la page d’accueil du programme répond aux questions des dirigeants sur les sessions.',
          en: 'A chat assistant on the program’s home page answers executives’ questions about the sessions.',
        },
      },
      {
        title: { fr: 'Questionnaire d’accueil', en: 'Onboarding questionnaire' },
        text: {
          fr: 'Un questionnaire de trois minutes qui adapte ses questions aux réponses de chaque dirigeant, en français ou en anglais.',
          en: 'A three-minute questionnaire that adapts its questions to each executive’s answers, in French or English.',
        },
      },
      {
        title: { fr: 'Synthèse de profil générée', en: 'Generated profile summary' },
        text: {
          fr: 'Au fil des réponses, la plateforme rédige une synthèse du profil qui sert aux conseillers à préparer chaque session.',
          en: 'As executives answer, the platform writes a profile summary that advisors use to prepare each session.',
        },
      },
      {
        title: { fr: 'Invitations et planning', en: 'Invitations and scheduling' },
        text: {
          fr: 'L’équipe invite les dirigeants un par un ou en masse, puis planifie leurs sessions.',
          en: 'The team invites executives one by one or in bulk, then schedules their sessions.',
        },
      },
      {
        title: { fr: 'Back-office et statistiques', en: 'Back office and statistics' },
        text: {
          fr: 'Un back-office avec les statistiques du programme pour l’équipe qui l’anime.',
          en: 'A back office with program statistics for the team running it.',
        },
      },
    ],
    tags: ['TypeScript', 'Supabase', 'Analytics'],
    href: 'https://minaproai.nelamservices.com',
    image: '/work/maeic.webp',
    alt: { fr: 'Page d’accueil du programme MINAPRO AI Executive Catalyst', en: 'MINAPRO AI Executive Catalyst program home page' },
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
    features: [
      {
        title: { fr: 'Recherche de professionnels', en: 'Professional search' },
        text: {
          fr: 'Cherchez par métier ou par secteur et voyez les résultats sur une carte. Les profils vérifiés sont signalés.',
          en: 'Search by job or industry and see results on a map. Verified profiles are marked.',
        },
      },
      {
        title: { fr: 'Actualités, appels d’offres et financements', en: 'News, tenders and funding' },
        text: {
          fr: 'L’actualité économique, les appels d’offres et les financements au même endroit.',
          en: 'Business news, calls for tenders and funding opportunities in one place.',
        },
      },
      {
        title: { fr: 'Site et applications mobiles', en: 'Website and mobile apps' },
        text: {
          fr: 'Le même annuaire sur le web, iPhone et Android, avec profils et favoris.',
          en: 'The same directory on the web, iPhone and Android, with profiles and saved favorites.',
        },
      },
      {
        title: { fr: 'Refonte de Bount-bi', en: 'Rebuild of Bount-bi' },
        text: {
          fr: 'Une refonte complète de Bount-bi, le portail sénégalais du travail et de l’entrepreneuriat.',
          en: 'A full rebuild of Bount-bi, Senegal’s portal for work and business.',
        },
      },
    ],
    tags: ['Nuxt', 'Vue 3', 'Expo', 'PostgreSQL'],
    href: 'https://touslespros.sn',
    image: '/work/touslespros-live.webp',
    alt: { fr: 'Page d’accueil de TousLesPros', en: 'TousLesPros home page' },
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
    features: [
      {
        title: { fr: 'Simulations de phishing', en: 'Phishing simulations' },
        text: {
          fr: 'Les administrateurs envoient de faux e-mails et SMS de phishing et suivent les résultats de chaque campagne.',
          en: 'Admins send fake phishing emails and text messages and follow the results of each campaign.',
        },
      },
      {
        title: { fr: 'Courtes formations', en: 'Short lessons' },
        text: {
          fr: 'Après une simulation, chacun reçoit de courtes formations, des mots de passe à la protection des sources.',
          en: 'After a simulation, people get short lessons, from passwords to protecting sources.',
        },
      },
      {
        title: { fr: 'Deux types de comptes', en: 'Two kinds of accounts' },
        text: {
          fr: 'Des espaces séparés pour l’équipe qui gère les campagnes et pour les personnes formées.',
          en: 'Separate spaces for the team running campaigns and for the people being trained.',
        },
      },
      {
        title: { fr: 'Connexion en deux étapes', en: 'Two-step sign-in' },
        text: {
          fr: 'La connexion demande un code d’une application d’authentification, ou un code de secours.',
          en: 'Signing in takes a code from an authenticator app, or a recovery code.',
        },
      },
    ],
    tags: ['NestJS', 'Vue 3', 'Supabase'],
    href: 'https://cyberlab.sine.sn',
    image: '/work/cyberlab-live.webp',
    alt: { fr: 'Page d’accueil de CyberLab', en: 'CyberLab home page' },
    gallery: projectGalleries.cyberlab,
  },
];

export const gridProjects = [projects[2], projects[3], projects[1], clientProjects[2], clientProjects[1], clientProjects[0], projects[0]];
