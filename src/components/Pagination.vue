<template>
  <div class="product-group__releases-pagination">
    <button
      class="product-group__releases-pagination-btn"
      :disabled="prevDisabled"
      @click="prev()">Förra</button>
    <button
      class="product-group__releases-pagination-btn"
      :disabled="nextDisabled"
      @click="next()">Nästa</button>
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

    nextDisabled() {
      // eslint-disable-next-line consistent-return
      const findNext = (key, keys) => {
        if (keys.indexOf(key) > -1) {
          const nextIndex = keys.indexOf(key) + 1;
          const next = keys[nextIndex];

          return next;
        }
      };

      return !findNext(this.selectedReleaseDate, this.releaseDates);
    },

    prevDisabled() {
      // eslint-disable-next-line consistent-return
      const findPrev = (key, keys) => {
        if (keys.indexOf(key) > -1) {
          const nextIndex = keys.indexOf(key) - 1;
          const next = keys[nextIndex];

          return next;
        }
      };

      return !findPrev(this.selectedReleaseDate, this.releaseDates);
    },
  },

  methods: {
    ...mapActions('beverages', [
      'fetchBeverages',
      'setProductGroup',
    ]),

    // eslint-disable-next-line consistent-return
    findPrev(key, keys) {
      if (keys.indexOf(key) > -1) {
        const nextIndex = (keys.indexOf(key) - 1) % keys.length;
        const next = keys[nextIndex];

        return next;
      }
    },

    // eslint-disable-next-line consistent-return
    findNext(key, keys) {
      if (keys.indexOf(key) > -1) {
        const nextIndex = (keys.indexOf(key) + 1) % keys.length;
        const next = keys[nextIndex];

        return next;
      }
    },

    async prev() {
      if (this.starredProductGroup && this.starredProductGroup !== this.productGroup) {
        this.setProductGroup(this.starredProductGroup);
      }

      const previousReleaseDate = this.findPrev(this.selectedReleaseDate, this.releaseDates);

      this.$router.push({
        path: this.productGroup,
        query: Object.assign({}, this.$route.query, {
          release_date: previousReleaseDate,
        }),
      });

      await this.fetchBeverages(previousReleaseDate);
    },

    async next() {
      if (this.starredProductGroup && this.starredProductGroup !== this.productGroup) {
        this.setProductGroup(this.starredProductGroup);
      }

      const nextReleaseDate = this.findNext(this.selectedReleaseDate, this.releaseDates);

      this.$router.push({
        path: this.productGroup,
        query: Object.assign({}, this.$route.query, {
          release_date: nextReleaseDate,
        }),
      });

      await this.fetchBeverages(nextReleaseDate);
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
