import { createContext, useCallback, useContext, useEffect, useRef } from 'react';

const ScrollCtx = createContext(null);

const SMOOTH_OPTIONS = {
  smoothWheel: true,
  lerp: 0.075,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.05,
  syncTouch: false,
};

export function ScrollProvider({ children }) {
  const locoRef = useRef(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    let disposed = false;
    let loco = null;

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

    const resetOnPageShow = () => {
      window.scrollTo(0, 0);
      loco?.scrollTo(0, { immediate: true });
    };

    window.addEventListener('pageshow', resetOnPageShow);

    async function setupLocomotive() {
      // Keep Locomotive out of the first JS chunk. Native scrolling works while
      // this small chunk loads, then Locomotive takes over without a layout jump.
      const { default: LocomotiveScroll } = await import('locomotive-scroll');
      if (disposed) return;

      loco = new LocomotiveScroll({
        lenisOptions: {
          ...SMOOTH_OPTIONS,
          smoothWheel: !reducedMotion.matches,
        },
        scrollCallback: useGsapTicker ? ScrollTrigger.update : undefined,
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
      window.removeEventListener('pageshow', resetOnPageShow);
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
        duration: 1.25,
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
