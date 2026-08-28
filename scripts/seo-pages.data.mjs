/*
 * Copy and metadata for the static service pages. One entry = one page = one
 * search intent. Keep the copy specific and true: every project named here is
 * live and its stack is the one recorded in src/components/ProjectsSection.jsx.
 *
 * `body`, `lede`, `a` and `closerBody` accept inline HTML. Anything that goes
 * into JSON-LD is stripped of tags by the renderer.
 */

export const SITE = {
  origin: "https://www.wasifmajeed.com",
  whatsapp:
    "https://wa.me/923013769247?text=Hi%20Wasif%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  lastmod: "2026-08-25",
  year: new Date().getFullYear(),
};

export const PERSON = {
  name: "Muhammad Wasif",
  alternateName: "Wasif Majeed",
  email: "info@wasifmajeed.com",
  phoneDisplay: "+92 301 3769247",
  telephone: "+92-301-3769247",
  github: "https://github.com/mwasif666",
  linkedin: "https://www.linkedin.com/in/muhammad-wasif-944741202",
};

/* Shared project pool — the stacks match what is verified on the portfolio. */
const P = {
  hierys: {
    name: "Hierys",
    url: "https://hierys.com/",
    stack: "React · Vite · Tailwind · GSAP ScrollTrigger",
    note: "A multi-service agency site where the range had to feel focused rather than scattered. Scroll-driven, component-built, fast.",
  },
  econetix: {
    name: "Econetix",
    url: "https://econetix.net/",
    stack: "WordPress · Elementor · ACF · GSAP · Three.js",
    note: "WordPress carrying real motion work: Three.js and GSAP on top of a CMS the client edits without touching code.",
  },
  offplan: {
    name: "Offplan DXB",
    url: "https://offplandxb.ae/",
    stack: "Laravel · PHP · MySQL · JavaScript",
    note: "A Dubai property portal on Laravel and MySQL: listings, filtering and lead capture running against a real database.",
  },
  hopePlants: {
    name: "Hope Plants Dubai",
    url: "https://hopeplantsdubai.com/",
    stack: "Laravel · PHP · MySQL · JavaScript",
    note: "Laravel application for a Dubai plant supplier, with catalogue content managed from an admin side rather than hard-coded.",
  },
  mindreach: {
    name: "MindReach",
    url: "https://mindreach.us/",
    stack: "React · Laravel · PHP · Bootstrap",
    note: "React on the front, Laravel on the back. The pattern for a marketing surface that needs a serious admin behind it.",
  },
  innerBeast: {
    name: "Inner Beast",
    url: "https://innerbeast.co.uk/",
    stack: "Next.js · MongoDB · Express.js · Node.js",
    note: "A UK brand on Next.js with a Node, Express and MongoDB backend. The MERN pattern, server-rendered for search.",
  },
  frontineers: {
    name: "Frontineers",
    url: "https://frontineers.com/",
    stack: "Shopify · Liquid · Horizon theme · Shopify Markets",
    note: "A handcrafted leather brand, jackets, bags, boots and knives, on a customised Horizon theme, selling in EUR across English and German storefronts.",
  },
  hunza: {
    name: "Hunza Dry Fruits Basket",
    url: "https://hunzadryfruitsbasket.com/",
    stack: "Shopify · Liquid · Dawn theme · Judge.me",
    note: "Premium dry fruits from the Hunza valley on a customised Dawn theme, with Judge.me reviews and a WhatsApp order route customers here actually use.",
  },
  bridge: {
    name: "Bridge Precision Tools",
    url: "https://bridgeprecisiontools.com/",
    stack: "WordPress · WooCommerce · Elementor Pro",
    note: "A precision tooling catalogue on WooCommerce, built with Elementor Pro over the Hello Elementor parent theme, with Google Tag Manager on the funnel.",
  },
  vampire: {
    name: "Vampire Tools",
    url: "https://vampiretools.com/",
    stack: "WordPress · WooCommerce · Google Tag Manager",
    note: "A WooCommerce storefront for specialist tools: product pages, cart, checkout and frequently-bought-together upsells.",
  },
  abet: {
    name: "ABET Global",
    url: "https://abetglobal.com/",
    stack: "React · JavaScript · ASP.NET · Bootstrap",
    note: "React front end sitting on an existing ASP.NET backend: proof that new interfaces do not require rebuilding the server.",
  },
  peco: {
    name: "PECO Engineering",
    url: "https://pecoengg.com/",
    stack: "React · JavaScript · CSS3",
    note: "Corporate engineering site built in React components, so the content sections stay consistent as pages are added.",
  },
  petroc: {
    name: "Petroc Energy",
    url: "https://petrocenergy.com/",
    stack: "HTML5 · CSS3 · JavaScript · Formspree",
    note: "Hand-written HTML, CSS and JavaScript. No framework, no CMS overhead. It loads because there is nothing to load.",
  },
  pinnacle: {
    name: "Pinnacle Design Agency",
    url: "https://www.pinnacledesignagency.com/",
    stack: "HTML5 · CSS3 · JavaScript · tawk.to",
    note: "Design agency site with live chat wired in, built straight in markup and styles for full control of the layout.",
  },
  badaruddin: {
    name: "Badaruddin",
    url: "https://badaruddin.net/",
    stack: "HTML · CSS · JavaScript · Bootstrap",
    note: "A clean business site on Bootstrap: responsive from the first breakpoint, quick to extend, cheap to host.",
  },
};

