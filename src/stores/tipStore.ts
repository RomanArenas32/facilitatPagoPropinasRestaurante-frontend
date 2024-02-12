import { defineStore } from "pinia";
import { ref } from "vue";



export const useTipStore = defineStore('tips', ()=>{
    const tips = ref(0);



    return {tips}
})