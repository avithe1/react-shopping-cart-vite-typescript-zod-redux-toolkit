import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { rootPath } from "./src/utils/constsants";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: rootPath,
});

// import { defineConfig as defineViteConfig, mergeConfig } from "vite";
// import { defineConfig as defineVitestConfig } from "vitest/config";
// import react from "@vitejs/plugin-react";
// import { rootPath } from "./src/utils/constsants";

// const viteConfig = defineViteConfig({
//   plugins: [react()],
//   base: rootPath,
// });

// const vitestConfig = defineVitestConfig({
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "setup.ts",
//     include: ['**/*.test.tsx'],
//   },
// });

// export default mergeConfig(viteConfig, vitestConfig);
