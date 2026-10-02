<template>
  <div class="site-shell" :class="{ 'project-inspection-open': inspectionOpen }">
    <a class="skip-link" href="#main">{{ copy.skip }}</a>
    <header class="portfolio-header">
      <div class="brand-line">
        <div class="identity-home">
          <button class="identity-name" type="button" @click="navigateToPage(0, { focus: true })"><strong>Djibril Sy</strong></button>
          <span aria-hidden="true">·</span>
          <!-- The section label doubles as a menu: an alternative to the page dots for moving between sections. -->
          <div ref="sectionMenu" class="section-menu" @keydown="onSectionMenuKeydown">
            <button ref="sectionMenuButton" class="section-menu-toggle" type="button" aria-haspopup="menu" :aria-expanded="sectionMenuOpen" aria-controls="section-menu-list" :aria-label="`${headerSectionLabel} — ${copy.sectionMenu}`" @click="toggleSectionMenu()">
              <Transition name="header-context" mode="out-in"><span :key="`${activePage}-${locale}`" class="identity-role">{{ headerSectionLabel }}</span></Transition>
              <svg class="section-menu-chevron" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
            </button>
            <Transition name="section-menu">
              <ul v-if="sectionMenuOpen" id="section-menu-list" class="section-menu-list" role="menu" :aria-label="copy.sectionMenu">
                <li v-for="(label, index) in copy.pageLabels" :key="label" role="none">
                  <button type="button" role="menuitem" :class="{ current: activePage === index }" :aria-current="activePage === index ? 'page' : undefined" @click="chooseSection(index)">
                    <span>{{ label }}</span>
                  </button>
                </li>
              </ul>
            </Transition>
          </div>
        </div>
      </div>
      <div class="header-controls">
        <button class="language-toggle" type="button" :aria-label="copy.switchLanguage" @click="switchLanguage">{{ isFrench ? 'EN' : 'FR' }}</button>
        <button class="theme-toggle" type="button" :aria-label="isDark ? copy.lightMode : copy.darkMode" :title="isDark ? copy.lightMode : copy.darkMode" @click="toggleTheme"><span aria-hidden="true"></span></button>
      </div>
    </header>

    <main id="main" class="portfolio-pages">
      <section class="page-section hero-page" :class="{ active: activePage === 0 }" :style="pageStyle(0)" :aria-hidden="activePage !== 0" :inert="activePage !== 0" aria-labelledby="hero-title">
        <div class="hero-content" :class="{ 'hero-intro': heroIntro }">
          <!-- One span per word so the first-load intro can stagger them; the words still read as one sentence. -->
          <h1 id="hero-title" class="portfolio-tagline page-heading" tabindex="-1">
            <template v-for="(item, index) in taglineWords" :key="`${locale}-${index}`"><span class="tagline-word" :style="{ '--word-index': index }"><strong v-if="item.strong">{{ item.word }}</strong><template v-else>{{ item.word }}</template><template v-if="index === taglineWords.length - 1">.</template></span>{{ index < taglineWords.length - 1 ? ' ' : '' }}</template>
          </h1>
          <nav class="hero-section-links" :aria-label="copy.primaryNavigation" :style="{ '--word-count': taglineWords.length }" @animationend.self="heroIntro = false">
            <button type="button" @click="navigateToPage(2, { focus: true })">{{ copy.navBackground }}</button>
            <button type="button" @click="navigateToPage(1, { focus: true })">{{ projectsTitle }}</button>
            <button type="button" @click="inspectUtility('contact')">{{ copy.navContact }}</button>
          </nav>
        </div>
      </section>

      <section class="page-section projects-page" :class="{ active: activePage === 1, revealing: projectsRevealing, leaving: projectsLeaving, inspecting: inspectionOpen }" :style="pageStyle(1)" :aria-hidden="activePage !== 1" :inert="activePage !== 1" aria-labelledby="projects-title">
        <h2 id="projects-title" class="sr-only page-heading" tabindex="-1">{{ projectsTitle }}</h2>
        <!-- Server-rendered project summaries: crawlers and no-JS readers get the content; screen readers hear each one once, as its tile's description. -->
        <ul class="sr-only" aria-hidden="true">
          <li v-for="project in gridProjects" :key="project.name"><strong>{{ project.name }}</strong> — <span :id="`project-summary-${projectSlug(project)}`">{{ localize(project.short) }}</span></li>
        </ul>
        <div class="projects-canvas">
          <div class="work-grid-stage">
            <div class="work-grid">
              <button v-for="(project, index) in gridProjects" :key="project.name" class="project-tile" :class="[`tile-${index}`, `tile-project-${projectSlug(project)}`, { selected: isSelectedProject(project) }]" type="button" :aria-label="`${project.name} — ${isFrench ? 'voir les détails' : 'view details'}`" :aria-describedby="`project-summary-${projectSlug(project)}`" :aria-pressed="isSelectedProject(project)" @click="inspectProject(project)">
                <img :src="project.tileImage || project.image" :alt="project.tileImage ? project.name : localize(project.alt)" :class="{ contain: project.imageFit === 'contain' }" :loading="index < 3 ? 'eager' : 'lazy'" decoding="async" width="1200" height="800">
                <span class="tile-label">{{ project.name }}</span>
              </button>
              <a class="about-tile" href="https://github.com/Djbrl" target="_blank" rel="noopener"><span>{{ isFrench ? 'Plus sur GitHub' : 'More on GitHub' }}</span><span aria-hidden="true">↗</span></a>
              <div class="grid-spacer" aria-hidden="true"></div>
            </div>
          </div>

          <Transition name="inline-panel">
            <article v-if="inspectionOpen" ref="inlineProjectCard" class="inline-project-card" :aria-labelledby="`inline-panel-${inspectionKey}`">
              <button class="inline-project-close" type="button" :aria-label="isFrench ? 'Fermer le panneau' : 'Close panel'" :title="isFrench ? 'Fermer (Échap)' : 'Close (Esc)'" @click="closeInlineProject({ restoreFocus: true })"><span aria-hidden="true">×</span></button>
              <div :key="inspectionKey" class="inline-project-article">
                <template v-if="selectedProject">
                  <header class="inline-project-heading">
                    <div class="project-meta-row" :aria-label="isFrench ? 'Informations du projet' : 'Project information'">
                      <span class="project-meta-item">{{ projectKindLabel(selectedProject) }}</span>
                      <span class="project-meta-item">{{ projectYearLabel(selectedProject) }}</span>
                    </div>
                    <h2 :id="`inline-panel-${inspectionKey}`" tabindex="-1">{{ selectedProject.name }}</h2>
                    <p class="project-subtitle">{{ localize(selectedProject.short) }}</p>
                  </header>
                  <!-- A focusable region so keyboard users can scroll the row with the arrow keys. -->
                  <div v-if="selectedProject.gallery?.length" class="project-shots" role="region" tabindex="0" :aria-label="copy.screenshotsLabel">
                    <figure v-for="shot in selectedProject.gallery" :key="shot.src" class="project-shot">
                      <img :src="shot.src" :alt="localize(shot.alt)" :style="shot.position ? { objectPosition: shot.position } : undefined" loading="lazy" decoding="async">
                      <figcaption>{{ localize(shot.caption) }}</figcaption>
                    </figure>
                  </div>
                  <section v-if="selectedProject.features?.length" class="project-features" :aria-labelledby="`features-${inspectionKey}`">
                    <h3 :id="`features-${inspectionKey}`" class="project-section-label">{{ copy.featuresLabel }}</h3>
                    <ul>
                      <li v-for="(feature, index) in selectedProject.features" :key="index" class="project-feature">
                        <h4>{{ localize(feature.title) }}</h4>
                        <p>{{ localize(feature.text) }}</p>
                      </li>
                    </ul>
                  </section>
                  <div class="inline-project-copy">
                    <a v-if="selectedProject.href" class="inline-project-cta" :href="selectedProject.href" target="_blank" rel="noopener">{{ projectCtaLabel(selectedProject) }} <span aria-hidden="true">↗</span></a>
                    <dl>
                      <div><dt>{{ copy.roleLabel }}</dt><dd>{{ localize(selectedProject.role) }}</dd></div>
                      <div v-if="selectedProject.tags?.length"><dt>{{ copy.technologies }}</dt><dd>{{ selectedProject.tags.join(' · ') }}</dd></div>
                    </dl>
                  </div>
                </template>
                <template v-else>
                  <header class="inline-project-heading utility-heading">
                    <p>{{ isFrench ? 'Travaillons ensemble' : 'Let’s work together' }}</p>
                    <h2 :id="`inline-panel-${inspectionKey}`" tabindex="-1">Contact</h2>
                    <p>{{ copy.contactIntro }}</p>
                  </header>
                  <div class="inline-contact-links">
                    <CopyEmail email="sydjbrl@gmail.com" :copy-label="copy.copyEmail" :copied-label="copy.emailCopied">
                      <span>sydjbrl@gmail.com</span>
                      <svg class="copy-email-icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="2" /><path d="M10.5 3.5v-.25A1.75 1.75 0 0 0 8.75 1.5h-5.5A1.75 1.75 0 0 0 1.5 3.25v5.5c0 .97.78 1.75 1.75 1.75h.25" /></svg>
                    </CopyEmail>
                    <a href="https://github.com/Djbrl" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
                    <a href="https://www.linkedin.com/in/djibril-sy" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
                  </div>
                </template>
              </div>
            </article>
          </Transition>
        </div>
      </section>

      <section class="page-section bio-page" :class="{ active: activePage === 2 }" :style="pageStyle(2)" :aria-hidden="activePage !== 2" :inert="activePage !== 2" aria-labelledby="bio-title">
        <div class="bio-layout">
          <h2 id="bio-title" class="page-heading" tabindex="-1">{{ copy.backgroundTitle }}</h2>
          <div class="bio-copy">
            <p v-if="isFrench">
              Formé à
              <a class="bio-entity" href="https://42.fr/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/42.png" alt=""></span><span>42 Paris</span></a>
              et diplômé en génie électrique et informatique industrielle de
              <a class="bio-entity" href="https://www.uvsq.fr/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img class="logo-uvsq" src="/about/logos/uvsq.png" alt=""></span><span>l’UVSQ</span></a>,
              j’aborde les produits comme des systèmes : comprendre chaque rouage, la façon dont ils s’articulent et ce qui rend le résultat utile aux personnes qui s’en servent.
            </p>
            <p v-else>
              I trained at
              <a class="bio-entity" href="https://42.fr/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/42.png" alt=""></span><span>42 Paris</span></a>
              and studied electrical engineering and industrial computing at
              <a class="bio-entity" href="https://www.uvsq.fr/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img class="logo-uvsq" src="/about/logos/uvsq.png" alt=""></span><span>UVSQ</span></a>.
              I approach products as systems: understanding the moving parts, how they work together, and what makes the result useful to the people who rely on it.
            </p>
            <p v-if="isFrench">
              Je travaille aussi en développement visuel dans le milieu du jeu vidéo et de l’édition. Parmi mes clients :
              <span class="bio-entity-list">
                <a class="bio-entity" href="https://quasirealhouse.com/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/quasireal.png" alt=""></span><span>QuasiReal Publishing</span></a>
                <a class="bio-entity" href="https://www.wolfpackgames.com/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/wolfpack.png" alt=""></span><span>Wolfpack Games Studio</span></a>
                <a class="bio-entity" href="https://www.riotgames.com/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/riot.png" alt=""></span><span>Riot Games</span></a>
              </span>
            </p>
            <p v-else>
              I also work in visual development for video games and publishing. Clients include:
              <span class="bio-entity-list">
                <a class="bio-entity" href="https://quasirealhouse.com/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/quasireal.png" alt=""></span><span>QuasiReal Publishing</span></a>
                <a class="bio-entity" href="https://www.wolfpackgames.com/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/wolfpack.png" alt=""></span><span>Wolfpack Games Studio</span></a>
                <a class="bio-entity" href="https://www.riotgames.com/" target="_blank" rel="noopener"><span class="bio-entity-logo"><img src="/about/logos/riot.png" alt=""></span><span>Riot Games</span></a>
              </span>
            </p>
            <p>{{ isFrench ? 'Disponible pour des missions freelance et des postes à temps plein.' : 'Open to freelance projects and full-time roles.' }}</p>
            <a :href="isFrench ? '/documents/djibril-sy-cv.pdf' : '/documents/djibril-sy-cv-en.pdf'" target="_blank" rel="noopener">{{ isFrench ? 'CV (PDF)' : 'Résumé (PDF)' }} <span aria-hidden="true">↗</span></a>
            <img class="bio-portrait" src="/about/djibril-sy.webp" alt="Djibril Sy" width="640" height="640" loading="lazy" decoding="async">
          </div>
        </div>
      </section>
    </main>

    <footer class="portfolio-contact">
      <CopyEmail email="sydjbrl@gmail.com" :copy-label="copy.copyEmail" :copied-label="copy.emailCopied" />
      <nav :aria-label="copy.contactNavigation">
        <a href="https://github.com/Djbrl" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/djibril-sy" target="_blank" rel="noopener">LinkedIn</a>
      </nav>
    </footer>

  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { gridProjects, translations, type LocalizedText, type PortfolioProject } from '~/data/portfolio';

