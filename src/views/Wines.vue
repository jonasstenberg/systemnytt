<template>
  <beverages
    :beverages="wines"
    :loading="loading" />
</template>

<script>
import { mapGetters } from 'vuex';

import Beverages from '../components/Beverages.vue';

export default {
  name: 'Wines',

  components: {
    Beverages,
  },

  computed: {
    ...mapGetters('wines', [
      'wines',
      'loading',
    ]),
  },
};
</script>
