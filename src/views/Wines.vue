<template>
  <Beverages
    :beverages="wines"
    :loading="loading" />
</template>

<script>
import axios from 'axios';

import Beverages from '../components/Beverages.vue';

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
      const response = await axios.get('https://bolaget.io/v1/products?assortment=TSE&product_group=Vin&limit=100&sales_start_from=2018-10-01&sales_start_to=2018-10-11');
      this.wines = response.data;
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  },
};
</script>
