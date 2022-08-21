import { URL, fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [vue()];
  if (mode === "report") {
    plugins.push(
      visualizer({
        filename: "./dist/report.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  const resolve = {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  };

  const test = {
    coverage: {
      reporter: ["text-summary", "text", "json", "html"],
    },
    globals: true,
    setupFiles: ["./setupVitest.js"],
  };

  return {
    plugins,
    resolve,
    test,
  };
});
