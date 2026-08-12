<template>
  <div class="site-shell">
    <a class="skip-link" href="#main">Skip to content</a>

    <header class="intro" id="top">
      <div class="masthead">
        <div>
          <p class="path-label"><span>~/</span>djibril-sy</p>
          <h1>Djibril Sy</h1>
          <p class="role-line">Product engineer · Dakar, Sénégal</p>
        </div>

        <p class="availability">
          <span class="availability-dot" aria-hidden="true"></span>
          Available for selected freelance projects
        </p>
      </div>

      <p class="focus-line">
        <span aria-hidden="true">→</span>
        product systems, useful interfaces, local tooling, platforms,
        infrastructure &amp; delivery
      </p>

      <p class="intro-copy">
        I design and ship web, mobile and desktop products from first model to
        production. My work sits between product thinking, backend architecture
        and interfaces that make complicated systems feel straightforward.
      </p>

      <nav class="primary-nav" aria-label="Primary navigation">
        <a href="#work"><span>01</span>Selected work</a>
        <a href="#experience"><span>02</span>Client work</a>
        <a href="#background"><span>03</span>Background</a>
        <a href="#contact"><span>04</span>Contact</a>
      </nav>
    </header>

    <main id="main">
      <section class="section" id="work" aria-labelledby="work-title">
        <div class="section-heading">
          <p class="section-number">01</p>
          <div>
            <h2 id="work-title">Selected work</h2>
            <p>Products I have taken from an idea or constraint to a working system.</p>
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
                :aria-label="`${project.name} — open project`"
              >
                <span class="project-number">{{ String(index + 1).padStart(2, '0') }}</span>

                <span class="project-copy">
                  <span class="project-title-row">
                    <strong>{{ project.name }}</strong>
                    <span>{{ project.meta }}</span>
                  </span>
                  <span class="project-description">{{ project.description }}</span>
                  <span class="project-tags" aria-label="Technologies">
                    <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                  </span>
                </span>

                <span class="project-arrow" aria-hidden="true">↗</span>
              </a>

              <figure class="mobile-project-media">
                <img
                  :src="project.image"
                  :alt="project.alt"
                  :class="project.imageFit === 'contain' ? 'contain' : ''"
                  loading="lazy"
                />
              </figure>
            </article>
          </div>

          <aside class="project-preview" aria-live="polite">
            <div class="preview-window">
              <div class="preview-toolbar" aria-hidden="true">
                <span></span><span></span><span></span>
                <p>{{ activeProject.domain }}</p>
              </div>
              <div class="preview-media" :class="activeProject.previewClass">
                <img
                  :key="activeProject.image"
                  :src="activeProject.image"
                  :alt="activeProject.alt"
                  :class="activeProject.imageFit === 'contain' ? 'contain' : ''"
                />
              </div>
              <figcaption>
                <span>{{ activeProject.short }}</span>
                <span>{{ activeProject.year }}</span>
              </figcaption>
            </div>
            <p class="preview-hint"><span>hover / focus</span> to inspect work</p>
          </aside>
        </div>
      </section>

      <section class="section" id="experience" aria-labelledby="experience-title">
        <div class="section-heading">
          <p class="section-number">02</p>
          <div>
            <h2 id="experience-title">Client work</h2>
            <p>Recent engagements where product decisions and implementation met.</p>
          </div>
        </div>

        <div class="experience-list">
          <article v-for="item in experience" :key="item.company" class="experience-item">
            <p class="experience-period">{{ item.period }}</p>
            <div>
              <h3>
                <a v-if="item.href" :href="item.href" target="_blank" rel="noreferrer">
                  {{ item.company }} <span aria-hidden="true">↗</span>
                </a>
                <span v-else>{{ item.company }}</span>
              </h3>
              <p class="experience-role">{{ item.role }}</p>
            </div>
            <p class="experience-description">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="section" id="background" aria-labelledby="background-title">
        <div class="section-heading">
          <p class="section-number">03</p>
          <div>
            <h2 id="background-title">Background</h2>
            <p>Engineering fundamentals, product range and a visual practice.</p>
          </div>
        </div>

        <div class="background-grid">
          <div class="about-copy">
            <p>
              I trained at <strong>42 Paris</strong> and studied electrical engineering
              and industrial computing at <strong>UVSQ</strong>. That systems background
              still shapes how I work: understand the moving parts, remove unnecessary
              ones, then make the whole thing observable and dependable.
            </p>
            <p>
              I also work in visual development for games and publishing. It is a useful
              counterweight to engineering—composition, hierarchy and clarity matter in
              software too.
            </p>
          </div>

          <div class="capability-columns">
            <div>
              <h3>Build</h3>
              <p>TypeScript, Python, PHP, Rust, Java, C, C++</p>
            </div>
            <div>
              <h3>Shape</h3>
              <p>Vue 3, Nuxt, React, Electron, Tailwind</p>
            </div>
            <div>
              <h3>Ship</h3>
              <p>Docker, Supabase, PostgreSQL, Vercel, AWS, DigitalOcean, EAS</p>
            </div>
            <div>
              <h3>Share</h3>
              <p>Git Peer Class · bilingual workshops · technical communication</p>
            </div>
          </div>
        </div>

        <div class="education-strip" aria-label="Education">
          <div>
            <span>2022—2023</span>
            <strong>42 Paris</strong>
            <p>Computer science programme</p>
          </div>
          <div>
            <span>2018—2020</span>
            <strong>UVSQ</strong>
            <p>Electrical engineering &amp; industrial computing</p>
          </div>
          <div>
            <span>Dakar / remote</span>
            <strong>French &amp; English</strong>
            <p>Available across time zones</p>
          </div>
        </div>
      </section>

      <section class="contact-section" id="contact" aria-labelledby="contact-title">
        <p class="terminal-note"><span>$</span> open new-collaboration</p>
        <h2 id="contact-title">Have a useful problem?</h2>
        <p>
          I’m available for product builds, modernization work and integrations—especially
          when the brief is still messy and someone needs to turn it into a working system.
        </p>
        <a class="email-link" href="mailto:sydjbrl@gmail.com">
          sydjbrl@gmail.com <span aria-hidden="true">↗</span>
        </a>

        <nav class="contact-links" aria-label="Contact and profile links">
          <a href="https://github.com/djbrl" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/djibril-sy" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/documents/djibril-sy-cv.pdf" target="_blank">CV / résumé</a>
        </nav>
      </section>
    </main>

    <footer class="site-footer">
      <p>Djibril Sy · product engineer</p>
      <a href="#top">Back to top ↑</a>
      <p>Dakar, Sénégal · 2026</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

