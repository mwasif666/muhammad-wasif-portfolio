import { useState } from "react";
import clsx from "clsx";
import { cldUrl, PORTRAIT_ID } from "../../lib/cloudinary";
import bannerStyles from "../KontourBanner.module.css";
import styles from "./HeroPortrait.module.css";
import { heroReveal } from "./heroMotion";

/*
 * First-party path so search engines credit the image to this domain. It is
 * not a real file: Vercel rewrites it to Cloudinary in production and
 * vite.config proxies it locally. Anywhere neither is in play — a dev server
 * started before that config existed, a preview on some other host — the path
 * 404s and the hero renders alt text where the portrait should be, so fall
 * back to the Cloudinary URL rather than showing nothing.
 */
const PORTRAIT = "/muhammad-wasif-senior-full-stack-developer-karachi.jpg";
const PORTRAIT_FALLBACK = cldUrl(PORTRAIT_ID);

export default function HeroPortrait() {
  const [src, setSrc] = useState(PORTRAIT);

  return (
    <div className={clsx(heroReveal("delay-[200ms]"), styles.wrap)}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.rim} aria-hidden="true" />
      <img
        src={src}
        alt="Muhammad Wasif (Wasif Majeed) — senior front-end developer in Karachi, Pakistan, working in React, Next.js and TypeScript"
        draggable="false"
        decoding="async"
        fetchPriority="high"
        className={clsx(bannerStyles.portraitImg, styles.image)}
        // Setting the same URL twice is a no-op re-render, so a failing
        // fallback cannot loop.
        onError={() => setSrc(PORTRAIT_FALLBACK)}
      />
    </div>
  );
}
