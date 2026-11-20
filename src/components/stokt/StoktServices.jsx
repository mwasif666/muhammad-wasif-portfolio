import { Fragment, useEffect, useRef, useState } from "react";
import { FlowButton } from "@/components/ui/flow-button";
import loadLottieRuntime, { loadLottieAnimationData } from "@/lib/lottie";
import useServicesTimeline from "./useServicesTimeline";
import styles from "./Services.module.css";

const services = [
  {
    key: "design",
    title: "Website Development",
    description:
      "Custom websites in React, Next.js and TypeScript: responsive, accessible interfaces with reusable components and Core Web Vitals that hold up, as on Hierys and PECO Engineering.",
    art: {
      type: "video",
      src: "https://stokt.b-cdn.net/KEYCAPS-loop-01-.webm",
      poster:
        "https://framerusercontent.com/images/fsnxfPl4xnUJdyQSiOcHEYxg.png?width=1080&height=1080",
      fit: "center",
    },
  },
  {
    key: "apps",
    title: "Web Applications",
    description:
      "Dashboards, admin panels and listing platforms built around real data, user roles and workflows, such as the Offplan DXB property portal and the MindReach platform.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/667a7576e7e7ef3ba89b3f87_Platform.json",
      loop: true,
      autoplay: false,
    },
  },
  {
    key: "mobile",
    title: "Mobile-First Builds",
    description:
      "Responsive websites planned for a mid-range phone first: accessible touch targets, sensible loading states and fast pages at every breakpoint, as on the Hunza Dry Fruits Basket store.",
    art: {
      type: "video",
      src: "https://res.cloudinary.com/agymx2xx/video/upload/v1787151950/taxi-app-transparent-browser.webm",
      fit: "bottom",
    },
  },
  {
    key: "fullstack",
    title: "Full-Stack Web Development",
    description:
      "Front end, APIs, databases, authentication and deployment as one system: Laravel with MySQL on Hope Plants Dubai, Next.js with Node, Express and MongoDB on Inner Beast.",
    art: {
      type: "video",
      src: "https://stokt.b-cdn.net/robot-hand-v1-%203-alpha%20(1).webm",
      poster:
        "https://framerusercontent.com/images/o5rue2juXI7jXmJGLCQ0tEIHzw.png?width=1000&height=1000",
      fit: "center",
    },
  },
  {
    key: "commerce",
    title: "WordPress & Shopify",
    description:
      "WordPress and WooCommerce stores your team can actually edit, like Bridge Precision Tools, Vampire Tools and Econetix, plus Shopify storefronts on Dawn and Horizon themes such as Frontineers.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/667a7576e7e7ef3ba89b3f85_Webst.json",
      loop: true,
      autoplay: false,
    },
  },
  {
    key: "integrations",
    title: "APIs & Integrations",
    description:
      "Payments, analytics and third-party services wired in cleanly: Google Tag Manager, Judge.me reviews and WhatsApp ordering, with error handling that keeps live sites dependable.",
    art: {
      type: "lottie",
      src: "https://cdn.prod.website-files.com/667a7576e7e7ef3ba89b3f2a/66ab8b10eaf1ec4297b4c7e2_Developmnt22.json",
      loop: true,
      autoplay: false,
    },
  },
];

export const SERVICE_LOTTIE_URLS = services.filter((service) => service.art.type === "lottie").map((service) => service.art.src);

