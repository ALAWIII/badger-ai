<template>
    <div
        class="flex flex-col max-w-120 min-w-fit max-h-80 min-h-fit overflow-hidden gap-2 rounded-2xl border border-white/20 bg-black/80 p-2"
    >
        <div class="flex justify-end">
            <button
                type="button"
                class="rounded-lg border border-white/20 px-3 py-1 text-sm hover:bg-white/10 text-white"
                @click="copyResponse"
            >
                {{ copied ? "Copied" : "Copy" }}
            </button>
        </div>

        <div
            class="overflow-y-scroll whitespace-pre-wrap wrap-break-words rounded-lg bg-zinc-900 p-3 text-white"
        >
            {{ responseText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from "vue";

const responseText = inject<Ref<string | null>>("responseText");
const copied = ref(false);

async function copyResponse() {
    if (!responseText?.value) return;

    try {
        await navigator.clipboard.writeText(responseText.value);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 1200);
    } catch (error) {
        console.error("Copy failed", error);
    }
}
</script>
