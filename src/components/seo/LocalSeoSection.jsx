import { CONTACT } from "../../lib/contact";
import styles from "./LocalSeoSection.module.css";

/* Each entry is a page that exists as static HTML in /public and is listed in
   the sitemap. The card grid these used to fill is gone, but the links stay:
   the homepage is the only thing pointing at those pages, so without a link
   from here they are orphaned and stop getting crawled. */
const services = [
  { href: "/front-end-developer-karachi", title: "React & UI Development" },
  { href: "/react-nextjs-developer-karachi", title: "React & Next.js" },
  { href: "/website-design-development-karachi", title: "Website Design" },
  { href: "/wordpress-developer-karachi", title: "WordPress & WooCommerce" },
  { href: "/shopify-developer-karachi", title: "Shopify Development" },
  { href: "/laravel-php-developer-karachi", title: "Laravel & PHP" },
  { href: "/mern-stack-developer-karachi", title: "MERN Stack" },
  { href: "/full-stack-developer-karachi", title: "Full Stack Web Development" },
];

/* Numbers already claimed in the copy below, pulled out so the headline column
   has something to sit on at desktop width. */
const facts = [
  { value: "4+", label: "Years professional" },
  { value: "60+", label: "Websites delivered" },
  { value: "9", label: "Countries worked with" },
];

/* These answers are also in the homepage JSON-LD in index.html.
   Keep the visible FAQ and structured data in sync. */
const faqs = [
  {
    q: "Who is Muhammad Wasif?",
    a: (
      <>
        Muhammad Wasif, also known as Wasif Majeed, is a web developer based in
        Karachi, Pakistan. He has over four years of professional experience
        and has delivered more than 60 websites. His work includes React,
        Next.js, TypeScript, WordPress, WooCommerce, Shopify and backend
        integrations.
      </>
    ),
  },
  {
    q: "What kinds of websites can you build?",
    a: (
      <>
        I build responsive business websites, online stores and web
        applications. I use React, Next.js and TypeScript for custom
        interfaces, and WordPress, WooCommerce and Shopify for content and
        ecommerce. I also work on APIs, accessibility and performance.
      </>
    ),
  },
  {
    q: "Do you also handle backend development?",
    a: (
      <>
        Yes. I develop and integrate backend features using Node.js, Express,
        MongoDB, PHP, Laravel and MySQL. Frontend development is my main
        specialty, and I review each project's backend requirements before
        recommending an approach.
      </>
    ),
  },
  {
    q: "Do you build WordPress and Shopify sites?",
    a: (
      <>
        Yes. I build and customize WordPress and WooCommerce websites, as well
        as Shopify stores. My work includes themes, product pages, store
        functionality and integrations. You can explore examples in my
        portfolio.
      </>
    ),
  },
  {
    q: "How much does a website cost in Karachi?",
    a: (
      <>
        Pricing depends on the design, number of pages and features you need.
        A business website, online store and custom application all have
        different requirements. Send your project details on WhatsApp at{" "}
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer noopener">
          {CONTACT.phoneDisplay}
        </a>{" "}
        or email{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>{" "}
        for a quote based on the scope.
      </>
    ),
  },
  {
    q: "Do you work with clients outside Pakistan?",
    a: (
      <>
        Yes. I work remotely from Karachi with clients in Pakistan and
        overseas, including the UAE, UK and US. I plan communication and
        project timelines around the work.
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
        <div className={styles.intro}>
          <div className={styles.introHead}>
            <p className={styles.eyebrow}>
              <i aria-hidden="true" />
              Karachi &middot; Pakistan &middot; Remote worldwide
            </p>

            <h2 id="local-seo-title" className={styles.title}>
              Experienced Web Developer in <em>Karachi</em>
            </h2>

            <ul className={styles.facts}>
              {facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.introBody}>
            <p className={styles.lead}>
              I&apos;m <strong>Muhammad Wasif</strong>, also known as{" "}
              <strong>Wasif Majeed</strong>, a web developer based in Karachi,
              Pakistan. I have <strong>4+ years of experience</strong> and have
              delivered <strong>60+ websites</strong>. I build responsive
              websites and web apps with React, Next.js, JavaScript and
              TypeScript, with a focus on speed, accessibility and usability.
            </p>

            <p className={styles.lead}>
              I also build WordPress, WooCommerce and Shopify websites. For
              backend features, I work with Node.js, Express, MongoDB, PHP,
              Laravel and MySQL. That includes APIs, databases, integrations
              and deployment, depending on what the project needs.
            </p>

            <p className={styles.lead}>
              I work remotely with businesses in Pakistan and abroad. If you
              need a new website, improvements to an existing store or a custom
              web app, tell me what you&apos;re building and I&apos;ll
              recommend a practical approach.
            </p>

            <p className={styles.services}>
              <span>Explore services</span>
              {services.map((service) => (
                <a key={service.href} href={service.href}>
                  {service.title}
                </a>
              ))}
            </p>
          </div>
        </div>

        <div className={styles.faqBlock}>
          <div className={styles.faqHead}>
            <h3 className={styles.faqTitle}>Frequently asked questions</h3>
            <p className={styles.faqNote}>
              Anything not answered here, ask directly on WhatsApp at{" "}
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {CONTACT.phoneDisplay}
              </a>{" "}
              or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              I&apos;ll help you work out the scope and next steps.
            </p>
          </div>

          <div className={styles.faq}>
            {faqs.map((faq) => (
              <details className={styles.item} key={faq.q}>
                <summary className={styles.question}>{faq.q}</summary>
                <p className={styles.answer}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
