import Vue from 'vue';

import * as types from './mutation-types';
import bolaget from '../../../api/bolaget';

const initialState = {
  beverages: {},
  menuItems: [],
  loading: false,
  error: null,
};

const getters = {
  beverages: state => state.beverages,
  menuItems: state => state.menuItems,
  loading: state => state.loading,
  error: state => state.error,
};

const actions = {
  async fetchBeverages({ commit }) {
    commit(types.SET_LOADING, true);

    try {
      const result = await bolaget();

      const groupBy = (xs, key) => xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x); // eslint-disable-line
        return rv;
      }, {});

      const groupedResult = groupBy(result, 'product_group');

      Object.keys(groupedResult).forEach((key) => {
        groupedResult[key] = groupedResult[key].map((beverage) => {
          let title = '';
          title += beverage.name ? `${beverage.name} ` : '';
          title += beverage.additional_name ? `${beverage.additional_name} ` : '';
          title += beverage.alcohol ? `(${beverage.alcohol}) ` : '';
          title += beverage.year ? `(${beverage.year}) ` : '';
          return Object.assign({}, beverage, { title });
        });
      });

      const menuItems = Object.keys(groupedResult)
        .map(beverage => ({ key: beverage, len: groupedResult[beverage].length }))
        .sort((a, b) => b.len - a.len);

      commit(types.FETCH_BEVERAGES, groupedResult);
      commit(types.SET_MENU_ITEMS, menuItems);
      commit(types.SET_LOADING, false);
    } catch (err) {
      commit(types.FAILURE, err);
    }
  },
};

const mutations = {
  [types.SET_LOADING](state, loading) {
    Vue.set(state, 'loading', loading);
  },

  [types.FETCH_BEVERAGES](state, beverages) {
    Vue.set(state, 'beverages', beverages);
  },

  [types.SET_MENU_ITEMS](state, menuItems) {
    Vue.set(state, 'menuItems', menuItems);
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
