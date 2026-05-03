import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Badger AI",
    short_name: "BadgerAI",
    description:
      "A browser extension that lets you run any AI prompt on selected text, with full control over providers and request templates. Configure your own API endpoints, models, and message structure — no vendor lock-in. ",
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
