import clsx from "clsx";
import { cldUrl, PORTRAIT_ID } from "../../lib/cloudinary";
import bannerStyles from "../KontourBanner.module.css";
import styles from "./HeroPortrait.module.css";
import { heroReveal } from "./heroMotion";

const PORTRAIT = cldUrl(PORTRAIT_ID);

/*
 * No skeleton on this one. The portrait is a transparent cut-out sitting in a
 * box the artwork never fills, so a shimmering rectangle reads as a stray
 * panel rather than as the picture arriving — and it is fetchpriority="high"
 * over an already-busy hero, so it is the last image that needs a placeholder.
 */
export default function HeroPortrait() {
  return (
    <div className={clsx(heroReveal("delay-[200ms]"), styles.wrap)}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.rim} aria-hidden="true" />
      <img
        src={PORTRAIT}
        alt="Muhammad Wasif (Wasif Majeed), Senior Full-Stack Developer in Karachi, Pakistan"
        draggable="false"
        decoding="async"
        fetchpriority="high"
        className={clsx(bannerStyles.portraitImg, styles.image)}
      />
    </div>
  );
}
