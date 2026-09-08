import { cldUrl, PORTRAIT_ID } from "../../lib/cloudinary";
import { SkeletonImage } from "../ui/SkeletonMedia";
import AboutGlobe from "./AboutGlobe";
import { freelanceCountries } from "../../lib/freelanceCountries";
import styles from "./About.module.css";
import themeStyles from "./AboutBlueTheme.module.css";
import logoStyles from "./ToolLogos.module.css";
import bioStyles from "./DeveloperBio.module.css";

const PORTRAIT = cldUrl(PORTRAIT_ID);

const stats = [
  { value: "4+", label: "Years of experience" },
  { value: "60+", label: "Websites delivered" },
  { value: "Full Stack", label: "Frontend to backend", text: true },
];

const tools = [
  { label: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { label: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { label: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { label: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { label: "Express", logo: "https://cdn.simpleicons.org/express/FFFFFF" },
  { label: "Socket.IO", logo: "https://cdn.simpleicons.org/socketdotio/FFFFFF" },
  { label: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { label: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { label: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { label: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { label: "WordPress", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" },
  { label: "WooCommerce", logo: "https://cdn.simpleicons.org/woocommerce/96588A" },
  { label: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { label: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { label: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { label: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { label: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { label: "Sass", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" },
  { label: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
  { label: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { label: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" },
  { label: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { label: "Postman", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
  { label: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { label: "GitHub", logo: "https://cdn.simpleicons.org/github/FFFFFF" },
  { label: "npm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" },
  { label: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { label: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { label: "Nginx", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
];

const experience = [
  {
    role: "Senior Web Developer — MERN Stack & CMS",
    company: "Roots BMD Pvt. Ltd.",
    dates: "Mar 2023 – Present",
  },
  {
    role: "Frontend & WordPress Developer",
    company: "S&J Global Services",
    dates: "Aug 2022 – Oct 2025",
  },
  {
    role: "Frontend Developer",
    company: "Renexus Resource Group",
    dates: "Dec 2022 – Jul 2023",
  },
  {
    role: "Frontend Developer & Instructor",
    company: "Techzone",
    dates: "Oct 2022 – Dec 2022",
  },
];

function ToolLogo({ tool, duplicate = false }) {
  return (
    <div
      className={logoStyles.tool}
      aria-label={duplicate ? undefined : tool.label}
      aria-hidden={duplicate || undefined}
    >
      <span className={logoStyles.logoWrap}>
        <img
          className={logoStyles.logo}
          src={tool.logo}
          alt={duplicate ? "" : `${tool.label} logo`}
          loading="lazy"
          decoding="async"
        />
      </span>
    </div>
  );
}

export default function StoktAbout() {
  return (
    <section
      className={`${styles.section} ${bioStyles.aboutAmbient}`}
      id="about"
      aria-labelledby="stokt-about-title"
    >
      <span id="about-us" className={styles.anchor} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrow}>( About me )</span>
          <span className={styles.arrow} aria-hidden="true">↓</span>
        </div>

        <h2 id="stokt-about-title" className={styles.srOnly}>
          About Muhammad Wasif (Wasif Majeed)
        </h2>

        <div className={styles.aboutTop}>
          <div className={styles.stats} aria-label="Professional highlights">
            {stats.map((stat) => (
              <article className={styles.statCard} key={stat.label}>
                <strong className={stat.text ? styles.statText : undefined}>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <article className={styles.experienceCard} aria-labelledby="work-experience-title">
            <h3 id="work-experience-title" className={styles.experienceHeading}>
              Work experience
            </h3>
            <ol className={styles.experienceList} role="list">
              {experience.map((job) => (
                <li className={styles.experienceItem} key={job.company}>
                  <h4>{job.role}</h4>
                  <p>{job.company}</p>
                  <span className={styles.experienceDates}>{job.dates}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className={styles.locationCard} aria-labelledby="freelance-worldwide-title">
            <div className={styles.locationCopy}>
              <h3 id="freelance-worldwide-title">Freelance work across 9 countries</h3>
              <p className={styles.locationDescription}>
                I&apos;ve delivered freelance web projects for clients across
                these countries, building both frontend and backend.
              </p>
              <ul className={styles.countryList} aria-label="Countries where I have worked with freelance clients" role="list">
                {freelanceCountries.map((country) => (
                  <li key={country.code}>{country.name}</li>
                ))}
              </ul>
              <span className={styles.countryLegend}>
                <i aria-hidden="true" /> Countries I&apos;ve worked with
              </span>
            </div>
            <AboutGlobe />
          </article>
        </div>

        <div className={`${styles.aboutBottom} ${logoStyles.aboutBottomTwoCol}`}>
          <article className={`${styles.profileCard} ${themeStyles.blueProfile}`}>
            <div
              className={`${styles.profileGlow} ${themeStyles.blueProfileGlow}`}
              aria-hidden="true"
            />
            <SkeletonImage
              src={PORTRAIT}
              alt="Muhammad Wasif (Wasif Majeed), senior front-end developer in Karachi, Pakistan, working in React, Next.js and TypeScript"
              draggable="false"
            />
            <div className={`${styles.profileMeta} ${themeStyles.blueProfileMeta}`}>
              <strong>Muhammad Wasif</strong>
              <span>SENIOR FRONT-END DEVELOPER · KARACHI</span>
            </div>
          </article>

          <article className={`${styles.bioCard} ${logoStyles.bioCompact} ${bioStyles.editorialBio}`}>
            <div className={bioStyles.codeOrb} aria-hidden="true">&lt;/&gt;</div>

            <p className={bioStyles.editorialStatement}>
              I&apos;m <strong>Muhammad Wasif</strong>, also known professionally as{" "}
              <strong>Wasif Majeed</strong>. I am a{" "}
              <strong>senior front-end developer in Karachi</strong> with{" "}
              <strong>60+ websites</strong> delivered. Front end is where
              I&apos;m strongest: React, Next.js and TypeScript interfaces built
              to stay fast and <strong>maintainable</strong>. I also handle the
              WordPress, Shopify and backend side, and carry the work all the
              way to <strong>production.</strong>
            </p>

            <div className={bioStyles.editorialAuthor}>
              <span className={bioStyles.editorialAvatar}>
                <img src={PORTRAIT} alt="" aria-hidden="true" />
              </span>
              <span className={bioStyles.editorialAuthorCopy}>
                <strong>Muhammad Wasif</strong>
                <small>Senior Front-End Developer · Karachi</small>
              </span>
            </div>
          </article>

          <article className={`${styles.toolboxCard} ${themeStyles.blueToolbox} ${logoStyles.toolboxDockCard} ${logoStyles.toolboxFullRow}`}>
            <div className={logoStyles.dockStage}>
              <div className={logoStyles.carousel} aria-label="Everyday tools">
                <div className={logoStyles.track}>
                  <div className={logoStyles.group}>
                    {tools.map((tool) => (
                      <ToolLogo key={`primary-${tool.label}`} tool={tool} />
                    ))}
                  </div>
                  <div className={logoStyles.group} aria-hidden="true">
                    {tools.map((tool) => (
                      <ToolLogo key={`duplicate-${tool.label}`} tool={tool} duplicate />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
