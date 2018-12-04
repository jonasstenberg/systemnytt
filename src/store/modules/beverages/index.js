import Vue from 'vue';

import * as types from './mutation-types';
import bolaget from '../../../api/bolaget';

const initialState = {
  beverages: [],
  loading: false,
};

const getters = {
  beverages: state => state.beverages,
  loading: state => state.loading,
};

const actions = {
  async fetchBeverages({ commit }) {
    commit(types.SET_LOADING, true);

    const beverages = await bolaget();

    commit(types.FETCH_BEVERAGES, beverages);

    commit(types.SET_LOADING, false);
  },
};

const mutations = {
  [types.SET_LOADING](state, loading) {
    Vue.set(state, 'loading', loading);
  },

  [types.FETCH_BEVERAGES](state, beverages) {
    Vue.set(state, 'beverages', beverages);
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
