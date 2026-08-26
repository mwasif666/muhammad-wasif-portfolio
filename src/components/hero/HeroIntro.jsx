import clsx from "clsx";
import { heroReveal } from "./heroMotion";
import styles from "./HeroIntro.module.css";

export default function HeroIntro() {
  return (
    <>
      <span className={clsx(heroReveal("delay-[80ms]"), styles.kicker)}>
        <span className={styles.kickerMark}>Senior Front-End</span>{" "}
        Developer · Karachi
      </span>

      <div className={clsx(heroReveal("delay-[120ms]"), styles.headingWrap)}>
        {/* The name stays in the h1 — a previous pass put it there for Search
            Console — but off the screen: at display size it crowded the
            headline, and the visitor already reads it in the header, the
            signature band and the about section. */}
        <h1 className={styles.heading}>
          <span className="sr-only">Muhammad Wasif — Senior Front-End Developer in Karachi. </span>
          <span className={styles.headingLine}>Web Products Built to Perform</span>
        </h1>
      </div>
    </>
  );
}
