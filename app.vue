<template>
  <div class="site-shell" :class="{ 'project-inspection-open': inspectionOpen }">
    <a class="skip-link" href="#main">{{ copy.skip }}</a>
    <header class="portfolio-header">
      <div class="brand-line">
        <button class="identity-home" type="button" @click="navigateToPage(0)"><strong>Djibril Sy</strong><span aria-hidden="true">·</span><Transition name="header-context" mode="out-in"><span :key="activePage" class="identity-role">{{ headerSectionLabel }}</span></Transition></button>
      </div>
      <div class="header-controls">
        <button class="language-toggle" type="button" :aria-label="copy.switchLanguage" @click="switchLanguage">{{ isFrench ? 'EN' : 'FR' }}</button>
        <button class="theme-toggle" type="button" :aria-label="isDark ? copy.lightMode : copy.darkMode" :title="isDark ? copy.lightMode : copy.darkMode" @click="toggleTheme"><span aria-hidden="true"></span></button>
      </div>
    </header>

    <nav class="page-dots" :class="[{ 'is-hinting': pillHinting }, pillMotion ? `moving-${pillMotion}` : '']" :aria-label="copy.pageNavigation">
      <button v-for="(label, index) in copy.pageLabels" :key="label" type="button" :class="{ active: activePage === index }" :aria-label="label" :aria-current="activePage === index ? 'page' : undefined" @click="navigateToPage(index)"><span aria-hidden="true"></span></button>
    </nav>

    <main id="main" class="portfolio-pages">
      <section class="page-section hero-page" :class="{ active: activePage === 0 }" :style="pageStyle(0)" :aria-hidden="activePage !== 0" :inert="activePage !== 0" aria-labelledby="hero-title">
        <div class="hero-content">
          <h1 id="hero-title" class="portfolio-tagline">
            <template v-if="isFrench">Je conçois et livre des <strong>solutions logicielles</strong> pour résoudre des <strong>problèmes concrets</strong>.</template>
            <template v-else>I design and ship <strong>software solutions</strong> to solve <strong>real world problems</strong>.</template>
          </h1>
          <nav class="hero-section-links" :aria-label="copy.primaryNavigation">
            <button type="button" @click="navigateToPage(2)">{{ copy.navBackground }}</button>
            <button type="button" @click="navigateToPage(1)">{{ isFrench ? 'Projets' : 'Projects' }}</button>
            <button type="button" @click="inspectUtility('contact')">{{ copy.navContact }}</button>
          </nav>
        </div>
      </section>

      <section class="page-section projects-page" :class="{ active: activePage === 1, revealing: projectsRevealing, leaving: projectsLeaving, inspecting: inspectionOpen }" :style="pageStyle(1)" :aria-hidden="activePage !== 1" :inert="activePage !== 1" :aria-label="copy.workTitle">
        <div class="projects-canvas">
          <div class="work-grid-stage">
            <div class="work-grid">
              <button v-for="(project, index) in gridProjects" :key="project.name" class="project-tile" :class="[`tile-${index}`, { selected: isSelectedProject(project) }]" type="button" :aria-label="`${project.name} — ${isFrench ? 'voir les détails' : 'view details'}`" :aria-pressed="isSelectedProject(project)" @click="inspectProject(project)">
                <img :src="project.tileImage || project.image" :alt="project.tileImage ? project.name : localize(project.alt)" :class="{ contain: project.imageFit === 'contain' }" :loading="index < 3 ? 'eager' : 'lazy'" decoding="async" width="1200" height="800">
                <span class="tile-label">{{ project.name }}</span>
              </button>
              <button class="about-tile" :class="{ selected: selectedUtility === 'more' }" type="button" :aria-pressed="selectedUtility === 'more'" @click="inspectUtility('more')"><span>{{ isFrench ? 'Plus de projets' : 'More projects' }}</span><span aria-hidden="true">↗</span></button>
              <button class="contact-tile" :class="{ selected: selectedUtility === 'contact' }" type="button" :aria-pressed="selectedUtility === 'contact'" @click="inspectUtility('contact')"><span>Contact</span><span aria-hidden="true">↗</span></button>
            </div>
          </div>

          <Transition name="inline-panel">
            <article v-if="inspectionOpen" ref="inlineProjectCard" class="inline-project-card" :aria-labelledby="`inline-panel-${inspectionKey}`">
              <div :key="inspectionKey" class="inline-project-article">
                <template v-if="selectedProject">
                  <header class="inline-project-heading">
                    <div class="project-meta-row" :aria-label="isFrench ? 'Informations du projet' : 'Project information'">
                      <span class="project-meta-item">{{ projectKindLabel(selectedProject) }}</span>
                      <span class="project-meta-item">{{ selectedProject.year }}</span>
                      <a class="project-meta-item project-meta-link" :href="selectedProject.href" target="_blank" rel="noreferrer">{{ isFrench ? 'Ouvrir le lien' : 'Open link' }} <span aria-hidden="true">↗</span></a>
                    </div>
                    <h2 :id="`inline-panel-${inspectionKey}`">{{ selectedProject.name }}</h2>
                    <p class="project-subtitle">{{ localize(selectedProject.short) }}</p>
                  </header>
                  <div class="inline-project-copy">
                    <p>{{ localize(selectedProject.description) }}</p>
                    <dl>
                      <div><dt>{{ copy.roleLabel }}</dt><dd>{{ localize(selectedProject.role) }}</dd></div>
                      <div><dt>{{ copy.outcomeLabel }}</dt><dd>{{ localize(selectedProject.outcome) }}</dd></div>
                    </dl>
                  </div>
                  <section v-if="selectedProject.gallery?.length" class="inline-project-gallery" :aria-label="isFrench ? 'Aperçu du produit' : 'Product walkthrough'">
                    <header class="project-gallery-heading">
                      <p>{{ isFrench ? 'Dans le produit' : 'Inside the product' }}</p>
                      <h3>{{ localize(selectedProject.galleryIntro!) }}</h3>
                    </header>
                    <figure v-for="shot in selectedProject.gallery" :key="shot.src" class="project-gallery-item">
                      <div class="project-gallery-media" :class="`crop-${shot.crop || 'natural'}`">
                        <img :src="shot.src" :alt="localize(shot.alt)" :style="shot.position ? { objectPosition: shot.position } : undefined" loading="lazy" decoding="async">
                      </div>
                      <figcaption>{{ localize(shot.caption) }}</figcaption>
                    </figure>
                  </section>
                </template>
                <template v-else-if="selectedUtility === 'more'">
                  <header class="inline-project-heading utility-heading">
                    <p>{{ isFrench ? 'Archive GitHub' : 'GitHub archive' }}</p>
                    <h2 :id="`inline-panel-${inspectionKey}`">{{ isFrench ? 'Plus de projets' : 'More projects' }}</h2>
                    <p>{{ isFrench ? 'Expériences, outils et projets open source.' : 'Experiments, tools and open-source projects.' }}</p>
                  </header>
                  <div class="inline-project-copy utility-copy">
                    <p>{{ isFrench ? 'Une sélection plus large de travaux publiés sur GitHub apparaîtra bientôt ici.' : 'A broader selection of work published on GitHub will appear here soon.' }}</p>
                  </div>
                  <footer class="inline-project-footer utility-footer">
                    <a href="https://github.com/djbrl" target="_blank" rel="noreferrer">{{ isFrench ? 'Voir GitHub' : 'Visit GitHub' }} <span aria-hidden="true">↗</span></a>
                  </footer>
                </template>
                <template v-else>
                  <header class="inline-project-heading utility-heading">
                    <p>{{ isFrench ? 'Travaillons ensemble' : 'Work together' }}</p>
                    <h2 :id="`inline-panel-${inspectionKey}`">Contact</h2>
                    <p>{{ copy.contactIntro }}</p>
                  </header>
                  <div class="inline-contact-links">
                    <a href="mailto:sydjbrl@gmail.com">sydjbrl@gmail.com <span aria-hidden="true">↗</span></a>
                    <a href="https://github.com/djbrl" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                    <a href="https://www.linkedin.com/in/djibril-sy" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                  </div>
                </template>
              </div>
            </article>
          </Transition>
        </div>
      </section>

      <section class="page-section bio-page" :class="{ active: activePage === 2 }" :style="pageStyle(2)" :aria-hidden="activePage !== 2" :inert="activePage !== 2" aria-labelledby="bio-title">
        <div class="bio-layout">
          <h2 id="bio-title">{{ copy.backgroundTitle }}</h2>
          <div class="bio-copy">
            <p v-if="isFrench">
              Formé à
              <a class="bio-entity" href="https://42.fr/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/42.png" alt=""></span><span>42 Paris</span></a>
              et en génie électrique et informatique industrielle à
              <a class="bio-entity" href="https://www.uvsq.fr/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img class="logo-uvsq" src="/about/logos/uvsq.png" alt=""></span><span>l’UVSQ</span></a>,
              j’aborde les produits comme des systèmes : comprendre les pièces en mouvement, leurs interactions et ce qui rend le résultat utile aux personnes qui s’en servent.
            </p>
            <p v-else>
              I trained at
              <a class="bio-entity" href="https://42.fr/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/42.png" alt=""></span><span>42 Paris</span></a>
              and studied electrical engineering and industrial computing at
              <a class="bio-entity" href="https://www.uvsq.fr/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img class="logo-uvsq" src="/about/logos/uvsq.png" alt=""></span><span>UVSQ</span></a>.
              I approach products as systems: understanding the moving parts, how they work together, and what makes the result useful to the people who rely on it.
            </p>
            <p v-if="isFrench">
              Je travaille aussi en développement visuel dans le milieu du jeu vidéo et de l’édition. Parmi mes clients :
              <span class="bio-entity-list">
                <a class="bio-entity" href="https://quasirealhouse.com/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/quasireal.png" alt=""></span><span>QuasiReal Publishing</span></a>
                <a class="bio-entity" href="https://www.wolfpackgames.com/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/wolfpack.png" alt=""></span><span>Wolfpack Games Studio</span></a>
                <a class="bio-entity" href="https://www.riotgames.com/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/riot.png" alt=""></span><span>Riot Games</span></a>
              </span>
            </p>
            <p v-else>
              I also work in visual development for video games and publishing. Past clients include:
              <span class="bio-entity-list">
                <a class="bio-entity" href="https://quasirealhouse.com/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/quasireal.png" alt=""></span><span>QuasiReal Publishing</span></a>
                <a class="bio-entity" href="https://www.wolfpackgames.com/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/wolfpack.png" alt=""></span><span>Wolfpack Games Studio</span></a>
                <a class="bio-entity" href="https://www.riotgames.com/" target="_blank" rel="noreferrer"><span class="bio-entity-logo"><img src="/about/logos/riot.png" alt=""></span><span>Riot Games</span></a>
              </span>
            </p>
            <a href="/documents/djibril-sy-cv.pdf" target="_blank">CV / résumé ↗</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="portfolio-contact">
      <a href="mailto:sydjbrl@gmail.com">sydjbrl@gmail.com</a>
      <nav :aria-label="copy.contactNavigation">
        <a href="https://github.com/djbrl" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/djibril-sy" target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>
    </footer>

  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { gridProjects, translations, type LocalizedText, type PortfolioProject } from '~/data/portfolio';

