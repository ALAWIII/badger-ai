<template>
    <button
        id="popupicon"
        v-if="visible"
        class="floating-icon"
        :style="{ top: y + 'px', left: x + 'px' }"
        @mousedown.prevent="handleClick"
    >
        🔍
    </button>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
const x = ref(0);
const y = ref(0);

function onMouseUp() {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text) {
        visible.value = false;
        return;
    }
    const rect = selection!.getRangeAt(0).getBoundingClientRect();
    x.value = rect.left + rect.width / 2;
    y.value = rect.bottom + 5;
    visible.value = true;
}

function onMouseDown(e: MouseEvent) {
    if ((e.target as HTMLElement).closest(".floating-icon")) return;

    visible.value = false;
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
    const text = window.getSelection()?.toString();
    console.log("Selected:", text);
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
