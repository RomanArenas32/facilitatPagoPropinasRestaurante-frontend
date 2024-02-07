<script setup lang="ts">
import ButtonPanel from '../utils/ButtonPanel.vue';
import TicketPago from '../utils/TicketPago.vue';
import Results from './Results.vue';
import formatMoney from '../helpers/formatMoney';
import { tipCalculator } from '../helpers/tipPerEmployee';
import { ref, onMounted, computed } from 'vue';
import axios from '../config/api';



// LLENAR EL ARREGLO DE PAGOS

let pagos = ref([]);
onMounted(() => {
    axios('/pagos')
        .then(resp => { pagos.value = resp.data.pagos; })
        .catch(error => console.log(error));
});

//comprueba si existen pagos realizados
const existenPagos = computed(() => pagos.value.length > 0);

let cantidadRestante = 2



//PANEL DE NUMEROS
let cantidadIngresada = ref(0);
let ingresarPago = ref(cantidadIngresada);

const agregarNumero = (num: number) => {
    ingresarPago.value = ingresarPago.value * 10 + num;
    cantidadIngresada.value = Number(ingresarPago.value);
};
const deleteLastNumber = () => {
    ingresarPago.value = 0;
    pago = 0;
};

const selectedOption = ref('');

const selectOption = (option: string) => {
    selectedOption.value = option;
};
const formData = ref({
    metodo: selectedOption,
    monto: cantidadIngresada,
});

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
console.log(totalPorPersona);



//ENVIAR FORMULARIO DEL PAGO
const submitForm = async (data: object) => {
    try {
        const resp = await axios.post('/pagos', { data });
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
};

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

            <div class="text-[--color4] font-extrabold text-xl mt-10 flex flex-col gap-8">
                <div class="flex flex-row items-center gap-3">
                    <font-awesome-icon icon="wallet" />
                    <p>Elige el Método de Pago</p>
                </div>
                <div class="flex flex-wrap font-semibold text-sm gap-1 ">
                    <div class="flex flex-col w-44 justify-center items-center gap-2 rounded-2xl shadow-xl border-2 h-36 hover:bg-[--color2] hover:text-[--color3] hover:cursor-pointer"
                        @click="() => selectOption('efectivo')" :class="{ 'selected': selectedOption === 'efectivo' }">
                        
                        <font-awesome-icon icon="money-bill-wave" />
                        <p>Efectivo</p>
                    </div>
                    <div class="flex flex-col w-44 justify-center items-center gap-2 rounded-2xl shadow-xl border-2 h-36 hover:bg-[--color2] hover:text-[--color3] hover:cursor-pointer"
                        name="BBVA 1234" @click="() => selectOption('Santander 1234')"
                        :class="{ 'selected': selectedOption === 'BBVA 1234' }">
                        
                        <font-awesome-icon icon="credit-card" />
                        <p>BBVA 1234</p>
                    </div>
                    <div class="flex flex-col w-44 justify-center items-center gap-2 rounded-2xl shadow-xl border-2 h-36 hover:bg-[--color2] hover:text-[--color3] hover:cursor-pointer"
                        name="Santander 1234" @click="() => selectOption('Santander 1234')"
                        :class="{ 'selected': selectedOption === 'Santander 1234' }">

                        
                        <font-awesome-icon icon="credit-card" />
                        <p>Santander 1234</p>
                    </div>
                </div>

            </div>
        </div>

        <div>
            <div
                :class="{ 'bg-gray-200 rounded-lg shadow-md py-10 px-6 h-4/5': (cantidadRestante === 0), 'bg-[--color3] border-2 border-[--color2] rounded-lg shadow-md py-10 px-6 h-4/5': (cantidadRestante !== 0) }">

                <div class="flex flex-col text-left">
                    <div class="flex flex-row justify-between gap-2 items-center">
                        <input type="number" class="bg-transparent text-3xl text-center text-[--color4]"
                            v-model="ingresarPago" />
                        <font-awesome-icon :icon="['fas', 'arrow-right']" class="hover:cursor-pointer"
                            @click="() => deleteLastNumber()" />
                    </div>
                    <hr class="mb-4 mt-2 border border-gray-400 focus:border-gray-500" />
                </div>
                <div class="grid grid-cols-3 gap-4">
                    <ButtonPanel :valor="'1'" @click="agregarNumero(1)" />
                    <ButtonPanel :valor="'2'" @click="agregarNumero(2)" />
                    <ButtonPanel :valor="'3'" @click="agregarNumero(3)" />
                    <ButtonPanel :valor="'4'" @click="agregarNumero(4)" />
                    <ButtonPanel :valor="'5'" @click="agregarNumero(5)" />
                    <ButtonPanel :valor="'6'" @click="agregarNumero(6)" />
                    <ButtonPanel :valor="'7'" @click="agregarNumero(7)" />
                    <ButtonPanel :valor="'8'" @click="agregarNumero(8)" />
                    <ButtonPanel :valor="'9'" @click="agregarNumero(9)" />
                    <ButtonPanel :valor="'00'" @click="agregarNumero(.00)" />
                    <ButtonPanel :valor="'0'" @click="agregarNumero(0)" />
                    <button
                        :class="{ 'bg-gray-200': (cantidadRestante === 0), 'bg-[--color2] text-[--color3]': (cantidadRestante !== 0) }"
                        class=" rounded-lg text-center text-4xl font-semibold text-[--color4] border-1 border border-gray-400 focus:border-gray-400"
                        @click="() => submitForm(formData)">
                        <font-awesome-icon :icon="['fas', 'check']" />
                    </button>
                </div>
                <div v-if="cantidadRestante"
                    class="w-full bg-[--color3] border-2 border-[--color2] mt-3 rounded-3xl grid place-items-center text-[--color2] font-bold text-xl h-14">
                    {{ formatMoney(cantidadRestante) }}
                </div>
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