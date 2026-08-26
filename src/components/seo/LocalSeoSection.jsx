import { CONTACT } from "../../lib/contact";
import styles from "./LocalSeoSection.module.css";

/* Each entry is a page that exists as static HTML in /public and is listed in
   the sitemap. Keeping the list here means the homepage is what links to them,
   which is how they get crawled at all. */
const services = [
  {
    href: "/full-stack-developer-karachi",
    title: "Full Stack Development",
    copy: "Front end, backend, database and deployment handled by one developer, so nothing falls between two vendors.",
  },
  {
    href: "/mern-stack-developer-karachi",
    title: "MERN Stack Development",
    copy: "MongoDB, Express.js, React and Node.js for dashboards, admin panels and products with real user accounts.",
  },
  {
    href: "/react-nextjs-developer-karachi",
    title: "React & Next.js",
    copy: "Component-driven interfaces and server-rendered Next.js sites that load fast and rank because of it.",
  },
  {
    href: "/laravel-php-developer-karachi",
    title: "Laravel & PHP",
    copy: "Laravel with MySQL for applications that need roles, an admin panel, reporting and a database behind them.",
  },
  {
    href: "/wordpress-developer-karachi",
    title: "WordPress & WooCommerce",
    copy: "Custom themes and WooCommerce stores your team can actually edit, without a page builder fighting you.",
  },
  {
    href: "/shopify-developer-karachi",
    title: "Shopify Development",
    copy: "Live stores on customised Dawn and Horizon themes — Liquid, Shopify Markets and storefront speed.",
  },
  {
    href: "/website-design-development-karachi",
    title: "Website Design & Development",
    copy: "Business websites designed and built from scratch: responsive layouts, clean HTML, CSS and JavaScript.",
  },
];

/* These answers are duplicated in the FAQPage JSON-LD in index.html. If you
   edit one, edit the other — Google drops FAQ markup that does not match the
   text a visitor can read on the page. */
const faqs = [
  {
    q: "Who is Muhammad Wasif?",
    a: (
      <>
        Muhammad Wasif, also known professionally as Wasif Majeed, is a full stack
        developer based in Karachi, Pakistan. He has 4+ years of professional
        experience and has delivered 30+ websites and web applications in React,
        Next.js, the MERN stack, Laravel, PHP, WordPress, WooCommerce and
        Shopify.
      </>
    ),
  },
  {
    q: "What does a full stack developer in Karachi actually build?",
    a: (
      <>
        Everything from the interface a visitor sees to the server behind it:
        responsive front ends in HTML, CSS, JavaScript, React and Next.js;
        backends and REST APIs in Node.js, Express or Laravel; databases in
        MongoDB and MySQL; plus CMS and commerce builds on WordPress, WooCommerce
        and Shopify, then deployment, analytics and performance tuning.
      </>
    ),
  },
  {
    q: "Do you work with the MERN stack?",
    a: (
      <>
        Yes. MongoDB, Express.js, React and Node.js is a core stack here, used for
        dashboards, admin panels, authentication flows and content-driven
        products.{" "}
        <a href="https://innerbeast.co.uk/" target="_blank" rel="noreferrer noopener">
          Inner Beast
        </a>{" "}
        is a live example built on Next.js with a MongoDB, Express.js and Node.js
        backend.
      </>
    ),
  },
  {
    q: "Can you build with Laravel and PHP as well as JavaScript?",
    a: (
      <>
        Yes. Laravel with MySQL powers several production projects, including
        Offplan DXB, Hope Plants Dubai and the backend behind MindReach. Laravel
        pairs well with a React front end when a project needs a proper admin
        panel, roles and reporting.
      </>
    ),
  },
  {
    q: "How much does a website cost in Karachi?",
    a: (
      <>
        It depends on scope. A polished marketing site is a different budget from
        a WooCommerce store or a custom application with logins, dashboards and
        payments. Share the pages, features and deadline over WhatsApp at{" "}
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer noopener">
          {CONTACT.phoneDisplay}
        </a>{" "}
        or by email at{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and you get a fixed
        written quote before anything starts.
      </>
    ),
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: (
      <>
        Yes, remote work is the norm here. Delivered projects include clients in
        Dubai and the UAE, the United Kingdom and the United States, working
        across their time zones with progress shared as the build goes.
      </>
    ),
  },
];

export default function LocalSeoSection() {
  return (
    <section
      id="hire"
      className={styles.section}
      aria-labelledby="local-seo-title"
    >
      <div className={styles.shell}>
        <p className={styles.eyebrow}>
          <i aria-hidden="true" />
          Karachi &middot; Pakistan &middot; Remote worldwide
        </p>

        <h2 id="local-seo-title" className={styles.title}>
          Full stack developer in <em>Karachi</em>, available for your project
        </h2>

        <p className={styles.lead}>
          I&apos;m <strong>Muhammad Wasif</strong>, also known as{" "}
          <strong>Wasif Majeed</strong> — a full stack web developer based in
          Karachi with <strong>4+ years</strong> of professional experience and{" "}
          <strong>30+ delivered projects</strong>. I build the whole thing: the
          interface in HTML, CSS, JavaScript, React and Next.js, the backend in
          Node.js, Express or Laravel, the database in MongoDB or MySQL, and the
          deployment that puts it in front of real users.
        </p>

        <p className={styles.lead}>
          That range is the point. A business site on WordPress, a WooCommerce
          store, a MERN dashboard with logins and roles, a Laravel admin panel
          behind a React front end — these usually mean hiring three different
          people. Work with me and there is one person answerable for the code,
          the content system and the day it goes live. Clients so far are in
          Karachi and across Pakistan, plus Dubai, the UK and the US.
        </p>

        <h3 className={styles.gridTitle}>What I build</h3>

        <ul className={styles.grid}>
          {services.map((service) => (
            <li key={service.href}>
              <a className={styles.card} href={service.href}>
                <span className={styles.cardTitle}>
                  {service.title}
                  <span aria-hidden="true">&rarr;</span>
                </span>
                <span className={styles.cardCopy}>{service.copy}</span>
              </a>
            </li>
          ))}
        </ul>

        <h3 className={styles.faqTitle}>Frequently asked questions</h3>

        <div className={styles.faq}>
          {faqs.map((faq) => (
            <details className={styles.item} key={faq.q}>
              <summary className={styles.question}>{faq.q}</summary>
              <p className={styles.answer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