type Project = {
  name: string;
  meta: string;
  year: string;
  short: string;
  description: string;
  tags: string[];
  href: string;
  image: string;
  alt: string;
  domain: string;
  imageFit?: 'cover' | 'contain';
  previewClass?: string;
};

const projects: Project[] = [
  {
    name: 'CyberLab',
    meta: 'client platform · RSF',
    year: '2026',
    short: 'security learning & simulation',
    description:
      'A phishing-simulation and security-learning platform with campaign orchestration, delivery events, learner journeys and role-aware administration.',
    tags: ['NestJS', 'Vue 3', 'Supabase'],
    href: 'https://github.com/Djbrl/cyberlab',
    image: '/work/cyberlab.png',
    alt: 'CyberLab security awareness platform interface',
    domain: 'cyberlab / campaign-control',
    previewClass: 'preview-top',
  },
  {
    name: 'The Quest Board',
    meta: 'independent product · live',
    year: '2023—2026',
    short: 'commission discovery for artists',
    description:
      'A live product that turns illustration hiring posts into a searchable board and sends personalized Discord alerts to artists.',
    tags: ['Vue 3', 'NestJS', 'Discord', 'Postgres'],
    href: 'https://www.thequestboard.co',
    image: '/tqb1.png',
    alt: 'The Quest Board interface',
    domain: 'thequestboard.co',
  },
  {
    name: 'Multiprise',
    meta: 'macOS app · open source',
    year: '2026',
    short: 'one control center for local projects',
    description:
      'A desktop control center that discovers project services, assigns collision-free ports, owns process groups and brings logs and previews into one workspace.',
    tags: ['Electron', 'TypeScript', 'Vue 3'],
    href: 'https://github.com/Djbrl/multiprise',
    image: '/work/multiprise.svg',
    alt: 'Multiprise application mark',
    domain: 'multiprise / local-orchestrator',
    imageFit: 'contain',
    previewClass: 'preview-electric',
  },
  {
    name: 'SkinDiff',
    meta: 'social product · League of Legends',
    year: '2026',
    short: 'a social lookbook for collections',
    description:
      'A collection builder and comparison tool for coordinated duo and full-team looks, with public profiles, Discord sign-in and a slash command.',
    tags: ['Nuxt', 'Vue 3', 'Discord', 'Supabase'],
    href: 'https://github.com/Djbrl/skindiff',
    image: '/work/skindiff.png',
    alt: 'SkinDiff social lookbook artwork',
    domain: 'skindiff / compare-collections',
  },
  {
    name: 'ft_irc',
    meta: 'systems project · 42 Paris',
    year: '2023',
    short: 'an IRC server from the protocol up',
    description:
      'A C++ IRC server built around RFC 1459, non-blocking sockets, channels, direct messages and concurrent client handling with poll.',
    tags: ['C++', 'Sockets', 'Networking'],
    href: 'https://github.com/Djbrl/ft_irc',
    image: '/irc1.png',
    alt: 'Terminal output from the ft_irc server',
    domain: 'localhost:8080 / ft_irc',
    previewClass: 'preview-terminal',
  },
];