const route = useRoute();
const locale = ref<'fr' | 'en'>(route.query.lang === 'fr' ? 'fr' : 'en');
const isFrench = computed(() => locale.value === 'fr');
const localize = (value: LocalizedText) => value[locale.value];
const projectKindLabel = (project: PortfolioProject) => {
  if (project.kind === 'client') return isFrench.value ? 'Travail client' : 'Client work';
  return isFrench.value ? 'Projet personnel' : 'Personal project';
};

const copy = computed(() => translations[locale.value]);

const activePage = ref(0);
const headerSectionLabel = computed(() => {
  if (activePage.value === 1) return isFrench.value ? 'Projets' : 'Projects';
  if (activePage.value === 2) return copy.value.navBackground;
  return copy.value.role;
});
const pillHinting = ref(true);
const pillMotion = ref<'up' | 'down' | null>(null);
const projectsRevealing = ref(false);
const projectsLeaving = ref(false);
const isPageTransitioning = ref(false);
// Project content is static; only the selection needs to be reactive.
const selectedProject = shallowRef<PortfolioProject | null>(null);
const selectedUtility = ref<'contact' | 'more' | null>(null);
const inspectionOpen = ref(false);
const isDark = ref(false);
const inlineProjectCard = ref<HTMLElement | null>(null);
let inspectionCloseTimer: ReturnType<typeof setTimeout> | undefined;
let pillTimer: ReturnType<typeof setTimeout> | undefined;
let hintTimer: ReturnType<typeof setTimeout> | undefined;
let projectRevealTimer: ReturnType<typeof setTimeout> | undefined;
let projectLeaveTimer: ReturnType<typeof setTimeout> | undefined;
let wheelResetTimer: ReturnType<typeof setTimeout> | undefined;
let wheelTotal = 0;
let wheelDirection = 0;
let wheelStartedAt = 0;
let wheelLockedUntil = 0;

