<template>
    <div
        id="badger-menu"
        class="flex flex-col fixed bg-black/80 h-80 w-60 z-2147483647 border border-white/20 rounded-2xl"
        :style="{ top: y + 'px', left: x + 'px' }"
    >
        <CopyButtons></CopyButtons>
    </div>
</template>

<script setup lang="ts">
import CopyButtons from "@/components/copyButtons.vue";
defineProps<{ x: number; y: number }>();
</script>
