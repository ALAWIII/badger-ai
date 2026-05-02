<template>
    <div
        id="providers-list"
        class="flex-1 flex flex-col h-full bg-gray-800/50 rounded-2xl items-center p-2 gap-1"
    >
        <div
            id="provider-header"
            class="flex flex-row w-full flex-1/12 text-center items-center border border-white/50 rounded-2xl"
        >
            <div
                class="flex-1/12 h-full w-full active:bg-white/0 hover:bg-white/20 mr-auto rounded-l-2xl border-r border-white/50 place-content-center p-1 select-none"
                @click="loadDefaultProviders"
            >
                default providers
            </div>
            <h2 class="flex-10/12">Providers</h2>
            <div
                class="flex-1/12 h-full w-full active:bg-white/0 hover:bg-white/20 mr-auto rounded-r-2xl border-l border-white/50"
                @click="createNewProvider"
            >
                <v-icon name="bi-plus-circle-dotted" class="w-full h-full" />
            </div>
        </div>
        <div
            ref="provlist"
            id="prov-list"
            class="flex-11/12 overflow-y-scroll w-full"
        >
            <ProviderItem
                v-for="p in providersList"
                :key="p.id"
                :provider="p"
            />
        </div>
        <ProviderDialog v-model:dProvider="newProvider" />
    </div>
</template>
<script setup lang="ts">
import { AIProvider } from "@/utils/models";
import ProviderItem from "./providerItem.vue";
import ProviderDialog from "./providerDialog.vue";
import {
    getProviders,
    reorderProviders,
    fetchDefaultProviders,
    saveProviders,
} from "@/utils/storage";
import { v4 } from "uuid";
import { useDraggable } from "vue-draggable-plus";

const providersList = inject<Ref<AIProvider[]>>("providersList");

onMounted(async () => {
    providersList!.value = [...(await getProviders())];
});
const newProvider = ref<AIProvider | null>(null);
function createNewProvider() {
    const p: AIProvider = {
        id: v4(),
        apiKey: "",
        name: "",
        requestTemplate: "",
        responsePath: "",
        url: "",
    };
    newProvider.value = p;
}
const provlist = ref<HTMLElement | null>(null);
const draggable = useDraggable(provlist, providersList, {
    animation: 150,

    async onUpdate() {
        await reorderProviders(providersList!.value);
    },
});

async function loadDefaultProviders() {
    const dproviders = await fetchDefaultProviders();
    const unifiedList = [...dproviders, ...providersList!.value];
    await saveProviders(unifiedList);
    providersList!.value = unifiedList;
}
</script>
