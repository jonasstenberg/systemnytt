import Vue from 'vue';
import Vuex from 'vuex';

import beers from './modules/beers';
import wines from './modules/wines';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    beers,
    wines,
  },
});
