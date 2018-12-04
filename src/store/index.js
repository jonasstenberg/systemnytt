import Vue from 'vue';
import Vuex from 'vuex';

import beverages from './modules/beverages';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    beverages,
  },
});
