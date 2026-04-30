import { createApp } from "vue";
import ManagePage from "./manageUi.vue";
import "@/assets/main.css";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiPlusCircleDotted } from "oh-vue-icons/icons";

addIcons(BiPlusCircleDotted);
const optionPage = createApp(ManagePage);
optionPage.component("v-icon", OhVueIcon);
optionPage.mount("#manage-page");
