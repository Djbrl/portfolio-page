"""Builds the English and French CVs (two fixed A4 pages each) and prints them to PDF with headless Chrome.

  npm run cv                          # writes public/documents/djibril-sy-cv-en.pdf and djibril-sy-cv.pdf
  python3 scripts/cv/build.py --html  # only writes the HTML to scripts/cv/out/, to check the layout in a browser

Each page has a fixed height, so content that does not fit is cut off rather than flowing to a new
page: after editing, check that nothing on either page runs into the footer, and move projects
between pages with PAGE_ONE_PROJECTS if needed.
"""
import html
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT_DIR = HERE / 'out'
DOCUMENTS_DIR = HERE.parent.parent / 'public' / 'documents'
PDF_NAMES = {'en': 'djibril-sy-cv-en.pdf', 'fr': 'djibril-sy-cv.pdf'}
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

# Static Inter 400/700 instances of public/fonts/Inter-Variable.ttf. Chrome embeds a variable font
# as Type 3 glyphs; static instances embed as real TrueType. To regenerate them:
#   fonttools varLib.instancer public/fonts/Inter-Variable.ttf wght=400 opsz=14 --static -o scripts/cv/fonts/Inter-400.ttf
FONT_DIR = (HERE / 'fonts').as_uri()

CV = {
  'en': {
    'title': 'Djibril Sy - Software Developer Resume',
    'kicker': 'Software Developer — Full-stack, Web & Mobile',
    'tagline': 'Web, mobile & desktop applications', 'location': 'Remote',
    'summary': 'Software developer trained at 42 Paris and UVSQ. I build applications end to end, from architecture and APIs to user interfaces, integrations, deployments, and operations tooling. My experience spans client delivery, independent products, and remote collaboration with both technical and creative teams.',
    'footer': 'Resume 2026', 'page': 'Page', 'continued': '— continued',
    'sections': {
      'education': 'Education', 'skills': 'Technical skills', 'experience': 'Professional experience',
      'projects': 'Selected client projects & products', 'volunteering': 'Volunteering',
      'other': 'Other professional experience', 'languages': 'Languages',
    },
    'education': [
      ('42 Paris', 'Computer science curriculum (Common Core – Level 10)', '2022 – 2024'),
      ('42 Paris', 'Piscine (selection bootcamp), top 30 out of 900', 'March 2020'),
      ('ISTY (UVSQ)', 'Engineering program (cycle ingénieur), Computer Science', '2017 – 2019'),
      ('UVSQ', 'DUT (two-year technical degree) in Electrical Engineering & Industrial Computing', '2015 – 2017'),
      ('Cours Sainte Marie de Hann', 'French Baccalaureate, Science track', ''),
    ],
    'skills': [
      ('Languages', 'TypeScript, Python, PHP, Rust, Java, HTML/CSS, SQL, C, C++'),
      ('Frameworks', 'NestJS, Node.js/Express, FastAPI, Nuxt'),
      ('Frontend', 'Vue 3, React.js, Electron, Tailwind'),
      ('Data & delivery', 'Docker, Supabase, Vercel, GitHub/GitHub Actions, DigitalOcean/AWS, EAS, PostgreSQL'),
      ('AI', 'Claude API, Claude Code, Nemotron (vLLM on NVIDIA Brev), MCP'),
    ],
    'experience': [
      ('MINAPRO AI Executive Catalyst', 'Full-stack Developer', 'Remote', None, '2025 – 2026', [
        'Designed a bilingual, invitation-only onboarding flow driven by a deterministic state machine, built so every step is traceable.',
        'Built scheduling, session tracking, analytics, transactional emails, and admin dashboards.']),
      ('TousLesPros', 'Full-stack & Mobile Developer', None, 'touslespros.sn', '2026', [
        'Rebuilt a professional discovery portal from the ground up, with authentication, a directory, search, profiles, favorites, and ingestion of opportunity listings.',
        'Built the Expo iOS/Android app with offline caching, maps, social sign-in, secure sessions, push notifications, and EAS builds.']),
      ('GAINDÉ 2000', 'Software Developer Intern', None, None, '', [
        'Gained hands-on experience in a professional setting at GAINDÉ 2000 through a software development internship.']),
    ],
    'projects': [
      ('CyberLab', 'Built for Reporters Without Borders (RSF)', 'cyberlab.sine.sn', '2026 – present', [
        'Developed a cybersecurity awareness platform for designing and running email and SMS phishing simulations.',
        'Event and delivery tracking, admin/learner roles, training paths, and secure configuration of sending providers.']),
      ('Brainstorm', 'Live map of AI coding agents', 'brainstorm-landing.vercel.app', '2026', [
        '3rd place at the GOMYCODE × NVIDIA “Come Build with AI” 2026 hackathon. Built in one afternoon by directing a lead Claude Code agent and four subagents in parallel, then shipped as a Claude Code plugin.',
        'Follows Claude Code sessions live and maps the codebase they edit; Nemotron on an NVIDIA GPU summarizes every file (81k lines in 73 s for $0.02) and Claude answers questions about any step.']),
      ('TheQuestBoard', 'Commission aggregator for artists', 'thequestboard.co', '2023 – 2026', [
        'Centralized commission requests from 20+ forums, with user preferences and personalized alerts to help artists find clients.',
        'Containerized architecture with an API, scraping, PostgreSQL persistence, tests, and GitHub Actions CI.']),
      ('Multiprise', 'macOS application', 'multiprise.vercel.app', '2026', [
        'Built a multi-project launcher that detects services from their npm, pnpm, Yarn, Bun, Cargo, and Docker Compose manifests.',
        'Collision-free port management, process groups, cleaned-up logs, app previews in isolated web views, and a CLI and MCP server for coding agents.']),
      ('SkinDiff', 'Social lookbook for League of Legends', 'skindiff.lol', '2026', [
        'Shareable skin collections with public profiles, coordinated duo comparisons, and team compositions.',
        "Discord sign-in and a responsive web experience for organizing and showcasing players' collections."]),
      ('ft_irc', 'RFC 1459-compliant IRC server', None, '2023', [
        'Implemented an IRC server in C++ with channels, direct messages, non-blocking sockets, and concurrent client handling via poll().',
        'Modular object-oriented architecture and a test suite to ensure stability and compatibility across IRC clients.']),
    ],
    'volunteering': [
      ('Git Peer Class', 'Bilingual workshop at 42 Paris', None, '2022', [
        'Designed and led an open workshop, on campus and online, covering Git fundamentals, branching, merge conflicts, and collaborative contribution.']),
      ("Association l'Arche d'Isaac", 'Volunteer', None, 'March 2024', [
        "Took part in the association's activities and helped organize them."]),
    ],
    'other': [
      ('Illustration & concept art', 'Riot Games', 'Apr – May 2026'),
      ('Visual development', 'QuasiReal Publishing (freelance)', 'Nov 2023 – present'),
      ('Visual development', 'Skytale', 'Feb 2024 – Feb 2025'),
      ('Illustration & concept art', 'Azarel Games', 'Jul – Oct 2025'),
      ('Storyboarding', 'Wolfpack Games Studio', 'Feb – Jul 2025'),
    ],
    'languages': [('French', 'Fluent'), ('English', 'Fluent')],
  },
  'fr': {
    'title': 'Djibril Sy - CV Développeur logiciel',
    'kicker': 'Développeur logiciel — Full-stack, web & mobile',
    'tagline': 'Applications web, mobiles et desktop', 'location': 'Remote',
    'summary': "Développeur logiciel formé à 42 Paris et à l'UVSQ. Je conçois des applications de bout en bout, de l'architecture et des API jusqu'aux interfaces, intégrations, déploiements et outils d'exploitation. Mon expérience mêle livraison client, produits indépendants et collaboration à distance avec des équipes techniques et créatives.",
    'footer': 'CV 2026', 'page': 'Page', 'continued': '— suite',
    'sections': {
      'education': 'Formation', 'skills': 'Expertise technique', 'experience': 'Expérience professionnelle',
      'projects': 'Projets clients & produits', 'volunteering': 'Engagement bénévole',
      'other': 'Autres expériences professionnelles', 'languages': 'Langues',
    },
    'education': [
      ('42 Paris', 'Cursus informatique (tronc commun – niveau 10)', '2022 – 2024'),
      ('42 Paris', 'Piscine (sélection intensive), top 30 sur 900', 'Mars 2020'),
      ('ISTY (UVSQ)', 'Cycle ingénieur, Informatique', '2017 – 2019'),
      ('UVSQ', 'DUT Génie Électrique et Informatique Industrielle', '2015 – 2017'),
      ('Cours Sainte Marie de Hann', 'Baccalauréat scientifique', ''),
    ],
    'skills': [
      ('Langages', 'TypeScript, Python, PHP, Rust, Java, HTML/CSS, SQL, C, C++'),
      ('Frameworks', 'NestJS, Node.js/Express, FastAPI, Nuxt'),
      ('Frontend', 'Vue 3, React.js, Electron, Tailwind'),
      ('Données & livraison', 'Docker, Supabase, Vercel, GitHub/GitHub Actions, DigitalOcean/AWS, EAS, PostgreSQL'),
      ('IA', 'Claude API, Claude Code, Nemotron (vLLM sur NVIDIA Brev), MCP'),
    ],
    'experience': [
      ('MINAPRO AI Executive Catalyst', 'Développeur full-stack', 'Remote', None, '2025 – 2026', [
        "Conception d'un onboarding bilingue sur invitation, piloté par une machine à états déterministe et pensé pour rendre chaque étape traçable.",
        "Développement de la planification, du suivi des sessions, des analytics, des emails transactionnels et des tableaux de bord d'administration."]),
      ('TousLesPros', 'Développeur full-stack & mobile', None, 'touslespros.sn', '2026', [
        "Refonte complète d'un portail de découverte professionnelle avec authentification, annuaire, recherche, profils, favoris et ingestion de contenus d'opportunités.",
        "Création de l'application iOS/Android Expo avec cache hors ligne, cartes, authentification sociale, sessions sécurisées, notifications et builds EAS."]),
      ('GAINDÉ 2000', 'Stagiaire développeur', None, None, '', [
        "Expérience en environnement professionnel au sein de GAINDÉ 2000 dans le cadre d'un stage de développement logiciel."]),
    ],
    'projects': [
      ('CyberLab', 'Produit pour Reporters sans frontières (RSF)', 'cyberlab.sine.sn', '2026 – présent', [
        "Développement d'une plateforme de sensibilisation à la cybersécurité pour composer et piloter des simulations de phishing par email et SMS.",
        'Suivi des événements et des envois, rôles administrateur/apprenant, parcours de formation et configuration sécurisée des fournisseurs d’envoi.']),
      ('Brainstorm', 'Carte en direct des agents IA de code', 'brainstorm-landing.vercel.app', '2026', [
        "3e place du hackathon GOMYCODE × NVIDIA « Come Build with AI » 2026. Construit en un après-midi en dirigeant un agent Claude Code et quatre sous-agents en parallèle, puis publié en plugin Claude Code.",
        "Suit les sessions Claude Code en direct et cartographie le code ; Nemotron (GPU NVIDIA) résume chaque fichier, 81 000 lignes en 73 s pour 0,02 $, et Claude répond aux questions."]),
      ('TheQuestBoard', 'Agrégateur de commandes pour artistes', 'thequestboard.co', '2023 – 2026', [
        "Centralisation des demandes de commandes publiées sur plus de 20 forums, avec préférences utilisateur et alertes personnalisées pour aider les artistes à trouver des clients.",
        'Architecture conteneurisée avec API, scraping, persistance PostgreSQL, tests et intégration continue GitHub Actions.']),
      ('Multiprise', 'Application macOS open source', 'multiprise.vercel.app', '2026', [
        "Création d'un lanceur multi-projets qui détecte les services depuis leurs manifests npm, pnpm, Yarn, Bun, Cargo et Docker Compose.",
        'Gestion des ports sans collision, groupes de processus, logs nettoyés, prévisualisation dans des vues web isolées, et une CLI et un serveur MCP pour les agents de code.']),
      ('SkinDiff', 'Lookbook social League of Legends', 'skindiff.lol', '2026', [
        "Création de collections de skins partageables avec profils publics, comparaison de duos coordonnés et compositions d'équipe.",
        'Authentification Discord et expérience web responsive pour organiser et présenter les collections des joueurs.']),
      ('ft_irc', 'Serveur IRC conforme à la RFC 1459', None, '2023', [
        "Implémentation en C++ d'un serveur IRC avec canaux, messages directs, sockets non bloquants et gestion simultanée des clients par poll().",
        'Architecture objet modulaire et suite de tests pour assurer stabilité et compatibilité avec différents clients IRC.']),
    ],
    'volunteering': [
      ('Git Peer Class', 'Atelier bilingue à 42 Paris', None, '2022', [
        "Conception et animation d'un atelier ouvert, sur campus et en ligne, sur les bases de Git, les branches, les conflits et la contribution collaborative."]),
      ("Association l'Arche d'Isaac", 'Bénévole', None, 'Mars 2024', [
        "Participation bénévole aux activités de l'association et soutien à leur organisation."]),
    ],
    'other': [
      ('Illustration & concept art', 'Riot Games', 'Avr – Mai 2026'),
      ('Visual development', 'QuasiReal Publishing (freelance)', 'Nov 2023 – présent'),
      ('Visual development', 'Skytale', 'Fév 2024 – Fév 2025'),
      ('Illustration & concept art', 'Azarel Games', 'Juil – Oct 2025'),
      ('Storyboard', 'Wolfpack Games Studio', 'Fév – Juil 2025'),
    ],
    'languages': [('Français', 'Courant'), ('Anglais', 'Courant')],
  },
}

