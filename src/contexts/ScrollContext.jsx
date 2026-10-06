import { createContext, useCallback, useContext, useEffect, useRef } from 'react';

const ScrollCtx = createContext(null);

// Keep the interpolation close to Lenis' natural feel: enough easing to remove
// wheel steps, but responsive enough that the page never feels like it is
// dragging behind the pointer.
const SMOOTH_OPTIONS = {
  smoothWheel: true,
  lerp: 0.1,
  wheelMultiplier: 0.85,
  touchMultiplier: 1,
  syncTouch: false,
  overscroll: false,
};

export function ScrollProvider({ children }) {
  const locoRef = useRef(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    let disposed = false;
    let loco = null;
    let scrollIdleTimer = 0;
    let isScrolling = false;

    const root = document.documentElement;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const useGsapTicker = Boolean(gsap && ScrollTrigger);

    if (useGsapTicker) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(0);
    }

    // Autoplay media is one of the biggest sources of dropped frames on the
    // long animated sections. Only decode it while it is actually on screen,
    // and pause it for the short period where the user is actively scrolling.
    const managedVideos = Array.from(document.querySelectorAll('video[autoplay]'));
    const visibleVideos = new Set();

    const canPlayVideo = (video) =>
      !disposed &&
      !isScrolling &&
      !document.hidden &&
      !reducedMotion.matches &&
      visibleVideos.has(video);

    const syncVideo = (video) => {
      if (canPlayVideo(video)) video.play().catch(() => {});
      else video.pause();
    };

    const syncVisibleVideos = () => {
      managedVideos.forEach(syncVideo);
    };

    let videoObserver = null;
    if (typeof IntersectionObserver !== 'undefined' && managedVideos.length) {
      videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) visibleVideos.add(video);
            else visibleVideos.delete(video);
            syncVideo(video);
          });
        },
        { threshold: 0.08, rootMargin: '140px 0px' },
      );

      managedVideos.forEach((video) => {
        // React's autoplay attribute may have started decoding before effects
        // run. Stop it immediately; the observer will resume visible media.
        video.autoplay = false;
        video.pause();
        videoObserver.observe(video);
      });
    }

    const markScrolling = () => {
      if (!isScrolling) {
        isScrolling = true;
        root.dataset.scrollActive = 'true';
        managedVideos.forEach((video) => video.pause());
      }

      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        isScrolling = false;
        delete root.dataset.scrollActive;
        syncVisibleVideos();
      }, 140);
    };

    const handleVisibility = () => syncVisibleVideos();
    document.addEventListener('visibilitychange', handleVisibility);

    const resetOnPageShow = () => {
      window.scrollTo(0, 0);
      loco?.scrollTo(0, { immediate: true });
    };

    window.addEventListener('pageshow', resetOnPageShow);

    async function setupLocomotive() {
      const { default: LocomotiveScroll } = await import('locomotive-scroll');
      if (disposed) return;

      loco = new LocomotiveScroll({
        // Keep continuous Locomotive work close to the viewport instead of the
        // default two-viewport-wide RAF window.
        rafRootMargin: '35% 0px 35% 0px',
        lenisOptions: {
          ...SMOOTH_OPTIONS,
          smoothWheel: !reducedMotion.matches,
        },
        scrollCallback: () => {
          markScrolling();
          if (useGsapTicker) ScrollTrigger.update();
        },
        initCustomTicker: useGsapTicker ? (render) => gsap.ticker.add(render) : undefined,
        destroyCustomTicker: useGsapTicker ? (render) => gsap.ticker.remove(render) : undefined,
      });

      if (disposed) {
        loco.destroy();
        return;
      }

      locoRef.current = loco;
      if (!enabledRef.current) loco.stop();
      loco.scrollTo(0, { immediate: true });
      if (useGsapTicker) ScrollTrigger.refresh();
    }

    setupLocomotive().catch((error) => {
      // Smooth scrolling is an enhancement. Keep the site fully usable with
      // native scrolling if its async chunk ever fails to load.
      console.warn('Locomotive Scroll failed to initialize:', error);
    });

    return () => {
      disposed = true;
      window.clearTimeout(scrollIdleTimer);
      delete root.dataset.scrollActive;
      window.removeEventListener('pageshow', resetOnPageShow);
      document.removeEventListener('visibilitychange', handleVisibility);
      videoObserver?.disconnect();
      managedVideos.forEach((video) => video.pause());
      window.history.scrollRestoration = previousRestoration;
      loco?.destroy();
      locoRef.current = null;
    };
  }, []);

  useEffect(() => {
    function applyAdaptiveGrid() {
      const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
      const w = window.innerWidth;
      const widthReduction = ((baseWidth - w) / baseWidth) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
      if (size > FONT_BASE) document.documentElement.style.fontSize = size + 'px';
      else document.documentElement.style.removeProperty('font-size');
    }
    applyAdaptiveGrid();
    window.addEventListener('resize', applyAdaptiveGrid);
    return () => window.removeEventListener('resize', applyAdaptiveGrid);
  }, []);

  const stopScroll = useCallback(() => {
    enabledRef.current = false;
    locoRef.current?.stop();
    const h = document.documentElement;
    h.style.position = 'relative';
    h.style.overflow = 'hidden';
    h.style.height = '100%';
  }, []);

  const startScroll = useCallback(() => {
    enabledRef.current = true;
    locoRef.current?.start();
    const h = document.documentElement;
    h.style.removeProperty('position');
    h.style.removeProperty('overflow');
    h.style.removeProperty('height');
  }, []);

  const scrollToTop = useCallback((immediate = true) => {
    const loco = locoRef.current;
    if (loco) {
      loco.scrollTo(0, {
        immediate,
        duration: immediate ? 0 : 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }, []);

  const scrollToY = useCallback((y, immediate = true) => {
    const loco = locoRef.current;
    if (loco) {
      loco.scrollTo(y, {
        immediate,
        duration: immediate ? 0 : 0.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }

    window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
  }, []);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = id === 'home' ? 0 : window.innerWidth <= 900 ? 76 : 92;
    const destination = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    const loco = locoRef.current;
    if (loco) {
      loco.scrollTo(destination, {
        duration: 1.15,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      return;
    }

    window.scrollTo({ top: destination, behavior: 'smooth' });
  }, []);

  const refreshScroll = useCallback(() => {
    locoRef.current?.resize();
    window.ScrollTrigger?.refresh();
  }, []);

  return (
    <ScrollCtx.Provider
      value={{ stopScroll, startScroll, scrollToId, scrollToTop, scrollToY, refreshScroll }}
    >
      {children}
    </ScrollCtx.Provider>
  );
}

export const useScroll = () => useContext(ScrollCtx);
