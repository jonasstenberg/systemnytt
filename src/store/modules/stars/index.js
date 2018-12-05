import Vue from 'vue';

import * as types from './mutation-types';

const getters = {
  starredProductGroup: state => state.starredProductGroup,
};

const actions = {
  starProductGroup({ commit }, starredProductGroup) {
    commit(types.STAR_PRODUCT_GROUP, starredProductGroup);
  },
};

const mutations = {
  [types.STAR_PRODUCT_GROUP](state, starredProductGroup) {
    Vue.set(state, 'starredProductGroup', starredProductGroup);
  },

  [types.FAILURE](state, err) {
    Vue.set(state, 'error', err);
  },
};

const module = {
  namespaced: true,
  getters,
  actions,
  mutations,
};

export default module;

