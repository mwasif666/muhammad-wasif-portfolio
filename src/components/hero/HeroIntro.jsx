import clsx from "clsx";
import { heroReveal } from "./heroMotion";
import styles from "./HeroIntro.module.css";

export default function HeroIntro() {
  return (
    <>
      <span className={clsx(heroReveal("delay-[80ms]"), styles.kicker)}>
        <span className={styles.kickerMark}>Senior Full-Stack</span>
        Developer · Karachi
      </span>

      <div className={clsx(heroReveal("delay-[120ms]"), styles.headingWrap)}>
        {/* The name stays inside the h1 for search, but at display size it
            made the headline four lines deep and pushed it under the stats
            card. It reads as the eyebrow it always was instead. */}
        <h1 className={styles.heading}>
          <span className={styles.headingName}>Muhammad Wasif</span>
          <span className={styles.headingLine}>Web Products Built to Perform</span>
        </h1>
      </div>
    </>
  );
}