export const PAGES = [
  {
    slug: "front-end-developer-karachi",
    navLabel: "Front-End Developer in Karachi",
    breadcrumb: "Front-End Developer in Karachi",
    title: "Senior Front-End Developer in Karachi | Muhammad Wasif",
    description:
      "Senior front-end developer in Karachi with 4+ years in React, Next.js, TypeScript, HTML and CSS. Interfaces built to stay fast, accessible and maintainable.",
    keywords:
      "senior front end developer Karachi, front end developer Karachi, frontend developer Pakistan, react developer Karachi, html css javascript developer, hire front end developer, UI developer Karachi",
    serviceName: "Front-end web development",
    serviceType: "Front-end web development",
    h1: "Senior <em>front-end</em> developer in Karachi",
    lede:
      "I am <strong>Muhammad Wasif</strong>, also known as Wasif Majeed. Four-plus years and 60+ delivered websites, and nearly all of that depth sits in one place: <strong>the interface</strong>. HTML, CSS, JavaScript and TypeScript, built into React and Next.js components that stay fast on a mid-range phone and readable a year after launch.",
    chips: ["4+ years front end", "React · Next.js · TypeScript", "HTML5 · CSS3 · JavaScript", "Accessibility", "Core Web Vitals"],
    sections: [
      {
        h2: "What senior actually means here",
        body: `<p>Anyone can put a design on screen once. The difference shows up six months later, when someone has to change it. What I am paid for:</p>
  <ul class="bullets">
    <li><strong>Components with one job.</strong> A card renders a card. It does not also fetch, sort and decide what a card is.</li>
    <li><strong>Layouts that hold under real content.</strong> Designs are tested with the long product name and the three-line heading, not the tidy placeholder.</li>
    <li><strong>Loading, empty and error states built with the happy path</strong>: the three screens most projects discover only after a client does.</li>
    <li><strong>State kept where it is used.</strong> Global stores are for genuinely global things, not for whatever was inconvenient to pass down.</li>
    <li><strong>Semantic HTML.</strong> Real buttons, real headings, real labels. The same work that makes a page accessible is what makes it legible to search engines.</li>
  </ul>`,
      },
      {
        h2: "The stack I work in daily",
        body: `<p><strong>React</strong> is where the most hours are. <strong>Next.js</strong> when pages need to be server-rendered so they load fast and can actually be crawled. <strong>TypeScript</strong> where the data is complex enough to earn the build step, and plain JavaScript where it is not, because a five-page marketing site does not need a type system.</p>
  <p>Styling in <strong>Tailwind</strong>, <strong>CSS Modules</strong>, <strong>Sass</strong> or hand-written CSS, depending on what the team maintaining it will be comfortable with. <strong>Bootstrap</strong> when a project wants a dependable grid and nothing exotic. GSAP and scroll-driven motion when the design calls for it. This portfolio is that, and it still holds its Core Web Vitals.</p>`,
      },
      {
        h2: "Speed and accessibility are the work, not extras",
        body: `<p>Most of your visitors arrive on a phone, on a connection that is not yours, holding it one-handed. So the same checklist runs on every build: image formats and sizing, font loading strategy, what is genuinely in the JavaScript bundle, layout shift from anything that arrives late, and how long the main thread is busy before the page responds to a tap.</p>
  <p>Accessibility gets the same treatment: focus that goes where you expect, contrast that survives sunlight, controls reachable by keyboard, and headings that describe the page instead of just being large. It is not a compliance chore. It is the same discipline that makes an interface feel solid.</p>`,
      },
      {
        h2: "Where I stop and say so",
        body: `<p>Front end is the senior craft. On the backend I have shipped production work: Laravel with MySQL behind Offplan DXB and Hope Plants Dubai, a Node, Express and MongoDB stack behind Inner Beast, and I keep building depth there. But I am not going to sell you senior-level backend experience I do not yet have.</p>
  <p>In practice that means: for most business sites, stores and marketing platforms, I can take the whole thing end to end. For something with heavy data modelling, serious scale or security exposure, I will tell you it needs a backend specialist and either bring one in or hand that piece over. You will hear that at the quote stage, not three weeks in.</p>`,
      },
    ],
    proof: [P.hierys, P.abet, P.peco, P.bridge, P.frontineers],
    faqs: [
      {
        q: "What does a front-end developer do?",
        a: "Builds everything the visitor sees and interacts with, layout, typography, navigation, forms, animation, responsive behaviour, and makes it work across browsers, screen sizes and input methods. On a modern project that also means component architecture, performance budgets and accessibility, not just turning a design into HTML.",
      },
      {
        q: "Can you build from a Figma design?",
        a: "Yes. Figma, XD, a PDF, or a live site you want rebuilt. I will also flag anything in the design that will not survive real content or a 360px screen before building it, which is cheaper than finding out afterwards.",
      },
      {
        q: "Do you use React for every project?",
        a: "No, and that matters. React and Next.js earn their complexity on component-heavy or content-driven products. A brochure site is often better as clean HTML, CSS and JavaScript. It loads faster and costs less to build and host. Picking the lightest tool that does the job is part of the work.",
      },
      {
        q: "Can you make my existing site faster?",
        a: "Usually, and often significantly. An audit covers bundle size, image handling, font loading, layout shift and third-party scripts, and comes back with specific fixes ranked by what will actually move. Not a Lighthouse screenshot with no plan attached.",
      },
      {
        q: "Do you handle the backend too?",
        a: "I ship it, and I am honest about the level. Laravel with MySQL and Node with MongoDB are both in production on delivered projects. Front end is where the seniority is; for a demanding backend I will say so upfront and we bring in a specialist rather than me learning on your budget.",
      },
    ],
    closerTitle: "Need an interface built properly?",
    closerBody:
      "Send the design, the repository, or just the idea. You get a straight read on scope, the right approach and a fixed quote, including when a simpler build would serve you better.",
  },
];

