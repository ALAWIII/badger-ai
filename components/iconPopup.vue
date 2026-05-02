<script setup lang="ts">
import QMenu from "./quickPromptMenu.vue";
import Menu from "@/components/menu.vue";
import { ref, onMounted, onUnmounted, provide } from "vue";
import { getSelectedText, getSelectionPosition } from "@/utils/selection";
import { Prompt, AIProvider } from "@/utils/models";
import { getPrompts, getProviders } from "@/utils/storage";
const showIcon = ref(false);
const showMenu = ref(false);
const showQMenu = ref(false);
const x = ref(0);
const y = ref(0);
const selectedContent = ref("");
const globalSelection = ref<Selection | null>(null);
provide("globalSelection", globalSelection);
provide("showQMenu", showQMenu);
provide("selectedContent", selectedContent);

const promptsList = ref<Prompt[]>([]);
const providersList = ref<AIProvider[]>([]);
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
        (e.target as HTMLElement).closest(".floating-icon") ||
        (e.target as HTMLElement).closest("#badger-menu") ||
        (e.target as HTMLElement).closest("#quick-menu")
    )
        return;

    showIcon.value = false;
    showMenu.value = false;
    showQMenu.value = false;
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
    showQMenu.value = false;
    promptsList.value = await getPrompts();
    providersList.value = await getProviders();
}
</script>

<template>
    <button
        id="popupicon"
        v-if="showIcon && !showMenu"
        class="floating-icon"
        :style="{ top: y + 'px', left: x + 'px' }"
        @mousedown.prevent="handleClick"
    >
        🔍
    </button>
    <div
        class="flex fixed z-2147483647 min-w-fit min-h-fit justify-between gap-2"
        :style="{ top: y + 'px', left: x + 'px' }"
    >
        <Menu v-if="showMenu"></Menu>
        <QMenu v-if="showQMenu"></QMenu>
    </div>
</template>
<style>
.floating-icon {
    min-height: fit;
    min-width: fit;
    position: fixed;
    z-index: 2147483647;
    background: cyan;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 18px;
    user-select: none;
    pointer-events: all;
}
</style>
