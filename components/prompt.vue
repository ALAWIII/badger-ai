<template>
    <div :key class="flex flex-row w-full border border-white/30">
        <span>prompt label</span>
        <div class="">
            <button><v-icon name="md-navigatenext-twotone" /></button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({ key: Number });
</script>
