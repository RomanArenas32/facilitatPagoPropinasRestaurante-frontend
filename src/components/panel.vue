<script setup lang="ts">
import TicketPago from '../utils/TicketPago.vue';
import Results from './Results.vue';
import formatMoney from '../helpers/formatMoney';
import { ref, onMounted, computed } from 'vue';
import axios from '../config/api';
import MetodoPago from './MetodoPago.vue';
import NumberPanel from './NumberPaner.vue';
import PagoPorEmpleado from './PagoPorEmpleado.vue';

//VARIABLES GLOBALES
const solicitudPago = ref({
    metodo: "",
    monto: 0
});
const numero = ref<string[]>([]);
const ingresado = ref<number>(0);
let pagos = ref<any>([]);



//METODO DE PAGO
const onChangePago = (metodo: string): void => {
    solicitudPago.value.metodo = metodo;
}
//ELEGIR MONTO A PAGAR

const onChangeMonto = (monto: string): void => {
    if (monto !== "ok") {
        numero.value.push(monto);
        ingresado.value = +numero.value.join("");
        solicitudPago.value.monto = ingresado.value;
    } else {
        console.log(`Enviando pago por ${formatMoney(ingresado.value)}`);
        const datosPago = {
            metodo: solicitudPago.value.metodo,
            monto: solicitudPago.value.monto
        };
        enviarPago(datosPago);
    }
}

//BORRAR NUMERO DEL PANEL PARA ENVIAR PAGO
const borrarNumeroPanel = (): void => {
    solicitudPago.value.monto = 0;
    numero.value = [];
    ingresado.value = 0;
}

const propinas = ref(0);
//PETICIONES AL BACKEND

//CALCULAR PAGOS PROPINAS POR EMPLEADOS
const propinasEmpleados = (propina: number): void => {
    propinas.value = propina;
}

onMounted(() => {
    axios('/pagos')
        .then(resp => { pagos.value = resp.data.pagos; })
        .catch(error => console.log(error));
});

//ENVIAR PAGO
const enviarPago = async (data: object) => {
    try {
        const resp = await axios.post('/pagos', data);
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
};


//comprueba si existen pagos realizados
const existenPagos = computed(() => pagos.value.length > 0);




</script>
<template>
    <div class="flex flex-col gap-10 py-6 justify-center items-center md:flex-row md:justify-center md:items-start">

        <div class="flex flex-col gap-4 justify-between w-1/3">
            <!--TOTAL QUE LE CORRESPONDE A CADA EMPLEADO POR PROPINA-->
            <PagoPorEmpleado
            :selected-propina="propinasEmpleados" @on-change-propina="propinasEmpleados"
            />
            <!--SELECCIONA EL METODO DE PAGO-->
            <div class="flex flex-row items-center gap-3">
                <font-awesome-icon icon="wallet" />
                <p>Elige el Método de Pago</p>
            </div>
            <div class="flex flex-row gap-1">
                <MetodoPago :selected-pago="onChangePago" @on-change-pago="onChangePago" />
            </div>
        </div>


        <div
            :class="{ 'bg-gray-200 rounded-lg shadow-md py-10 px-6 h-4/5': (ingresado === 0), 'bg-[--color3] border-2 border-[--color2] rounded-lg shadow-md py-10 px-6 h-4/5': (ingresado !== 0) }">

            <div class="flex flex-col text-left">
                <div class="flex flex-row justify-between gap-2 items-center">
                    <input type="number" class="bg-transparent text-3xl text-center text-[--color4]" v-model="ingresado" />
                    <font-awesome-icon :icon="['fas', 'arrow-right']" class="hover:cursor-pointer"
                        @click="() => borrarNumeroPanel()" />
                </div>
                <hr class="mb-4 mt-2 border border-gray-400 focus:border-gray-500" />
            </div>
            <div class="grid grid-cols-3 gap-4">
                <NumberPanel :selected-monto="onChangeMonto" @on-change-monto="onChangeMonto" />
            </div>


            <div v-if="ingresado > 0"
                class="w-full bg-[--color3] border-2 border-[--color2] mt-3 rounded-3xl grid place-items-center text-[--color2] font-bold text-xl h-14">
                {{ formatMoney(ingresado) }}
            </div>
        </div>


        <div class="flex flex-col gap-4">
            <p class="text-xl font-extrabold text-[--color4]">Pagos</p>
            <div v-if="existenPagos" class="flex gap-4 flex-col">
                <TicketPago v-for="pago in pagos" :id="pago.uid" :monto="pago.monto" :metodo="pago.metodo"
                    :fecha="pago.fecha" />
            </div>
            <div v-else class="shadow-xl w-80 border rounded-xl p-4 font-bold text-[--color4]">
                <p>Sin Pagos</p>
            </div>
        </div>
    </div>
    <Results :pagos="pagos" />
</template>