import {createMemoryHistory, createRouter} from 'vue-router';

// import HomeView from '@/Views/HomeView.vue';
// import SobreView from '@/Views/SobreView.vue';
// import CadastroClienteView from '@/Views/CadastroClienteView.vue';

const routes = [
    {
      path: '/',
      name: "home",
      component: () => import('@/Views/HomeView.vue')
    },
    {
      path: '/consulta-cliente',
      name: 'ConsultaCliente',
      component: () => import('@/Views/ConsultaClienteView.vue')
    },
    {
      path: '/consulta-vestido',
      name: 'ConsultaVestido',
      component: () => import('@/Views/ConsultaVestidoView.vue')
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('@/Views/SobreView.vue')
    },
    {
      path: '/cadastro-cliente',
      name: "CadastroCliente",
      component: () => import('@/Views/CadastroClienteView.vue')
    },
    {
      path: '/cadastro-vestido',
      name: "CadastroVestido",
      component: () => import('@/Views/CadastroVestidoView.vue')
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
