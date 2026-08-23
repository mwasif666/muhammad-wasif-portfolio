import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cldUrl, cldVideoSources } from "../lib/cloudinary";
import styles from "./CaseStudiesSection.module.css";

const caseStudies = [
  {
    number: "01",
    name: "Hierys",
    label: "Digital agency",
    url: "https://hierys.com/",
    media: {
      type: "video",
      sources: cldVideoSources("projects/hierys", { width: 1200 }),
    },
    headline: "Turning a broad service offer into one clear digital experience.",
    intro:
      "Hierys brings website, design, SEO, social media and support under one team. The website experience needed to make that range feel focused rather than fragmented.",
    challenge:
      "Create a confident service-led journey that communicates breadth quickly, preserves the brand personality and keeps visitors moving toward a conversation.",
    focus: [
      "Service-led information architecture",
      "Responsive motion and section choreography",
      "Reusable component-driven frontend",
      "Performance-conscious media and interactions",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "GSAP ScrollTrigger", "React Router"],
  },
  {
    number: "02",
    name: "Vampire Tools",
    label: "eCommerce",
    url: "https://vampiretools.com/",
    media: {
      type: "image",
      src: cldUrl("projects/vampire-tools"),
    },
    headline: "A product-first commerce experience for specialist tools.",
    intro:
      "Vampire Tools sells professional screw-extraction tools where product understanding and trust are central to the buying decision.",
    challenge:
      "Make a specialist catalogue easier to explore while keeping product detail, related purchases and the path to checkout clear across desktop and mobile.",
    focus: [
      "WooCommerce product discovery",
      "Clearer product hierarchy and buying cues",
      "Responsive commerce experience",
      "Supporting product and marketing integrations",
    ],
    stack: [
      "WordPress",
      "WooCommerce",
      "WPC Frequently Bought Together",
      "Google Tag Manager",
    ],
  },
  {
    number: "03",
    name: "ABET Global",
    label: "FinTech",
    url: "https://abetglobal.com/",
    media: {
      type: "image",
      src: cldUrl("projects/abet-global"),
    },
    headline: "Structuring a high-information trading experience around clarity.",
    intro:
      "ABET Global combines markets, platform information and account journeys in a content-heavy financial website where hierarchy and confidence matter.",
    challenge:
      "Organize dense trading information so users can understand the offering, move between key areas and reach the right conversion touchpoints without losing context.",
    focus: [
      "Information architecture for dense content",
      "Responsive financial interface patterns",
      "Trading platform and market presentation",
      "Clear navigation and conversion touchpoints",
    ],
    stack: ["React", "JavaScript", "ASP.NET", "Microsoft IIS", "Bootstrap"],
  },
];

function CaseMedia({ project }) {
  if (project.media.type === "video") {
    return (
      <video
        className={styles.media}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${project.name} website case study preview`}
      >
        {project.media.sources.map((source) => (
          <source key={source.type} src={source.src} type={source.type} />
        ))}
      </video>
    );
  }

  return (
    <img
      className={styles.media}
      src={project.media.src}
      alt={`${project.name} website case study preview by Muhammad Wasif`}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const nodes = section.querySelectorAll("[data-case-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = caseStudies[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="case-studies"
      aria-labelledby="case-studies-title"
    >
      <div className={styles.ambient} aria-hidden="true">
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header} data-case-reveal>
          <div>
            <span className={styles.eyebrow}>Selected case studies</span>
            <h2 className={styles.title} id="case-studies-title">
              The thinking behind <em>the build.</em>
            </h2>
          </div>

          <p className={styles.headerCopy}>
            Three projects, viewed beyond the final screen — the challenge,
            build focus and technology behind each experience.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.selector} data-case-reveal>
            {caseStudies.map((project, index) => {
              const selected = index === activeIndex;

              return (
                <button
                  type="button"
                  key={project.name}
                  className={`${styles.selectorItem}${selected ? ` ${styles.active}` : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={selected}
                  style={{ "--case-delay": `${index * 70}ms` }}
                >
                  <span className={styles.selectorNumber}>({project.number})</span>
                  <span className={styles.selectorText}>
                    <strong>{project.name}</strong>
                    <small>{project.label}</small>
                  </span>
                  <span className={styles.selectorArrow} aria-hidden="true">
                    <ChevronRight size={18} strokeWidth={1.7} />
                  </span>
                </button>
              );
            })}
          </div>

          <article className={styles.feature} data-case-reveal>
            <div className={styles.featureInner} key={active.name}>
              <a
                className={styles.visual}
                href={active.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${active.name} website`}
              >
                <CaseMedia project={active} />
                <span className={styles.visualShade} aria-hidden="true" />
                <span className={styles.visualTopline}>
                  <span>{active.label}</span>
                  <span>{active.number} / 03</span>
                </span>
                <span className={styles.liveLink}>
                  Live project
                  <ArrowUpRight size={17} strokeWidth={1.7} />
                </span>
              </a>

              <div className={styles.content}>
                <div className={styles.contentLead}>
                  <span className={styles.projectName}>{active.name}</span>
                  <h3>{active.headline}</h3>
                  <p>{active.intro}</p>
                </div>

                <div className={styles.detailGrid}>
                  <div className={styles.detailBlock}>
                    <span className={styles.detailLabel}>Challenge</span>
                    <p>{active.challenge}</p>
                  </div>

                  <div className={styles.detailBlock}>
                    <span className={styles.detailLabel}>Build focus</span>
                    <ol className={styles.focusList}>
                      {active.focus.map((item, index) => (
                        <li key={item}>
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className={styles.stackRow}>
                  <span className={styles.detailLabel}>Technology</span>
                  <div className={styles.stack}>
                    {active.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
