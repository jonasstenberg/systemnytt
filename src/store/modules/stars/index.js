import Vue from 'vue';

import * as types from './mutation-types';

const initialState = {
  starredBeverages: [],
};

const getters = {
  starredProductGroup: (state) => state.starredProductGroup,
  starredBeverages: (state) => state.starredBeverages,
};

const actions = {
  starProductGroup({ commit }, starredProductGroup) {
    commit(types.STAR_PRODUCT_GROUP, starredProductGroup);
  },

  starBeverages({ commit }, starredBeverages) {
    commit(types.STAR_BEVERAGES, starredBeverages);
  },
};

const mutations = {
  [types.STAR_PRODUCT_GROUP](state, starredProductGroup) {
    Vue.set(state, 'starredProductGroup', starredProductGroup);
  },

  [types.STAR_BEVERAGES](state, starredBeverages) {
    Vue.set(state, 'starredBeverages', starredBeverages);
  },

  [types.FAILURE](state, err) {
    Vue.set(state, 'error', err);
  },
};

const module = {
  namespaced: true,
  state: { ...initialState },
  getters,
  actions,
  mutations,
};

export default module;
