import { useRef } from "react";
import useJourneyScrollMotion from "./useJourneyScrollMotion";
import styles from "./JourneySection.module.css";

const options = [
  {
    title: "Starting from an idea",
    copy: "Starting with a rough concept? I can turn it into a clear plan, design the interface, build the full product and take it through launch.",
    icon: {
      src: "https://cdn.lordicon.com/wloilxuq.json",
      primary: "#07242f",
      secondary: "#0f7fae",
      fallback: "draft",
    },
  },
  {
    title: "Scaling what already works",
    copy: "If your product is already live, I can improve performance, add features, connect new services or strengthen the architecture without an unnecessary rebuild.",
    icon: {
      src: "https://cdn.lordicon.com/gqdnbnwt.json",
      primary: "#eafaff",
      secondary: "#8fe5ff",
      fallback: "scale",
    },
  },
  {
    title: "Solving a focused problem",
    copy: "Need a specific page, bug, API, WooCommerce flow or automation handled quickly? I can solve it cleanly without disrupting the rest of your product.",
    icon: {
      src: "https://cdn.lordicon.com/iltqorsz.json",
      primary: "#e2f8ff",
      secondary: "#4aa8cf",
      fallback: "focus",
    },
  },
];

function FallbackIcon({ type }) {
  if (type === "draft") {
    return (
      <svg className={styles.iconFallback} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M7 25l1.1-4.6L20.4 8.1a2.2 2.2 0 0 1 3.1 0l1.4 1.4a2.2 2.2 0 0 1 0 3.1L12.6 24.9 7 25Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M18.6 10l3.4 3.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg className={styles.iconFallback} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M6 25h20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10 25v-6M16 25v-11M22 25v-16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={styles.iconFallback} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="9.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 5.4v4.2M16 22.4v4.2M5.4 16h4.2M22.4 16h4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export default function JourneySection() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // The three SVG icons have local lightweight fallbacks, so there is no need
  // to download Lottie and three remote Lordicon JSON animations just to show
  // simple illustrations while the user scrolls.
  useJourneyScrollMotion({ sectionRef, cardRefs });

  return (
    <section ref={sectionRef} className={styles.section} id="journey" aria-labelledby="journey-title">
      <div className={styles.stage}>
        <div className={styles.grid} aria-hidden="true" />
        <h2 className={styles.heading} id="journey-title">
          Where is your project <em>right now?</em>
        </h2>
        <div className={styles.frame}>
          <div className={styles.panels}>
            {options.map((option, index) => (
              <article
                key={option.title}
                ref={(node) => { cardRefs.current[index] = node; }}
                className={styles.card}
              >
                <div className={styles.cardInner}>
                  <div className={`${styles.cardFace} ${styles.cardFront}`} aria-hidden="true">
                    <div className={styles.panelImage} />
                  </div>
                  <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.surface} aria-hidden="true" />
                    <div className={styles.icon}><FallbackIcon type={option.icon.fallback} /></div>
                    <div className={styles.copy}>
                      <h3>{option.title}</h3>
                      <p>{option.copy}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <div className={styles.shine} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
