<script setup lang="ts">
import { ref } from 'vue';
/*import { useMoney } from '../store/money';
const money = useMoney();
*/

const dineroEnCaja = ref(5000);

const formatearDinero = (value:number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return formatter.format(value);
};
</script>

<template>
    <header class="flex flex-row justify-between py-4">
        <div class="flex flex-row gap-4 items-center">
            <div class="text-[--color2] flex flex-row gap-2 items-center font-bold hover:cursor-pointer">                
                <font-awesome-icon :icon="['fas', 'less-than']" />              
                <a href="">Atras</a>
            </div>
            <h1 class="text-3xl font-extrabold text-[--color4]">Pago de Propinas</h1>
        </div>
        <div class="text-[--color2] font-bold">
            <p class="text-sm text-right">Efectivo en Caja</p>
            <div class="bg-[--color3] rounded-md text-4xl py-2 px-3">{{ formatearDinero(dineroEnCaja) }}</div>
        </div>
    </header>
    <hr class="border border-gray-400 focus:border-gray-400">
</template>
