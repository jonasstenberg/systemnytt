<template>
  <beverages
    :beverages="beverages"
    :loading="loading" />
</template>

<script>
import { mapGetters } from 'vuex';

import Beverages from '../components/Beverages.vue';

export default {
  components: {
    Beverages,
  },

  computed: {
    ...mapGetters('beverages', [
      'beverages',
      'loading',
    ]),
  },
};
</script>
