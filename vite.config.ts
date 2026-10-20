import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { IncomingMessage } from "node:http";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // met.no krever en identifiserende User-Agent-header og svarer ikke
      // med CORS-headere som tillater kall direkte fra nettleseren. Derfor
      // ruter vi kallene via denne dev-serveren i stedet for å kalle
      // api.met.no direkte fra klienten.
      "/api/met": {
        target: "https://api.met.no/weatherapi/locationforecast/2.0",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/met/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq: { setHeader: (name: string, value: string) => void }) => {
            // Bytt gjerne ut kontaktinfoen under med deres egen hvis dere
            // bruker dette utover workshopen — met.no ber om en reell
            // kontaktmulighet i User-Agent-strengen sin.
            proxyReq.setHeader(
              "User-Agent",
              "Bekkvaeret-Workshop/1.0 github.com/bekk (workshop-kontakt: bytt-ut@bekk.no)",
            );
          });
          proxy.on("error", (err: Error, _req: IncomingMessage) => {
            console.error("[met.no proxy]", err.message);
          });
        },
      },
    },
  },
});
