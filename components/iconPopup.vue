<script setup lang="ts">
import QMenu from "./quickPromptMenu.vue";
import Menu from "@/components/menu.vue";
import ResponseCard from "./responseCard.vue";
import { ref, onMounted, onUnmounted, provide, nextTick, watch } from "vue";
import { getSelectedText, getSelectionPosition } from "@/utils/selection";
import { Prompt, AIProvider } from "@/utils/models";
import { getPrompts, getProviders } from "@/utils/storage";

const showIcon = ref(false);
const showMenu = ref(false);
const showQMenu = ref<Prompt | null>(null);

const x = ref(0);
const y = ref(0);

const menuX = ref(0);
const menuY = ref(0);

const selectedContent = ref("");
const globalSelection = ref<Selection | null>(null);
const promptsList = ref<Prompt[]>([]);
const providersList = ref<AIProvider[]>([]);
const responseText = ref<string | null>(null);

const menuContainer = ref<HTMLElement | null>(null);

provide("responseText", responseText);
provide("globalSelection", globalSelection);
provide("showQMenu", showQMenu);
provide("showMenu", showMenu);
provide("selectedContent", selectedContent);
provide("providersList", providersList);
provide("promptsList", promptsList);

const showDelayedIcon = ref(false);
let iconTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleIcon() {
    showDelayedIcon.value = false;

    if (iconTimer) clearTimeout(iconTimer);

    iconTimer = setTimeout(() => {
        showDelayedIcon.value = true;
    }, 400);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

async function adjustMenuPosition() {
    await nextTick();
    if (!menuContainer.value) return;

    const rect = menuContainer.value.getBoundingClientRect();
    const padding = 12;

    menuX.value = clamp(
        x.value,
        padding,
        Math.max(padding, window.innerWidth - rect.width - padding),
    );

    menuY.value = clamp(
        y.value,
        padding,
        Math.max(padding, window.innerHeight - rect.height - padding),
    );
}

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

    menuX.value = x.value;
    menuY.value = y.value;

    showIcon.value = true;
    scheduleIcon();
}

function onMouseDown(e: MouseEvent) {
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
    window.addEventListener("resize", adjustMenuPosition);
});

onUnmounted(() => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("resize", adjustMenuPosition);
});

async function handleClick() {
    showIcon.value = false;
    showMenu.value = true;
    showQMenu.value = null;

    promptsList.value = await getPrompts();
    providersList.value = await getProviders();

    await adjustMenuPosition();
}

watch(
    () => [showMenu.value, showQMenu.value, responseText.value],
    async ([menu, qmenu, response]) => {
        if (menu || qmenu != null || response != null) {
            await adjustMenuPosition();
        }
    },
    { deep: true },
);

const iconUrl = browser.runtime.getURL("/icon.svg");
</script>

<template>
    <button
        id="badger-popupicon"
        v-if="showIcon && showDelayedIcon && !showMenu"
        class="fixed z-2147483647 min-w-fit min-h-fit rounded-lg bg-yellow-50 shadow-md cursor-pointer select-none pointer-events-auto"
        :style="{ top: `${y}px`, left: `${x}px` }"
        @mousedown.prevent="handleClick"
    >
        <img :src="iconUrl" alt="Popup icon" class="w-6 h-6" />
    </button>

    <div
        ref="menuContainer"
        id="menu-response-container"
        class="flex fixed z-2147483647 min-w-fit min-h-fit justify-between gap-2"
        :style="{ top: `${menuY}px`, left: `${menuX}px` }"
    >
        <Menu v-if="showMenu" />
        <QMenu v-if="showQMenu != null" />
        <ResponseCard v-if="responseText != null" />
    </div>
</template>
