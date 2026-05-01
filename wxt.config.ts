import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["storage", "tabs"],
  },
  modules: ["@wxt-dev/module-vue"],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
