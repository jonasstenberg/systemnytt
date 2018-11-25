<template>
  <div class="home">
    <Beers />
  </div>
</template>

<script>
import Beers from '@/components/Beers.vue';

export default {
  name: 'home',
  components: {
    Beers,
  },
};
</script>