const SITE_URL = 'https://djibrilsy.com/';
const OG_IMAGE = `${SITE_URL}og-djibrilsy.png`;
const THEME_STORAGE_KEY = 'portfolio-color-theme';

const route = useRoute();
const locale = ref<'fr' | 'en'>(route.query.lang === 'fr' ? 'fr' : 'en');
const isFrench = computed(() => locale.value === 'fr');
const localize = (value: LocalizedText) => value[locale.value];
const projectKindLabel = (project: PortfolioProject) => {
  if (project.kind === 'client') return isFrench.value ? 'Projet client' : 'Client work';
  return isFrench.value ? 'Projet personnel' : 'Personal project';
};
const projectCtaLabel = (project: PortfolioProject) => {
  let isGithub = false;
  try {
    const host = new URL(project.href!).hostname;
    isGithub = host === 'github.com' || host.endsWith('.github.com');
  } catch {
    isGithub = false;
  }
  if (isGithub) return isFrench.value ? 'Voir sur GitHub' : 'View on GitHub';
  return isFrench.value ? `Voir ${project.name}` : `Visit ${project.name}`;
};

const copy = computed(() => translations[locale.value]);

// The hero headline as words; strong phrases are the ones set in full ink.
const taglineWords = computed(() => {
  const phrases: [string, boolean][] = isFrench.value
    ? [['Je conçois et livre des', false], ['produits logiciels', true], ['qui résolvent des', false], ['problèmes concrets', true]]
    : [['I design and ship', false], ['software products', true], ['that solve', false], ['real-world problems', true]];
  return phrases.flatMap(([text, strong]) => text.split(' ').map(word => ({ word, strong })));
});
// True until the first-load headline intro has finished; dropping it leaves the text in its resting state.
const heroIntro = ref(true);

