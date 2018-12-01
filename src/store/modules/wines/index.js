import Vue from 'vue';

import * as types from './mutation-types';
import bolaget from '../../../api/bolaget';

const initialState = {
  wines: [],
  loading: false,
};

const getters = {
  wines: state => state.wines,
  loading: state => state.loading,
};

const actions = {
  async fetchWines({ commit }) {
    commit(types.SET_LOADING, true);

    const wines = await bolaget('Vin');

    commit(types.FETCH_WINES, wines.map((b) => {
      let title = '';
      title += b.name ? `${b.name} ` : '';
      title += b.additionalName ? `${b.additional_name} ` : '';
      title += b.year ? `(${b.year})` : '';

      return Object.assign({}, b, { title });
    }));

    commit(types.SET_LOADING, false);
  },
};

const mutations = {
  [types.SET_LOADING](state, loading) {
    Vue.set(state, 'loading', loading);
  },

  [types.FETCH_WINES](state, wines) {
    Vue.set(state, 'wines', wines);
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
