<template>
  <nav class="navigation">
    <router-link
      v-for="item in items"
      :key="item.key"
      class="navigation__link"
      :to="`/${item.key}`">
      {{ item.key }} ({{ item.values.length }})
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  .navigation {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 768px;
    flex-wrap: wrap;
    margin: 0 auto;
  }

  .navigation__link {
    background: #03813c;
    padding: 0.5rem 0.75rem;
    margin: 0.25rem;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
  }

  .navigation__link:hover,
  .navigation__link--active {
    background: #05ad51;
  }
</style>
