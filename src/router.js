import Vue from 'vue';
import Router from 'vue-router';
import Beverages from './views/Beverages.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'navigation__link--active',
  routes: [
    {
      path: '/',
      name: 'root',
      component: Beverages,
    },
    {
      path: '/:productGroup',
      name: 'beverages',
      component: Beverages,
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.ga('set', 'page', to.path);
  window.ga('send', 'pageview');
  next();
});

export default router;
