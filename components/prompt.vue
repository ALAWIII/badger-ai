<template>
    <div class="flex w-full items-center pb-0.5 bg-gray-950/50">
        <div class="flex-11/12 overflow-hidden hover:bg-amber-50/20">
            <button
                class="w-full h-full p-2 text-center text-nowrap text-white"
            >
                {{ prompt.label }}
            </button>
        </div>
        <div
            class="flex-1/12 ml-auto border-l border-white/50 hover:bg-amber-50/20"
        >
            <button class="p-2 w-full h-full text-white" @click="toogleQMenu">
                <v-icon name="md-navigatenext-twotone" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from "vue";
import type { Prompt } from "@/utils/models";
const { prompt } = defineProps<{
    prompt: Prompt;
}>();
const showQMenu = inject<Ref<Boolean>>("showQMenu");
function toogleQMenu() {
    showQMenu!.value = !showQMenu!.value;
}
</script>
