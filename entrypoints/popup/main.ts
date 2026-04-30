import { createApp } from "vue";
import App from "./app.vue";
import "@/assets/main.css";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiClipboardPlus } from "oh-vue-icons/icons";
addIcons(BiClipboardPlus);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#popup-top-menu");
