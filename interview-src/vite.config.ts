import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      base: "/interview/",
      scope: "/interview/",
      manifest: {
        name: "PREP.SYS",
        short_name: "PREP",
        description: "Interview prep & vocabulary tracker",
        theme_color: "#080c08",
        background_color: "#080c08",
        display: "standalone",
        start_url: "/interview/",
        scope: "/interview/",
        icons: [
          { src: "/interview/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/interview/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        navigateFallback: "/interview/index.html",
        navigateFallbackAllowlist: [/^\/interview/],
      },
    }),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  base: "/interview/",
  build: {
    outDir: "../public/interview",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
    },
  },
});
