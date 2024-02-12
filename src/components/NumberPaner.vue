<script setup lang="ts">
const posiblesValores = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "ok"];
// Define los props
const props = defineProps<{
    selectedMonto: String
}>();

// Define los eventos emitidos
const emits = defineEmits<{
    (event: 'onChangeMonto', value: string): string,
}>()

</script>


<template>

      <div
        
        v-for="monto in posiblesValores"
        :key="monto"
        @click="emits('onChangeMonto', monto)"
      >
        <!-- Itera sobre los posibles valores -->
        <div
          :class="{ 'active': props.selectedMonto === monto }"
          class="bg-[--color1] rounded-lg text-center text-4xl font-semibold text-[--color4] border-1 border border-gray-400 focus:border-gray-400 px-6 py-3 hover:bg-[--color3] hover:cursor-pointer"
        >
          {{ monto }}
        </div>
      </div>
 
  </template>