function LottieArt({ art, serviceKey }) {
  const hostRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let cancelled = false;
    let observer;
    let playedOnce = false;
    let isVisible = false;
    let onScrollStart;
    let onScrollIdle;

    const mountAnimation = () => {
      Promise.all([loadLottieRuntime(), loadLottieAnimationData(art.src)])
      .then(([lottie, animationData]) => {
        if (!lottie || cancelled || !hostRef.current) return;

        const animation = lottie.loadAnimation({
          container: hostRef.current,
          renderer: "svg",
          loop: Boolean(art.loop),
          autoplay: false,
          animationData: typeof structuredClone === "function" ? structuredClone(animationData) : JSON.parse(JSON.stringify(animationData)),
          rendererSettings: {
            progressiveLoad: true,
            preserveAspectRatio: "xMidYMid meet",
          },
        });

        animationRef.current = animation;

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        const showStill = () => {
          const finalFrame = Math.max((animation.totalFrames || 1) - 1, 0);
          animation.goToAndStop(finalFrame, true);
        };

        if (reduceMotion) {
          animation.addEventListener("DOMLoaded", showStill);
          return;
        }

        const playVisible = () => {
          if (document.hidden || document.documentElement.dataset.scrollActive === "true") return;
          if (art.loop) {
            animation.play();
            return;
          }
          if (!playedOnce || art.autoplay) {
            animation.goToAndPlay(0, true);
            playedOnce = true;
          }
        };

        if (typeof IntersectionObserver === "undefined") {
          playVisible();
          return;
        }

        observer = new IntersectionObserver(
          ([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) playVisible();
            else animation.pause();
          },
          { threshold: 0.26, rootMargin: "5% 0px 5% 0px" },
        );
        observer.observe(hostRef.current);

        onScrollStart = () => animation.pause();
        onScrollIdle = () => {
          if (!isVisible) return;
          if (art.loop || !playedOnce) playVisible();
          else if (!document.hidden) animation.play();
        };
        window.addEventListener("portfolio:scroll-start", onScrollStart);
        window.addEventListener("portfolio:scroll-idle", onScrollIdle);
      })
      .catch(() => {});
    };

    // Do not fetch the Lottie player or remote animation JSON at page load.
    // Initialize each illustration only shortly before it enters the screen.
    let loadObserver;
    if (typeof IntersectionObserver === "undefined") {
      mountAnimation();
    } else {
      loadObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          loadObserver.disconnect();
          mountAnimation();
        },
        { rootMargin: "1000px 0px", threshold: 0 },
      );
      loadObserver.observe(host);
    }

    return () => {
      loadObserver?.disconnect();
      cancelled = true;
      observer?.disconnect();
      if (onScrollStart) window.removeEventListener("portfolio:scroll-start", onScrollStart);
      if (onScrollIdle) window.removeEventListener("portfolio:scroll-idle", onScrollIdle);
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, [art]);

  const replay = () => {
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      animationRef.current?.goToAndPlay(0, true);
    }
  };

  return (
    <div
      ref={hostRef}
      className={`${styles.lottieArt} ${styles[`${serviceKey}Art`] || ""}`}
      onPointerEnter={replay}
      aria-hidden="true"
    />
  );
}

function DeferredServiceVideo({ art, videoIndex }) {
  const ref = useRef(null);
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    const section = video.closest("section") || video;
    let timer;
    const start = () => {
      timer = window.setTimeout(() => setCanLoad(true), videoIndex * 450);
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        start();
      },
      {
        rootMargin: navigator.connection?.saveData ? "150px 0px" : "1100px 0px",
        threshold: 0,
      },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [art.src, videoIndex]);

  return (
    <video
      ref={ref}
      className={styles.mobileVideo}
      src={canLoad ? art.src : undefined}
      poster={canLoad ? art.poster : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload={canLoad ? "metadata" : "none"}
    />
  );
}

function ServiceArt({ service, index }) {
  const { art } = service;
  if (art.type === "lottie") {
    return <LottieArt art={art} serviceKey={service.key} />;
  }

  return (
    <div
      className={styles.mobileVideoWrap}
      data-fit={art.fit ?? "bottom"}
      aria-hidden="true"
    >
      <DeferredServiceVideo art={art} videoIndex={index} />
    </div>
  );
}

const LANES = ["left", "right", "middle"];