const projectsTitle = computed(() => isFrench.value ? 'Projets' : 'Projects');

const activePage = ref(0);
const headerSectionLabel = computed(() => {
  if (activePage.value === 1) return projectsTitle.value;
  if (activePage.value === 2) return copy.value.navBackground;
  return copy.value.role;
});
const sectionMenuOpen = ref(false);
const sectionMenu = ref<HTMLElement | null>(null);
const sectionMenuButton = ref<HTMLElement | null>(null);
const sectionMenuItems = () => [...(sectionMenu.value?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])];

// Opens or closes the section menu; when opening, focus lands on the current section (or the first/last item).
const toggleSectionMenu = async (open = !sectionMenuOpen.value, focus: 'current' | 'first' | 'last' = 'current') => {
  sectionMenuOpen.value = open;
  if (!open) return;
  await nextTick();
  const items = sectionMenuItems();
  const target = focus === 'first' ? items[0] : focus === 'last' ? items.at(-1) : items[activePage.value];
  target?.focus();
};

const closeSectionMenu = (options: { restoreFocus?: boolean } = {}) => {
  if (!sectionMenuOpen.value) return;
  sectionMenuOpen.value = false;
  if (options.restoreFocus) sectionMenuButton.value?.focus();
};

const chooseSection = (index: number) => {
  closeSectionMenu({ restoreFocus: index === activePage.value });
  if (index !== activePage.value) void navigateToPage(index, { focus: true });
};

// Menu keys are handled here and marked as handled, so the page's own arrow-key paging leaves them alone.
const onSectionMenuKeydown = (event: KeyboardEvent) => {
  const items = sectionMenuItems();
  const index = items.indexOf(document.activeElement as HTMLElement);
  const move = (next: number) => items[(next + items.length) % items.length]?.focus();
  if (!sectionMenuOpen.value) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    void toggleSectionMenu(true, event.key === 'ArrowDown' ? 'first' : 'last');
    return;
  }
  if (event.key === 'Escape') closeSectionMenu({ restoreFocus: true });
  else if (event.key === 'ArrowDown') move(index + 1);
  else if (event.key === 'ArrowUp') move(index - 1);
  else if (event.key === 'Home') move(0);
  else if (event.key === 'End') move(items.length - 1);
  else if (event.key === 'Tab') { closeSectionMenu(); return; }
  else return;
  event.preventDefault();
};

// Moving to another section by any other route (dots, wheel, keys) closes the menu.
watch(activePage, () => closeSectionMenu());

const onDocumentPointerDown = (event: PointerEvent) => {
  if (sectionMenuOpen.value && !sectionMenu.value?.contains(event.target as Node)) closeSectionMenu();
};

const projectsRevealing = ref(false);
const projectsLeaving = ref(false);
const isPageTransitioning = ref(false);
// Project content is static; only the selection needs to be reactive.
const selectedProject = shallowRef<PortfolioProject | null>(null);
const selectedUtility = ref<'contact' | null>(null);
const inspectionOpen = ref(false);
const isDark = ref(false);
// True once the visitor has a stored or toggled theme; until then theme-color follows the system scheme.
const hasExplicitTheme = ref(false);
const inlineProjectCard = ref<HTMLElement | null>(null);
let inspectionCloseTimer: ReturnType<typeof setTimeout> | undefined;
let pageTransitionTimer: ReturnType<typeof setTimeout> | undefined;
let projectRevealTimer: ReturnType<typeof setTimeout> | undefined;
let projectLeaveTimer: ReturnType<typeof setTimeout> | undefined;
let wheelResetTimer: ReturnType<typeof setTimeout> | undefined;
let wheelTotal = 0;
let wheelDirection = 0;
let wheelStartedAt = 0;
let wheelLockedUntil = 0;

const pageHeadingIds = ['hero-title', 'projects-title', 'bio-title'];

