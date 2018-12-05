import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import beverages from './modules/beverages';
import stars from './modules/stars';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    beverages,
    stars,
  },
  plugins: [
    createPersistedState({
      key: 'systemnytt',
      paths: [
        'stars',
      ],
      storage: window.localStorage,
    }),
  ],
});
