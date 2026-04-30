<template>
    <div
        class="flex flex-row w-full h-full bg-gray-950 shadow-2xl shadow-white/20 rounded-2xl gap-1 text-white"
    >
        <PromptContainer></PromptContainer>
        <ProviderContainer></ProviderContainer>
    </div>
</template>
<script setup lang="ts">
import PromptContainer from "@/entrypoints/manage/prompts.vue";
import ProviderContainer from "@/entrypoints/manage/providers.vue";
</script>
