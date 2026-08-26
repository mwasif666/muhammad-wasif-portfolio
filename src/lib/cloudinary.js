import { Cloudinary } from "@cloudinary/url-gen";

/*
 * Delivery-side Cloudinary setup.
 *
 * Only the cloud name lives here, and that is fine because it is present in
 * every delivery URL the browser fetches. No API credentials belong in this
 * client-side module.
 *
 * The fallback matters because .env is gitignored, so a fresh clone has no
 * VITE_CLOUDINARY_CLOUD_NAME and would otherwise build with an empty cloud.
 */
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "agymx2xx";
const FOLDER = "wasif-portfolio";

export const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

/**
 * A CloudinaryImage, for `<AdvancedImage cldImg={...} />` and for chaining
 * further transforms (resize, crop) at the call site.
 */
export function cldImage(id) {
  // f_auto picks AVIF/WebP per the browser's Accept header, q_auto picks the
  // compression level per image. Together they are what takes this project's
  // artwork from ~9 MB down to well under 1 MB.
  return cld.image(`${FOLDER}/${id}`).format("auto").quality("auto");
}

/*
 * The portrait's public id, shared rather than repeated at each call site.
 * It is SEO copy instead of a short slug, and renaming it in some files but not
 * others is exactly what left the About section fetching a dead id.
 */
export const PORTRAIT_ID =
  "muhammad-wasif-wasif-majeed-senior-full-stack-developer-karachi";

/** Delivery URL — what every `<img src>` and CSS `url()` here uses. */
export function cldUrl(id) {
  return cldImage(id).toURL();
}

/**
 * Delivery URL for an asset that has to stay vector.
 *
 * Deliberately skips `cldImage`, because `f_auto` rasterises an SVG source: the
 * monogram comes back as a fixed-size WebP that blurs on high-DPR screens and is
 * larger than the original besides (4.9 KB against 3.1 KB). An untransformed URL
 * returns the bytes that were uploaded, and at this size there is nothing for
 * `q_auto` to save anyway.
 */
export function cldVector(id) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${FOLDER}/${id}.svg`;
}

/*
 * The interlocked WM monogram, white for the site's dark surfaces. Shared for
 * the same reason as PORTRAIT_ID — the header and the footer must not drift
 * apart when the mark is next replaced.
 */
export const BRAND_MONOGRAM = cldVector("brand/logo-svg/wm-monogram-white");

/**
 * The résumé PDF, opened in its own tab from the hero.
 *
 * Not routed through `cldImage`: it sits at the cloud root rather than in
 * FOLDER, and `f_auto` would hand back a rasterised page instead of the
 * document. Left unversioned so re-uploading over the same public id is all it
 * takes to publish a new résumé.
 */
export const RESUME_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/Muhammad_Wasif_Resume_2.pdf`;

/**
 * Video renditions for a `<video>` element, VP9 first.
 *
 * These are explicit rather than left to `f_auto`: Cloudinary's negotiation for
 * video depends on both the URL extension and the Accept header, and the same
 * asset came back as 1.2 MB VP9 or 2.2 MB H.264 depending on the combination.
 * Handing the browser both sources and letting it pick is predictable.
 *
 * `width` caps the transcode — the raw screen recordings dwarf the slot they
 * play in (the first one is 37 MB untouched, 1.2 MB at w_1000), and an
 * autoplaying preview has to be cheap or it is worse than no preview at all.
 *
 * `folder` exists because not every recording lands in FOLDER: a clip uploaded
 * straight from the Cloudinary dashboard sits at the cloud root, and prefixing
 * it would resolve to a public id that does not exist. Pass `folder: ""` for
 * those rather than re-uploading them.
 */
export function cldVideoSources(id, { width = 1000, folder = FOLDER } = {}) {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;
  const publicId = folder ? `${folder}/${id}` : id;

  return [
    { type: "video/webm", src: `${base}/f_webm,vc_vp9,q_auto,w_${width}/${publicId}.webm` },
    { type: "video/mp4", src: `${base}/f_mp4,q_auto,w_${width}/${publicId}.mp4` },
  ];
}

/**
 * Delivery URL for a still that was uploaded to the cloud root instead of
 * FOLDER, with the same `f_auto,q_auto` pass `cldImage` applies.
 *
 * Worth using over the bare upload URL every time: the Frontineers capture is
 * a 10.1 MB PNG as uploaded and 697 KB as WebP at w_1000, for a preview that
 * never renders wider than a card.
 */
export function cldRootUrl(id, { width = 1000, version } = {}) {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

  return `${base}/f_auto,q_auto,w_${width}/${version ? `${version}/` : ""}${id}`;
}