const projectSlug = (project: PortfolioProject) => project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const isSelectedProject = (project: PortfolioProject) => selectedProject.value === project;
const inspectionKey = computed(() => selectedProject.value ? `project-${projectSlug(selectedProject.value)}` : `utility-${selectedUtility.value}`);

const updateInspectionUrl = (project: PortfolioProject | null, utility: 'contact' | 'more' | null = null) => {
  if (!import.meta.client) return;
  const url = new URL(window.location.href);
  if (project) url.searchParams.set('project', projectSlug(project));
  else url.searchParams.delete('project');
  if (utility) url.searchParams.set('panel', utility);
  else url.searchParams.delete('panel');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
};

const pageStyle = (index: number) => ({ '--page-offset': String(index - activePage.value) });

const navigateToPage = async (index: number) => {
  if (isPageTransitioning.value || index === activePage.value || index < 0 || index > 2) return;
  isPageTransitioning.value = true;
  const direction = index > activePage.value ? 'down' : 'up';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  pillHinting.value = false;
  pillMotion.value = null;
  if (activePage.value === 1) {
    projectsRevealing.value = false;
    projectsLeaving.value = true;
    clearTimeout(projectLeaveTimer);
    projectLeaveTimer = setTimeout(() => { projectsLeaving.value = false; }, reducedMotion ? 0 : 800);
  }
  await nextTick();
  pillMotion.value = direction;
  activePage.value = index;
  if (index === 1) {
    await nextTick();
    projectsRevealing.value = false;
    await nextTick();
    projectsRevealing.value = true;
    clearTimeout(projectRevealTimer);
    projectRevealTimer = setTimeout(() => { projectsRevealing.value = false; }, 1500);
  }
  clearTimeout(pillTimer);
  pillTimer = setTimeout(() => {
    pillMotion.value = null;
    isPageTransitioning.value = false;
  }, reducedMotion ? 0 : 760);
};

const resetWheelGesture = () => {
  wheelTotal = 0;
  wheelDirection = 0;
  wheelStartedAt = 0;
};

const onWheel = (event: WheelEvent) => {
  if (!event.deltaY) return;

  const direction = Math.sign(event.deltaY);
  const target = event.target instanceof HTMLElement ? event.target : null;
  const inlineCard = target?.closest<HTMLElement>('.inline-project-card');
  if (inlineCard) {
    const canScrollCardDown = direction > 0 && inlineCard.scrollTop < inlineCard.scrollHeight - inlineCard.clientHeight - 1;
    const canScrollCardUp = direction < 0 && inlineCard.scrollTop > 1;
    if (canScrollCardDown || canScrollCardUp) return;
    event.preventDefault();
    resetWheelGesture();
    return;
  }
  const activeSection = target?.closest<HTMLElement>('.page-section.active');
  if (activeSection && activeSection.scrollHeight > activeSection.clientHeight + 1) {
    const canContinueDown = direction > 0 && activeSection.scrollTop < activeSection.scrollHeight - activeSection.clientHeight - 1;
    const canContinueUp = direction < 0 && activeSection.scrollTop > 1;
    if (canContinueDown || canContinueUp) return;
  }

  event.preventDefault();
  const now = performance.now();
  if (now < wheelLockedUntil) return;

  if (wheelDirection !== direction || !wheelStartedAt) {
    resetWheelGesture();
    wheelDirection = direction;
    wheelStartedAt = now;
  }

  wheelTotal += Math.min(Math.abs(event.deltaY), 70);
  clearTimeout(wheelResetTimer);
  wheelResetTimer = setTimeout(resetWheelGesture, 420);

  if (wheelTotal < 210 || now - wheelStartedAt < 120) return;
  const nextPage = activePage.value + direction;
  resetWheelGesture();
  if (nextPage < 0 || nextPage > 2) return;
  wheelLockedUntil = now + 900;
  void navigateToPage(nextPage);
};

