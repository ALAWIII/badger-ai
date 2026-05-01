<template>
    <div
        id="prompts-list"
        class="flex-1 flex flex-col h-full bg-gray-800/50 rounded-2xl items-center p-2 gap-1"
    >
        <div
            id="prompts-header"
            class="flex flex-row w-full flex-1/12 text-center items-center border border-white/50 rounded-2xl"
        >
            <h2 class="flex-11/12">Prompts</h2>
            <div
                class="flex-1/12 h-full w-full active:bg-white/0 hover:bg-white/20 mr-auto rounded-r-2xl border-l border-white/50"
                @click="createNewPrompt"
            >
                <v-icon name="bi-plus-circle-dotted" class="w-full h-full" />
            </div>
        </div>
        <div
            ref="promlist"
            id="prom-list"
            class="flex-11/12 overflow-y-scroll w-full"
        >
            <PromptItem v-for="p in promptsList" :key="p.id" :prompt="p" />
        </div>
        <PromptDialog v-model:dPrompt="newPrompt" />
    </div>
</template>
<script setup lang="ts">
import { getPrompts, reorderPrompts } from "@/utils/storage";
import { Prompt } from "@/utils/models";
import { ref, onMounted } from "vue";
import PromptItem from "./promptItem.vue";
import PromptDialog from "./PromptDialog.vue";
import { useDraggable } from "vue-draggable-plus";
import { v4 } from "uuid";
const promptsList = inject<Ref<Prompt[]>>("promptsList");
onMounted(async () => {
    promptsList!.value = [...(await getPrompts())];
});
const newPrompt = ref<Prompt | null>(null);
function createNewPrompt() {
    const p: Prompt = { id: v4(), label: "", providerId: "", systemPrompt: "" };
    newPrompt.value = p;
}
const promlist = ref<HTMLElement | null>(null);
const draggable = useDraggable(promlist, promptsList, {
    animation: 150,

    async onUpdate() {
        await reorderPrompts(promptsList!.value);
    },
});
</script>
