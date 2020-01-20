<template>
  <div
    v-if="showBeverages"
    class="main">
    <div class="product-group">
      <div class="product-group__info">
        <h1 class="product-group__title">
          {{ productGroup }}
        </h1>
        <div class="product-group__star">
          <input
            :checked="productGroupIsChecked"
            type="checkbox"
            name="star--checkbox"
            class="star--checkbox"
            @change="toggleStarredProductGroup($event.target.checked)">
          <label
            for="star--checkbox"
            class="star--label" />
        </div>
      </div>
      <div class="product-group__releases">
        <div class="product-group__releases-next">
          Finns på Systembolaget: <b>{{ nextRelease }}</b>.
        </div>
        <pagination />
      </div>
      <search />
      <div class="beverages__total">
        <span class="beverages__total--number">{{ filteredBeverages.length }}</span> resultat
      </div>
    </div>
    <beverages />
    <div
      v-if="!filteredBeverages || !filteredBeverages.length"
      class="beverages-empty">
      Inga släpp av den här kategorin ({{ this.productGroup }}) det här datumet.
    </div>
  </div>
  <div v-else>
    <div
      v-if="error"
      class="main main__info">
      Något gick fel...
    </div>
    <div
      v-else-if="loading"
      class="main main__info">
      Laddar...
    </div>
    <div
      v-else
      class="main main__info">
      Inga släpp den här veckan.
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import search from '../mixins/search';

import Beverages from '../components/Beverages.vue';
import Pagination from '../components/Pagination.vue';
import Search from '../components/Search.vue';

export default {
  mixins: [search],

  components: {
    Beverages,
    Pagination,
    Search,
  },

  computed: {
    ...mapGetters('beverages', [
      'menuItems',
      'beverages',
      'selectedReleaseDate',
      'productGroup',
      'loading',
      'error',
    ]),

    ...mapGetters('stars', [
      'starredProductGroup',
      'starredBeverages',
    ]),

    showBeverages() {
      return this.beverages && !this.loading;
    },

    productGroupIsChecked() {
      if (this.starredProductGroup
        && this.starredProductGroup === this.productGroup) {
        return true;
      }
      return false;
    },

    nextRelease() {
      if (!this.menuItems.length) {
        return '';
      }

      const stringDate = this.beverages[this.menuItems[0].key][0].sales_start;
      const date = new Date(stringDate);

      const locale = 'sv-SE';
      const weekday = date.toLocaleString(locale, { weekday: 'long' });
      const month = date.toLocaleString(locale, { month: 'long' });

      return `${weekday} den ${date.getDate()} ${month}`;
    },
  },

  watch: {
    $route: {
      async handler() {
        const productGroup = this.$route.path.replace('/', '');
        if (productGroup !== this.productGroup) {
          this.setProductGroup(productGroup);
        }

        const releaseDate = this.$route.query.release_date;
        if (releaseDate !== this.selectedReleaseDate) {
          await this.fetchBeverages(releaseDate);
          this.setSelectedReleaseDate(releaseDate);
        }
      },
    },
  },

  methods: {
    ...mapActions('stars', [
      'starProductGroup',
    ]),

    ...mapActions('beverages', [
      'fetchBeverages',
      'setProductGroup',
      'setSelectedReleaseDate',
    ]),

    toggleStarredProductGroup(checked) {
      if (checked) {
        this.starProductGroup(this.productGroup);
      } else {
        this.starProductGroup(null);
      }
    },
  },
};
</script>

<style scoped>
.main {
  max-width: 799px;
  margin: 2rem auto;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  box-shadow: 3px 3px 10px 5px #e7e7e7;
  text-align: left;
}

.main__info {
  padding: 1rem;
}

.product-group {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-bottom: 1px solid #f1f1f1;
}

.product-group__info {
  display: flex;
  margin-bottom: 2rem;
}

.product-group__title {
  font-size: 2rem;
  margin: 0;
}

.product-group__star {
  margin-left: auto;
  width: 2rem;
  height: 2rem;
}

.beverages-empty {
  padding: 1rem;
}

.beverages__total--number {
  font-weight: bold;
}

.star--label {
  cursor: pointer;
}

.product-group__releases {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.star--checkbox {
  position: absolute;
  opacity: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.star--checkbox + label.star--label {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: auto 100%;
}

.star--checkbox:hover + label.star--label,
.star--checkbox:checked + label.star--label {
  background-image: url('../assets/star_filled.svg');
}

label.star--label {
  background-image: url('../assets/star.svg');
}

@media (min-width: 799px) {
  .product-group {
    padding: 2rem 2rem 1rem;
  }
}
</style>
