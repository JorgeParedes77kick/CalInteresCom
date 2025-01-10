import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"), // Esto permite usar "src/" como base absoluta
      pages: path.resolve(__dirname, "src/pages"), // Esto permite usar "src/" como base absoluta
    },
  },
});
