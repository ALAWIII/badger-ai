// content.ts
import "@/assets/main.css";
import { createApp } from "vue";
import popupicon from "@/components/iconPopup.vue";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    createApp(popupicon).mount(container);
  },
});
