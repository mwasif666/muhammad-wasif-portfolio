/*
 * Pushes the brand package to Cloudinary so the identity assets live in one
 * place instead of as 3.4 MB of binaries in git.
 *
 * Signed uploads are done by hand rather than through the `cloudinary` Node SDK:
 * this runs once in a while from a developer machine, and a signature is a sorted
 * query string plus a SHA-1 — not worth a dependency the site never ships.
 *
 * Usage:  node scripts/upload-brand.mjs [--dry-run]
 * Reads CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET / VITE_CLOUDINARY_CLOUD_NAME
 * from .env, which is gitignored.
 */
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { join, relative, extname, basename, sep } from "node:path";

const ROOT = "wasifmajeed-brand-package/wasifmajeed-brand";
const PREFIX = "wasif-portfolio/brand";
const DRY = process.argv.includes("--dry-run");

/* ---------------------------------------------------------------- config -- */

async function env() {
  const raw = await readFile(".env", "utf8");
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

/*
 * Source folders are renamed on the way up. The package's `01-`/`02-` prefixes
 * order a directory listing but read badly inside a delivery URL, and splitting
 * svg from png keeps public ids unique — Cloudinary drops the extension, so
 * `wm-monogram-white.svg` and `wm-monogram-white.png` would otherwise collide.
 */
const FOLDERS = {
  "01-logo/svg": "logo-svg",
  "01-logo/png": "logo-png",
  "02-favicon": "favicon",
  "03-social": "social",
  "04-brand": "guide",
  "": "",
};

// Cloudinary sorts PDFs under `image`; everything it cannot rasterise is `raw`.
const IMAGE_EXT = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".ico", ".pdf"]);

const MIME = {
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon",
  ".pdf": "application/pdf", ".xml": "text/xml", ".css": "text/css",
  ".js": "text/javascript", ".ts": "text/plain", ".html": "text/html",
  ".md": "text/markdown",
};

/* ------------------------------------------------------------------ walk -- */

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function publicIdFor(file, files) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const dir = rel.includes("/") ? rel.slice(0, rel.lastIndexOf("/")) : "";
  const mapped = FOLDERS[dir];
  if (mapped === undefined) throw new Error(`no folder mapping for "${dir}"`);

  const ext = extname(rel);
  let name = basename(rel, ext);

  /*
   * Cloudinary drops the extension from an image public id, so two siblings that
   * differ only by format land on the same id — favicon.ico and favicon.svg do
   * exactly that. Only the ambiguous ones get a format suffix; every other name
   * stays clean.
   */
  const sameStem = files.filter(
    (f) => relative(ROOT, f).split(sep).join("/").replace(/\.[^./]+$/, "") === `${dir ? `${dir}/` : ""}${name}`,
  );
  if (sameStem.length > 1) name += `-${ext.slice(1)}`;

  return [PREFIX, mapped, name].filter(Boolean).join("/");
}

/* ---------------------------------------------------------------- upload -- */

function sign(params, secret) {
  const base = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(base + secret).digest("hex");
}

async function upload(file, cfg, files) {
  const ext = extname(file).toLowerCase();
  const kind = IMAGE_EXT.has(ext) ? "image" : "raw";
  const publicId = publicIdFor(file, files);

  // Raw assets keep their extension: without it Cloudinary serves them under a
  // bare id and the browser has to guess the type.
  const id = kind === "raw" ? `${publicId}${ext}` : publicId;

  // `invalidate` clears the CDN edge on re-upload, otherwise a replaced logo
  // keeps serving stale for hours.
  const signed = { public_id: id, timestamp: Math.floor(Date.now() / 1000), overwrite: "true", invalidate: "true" };
  const signature = sign(signed, cfg.secret);

  const form = new FormData();
  for (const [k, v] of Object.entries(signed)) form.append(k, String(v));
  form.append("api_key", cfg.key);
  form.append("signature", signature);
  form.append("file", new Blob([await readFile(file)], { type: MIME[ext] ?? "application/octet-stream" }), basename(file));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloud}/${kind}/upload`, { method: "POST", body: form });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error?.message ?? `HTTP ${res.status}`);
  return { kind, id, url: body.secure_url, bytes: body.bytes };
}

/* ------------------------------------------------------------------ main -- */

const cfg = await env().then((e) => ({
  cloud: e.VITE_CLOUDINARY_CLOUD_NAME,
  key: e.CLOUDINARY_API_KEY,
  secret: e.CLOUDINARY_API_SECRET,
}));
for (const [k, v] of Object.entries(cfg)) if (!v) throw new Error(`missing ${k} in .env`);

const files = (await walk(ROOT)).sort();
console.log(`${files.length} files -> ${cfg.cloud}/${PREFIX}${DRY ? "  (dry run)" : ""}\n`);

const seen = new Map();
for (const f of files) {
  const id = publicIdFor(f, files);
  if (seen.has(id)) throw new Error(`public id collision: ${id}\n  ${seen.get(id)}\n  ${f}`);
  seen.set(id, f);
}

if (DRY) {
  for (const [id, f] of seen) console.log(`  ${id.padEnd(52)} <- ${relative(ROOT, f).split(sep).join("/")}`);
  console.log("\nno collisions; nothing uploaded");
  process.exit(0);
}

const failed = [];
let ok = 0;
for (const f of files) {
  try {
    const r = await upload(f, cfg, files);
    ok += 1;
    console.log(`  ok   ${r.kind.padEnd(5)} ${r.id}`);
  } catch (err) {
    failed.push([relative(ROOT, f), err.message]);
    console.log(`  FAIL       ${relative(ROOT, f)}  -- ${err.message}`);
  }
}

console.log(`\n${ok}/${files.length} uploaded`);
if (failed.length) {
  console.log(`${failed.length} failed:`);
  for (const [f, m] of failed) console.log(`  ${f}: ${m}`);
  process.exit(1);
}
