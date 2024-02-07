<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
const props = defineProps({
    to: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});
</script>

<template>
    <RouterLink :to="{ name: to }"
        class=" w-10 h-8 rounded-md flex justify-center items-center hover:bg-[--color2] hover:text-[--color1] hover:cursor-pointer">
        <font-awesome-icon :icon="icon" />
    </RouterLink>
</template>