PAGES.push({
  slug: "mern-stack-developer-karachi",
  navLabel: "MERN Stack Developer",
  breadcrumb: "MERN Stack Developer",
  title: "MERN Stack Developer in Karachi | MongoDB, Express, React, Node",
  description:
    "MERN stack developer in Karachi building MongoDB, Express.js, React and Node.js applications: dashboards, admin panels, authentication and REST APIs.",
  keywords:
    "MERN stack developer, MERN stack developer Karachi, MongoDB Express React Node developer, hire MERN developer Pakistan, React Node.js developer Karachi, MERN dashboard development",
  serviceName: "MERN stack development",
  serviceType: "MERN stack application development",
  h1: "<em>MERN stack</em> developer in Karachi",
  lede:
    "MongoDB, Express.js, React and Node.js: one language from the database query to the button click. I use the MERN stack for products that have <strong>users, roles and data</strong>, not just pages: dashboards, admin panels, booking flows and anything where the interface changes depending on who is logged in.",
  chips: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs · JWT auth"],
  sections: [
    {
      h2: "When MERN is the right call",
      body: `<p>The MERN stack earns its place when a project stops being a brochure and starts being software. Signals that it is the right fit:</p>
  <ul class="bullets">
    <li>People log in, and what they see depends on their role.</li>
    <li>Data changes constantly, orders, bookings, submissions, messages, and needs to be queried, not just displayed.</li>
    <li>You want an admin panel your team runs the business from, rather than emailing a developer for every change.</li>
    <li>A mobile app or a second front end will eventually consume the same API.</li>
    <li>The data shape is still moving, and MongoDB's flexible documents beat a rigid schema you would be migrating monthly.</li>
  </ul>
  <p>If none of that applies and you mainly need pages that rank, say so. A Next.js site or a WordPress build will cost you less and serve you better. I will tell you that rather than sell you an application.</p>`,
    },
    {
      h2: "What gets built on each layer",
      body: `<p><strong>MongoDB.</strong> Schema designed up front with Mongoose models, indexes on the fields you actually query, and validation at the model level so bad data never reaches the collection.</p>
  <p><strong>Express.js.</strong> REST APIs with consistent response shapes, proper status codes, input validation, rate limiting on anything public, and error handling that returns something useful instead of a stack trace.</p>
  <p><strong>React.</strong> Component-driven interfaces with real loading, empty and error states: the three screens most projects forget until a client finds them. State kept where it belongs rather than dumped in one global store.</p>
  <p><strong>Node.js.</strong> Authentication with JWT or sessions, password hashing done correctly, role-based access checked on the server rather than hidden in the UI, plus background jobs and email where a flow needs them.</p>`,
    },
    {
      h2: "Next.js on top when search matters",
      body: `<p>A plain React single-page app ships an empty HTML document and fills it in with JavaScript. That is fine behind a login, and a problem when the pages need to rank.</p>
  <p>So for anything public-facing I put Next.js in front of the same Node and MongoDB backend: server-rendered HTML for crawlers and first paint, React behaviour after hydration. <a href="https://innerbeast.co.uk/" target="_blank" rel="noopener noreferrer">Inner Beast</a> runs exactly this arrangement.</p>`,
    },
  ],
  proof: [P.innerBeast, P.abet, P.peco, P.hierys],
  faqs: [
    {
      q: "What is the MERN stack in simple terms?",
      a: "Four tools that all speak JavaScript: MongoDB stores the data, Express.js and Node.js run the server and the API, and React builds the interface people click. One language across the whole project means less translation between layers and fewer places for bugs to hide.",
    },
    {
      q: "Is MERN better than Laravel?",
      a: "Neither is better. They suit different projects. MERN is strong for real-time, JavaScript-heavy products with evolving data shapes. Laravel is stronger when you want a mature admin panel, relational data and reporting out of the box. I build in both, so the recommendation is not decided by which one I happen to know.",
    },
    {
      q: "Can you build a REST API only, without the front end?",
      a: "Yes. A Node and Express API with MongoDB, documented endpoints and authentication is a normal standalone scope, often for a team whose mobile app or existing front end needs a backend to talk to.",
    },
    {
      q: "How long does a MERN application take?",
      a: "A focused dashboard with authentication and a handful of data screens typically runs three to six weeks. Multi-role platforms with payments and reporting take longer. You get a per-milestone timeline with the quote, not one number at the end.",
    },
    {
      q: "Do you deploy the application as well?",
      a: "Yes. Deployment is part of the job. Front end on Vercel or similar, Node API on a suitable host, MongoDB Atlas for the database, environment variables kept out of the repository, plus domain, SSL and monitoring.",
    },
  ],
  closerTitle: "Have an application in mind?",
  closerBody:
    "Describe the users, the roles and what each one needs to do. That is usually enough for a realistic scope, a stack recommendation and a fixed quote.",
});

