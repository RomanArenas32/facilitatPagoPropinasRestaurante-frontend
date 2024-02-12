<script setup lang="ts">

//SI DESEAS AGREGAR MAS METODOS DE PAGO SOLO INGRESALOS EN EL ARREGLO "posiblesPagos"
const posiblesPagos = ["efectivo", "BBVA 1234", "Santander 1234"];

const prop = defineProps<{
    selectedPago: String
}>();



const emits = defineEmits<{
    (event: 'onChangePago', value: string): void,
}>()

</script>

<template>
    <div class="text-[--color4] font-extrabold text-xl mt-10 flex flex-col gap-8"
    v-for="pago in posiblesPagos"
    :class="{'active': prop.selectedPago === pago}"
    @click="emits('onChangePago', pago)"
    >
        <div class="flex flex-wrap font-semibold text-sm gap-1 ">
            <div
                class="flex flex-col w-44 justify-center items-center gap-2 rounded-2xl shadow-xl border-2 h-36 hover:bg-[--color2] hover:text-[--color3] hover:cursor-pointer">

                <font-awesome-icon icon="money-bill-wave" />
                <p>{{ pago }}</p>
            </div>

        </div>
    </div>
</template>