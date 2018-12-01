import Vue from 'vue';

import * as types from './mutation-types';
import bolaget from '../../../api/bolaget';

const initialState = {
  beers: [],
  loading: false,
};

const getters = {
  beers: state => state.beers,
  loading: state => state.loading,
};

const actions = {
  async fetchBeers({ commit }) {
    commit(types.SET_LOADING, true);

    const beers = await bolaget('Öl');

    commit(types.FETCH_BEERS, beers.map((b) => {
      let title = '';
      title += b.name ? `${b.name} ` : '';
      title += b.additionalName ? `${b.additional_name} ` : '';
      title += b.alcohol ? `(${b.alcohol})` : '';

      return Object.assign({}, b, { title });
    }));

    commit(types.SET_LOADING, false);
  },
};

const mutations = {
  [types.SET_LOADING](state, loading) {
    Vue.set(state, 'loading', loading);
  },

  [types.FETCH_BEERS](state, beers) {
    Vue.set(state, 'beers', beers);
  },

  [types.FAILURE](state, err) {
    Vue.set(state, 'error', err);
  },
};

const module = {
  namespaced: true,
  state: Object.assign({}, initialState),
  getters,
  actions,
  mutations,
};

export default module;
