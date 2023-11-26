// import reactRefresh from "@vitejs/plugin-react-refresh";
import ViteEnvPlugin from "vite-plugin-env";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteEnvPlugin],
  build: {
    minify: "terser", // Use Terser for minification
  },
});
