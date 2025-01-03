import { createMemoryHistory, createRouter } from 'vue-router';

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
  ,
  {
    path: '/consulta-locacao',
    name: "ConsultaLocacao",
    component: () => import('@/Views/LocacaoVestido/ConsultaLocacaoView.vue')
  },
  {
    path: '/cadastro-locacao',
    name: "CadastroLocacao",
    component: () => import('@/Views/LocacaoVestido/CadastroLocacaoView.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