const projectYearLabel = (project: PortfolioProject) => {
  const ongoing = project.year.match(/^(\d{4})–$/);
  if (!ongoing) return project.year;
  return isFrench.value ? `Depuis ${ongoing[1]}` : `Since ${ongoing[1]}`;
};
const projectSlug = (project: PortfolioProject) => project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const isSelectedProject = (project: PortfolioProject) => selectedProject.value === project;
const inspectionKey = computed(() => selectedProject.value ? `project-${projectSlug(selectedProject.value)}` : `utility-${selectedUtility.value}`);

const updateInspectionUrl = (project: PortfolioProject | null, utility: 'contact' | null = null) => {
  if (!import.meta.client) return;
  const url = new URL(window.location.href);
  if (project) url.searchParams.set('project', projectSlug(project));
  else url.searchParams.delete('project');
  if (utility) url.searchParams.set('panel', utility);
  else url.searchParams.delete('panel');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
};

const pageStyle = (index: number) => ({ '--page-offset': String(index - activePage.value) });

const focusElement = (element: HTMLElement | null | undefined) => {
  element?.focus({ preventScroll: true });
};

const navigateToPage = async (index: number, options: { focus?: boolean } = {}) => {
  if (isPageTransitioning.value || index === activePage.value || index < 0 || index > 2) return;
  isPageTransitioning.value = true;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (activePage.value === 1) {
    // The project panel belongs to the projects page; never leave it open behind another page.
    if (inspectionOpen.value) closeInlineProject();
    projectsRevealing.value = false;
    projectsLeaving.value = true;
    clearTimeout(projectLeaveTimer);
    projectLeaveTimer = setTimeout(() => { projectsLeaving.value = false; }, reducedMotion ? 0 : 800);
  }
  await nextTick();
  activePage.value = index;
  if (options.focus) {
    // Wait for the new page to drop `inert` before moving focus into it.
    await nextTick();
    focusElement(document.getElementById(pageHeadingIds[index]!));
  }
  if (index === 1) {
    await nextTick();
    projectsRevealing.value = false;
    await nextTick();
    projectsRevealing.value = true;
    clearTimeout(projectRevealTimer);
    projectRevealTimer = setTimeout(() => { projectsRevealing.value = false; }, 1500);
  }
  // Ignore further paging until this page's entrance has played.
  clearTimeout(pageTransitionTimer);
  pageTransitionTimer = setTimeout(() => { isPageTransitioning.value = false; }, reducedMotion ? 0 : 760);
};

// The element that would scroll for an interaction starting at `target`: the project panel first, then the active page.
const scrollContainerFor = (target: EventTarget | null) => {
  const element = target instanceof Element ? target : null;
  return element?.closest<HTMLElement>('.inline-project-card') ?? element?.closest<HTMLElement>('.page-section.active') ?? null;
};

const canScrollInDirection = (element: HTMLElement | null | undefined, direction: number) => {
  if (!element || !direction || element.scrollHeight <= element.clientHeight + 1) return false;
  if (!/(auto|scroll)/.test(getComputedStyle(element).overflowY)) return false;
  if (direction > 0) return element.scrollTop < element.scrollHeight - element.clientHeight - 1;
  return element.scrollTop > 1;
};

const resetWheelGesture = () => {
  wheelTotal = 0;
  wheelDirection = 0;
  wheelStartedAt = 0;
};

const onWheel = (event: WheelEvent) => {
  // Mostly sideways gestures belong to horizontal scrollers (the screenshot row), never to paging.
  if (!event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

  const direction = Math.sign(event.deltaY);
  const scroller = scrollContainerFor(event.target);
  if (canScrollInDirection(scroller, direction)) return;
  if (scroller?.classList.contains('inline-project-card')) {
    // Scrolling past the panel's edge never changes page.
    event.preventDefault();
    resetWheelGesture();
    return;
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
let touchScroller: HTMLElement | null = null;
let touchCouldScrollDown = false;
let touchCouldScrollUp = false;

const onTouchStart = (event: TouchEvent) => {
  touchStartY = event.touches[0]?.clientY ?? 0;
  touchStartedAt = performance.now();
  touchScroller = scrollContainerFor(event.target);
  touchStartedInInlineCard = Boolean(touchScroller?.classList.contains('inline-project-card'));
  touchCouldScrollDown = canScrollInDirection(touchScroller, 1);
  touchCouldScrollUp = canScrollInDirection(touchScroller, -1);
};

const onTouchEnd = (event: TouchEvent) => {
  if (!touchStartY) return;
  const endY = event.changedTouches[0]?.clientY ?? touchStartY;
  const distance = touchStartY - endY;
  const duration = performance.now() - touchStartedAt;
  const direction = Math.sign(distance);
  const scroller = touchScroller;
  const couldScroll = direction > 0 ? touchCouldScrollDown : touchCouldScrollUp;
  touchStartY = 0;
  touchScroller = null;
  if (touchStartedInInlineCard) {
    touchStartedInInlineCard = false;
    return;
  }
  if (Math.abs(distance) < 80 || duration < 120 || duration > 900) return;
  // A swipe that scrolled (or could still scroll) the active page is a scroll, not a page change.
  if (couldScroll || canScrollInDirection(scroller, direction)) return;
  void navigateToPage(activePage.value + direction);
};

const nextPageKeys = new Set(['PageDown', 'ArrowDown', 'ArrowRight']);
const previousPageKeys = new Set(['PageUp', 'ArrowUp', 'ArrowLeft']);

const onKeydown = (event: KeyboardEvent) => {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;

  if (event.key === 'Escape') {
    if (!inspectionOpen.value) return;
    event.preventDefault();
    closeInlineProject({ restoreFocus: true });
    return;
  }

  const direction = nextPageKeys.has(event.key) ? 1 : previousPageKeys.has(event.key) ? -1 : 0;
  if (!direction || event.shiftKey) return;
  const scroller = scrollContainerFor(target);
  // Let the panel or a tall page scroll natively; like the wheel, the panel's edge never changes page.
  if (canScrollInDirection(scroller, direction) || scroller?.classList.contains('inline-project-card')) return;
  const nextPage = activePage.value + direction;
  if (nextPage < 0 || nextPage > 2) return;
  event.preventDefault();
  void navigateToPage(nextPage, { focus: true });
};

const openInspection = async (project: PortfolioProject | null, utility: 'contact' | null = null, options: { focus?: boolean } = {}) => {
  clearTimeout(inspectionCloseTimer);
  selectedProject.value = project;
  selectedUtility.value = utility;
  inspectionOpen.value = true;
  updateInspectionUrl(project, utility);
  await nextTick();
  inlineProjectCard.value?.scrollTo({ top: 0, behavior: 'auto' });
  if (options.focus) focusElement(inlineProjectCard.value?.querySelector<HTMLElement>('h2'));
};

const inspectProject = (project: PortfolioProject) => {
  if (isSelectedProject(project) && !selectedUtility.value) {
    closeInlineProject();
    return;
  }
  return openInspection(project);
};

const closeInlineProject = (options: { restoreFocus?: boolean } = {}) => {
  if (options.restoreFocus && activePage.value === 1) {
    // The panel is about to unmount: hand focus back to the tile that opened it.
    const tile = document.querySelector<HTMLElement>('.work-grid .selected');
    focusElement(tile ?? document.getElementById('projects-title'));
  }
  inspectionOpen.value = false;
  updateInspectionUrl(null);
  clearTimeout(inspectionCloseTimer);
  inspectionCloseTimer = setTimeout(() => {
    if (inspectionOpen.value) return;
    selectedProject.value = null;
    selectedUtility.value = null;
  }, 360);
};

const inspectUtility = async (utility: 'contact') => {
  if (selectedUtility.value === utility && !selectedProject.value) {
    closeInlineProject();
    return;
  }
  const fromOtherPage = activePage.value !== 1;
  if (fromOtherPage) {
    await navigateToPage(1);
    if (activePage.value !== 1) return;
  }
  return openInspection(null, utility, { focus: fromOtherPage });
};

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
};

const applyTheme = (persist = true) => {
  if (!import.meta.client) return;
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
  if (!persist) return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark.value ? 'dark' : 'light');
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the theme still applies for this visit.
  }
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { ready: Promise<void>; finished: Promise<void> };
};

