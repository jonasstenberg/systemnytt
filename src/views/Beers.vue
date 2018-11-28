<template>
  <beverages
    :beverages="beers"
    :loading="loading" />
</template>

<script>
import { mapGetters } from 'vuex';

import Beverages from '../components/Beverages.vue';

export default {
  name: 'Beers',

  components: {
    Beverages,
  },

  computed: {
    ...mapGetters('beers', [
      'beers',
      'loading',
    ]),
  },
};
</script>
