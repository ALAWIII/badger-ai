<template>
    <div
        class="flex flex-row justify-between text-center items-center w-full h-[10%] border border-white/50"
    >
        <div
            name="drag-button"
            class="flex-1/12 border-l-white/50 h-full hover:bg-white/10"
        >
            <v-icon name="fa-sort" class="text-green-500" />
        </div>
        <div name="prompt-label" class="flex-10/12"></div>
        <div
            name="remove-button"
            class="flex-1/12 border-r-white/50 hover:bg-white/50"
        >
            <v-icon name="bi-trash" class="text-red-600" />
        </div>
    </div>
</template>
<script setup lang="ts"></script>
