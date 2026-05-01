<template>
    <Dialog
        v-model:visible="isOpen"
        modal
        :draggable="false"
        :closable="true"
        :style="{ width: '42rem' }"
        pt:root:class="!border !border-white/10 !bg-zinc-950 !text-white !rounded-3xl !shadow-2xl"
        pt:mask:class="backdrop-blur-sm bg-black/60"
        pt:header:class="!bg-zinc-950 !text-white !rounded-t-3xl !px-6 !pt-6 !pb-2"
        pt:content:class="!bg-zinc-950 !text-white !px-6 !pb-6 !pt-2 !rounded-b-3xl"
    >
        <template #header>
            <div class="flex flex-col gap-1">
                <h2 class="text-xl font-semibold tracking-tight">
                    Edit Prompt
                </h2>
                <p class="text-sm text-zinc-400">
                    Update label, provider, and system prompt.
                </p>
            </div>
        </template>

        <div v-if="draft" class="flex flex-col gap-5">
            <div
                class="rounded-2xl border border-white/10 bg-white/3 px-4 py-3"
            >
                <div class="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    ID
                </div>
                <div class="mt-1 break-all font-mono text-sm text-zinc-200">
                    {{ draft.id }}
                </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2 text-center">
                <div class="flex flex-col gap-2">
                    <label
                        for="prompt-label"
                        class="text-sm font-medium text-zinc-200"
                    >
                        Label
                    </label>
                    <InputText
                        id="prompt-label"
                        v-model="draft.label"
                        autocomplete="off"
                        class="w-full text-center overflow-x-scroll"
                        pt:root:class="!bg-zinc-900 !border-white/10 !text-white !rounded-xl !p-0.5"
                    />
                </div>

                <div class="flex flex-col gap-2 text-center">
                    <label
                        for="prompt-provider"
                        class="text-sm font-medium text-zinc-200"
                    >
                        Provider
                    </label>
                    <Select
                        id="prompt-provider"
                        v-model="draft.providerId"
                        :options="providerOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select provider"
                        class="w-full p-0.5"
                        pt:root:class="!bg-zinc-900 !border-white/10 !text-white !rounded-xl"
                        pt:label:class="!text-white"
                        pt:dropdown:class="!text-zinc-300"
                        pt:overlay:class="!bg-zinc-900 !border !border-white/10 !text-white !rounded-2xl"
                        pt:option:class="!text-white hover:!bg-white/10 "
                    >
                        <template #option="{ option }">
                            <div
                                class="flex items-center justify-center px-3 py-3 text-center"
                            >
                                {{ option.label }}
                            </div>
                        </template>
                    </Select>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label
                    for="prompt-system"
                    class="text-sm font-medium text-zinc-200 text-center"
                >
                    System Prompt
                </label>
                <div class="bg-white/10 p-1 rounded-2xl">
                    <Textarea
                        id="prompt-system"
                        v-model="draft.systemPrompt"
                        rows="10"
                        class="w-full h-full overflow-y-scroll"
                    />
                </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
                <div class="bg-red-500 rounded-sm p-0.5 hover:bg-red-400">
                    <Button
                        type="button"
                        label="Cancel"
                        severity="secondary"
                        text
                        @click="closeDialog"
                    />
                </div>
                <div class="bg-blue-500 rounded-sm p-0.5 hover:bg-blue-400">
                    <Button
                        class="h-full w-full"
                        type="button"
                        label="Save"
                        @click="saveDialog"
                    />
                </div>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import Button from "primevue/button";

import type { Prompt, AIProvider } from "@/utils/models";
import { upsertPrompt } from "@/utils/storage";
const providersList = inject<Ref<AIProvider[]>>("providersList", ref([]));
const promptsList = inject<Ref<Prompt[]>>("promptsList");
if (!promptsList) {
    throw new Error("promptsList was not provided");
}

const dPrompt = defineModel<Prompt | null>("dPrompt");
const draft = ref<Prompt | null>(null);

const isOpen = computed({
    get: () => dPrompt.value !== null,
    set: (value) => {
        if (!value) {
            dPrompt.value = null;
            draft.value = null;
        }
    },
});

watch(
    () => dPrompt.value,
    (value) => {
        draft.value = value ? { ...value } : null;
    },
    { immediate: true },
);

const providerOptions = computed(() => [
    { label: "None", value: null },
    ...providersList.value.map((provider) => ({
        label: `${provider.name} : ${provider.id}`,
        value: provider.id,
    })),
]);

function closeDialog() {
    dPrompt.value = null;
    draft.value = null;
}

async function saveDialog() {
    if (!draft.value) return;
    await upsertPrompt(promptsList!.value, draft.value);
    dPrompt.value = draft.value;
    closeDialog();
    await refreshPrompts();
}
async function refreshPrompts() {
    promptsList!.value = [...(await getPrompts())];
}
</script>
