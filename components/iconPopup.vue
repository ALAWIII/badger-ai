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
    <Menu :x="x" :y="y" v-if="showMenu"></Menu>
</template>
<script setup lang="ts">
import Menu from "@/components/menu.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { getSelectedText, getSelectionPosition } from "@/utils/selection";
const showIcon = ref(false);
const showMenu = ref(false);
const x = ref(0);
const y = ref(0);
const selected = ref("");
function onMouseUp() {
    selected.value = getSelectedText();
    if (!selected.value) {
        showIcon.value = false;
        return;
    }

    const rect = getSelectionPosition()!;
    x.value = rect.left + rect.width / 2 - 16;
    y.value = rect.bottom + 10;
    showIcon.value = true;
}

function onMouseDown(e: MouseEvent) {
    //It hides the icon when the user clicks anywhere on the page, but keeps it visible if they click the icon itself.
    if (
        (e.target as HTMLElement).closest(".floating-icon") ||
        (e.target as HTMLElement).closest("#badger-menu")
    )
        return;

    showIcon.value = false;
    showMenu.value = false;
}

onMounted(() => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
});

onUnmounted(() => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousedown", onMouseDown);
});

function handleClick() {
    showIcon.value = false;
    showMenu.value = true;
}
</script>

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
