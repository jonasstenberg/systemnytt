<template>
  <div class="search">
    <input
      type="text"
      class="search--input"
      :value="searchPhrase"
      @input="search"
      @keydown="search">
    <span
      v-if="!searchPhrase"
      class="search--suggestions">Sök bland dryckerna</span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import search from '../mixins/search';

export default {
  mixins: [search],

  computed: {
    ...mapGetters('beverages', [
      'beverages',
      'searchPhrase',
    ]),
  },

  methods: {
    ...mapActions('beverages', [
      'setSearchPhrase',
    ]),

    search(evt) {
      const value = evt.target.value.trim().toLowerCase();
      if (evt.key && evt.key === 'Escape') {
        this.setSearchPhrase('');
        return;
      }
      this.setSearchPhrase(value);
    },
  },
};
</script>

<style scoped>
.search {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  max-height: 2.5rem;
}

.search--suggestions {
  position: absolute;
  top: 50%;
  left: 5.25rem;
  font-size: 0.875rem;
  color: #aaa;
  pointer-events: none;
  transform: translateY(-50%);
}

.search::before {
  position: absolute;
  top: 50%;
  left: 2rem;
  width: 1.5rem;
  height: 1.5rem;
  pointer-events: none;
  content: '';
  background: url('../assets/search.svg');
  transform: translateY(-50%);
}

.search--input {
  display: block;
  appearance: none;
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 5.25rem;
  margin: 0 auto;
  font-size: 0.875rem;
  background-color: #f1f1f1;
  border: 0;
  border-radius: 50em;
  outline: 0;
}
</style>
