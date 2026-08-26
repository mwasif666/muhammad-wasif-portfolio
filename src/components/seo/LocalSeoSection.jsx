import { CONTACT } from "../../lib/contact";
import styles from "./LocalSeoSection.module.css";

/* Each entry is a page that exists as static HTML in /public and is listed in
   the sitemap. Keeping the list here means the homepage is what links to them,
   which is how they get crawled at all. */
const services = [
  {
    href: "/front-end-developer-karachi",
    title: "Front-End Development",
    copy: "The craft I am senior in: React, Next.js and TypeScript interfaces that stay fast, accessible and maintainable.",
  },
  {
    href: "/react-nextjs-developer-karachi",
    title: "React & Next.js",
    copy: "Component-driven interfaces and server-rendered Next.js sites that load fast and rank because of it.",
  },
  {
    href: "/website-design-development-karachi",
    title: "Website Design & Development",
    copy: "Business websites designed and built from scratch: responsive layouts, clean HTML, CSS and JavaScript.",
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
    href: "/laravel-php-developer-karachi",
    title: "Laravel & PHP",
    copy: "Backend work I have shipped: Laravel with MySQL behind admin panels, listings and reporting.",
  },
  {
    href: "/mern-stack-developer-karachi",
    title: "MERN Stack",
    copy: "MongoDB, Express.js, React and Node.js — the JavaScript backend I am building depth in.",
  },
  {
    href: "/full-stack-developer-karachi",
    title: "Full Stack Delivery",
    copy: "Front end at senior level, backend and deployment handled too, with an honest read on where each sits.",
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
        Muhammad Wasif, also known professionally as Wasif Majeed, is a senior
        front-end developer based in Karachi, Pakistan. He has 4+ years of
        professional experience and 30+ delivered projects, working mainly in
        React, Next.js, TypeScript, HTML, CSS and JavaScript, alongside
        WordPress, WooCommerce and Shopify builds.
      </>
    ),
  },
  {
    q: "What does a senior front-end developer actually build?",
    a: (
      <>
        Everything a visitor sees and touches, built to survive real conditions:
        responsive layouts in semantic HTML and modern CSS, React and Next.js
        components that stay readable a year later, TypeScript where the data
        earns it, keyboard and screen-reader access, and the Core Web Vitals
        work that decides whether the page feels fast on a mid-range phone.
      </>
    ),
  },
  {
    q: "Do you do backend work as well, or only front end?",
    a: (
      <>
        Both, with an honest split. Front end is where the 4+ years of depth
        are. On the backend I have shipped production work — Laravel with
        MySQL behind Offplan DXB and Hope Plants Dubai, and a Node, Express and
        MongoDB stack behind Inner Beast — but I am still building depth
        there, and I would rather tell you that than oversell it. For a
        demanding backend I will say so and we bring in a specialist.
      </>
    ),
  },
  {
    q: "Do you build WordPress and Shopify sites?",
    a: (
      <>
        Yes, and this is proven work rather than a line on a list. WordPress and
        WooCommerce on Bridge Precision Tools, Vampire Tools and Econetix;
        Shopify on Frontineers and Hunza Dry Fruits Basket, across customised
        Horizon and Dawn themes. All five are live and you can open them.
      </>
    ),
  },
  {
    q: "How much does a website cost in Karachi?",
    a: (
      <>
        It depends on scope. A polished marketing site is a different budget
        from a WooCommerce store or an app with logins and dashboards. Share the
        pages, features and deadline over WhatsApp at{" "}
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer noopener">
          {CONTACT.phoneDisplay}
        </a>{" "}
        or by email at{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and you get a
        fixed written quote before anything starts.
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
          Senior front-end developer in <em>Karachi</em>, available for your
          project
        </h2>

        <p className={styles.lead}>
          I&apos;m <strong>Muhammad Wasif</strong>, also known as{" "}
          <strong>Wasif Majeed</strong> — a <strong>senior front-end
          developer</strong> based in Karachi with <strong>4+ years</strong> of
          professional experience and <strong>30+ delivered projects</strong>.
          The interface is my craft: semantic HTML, modern CSS, JavaScript and
          TypeScript, built into React and Next.js components that stay fast on
          a mid-range phone and readable a year after launch.
        </p>

        <p className={styles.lead}>
          That extends past the browser. I build and ship WordPress,
          WooCommerce and Shopify stores, wire up APIs, analytics and payments,
          and handle deployment. I have also shipped backends — Laravel with
          MySQL, and Node with MongoDB — though that is the side I am still
          growing into, and I will tell you plainly when a project needs a
          backend specialist rather than take it on regardless.
        </p>

        <p className={styles.lead}>
          Clients so far are in Karachi and across Pakistan, plus Dubai, the UK
          and the US. Every project starts with a fixed written quote and a real
          answer about what will actually move the needle for you.
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
