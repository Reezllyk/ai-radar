import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/freeserp": {
        target: "https://freeserp.ai",
        changeOrigin: true,
        rewrite: (path) =>
            path.replace(/^\/api\/freeserp/, "/api.php"),
      },
    },
  },
});