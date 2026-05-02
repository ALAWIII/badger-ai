<template>
    <div
        id="quick-menu"
        class="flex flex-col bg-black/80 h-80 w-60 border border-white/20 rounded-2xl p-2"
    >
        <div id="providers-list" class="flex-2/12 w-full gap-1 flex flex-col">
            <h3 class="text-center">Select provider</h3>

            <select
                v-model="selectedProviderId"
                class="w-full rounded-lg bg-zinc-900 text-white border border-white/20 px-3 py-2 outline-none"
            >
                <option :value="null">None</option>
                <option
                    v-for="provider in providersList ?? []"
                    :key="provider.id"
                    :value="provider.id"
                >
                    {{ provider.name }}
                </option>
            </select>
        </div>

        <div class="flex flex-col flex-10/12 gap-1 w-full overflow-hidden">
            <h3 class="text-center shrink-0">Quick Edit</h3>

            <textarea
                v-model="localSystemPrompt"
                placeholder="Optional system prompt..."
                class="w-full flex-1 rounded-lg bg-zinc-900 text-white border border-white/20 p-2 outline-none shrink-0 overflow-y-scroll"
            />

            <textarea
                v-model="localContent"
                placeholder="Selected Content..."
                class="flex-1 min-h-0 w-full overflow-y-scroll rounded-lg bg-zinc-900 text-white border border-white/20 p-2 outline-none"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, type Ref } from "vue";
import type { AIProvider, Prompt } from "@/utils/models";

const providersList = inject<Ref<AIProvider[]>>("providersList");
const selectedContent = inject<Ref<string>>("selectedContent");
const showQMenu = inject<Ref<Prompt | null>>("showQMenu");

const selectedProviderId = ref<string | null>(null);
const localContent = ref("");
const localSystemPrompt = ref("");
// when prompt changes, preload provider + textarea
watch(
    () => showQMenu?.value,
    (prompt) => {
        selectedProviderId.value = prompt?.providerId ?? null;
        localContent.value = selectedContent?.value ?? "";
        localSystemPrompt.value = prompt?.systemPrompt ?? "";
    },
    { immediate: true },
);

// textarea -> selectedContent
watch(localContent, (value) => {
    if (selectedContent) selectedContent.value = value;
});

// dropdown -> prompt providerId
watch(selectedProviderId, (value) => {
    if (showQMenu?.value) {
        showQMenu.value.providerId = value;
    }
});
//---------- quick modify for systemPrompt

watch(localSystemPrompt, (value) => {
    if (showQMenu?.value) {
        showQMenu.value.systemPrompt = value;
    }
});
</script>
