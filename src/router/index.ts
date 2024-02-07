import { createRouter, createWebHistory } from "vue-router";
import TipsView from "../views/TipsView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'inicio',
            component: TipsView
        },
    ]
})



export default router;