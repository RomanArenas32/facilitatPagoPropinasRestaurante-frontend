<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
    pagos: {
        type: Array,
        required: true  // Asegúrate de que los pagos sean requeridos
    }
});

// Define una variable reactiva para almacenar el total de los montos
let totalPagado = ref(0);

// Función que calcula el total de los montos cuando los pagos están disponibles
const calcularTotalPagado = () => {
    totalPagado.value = props.pagos.reduce((acumulador, pago) => acumulador += pago.monto, 0);
};

// Ejecutar la función de cálculo cuando los pagos estén disponibles
onMounted(() => {
    calcularTotalPagado();
});



const formatearDinero = (value: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formatter.format(value);
};

let totalPropinas = ref(1850);

const restaPagar = computed(() => {
    const propinas = totalPropinas.value;
    const pagado = totalPagado.value;
    return propinas - pagado;
});



</script>

<template>
    <div class="flex flex-row flex-wrap justify-evenly mx-3 mt-3 mb-10">

        <div class="flex flex-col font-bold text-2xl gap-1">
            <p class="text-[--color2]">Total Pagado</p>
            <p class="text-[--color4]">Restante por Pagar</p>
        </div>
        <div class="flex flex-col font-bold text-2xl gap-1">
            <p class="text-[--color2]">{{ formatearDinero(totalPagado) }}</p>
            <p class="text-[--color4]">{{ formatearDinero(restaPagar) }}</p>
        </div>
        <div v-if="totalPagado > 0"
            class="w-96 bg-[--color2] rounded-3xl grid place-items-center text-[--color1] font-bold text-xl h-14">
            {{ formatearDinero(totalPagado) }}
        </div>
        <div v-else
            class="w-96 bg-[--color1] border-2 border-gray-400 text-gray-400 rounded-3xl grid place-items-center font-bold text-xl h-14">
            Pagar Propinas</div>
    </div>
</template>