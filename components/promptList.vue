<script setup lang="ts">
import PromptItem from "@/components/prompt.vue";
import { inject, type Ref } from "vue";
import { Prompt } from "@/utils/models";
const promptsList = inject<Ref<Prompt[]>>("promptsList");
</script>

<template>
    <div class="flex flex-col overflow-y-scroll w-full h-full">
        <PromptItem v-for="p of promptsList" :prompt="p" :key="p.id" />
    </div>
</template>
