<script setup lang="ts">
import { ref, computed } from 'vue';
import { tipCalculator } from '../helpers/tipPerEmployee';
import formatMoney from '../helpers/formatMoney';



const props = defineProps<{
    selectedPropina: Number
}>();

// Define los eventos emitidos
const emits = defineEmits<{
    (event: 'propinasEmpleados', value: number): number,
}>()


let persons = ref(1);
let propina = ref(0);
const updatePropina = (e: Event) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
        propina.value = inputValue;
    }
    else {
        throw new Error('El número de la propina debe ser un entero positivo.');
    }
};
const updatePerson = (e: Event) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
        persons.value = inputValue;
    }
    else {
        throw new Error('El número de empleados debe ser un entero positivo.');
    }
};
const totalPorPersona = computed(() => tipCalculator.tipPerEmployee(propina.value, persons.value));
</script>



<template>
    <div class="text-[--color2] font-bold flex flex-col w-full items-center">
        <p>Total Propinas</p>
        <div class="flex flex-row items-center gap-2">
            <input type="number" class="w-56 bg-[--color3] rounded-md text-4xl py-2 text-center" min="1"
                @input="updatePropina" v-model="propina">
            <font-awesome-icon icon="edit" size="2x" class="text-[--color4]" />
        </div>
    </div>
    <div>
        <p class="font-extrabold text-[--color4] text-xl">Entre cuántos quieres dividir las Propinas?</p>
        <div class="flex flex-row gap-6 my-4 items-center">
            <input type="number" class="rounded-2xl h-11 w-24 text-center border border-gray-400 focus:border-gray-400"
                v-model="persons" required min="1" @input="updatePerson">
            <p v-if="persons > 0" class="text-[--color2] font-extrabold text-xl">{{ formatMoney(totalPorPersona) }}
                por
                persona
            </p>
            <p v-else class="text-[--color2] font-extrabold text-xl">Coloca la cantidad de personas</p>
        </div>
    </div>
</template>