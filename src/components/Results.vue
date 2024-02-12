<script setup lang="ts">
import { ref, computed } from 'vue';
import formatMoney from '../helpers/formatMoney';


const props = defineProps<{
    pagos: Array<any> 
}>();

const totalPagado = computed(()=>{
    return props.pagos.reduce((total, pago) => (total += pago.monto), 0);
});



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
            <p class="text-[--color2]">{{ formatMoney(totalPagado) }}</p>
            <p class="text-[--color4]">{{ formatMoney(restaPagar) }}</p>
        </div>
        <div v-if="totalPagado > 0"
            class="w-96 bg-[--color2] rounded-3xl grid place-items-center text-[--color1] font-bold text-xl h-14">
            {{ formatMoney(totalPagado) }}
        </div>
        <div v-else
            class="w-96 bg-[--color1] border-2 border-gray-400 text-gray-400 rounded-3xl grid place-items-center font-bold text-xl h-14">
            Pagar Propinas</div>
    </div>
</template>