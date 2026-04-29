<script setup lang="ts">
import Prompt from "@/components/prompt.vue";
</script>

<template>
    <div class="flex flex-col overflow-y-scroll w-full h-full">
        <Prompt v-for="n in 10" :key="n" />
    </div>
</template>