PAGES.push({
  slug: "react-nextjs-developer-karachi",
  navLabel: "React & Next.js Developer",
  breadcrumb: "React & Next.js Developer",
  title: "React JS & Next JS Developer in Karachi | Muhammad Wasif",
  description:
    "React JS and Next JS developer in Karachi building component-driven interfaces and server-rendered sites that load fast and rank. 4+ years, 60+ websites.",
  keywords:
    "react js developer, next js developer, react developer Karachi, next js developer Karachi, hire react developer Pakistan, frontend developer Karachi, React TypeScript developer",
  serviceName: "React.js and Next.js development",
  serviceType: "Front-end and Next.js web development",
  h1: "<em>React JS</em> and Next JS developer",
  lede:
    "React is the tool I have spent the most time in, and Next.js is what I reach for when those components have to be found by Google as well as used by people. Built with TypeScript where it earns its keep, styled with Tailwind or CSS Modules, and measured against <strong>Core Web Vitals</strong> rather than a designer's screenshot.",
  chips: ["React 18", "Next.js", "TypeScript", "Tailwind CSS", "Core Web Vitals"],
  sections: [
    {
      h2: "React work that survives its second year",
      body: `<p>Most React projects do not fail at launch. They fail six months in, when a small change means touching nine files and nobody remembers why the state lives where it does. What keeps that from happening:</p>
  <ul class="bullets">
    <li><strong>Components with one job.</strong> A card renders a card. It does not also fetch, sort and decide what a card is.</li>
    <li><strong>State kept close to where it is used.</strong> Global stores are for things that are genuinely global, not for whatever was inconvenient to pass down.</li>
    <li><strong>Loading, empty and error states built with the happy path</strong>, so they exist before a client discovers they do not.</li>
    <li><strong>TypeScript where the data is complex.</strong> Not as ceremony, but as the thing that catches the rename you forgot about.</li>
    <li><strong>Accessibility in the markup:</strong> real buttons, real headings, keyboard focus that goes where you expect.</li>
  </ul>`,
    },
    {
      h2: "Next.js when the pages have to rank",
      body: `<p>A standard React app sends the browser an empty page and builds it with JavaScript. That costs you on the first paint and on anything that reads your HTML: search engines, link previews, screen readers.</p>
  <p>Next.js renders the HTML on the server first, then hydrates. In practice that means faster Largest Contentful Paint, metadata and structured data per route, image optimisation, and pages that are already complete when a crawler arrives. For a marketing site, a blog or a store, that is the difference between existing in search results and not.</p>`,
    },
    {
      h2: "Speed treated as a feature",
      body: `<p>Fast is not a nice-to-have when Core Web Vitals sit in the ranking signals and a slow page loses visitors before it renders. On every build I look at the same list: image formats and sizing, font loading strategy, what is actually in the JavaScript bundle, layout shift from anything that arrives late, and how much work the main thread does before the page becomes interactive.</p>
  <p>This portfolio itself is a React build carrying GSAP scroll work, video previews and 3D. The point is that heavy visuals and good performance are a matter of engineering, not a choice between them.</p>`,
    },
  ],
  proof: [P.hierys, P.innerBeast, P.abet, P.peco, P.mindreach],
  faqs: [
    {
      q: "Should I use React or Next.js for my project?",
      a: "If the pages need to be found in search, a marketing site, a blog, a store, use Next.js for server-rendered HTML. If it is an internal tool or a product behind a login, plain React is lighter and perfectly appropriate. Both use the same components, so the decision is about rendering, not about rewriting.",
    },
    {
      q: "Can you convert an existing design into a React front end?",
      a: "Yes. Figma, XD, a PDF or a live site you want rebuilt. I turn it into responsive React components and flag anything in the design that will not survive contact with real content or a narrow screen.",
    },
    {
      q: "Do you use TypeScript?",
      a: "Yes, on anything with non-trivial data flowing through it. For a small marketing site plain JavaScript is often the pragmatic choice, and I will say so rather than adding a build step you do not need.",
    },
    {
      q: "Can you improve the speed of my existing React site?",
      a: "Yes. A performance audit covers bundle size, image handling, font loading, layout shift and third-party scripts, and comes back with the specific fixes ranked by what they will actually move. Not a generic Lighthouse screenshot.",
    },
    {
      q: "Do you integrate React with a backend or CMS?",
      a: "Regularly. React with Laravel, with a Node and Express API, with WordPress as a headless CMS, or against an existing backend such as ASP.NET. ABET Global is a React front end on exactly that setup.",
    },
  ],
  closerTitle: "Need a React or Next.js build?",
  closerBody:
    "Send the design, the repository or just the idea. You get a straight read on scope, the right rendering approach and a fixed quote.",
});

PAGES.push({
  slug: "laravel-php-developer-karachi",
  navLabel: "Laravel & PHP Developer",
  breadcrumb: "Laravel & PHP Developer",
  title: "Laravel Developer in Karachi | PHP Laravel Web Applications",
  description:
    "PHP Laravel developer in Karachi building custom web applications with Laravel and MySQL: admin panels, roles, REST APIs and React front ends.",
  keywords:
    "laravel developer, php laravel developer, laravel developer Karachi, hire laravel developer Pakistan, PHP developer Karachi, Laravel MySQL web application, Laravel React developer",
  serviceName: "Laravel and PHP development",
  serviceType: "Laravel and PHP web application development",
  h1: "<em>Laravel</em> and PHP developer in Karachi",
  lede:
    "Laravel with MySQL is what I build on when a project needs a real backend: accounts and roles, an admin panel the client runs the business from, records that must stay consistent, and reports someone will actually export. Three live projects on this site run on it. <strong>Offplan DXB</strong>, <strong>Hope Plants Dubai</strong> and the backend behind <strong>MindReach</strong>.",
  chips: ["Laravel", "PHP 8", "MySQL", "Eloquent ORM", "REST APIs"],
  sections: [
    {
      h2: "What I build in Laravel",
      body: `<ul class="bullets">
    <li><strong>Admin panels</strong>: CRUD over your real entities with search, filtering, pagination and exports, so staff stop asking a developer to change a row.</li>
    <li><strong>Roles and permissions</strong>: admin, manager, editor, customer, each seeing only what they should, enforced on the server rather than hidden in the interface.</li>
    <li><strong>Listing and catalogue platforms</strong>: properties, products, courses, inventory. Filtering that stays fast because the indexes were considered before launch.</li>
    <li><strong>REST APIs</strong>: a Laravel backend serving a React front end or a mobile app, with token authentication and predictable responses.</li>
    <li><strong>Forms that matter</strong>: enquiries, applications and bookings that validate properly, store reliably, email the right person and do not lose a submission when a third party is down.</li>
  </ul>`,
    },
    {
      h2: "Why Laravel instead of Node for some builds",
      body: `<p>I build in both, so this is a fit question rather than a loyalty one. Laravel arrives with the parts most business applications need already in place: authentication, an ORM in Eloquent, migrations, validation, queues, scheduled jobs, mail and a templating layer. On a project where those are the requirement, that is weeks you do not spend assembling equivalents.</p>
  <p>Node earns its place when the product is real-time, JavaScript-heavy or shares models with a JavaScript front end. Relational data, reporting and an admin-driven workflow lean Laravel. I make the call in front of you, with the reasoning.</p>`,
    },
    {
      h2: "Laravel behind a React front end",
      body: `<p>A common and underrated pattern: Laravel handles data, authentication and business rules; React or Next.js handles the interface. You get Laravel's mature backend and a modern front end, and neither side is compromised to accommodate the other.</p>
  <p><a href="https://mindreach.us/" target="_blank" rel="noopener noreferrer">MindReach</a> runs this arrangement in production. React on the front, Laravel and PHP behind it.</p>`,
    },
    {
      h2: "Working on PHP that already exists",
      body: `<p>Not every PHP project is a fresh Laravel install. Plenty of businesses in Karachi run something written years ago that still earns money and simply needs to keep working. I take on maintenance, feature work, security patching and PHP version upgrades on existing codebases, and I will tell you honestly when a rewrite would cost less than another year of patches, including when it would not.</p>`,
    },
  ],
  proof: [P.offplan, P.hopePlants, P.mindreach, P.econetix],
  faqs: [
    {
      q: "Do you build custom Laravel applications from scratch?",
      a: "Yes. From database design and migrations through authentication, roles, the admin panel and deployment. Offplan DXB and Hope Plants Dubai are both Laravel with MySQL, built and running in production.",
    },
    {
      q: "Can you work on an existing Laravel or PHP project?",
      a: "Yes. New features, bug fixes, performance work, security patches and framework or PHP version upgrades on code someone else wrote. I read the codebase first and give you an honest assessment before quoting.",
    },
    {
      q: "Laravel or WordPress for my business?",
      a: "WordPress if the site is mainly content your team publishes and edits: pages, blog, basic commerce. Laravel if the site is really an application: user accounts, custom workflows, data that has to stay consistent, reporting. Choosing WordPress for an application usually ends in a pile of plugins nobody can maintain.",
    },
    {
      q: "Do you build Laravel APIs for mobile apps?",
      a: "Yes. A Laravel API with token authentication, validation and documented endpoints is a standard scope, often built so a web front end and a mobile app share one backend.",
    },
    {
      q: "Which database do you use with Laravel?",
      a: "MySQL by default, which is what the live Laravel projects here run on. PostgreSQL where the project calls for it. Either way the schema, relationships and indexes are designed before the features are built, not retrofitted when queries start slowing down.",
    },
  ],
  closerTitle: "Need a Laravel application built or rescued?",
  closerBody:
    "New build or an existing codebase. Describe the users, the data and the admin side, and you get a scope, a stack recommendation and a fixed quote.",
});

