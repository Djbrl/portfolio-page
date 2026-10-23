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
    # The masthead line, styled like the portfolio hero: (text, emphasised) pairs.
    'headline': [('Software developer', True), ('— products, platforms and AI tools.', False)],
    'summary': 'Trained at 42 Paris and UVSQ, I build applications end to end, from architecture and APIs to interfaces, integrations and deployment, for clients and for my own products, often remotely alongside technical and creative teams.',
    'footer': 'Resume 2026', 'page': 'Page', 'continued': '— continued',
    'sections': {
      'education': 'Education', 'skills': 'Stack & tools', 'experience': 'Professional experience',
      'hackathons': 'Hackathon wins', 'projects': 'Selected client projects & products', 'volunteering': 'Volunteering',
      'other': 'Other professional experience', 'languages': 'Languages',
    },
    'education': [
      ('42 Paris', 'Computer science curriculum (Common Core – Level 10)', '2022 – 2024'),
      ('42 Paris', 'Piscine (selection bootcamp, ~5% acceptance rate), top 30 out of 900', 'March 2020'),
      ('ISTY (UVSQ)', 'Engineering program (cycle ingénieur), Computer Science', '2017 – 2019'),
      ('UVSQ', 'DUT (two-year technical degree) in Electrical Engineering & Industrial Computing', '2015 – 2017'),
      ('Cours Sainte Marie de Hann', 'French Baccalaureate, Science track', ''),
    ],
    'skills': [
      ('Languages', 'C/C++, TypeScript, Python, PHP, Rust, Java, HTML/CSS, SQL'),
      ('Frameworks', 'NestJS, Node.js/Express, Nuxt'),
      ('Frontend', 'Vue 3, React.js, Electron, Tailwind'),
      ('Data & delivery', 'Docker, Supabase, Vercel, GitHub/GitHub Actions, DigitalOcean/AWS, EAS, PostgreSQL'),
      ('AI tools', 'Codex, Claude platform, open-weight models (Nemotron, Qwen) on NVIDIA Brev, Mobbin MCP'),
    ],
    'hackathons': [
      ('Galsen Dev Open Source × AI 2026', 'Finalist, Education & learning track, with Tandemcode', 'Oct 2026'),
      ('Code & Chain Dakar 2026 (Bitnob)', 'Bronze prize (3rd place), with BitBounty', 'Oct 2026'),
      ('GOMYCODE × NVIDIA 2026', '3rd place in Senegal, Real-World AI Impact Award, with Rundown', 'Sep 2026'),
    ],
    'experience': [
      ('MINAPRO AI Executive Catalyst', 'Full-stack Developer', 'Remote', None, '2025 – 2026', [
        'Built an AI-driven, adaptive onboarding platform for senior executives, with several tracks tailored to each participant.',
        'Analytics, admin dashboards and Gmail integration for the team running the program.']),
      ('TousLesPros', 'Full-stack & Mobile Developer', None, 'touslespros.sn', '2026', [
        'Rebuilt a professional discovery portal from the ground up, with authentication, a directory, search, profiles, favorites, and ingestion of opportunity listings.',
        'Built the Expo iOS/Android app with offline caching, maps, social sign-in, secure sessions, push notifications, and EAS builds.']),
      ('GAINDÉ 2000', 'Software Developer Intern', None, None, '', [
        'Gained hands-on experience in a professional setting at GAINDÉ 2000 through a software development internship.']),
    ],
    'projects': [
      ('Tandemcode', 'Highly interactive, open-source agent orchestrator', 'tandemcode-app.vercel.app', '2026', [
        'Work with your agents without interrupting them: your code as a map, and a Scratchpad to annotate screenshots, ask questions and take notes.',
        'Tandem mode, for learning and exploring the decisions and constraints behind a problem.',
        'Ships with its own agent and also runs others like Claude Code; plug in any model, from Claude to open-weight models.']),
      ('CyberLab', 'Built for Reporters Without Borders (RSF)', 'cyberlab.sine.sn', '2026 – present', [
        'Developed a cybersecurity awareness platform for designing and running email and SMS phishing simulations.',
        'Detailed campaign tracking, a training-module builder, transferable admin and learner roles, and secure sending through your own providers and custom domains.']),
      ('Rundown (ex-Brainstorm)', 'Live map of AI coding agents', 'rundown-dev.vercel.app', '2026', [
        'Built in one afternoon with a lead Claude Code agent and four subagents, then shipped as a Claude Code plugin.',
        'Follows Claude Code sessions live and maps the codebase they edit; Nemotron on an NVIDIA GPU summarizes every file (81k lines in 73 s for $0.02).']),
      ('BitBounty', 'Bitcoin fintech: paid bounties on GitHub issues', 'bitbounty-app.vercel.app', '2026', [
        'Captained a team of four over 24 hours, coordinating 80+ issues and pull requests and contributing over half of them.',
        'Maintainers fund bounties over Lightning through Bitnob; developers are paid in sats as soon as their fix is merged.']),
      ('TheQuestBoard', 'Where artists find paid commissions', 'thequestboard.co', '2023 – 2026', [
        'Brings commission requests from 20+ forums into one searchable board, so artists find clients without checking every site.',
        'Personalized Discord alerts for new requests; running since 2023 on scrapers, an API and PostgreSQL.']),
      ('Multiprise', 'Control center for development servers, on macOS', 'multiprise.vercel.app', '2026', [
        'Run all your development servers from one window: it finds what each project can start, gives every service a port that never clashes, and keeps logs and previews side by side.',
        'Coding agents use it too, through a CLI and an MCP server, so they reuse running services instead of starting duplicates.']),
      ('SkinDiff', 'Social lookbook for League of Legends', 'skindiff.lol', '2026', [
        'Players bring their skin collections and compare them with friends to find matching looks for duos and five-player teams.',
        'A line finder shows which skin series a group of champions share; public profiles with Discord sign-in.']),
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
    'headline': [('Développeur logiciel', True), ('— produits, plateformes et outils IA.', False)],
    'summary': "Formé à 42 Paris et à l'UVSQ, je conçois des applications de bout en bout, de l'architecture et des API jusqu'aux interfaces, intégrations et déploiements, pour des clients comme pour mes propres produits, souvent à distance avec des équipes techniques et créatives.",
    'footer': 'CV 2026', 'page': 'Page', 'continued': '— suite',
    'sections': {
      'education': 'Formation', 'skills': 'Stack & outils', 'experience': 'Expérience professionnelle',
      'hackathons': 'Victoires en hackathons', 'projects': 'Projets clients & produits', 'volunteering': 'Engagement bénévole',
      'other': 'Autres expériences professionnelles', 'languages': 'Langues',
    },
    'education': [
      ('42 Paris', 'Cursus informatique (tronc commun – niveau 10)', '2022 – 2024'),
      ('42 Paris', 'Piscine (taux d’admission ~5 %), top 30 sur 900', 'Mars 2020'),
      ('ISTY (UVSQ)', 'Cycle ingénieur, Informatique', '2017 – 2019'),
      ('UVSQ', 'DUT Génie Électrique et Informatique Industrielle', '2015 – 2017'),
      ('Cours Sainte Marie de Hann', 'Baccalauréat scientifique', ''),
    ],
    'skills': [
      ('Langages', 'C/C++, TypeScript, Python, PHP, Rust, Java, HTML/CSS, SQL'),
      ('Frameworks', 'NestJS, Node.js/Express, Nuxt'),
      ('Frontend', 'Vue 3, React.js, Electron, Tailwind'),
      ('Données & livraison', 'Docker, Supabase, Vercel, GitHub/GitHub Actions, DigitalOcean/AWS, EAS, PostgreSQL'),
      ('Outils IA', 'Codex, plateforme Claude, modèles open-weight sur NVIDIA Brev, MCP Mobbin'),
    ],
    'hackathons': [
      ('Galsen Dev Open Source × AI 2026', 'Finaliste, piste Éducation & apprentissage, avec Tandemcode', 'Oct 2026'),
      ('Code & Chain Dakar 2026 (Bitnob)', 'Prix de bronze (3e place), avec BitBounty', 'Oct 2026'),
      ('GOMYCODE × NVIDIA 2026', '3e place au Sénégal, prix Real-World AI Impact, avec Rundown', 'Sept 2026'),
    ],
    'experience': [
      ('MINAPRO AI Executive Catalyst', 'Développeur full-stack', 'Remote', None, '2025 – 2026', [
        "Création d'une plateforme d'onboarding adaptative, pilotée par l'IA, pour des dirigeants de haut niveau, avec plusieurs parcours adaptés à chaque participant.",
        "Analytics, tableaux de bord d'administration et intégration Gmail pour l'équipe qui anime le programme."]),
      ('TousLesPros', 'Développeur full-stack & mobile', None, 'touslespros.sn', '2026', [
        "Refonte complète d'un portail de découverte professionnelle avec authentification, annuaire, recherche, profils, favoris et ingestion de contenus d'opportunités.",
        "Création de l'application iOS/Android Expo avec cache hors ligne, cartes, authentification sociale, sessions sécurisées, notifications et builds EAS."]),
      ('GAINDÉ 2000', 'Stagiaire développeur', None, None, '', [
        "Expérience en environnement professionnel au sein de GAINDÉ 2000 dans le cadre d'un stage de développement logiciel."]),
    ],
    'projects': [
      ('Tandemcode', "Orchestrateur d'agents open source, hautement interactif", 'tandemcode-app.vercel.app', '2026', [
        "Interagir avec ses agents sans les interrompre : le code vu comme une carte, le Brouillon pour annoter des captures, poser des questions et prendre des notes.",
        "Le mode Tandem, pour apprendre et explorer les décisions et contraintes d'un problème.",
        "Livré avec son propre agent, il fait aussi tourner d'autres agents comme Claude Code ; n'importe quel modèle, de Claude aux modèles open-weight."]),
      ('CyberLab', 'Produit pour Reporters sans frontières (RSF)', 'cyberlab.sine.sn', '2026 – présent', [
        "Développement d'une plateforme de sensibilisation à la cybersécurité pour composer et piloter des simulations de phishing par email et SMS.",
        "Suivi détaillé des campagnes, création de modules de formation, rôles administrateur et apprenant transférables, et envois sécurisés via ses propres fournisseurs et domaines personnalisés."]),
      ('Rundown (ex-Brainstorm)', 'Carte en direct des agents IA de code', 'rundown-dev.vercel.app', '2026', [
        "Construit en un après-midi avec un agent Claude Code et quatre sous-agents, puis publié en plugin Claude Code.",
        "Suit les sessions Claude Code en direct ; Nemotron (GPU NVIDIA) résume 81 000 lignes en 73 s pour 0,02 $."]),
      ('BitBounty', 'Fintech Bitcoin : des primes sur les issues GitHub', 'bitbounty-app.vercel.app', '2026', [
        "Capitaine d'une équipe de quatre en 24 heures : coordination de plus de 80 issues et pull requests, dont plus de la moitié à mon actif.",
        "Les mainteneurs financent les primes via Lightning et Bitnob ; les développeurs sont payés en sats dès que leur correctif est fusionné."]),
      ('TheQuestBoard', 'Là où les artistes trouvent des commandes', 'thequestboard.co', '2023 – 2026', [
        "Réunit les demandes de commandes de plus de 20 forums en un seul tableau, pour trouver des clients sans parcourir chaque site.",
        "Alertes Discord personnalisées ; en ligne depuis 2023, avec scrapers, API et PostgreSQL."]),
      ('Multiprise', 'Centre de contrôle des serveurs de développement, sur macOS', 'multiprise.vercel.app', '2026', [
        "Lance tous vos serveurs de développement depuis une fenêtre : il trouve ce que chaque projet peut démarrer, attribue des ports sans conflit et réunit logs et aperçus.",
        "Les agents de code s'en servent aussi, via une CLI et un serveur MCP, pour réutiliser les services lancés au lieu d'en démarrer des doublons."]),
      ('SkinDiff', 'Lookbook social League of Legends', 'skindiff.lol', '2026', [
        "Les joueurs comparent leurs collections de skins avec leurs amis pour trouver des looks assortis, à deux ou à cinq.",
        "Une recherche de gammes montre les séries de skins communes à un groupe de champions ; profils publics avec connexion Discord."]),
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
  headline = ' '.join(f'<strong>{e(t)}</strong>' if strong else e(t) for t, strong in c['headline'])
  head = f'''<header>
    <div class="masthead">
      <h1>Djibril Sy</h1>
      <p class="links"><a href="mailto:sydjbrl@gmail.com">sydjbrl@gmail.com</a><span class="sep">|</span>{link("djibrilsy.com")}<span class="sep">|</span>{link("github.com/djbrl")}<span class="sep">|</span>{link("linkedin.com/in/djibril-sy")}</p>
    </div>
    <p class="headline">{headline}</p>
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
  hackathons = ''.join(row(n, f'<span>{e(d)}</span>', y) for n, d, y in c['hackathons'])

  split = PAGE_ONE_PROJECTS[lang]
  continued = section(s['projects'], ''.join(projects[split:]), f' <span class="cont">{e(c["continued"])}</span>') if projects[split:] else ''
  page1 = head + section(s['education'], education) + section(s['skills'], skills) + section(s['hackathons'], hackathons) + section(s['projects'], ''.join(projects[:split]))
  page2 = continued + section(s['experience'], experience) + section(s['volunteering'], volunteering) + section(s['other'], other) + section(s['languages'], languages)

  def footer(n):
    return f'<footer><span>Djibril Sy<span class="sep">|</span>{e(c["footer"])}</span><span class="pageno">{c["page"]} <strong>{n}</strong> / 2</span><span></span></footer>'

  return f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><title>{e(c["title"])}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700&family=Plus+Jakarta+Sans:wght@700;800&display=block');
@font-face {{ font-family:Inter; src:url('{FONT_DIR}/Inter-400.ttf') format('truetype'); font-weight:400; }}
@font-face {{ font-family:Inter; src:url('{FONT_DIR}/Inter-700.ttf') format('truetype'); font-weight:700; }}
@page {{ size:A4; margin:0; }}
* {{ box-sizing:border-box; }}
html, body {{ margin:0; padding:0; }}
body {{ font-family:'DM Sans', Inter, sans-serif; color:#1d1d1f; font-size:8.6pt; line-height:1.42; -webkit-print-color-adjust:exact; print-color-adjust:exact; }}
a {{ color:#2b4fd8; text-decoration:none; }}
.page {{ position:relative; width:210mm; height:297mm; padding:15.5mm 19.5mm 22mm; page-break-after:always; overflow:hidden; }}
.page:last-child {{ page-break-after:auto; }}
h1, h2, .headline {{ font-family:'Plus Jakarta Sans', Inter, sans-serif; }}
.masthead {{ display:flex; justify-content:space-between; align-items:baseline; gap:12pt; padding-bottom:7pt; border-bottom:1.4pt solid #1d1d1f; }}
h1 {{ margin:0; font-size:15pt; font-weight:800; letter-spacing:-.03em; line-height:1; }}
.links {{ margin:0; font-size:7.6pt; }}
.links .sep {{ margin:0 4pt; }}
/* Like the portfolio hero: a large line in grey with the key words in ink. */
.headline {{ margin:14pt 0 0; color:#8e8e93; font-size:17pt; font-weight:800; letter-spacing:-.035em; line-height:1.1; text-wrap:balance; }}
.headline strong {{ color:#1d1d1f; font-weight:inherit; }}
.sep {{ display:inline-block; margin:0 6pt; color:#b8b8bd; font-weight:400; }}
.summary {{ margin:10pt 0 0; font-size:9pt; line-height:1.5; }}
section {{ margin-top:13pt; }}
h2 {{ margin:0 0 8pt; padding-bottom:5pt; border-bottom:.6pt solid #d9d9de; color:#2b4fd8; font-size:11pt; font-weight:700; letter-spacing:-.01em; }}
h2 .cont {{ font-weight:400; color:#8e8e93; }}
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
      '--virtual-time-budget=10000', f'--print-to-pdf={pdf}', page.as_uri(),
    ], check=True, capture_output=True)
    print(pdf)
