
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'inicio' },
      { path: 'casas', component: () => import('pages/Casas.vue'), name: 'casas' },
      { path: 'edificios', component: () => import('pages/Edificios.vue'), name: 'edificios' },
      { path: 'edificio/:id_edificio/departamentos', component: (id_edificio) => import('pages/EdificioDepartamentos.vue'), name: 'departamentos' },
      { path: 'edificio/departamento/:id_departamento/pagos', component: (id_departamento) => import('pages/DepartamentoPagos.vue'), name: 'departamentoPagos' },
      { path: 'contrato/:id_contrato/pago/nuevo', component: (id_contrato) => import('pages/NuevoPago.vue'), name: 'pagoNuevo' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
