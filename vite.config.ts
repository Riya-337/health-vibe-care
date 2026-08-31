import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/thingspeak": {
        target: "https://api.thingspeak.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/thingspeak/, ""),
      },
    },
  },
  plugins: [tsConfigPaths(), tailwindcss(), tanstackStart(), viteReact()],
});
