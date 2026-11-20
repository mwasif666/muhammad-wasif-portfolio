import { useEffect, useRef, useState } from "react";
import styles from "./AboutGlobe.module.css";
import freelanceMap from "../../assets/freelance-countries.json";

const D3_SRC = "https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js";
const LAND_SRC =
  "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json";

let d3Loader;
let landLoader;
let dotCache;
let globePreparePromise;

function loadD3() {
  if (window.d3) return Promise.resolve(window.d3);
  if (d3Loader) return d3Loader;

  d3Loader = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${D3_SRC}"]`);
    const script = existing || document.createElement("script");

    const handleLoad = () => {
      if (window.d3) resolve(window.d3);
      else reject(new Error("D3 failed to initialize"));
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", () => reject(new Error("D3 failed to load")), {
      once: true,
    });

    if (!existing) {
      script.src = D3_SRC;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  });

  return d3Loader;
}

function loadLand() {
  if (!landLoader) {
    landLoader = fetch(LAND_SRC).then((response) => {
      if (!response.ok) throw new Error("Failed to load land data");
      return response.json();
    });
  }
  return landLoader;
}

function pointInPolygon([x, y], polygon) {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi || Number.EPSILON) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

function pointInFeature(point, feature) {
  const geometry = feature.geometry;
  if (!geometry) return false;

  if (geometry.type === "Polygon") {
    const [outer, ...holes] = geometry.coordinates;
    return pointInPolygon(point, outer) && !holes.some((hole) => pointInPolygon(point, hole));
  }

  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.some(([outer, ...holes]) =>
      pointInPolygon(point, outer) && !holes.some((hole) => pointInPolygon(point, hole)),
    );
  }

  return false;
}

async function buildLandDots(d3, land) {
  if (dotCache) return dotCache;

  const dots = [];
  const step = 1.45;
  let lastYield = performance.now();

  land.features.forEach((feature) => {
    const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature);

    for (let lng = minLng; lng <= maxLng; lng += step) {
      for (let lat = minLat; lat <= maxLat; lat += step) {
        if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
        // Yield expensive geography work in small chunks so user input and
        // Locomotive Scroll keep receiving frames on slower laptops.
        if (performance.now() - lastYield > 7) {
          await new Promise((resolve) => {
            if (typeof requestIdleCallback === "function") {
              requestIdleCallback(resolve, { timeout: 240 });
            } else {
              setTimeout(resolve, 12);
            }
          });
          lastYield = performance.now();
        }
      }
    }
  });

  // Precompute unit vectors once so every animation frame avoids thousands
  // of expensive spherical-distance calculations.
  dotCache = dots.map(([lng, lat]) => {
    const longitude = (lng * Math.PI) / 180;
    const latitude = (lat * Math.PI) / 180;
    const cosLat = Math.cos(latitude);
    return {
      point: [lng, lat],
      x: cosLat * Math.cos(longitude),
      y: cosLat * Math.sin(longitude),
      z: Math.sin(latitude),
    };
  });
  return dotCache;
}

/** Fetch and prepare the globe well before About becomes visible. */
export function preloadGlobe() {
  if (!globePreparePromise) {
    globePreparePromise = Promise.all([loadD3(), loadLand()])
      .then(async ([d3, land]) => ({
        d3,
        land,
        dots: await buildLandDots(d3, land),
      }))
      .catch((error) => {
        globePreparePromise = null;
        throw error;
      });
  }
  return globePreparePromise;
}

