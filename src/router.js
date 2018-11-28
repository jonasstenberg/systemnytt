import Vue from 'vue';
import Router from 'vue-router';
import Beers from './views/Beers.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'beers',
      component: Beers,
    },
    {
      path: '/wines',
      name: 'wines',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "wines" */ './views/Wines.vue'),
    },
  ],
});
