import { createApp } from "vue";
import App from "./app.vue";
import "@/assets/main.css";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiPatchPlus } from "oh-vue-icons/icons";
addIcons(BiPatchPlus);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#popup-top-menu");
