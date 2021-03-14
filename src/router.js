import {
    createWebHistory,
    createRouter
} from 'vue-router'
import Landing from "@/views/Landing.vue"
const routes = [{
    path: "/",
    name: 'landing',
    component: Landing
}]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router