PAGES.push({
  slug: "wordpress-developer-karachi",
  navLabel: "WordPress Developer",
  breadcrumb: "WordPress Developer",
  title: "WordPress Developer in Karachi | Custom Themes & WooCommerce",
  description:
    "WordPress developer in Karachi building custom themes, WooCommerce stores and fast, editable business websites, plus speed and security work on existing sites.",
  keywords:
    "wordpress developer, wordpress developer Karachi, woocommerce developer, custom wordpress theme development, wordpress website Karachi, hire wordpress developer Pakistan, wordpress speed optimization",
  serviceName: "WordPress and WooCommerce development",
  serviceType: "WordPress website and WooCommerce store development",
  h1: "<em>WordPress</em> developer in Karachi",
  lede:
    "WordPress is the right answer more often than developers like to admit: when a team needs to publish and edit without a developer in the loop, nothing else is as practical. What matters is <strong>how</strong> it is built: a site your staff can run, not thirty plugins holding hands over a page builder.",
  chips: ["Custom themes", "WooCommerce", "Elementor · ACF", "Speed & security", "Content your team edits"],
  sections: [
    {
      h2: "What a good WordPress build looks like",
      body: `<ul class="bullets">
    <li><strong>Custom themes</strong> built from your design, rather than a bought template bent until it nearly fits.</li>
    <li><strong>Advanced Custom Fields</strong> so editors fill in labelled fields, "Heading", "Price", "Photo", instead of fighting a layout builder and breaking the design.</li>
    <li><strong>Elementor where it genuinely helps</strong>, kept to the sections that benefit from it. Econetix runs Elementor and ACF alongside GSAP and Three.js work.</li>
    <li><strong>WooCommerce</strong> for stores: products, variations, cart, checkout, shipping, payments and the upsells that raise order value.</li>
    <li><strong>Speed and security by default</strong>: caching, image optimisation, tidy plugin list, hardened login, backups running before you need them.</li>
  </ul>`,
    },
    {
      h2: "The plugin problem, and how I avoid it",
      body: `<p>Most slow, fragile WordPress sites got that way honestly: every new requirement was solved by installing another plugin. Two years later there are forty, four of them do overlapping jobs, three are abandoned, and every update is a gamble.</p>
  <p>I keep the plugin list short and deliberate. Anything small and specific to your site gets written into the theme, where it is a few lines you own instead of a dependency that can vanish. Fewer moving parts, faster pages, updates that are boring, which is what you want from an update.</p>`,
    },
    {
      h2: "WooCommerce stores",
      body: `<p>A store has to survive a real customer on a bad connection. That means product pages that load quickly, a checkout with the fewest fields you can get away with, shipping and tax configured correctly for where you sell, and payment gateways tested with actual transactions before launch.</p>
  <p>Two live WooCommerce builds you can open: <a href="https://vampiretools.com/" target="_blank" rel="noopener noreferrer">Vampire Tools</a>, with product pages, cart, checkout and frequently-bought-together upsells, and <a href="https://bridgeprecisiontools.com/" target="_blank" rel="noopener noreferrer">Bridge Precision Tools</a>, a precision tooling catalogue built with Elementor Pro. Both run Google Tag Manager so the funnel is measurable end to end.</p>`,
    },
    {
      h2: "Fixing WordPress sites that already exist",
      body: `<p>Plenty of work here is not a new build. Sites that take eight seconds to load, sites that got hacked because a plugin went unpatched, sites where nobody remembers the admin password, sites that look wrong on a phone. Speed audits, malware cleanup and hardening, mobile fixes, theme and plugin updates done on a staging copy first. All normal scopes.</p>`,
    },
  ],
  proof: [P.bridge, P.vampire, P.econetix],
  faqs: [
    {
      q: "Do you build custom WordPress themes or use templates?",
      a: "Custom themes when the design is your own. That is what keeps the site fast and specific to your brand. If your budget is better spent elsewhere I will set up a quality theme properly instead, and say plainly which one I recommend and why.",
    },
    {
      q: "Can my team update the website without a developer?",
      a: "That is the point of choosing WordPress. Content is exposed as clear, labelled fields, so editors change text, images and prices without touching layout or code. Every handover includes a short walkthrough of the admin.",
    },
    {
      q: "Can you make my slow WordPress site faster?",
      a: "Usually yes, and usually significantly. Slowness typically comes from unoptimised images, plugin bloat, render-blocking scripts and no caching. An audit tells you what is actually costing you seconds, with the fixes ranked by impact.",
    },
    {
      q: "Do you build WooCommerce stores?",
      a: "Yes: product setup, variations, cart and checkout, shipping and tax rules, payment gateways and upsells. Vampire Tools and Bridge Precision Tools are both live WooCommerce builds. Stores are also tested on real devices before launch, since most customers arrive on a phone.",
    },
    {
      q: "WordPress or a custom-coded website?",
      a: "WordPress when content changes often and your team needs control. Custom code, React, Next.js or Laravel, when the site is really an application, or when you need speed and interactivity a CMS cannot reach. I build both, so the recommendation follows your project rather than my preference.",
    },
  ],
  closerTitle: "New WordPress site, or fixing the one you have?",
  closerBody:
    "Send the site URL or the design. You get a straight assessment, including whether WordPress is the right platform for what you are trying to do.",
});

