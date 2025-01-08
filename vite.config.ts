import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { rootPath } from "./src/utils/constsants";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: rootPath,
});