function ServiceCard({ service, index }) {
  return (
    <article
      className={`${styles.card} ${styles[service.key]}`}
      data-service-card
      data-lane={LANES[index % LANES.length]}
    >
      <span className={styles.cardIndex} data-service-index aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={styles.cardCopy} data-service-copy>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>

      <div className={styles.artStage} data-service-art>
        <ServiceArt service={service} index={index} />
      </div>
    </article>
  );
}

const QUOTE = `A successful website is more than a polished screen. It should load fast, guide people clearly and move a real business goal. Across 60+ websites I work backwards from that goal, choose the right stack, whether that is React, Next.js, WordPress or Shopify, and deliver it end to end.`;

export default function StoktServices({ onContact }) {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const quoteRef = useRef(null);
  const railRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const wordsRef = useRef([]);

  useServicesTimeline({
    sectionRef,
    heroRef,
    quoteRef,
    wordsRef,
    railRef,
    trackRef,
  });

  const pointerFrameRef = useRef(0);
  const pointerPosRef = useRef(null);

  useEffect(() => () => {
    if (pointerFrameRef.current) cancelAnimationFrame(pointerFrameRef.current);
  }, []);

  const updatePointerEffects = (event) => {
    if (event.pointerType === "touch") return;
    pointerPosRef.current = { x: event.clientX, y: event.clientY };
    if (pointerFrameRef.current) return;

    // Batch all layout reads before any CSS writes and at most once per frame,
    // rather than forcing layout on every high-frequency pointer event.
    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = 0;
      const pointer = pointerPosRef.current;
      if (!pointer) return;

      const track = trackRef.current;
      if (track) {
        const measurements = Array.from(track.querySelectorAll("[data-service-card]"))
          .map((card) => ({ card, rect: card.getBoundingClientRect() }));
        measurements.forEach(({ card, rect }) => {
          card.style.setProperty("--mouse-x", `${pointer.x - rect.left}px`);
          card.style.setProperty("--mouse-y", `${pointer.y - rect.top}px`);
        });
      }

      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.setProperty("--cursor-x", `${pointer.x}px`);
        cursor.style.setProperty("--cursor-y", `${pointer.y}px`);
        cursor.dataset.visible = "true";
      }
    });
  };

  const hideCursor = () => {
    if (cursorRef.current) cursorRef.current.dataset.visible = "false";
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="services"
      aria-labelledby="outcrowd-services-title"
      onPointerMove={updatePointerEffects}
      onPointerEnter={updatePointerEffects}
      onPointerLeave={hideCursor}
    >
      <span ref={cursorRef} className={styles.customCursor} aria-hidden="true">
        <i />
      </span>

      <div className={styles.viewport} data-services-viewport>
        <div ref={heroRef} className={styles.hero} data-services-hero>
          <p className={styles.heroEyebrow}>
            Full-Stack Web Development &middot; Karachi &amp; remote worldwide
          </p>
          <h2 id="outcrowd-services-title">Turning Ideas Into Reality</h2>
          <p>
            I turn ideas into fast, reliable digital experiences—from React
            and Next.js websites to WordPress, Shopify and full-stack web apps.
            60+ websites delivered, from concept to launch.
          </p>
          <FlowButton
            text="Discuss your project"
            tone="light"
            onClick={onContact}
            className="mt-[clamp(1.5rem,3vw,2.6rem)]"
          />
        </div>

        <div ref={quoteRef} className={styles.quote} data-services-quote>
          <div className={styles.quoteGlow} aria-hidden="true" />
          <div className={styles.quotePanel}>
            <p className={styles.quoteText}>
              {QUOTE.split(" ").map((word, index) => (
                <Fragment key={`${word}-${index}`}>
                  <span
                    ref={(node) => {
                      wordsRef.current[index] = node;
                    }}
                    className={styles.word}
                  >
                    {word}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
          </div>
        </div>

        <div ref={railRef} className={styles.rail} data-services-rail>
          <div ref={trackRef} className={styles.track} data-services-track>
            {services.map((service, index) => (
              <ServiceCard key={service.key} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