PAGES.push({
  slug: "shopify-developer-karachi",
  navLabel: "Shopify Developer",
  breadcrumb: "Shopify Developer",
  title: "Shopify Developer in Karachi | Theme Customisation & Liquid",
  description:
    "Shopify developer in Karachi with live stores in production. Theme customisation, Liquid, Shopify Markets, storefront speed and app integrations.",
  keywords:
    "shopify developer, shopify developer Karachi, shopify theme customization, liquid developer, ecommerce developer Karachi, hire shopify developer Pakistan, shopify store setup",
  serviceName: "Shopify store development",
  serviceType: "Shopify theme customisation and eCommerce development",
  h1: "<em>Shopify</em> developer in Karachi",
  lede:
    "Shopify handles the parts of selling online that are genuinely hard: payments, PCI compliance, uptime on a launch day, tax and shipping rules. What it leaves to you is the storefront, and that is where I work: <strong>Liquid templates, theme customisation, speed and integrations</strong>. Two live stores below, on two different theme bases.",
  chips: ["Liquid templates", "Dawn & Horizon themes", "Shopify Markets", "Storefront speed", "2 live stores"],
  sections: [
    {
      h2: "Two Shopify stores running in production",
      body: `<p><a href="https://frontineers.com/" target="_blank" rel="noopener noreferrer">Frontineers</a> is a handcrafted leather brand, jackets, bags, boots, belts and knives, built on a customised Horizon theme. It sells in EUR across English and German storefronts through Shopify Markets, with Judge.me reviews and Google Tag Manager on the funnel.</p>
  <p><a href="https://hunzadryfruitsbasket.com/" target="_blank" rel="noopener noreferrer">Hunza Dry Fruits Basket</a> sells walnuts, apricots, shilajit and honey from the Hunza valley on a customised Dawn theme, priced in PKR, with Judge.me reviews and a WhatsApp order route, which is how a large share of Pakistani customers prefer to buy.</p>
  <p>Two different theme bases, two different markets, two different checkout habits. Open either one and check the source; the platform is not something you have to take my word for.</p>`,
    },
    {
      h2: "What I do on a Shopify storefront",
      body: `<ul class="bullets">
    <li><strong>Theme customisation</strong>: taking Dawn or a purchased theme and making it your brand rather than a recognisable template.</li>
    <li><strong>Liquid templates and sections</strong>: custom sections your team can add, reorder and edit from the theme editor without a developer.</li>
    <li><strong>Speed</strong>: the usual Shopify weight problem: too many apps injecting scripts, oversized images, render-blocking third parties. Measurable fixes, not guesses.</li>
    <li><strong>Product and collection structure</strong>: variants, metafields and filtering set up so a large catalogue stays navigable.</li>
    <li><strong>Integrations and tracking</strong>: apps, analytics, Google Tag Manager and conversion tracking wired so your numbers are trustworthy.</li>
  </ul>`,
    },
    {
      h2: "Shopify or WooCommerce: pick with your eyes open",
      body: `<p><strong>Shopify</strong> when you want the platform to handle hosting, security and payments, when you are selling internationally, and when a predictable monthly fee plus transaction costs suits you better than maintenance.</p>
  <p><strong>WooCommerce</strong> when you want to own the whole stack, when the store sits inside a larger content site, when your product logic is unusual enough that Shopify's rules get in the way, or when transaction fees on your volume outweigh what hosting costs.</p>
  <p>I build on both, which means the recommendation is not decided by which one I can sell you. Bring your margins, catalogue size and where you ship, and the answer is usually obvious within one conversation.</p>`,
    },
  ],
  proof: [P.frontineers, P.hunza, P.vampire, P.bridge],
  faqs: [
    {
      q: "Have you built Shopify stores before?",
      a: "Yes, and you can open both. Frontineers is a leather goods brand on a customised Horizon theme selling in EUR across English and German storefronts. Hunza Dry Fruits Basket runs a customised Dawn theme in PKR with Judge.me reviews and WhatsApp ordering. Vampire Tools adds WooCommerce experience on the self-hosted side."
    },
    {
      q: "Can you customise a Shopify theme rather than build from scratch?",
      a: "Yes, and that is usually the right approach. Starting from Dawn or a well-built paid theme and customising the Liquid, sections and styling costs less than a bespoke theme and leaves you on something that survives Shopify's platform updates.",
    },
    {
      q: "Can you make my Shopify store faster?",
      a: "Usually. Shopify stores slow down for predictable reasons: apps injecting scripts on every page, unoptimised images, heavy sliders, third-party tags. An audit identifies what is actually costing you seconds and what can be removed without losing a feature you use.",
    },
    {
      q: "Should I choose Shopify or WooCommerce?",
      a: "Shopify if you want hosting, security and payments handled and a predictable monthly cost. WooCommerce if you want to own the stack, the store lives inside a bigger content site, or transaction fees at your volume cost more than hosting. Share your catalogue size and margins and the answer is usually clear.",
    },
    {
      q: "Can you migrate my store to Shopify or away from it?",
      a: "Yes: products, collections, customers and orders, with URL redirects mapped so you do not lose the search rankings you already have. Redirects are the step most migrations skip and the one that costs the most traffic.",
    },
  ],
  closerTitle: "Selling online, or planning to?",
  closerBody:
    "Tell me the platform, the catalogue size and where you ship. You get a straight recommendation, including when the platform you are on already suits you and the money is better spent elsewhere.",
});

