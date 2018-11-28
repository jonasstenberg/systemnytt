import Vue from 'vue';
import Router from 'vue-router';
import Beers from './views/Beers.vue';
import Wines from './views/Wines.vue';

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
      component: Wines,
    },
  ],
});
