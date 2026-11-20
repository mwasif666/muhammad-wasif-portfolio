import { useEffect } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (from, to, value) => {
  const progress = clamp((value - from) / Math.max(to - from, 0.0001));
  return progress * progress * (3 - 2 * progress);
};

// All cards remain flat and legible; the original 3D flip rasterized type
// during the scroll, which was the source of the screenshot's warped text.
export default function useJourneyScrollMotion({ sectionRef, cardRefs, onReveal }) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = false;
    let lastProgress = -1;
    const revealed = cardRefs.current.map(() => false);

    const apply = (progress) => {
      const p = clamp(progress);
      const heading = smoothstep(0.01, 0.12, p);
      const split = smoothstep(0.14, 0.4, p);

      section.style.setProperty("--journey-heading-opacity", String(heading));
      section.style.setProperty("--journey-heading-y", `${Math.round((1 - heading) * 16)}px`);
      section.style.setProperty("--journey-gap", `${(split * 1.55).toFixed(2)}vw`);
      section.style.setProperty("--journey-seam", `${Math.round(split * 20)}px`);
      section.style.setProperty("--journey-edge", (split * 0.26).toFixed(3));
      section.style.setProperty("--journey-shadow", (split * 0.42).toFixed(3));
      section.style.setProperty("--journey-split", split.toFixed(3));

      cardRefs.current.forEach((node, index) => {
        if (!node) return;
        const face = smoothstep(0.42 + index * 0.035, 0.64 + index * 0.035, p);
        const show = face > 0.96;
        node.style.setProperty("--card-face-progress", face.toFixed(3));
        if (revealed[index] !== show) {
          revealed[index] = show;
          onReveal?.(index, show);
        }
      });
    };

    const update = () => {
      frame = 0;
      if (!active) return;
      if (window.innerWidth <= 820 || reducedMotion.matches) {
        apply(1);
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const distance = Math.max(section.offsetHeight - viewport, 1);
      const progress = clamp(-rect.top / distance);
      // A tiny progress delta is visually imperceptible, but can trigger
      // unnecessary layout/compositing writes at 60+ wheel events per second.
      if (Math.abs(progress - lastProgress) < 0.002) return;
      lastProgress = progress;
      apply(progress);
    };

    const schedule = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          lastProgress = -1;
          schedule();
        } else if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "20% 0px 20% 0px", threshold: 0 },
    );

    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener?.("change", schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener?.("change", schedule);
    };
  }, [sectionRef, cardRefs, onReveal]);
}
