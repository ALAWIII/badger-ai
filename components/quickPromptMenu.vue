<template>
    <div
        id="quick-menu"
        class="flex flex-col fixed bg-black/80 h-80 w-60 z-2147483647 border border-white/20 rounded-2xl"
    >
        <div>
            <h2>select provider</h2>
            <div>
                <input type="radio" />
                <label>deepseek</label>
            </div>
        </div>
        <div>
            <textarea>
                {{ text }}
            </textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({ text: String });
/*
fetch providers list and update the view.
*/
</script>
