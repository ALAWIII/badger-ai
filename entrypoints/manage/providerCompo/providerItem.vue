<template>
    <div
        class="flex flex-row justify-between text-center items-center w-full h-[10%] border border-white/50 rounded-2xl mb-2"
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
        ></div>
        <div
            name="remove-button"
            class="flex-1/12 border-r-white/50 hover:bg-white/10 h-full rounded-r-2xl"
            @click="removeProvider"
        >
            <v-icon name="bi-trash" class="h-full text-red-600" />
        </div>
        <ProviderDialog v-model:dProvider="dProvider" />
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ProviderDialog from "./providerDialog.vue";
import { AIProvider } from "@/utils/models";
import { deleteProvider, getProviders } from "@/utils/storage";
const { provider } = defineProps<{
    provider: AIProvider;
}>();
const dProvider = ref<AIProvider | null>(null);
const providersList = inject<Ref<AIProvider[]>>("providersList");
if (!providersList) {
    throw new Error("providersList was not provided");
}
function openDialog() {
    dProvider.value = provider;
}
async function removeProvider() {
    await deleteProvider(providersList!.value, provider.id);
    providersList!.value = [...(await getProviders())];
}
</script>
