<template>
    <div
        class="flex flex-row justify-between text-center items-center w-full h-[10%] border border-white/50 rounded-2xl"
    >
        <div
            name="drag-button"
            class="flex-1/12 border-l-white/50 h-full hover:bg-white/10 rounded-l-2xl"
        >
            <v-icon name="fa-sort" class="h-full text-green-500" />
        </div>
        <div
            name="prompt-label"
            class="flex-10/12 h-full hover:bg-yellow-50/10 place-content-center cursor-pointer"
            @click="openDialog"
        >
            {{ prompt?.label }}
        </div>
        <div
            name="remove-button"
            class="flex-1/12 border-r-white/50 hover:bg-white/10 h-full rounded-r-2xl"
        >
            <v-icon name="bi-trash" class="h-full text-red-600" />
        </div>
        <PromptDialog v-model:dPrompt="dPrompt" :providers="providersList" />
    </div>
</template>
<script setup lang="ts">
import { ref, inject, type Ref } from "vue";
import PromptDialog from "./PromptDialog.vue";
import { AIProvider, Prompt } from "@/utils/models";
const { prompt } = defineProps<{
    prompt: Prompt;
}>();
const dPrompt = ref<Prompt | null>(null);
function openDialog() {
    dPrompt.value = prompt;
}
const providersList = inject<Ref<AIProvider[]>>("providersList", ref([]));
</script>
