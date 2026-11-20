import clsx from "clsx";
import { FlowButton } from "@/components/ui/flow-button";
import { RESUME_URL } from "@/lib/cloudinary";
import { heroReveal } from "./heroMotion";
import styles from "./HeroPitch.module.css";

export default function HeroPitch() {
  return (
    <div className={clsx(heroReveal("delay-[380ms]"), styles.root)}>
      <p className={styles.copy}>
        I build websites and web apps with React, Next.js and TypeScript,
        and work with WordPress and Shopify. I also develop APIs and backend
        features using Node.js, Laravel, MongoDB and MySQL.
      </p>

      <div className={styles.actions}>
        <FlowButton
          text="Download resume"
          tone="light"
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="max-[520px]:w-full"
        />

        <FlowButton
          text="View projects"
          tone="light"
          href="#projects"
          className="max-[520px]:w-full"
        />
      </div>
    </div>
  );
}
