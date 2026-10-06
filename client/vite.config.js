import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// /api ki saari requests backend (port 5000) pe forward hongi
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { "/api": "http://localhost:5001" } },
});
