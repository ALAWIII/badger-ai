<template>
    <div
        id="prompts-list"
        class="flex-1 flex flex-col h-full bg-gray-800/50 rounded-2xl items-center p-2 gap-1"
    >
        <div
            name="provider-header"
            class="flex flex-row w-full flex-1/12 text-center items-center border border-white/50 rounded-2xl"
        >
            <h2 class="flex-11/12">Providers</h2>
            <div
                class="flex-1/12 h-full w-full active:bg-white/0 hover:bg-white/20 mr-auto rounded-r-2xl border-l border-white/50"
            >
                <v-icon name="bi-plus-circle-dotted" class="w-full h-full" />
            </div>
        </div>
        <div name="list" class="flex-11/12 overflow-y-scroll w-full"></div>
    </div>
</template>
<script setup lang="ts"></script>
