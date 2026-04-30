<template>
    <div class="flex flex-col w-40 h-60 bg-gray-900 justify-evenly">
        <a
            id="badger-icon"
            href="https://github.com/ALAWIII/badger-ai"
            target="_blank"
            rel="noopener noreferrer"
            class="block flex-1/2 overflow-auto bg-amber-50"
        >
            <img src="/icon.svg" alt="Badger AI repo" class="w-full h-full" />
        </a>
        <div
            id="options-button"
            class="flex-1/2 flex flex-col cursor-pointer text-white"
            @click="openSettings"
        >
            <h4 class="text-center flex-1">Add new Providers or Prompts.</h4>
            <button
                class="flex-2 mt-auto active:bg-amber-50/0 hover:bg-amber-50/10 cursor-pointer"
                type="button"
            >
                <v-icon name="bi-patch-plus" class="w-full h-20" />
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
function openSettings() {
    browser.runtime.openOptionsPage();
}
</script>
