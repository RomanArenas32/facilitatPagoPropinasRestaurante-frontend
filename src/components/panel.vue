<script setup lang="ts">
import TicketPago from '../utils/TicketPago.vue';
import Results from './Results.vue';
import formatMoney from '../helpers/formatMoney';
import { tipCalculator } from '../helpers/tipPerEmployee';
import { ref, onMounted, computed } from 'vue';
import axios from '../config/api';
import MetodoPago from './MetodoPago.vue';
import NumberPanel from './NumberPaner.vue';

//VARIABLES GLOBALES
const solicitudPago = ref({
    metodo: "",
    monto: 0
});
const numero = ref<string[]>([]);
const ingresado = ref<number>(0);
let pagos = ref<object>([]);



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


//PETICIONES AL BACKEND

//RECIBIR LOS PAGOS HECHOS

onMounted(() => {
    axios('/pagos')
        .then(resp => { pagos.value = resp.data.pagos;})
        .catch(error => console.log(error));
});

//ENVIAR PAGO
const enviarPago = async (data: object) => {
    console.log(data)
    try {
        const resp = await axios.post('/pagos', data);
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
};






// LLENAR EL ARREGLO DE PAGOS



//comprueba si existen pagos realizados
const existenPagos = computed(() => pagos.value.length > 0);

let cantidadRestante = 2

//CALCULAR PROPINA POR PERSONA
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



//ENVIAR FORMULARIO DEL PAGO


</script>
<template>
    <div class="flex flex-col gap-10 py-6 justify-center items-center md:flex-row md:justify-center md:items-start">

        <div class="flex flex-col gap-4 justify-between w-1/3">
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
                    <input type="number"
                        class="rounded-2xl h-11 w-24 text-center border border-gray-400 focus:border-gray-400"
                        v-model="persons" required min="1" @input="updatePerson">
                    <p v-if="persons > 0" class="text-[--color2] font-extrabold text-xl">{{ formatMoney(totalPorPersona) }}
                        por
                        persona
                    </p>
                    <p v-else class="text-[--color2] font-extrabold text-xl">Coloca la cantidad de personas</p>
                </div>
            </div>

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


            <div v-if="cantidadRestante"
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