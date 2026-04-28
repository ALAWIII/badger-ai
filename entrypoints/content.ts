// content.ts
import "@/assets/main.css";
import { createApp } from "vue";
import popupicon from "@/components/iconPopup.vue";
import { LaHtml5, MdContentcopyRound } from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";

addIcons(LaHtml5);
addIcons(MdContentcopyRound);
export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const app = createApp(popupicon);
    app.component("v-icon", OhVueIcon);
    app.mount(container);
  },
});