let touchStartY = 0;
let touchStartedAt = 0;
let touchStartedInInlineCard = false;

const onTouchStart = (event: TouchEvent) => {
  touchStartY = event.touches[0]?.clientY ?? 0;
  touchStartedAt = performance.now();
  const target = event.target instanceof HTMLElement ? event.target : null;
  touchStartedInInlineCard = Boolean(target?.closest('.inline-project-card'));
};

const onTouchEnd = (event: TouchEvent) => {
  if (!touchStartY) return;
  const endY = event.changedTouches[0]?.clientY ?? touchStartY;
  const distance = touchStartY - endY;
  const duration = performance.now() - touchStartedAt;
  touchStartY = 0;
  if (touchStartedInInlineCard) {
    touchStartedInInlineCard = false;
    return;
  }
  if (Math.abs(distance) < 80 || duration < 120 || duration > 900) return;
  void navigateToPage(activePage.value + Math.sign(distance));
};

const openInspection = async (project: PortfolioProject | null, utility: 'contact' | 'more' | null = null) => {
  clearTimeout(inspectionCloseTimer);
  selectedProject.value = project;
  selectedUtility.value = utility;
  inspectionOpen.value = true;
  updateInspectionUrl(project, utility);
  await nextTick();
  inlineProjectCard.value?.scrollTo({ top: 0, behavior: 'auto' });
};

const inspectProject = (project: PortfolioProject) => {
  if (isSelectedProject(project) && !selectedUtility.value) {
    closeInlineProject();
    return;
  }
  return openInspection(project);
};

const closeInlineProject = () => {
  inspectionOpen.value = false;
  updateInspectionUrl(null);
  clearTimeout(inspectionCloseTimer);
  inspectionCloseTimer = setTimeout(() => {
    if (inspectionOpen.value) return;
    selectedProject.value = null;
    selectedUtility.value = null;
  }, 360);
};

const inspectUtility = async (utility: 'contact' | 'more') => {
  if (selectedUtility.value === utility && !selectedProject.value) {
    closeInlineProject();
    return;
  }
  if (activePage.value !== 1) await navigateToPage(1);
  return openInspection(null, utility);
};

const applyTheme = () => {
  if (!import.meta.client) return;
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
  localStorage.setItem('portfolio-color-theme', isDark.value ? 'dark' : 'light');
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  applyTheme();
};

onMounted(() => {
  isDark.value = localStorage.getItem('portfolio-color-theme') === 'dark';
  applyTheme();
  hintTimer = setTimeout(() => { pillHinting.value = false; }, 4200);
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });

  const searchParams = new URL(window.location.href).searchParams;
  const requestedSlug = searchParams.get('project');
  const requestedPanel = searchParams.get('panel');
  const requestedProject = gridProjects.find(project => projectSlug(project) === requestedSlug);
  if (requestedProject) {
    activePage.value = 1;
    selectedProject.value = requestedProject;
    inspectionOpen.value = true;
  } else if (requestedPanel === 'contact' || requestedPanel === 'more') {
    activePage.value = 1;
    selectedUtility.value = requestedPanel;
    inspectionOpen.value = true;
  }
});

onBeforeUnmount(() => {
  clearTimeout(inspectionCloseTimer);
  clearTimeout(pillTimer);
  clearTimeout(hintTimer);
  clearTimeout(projectRevealTimer);
  clearTimeout(projectLeaveTimer);
  clearTimeout(wheelResetTimer);
  if (import.meta.client) {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
  }
});

const switchLanguage = () => {
  if (!import.meta.client) return;
  locale.value = locale.value === 'fr' ? 'en' : 'fr';

  const url = new URL(window.location.href);
  if (locale.value === 'fr') url.searchParams.set('lang', 'fr');
  else url.searchParams.delete('lang');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
};

