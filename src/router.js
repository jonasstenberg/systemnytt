import Vue from 'vue';
import Router from 'vue-router';
import Beverages from './views/Beverages.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      component: Beverages,
    },
    {
      path: '/:beverageType',
      name: 'beverages',
      component: Beverages,
    },
  ],
});