export default function AboutGlobe() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;

    let destroyed = false;
    let animationFrame = 0;
    let resizeFrame = 0;
    let dragging = false;
    let pointerStart = null;
    let rotationStart = null;
    let autoRotate = true;
    let inView = false;
    let initialized = false;
    let lastFrame = 0;
    let d3;
    let land;
    let dots = [];
    let context;
    let projection;
    let path;
    let graticule;
    let width = 1;
    let height = 1;
    let baseRadius = 1;
    let zoom = 1;
    const rotation = [-18, -28, 0];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sizeCanvas = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      baseRadius = Math.min(width * 0.46, height * 0.46);

      if (d3) {
        projection = d3
          .geoOrthographic()
          .scale(baseRadius * zoom)
          .translate([width / 2, height * 0.5])
          .clipAngle(90)
          .precision(0.25)
          .rotate(rotation);
        path = d3.geoPath().projection(projection).context(context);
        graticule = d3.geoGraticule10();
      }
    };

    const draw = () => {
      if (!context || !projection || !path || !land) return;

      context.clearRect(0, 0, width, height);
      const scaleFactor = projection.scale() / baseRadius;
      const [cx, cy] = projection.translate();
      const radius = projection.scale();

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = "#050505";
      context.fill();
      context.strokeStyle = "rgba(255,255,255,.9)";
      context.lineWidth = Math.max(0.75, 1.15 * scaleFactor);
      context.stroke();

      context.beginPath();
      path(graticule);
      context.strokeStyle = "rgba(255,255,255,.18)";
      context.lineWidth = Math.max(0.45, 0.7 * scaleFactor);
      context.stroke();

      context.beginPath();
      land.features.forEach((feature) => path(feature));
      context.strokeStyle = "rgba(255,255,255,.92)";
      context.lineWidth = Math.max(0.65, 0.92 * scaleFactor);
      context.stroke();

      const centerLng = (-rotation[0] * Math.PI) / 180;
      const centerLat = (-rotation[1] * Math.PI) / 180;
      const centerCos = Math.cos(centerLat);
      const centerX = centerCos * Math.cos(centerLng);
      const centerY = centerCos * Math.sin(centerLng);
      const centerZ = Math.sin(centerLat);
      const dotRadius = Math.max(0.52, 0.88 * scaleFactor);
      context.fillStyle = "rgba(190,190,190,.72)";

      dots.forEach((dot) => {
        if (dot.x * centerX + dot.y * centerY + dot.z * centerZ <= 0) return;
        const projected = projection(dot.point);
        if (!projected) return;

        context.beginPath();
        context.arc(projected[0], projected[1], dotRadius, 0, Math.PI * 2);
        context.fill();
      });

      // Local Natural Earth boundaries keep the nine client countries filled
      // as the globe rotates; the projection clips the far side of the sphere.
      freelanceMap.features.forEach((feature) => {
        context.beginPath();
        path(feature);
        context.fillStyle = "rgba(50, 167, 221, .55)";
        context.fill();
        context.strokeStyle = "#75d2f7";
        context.lineWidth = Math.max(0.8, 1.15 * scaleFactor);
        context.stroke();
      });

      context.restore();
    };

    // Only keep a frame loop while the globe is actually near the viewport.
    // Expensive canvas rendering is capped at 30fps and paused while scrolling.
    const animate = (now) => {
      if (destroyed || !inView) {
        animationFrame = 0;
        return;
      }

      animationFrame = requestAnimationFrame(animate);
      if (
        !projection || document.hidden || !autoRotate || dragging ||
        document.documentElement.dataset.scrollActive === "true" ||
        now - lastFrame < 33
      ) return;

      const delta = Math.min(66, now - lastFrame);
      lastFrame = now;
      rotation[0] += delta * 0.0065;
      projection.rotate(rotation);
      draw();
    };

    const startAnimation = () => {
      if (animationFrame || destroyed || !inView || reduceMotion) return;
      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(animate);
    };

    const onPointerDown = (event) => {
      dragging = true;
      autoRotate = false;
      pointerStart = [event.clientX, event.clientY];
      rotationStart = [...rotation];
      canvas.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!dragging || !pointerStart || !rotationStart || !projection) return;

      const dx = event.clientX - pointerStart[0];
      const dy = event.clientY - pointerStart[1];
      rotation[0] = rotationStart[0] + dx * 0.28;
      rotation[1] = Math.max(-82, Math.min(82, rotationStart[1] - dy * 0.28));
      projection.rotate(rotation);
      draw();
    };

    const endPointer = (event) => {
      if (!dragging) return;
      dragging = false;
      pointerStart = null;
      rotationStart = null;
      canvas.releasePointerCapture?.(event.pointerId);
      window.setTimeout(() => {
        if (!destroyed) autoRotate = true;
      }, 700);
    };

    const onWheel = (event) => {
      // Normal wheel movement should scroll the PAGE, not get trapped here.
      // Hold Ctrl while wheeling for deliberate globe zoom.
      if (!projection || !event.ctrlKey) return;
      event.preventDefault();
      zoom = Math.max(0.78, Math.min(1.65, zoom * (event.deltaY > 0 ? 0.94 : 1.06)));
      projection.scale(baseRadius * zoom);
      draw();
    };

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        sizeCanvas();
        draw();
      });
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          if (!initialized) void init();
          else {
            draw();
            startAnimation();
          }
        } else {
          cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      },
      { rootMargin: "120px", threshold: 0.02 },
    );

    async function init() {
      if (initialized) return;
      initialized = true;
      try {
        ({ d3, land, dots } = await preloadGlobe());
        if (destroyed) return;

        sizeCanvas();
        draw();
        setState("ready");
        startAnimation();
      } catch {
        if (!destroyed) setState("error");
      }
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    resizeObserver.observe(stage);
    // The observer starts the globe assets only when visitors approach it.
    visibilityObserver.observe(stage);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endPointer);
      canvas.removeEventListener("pointercancel", endPointer);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.stage}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        role="img"
        aria-label="Rotating globe highlighting freelance client countries: Pakistan, USA, UK, Australia, Canada, Spain, India, Bangladesh and Turkey."
      />
      {state === "loading" && <span className={styles.loading}>Loading globe</span>}
      {state === "error" && <span className={styles.error}>Globe unavailable</span>}
      {state === "ready" && <span className={styles.hint}>Drag to rotate · Ctrl+scroll to zoom</span>}
    </div>
  );
}
