import Vue from 'vue';

import * as types from './mutation-types';
import sortOptions from './sort-options';
import bolaget from '../../../api/bolaget';

const initialState = {
  beverages: {},
  sortBy: sortOptions[0].key,
  menuItems: [],
  loading: false,
};

const getters = {
  beverages: state => state.beverages,
  sortBy: state => state.sortBy,
  menuItems: state => state.menuItems,
  loading: state => state.loading,
};

const actions = {
  async fetchBeverages({ commit }) {
    commit(types.SET_LOADING, true);

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
        return Object.assign({}, beverage, {
          title,
          price: beverage.price.amount,
        });
      });
    });

    const menuItems = Object.keys(groupedResult)
      .map(beverage => ({ key: beverage, len: groupedResult[beverage].length }))
      .sort((a, b) => b.len - a.len);

    commit(types.FETCH_BEVERAGES, groupedResult);
    commit(types.SET_MENU_ITEMS, menuItems);
    commit(types.SET_LOADING, false);
  },

  setBeverages({ commit }, beverages) {
    commit(types.FETCH_BEVERAGES, beverages);
  },

  setSortBy({ commit }, sortBy) {
    commit(types.SET_SORT_BY, sortBy);
  },
};

const mutations = {
  [types.SET_LOADING](state, loading) {
    Vue.set(state, 'loading', loading);
  },

  [types.FETCH_BEVERAGES](state, beverages) {
    Vue.set(state, 'beverages', beverages);
  },

  [types.SET_SORT_BY](state, sortBy) {
    const matchedOption = sortOptions
      .find(sortOption => sortOption.key === sortBy);

    if (matchedOption) {
      Vue.set(state, 'sortBy', matchedOption.key);
    }
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
