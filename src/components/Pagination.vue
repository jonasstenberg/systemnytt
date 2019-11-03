<template>
  <div class="pagination">
    <button
      class="pagination__btn pagination__btn--back"
      :disabled="!findDate(selectedReleaseDate, releaseDates, 'back')"
      @click="go('back')">Föregående</button>
    <button
      class="pagination__btn pagination__btn--forward"
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
.pagination {
  display: flex;
  margin-left: auto;
}

.pagination__btn {
  background: #03813c;
  padding: 0.5rem 0.75rem;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 0.5rem;
  cursor: pointer;
  text-indent: -9999px;
  line-height: 0;
}

.pagination__btn:hover {
  background: #05ad51;
}

.pagination__btn:disabled {
  background: #ccc;
  cursor: auto;
}

.pagination__btn::after {
  text-indent: 0;
  display: block;
  line-height: initial;
}

.pagination__btn--back::after {
  content: "<";
}

.pagination__btn--forward::after {
  content: ">";
}

@media (min-width: 799px) {
  .pagination__btn {
    text-indent: 0;
    line-height: initial;
  }

  .pagination__btn--back::after {
    content: initial;
  }

  .pagination__btn--forward::after {
    content: initial;
  }
}
</style>
