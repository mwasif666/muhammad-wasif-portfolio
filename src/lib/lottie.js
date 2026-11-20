const LOTTIE_SCRIPT =
  "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";

let lottiePromise;

export default function loadLottieRuntime() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.lottie) return Promise.resolve(window.lottie);
  if (lottiePromise) return lottiePromise;

  lottiePromise = new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-lottie-runtime]");

    if (existing) {
      if (window.lottie) {
        resolve(window.lottie);
        return;
      }
      existing.addEventListener("load", () => resolve(window.lottie), {
        once: true,
      });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = LOTTIE_SCRIPT;
    script.async = true;
    script.dataset.lottieRuntime = "true";
    script.onload = () => resolve(window.lottie);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return lottiePromise;
}


/*
 * Share the exact same JSON request between idle prewarming and the visible
 * Lottie component. A plain <link rel=prefetch> can land in a different cache
 * bucket than the player's XHR; this promise makes reuse deterministic.
 */
const animationRequests = new Map();

export function loadLottieAnimationData(url) {
  if (!animationRequests.has(url)) {
    const request = fetch(url, { mode: "cors", credentials: "omit" })
      .then((response) => {
        if (!response.ok) throw new Error(`Animation unavailable: ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        animationRequests.delete(url);
        throw error;
      });
    animationRequests.set(url, request);
  }
  return animationRequests.get(url);
}
