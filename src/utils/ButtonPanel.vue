<script setup lang="ts">
const props = defineProps({
    valor: String,
})
</script>

<template>
    <button
        class="bg-[--color1]  rounded-lg text-center text-4xl font-semibold text-[--color4] border-1 border border-gray-400 focus:border-gray-400 px-6 py-3"
       >{{ props.valor }}</button>
</template>
