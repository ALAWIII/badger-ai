import { createApp } from "vue";
import ManagePage from "./manageUi.vue";
import "@/assets/main.css";
const optionPage = createApp(ManagePage);
optionPage.mount("#manage-page");
