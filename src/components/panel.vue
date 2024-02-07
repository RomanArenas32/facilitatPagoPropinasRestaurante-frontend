<script setup lang="ts">
import ButtonPanel from '../utils/ButtonPanel.vue';
import TicketPago from '../utils/TicketPago.vue';
import Results from './Results.vue';
import formateMoney from '../helpers/formatMoney';
import { ref, onMounted, computed } from 'vue';
import axios from '../config/api';

// LLENAR EL ARREGLO DE PAGOS
let pagos = ref([]);
onMounted(() => {
   axios('/pagos')
    .then(resp => { pagos.value = resp.data.pagos;})
    .catch(error => console.log(error));
});

//comprueba si existen pagos realizados
const existenPagos = computed(()=> pagos.value.length > 0);

let persons = ref(1)
let total = 80;
let pago = 0;
</script>
<template>
    <div class="flex flex-col gap-10 py-6 justify-center items-center md:flex-row md:justify-between md:items-start">

        <div class="flex flex-col gap-4 justify-between w-1/3">
            <div class="text-[--color2] font-bold flex flex-col w-full items-center">
                <p>Total Propinas</p>
                <div class="flex flex-row items-center gap-2">
                    <input type="number" class="w-56 bg-[--color3] rounded-md text-4xl py-2 text-center" min="1">
                    <font-awesome-icon icon="edit" size="2x" class="text-[--color4]" />
                </div>
            </div>
            <div>
                <p class="font-extrabold text-[--color4] text-xl">Entre cuántos quieres dividir las Propinas?</p>
                <div class="flex flex-row gap-6 my-4 items-center">
                    <input type="number"
                        class="rounded-2xl h-11 w-24 text-center border border-gray-400 focus:border-gray-400"
                        v-model="persons" required min="1">
                    <p v-if="persons > 0" class="text-[--color2] font-extrabold text-xl">{{ total }} por
                        persona
                    </p>
                    <p v-else class="text-[--color2] font-extrabold text-xl">Coloca la cantidad de personas</p>
                </div>
            </div>

            <div class="text-[--color4] font-extrabold text-xl mt-10 flex flex-col gap-8">
                <div class="flex flex-row items-center gap-3">
                    <font-awesome-icon icon="wallet" />
                    <p>Elige el Método de Pago</p>
                </div>
                <div class="flex flex-wrap font-semibold text-sm gap-1 ">
                    <div class="flex flex-col w-44 justify-center items-center gap-2 rounded-2xl shadow-xl border-2 h-36 hover:bg-[--color2] hover:text-[--color3] hover:cursor-pointer">
                        <font-awesome-icon icon="money-bill-wave" />
                        <p>Efectivo</p>
                    </div>
                    <div class="flex flex-col w-44 justify-center items-center gap-2 rounded-2xl shadow-xl border-2 h-36 hover:bg-[--color2] hover:text-[--color3] hover:cursor-pointer">
                        <font-awesome-icon icon="credit-card" />
                        <p>BBVA 1234</p>
                    </div>
                    <div class="flex flex-col w-44 justify-center items-center gap-2 rounded-2xl shadow-xl border-2 h-36 hover:bg-[--color2] hover:text-[--color3] hover:cursor-pointer">
                        <font-awesome-icon icon="credit-card" />
                        <p>Santander 1234</p>
                    </div>
                </div>

            </div>
        </div>

        <div>
            <div
                :class="{ 'bg-gray-200 rounded-lg shadow-md py-10 px-6 h-4/5': (pago === 0), 'bg-[--color3] border-2 border-[--color2] rounded-lg shadow-md py-10 px-6 h-4/5': (pago !== 0) }">

                <div class="flex flex-col text-left">
                    <div class="flex flex-row justify-between gap-2 items-center">
                        <input type="number" class="bg-transparent text-3xl text-center text-[--color4]"/>
                        <font-awesome-icon :icon="['fas', 'arrow-right']" class="hover:cursor-pointer"/>
                    </div>
                    <hr class="mb-4 mt-2 border border-gray-400 focus:border-gray-500" />
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <ButtonPanel :valor="'1'"  />
                    <ButtonPanel :valor="'2'" />
                    <ButtonPanel :valor="'3'"  />
                    <ButtonPanel :valor="'4'" />
                    <ButtonPanel :valor="'5'"  />
                    <ButtonPanel :valor="'6'"  />
                    <ButtonPanel :valor="'7'"  />
                    <ButtonPanel :valor="'8'"  />
                    <ButtonPanel :valor="'9'"  />
                    <ButtonPanel :valor="'00'" />
                    <ButtonPanel :valor="'0'"  />
                    <button :class="{ 'bg-gray-200': (pago === 0), 'bg-[--color2] text-[--color3]': (pago !== 0) }"
                        class=" rounded-lg text-center text-4xl font-semibold text-[--color4] border-1 border border-gray-400 focus:border-gray-400">
                        <font-awesome-icon :icon="['fas', 'check']" />
                    </button>
                </div>
                <div class="w-full bg-[--color3] border-2 border-[--color2] mt-3 rounded-3xl grid place-items-center text-[--color2] font-bold text-xl h-14">
                    {{ total }}
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <p class="text-xl font-extrabold text-[--color4]">Pagos</p>
            <div v-if="existenPagos" class="flex gap-4 flex-col">
                <TicketPago
                    v-for="pago in pagos"
                    :id="pago.uid"
                    :monto="pago.monto"
                    :metodo="pago.metodo"
                    :fecha="pago.fecha"
                />
            </div>
            <div v-else class="shadow-xl w-80 border rounded-xl p-4 font-bold text-[--color4]">
                <p>Sin Pagos</p>
            </div>
        </div>
    </div>
    <Results
    :pagos="pagos"
    />
</template>