import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      proxy: {
        "/thingspeak": {
          target: "https://api.thingspeak.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/thingspeak/, ""),
        },
      },
    },
  },
});
