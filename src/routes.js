// default
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// pages
import Modals from '@/pages/Modals/Modals'
import Lk from '@/pages/Lk/Lk'
import NotFound from '@/pages/404/404'

// routering
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'modals',
      component: Modals,
    },
    {
      path: '/lk',
      name: 'lk',
      component: Lk,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});