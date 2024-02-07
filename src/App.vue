<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';

</script>


<template>
  <div class="flex flex-row">
    <Navbar />
    <div class="w-full px-4">
      <Header/>
      <RouterView />
    </div>
  </div>
  
</template>