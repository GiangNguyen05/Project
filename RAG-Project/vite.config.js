import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy /api/chat → Anthropic để tránh CORS
      "/api/chat": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        rewrite: (path) => "/v1/messages",
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader(
              "x-api-key",
              process.env.VITE_ANTHROPIC_KEY || "",
            );
            proxyReq.setHeader("anthropic-version", "2023-06-01");
          });
        },
      },
    },
  },
});
