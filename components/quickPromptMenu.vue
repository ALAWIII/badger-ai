<template>
    <div
        id="quick-menu"
        class="flex flex-col bg-black/80 h-80 w-60 border border-white/20 rounded-2xl p-2 min-h-fit"
    >
        <div id="providers-list" class="flex-5/12 w-full gap-0.5">
            <h3 class="text-center">select provider</h3>

            <div class="w-full">
                <input type="radio" class="mr-2" />
                <label class="text-center">deepseek</label>
            </div>
        </div>
        <div class="flex flex-col flex-7/12 gap-0.5 w-full">
            <h3 class="flex-1/12 text-center">Quick Edit</h3>
            <textarea class="flex-11/12 w-full outline-none">
                {{ selectedContent }}
            </textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from "vue";
const selectedContent = inject<Ref<String>>("selectedContent");

/*
fetch providers list and update the view.
*/
</script>
