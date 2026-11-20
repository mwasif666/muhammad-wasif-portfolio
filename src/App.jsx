import { useEffect, useState } from "react";
import loadLottieRuntime, { loadLottieAnimationData } from "./lib/lottie";
import { preloadGlobe } from "./components/stokt/AboutGlobe";
import { SERVICE_LOTTIE_URLS } from "./components/stokt/StoktServices";
import { ScrollProvider } from "./contexts/ScrollContext";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import KontourBanner from "./components/KontourBanner";
import StoktSections from "./components/stokt/StoktSections";
import ProjectsSection, { PROJECT_THUMBNAIL_URLS } from "./components/ProjectsSection";
// import CaseStudiesSection from "./components/CaseStudiesSection"; // hidden for now
import WhySection from "./components/why/WhySection";
import JourneySection from "./components/journey/JourneySection";
import DeveloperSystemsSection from "./components/developerSystems/DeveloperSystemsSection";
import LocalSeoSection from "./components/seo/LocalSeoSection";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import { CONTACT } from "./lib/contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch expensive offscreen dependencies between user interactions, not
  // during the scroll into the section. Tasks run one at a time and yield
  // to painting/input; save-data and slow networks use on-demand loading.
  useEffect(() => {
    if (!ready) return undefined;
    const connection = navigator.connection;
    if (connection?.saveData || /^(?:slow-2g|2g|3g)$/.test(connection?.effectiveType || "")) {
      return undefined;
    }

    const warmImage = (src) => new Promise((resolve) => {
      const picture = new Image();
      picture.fetchPriority = "low";
      picture.decoding = "async";
      picture.onload = resolve;
      picture.onerror = resolve;
      picture.src = src;
      if (picture.complete) resolve();
    });

    const tasks = [
      () => preloadGlobe(),
      () => loadLottieRuntime(),
      ...SERVICE_LOTTIE_URLS.map((url) => () => loadLottieAnimationData(url)),
      ...PROJECT_THUMBNAIL_URLS.map((src) => () => warmImage(src)),
    ];
    let cancelled = false;
    let index = 0;
    let timeout = 0;
    let idleId = 0;

    const schedule = (delay = 700) => {
      if (!cancelled && index < tasks.length) {
        timeout = window.setTimeout(tryWarm, delay);
      }
    };

    const tryWarm = () => {
      if (cancelled || index >= tasks.length) return;
      if (document.hidden || document.documentElement.dataset.scrollActive === "true") {
        schedule(750);
        return;
      }

      const run = async (deadline) => {
        if (cancelled) return;
        if (document.hidden || document.documentElement.dataset.scrollActive === "true") {
          schedule(650);
          return;
        }
        if (deadline && !deadline.didTimeout && deadline.timeRemaining() < 4) {
          schedule(300);
          return;
        }
        try {
          await tasks[index]();
        } catch {
          // Warmup is optional. On-demand loading remains the fallback.
        }
        index += 1;
        schedule(650);
      };

      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(run, { timeout: 1800 });
      } else {
        timeout = window.setTimeout(() => run(null), 120);
      }
    };

    schedule(550);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [ready]);

  const openContact = () => {
    window.open(CONTACT.whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleLoaderDone = () => {
    window.scrollTo(0, 0);
    setReady(true);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  return (
    <ScrollProvider>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <PageLoader onDone={handleLoaderDone} />

      <Header
        ready={ready}
        onMenu={() => setMenuOpen(true)}
        onContact={openContact}
      />

      <main id="main">
        <KontourBanner id="home" theme="blue" />
        <StoktSections onContact={openContact} />
        <ProjectsSection />
        {/* <CaseStudiesSection /> */}
        <WhySection />
        <JourneySection />
        <DeveloperSystemsSection />
        <LocalSeoSection />
      </main>

      <Footer />

      <NavMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onContact={openContact}
      />
    </ScrollProvider>
  );
}