# How many projects fit on page 1; the rest continue at the top of page 2.
PAGE_ONE_PROJECTS = {'en': 4, 'fr': 4}

e = html.escape


def link(url):
  return f'<a href="https://{e(url)}">{e(url)}</a>'


def row(name, details, date):
  return f'<div class="row"><p><strong>{e(name)}</strong>{"<span class=sep>|</span>" + details if details else ""}</p><span class="date">{e(date)}</span></div>'


def entry(name, parts, date, bullets):
  details = '<span class="sep">|</span>'.join(parts)
  items = ''.join(f'<li>{e(b)}</li>' for b in bullets)
  return f'<div class="entry">{row(name, details, date)}<ul>{items}</ul></div>'


def section(title, body, extra=''):
  return f'<section><h2>{e(title)}{extra}</h2>{body}</section>'


def build(lang):
  c = CV[lang]
  s = c['sections']
  head = f'''<header>
    <p class="kicker">{e(c["kicker"])}</p>
    <h1>Djibril Sy</h1>
    <p class="tagline">{e(c["tagline"])}<span class="sep">|</span>{e(c["location"])}</p>
    <p class="links"><a href="mailto:sydjbrl@gmail.com">sydjbrl@gmail.com</a><span class="sep">|</span>{link("djibrilsy.com")}<span class="sep">|</span>{link("github.com/djbrl")}<span class="sep">|</span>{link("linkedin.com/in/djibril-sy")}</p>
  </header>
  <p class="summary">{e(c["summary"])}</p>'''
  education = ''.join(row(n, f'<span>{e(d)}</span>', y) for n, d, y in c['education'])
  skills = ''.join(row(n, f'<span>{e(d)}</span>', '') for n, d in c['skills'])
  experience = ''.join(entry(n, [f'<span class="muted">{e(r)}</span>'] + ([f'<span class="muted">{e(l)}</span>'] if l else []) + ([link(u)] if u else []), y, b) for n, r, l, u, y, b in c['experience'])
  def project(p):
    n, d, u, y, b = p
    return entry(n, [f'<span class="muted">{e(d)}</span>'] + ([link(u)] if u else []), y, b)
  projects = [project(p) for p in c['projects']]
  volunteering = ''.join(entry(n, [f'<span class="muted">{e(d)}</span>'], y, b) for n, d, _, y, b in c['volunteering'])
  other = ''.join(row(n, f'<span>{e(d)}</span>', y) for n, d, y in c['other'])
  languages = ''.join(row(n, f'<span>{e(d)}</span>', '') for n, d in c['languages'])

  split = PAGE_ONE_PROJECTS[lang]
  continued = section(s['projects'], ''.join(projects[split:]), f' <span class="cont">{e(c["continued"])}</span>') if projects[split:] else ''
  page1 = head + section(s['education'], education) + section(s['skills'], skills) + section(s['projects'], ''.join(projects[:split]))
  page2 = continued + section(s['experience'], experience) + section(s['volunteering'], volunteering) + section(s['other'], other) + section(s['languages'], languages)

  def footer(n):
    return f'<footer><span>Djibril Sy<span class="sep">|</span>{e(c["footer"])}</span><span class="pageno">{c["page"]} <strong>{n}</strong> / 2</span><span></span></footer>'

  return f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><title>{e(c["title"])}</title>