// Runs a visual change inside a view transition where the browser supports it (and motion is welcome):
// the theme reveals as a circle growing from the toggle, the language crossfades. Otherwise it just applies.
const withViewTransition = (kind: 'theme' | 'language', update: () => void, origin?: { x: number; y: number }) => {
  const doc = document as ViewTransitionDocument;
  if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update();
    return;
  }
  const root = document.documentElement;
  root.dataset.viewTransition = kind;
  const transition = doc.startViewTransition(async () => {
    update();
    await nextTick();
  });
  transition.finished.finally(() => { delete root.dataset.viewTransition; });
  if (kind !== 'theme' || !origin) return;
  transition.ready.then(() => {
    const radius = Math.hypot(Math.max(origin.x, window.innerWidth - origin.x), Math.max(origin.y, window.innerHeight - origin.y));
    root.animate(
      { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
      { duration: 560, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
    );
  }).catch(() => {});
};

const toggleTheme = (event?: MouseEvent) => {
  const button = event?.currentTarget instanceof HTMLElement ? event.currentTarget.getBoundingClientRect() : null;
  const origin = button ? { x: button.left + button.width / 2, y: button.top + button.height / 2 } : undefined;
  withViewTransition('theme', () => {
    isDark.value = !isDark.value;
    hasExplicitTheme.value = true;
    applyTheme();
  }, origin);
};

onMounted(() => {
  // An early head script may already have set data-theme; otherwise use the stored choice, then the system preference.
  const presetTheme = document.documentElement.dataset.theme;
  const initialTheme = presetTheme === 'dark' || presetTheme === 'light'
    ? presetTheme
    : readStoredTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  isDark.value = initialTheme === 'dark';
  hasExplicitTheme.value = readStoredTheme() !== null;
  // Only an explicit toggle is persisted, so visitors without a stored choice keep following their system theme.
  applyTheme(false);
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('keydown', onKeydown);
  document.addEventListener('pointerdown', onDocumentPointerDown);

  const searchParams = new URL(window.location.href).searchParams;
  const requestedSlug = searchParams.get('project');
  const requestedPanel = searchParams.get('panel');
  const requestedProject = gridProjects.find(project => projectSlug(project) === requestedSlug);
  if (requestedProject) {
    activePage.value = 1;
    selectedProject.value = requestedProject;
    inspectionOpen.value = true;
  } else if (requestedPanel === 'contact') {
    activePage.value = 1;
    selectedUtility.value = requestedPanel;
    inspectionOpen.value = true;
  } else if (requestedSlug || requestedPanel) {
    // Stale deep links (e.g. the retired ?panel=more) are simply dropped.
    updateInspectionUrl(null);
  }
  if (inspectionOpen.value) {
    // Deep links land keyboard and screen-reader users in the panel, once the page has dropped `inert`.
    void nextTick(() => focusElement(inlineProjectCard.value?.querySelector<HTMLElement>('h2')));
  }
});

onBeforeUnmount(() => {
  clearTimeout(inspectionCloseTimer);
  clearTimeout(pageTransitionTimer);
  clearTimeout(projectRevealTimer);
  clearTimeout(projectLeaveTimer);
  clearTimeout(wheelResetTimer);
  if (import.meta.client) {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('keydown', onKeydown);
    document.removeEventListener('pointerdown', onDocumentPointerDown);
  }
});

const switchLanguage = () => {
  if (!import.meta.client) return;
  const nextLocale = locale.value === 'fr' ? 'en' : 'fr';
  withViewTransition('language', () => { locale.value = nextLocale; });

  const url = new URL(window.location.href);
  if (nextLocale === 'fr') url.searchParams.set('lang', 'fr');
  else url.searchParams.delete('lang');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
};

const localeUrls = { en: SITE_URL, fr: `${SITE_URL}?lang=fr` } as const;
const themeColors = { light: '#ffffff', dark: '#111111' } as const;
const themeColorFor = (scheme: 'light' | 'dark') => themeColors[hasExplicitTheme.value ? (isDark.value ? 'dark' : 'light') : scheme];

useHead(() => {
  const title = isFrench.value ? 'Djibril Sy | Développeur logiciel' : 'Djibril Sy | Software Developer';
  const imageAlt = isFrench.value ? 'Djibril Sy — Développeur logiciel' : 'Djibril Sy — Software Developer';
  const pageUrl = localeUrls[locale.value];
  return {
    title,
    link: [
      { key: 'canonical', rel: 'canonical', href: pageUrl },
      { key: 'alternate-en', rel: 'alternate', hreflang: 'en', href: localeUrls.en },
      { key: 'alternate-fr', rel: 'alternate', hreflang: 'fr', href: localeUrls.fr },
      { key: 'alternate-x-default', rel: 'alternate', hreflang: 'x-default', href: localeUrls.en },
      { key: 'favicon', rel: 'icon', href: '/favicon.ico' },
    ],
    meta: [
      { name: 'description', content: copy.value.description },
      // The server can't know a stored choice, so both schemes get a theme-color; an explicit choice sets both to it.
      // Always the same two unkeyed tags, so the client adopts the server-rendered pair and only patches `content`.
      { name: 'theme-color', media: '(prefers-color-scheme: light)', content: themeColorFor('light') },
      { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: themeColorFor('dark') },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Djibril Sy' },
      { property: 'og:locale', content: isFrench.value ? 'fr_FR' : 'en_US' },
      { property: 'og:locale:alternate', content: isFrench.value ? 'en_US' : 'fr_FR' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:title', content: title },
      { property: 'og:description', content: copy.value.socialDescription },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: copy.value.socialDescription },
      { name: 'twitter:image', content: OG_IMAGE },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
    htmlAttrs: { lang: locale.value },
  };
});
</script>

<style>
.identity-home .identity-role {
  display:inline-block;
}

.identity-name,
.section-menu-toggle {
  padding:0;
  border:0;
  background:none;
  color:inherit;
  font:inherit;
  letter-spacing:inherit;
  cursor:pointer;
}

/* Section menu: the header's section label opens a small list of the three sections. */
.section-menu {
  position:relative;
}

.section-menu-toggle {
  display:inline-flex;
  align-items:center;
  gap:6px;
  margin:-4px -8px;
  padding:4px 8px;
  border-radius:8px;
  transition:background .16s ease;
}

.section-menu-toggle:hover,
.section-menu-toggle[aria-expanded='true'] {
  background:var(--soft);
}

.section-menu-chevron {
  width:9px;
  height:6px;
  fill:none;
  stroke:var(--quiet);
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:1.6;
  transition:transform .2s ease;
}

.section-menu-toggle[aria-expanded='true'] .section-menu-chevron {
  transform:rotate(180deg);
}

.section-menu-list {
  position:absolute;
  top:calc(100% + 12px);
  left:-8px;
  min-width:210px;
  margin:0;
  padding:6px;
  border:1px solid var(--line);
  border-radius:13px;
  background:color-mix(in srgb,var(--page) 86%,transparent);
  box-shadow:0 18px 40px -18px rgb(0 0 0 / .28),0 2px 8px rgb(0 0 0 / .05);
  list-style:none;
  -webkit-backdrop-filter:blur(16px) saturate(1.4);
  backdrop-filter:blur(16px) saturate(1.4);
  transform-origin:top left;
}

.section-menu-list button {
  display:flex;
  align-items:center;
  gap:12px;
  width:100%;
  padding:9px 10px;
  border:0;
  border-radius:8px;
  background:none;
  color:var(--quiet);
  font:inherit;
  font-size:.88rem;
  font-weight:500;
  text-align:left;
  cursor:pointer;
  transition:background .14s ease,color .14s ease;
}

.section-menu-list button:hover,
.section-menu-list button:focus-visible {
  background:var(--soft);
  color:var(--ink);
  outline:none;
}

.section-menu-list button.current {
  color:var(--ink);
}

.section-menu-list button.current::after {
  width:6px;
  height:6px;
  margin-left:auto;
  border-radius:50%;
  background:var(--ink);
  content:'';
}


.section-menu-enter-active,
.section-menu-leave-active {
  transition:opacity .16s ease,transform .2s cubic-bezier(.2,.8,.2,1);
}

.section-menu-enter-from,
.section-menu-leave-to {
  opacity:0;
  transform:translateY(-4px) scale(.97);
}

/* Theme and language switches run inside a view transition (see withViewTransition): the theme
   reveals as a circle growing from the toggle, the language crossfades. */
:root[data-view-transition='theme']::view-transition-old(root),
:root[data-view-transition='theme']::view-transition-new(root) {
  animation:none;
  mix-blend-mode:normal;
}

:root[data-view-transition='language']::view-transition-old(root),
:root[data-view-transition='language']::view-transition-new(root) {
  animation-duration:.34s;
  animation-timing-function:ease;
}

.bio-portrait {
  display:block;
  width:clamp(120px,11vw,164px);
  height:auto;
  aspect-ratio:1;
  margin-top:34px;
  border-radius:50%;
  background:var(--soft);
  object-fit:cover;
}

@media (prefers-reduced-motion:reduce) {
  .section-menu-enter-active,
  .section-menu-leave-active,
  .section-menu-chevron {
    transition:none;
  }
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
.portfolio-contact>.copy-email,
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

/* First-load intro: a quick, quiet fade-up of the headline, word by word, then the section
   links. It waits for the font gate. */
.tagline-word {
  display:inline-block;
}

.hero-intro .tagline-word {
  animation:tagline-word-in .5s cubic-bezier(.2,.7,.3,1) both;
  animation-delay:calc(.05s + var(--word-index) * 25ms);
}

.hero-intro .hero-section-links {
  animation:hero-links-in .4s ease-out both;
  animation-delay:calc(.05s + var(--word-count) * 25ms + .15s);
}

html.fonts-pending .hero-intro .tagline-word,
html.fonts-pending .hero-intro .hero-section-links {
  animation-play-state:paused;
}

@keyframes tagline-word-in {
  from {
    opacity:0;
    transform:translateY(.12em);
  }

  to {
    opacity:1;
    transform:none;
  }
}

@keyframes hero-links-in {
  from { opacity:0; }
  to { opacity:1; }
}

.projects-page .about-tile {
  background:var(--soft);
  box-shadow:none;
  color:var(--ink);
}

.projects-page .about-tile:hover {
  background:color-mix(in srgb,var(--soft) 92%,var(--ink));
}

.projects-page .tile-project-cyberlab {
  background:#e40046;
  box-shadow:none;
}

.projects-page .tile-project-minapro-ai-executive-catalyst {
  background:#050505;
}

/* The CyberLab and MINAPRO logos are cropped with clip-paths tuned on a square box. Keep
   the image square and centred (the tile is a size container) so each crop lands in the
   same place at every tile aspect ratio, e.g. the wide tiles of the open-project strip.
   cyberlab.png is a small app icon on a white 1600px canvas: its clip keeps only the icon's
   flat pink centre, which matches the tile colour. */
.projects-page .tile-project-cyberlab img,
.projects-page .tile-project-minapro-ai-executive-catalyst img {
  position:absolute;
  inset:0;
  width:min(100cqw,100cqh);
  height:min(100cqw,100cqh);
  margin:auto;
  object-fit:contain;
  object-position:center;
}

.projects-page .tile-project-cyberlab img {
  clip-path:inset(38%);
  mix-blend-mode:normal;
  transform:scale(3.82);
}

.projects-page .tile-project-cyberlab:hover img {
  transform:scale(3.88);
}

.projects-page .tile-project-minapro-ai-executive-catalyst img {
  clip-path:inset(24% 35.8% 26% 35.8%);
  filter:none;
  mix-blend-mode:normal;
  transform:scale(1.68);
}

.projects-page .tile-project-minapro-ai-executive-catalyst:hover img {
  transform:scale(1.73);
}

/* Tile looks belong to the project, not to its slot, so the grid can be reordered freely. */
.projects-page .tile-project-multiprise {
  background:#f4ede1;
}

.projects-page .tile-project-touslespros {
  background:#ffed00;
}

.projects-page .tile-project-thequestboard {
  background:#f2efe5;
}

.projects-page .tile-project-skindiff {
  background:#fff;
}

.projects-page .tile-project-multiprise img,
.projects-page .tile-project-touslespros img {
  object-fit:contain;
  object-position:center;
  padding:12%;
}

.projects-page .tile-project-skindiff img,
.projects-page .tile-project-brainstorm img {
  object-position:center;
}

/* A square logo: show all of it, on the logo's own cream, in wide strip tiles too. */
.projects-page .tile-project-thequestboard img {
  object-fit:contain;
  object-position:center;
}

.projects-page {
  padding-right:0;
  padding-left:0;
}

.projects-canvas {
  --project-panel-width:clamp(390px,34vw,520px);
  /* 24px gutters either side so the grid and panel never touch the window edges (821–960px). */
  --project-grid-size:min(620px,calc(100svh - 180px),calc(100vw - var(--project-panel-width) - 48px));
  --toolbox-motion-duration:.34s;
  --toolbox-motion-ease:cubic-bezier(.22,.8,.24,1);
  position:relative;
  width:calc(var(--project-grid-size) + var(--project-panel-width));
  max-width:calc(100vw - 48px);
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

/* The tile image covers inset shadows, so the selected ring is drawn on an overlay above it. */
.projects-page .project-tile.selected::after {
  position:absolute;
  inset:0;
  z-index:2;
  border-radius:inherit;
  box-shadow:inset 0 0 0 2px var(--ink),inset 0 0 0 4px var(--page);
  content:'';
  pointer-events:none;
}

.projects-page .project-tile.selected .tile-label {
  opacity:1;
  transform:translateY(0);
}

.inline-project-card {
  --panel-pad:clamp(24px,2.4vw,34px);
  position:absolute;
  top:0;
  bottom:0;
  left:var(--project-grid-size);
  width:var(--project-panel-width);
  z-index:3;
  padding:var(--panel-pad);
  overflow-x:hidden;
  overflow-y:auto;
  border:1px solid var(--line);
  border-left:0;
  border-radius:0 10px 10px 0;
  background:var(--page);
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

.inline-project-close {
  position:sticky;
  top:0;
  z-index:2;
  display:grid;
  float:right;
  width:34px;
  height:34px;
  margin:-6px -6px 8px 12px;
  padding:0;
  place-items:center;
  border-radius:50%;
  background:var(--soft);
  color:var(--ink);
  font-size:1.35rem;
  line-height:1;
  transition:background-color .18s ease;
}

.inline-project-close:hover {
  background:color-mix(in srgb,var(--soft) 88%,var(--ink));
}

.inline-project-close:focus-visible {
  outline-offset:2px;
}

.inline-project-heading h2:focus,
.page-heading:focus {
  outline:none;
}

.sr-only {
  position:absolute;
  width:1px;
  height:1px;
  margin:-1px;
  padding:0;
  overflow:hidden;
  clip:rect(0,0,0,0);
  white-space:nowrap;
  border:0;
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
  background:var(--soft);
  color:var(--ink);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:-.01em;
  line-height:1;
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
  color:var(--quiet);
  font-size:clamp(.95rem,1.2vw,1.15rem);
  font-weight:400;
  line-height:1.4;
}

/* Screenshots: one row that scrolls sideways, bleeding to the panel's edges so the next
   shot peeks in. Heights match; widths follow each image, capped so the row still peeks. */
.project-shots {
  display:flex;
  gap:12px;
  margin:22px calc(-1 * var(--panel-pad)) 0;
  padding:0 var(--panel-pad) 8px;
  overflow-x:auto;
  overflow-y:hidden;
  overscroll-behavior-x:contain;
  scroll-padding-inline:var(--panel-pad);
  scroll-snap-type:x mandatory;
  scrollbar-color:var(--line) transparent;
  scrollbar-width:thin;
  touch-action:pan-x pan-y;
}

.project-shots:focus-visible {
  outline:2px solid var(--ink);
  outline-offset:-2px;
}

.project-shot {
  flex:0 0 auto;
  /* Holds the row's shape (and the captions' width) while images are still loading. */
  min-width:220px;
  margin:0;
  scroll-snap-align:start;
}

.project-shot img {
  display:block;
  width:auto;
  min-width:100%;
  max-width:min(440px,calc(var(--project-panel-width,100vw) - 2 * var(--panel-pad) - 36px));
  height:clamp(170px,24vh,232px);
  border:1px solid var(--line);
  border-radius:8px;
  background:var(--soft);
  object-fit:cover;
}

/* The caption wraps to the image's width instead of widening the card. */
.project-shot figcaption {
  width:0;
  min-width:100%;
  margin-top:8px;
  color:var(--quiet);
  font-size:.72rem;
  line-height:1.42;
}

.project-section-label {
  display:inline-block;
  margin:0 0 10px;
  padding:4px 7px;
  border-radius:5px;
  background:var(--soft);
  color:var(--ink);
  font-size:.72rem;
  font-weight:600;
  letter-spacing:-.01em;
}

/* Key features: large, scannable cards, one per feature. */
.project-features {
  margin-top:clamp(24px,3.4vh,32px);
}

.project-features ul {
  display:grid;
  gap:10px;
  margin:0;
  padding:0;
  list-style:none;
}

.project-feature {
  padding:16px 18px 17px;
  border-radius:12px;
  background:var(--soft);
}

.project-feature h4 {
  margin:0 0 5px;
  color:var(--ink);
  font-size:1.04rem;
  font-weight:650;
  letter-spacing:-.025em;
  line-height:1.25;
}

.project-feature p {
  margin:0;
  color:color-mix(in srgb,var(--ink) 72%,var(--soft));
  font-size:.88rem;
  line-height:1.48;
}

.inline-project-copy {
  padding:0 0 clamp(22px,3vh,32px);
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
  background:var(--soft);
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

.inline-project-cta {
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  width:100%;
  box-sizing:border-box;
  margin-top:20px;
  padding:14px 16px;
  border-radius:8px;
  background:var(--ink);
  color:var(--page);
  font-size:.9rem;
  font-weight:600;
  letter-spacing:-.015em;
  text-decoration:none;
  transition:opacity .18s ease;
}

.inline-project-cta:hover {
  opacity:.86;
}

.inline-project-cta:focus-visible {
  outline:2px solid var(--ink);
  outline-offset:3px;
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

.inline-contact-links {
  display:flex;
  flex-direction:column;
  gap:0;
  margin-top:clamp(54px,12vh,120px);
  border-top:1px solid var(--line);
}

.inline-contact-links a,
.inline-contact-links .copy-email {
  display:flex;
  justify-content:space-between;
  gap:18px;
  padding:15px 0;
  border-bottom:1px solid var(--line);
  font-size:.92rem;
}

.copy-email-icon {
  width:15px;
  height:15px;
  fill:none;
  stroke:currentColor;
  stroke-linecap:round;
  stroke-linejoin:round;
  stroke-width:1.4;
}

/* In the full-width contact row, the tooltip sits over the copy icon rather than the row's centre. */
.inline-contact-links .copy-email .copy-email-tip {
  left:auto;
  right:-6px;
  transform:translateY(4px);
}

.inline-contact-links .copy-email:hover .copy-email-tip,
.inline-contact-links .copy-email:focus-visible .copy-email-tip,
.inline-contact-links .copy-email.copied .copy-email-tip {
  transform:none;
}

.inline-contact-links .copy-email-tip::after {
  left:auto;
  right:10px;
  transform:none;
}

@media (max-width:820px) {
  .projects-page {
    display:block;
    padding-right:18px;
    padding-left:18px;
    overflow:hidden;
  }

  .projects-canvas {
    /* Width-driven on phones, but capped by the small viewport height so landscape phones still fit. */
    --project-grid-size:min(calc(100vw - 72px),calc(100svh - 150px));
    width:100%;
    max-width:none;
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
    --panel-pad:20px;
    padding:24px var(--panel-pad) 30px;
    border-left:1px solid var(--line);
    border-radius:10px;
  }

  .project-shot img {
    max-width:min(440px,76vw);
    height:clamp(150px,30vw,210px);
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
    grid-template-columns:repeat(5,minmax(0,1fr));
    grid-template-rows:repeat(2,minmax(0,1fr));
    gap:6px;
  }

  .projects-page.inspecting .work-grid>* {
    grid-column:auto;
    grid-row:auto;
    min-width:0;
    min-height:0;
    border-radius:8px;
  }

  /* Seven projects and one link tile: the empty spacer fills the strip's last two cells. */
  .projects-page.inspecting .grid-spacer {
    grid-column:span 2;
  }

  .projects-page.inspecting .about-tile {
    padding:8px;
    font-size:.68rem;
    letter-spacing:-.025em;
  }

  .projects-page.inspecting .about-tile span:last-child {
    font-size:1rem;
  }

  /* Strip tiles are too small for a label; the selected ring and the panel heading name the project. */
  .projects-page.inspecting .project-tile .tile-label {
    display:none;
  }

  .projects-page.inspecting .inline-project-card {
    flex:1 1 0;
    height:auto;
    margin-top:10px;
  }

  .project-inspection-open .portfolio-contact {
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

.projects-page.revealing .work-grid>* {
  --grid-entry-y:18px;
  animation:grid-block-slide .72s cubic-bezier(.16,1,.3,1) both;
  animation-delay:.1s;
}

.projects-page.revealing .work-grid>*:nth-child(even) { --grid-entry-y:-12px; }
.projects-page.revealing .work-grid>*:nth-child(2) { animation-delay:.17s; }
.projects-page.revealing .work-grid>*:nth-child(3) { animation-delay:.24s; }
.projects-page.revealing .work-grid>*:nth-child(4) { animation-delay:.31s; }
.projects-page.revealing .work-grid>*:nth-child(5) { animation-delay:.38s; }
.projects-page.revealing .work-grid>*:nth-child(6) { animation-delay:.45s; }
.projects-page.revealing .work-grid>*:nth-child(7) { animation-delay:.52s; }
.projects-page.revealing .work-grid>*:nth-child(8) { animation-delay:.59s; }
.projects-page.revealing .work-grid>*:nth-child(9) { animation-delay:.66s; }

.projects-page.leaving .work-grid {
  pointer-events:none;
}

.projects-page.leaving .work-grid>* {
  --grid-entry-y:18px;
  animation:grid-block-slide-out .42s cubic-bezier(.7,0,.84,0) both;
  animation-delay:.35s;
}

.projects-page.leaving .work-grid>*:nth-child(even) { --grid-entry-y:-12px; }
.projects-page.leaving .work-grid>*:nth-child(2) { animation-delay:.31s; }
.projects-page.leaving .work-grid>*:nth-child(3) { animation-delay:.26s; }
.projects-page.leaving .work-grid>*:nth-child(4) { animation-delay:.22s; }
.projects-page.leaving .work-grid>*:nth-child(5) { animation-delay:.18s; }
.projects-page.leaving .work-grid>*:nth-child(6) { animation-delay:.13s; }
.projects-page.leaving .work-grid>*:nth-child(7) { animation-delay:.09s; }
.projects-page.leaving .work-grid>*:nth-child(8) { animation-delay:.04s; }
.projects-page.leaving .work-grid>*:nth-child(9) { animation-delay:0s; }

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

  .projects-page.revealing .work-grid>*,
  .projects-page.leaving .work-grid>*,
  .hero-intro .tagline-word,
  .hero-intro .hero-section-links {
    animation:none;
  }
}
</style>
