<template>
  <Beverages
    :beverages="beers"
    :loading="loading" />
</template>

<script>
import axios from 'axios';

import Beverages from '../components/Beverages.vue';

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
      const response = await axios.get('https://bolaget.io/v1/products?assortment=TSE&product_group=Öl&limit=100&sales_start_from=2018-10-01&sales_start_to=2018-10-11');
      this.beers = response.data;
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  },
};
</script>
