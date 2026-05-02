import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    web_accessible_resources: [
      {
        resources: ["icon.svg"],
        matches: ["<all_urls>"],
      },
    ],
    permissions: ["storage", "tabs"],
  },
  modules: ["@wxt-dev/module-vue"],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
