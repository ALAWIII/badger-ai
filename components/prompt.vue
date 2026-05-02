<template>
    <div class="flex w-full items-center pb-0.5 bg-gray-950/50">
        <div class="flex-11/12 overflow-hidden hover:bg-amber-50/20">
            <button
                class="w-full h-full p-2 text-center text-nowrap text-white"
                @click="sendRequest"
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
import type { Prompt, TemplateVars, AIProvider } from "@/utils/models";
import { sendPrompt } from "@/utils/api";
import { getErrorMessage } from "@/utils/errors";
const { prompt } = defineProps<{
    prompt: Prompt;
}>();
const showQMenu = inject<Ref<Prompt | null>>("showQMenu");
const showMenu = inject<Ref<boolean>>("showMenu");
const providersList = inject<Ref<AIProvider[]>>("providersList");
const selectedContent = inject<Ref<string>>("selectedContent");
const responseText = inject<Ref<string | null>>("responseText");
function toogleQMenu() {
    showQMenu!.value = showQMenu?.value == null ? prompt : null;
}
async function sendRequest() {
    if (!prompt.providerId) {
        showQMenu!.value = prompt;
        return;
    }

    const prov = providersList!.value.find((p) => {
        return p.id === prompt.providerId;
    })!;
    const tmp: TemplateVars = {
        prompt,
        provider: prov,
        selectedText: selectedContent!.value,
    };
    showQMenu!.value = null;
    showMenu!.value = false;
    try {
        const resp = await sendPrompt(tmp);
        responseText!.value = resp;
    } catch (err) {
        responseText!.value = getErrorMessage(err);
    }
}
</script>