PAGES.push({
  slug: "website-design-development-karachi",
  navLabel: "Website Design & Development",
  breadcrumb: "Website Design & Development",
  title: "Website Design & Development in Karachi | HTML, CSS, JavaScript",
  description:
    "Website design and development in Karachi. Custom business websites in HTML, CSS and JavaScript, responsive on every screen, built to load fast and rank.",
  keywords:
    "website developer, website design developer, website design and development Karachi, html css js developer, web designer Karachi, business website Karachi, responsive website development",
  serviceName: "Website design and development",
  serviceType: "Website design and front-end development",
  h1: "Website design and development in <em>Karachi</em>",
  lede:
    "A business website has one job: make a stranger trust you enough to get in touch. That takes a clear layout, honest copy, a page that loads before anyone gives up, and a contact route that works on a phone at 11pm. Built on solid <strong>HTML, CSS and JavaScript</strong>: the foundation everything else sits on.",
  chips: ["HTML5 · CSS3 · JavaScript", "Responsive on every screen", "Bootstrap · Tailwind", "SEO-ready markup", "Fast by default"],
  sections: [
    {
      h2: "Design and build, not one then the other",
      body: `<p>The familiar failure: a beautiful design is signed off, then it turns out the hero text does not fit once real content arrives, the layout collapses at 380px, and the fonts add two seconds to the load. Design and development were done by different people who never spoke.</p>
  <p>Because I do both, the design is made with the constraints already in view: how the type behaves at every width, what happens when a heading runs three lines, how much the images actually weigh. You approve something that will exist rather than something that has to be compromised on the way to being built.</p>`,
    },
    {
      h2: "What comes with every site",
      body: `<ul class="bullets">
    <li><strong>Responsive layouts</strong> tested on real phones, not just a narrow browser window.</li>
    <li><strong>Semantic HTML</strong>: proper headings, landmarks and labels, which is the same work that makes a site accessible and makes it readable to search engines.</li>
    <li><strong>SEO foundations</strong>: unique titles and descriptions per page, structured data, sitemap, robots.txt, Search Console connected on launch day.</li>
    <li><strong>Speed</strong>: right-sized images in modern formats, sensible font loading, no framework where plain JavaScript does the job.</li>
    <li><strong>Contact that works</strong>: forms that validate and actually deliver, WhatsApp and click-to-call on mobile, and tracking so you know which page brought the enquiry.</li>
  </ul>`,
    },
    {
      h2: "Plain HTML, Bootstrap or a framework",
      body: `<p>Not every site needs React. <a href="https://petrocenergy.com/" target="_blank" rel="noopener noreferrer">Petroc Energy</a> and <a href="https://www.pinnacledesignagency.com/" target="_blank" rel="noopener noreferrer">Pinnacle Design Agency</a> are hand-written HTML, CSS and JavaScript. They load quickly because there is nothing extra to load, and they cost less to build and to host. <a href="https://badaruddin.net/" target="_blank" rel="noopener noreferrer">Badaruddin</a> uses Bootstrap for a fast, dependable responsive grid.</p>
  <p>When a site has dozens of repeating pages, or content coming from a CMS, or interactive sections that would be painful in vanilla JavaScript, then React, Next.js or WordPress earns its complexity. Picking the lightest tool that does the job is the actual skill, and it is the one clients rarely get charged honestly for.</p>`,
    },
    {
      h2: "Written for people who will read it",
      body: `<p>Design decisions here are made against how the page will really be met: on a phone, on a middling connection, by someone who is comparing you against two other tabs. That means the first screen says what you do, the call to action is reachable with a thumb, and the site does not ask for a page load to answer a basic question.</p>`,
    },
  ],
  proof: [P.petroc, P.pinnacle, P.badaruddin, P.hierys, P.peco],
  faqs: [
    {
      q: "How much does a website cost in Karachi?",
      a: "It scales with pages, features and how much design work is bespoke. A focused business site is a very different budget from a store or a booking platform. Send the pages you have in mind and you get a fixed written quote, plus an honest note if a smaller build would do the job.",
    },
    {
      q: "How long does a business website take?",
      a: "A straightforward business site is typically two to four weeks from approved content. The delay is almost always content, not code. Sites wait on text, photos and logos far more often than on development.",
    },
    {
      q: "Do you design the website too, or only build it?",
      a: "Both. I can design from scratch, or build from a design you already have in Figma, XD or a PDF. If you bring a design, I will flag anything that will not survive real content or a narrow screen before building it.",
    },
    {
      q: "Will the website work on mobile phones?",
      a: "Yes, and it is designed for mobile first, because that is where most of your visitors will be. Layouts are tested on real devices, not just resized in a desktop browser.",
    },
    {
      q: "Do you handle hosting and the domain?",
      a: "Yes. I can set up the domain, hosting, SSL and email, or deploy to an account you own so you keep full control, which I recommend, so you are never locked to one developer.",
    },
    {
      q: "Will the site be set up for Google?",
      a: "Every build ships with unique page titles and meta descriptions, semantic headings, structured data, a sitemap and robots.txt, and Google Search Console connected. That is the technical groundwork. Ranking then depends on content and time, which no developer can promise.",
    },
  ],
  closerTitle: "Ready for a website that does its job?",
  closerBody:
    "Tell me about your business and the pages you need. You get a fixed quote, a realistic timeline and a straight answer about what will actually bring you enquiries.",
});

