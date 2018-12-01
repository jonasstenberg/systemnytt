import Vue from 'vue';
import axios from 'axios';

import * as types from './mutation-types';
import { getStartDate, getEndDate } from '../../../utils/date';

const initialState = {
  wines: [],
  loading: false,
};

const getters = {
  wines: state => state.wines,
  loading: state => state.loading,
};

const actions = {
  fetchWines({ commit }) {
    commit(types.SET_LOADING, true);

    axios.get('https://bolaget.io/v1/products', {
      params: {
        assortment: 'TSE',
        product_group: 'Vin',
        limit: 100,
        sales_start_from: getStartDate(),
        sales_start_to: getEndDate(),
      },
    })
      .then(({ data }) => {
        commit(types.FETCH_WINES, data.map((b) => {
          const title = (name, additionalName, year) => {
            if (!additionalName) {
              return `${name} (${year})`;
            }

            return `${name} ${additionalName} (${year})`;
          };

          return Object.assign({}, b, { title: title(b.name, b.additional_name, b.year) });
        }));
      })
      .catch(err => commit(types.FAILURE, err))
      .then(() => commit(types.SET_LOADING, false));
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
