/*
 * Renders the static service pages into /public.
 *
 * Why they exist: the site is a single-route React app, and one route cannot
 * rank for "laravel developer", "shopify developer" and "mern stack developer"
 * at the same time — each search wants its own page with its own title, copy
 * and schema. These pages are plain HTML so they need no JavaScript to be read
 * by a crawler, and they link back into the app.
 *
 * Run: npm run seo:pages   (then commit the generated public/*.html)
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES, SITE, PERSON } from "./seo-pages.data.mjs";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Strips the inline markup the copy uses so the same sentence can go into a
   JSON-LD string, where tags are not allowed. Google drops FAQ markup whose
   text does not match what the visitor reads, so both come from one source. */
const plain = (html) =>
  String(html)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function renderNav(currentSlug) {
  return PAGES.filter((page) => page.slug !== currentSlug)
    .map((page) => `<li><a href="/${page.slug}">${esc(page.navLabel)}</a></li>`)
    .join("\n      ");
}

function renderProof(projects) {
  if (!projects || !projects.length) return "";

  const cards = projects
    .map(
      (project) => `<li><a class="card" href="${esc(project.url)}" target="_blank" rel="noopener noreferrer">
      <strong>${esc(project.name)}</strong>
      <span>${project.note}</span>
      <span class="stack">${esc(project.stack)}</span>
    </a></li>`,
    )
    .join("\n    ");

  return `<h2>Live work you can open right now</h2>
  <p>Screenshots prove nothing. These are production sites, so open them and check the source yourself.</p>
  <ul class="cards">
    ${cards}
  </ul>`;
}

function renderFaq(faqs) {
  return faqs
    .map(
      (faq) => `<details>
      <summary>${esc(faq.q)}</summary>
      <p>${faq.a}</p>
    </details>`,
    )
    .join("\n    ");
}

function schema(page) {
  const url = `${SITE.origin}/${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE.origin}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: SITE.lastmod,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.origin}/` },
          { "@type": "ListItem", position: 2, name: page.breadcrumb, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.serviceName,
        serviceType: page.serviceType,
        description: page.description,
        url,
        provider: { "@id": `${SITE.origin}/#person` },
        areaServed: [
          { "@type": "City", name: "Karachi" },
          { "@type": "Country", name: "Pakistan" },
          { "@type": "Place", name: "Remote worldwide" },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: url,
          servicePhone: PERSON.telephone,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: plain(faq.a) },
        })),
      },
    ],
  };
}

function render(page) {
  const url = `${SITE.origin}/${page.slug}`;
  const sections = page.sections
    .map((section) => `<h2>${esc(section.h2)}</h2>\n  ${section.body}`)
    .join("\n\n  ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}" />
<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="en" href="${url}" />
<link rel="alternate" hreflang="x-default" href="${url}" />
<meta name="author" content="${esc(PERSON.name)}" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
<meta name="keywords" content="${esc(page.keywords)}" />
<meta name="theme-color" content="#00020f" />

<meta name="geo.region" content="PK-SD" />
<meta name="geo.placename" content="Karachi, Sindh, Pakistan" />
<meta name="geo.position" content="24.8607;67.0011" />
<meta name="ICBM" content="24.8607, 67.0011" />

<link rel="icon" href="/favicon.ico?v=2" sizes="any" />
<link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />

<meta property="og:type" content="website" />
<meta property="og:site_name" content="${esc(PERSON.name)}" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${esc(page.title)}" />
<meta property="og:description" content="${esc(page.description)}" />
<meta property="og:image" content="${SITE.origin}/muhammad-wasif-full-stack-developer-og.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(page.title)}" />
<meta name="twitter:description" content="${esc(page.description)}" />
<meta name="twitter:image" content="${SITE.origin}/muhammad-wasif-full-stack-developer-og.jpg" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/seo.css" />

<script type="application/ld+json">
${JSON.stringify(schema(page), null, 2)}
</script>
</head>
<body>
<a class="skip" href="#content">Skip to content</a>

<header class="topbar">
  <div class="shell topbarRow">
    <a class="brand" href="/">${esc(PERSON.name)} <small>Full Stack Developer</small></a>
    <a class="cta" href="${SITE.whatsapp}" target="_blank" rel="noopener noreferrer">Start a project</a>
  </div>
</header>

<main id="content" class="shell">
  <nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a> <span aria-hidden="true">/</span> ${esc(page.breadcrumb)}
  </nav>

  <h1>${page.h1}</h1>
  <p class="lede">${page.lede}</p>
  <ul class="meta">
    ${page.chips.map((chip) => `<li>${esc(chip)}</li>`).join("\n    ")}
  </ul>

  ${sections}

  ${renderProof(page.proof)}

  <h2>Frequently asked questions</h2>
  <div class="faq">
    ${renderFaq(page.faqs)}
  </div>

  <section class="closer">
    <h2>${esc(page.closerTitle)}</h2>
    <p>${page.closerBody}</p>
    <div class="closerActions">
      <a class="cta cta--solid" href="${SITE.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${esc(PERSON.phoneDisplay)}</a>
      <a class="cta" href="mailto:${esc(PERSON.email)}">${esc(PERSON.email)}</a>
      <a class="cta" href="/#projects">See all projects</a>
    </div>
  </section>
</main>

<footer class="siteFooter">
  <div class="shell">
    <ul class="footerLinks">
      <li><a href="/">Home</a></li>
      ${renderNav(page.slug)}
    </ul>
    <p>&copy; ${SITE.year} ${esc(PERSON.name)} (${esc(PERSON.alternateName)}) &middot; Full stack developer in Karachi, Pakistan &middot; <a href="${esc(PERSON.github)}" rel="noopener noreferrer">GitHub</a> &middot; <a href="${esc(PERSON.linkedin)}" rel="noopener noreferrer">LinkedIn</a></p>
  </div>
</footer>
</body>
</html>
`;
}

let written = 0;
for (const page of PAGES) {
  writeFileSync(join(publicDir, `${page.slug}.html`), render(page), "utf8");
  written += 1;
  console.log(`  public/${page.slug}.html`);
}
console.log(`\n${written} service pages written.`);
