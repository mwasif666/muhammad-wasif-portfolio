import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

/*
 * The portrait and OG image are served from first-party paths for SEO, and in
 * production Vercel rewrites them to Cloudinary (see vercel.json). Vite knows
 * nothing about that file, so without the same mapping here the hero portrait
 * 404s locally and the page renders its alt text instead of the picture.
 * Keep these two in step with vercel.json.
 */
const CLOUDINARY = 'https://res.cloudinary.com';
const UPLOAD = '/agymx2xx/image/upload';
const PORTRAIT = 'wasif-portfolio/muhammad-wasif-wasif-majeed-senior-full-stack-developer-karachi';

const proxyTo = (transform) => ({
  target: CLOUDINARY,
  changeOrigin: true,
  rewrite: () => `${UPLOAD}/${transform}/${PORTRAIT}`,
});

const seoImages = {
  '/muhammad-wasif-senior-full-stack-developer-karachi.jpg': proxyTo('f_auto,q_auto'),
  '/muhammad-wasif-full-stack-developer-og.jpg': proxyTo('f_jpg,q_auto,c_fill,w_1200,h_630,g_auto'),
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: { proxy: seoImages },
  preview: { proxy: seoImages },
});
