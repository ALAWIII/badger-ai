<template>
    <div
        id="copy-buttons-container"
        class="flex flex-row justify-evenly rounded-2xl w-full h-[15%] p-1"
    >
        <!-- copy buttons -->
        <div
            id="copy-text"
            class="bg-black rounded-l-2xl border text-white w-full h-full hover:bg-amber-50/20"
        >
            <button class="w-full h-full" @click="selectText">
                <v-icon name="md-contentcopy-round" class="h-[70%] w-[70%]" />
            </button>
        </div>
        <div
            id="copy-html"
            class="bg-black rounded-r-2xl border text-white w-full h-full hover:bg-amber-50/20"
        >
            <button class="w-full h-full" @click="selectHtml">
                <v-icon name="la-html5" class="h-[70%] w-[70%]" />
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
const selectedContent = inject<Ref<string>>("selectedContent");
const globalSelection = inject<Ref<Selection | null>>("globalSelection");
function selectText() {
    selectedContent!.value = getSelectedText(globalSelection?.value);
}
function selectHtml() {
    selectedContent!.value = getSelectedHtml(globalSelection?.value);
}
</script>