const experience = [
  {
    period: '2025—2026',
    company: 'MINAPRO AI Executive Cohort',
    role: 'Full-stack engineer · Dakar / remote',
    description:
      'Built a bilingual, invitation-only onboarding and operations system with a deterministic state machine, session planning, analytics and transactional email.',
  },
  {
    period: '2026',
    company: 'TousLesPros',
    role: 'Full-stack & mobile engineer · Dakar',
    description:
      'Rebuilt a Senegal-focused professional discovery portal and delivered its Expo mobile client, including secure sessions, offline caching, maps and EAS releases.',
    href: 'https://touslespros.vercel.app',
  },
  {
    period: 'Internship',
    company: 'GAINDÉ 2000',
    role: 'Software development intern · Dakar',
    description:
      'Early professional software-development experience inside one of Senegal’s established digital-services organizations.',
  },
];

const activeProjectIndex = ref(0);
const activeProject = computed(() => projects[activeProjectIndex.value]);

useHead({
  title: 'Djibril Sy — Product Engineer in Dakar',
  link: [{ rel: 'canonical', href: 'https://djibrilsy.vercel.app/' }],
  meta: [
    {
      name: 'description',
      content:
        'Portfolio of Djibril Sy, a Dakar-based product engineer building web, mobile and desktop products.',
    },
    { name: 'theme-color', content: '#f1f0ec' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://djibrilsy.vercel.app/' },
    { property: 'og:title', content: 'Djibril Sy — Product Engineer in Dakar' },
    {
      property: 'og:description',
      content:
        'Web, mobile and desktop products shaped from first model to production.',
    },
    { property: 'og:image', content: 'https://djibrilsy.vercel.app/og.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Djibril Sy — Product Engineer in Dakar' },
    {
      name: 'twitter:description',
      content:
        'Web, mobile and desktop products shaped from first model to production.',
    },
    { name: 'twitter:image', content: 'https://djibrilsy.vercel.app/og.png' },
  ],
  htmlAttrs: { lang: 'en' },
});
</script>
