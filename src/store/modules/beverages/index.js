import Vue from 'vue';

import * as types from './mutation-types';
import bolaget from '../../../api/bolaget';
import formatDate from '../../../utils/date';

const initialState = {
  beverages: {},
  releaseDates: [],
  menuItems: [],
  loading: false,
  error: null,
};

const getters = {
  beverages: state => state.beverages,
  selectedReleaseDate: state => state.selectedReleaseDate,
  releaseDates: state => state.releaseDates,
  menuItems: state => state.menuItems,
  loading: state => state.loading,
  error: state => state.error,
};

const getStartDate = (releaseDate) => {
  const supposedlyDate = releaseDate ? new Date(releaseDate) : Date.now();
  const date = new Date(supposedlyDate);
  date.setDate(date.getDate() - 30);

  return formatDate(date);
};

const getEndDate = (releaseDate) => {
  const supposedlyDate = releaseDate ? new Date(releaseDate) : Date.now();
  const date = new Date(supposedlyDate);
  date.setDate(date.getDate() + 30);

  return formatDate(date);
};

const actions = {
  async fetchBeverages({ commit }, releaseDate) {
    commit(types.SET_LOADING, true);

    try {
      const startDate = getStartDate(releaseDate);
      const endDate = getEndDate(releaseDate);

      const result = await bolaget(startDate, endDate);

      const today = new Date();

      const selectedReleaseDate = !releaseDate
        ? Object.keys(result).reduce((a, b) => {
          const adiff = new Date(a) - today;
          return adiff > 0 && adiff < new Date(b) - today ? a : b;
        })
        : releaseDate;

      const groupBy = (xs, key) => xs.reduce((rv, x) => {
          (rv[x[key]] = rv[x[key]] || []).push(x); // eslint-disable-line
        return rv;
      }, {});

      const groupedResult = groupBy(result[selectedReleaseDate], 'product_group');

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
      commit(types.SET_RELEASE_DATES, Object.keys(result));
      commit(types.SET_SELECTED_RELEASE_DATE, selectedReleaseDate);
      commit(types.SET_MENU_ITEMS, menuItems);
      commit(types.SET_LOADING, false);
    } catch (err) {
      commit(types.FAILURE, err);
    }
  },

  setSelectedReleaseDate({ commit }, selectedReleaseDate) {
    commit(types.SET_SELECTED_RELEASE_DATE, selectedReleaseDate);
  },
};

const mutations = {
  [types.SET_LOADING](state, loading) {
    Vue.set(state, 'loading', loading);
  },

  [types.FETCH_BEVERAGES](state, beverages) {
    Vue.set(state, 'beverages', beverages);
  },

  [types.SET_RELEASE_DATES](state, releaseDates) {
    Vue.set(state, 'releaseDates', releaseDates);
  },

  [types.SET_SELECTED_RELEASE_DATE](state, selectedReleaseDate) {
    Vue.set(state, 'selectedReleaseDate', selectedReleaseDate);
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