/* Deliberately last. The keyword is worth having, but the honest position is
   "senior on the front end, shipping on the back", and this page says that
   plainly rather than claiming the whole stack at the same level. */
PAGES.push({
  slug: "full-stack-developer-karachi",
  navLabel: "Full Stack Delivery",
  breadcrumb: "Full Stack Delivery",
  title: "Full Stack Web Development in Karachi | Muhammad Wasif",
  description:
    "Full stack web development in Karachi: senior front end in React and Next.js, with backend in Laravel or Node shipped end to end. An honest read on both.",
  keywords:
    "full stack developer Karachi, full stack web development Karachi, hire full stack developer Pakistan, React Node Laravel developer, freelance web developer Karachi",
  serviceName: "Full stack web development",
  serviceType: "Full stack web development",
  h1: "<em>Full stack</em> web development in Karachi",
  lede:
    "One developer from the first pixel to the live URL. Worth being precise about what that means here: <strong>front end is where my four-plus years of depth sit</strong>, and the backend is work I ship in production while still building depth. For most business sites, stores and marketing platforms that is exactly enough. For some projects it is not, and I will tell you which one yours is.",
  chips: ["Senior on the front end", "Laravel · MySQL shipped", "Node · MongoDB shipped", "Deployment & analytics", "Honest scoping"],
  sections: [
    {
      h2: "The honest version, before you read further",
      body: `<p>Plenty of freelancers put "full stack" on a profile because it widens the net. Here is the actual split, so you can decide with real information:</p>
  <ul class="bullets">
    <li><strong>Front end: senior.</strong> React, Next.js, TypeScript, HTML, CSS, responsive and accessible builds, Core Web Vitals. This is the craft, and it is where four-plus years of daily practice went.</li>
    <li><strong>CMS and commerce: strong and proven.</strong> WordPress and WooCommerce, Shopify theme and Liquid work. Five live stores you can open.</li>
    <li><strong>Backend: shipping, still growing.</strong> Laravel with MySQL and Node with Express and MongoDB are both running in production on delivered projects. I am competent and careful there; I am not going to call it senior.</li>
    <li><strong>Deployment, APIs and analytics: routine.</strong> Build pipelines, hosting, SSL, third-party integrations, Google Tag Manager and Search Console.</li>
  </ul>`,
    },
    {
      h2: "What the backend work has actually been",
      body: `<p>Not theory from a course. <a href="https://offplandxb.ae/" target="_blank" rel="noopener noreferrer">Offplan DXB</a> is a Dubai property portal on Laravel and MySQL: listings, filtering and lead capture against a real database. <a href="https://hopeplantsdubai.com/" target="_blank" rel="noopener noreferrer">Hope Plants Dubai</a> is a Laravel application with catalogue content managed from an admin side. <a href="https://mindreach.us/" target="_blank" rel="noopener noreferrer">MindReach</a> pairs a React front end with a Laravel backend.</p>
  <p>On the JavaScript side, <a href="https://innerbeast.co.uk/" target="_blank" rel="noopener noreferrer">Inner Beast</a> runs Next.js over a Node, Express and MongoDB stack. Those are the receipts. What they do not yet include is heavy data modelling at scale, or a system where a security mistake is expensive, which is exactly why I flag those rather than take them alone.</p>`,
    },
    {
      h2: "When one developer is the right call",
      body: `<p><strong>Good fit:</strong> a business site with a CMS your team edits; a WooCommerce or Shopify store; a marketing platform with forms, integrations and analytics; a React or Next.js front end over an existing backend; an admin panel with roles and reporting on Laravel.</p>
  <p><strong>Bring in a specialist:</strong> financial or health data, complex multi-tenant permissions, real-time systems at scale, anything where a breach or a wrong number costs real money. In those cases I still do the front end at full strength. I just do not pretend the server side is a solo job.</p>
  <p>Every handover between vendors is a place where scope goes missing and nobody owns the bug. Removing that gap is the real value of hiring one person. Pretending the gap does not exist when it does is not.</p>`,
    },
  ],
  proof: [P.mindreach, P.offplan, P.innerBeast, P.hopePlants, P.bridge, P.hierys],
  faqs: [
    {
      q: "Are you a full stack developer or a front-end developer?",
      a: "Senior front-end developer who also ships full stack work. Front end is where the depth is; Laravel with MySQL and Node with MongoDB are in production on delivered projects but I am still building depth there. I would rather you hear that now than discover it mid-project.",
    },
    {
      q: "So can you build my whole project end to end?",
      a: "For most business sites, CMS builds, stores and marketing platforms, yes: front end, backend, database, deployment and analytics. For heavy data modelling, real-time systems at scale or security-sensitive work, I will say so at the quote stage and either bring in a backend specialist or take the front end only.",
    },
    {
      q: "How much does a full stack project cost in Karachi?",
      a: "It depends entirely on scope. A five-page marketing site and a booking platform with logins, payments and an admin panel are not the same job. Send the pages and features you have in mind and you get a fixed written quote before any work starts.",
    },
    {
      q: "Which stack will you use?",
      a: "Whichever suits the problem. Content-led site your team edits: WordPress. Marketing site that must rank and load fast: Next.js. Application with accounts, roles and reporting: React with Laravel. I explain the trade-off before the decision rather than defaulting to one tool.",
    },
    {
      q: "Can you take over a project another developer started?",
      a: "Yes, if the code is available and the stack is one I work in. I read what is there, tell you honestly whether it is worth continuing or rebuilding, and give you the reasoning rather than just the verdict.",
    },
  ],
  closerTitle: "Tell me what you are building",
  closerBody:
    "Send the pages, the features and the deadline. You get an honest answer about scope, including the answer that part of it should go to someone else.",
});
