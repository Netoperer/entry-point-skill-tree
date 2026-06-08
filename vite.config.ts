import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [tailwindcss(), react(), cloudflare()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
