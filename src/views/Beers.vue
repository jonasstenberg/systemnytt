<template>
  <beverages
    :beverages="beers"
    :loading="loading" />
</template>

<script>
import axios from 'axios';

import Beverages from '../components/Beverages.vue';
import { getStartDate, getEndDate } from '../utils/date';

export default {
  name: 'Beers',

  components: {
    Beverages,
  },

  data() {
    return {
      beers: [],
      loading: false,
    };
  },

  async created() {
    try {
      this.loading = true;
      const response = await axios.get('https://bolaget.io/v1/products', {
        params: {
          assortment: 'TSE',
          product_group: 'Öl',
          limit: 100,
          sales_start_from: getStartDate(),
          sales_start_to: getEndDate(),
        },
      });
      this.beers = response.data.map(b => Object.assign({}, b, {
        title: `${b.name} ${b.additional_name} (${b.alcohol})`,
      }));
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  },
};
</script>
