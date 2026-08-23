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
        <h1 className={styles.heading}>
          Muhammad Wasif
          <span>Web Products Built to Perform</span>
        </h1>
      </div>
    </>
  );
}
