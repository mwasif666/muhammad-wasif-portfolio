import { useEffect, useRef, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";
import NoiseDarkBlueGradientWithSquares from "./ui/noise-dark-blue-gradient-with-squares";

const WORDS = [
  "Full Stack",
  "Frontend",
  "Backend",
  "APIs",
  "Databases",
  "Development",
  "Deployment",
  "Performance",
  "Scalable",
  "Production",
];

const COUNTER_DURATION = 2350;
const HOLD_DURATION = 140;
const EXIT_DURATION = 1200;
const WORD_INTERVAL = 900;
// How long a swap takes. The outgoing and incoming words run this together, so
// one is always on screen — the word never blinks out to nothing in between.
const WORD_TRANSITION = 620;

const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);

export default function PageLoader({ onDone }) {
  const { stopScroll, startScroll } = useScroll();
  const [progress, setProgress] = useState(0);
  /*
   * The words on screen, oldest first. Normally one entry; during a swap it
   * holds two, and the extra one is dropped once its exit animation is done.
   * `id` has to be separate from `index` so React remounts the incoming span
   * (and replays its entry animation) even when a word repeats.
   */
  const [words, setWords] = useState(() => [
    { id: 0, index: Math.floor(Math.random() * WORDS.length) },
  ]);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    stopScroll();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeouts = [];
    let counterFrame;
    let wordTimer;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      startScroll();
      onDoneRef.current?.();
      setGone(true);
    };

    const schedule = (callback, delay) => {
      const id = window.setTimeout(callback, delay);
      timeouts.push(id);
      return id;
    };

    const rotateWord = () => {
      setWords((current) => {
        const latest = current[current.length - 1];

        // Keep only the word being replaced, so a slow frame can never stack up
        // more than the two the animation shows.
        return [
          latest,
          { id: latest.id + 1, index: (latest.index + 1) % WORDS.length },
        ];
      });

      schedule(() => {
        setWords((current) => current.slice(-1));
      }, WORD_TRANSITION);
    };

    if (reduceMotion) {
      setProgress(100);
      schedule(finish, 80);
    } else {
      wordTimer = window.setInterval(rotateWord, WORD_INTERVAL);

      const startedAt = performance.now();
      const updateCounter = (now) => {
        const elapsed = now - startedAt;
        const ratio = Math.min(elapsed / COUNTER_DURATION, 1);
        setProgress(Math.min(100, Math.floor(easeOutQuart(ratio) * 100)));

        if (ratio < 1) {
          counterFrame = requestAnimationFrame(updateCounter);
          return;
        }

        setProgress(100);
        window.clearInterval(wordTimer);
        schedule(() => setExit(true), HOLD_DURATION);
        schedule(finish, HOLD_DURATION + EXIT_DURATION);
      };

      counterFrame = requestAnimationFrame(updateCounter);
    }

    return () => {
      cancelAnimationFrame(counterFrame);
      window.clearInterval(wordTimer);
      timeouts.forEach(window.clearTimeout);
      if (!finished) startScroll();
    };
  }, [startScroll, stopScroll]);

  if (gone) return null;

  return (
    <div
      id="preloader"
      className={`preloader${exit ? " is-complete" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader__background">
        <NoiseDarkBlueGradientWithSquares
          direction="diagonal"
          speed={0.6}
          squareSize={44}
          borderColor="rgba(255,255,255,0.12)"
          vignette
        />
      </div>

      <div className="preloader__panels">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="preloader__panel" key={index} />
        ))}
      </div>

      <div className="preloader__content">
        <div className="preloader__counter">
          <span>{progress}</span>%
        </div>

        <div className="preloader__title">
          <span className="preloader__words">
            {words.map((word, position) => (
              <span
                key={word.id}
                className={`preloader__word ${
                  position === words.length - 1 ? "is-current" : "is-outgoing"
                }`}
              >
                {WORDS[word.index]}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
