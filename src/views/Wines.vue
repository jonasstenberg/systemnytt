<template>
  <Beverages
    :beverages="wines"
    :loading="loading" />
</template>

<script>
import axios from 'axios';

import Beverages from '../components/Beverages.vue';
import { getStartDate, getEndDate } from '../utils/date';

export default {
  name: 'Wines',

  components: {
    Beverages,
  },

  data() {
    return {
      wines: [],
      loading: false,
    };
  },

  async created() {
    try {
      this.loading = true;
      const response = await axios.get('https://bolaget.io/v1/products', {
        params: {
          assortment: 'TSE',
          product_group: 'Vin',
          limit: 100,
          sales_start_from: getStartDate(),
          sales_start_to: getEndDate(),
        },
      });
      this.wines = response.data;
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  },
};
</script>
