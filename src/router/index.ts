import { createRouter, createHashHistory } from '@posva/vue-router-next'
export default createRouter({
  history: createHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'timing'
    },
    {
      path: '/timing',
      name: 'timing',
      component: () => import('../views/timing.vue')
    }
  ]
})