import {createMemoryHistory, createRouter} from 'vue-router';

// import HomeView from '@/Views/HomeView.vue';
// import SobreView from '@/Views/SobreView.vue';
// import CadastroClienteView from '@/Views/CadastroClienteView.vue';

const routes = [
    {path: '/', component: () => import('@/Views/HomeView.vue')},
    {path: '/cadastro-cliente', component: () => import('@/Views/CadastroClienteView.vue')},
    {path: '/sobre', component: () => import('@/Views/SobreView.vue')},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;