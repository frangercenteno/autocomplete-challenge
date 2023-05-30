import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-ignore - this is a vite config
  test: {
    environment: "happy-dom",
    setupFiles: ["./src/tests/setup.ts"],
    testMatch: ["./src/tests/**/*.test.tsx"],
    globals: true,
    maxThreads: 1,
    minThreads: 1,
  },
});
