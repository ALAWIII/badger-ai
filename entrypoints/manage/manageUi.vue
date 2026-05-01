<template>
    <div
        class="flex flex-row w-full h-full bg-gray-950 shadow-2xl shadow-white/20 rounded-2xl gap-1 text-white"
    >
        <ProviderContainer></ProviderContainer>
        <PromptContainer></PromptContainer>
    </div>
</template>
<script setup lang="ts">
import PromptContainer from "@/entrypoints/manage/promptCompo/prompts.vue";
import ProviderContainer from "@/entrypoints/manage/providerCompo/providers.vue";
const providersList = ref<AIProvider[]>([]);
const promptsList = ref<Prompt[]>([]);
provide("promptsList", promptsList);
provide("providersList", providersList);
</script>