<style>
@font-face {{ font-family:Inter; src:url('{FONT_DIR}/Inter-400.ttf') format('truetype'); font-weight:400; }}
@font-face {{ font-family:Inter; src:url('{FONT_DIR}/Inter-700.ttf') format('truetype'); font-weight:700; }}
@page {{ size:A4; margin:0; }}
* {{ box-sizing:border-box; }}
html, body {{ margin:0; padding:0; }}
body {{ font-family:Inter, sans-serif; color:#1d1d1f; font-size:8.6pt; line-height:1.42; -webkit-print-color-adjust:exact; print-color-adjust:exact; }}
a {{ color:#2b4fd8; text-decoration:none; }}
.page {{ position:relative; width:210mm; height:297mm; padding:15.5mm 19.5mm 22mm; page-break-after:always; overflow:hidden; }}
.page:last-child {{ page-break-after:auto; }}
.kicker {{ margin:0 0 2pt; color:#2b4fd8; font-size:7.6pt; font-weight:700; letter-spacing:.02em; text-transform:uppercase; }}
h1 {{ margin:0; font-size:27pt; font-weight:700; letter-spacing:-.035em; line-height:1.08; }}
.tagline {{ margin:3pt 0 5pt; color:#6e6e73; font-size:11pt; }}
.links {{ margin:0; font-size:7.6pt; }}
.sep {{ display:inline-block; margin:0 6pt; color:#b8b8bd; font-weight:400; }}
.summary {{ margin:11pt 0 0; padding-top:10pt; border-top:.6pt solid #d9d9de; font-size:9pt; line-height:1.5; }}
section {{ margin-top:13pt; }}
h2 {{ margin:0 0 8pt; padding-bottom:5pt; border-bottom:.6pt solid #d9d9de; color:#2b4fd8; font-size:10.6pt; font-weight:700; letter-spacing:.005em; text-transform:uppercase; }}
h2 .cont {{ text-transform:uppercase; }}
.row {{ display:flex; justify-content:space-between; align-items:baseline; gap:12pt; margin:0 0 2.6pt; }}
.row p {{ margin:0; }}
.row strong {{ font-weight:700; }}
.muted {{ color:#6e6e73; }}
.date {{ flex:none; color:#6e6e73; font-size:7.6pt; }}
.entry {{ margin-bottom:6pt; }}
.entry ul {{ margin:1.5pt 0 0; padding-left:20pt; }}
.entry li {{ margin:0 0 2.4pt; padding-left:1pt; }}
footer {{ position:absolute; left:19.5mm; right:19.5mm; bottom:11mm; display:grid; grid-template-columns:1fr auto 1fr; color:#8e8e93; font-size:6.6pt; }}
footer .pageno strong {{ color:#1d1d1f; font-size:8pt; }}
</style></head>
<body>
<div class="page">{page1}{footer(1)}</div>
<div class="page">{page2}{footer(2)}</div>
</body></html>'''


if __name__ == '__main__':
  OUT_DIR.mkdir(exist_ok=True)
  for lang in ('en', 'fr'):
    page = OUT_DIR / f'cv-{lang}.html'
    page.write_text(build(lang))
    if '--html' in sys.argv:
      print(page)
      continue
    pdf = DOCUMENTS_DIR / PDF_NAMES[lang]
    subprocess.run([
      CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
      f'--print-to-pdf={pdf}', page.as_uri(),
    ], check=True, capture_output=True)
    print(pdf)
