<script setup lang="ts">
import QMenu from "./quickPromptMenu.vue";
import Menu from "@/components/menu.vue";
import ResponseCard from "./responseCard.vue";
import { ref, onMounted, onUnmounted, provide } from "vue";
import { getSelectedText, getSelectionPosition } from "@/utils/selection";
import { Prompt, AIProvider } from "@/utils/models";
import { getPrompts, getProviders } from "@/utils/storage";
const showIcon = ref(false);
const showMenu = ref(false);
const showQMenu = ref<Prompt | null>(null);
const x = ref(0);
const y = ref(0);
const selectedContent = ref("");
const globalSelection = ref<Selection | null>(null);
const promptsList = ref<Prompt[]>([]);
const providersList = ref<AIProvider[]>([]);
const responseText = ref<string | null>(null);
provide("responseText", responseText);

provide("globalSelection", globalSelection);
provide("showQMenu", showQMenu);
provide("showMenu", showMenu);
provide("selectedContent", selectedContent);

provide("providersList", providersList);
provide("promptsList", promptsList);
function onMouseUp() {
    if (showQMenu.value || showMenu.value) {
        showIcon.value = false;
        return;
    }
    const selection = window.getSelection();
    const tempText = getSelectedText(selection!);
    if (!tempText) {
        showIcon.value = false;
        return;
    }
    selectedContent.value = tempText;
    globalSelection.value = selection;
    const rect = getSelectionPosition(selection!)!;
    x.value = rect.left + rect.width / 2 - 16;
    y.value = rect.bottom + 10;
    showIcon.value = true;
}

function onMouseDown(e: MouseEvent) {
    //It hides the icon when the user clicks anywhere on the page, but keeps it visible if they click the icon itself.
    if (
        (e.target as HTMLElement).closest("#badger-popupicon") ||
        (e.target as HTMLElement).closest("#menu-response-container")
    )
        return;

    showIcon.value = false;
    showMenu.value = false;
    showQMenu.value = null;
    responseText.value = null;
}

onMounted(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
});

onUnmounted(() => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousedown", onMouseDown);
});

async function handleClick() {
    showIcon.value = false;
    showMenu.value = true;
    showQMenu.value = null;
    promptsList.value = await getPrompts();
    providersList.value = await getProviders();
}
const iconUrl = browser.runtime.getURL("/icon.svg");
</script>

<template>
    <button
        id="badger-popupicon"
        v-if="showIcon && !showMenu"
        class="fixed z-2147483647 min-w-fit min-h-fit rounded-lg bg-yellow-50 shadow-md cursor-pointer select-none pointer-events-auto"
        :style="{ top: y + 'px', left: x + 'px' }"
        @mousedown.prevent="handleClick"
    >
        <img :src="iconUrl" alt="Popup icon" class="w-6 h-6" />
    </button>
    <div
        id="menu-response-container"
        class="flex fixed z-2147483647 min-w-fit min-h-fit justify-between gap-2"
        :style="{ top: y + 'px', left: x + 'px' }"
    >
        <Menu v-if="showMenu"></Menu>
        <QMenu v-if="showQMenu != null"></QMenu>
        <ResponseCard v-if="responseText != null"></ResponseCard>
    </div>
</template>
