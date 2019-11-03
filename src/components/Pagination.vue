<template>
  <div class="product-group__releases-pagination">
    <button
      class="product-group__releases-pagination-btn"
      :disabled="!findDate(selectedReleaseDate, releaseDates, 'back')"
      @click="go('back')">Förra</button>
    <button
      class="product-group__releases-pagination-btn"
      :disabled="!findDate(selectedReleaseDate, releaseDates, 'forward')"
      @click="go('forward')">Nästa</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('beverages', [
      'beverages',
      'releaseDates',
      'selectedReleaseDate',
      'productGroup',
    ]),
  },

  methods: {
    ...mapActions('beverages', [
      'fetchBeverages',
      'setProductGroup',
    ]),

    findDate(key, keys, direction) {
      if (keys.indexOf(key) > -1) {
        const num = direction === 'back' ? -1 : 1;
        const nextIndex = keys.indexOf(key) + num;
        const next = keys[nextIndex];

        return next;
      }

      return null;
    },

    async go(direction) {
      if (this.starredProductGroup && this.starredProductGroup !== this.productGroup) {
        this.setProductGroup(this.starredProductGroup);
      }

      const releaseDate = this.findDate(this.selectedReleaseDate, this.releaseDates, direction);

      this.$router.push({
        path: this.productGroup,
        query: Object.assign({}, this.$route.query, {
          release_date: releaseDate,
        }),
      });

      await this.fetchBeverages(releaseDate);
    },
  },
};
</script>

<style scoped>
.product-group__releases-pagination {
  display: flex;
  margin-left: auto;
}

.product-group__releases-pagination-btn {
  background: #03813c;
  padding: 0.5rem 0.75rem;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 0.5rem;
  cursor: pointer;
}

.product-group__releases-pagination-btn:hover {
  background: #05ad51;
}

.product-group__releases-pagination-btn:disabled {
  background: #ccc;
  cursor: auto;
}
</style>
