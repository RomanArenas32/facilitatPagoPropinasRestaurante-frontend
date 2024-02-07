<script setup lang="ts">
import { defineProps } from 'vue';
import formatMoney from '../helpers/formatMoney';
import axios from '../config/api';


const props = defineProps({
    metodo: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    id:{
        type:String,
        required: true
    }
});
const { metodo, monto, fecha, id } = props;
const pagoRealizado = formatMoney(monto);


//BORRAR PAGO POR ID
const deleteById = async(id)=>{
   await axios.delete(`/pagos/${id}`)
    .then(resp => console.log(resp))
}

</script>



<template>
    <div
        class="shadow-xl w-96 border rounded-2xl p-4 font-bold text-[--color4] flex flex-row justify-between items-center text-xl">
        <div class="flex flex-row gap-2 items-center">
            <p v-if="metodo == 'efectivo'">
                <font-awesome-icon icon="money-bill-wave" />
            </p>
            <p v-else>
                <font-awesome-icon icon="credit-card" />
            </p>
            <p>{{ metodo }}</p>
        </div>
        <div class="flex flex-row gap-2 items-center">
            <p class="font-extrabold">{{ pagoRealizado }}</p>
            <font-awesome-icon :icon="['fas', 'xmark']" class="text-red-500" @click="()=> deleteById(id)"/>
        </div>


    </div>
</template>