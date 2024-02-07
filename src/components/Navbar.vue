<script setup lang="ts">
    import NavbarButtons from '../utils/NavbarButtons.vue';
    import axios from '../config/api';


    const reiniciarPagos = async()=>{
        await axios.delete('/pagos')
        .then(resp => console.log(resp.data))
        .catch(err => console.log(error))
    }
    
</script>

<template>
    <div class=" flex flex-col py-2 px-2 items-center justify-around gap-10 text-gray-400">
        <div>
            <img src="../assets/img/icon1.PNG" alt="Icono 1">
        </div>
        <div class="my-2 flex flex-col gap-4">
            <!--POR EL MOMENTO LA MAYORIA VA AL MISMO LUGAR YA QUE FALTAN DEFINIR VISTAS-->
            <NavbarButtons to="inicio" icon="circle-notch"/>
            <NavbarButtons to="inicio" icon="walkie-talkie"/>
            <NavbarButtons to="inicio" icon="receipt"/>
            <NavbarButtons to="inicio" icon="circle-dollar-to-slot"/>
            <NavbarButtons to="inicio" icon="laptop-file"/>
            <NavbarButtons to="inicio" icon="building"/>
            <NavbarButtons to="inicio" icon="desktop"/>
            <NavbarButtons to="inicio" icon="book"/>
            <NavbarButtons to="inicio" icon="tablet"/>
            <NavbarButtons to="inicio" icon="user"/>
        </div>
        <div class="my-2 flex flex-col gap-4">
            <NavbarButtons to="inicio" icon="gear"/>
            <NavbarButtons to="inicio" icon="toggle-off"/>
            <!--ESTE BOTON REINICIARA EL ARREGLO DE PAGOS SIMULANDO HABER SALIDO DE LA APP-->
            <NavbarButtons to="inicio" icon="right-to-bracket" @click="()=> reiniciarPagos()"/>
        </div>
    </div>
</template>