useHead(() => ({
  title: isFrench.value
    ? 'Djibril Sy | Ingénieur produit'
    : 'Djibril Sy | Product Engineer',
  link: [{ rel: 'canonical', href: 'https://djbrl.vercel.app/' }],
  meta: [
    { name: 'description', content: copy.value.description },
    { name: 'theme-color', content: isDark.value ? '#111111' : '#ffffff' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://djbrl.vercel.app/' },
    {
      property: 'og:title',
      content: isFrench.value
        ? 'Djibril Sy | Ingénieur produit'
        : 'Djibril Sy | Product Engineer',
    },
    { property: 'og:description', content: copy.value.socialDescription },
    { property: 'og:image', content: 'https://djbrl.vercel.app/og.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: isFrench.value
        ? 'Djibril Sy | Ingénieur produit'
        : 'Djibril Sy | Product Engineer',
    },
    { name: 'twitter:description', content: copy.value.socialDescription },
    { name: 'twitter:image', content: 'https://djbrl.vercel.app/og.png' },
  ],
  htmlAttrs: { lang: locale.value },
}));
</script>

<style>
.identity-home .identity-role {
  display:inline-block;
}

.header-context-enter-active,
.header-context-leave-active {
  transition:opacity .18s ease,transform .18s ease;
}

.header-context-enter-from {
  opacity:0;
  transform:translateY(4px);
}

.header-context-leave-to {
  opacity:0;
  transform:translateY(-4px);
}

.portfolio-contact>a,
.portfolio-contact nav {
  font-size:clamp(.9rem,1.15vw,1.08rem);
}

.portfolio-contact {
  transition:transform .62s ease-out;
}

.bio-copy .bio-entity {
  display:inline-flex;
  align-items:center;
  gap:.3em;
  margin:0 .04em;
  padding:.1em .38em .1em .14em;
  border:1px solid var(--line);
  border-radius:6px;
  background:var(--soft);
  color:var(--ink);
  font-size:.92em;
  font-weight:550;
  line-height:1.2;
  letter-spacing:-.015em;
  vertical-align:-.17em;
  white-space:nowrap;
  transition:border-color .16s ease-out,transform .16s ease-out;
}

.bio-entity-logo {
  position:relative;
  display:inline-grid;
  flex:none;
  width:1.12em;
  height:1.12em;
  overflow:hidden;
  place-items:center;
  border:0;
  border-radius:4px;
  background:#fff;
}

.bio-entity-logo img {
  display:block;
  width:100%;
  height:100%;
  object-fit:contain;
}

.bio-entity-logo .logo-uvsq {
  position:absolute;
  top:-1px;
  right:-1px;
  width:86px;
  max-width:none;
  height:auto;
}

.bio-entity-list {
  display:flex;
  flex-wrap:wrap;
  gap:7px;
  margin-top:10px;
}

.bio-entity-list .bio-entity {
  margin:0;
}

@media (hover:hover) {
  .bio-copy .bio-entity:hover {
    border-color:var(--quiet);
    transform:translateY(-1px);
  }
}

.bio-copy .bio-entity:focus-visible {
  outline:2px solid var(--ink);
  outline-offset:2px;
}

.hero-page .portfolio-tagline {
  color:var(--quiet);
}

.hero-page .portfolio-tagline strong {
  color:var(--ink);
  font-weight:inherit;
}

.projects-page .about-tile,
.projects-page .contact-tile {
  background:#f0f0ed;
  box-shadow:none;
  color:#202020;
}

.projects-page .about-tile:hover,
.projects-page .contact-tile:hover {
  background:#e6e6e2;
}

.projects-page .tile-0 {
  background:#ec0048;
  box-shadow:none;
}

.projects-page .tile-3 {
  background:#050505;
}

.projects-page .tile-0 img {
  mix-blend-mode:normal;
  transform:scale(3.82);
}

.projects-page .tile-0:hover img {
  transform:scale(3.88);
}

.projects-page .tile-3 img {
  clip-path:inset(24% 35.8% 26% 35.8%);
  filter:none;
  mix-blend-mode:normal;
  transform:scale(1.68);
}

.projects-page .tile-3:hover img {
  transform:scale(1.73);
}

.projects-page {
  padding-right:0;
  padding-left:0;
}

.projects-canvas {
  --project-panel-width:clamp(390px,34vw,520px);
  --project-grid-size:min(620px,calc(100svh - 180px),calc(100vw - var(--project-panel-width)));
  --toolbox-motion-duration:.34s;
  --toolbox-motion-ease:cubic-bezier(.22,.8,.24,1);
  position:relative;
  width:calc(var(--project-grid-size) + var(--project-panel-width));
  max-width:100vw;
  height:var(--project-grid-size);
}

.work-grid-stage {
  position:absolute;
  top:50%;
  left:calc(var(--project-panel-width) / 2);
  width:var(--project-grid-size);
  height:var(--project-grid-size);
  transform:translateY(-50%);
  transform-origin:left center;
  transition:left var(--toolbox-motion-duration) var(--toolbox-motion-ease);
  will-change:left;
}

.projects-page .work-grid-stage .work-grid {
  width:100%;
  height:100%;
}

.projects-page.inspecting .work-grid-stage {
  left:0;
}

.projects-page .project-tile.selected {
  box-shadow:inset 0 0 0 2px var(--ink);
}

.projects-page .project-tile.selected .tile-label {
  opacity:1;
  transform:translateY(0);
}

.projects-page .about-tile.selected,
.projects-page .contact-tile.selected {
  box-shadow:inset 0 0 0 2px var(--ink);
}

.inline-project-card {
  position:absolute;
  top:0;
  bottom:0;
  left:var(--project-grid-size);
  width:var(--project-panel-width);
  z-index:3;
  --ink:#202020;
  --quiet:#6f6f6a;
  --line:#deded8;
  --page:#fff;
  padding:clamp(24px,2.4vw,34px);
  overflow-x:hidden;
  overflow-y:auto;
  border:1px solid #e8e8e3;
  border-left:0;
  border-radius:0 10px 10px 0;
  background:#fff;
  color:var(--ink);
  overscroll-behavior-y:contain;
  touch-action:pan-y;
  scrollbar-color:var(--line) transparent;
  scrollbar-width:thin;
  transition:none;
}

.inline-project-article {
  min-height:100%;
  transition:none;
}

.inline-project-heading {
  padding-right:0;
}

.inline-project-heading>p:first-child {
  margin:0 0 10px;
  color:var(--quiet);
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.07em;
  text-transform:uppercase;
}

.project-meta-row {
  display:flex;
  flex-wrap:wrap;
  gap:6px;
  margin:0 0 13px;
}

.project-meta-item {
  display:inline-flex;
  align-items:center;
  min-height:27px;
  padding:5px 9px;
  border-radius:6px;
  background:#f0f0ed;
  color:var(--ink);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:-.01em;
  line-height:1;
}

.project-meta-link {
  gap:5px;
  transition:background-color .18s ease;
}

.project-meta-link:hover {
  background:#e4e4df;
}

.inline-project-heading h2 {
  margin:0;
  font-size:clamp(2.15rem,3.2vw,3.55rem);
  font-weight:650;
  letter-spacing:-.06em;
  line-height:.94;
}

.inline-project-heading>p:last-child,
.inline-project-heading .project-subtitle {
  margin:7px 0 0;
  color:#8a8a84;
  font-size:clamp(.95rem,1.2vw,1.15rem);
  font-weight:400;
  line-height:1.4;
}

.inline-project-figure {
  width:100%;
  aspect-ratio:16/9;
  margin:clamp(22px,3.2vh,32px) 0 0;
  overflow:hidden;
  border:1px solid var(--line);
  border-radius:5px;
  background:#f7f7f4;
}

.inline-project-figure img {
  width:100%;
  height:100%;
  object-fit:cover;
}

.inline-project-figure img.contain {
  padding:clamp(26px,4vw,60px);
  object-fit:contain;
}

.inline-project-copy {
  padding:clamp(22px,3vh,32px) 0;
}

.inline-project-heading + .inline-project-copy {
  padding-top:16px;
}

.inline-project-copy>p {
  max-width:62ch;
  margin:0;
  color:#7f7f79;
  font-size:.94rem;
  font-weight:400;
  line-height:1.62;
}

.inline-project-copy dl {
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
  margin:clamp(22px,3vh,30px) 0 0;
  padding-top:20px;
  border-top:1px solid var(--line);
}

.inline-project-copy dl div {
  display:block;
  padding:0;
  border:0;
}

.inline-project-copy dt {
  display:inline-block;
  margin-bottom:8px;
  padding:4px 7px;
  border-radius:5px;
  background:#f0f0ed;
  color:var(--ink);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:-.01em;
}

.inline-project-copy dd {
  margin:0;
  font-size:.84rem;
  line-height:1.5;
}

.inline-project-gallery {
  display:grid;
  gap:24px;
  padding:0 0 28px;
}

.project-gallery-heading {
  padding-top:22px;
  border-top:1px solid var(--line);
}

.project-gallery-heading p {
  display:inline-block;
  margin:0 0 9px;
  padding:4px 7px;
  border-radius:5px;
  background:#f0f0ed;
  color:var(--ink);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:-.01em;
}

.project-gallery-heading h3 {
  margin:0;
  font-size:1rem;
  font-weight:540;
  letter-spacing:-.025em;
  line-height:1.45;
}

.project-gallery-item {
  margin:0;
}

.project-gallery-media {
  width:100%;
  overflow:hidden;
  border:1px solid var(--line);
  border-radius:8px;
  background:#f4f4f1;
}

.project-gallery-media img {
  display:block;
  width:100%;
  height:auto;
}

.project-gallery-media.crop-landscape {
  aspect-ratio:16/10;
}

.project-gallery-media.crop-wide {
  aspect-ratio:16/9;
}

.project-gallery-media.crop-browser {
  aspect-ratio:16/10;
}

.project-gallery-media.crop-tight {
  aspect-ratio:4/3;
}

.project-gallery-media.crop-landscape img,
.project-gallery-media.crop-wide img,
.project-gallery-media.crop-browser img,
.project-gallery-media.crop-tight img {
  height:100%;
  object-fit:cover;
}

.project-gallery-item figcaption {
  margin-top:9px;
  color:var(--quiet);
  font-size:.72rem;
  line-height:1.42;
}

.inline-project-footer {
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:18px;
  padding-top:18px;
  border-top:1px solid var(--line);
}

.inline-project-footer p {
  margin:0;
  color:var(--quiet);
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.04em;
  text-transform:uppercase;
}

.inline-project-footer a {
  flex:none;
  padding-bottom:2px;
  border-bottom:1px solid currentColor;
  font-size:.86rem;
  font-weight:650;
}

.inline-panel-enter-active,
.inline-panel-leave-active {
  transition:transform var(--toolbox-motion-duration) var(--toolbox-motion-ease);
}

.inline-panel-enter-from,
.inline-panel-leave-to {
  transform:translateX(calc(var(--project-panel-width) / 2));
}

.utility-heading h2 {
  max-width:8ch;
}

.utility-copy {
  margin-top:clamp(34px,7vh,70px);
  border-top:1px solid var(--line);
}

.utility-footer {
  margin-top:clamp(80px,18vh,180px);
}

.inline-contact-links {
  display:flex;
  flex-direction:column;
  gap:0;
  margin-top:clamp(54px,12vh,120px);
  border-top:1px solid var(--line);
}

.inline-contact-links a {
  display:flex;
  justify-content:space-between;
  gap:18px;
  padding:15px 0;
  border-bottom:1px solid var(--line);
  font-size:.92rem;
}

@media (max-width:820px) {
  .projects-page {
    display:block;
    padding-right:18px;
    padding-left:18px;
    overflow:hidden;
  }

  .projects-canvas {
    --project-grid-size:calc(100vw - 72px);
    width:100%;
    height:100%;
    margin:0 auto;
  }

  .work-grid-stage,
  .projects-page.inspecting .work-grid-stage {
    position:relative;
    top:auto;
    left:auto;
    width:var(--project-grid-size);
    height:var(--project-grid-size);
    margin:0 auto;
    transform:none;
  }

  .inline-project-card {
    position:relative;
    inset:auto;
    width:100%;
    min-height:0;
    max-height:none;
    margin-top:12px;
    padding:24px 20px 30px;
    border-left:1px solid #e8e8e3;
    border-radius:10px;
  }

  .projects-page.inspecting .projects-canvas {
    display:flex;
    flex-direction:column;
    min-height:0;
  }

  .projects-page.inspecting {
    padding-bottom:18px;
  }

  .projects-page.inspecting .work-grid-stage {
    flex:0 0 132px;
    width:100%;
    height:132px;
  }

  .projects-page.inspecting .work-grid-stage .work-grid {
    display:grid;
    width:100%;
    height:132px;
    grid-template-columns:repeat(4,minmax(0,1fr));
    grid-template-rows:repeat(2,minmax(0,1fr));
    gap:6px;
  }

  .projects-page.inspecting .work-grid>button {
    grid-column:auto;
    grid-row:auto;
    min-width:0;
    min-height:0;
    border-radius:8px;
  }

  .projects-page.inspecting .about-tile,
  .projects-page.inspecting .contact-tile {
    padding:8px;
    font-size:.68rem;
    letter-spacing:-.025em;
  }

  .projects-page.inspecting .about-tile span:last-child,
  .projects-page.inspecting .contact-tile span:last-child {
    font-size:1rem;
  }

  .projects-page.inspecting .project-tile .tile-label {
    right:5px;
    bottom:5px;
    left:5px;
    width:max-content;
    max-width:calc(100% - 10px);
    padding:4px 6px;
    overflow:hidden;
    font-size:.62rem;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .projects-page.inspecting .inline-project-card {
    flex:1 1 0;
    height:auto;
    margin-top:10px;
  }

  .project-inspection-open .portfolio-contact,
  .project-inspection-open .page-dots {
    visibility:hidden;
    pointer-events:none;
  }

  .project-meta-row {
    gap:5px;
    margin-bottom:11px;
  }

  .project-meta-item {
    min-height:25px;
    padding:5px 7px;
    font-size:.68rem;
  }

  .inline-project-heading h2 {
    font-size:clamp(2.3rem,11vw,3.2rem);
  }

}

.projects-page.revealing .work-grid>button {
  --grid-entry-y:18px;
  animation:grid-block-slide .72s cubic-bezier(.16,1,.3,1) both;
  animation-delay:.1s;
}

.projects-page.revealing .work-grid>button:nth-child(even) { --grid-entry-y:-12px; }
.projects-page.revealing .work-grid>button:nth-child(2) { animation-delay:.17s; }
.projects-page.revealing .work-grid>button:nth-child(3) { animation-delay:.24s; }
.projects-page.revealing .work-grid>button:nth-child(4) { animation-delay:.31s; }
.projects-page.revealing .work-grid>button:nth-child(5) { animation-delay:.38s; }
.projects-page.revealing .work-grid>button:nth-child(6) { animation-delay:.45s; }
.projects-page.revealing .work-grid>button:nth-child(7) { animation-delay:.52s; }
.projects-page.revealing .work-grid>button:nth-child(8) { animation-delay:.59s; }

.projects-page.leaving .work-grid {
  pointer-events:none;
}

.projects-page.leaving .work-grid>button {
  --grid-entry-y:18px;
  animation:grid-block-slide-out .42s cubic-bezier(.7,0,.84,0) both;
  animation-delay:.35s;
}

.projects-page.leaving .work-grid>button:nth-child(even) { --grid-entry-y:-12px; }
.projects-page.leaving .work-grid>button:nth-child(2) { animation-delay:.3s; }
.projects-page.leaving .work-grid>button:nth-child(3) { animation-delay:.25s; }
.projects-page.leaving .work-grid>button:nth-child(4) { animation-delay:.2s; }
.projects-page.leaving .work-grid>button:nth-child(5) { animation-delay:.15s; }
.projects-page.leaving .work-grid>button:nth-child(6) { animation-delay:.1s; }
.projects-page.leaving .work-grid>button:nth-child(7) { animation-delay:.05s; }
.projects-page.leaving .work-grid>button:nth-child(8) { animation-delay:0s; }

.detail-dialog.project-mode {
  inset:0;
  width:100vw;
  height:100dvh;
  max-width:none;
  border:0;
  background:var(--page);
  color:var(--ink);
  overflow:hidden;
}

.detail-dialog.project-mode[open] {
  animation:project-reader-in .46s cubic-bezier(.16,1,.3,1);
}

.detail-dialog.project-mode.closing {
  animation:project-reader-out .24s ease-in forwards;
}

.detail-dialog.project-mode::backdrop {
  background:var(--page);
}

.project-mode .panel-content {
  display:block;
  height:100dvh;
  min-height:0;
  padding:0;
  background:var(--page);
}

.project-reader {
  display:grid;
  grid-template-columns:minmax(340px,36vw) minmax(0,1fr);
  height:100dvh;
  min-height:0;
}

.project-reader-sidebar {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:clamp(13px,2.2vh,22px);
  height:100dvh;
  min-height:0;
  padding:clamp(22px,3.5vh,36px) clamp(30px,3.8vw,62px) clamp(22px,3.5vh,36px);
  border-right:1px solid var(--line);
  background:var(--page);
  overflow:hidden;
}

.project-reader-back {
  display:flex;
  align-items:center;
  gap:9px;
  width:max-content;
  padding:0;
  border:0;
  background:transparent;
  color:var(--quiet);
  font-size:.76rem;
  font-weight:550;
}

.project-reader-back span {
  color:var(--ink);
  font-size:1rem;
  transition:transform .2s ease;
}

.project-reader-back:hover span { transform:translateX(-3px); }

.project-reader-sidebar .panel-heading>p:first-child {
  margin-top:0;
}

.project-reader-sidebar .panel-heading h2 {
  max-width:none;
  font-size:clamp(2.5rem,4vw,4rem);
  line-height:.92;
  letter-spacing:-.07em;
  overflow-wrap:normal;
  word-break:normal;
}

.project-reader-sidebar .panel-heading .project-summary {
  max-width:28ch;
  margin-top:clamp(10px,1.8vh,18px);
  font-size:clamp(.98rem,1.25vw,1.2rem);
  line-height:1.45;
}

.project-sidebar-summary {
  display:-webkit-box;
  max-width:36ch;
  margin:0;
  overflow:hidden;
  color:var(--quiet);
  font-size:.9rem;
  line-height:1.58;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:5;
}

.project-reader-sidebar .project-visit {
  width:max-content;
  padding-bottom:2px;
  border-bottom:1px solid currentColor;
  font-weight:650;
  text-decoration:none;
}

.project-reader-pagination {
  display:flex;
  gap:10px;
  margin-top:auto;
  padding-top:4px;
}

.project-reader-pagination button {
  position:relative;
  width:clamp(58px,5.4vw,76px);
  aspect-ratio:1;
  padding:0;
  overflow:hidden;
  border:1px solid var(--line);
  border-radius:7px;
  background:#f3f3f0;
}

.project-reader-pagination button img {
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .25s ease;
}

.project-reader-pagination button:hover img { transform:scale(1.06); }

.project-reader-pagination img.thumb-touslespros,
.project-reader-pagination img.thumb-thequestboard {
  object-fit:contain;
}

.project-reader-pagination button span {
  position:absolute;
  bottom:5px;
  left:5px;
  display:grid;
  width:22px;
  height:22px;
  place-items:center;
  border-radius:50%;
  background:#fff;
  color:#202020;
  font-size:.82rem;
  box-shadow:0 2px 10px #0002;
}

.project-reader-pagination button:last-child span { right:5px; left:auto; }

.project-reader-canvas {
  min-width:0;
  height:100dvh;
  min-height:0;
  padding:clamp(70px,8vh,98px) clamp(30px,5vw,84px) clamp(54px,7vh,82px);
  background:#f3f3f0;
  overflow-y:auto;
  overscroll-behavior:contain;
}

.project-reader-figure {
  margin:0;
}

.project-reader-figure .panel-image {
  width:100%;
  max-height:none;
  border:1px solid #e5e5e1;
  border-radius:10px;
  background:#fff;
  box-shadow:0 18px 55px #1d1d1d12;
  object-fit:contain;
}

.project-reader-figure .panel-image.contain {
  height:clamp(420px,66vh,760px);
  padding:clamp(40px,8vw,110px);
}

.project-reader-figure figcaption {
  margin-top:12px;
  color:var(--quiet);
  font-size:.72rem;
  letter-spacing:.02em;
}

.project-reader-details {
  display:grid;
  grid-template-columns:minmax(0,1.25fr) minmax(240px,.75fr);
  gap:clamp(38px,6vw,90px);
  margin-top:clamp(54px,8vh,88px);
  padding-top:clamp(24px,3.5vh,38px);
  border-top:1px solid var(--line);
}

.project-reader-overview {
  max-width:44rem;
}

.project-reader-kicker {
  margin:0 0 18px;
  color:var(--quiet);
  font-size:.68rem;
  font-weight:650;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.project-reader-overview p:not(.project-reader-kicker) {
  margin:0 0 18px;
  font-size:clamp(1rem,1.25vw,1.16rem);
  line-height:1.68;
}

.project-reader-details .project-facts {
  max-width:none;
  margin:0;
}

.project-reader-details .project-facts div {
  grid-template-columns:76px 1fr;
  gap:16px;
  padding:0 0 20px;
  border-top:0;
}

.project-reader-details .project-facts dd {
  font-size:.9rem;
  line-height:1.55;
}

:root[data-theme='dark'] .project-mode .panel-content,
:root[data-theme='dark'] .project-reader-sidebar {
  background:var(--page);
  color:var(--ink);
}

:root[data-theme='dark'] .project-reader-canvas {
  background:#1a1a19;
}

:root[data-theme='dark'] .project-reader-figure .panel-image {
  border-color:var(--line);
  background:#242422;
  box-shadow:0 18px 55px #00000040;
}

:root[data-theme='dark'] .project-reader-pagination button { background:#242422; }

@keyframes project-reader-in {
  from { opacity:0; transform:scale(.985); }
  to { opacity:1; transform:scale(1); }
}

@keyframes project-reader-out {
  from { opacity:1; transform:scale(1); }
  to { opacity:0; transform:scale(.992); }
}

@media (max-width:820px) {
  .detail-dialog.project-mode { overflow-y:auto; }

  .project-mode .panel-content { height:auto; }

  .project-reader {
    grid-template-columns:1fr;
    height:auto;
  }

  .project-reader-sidebar {
    position:relative;
    height:auto;
    min-height:100svh;
    padding:22px 22px 26px;
    border-right:0;
    border-bottom:1px solid var(--line);
    overflow:visible;
  }

  .project-reader-sidebar .panel-heading h2 {
    font-size:clamp(2.75rem,12vw,4rem);
  }

  .project-reader-pagination {
    margin-top:24px;
  }

  .project-reader-canvas {
    height:auto;
    min-height:auto;
    padding:46px 16px 28px;
    overflow:visible;
  }

  .project-reader-figure .panel-image.contain {
    height:58vh;
    padding:36px;
  }

  .project-reader-details { grid-template-columns:1fr; }
}

@keyframes grid-block-slide {
  from {
    opacity:0;
    transform:translate3d(clamp(260px,46vw,760px),var(--grid-entry-y),0);
  }
  to {
    opacity:1;
    transform:translate3d(0,0,0);
  }
}

@keyframes grid-block-slide-out {
  from {
    opacity:1;
    transform:translate3d(0,0,0);
  }
  to {
    opacity:0;
    transform:translate3d(clamp(260px,46vw,760px),var(--grid-entry-y),0);
  }
}

@media (prefers-reduced-motion:reduce) {
  .work-grid-stage,
  .inline-panel-enter-active,
  .inline-panel-leave-active {
    transition:none;
  }

  .projects-page.revealing .work-grid>button,
  .projects-page.leaving .work-grid>button {
    animation:none;
  }
}
</style>
