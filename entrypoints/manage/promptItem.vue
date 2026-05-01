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
            class="flex-10/12 h-full hover:bg-yellow-50/10 place-content-center"
        >
            {{ prompt?.label }}
        </div>
        <div
            name="remove-button"
            class="flex-1/12 border-r-white/50 hover:bg-white/10 h-full rounded-r-2xl"
        >
            <v-icon name="bi-trash" class="h-full text-red-600" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { Prompt } from "@/utils/models";
defineProps<{
    prompt: Prompt;
}>();
</script>
