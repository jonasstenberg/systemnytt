import Vue from 'vue';
import axios from 'axios';

import * as types from './mutation-types';
import { getStartDate, getEndDate } from '../../../utils/date';

const initialState = {
  beers: [],
  loading: false,
};

const getters = {
  beers: state => state.beers,
  loading: state => state.loading,
};

const actions = {
  fetchBeers({ commit }) {
    commit(types.SET_LOADING, true);

    axios.get('https://bolaget.io/v1/products', {
      params: {
        assortment: 'TSE',
        product_group: 'Öl',
        limit: 100,
        sales_start_from: getStartDate(),
        sales_start_to: getEndDate(),
      },
    })
      .then(({ data }) => {
        commit(types.FETCH_BEERS, data.map((b) => {
          const title = (name, additionalName, alcohol) => {
            if (!additionalName) {
              return `${name} (${alcohol})`;
            }

            return `${name} ${additionalName} (${alcohol})`;
          };

          return Object.assign({}, b, { title: title(b.name, b.additional_name, b.alcohol) });
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
