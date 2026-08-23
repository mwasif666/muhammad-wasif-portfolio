import { useEffect, useRef, useState } from "react";

/*
 * Drop-in <img> and <video> replacements that shimmer until their media
 * decodes.
 *
 * They render the same single element they replace — no wrapper — because the
 * layouts here size the media itself (object-fit, aspect-ratio, absolute
 * inset). Anything that nested them inside an extra <span> would have to be
 * re-tuned card by card. See src/skeleton.css for the shimmer.
 */

function useMediaReady(ref, isReady) {
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish decoding before React attaches onLoad, in which
  // case the event never fires and the shimmer would run forever.
  useEffect(() => {
    const node = ref.current;
    if (node && isReady(node)) setLoaded(true);
  }, [ref, isReady]);

  return [loaded, setLoaded];
}

const imageReady = (node) => node.complete && node.naturalWidth > 0;
const videoReady = (node) => node.readyState >= 2;

function classes(loaded, className) {
  return `skeleton-media${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`;
}

export function SkeletonImage({ className, onLoad, onError, ...rest }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useMediaReady(ref, imageReady);

  return (
    <img
      {...rest}
      ref={ref}
      className={classes(loaded, className)}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      // A broken image should not be left shimmering as if it were still coming.
      onError={(event) => {
        setLoaded(true);
        onError?.(event);
      }}
    />
  );
}

export function SkeletonVideo({ className, innerRef, onLoadedData, children, ...rest }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useMediaReady(ref, videoReady);

  return (
    <video
      {...rest}
      ref={(node) => {
        ref.current = node;
        if (typeof innerRef === "function") innerRef(node);
        else if (innerRef) innerRef.current = node;
      }}
      className={classes(loaded, className)}
      onLoadedData={(event) => {
        setLoaded(true);
        onLoadedData?.(event);
      }}
    >
      {children}
    </video>
  );
}

/** Plain shimmer block, for placeholders that are not media (text, tiles). */
export function Skeleton({ className = "", variant, style }) {
  const variantClass = variant ? ` skeleton--${variant}` : "";
  return (
    <span
      className={`skeleton${variantClass}${className ? ` ${className}` : ""}`}
      style={style}
      aria-hidden="true"
    />
  );
}
