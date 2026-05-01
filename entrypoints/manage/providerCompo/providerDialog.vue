<template>
    <Dialog
        v-model:visible="isOpen"
        modal
        :draggable="false"
        :closable="true"
        :style="{ width: '52rem' }"
        pt:root:class="!border !border-white/10 !bg-zinc-950 !text-white !rounded-3xl !shadow-2xl"
        pt:mask:class="backdrop-blur-sm bg-black/60"
        pt:header:class="!bg-zinc-950 !text-white !rounded-t-3xl !px-6 !pt-6 !pb-2"
        pt:content:class="!bg-zinc-950 !text-white !px-6 !pb-6 !pt-2 !rounded-b-3xl"
    >
        <template #header>
            <div class="flex flex-col gap-1">
                <h2 class="text-xl font-semibold tracking-tight">
                    Edit Provider
                </h2>
                <p class="text-sm text-zinc-400">
                    Update provider settings and request template.
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
                        for="provider-name"
                        class="text-sm font-medium text-zinc-200"
                    >
                        Name
                    </label>
                    <InputText
                        id="provider-name"
                        v-model="draft.name"
                        autocomplete="off"
                        class="w-full text-center"
                        pt:root:class="!bg-zinc-900 !border-white/10 !text-white !rounded-xl !p-0.5"
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label
                        for="provider-model"
                        class="text-sm font-medium text-zinc-200"
                    >
                        Model
                    </label>
                    <InputText
                        id="provider-model"
                        v-model="draft.model"
                        autocomplete="off"
                        class="w-full text-center"
                        pt:root:class="!bg-zinc-900 !border-white/10 !text-white !rounded-xl !p-0.5"
                    />
                </div>
            </div>

            <div class="grid gap-5 md:grid-cols-2 text-center">
                <div class="flex flex-col gap-2">
                    <label
                        for="provider-url"
                        class="text-sm font-medium text-zinc-200"
                    >
                        URL
                    </label>
                    <InputText
                        id="provider-url"
                        v-model="draft.url"
                        autocomplete="off"
                        class="w-full text-center"
                        pt:root:class="!bg-zinc-900 !border-white/10 !text-white !rounded-xl !p-0.5"
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label
                        for="provider-response-path"
                        class="text-sm font-medium text-zinc-200"
                    >
                        Response Path
                    </label>
                    <InputText
                        id="provider-response-path"
                        v-model="draft.responsePath"
                        autocomplete="off"
                        class="w-full text-center"
                        pt:root:class="!bg-zinc-900 !border-white/10 !text-white !rounded-xl !p-0.5"
                    />
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <label
                    for="provider-api-key"
                    class="text-sm font-medium text-zinc-200 text-center"
                >
                    API Key
                </label>
                <InputText
                    id="provider-api-key"
                    v-model="draft.apiKey"
                    type="password"
                    autocomplete="off"
                    class="w-full text-center"
                    pt:root:class="!bg-zinc-900 !border-white/10 !text-white !rounded-xl !p-0.5"
                />
            </div>

            <div class="flex flex-col gap-2">
                <label
                    for="provider-request-template"
                    class="text-sm font-medium text-zinc-200 text-center"
                >
                    Request Template
                </label>
                <div class="bg-white/10 p-1 rounded-2xl">
                    <Textarea
                        id="provider-request-template"
                        v-model="draft.requestTemplate"
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
import { computed, inject, ref, watch, type Ref } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

import type { AIProvider } from "@/utils/models";
import { getProviders, upsertProvider } from "@/utils/storage";

const providersList = inject<Ref<AIProvider[]>>("providersList");
if (!providersList) {
    throw new Error("providersList was not provided");
}

const dProvider = defineModel<AIProvider | null>("dProvider");
const draft = ref<AIProvider | null>(null);

const isOpen = computed({
    get: () => dProvider.value !== null,
    set: (value) => {
        if (!value) {
            dProvider.value = null;
            draft.value = null;
        }
    },
});

watch(
    () => dProvider.value,
    (value) => {
        draft.value = value
            ? {
                  ...value,
                  model: value.model ?? "",
              }
            : null;
    },
    { immediate: true },
);

function closeDialog() {
    dProvider.value = null;
    draft.value = null;
}

async function saveDialog() {
    if (!draft.value) return;

    const providerToSave: AIProvider = {
        ...draft.value,
        model: draft.value.model?.trim() ? draft.value.model : undefined,
    };

    await upsertProvider(providersList!.value, providerToSave);
    dProvider.value = providerToSave;
    closeDialog();
    providersList!.value = [...(await getProviders())];
}
</script>
