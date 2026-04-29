<template>
    <div
        id="badger-menu"
        class="flex flex-col bg-black/80 h-80 w-60 border border-white/20 rounded-2xl"
    >
        <CopyButtons></CopyButtons>
        <PromptsList v-model="showQMenu"></PromptsList>
    </div>
</template>

<script setup lang="ts">
import PromptsList from "@/components/promptList.vue";
import CopyButtons from "@/components/copyButtons.vue";
const showQMenu = defineModel<Boolean>();
</script>
