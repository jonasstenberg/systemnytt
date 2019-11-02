<template>
  <div
    v-if="showBeverages"
    class="beverages">
    <div class="product-group">
      <div class="product-group__info">
        <h1 class="product-group__title">
          {{ getProductGroup() }}
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
          Det här släppet sker <b>{{ nextRelease() }}</b>.
        </div>
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
      </div>
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
    </div>
    <accordion>
      <accordion-item
        v-for="beverage in getBeverages()"
        :key="beverage.nr">
        <div
          slot="title"
          class="beverage__title">
          <span class="beverage__icon">
            <img
              :src="iconUrl(beverage.packaging, starredBeverages.includes(beverage.nr))">
          </span>
          <span class="beverage__attribute beverage__attribute--name">
            {{ beverage.title }}
          </span>
          <span class="beverage__attribute beverage__attribute--price">
            {{ beverage.price.amount.toFixed(2) }}
          </span>
        </div>
        <div
          slot="more-info"
          class="beverage__more-info">
          <div class="beverage__attribute">
            <p v-if="beverage.product_group">
              <span class="beverage__attribute beverage__attribute--bold">Typ: </span>
              <span class="beverage__attribute">{{ beverageType(beverage) }}</span>
            </p>

            <p v-if="beverage.style">
              <span class="beverage__attribute beverage__attribute--bold">Stil: </span>
              <span class="beverage__attribute">{{ beverage.style }}</span>
            </p>

            <p v-if="beverage.year">
              <span class="beverage__attribute beverage__attribute--bold">Årgång: </span>
              <span class="beverage__attribute">{{ beverage.year }}</span>
            </p>

            <p>
              <span class="beverage__attribute beverage__attribute--bold">Alkoholhalt: </span>
              <span class="beverage__attribute">{{ beverage.alcohol }}</span>
            </p>

            <p>
              <span class="beverage__attribute beverage__attribute--bold">Volym: </span>
              <span class="beverage__attribute">{{ beverage.volume_in_milliliter }} ml</span>
            </p>

            <p>
              <span class="beverage__attribute beverage__attribute--bold">
                {{ beverage.product_group === 'Öl' ? 'Bryggeri' : 'Producent' }}:
              </span>
              <span class="beverage__attribute">{{ beverage.producer }}</span>
            </p>

            <p v-if="beverage.provider">
              <span class="beverage__attribute beverage__attribute--bold">Leverantör: </span>
              <span class="beverage__attribute">{{ beverage.provider }}</span>
            </p>

            <p v-if="beverage.price_per_liter">
              <span class="beverage__attribute beverage__attribute--bold">
                Kr/l - jämförelsepris:
              </span>
              <span class="beverage__attribute">{{ beverage.price_per_liter }}</span>
            </p>

            <p v-if="beverage.sealing">
              <span class="beverage__attribute beverage__attribute--bold">
                Förslutning:
              </span>
              <span class="beverage__attribute">{{ beverage.sealing }}</span>
            </p>

            <p>
              <span class="beverage__attribute beverage__attribute--bold">Säljstart: </span>
              <span class="beverage__attribute">{{ beverage.sales_start }}</span>
            </p>
          </div>
          <div class="beverage__star">
            <input
              :checked="beverageIsChecked(beverage)"
              type="checkbox"
              class="star--checkbox"
              name="star--checkbox"
              @change="toggleStarredBeverages(beverage, $event.target.checked)">
            <label
              for="star--checkbox"
              class="star--label" />
          </div>
        </div>
      </accordion-item>
    </accordion>
  </div>
  <div v-else>
    <div
      v-if="error"
      class="beverages beverages__info">
      Något gick fel...
    </div>
    <div
      v-else-if="loading"
      class="beverages beverages__info">
      Laddar...
    </div>
    <div
      v-else
      class="beverages beverages__info">
      Inga släpp den här veckan.
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Can from '../assets/can.svg';
import Bottle from '../assets/bottle.svg';
import CanFilled from '../assets/can_filled.svg';
import BottleFilled from '../assets/bottle_filled.svg';

import Accordion from '../components/Accordion.vue';
import AccordionItem from '../components/AccordionItem.vue';

export default {
  components: {
    Accordion,
    AccordionItem,
  },

  computed: {
    ...mapGetters('beverages', [
      'menuItems',
      'beverages',
      'releaseDates',
      'selectedReleaseDate',
      'loading',
      'error',
      'searchPhrase',
    ]),

    ...mapGetters('stars', [
      'starredProductGroup',
      'starredBeverages',
    ]),

    showBeverages() {
      return this.beverages && Object.keys(this.beverages).length > 0 && !this.loading;
    },

    productGroupIsChecked() {
      if (this.starredProductGroup
        && this.starredProductGroup === this.getProductGroup()) {
        return true;
      }
      return false;
    },

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
    ...mapActions('stars', [
      'starProductGroup',
      'starBeverages',
    ]),

    ...mapActions('beverages', [
      'fetchBeverages',
      'setSearchPhrase',
    ]),

    iconUrl(packaging, filled) {
      switch (packaging) {
        case 'Burk':
          return filled ? CanFilled : Can;
        default:
          return filled ? BottleFilled : Bottle;
      }
    },

    nextRelease() {
      const stringDate = this.beverages[this.menuItems[0].key][0].sales_start;
      const date = new Date(stringDate);

      const locale = 'sv-SE';
      const weekday = date.toLocaleString(locale, { weekday: 'long' });
      const month = date.toLocaleString(locale, { month: 'long' });

      return `${weekday} den ${date.getDate()} ${month}`;
    },

    async prev() {
      // eslint-disable-next-line consistent-return
      const findPrev = (key, keys) => {
        if (keys.indexOf(key) > -1) {
          const nextIndex = (keys.indexOf(key) - 1) % keys.length;
          const next = keys[nextIndex];

          return next;
        }
      };

      const previousReleaseDate = findPrev(this.selectedReleaseDate, this.releaseDates);

      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, {
          release_date: previousReleaseDate,
        }),
      });

      await this.fetchBeverages(previousReleaseDate);
    },

    async next() {
      // eslint-disable-next-line consistent-return
      const findNext = (key, keys) => {
        if (keys.indexOf(key) > -1) {
          const nextIndex = (keys.indexOf(key) + 1) % keys.length;
          const next = keys[nextIndex];

          return next;
        }
      };

      const nextReleaseDate = findNext(this.selectedReleaseDate, this.releaseDates);

      this.$router.push({
        name: this.$route.name,
        query: Object.assign({}, this.$route.query, {
          release_date: nextReleaseDate,
        }),
      });

      await this.fetchBeverages(nextReleaseDate);
    },

    search(evt) {
      const value = evt.target.value.trim().toLowerCase();
      if (evt.key && evt.key === 'Escape') {
        this.setSearchPhrase('');
        return;
      }
      this.setSearchPhrase(value);
    },

    getBeverages() {
      const getBeverages = () => {
        if (this.$route.params.productGroup && this.beverages[this.$route.params.productGroup]) {
          return this.beverages[this.$route.params.productGroup];
        }

        if (this.starredProductGroup && this.beverages[this.starredProductGroup]) {
          return this.beverages[this.starredProductGroup];
        }

        return this.beverages[this.menuItems[0].key];
      };

      const beverages = getBeverages();

      if (!this.searchPhrase) {
        return beverages;
      }

      return beverages
        .filter(beverage => beverage.name.toLowerCase().indexOf(this.searchPhrase) > -1
          || (beverage.additional_name
            && beverage.additional_name.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.type && beverage.type.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.style && beverage.style.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.producer && beverage.producer.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.provider && beverage.provider.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.alcohol && beverage.alcohol.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.year && beverage.year.toString().indexOf(this.searchPhrase) > -1)
          || (beverage.packaging
            && beverage.packaging.toLowerCase().indexOf(this.searchPhrase) > -1));
    },

    getProductGroup() {
      if (this.$route.params.productGroup && this.beverages[this.$route.params.productGroup]) {
        return this.$route.params.productGroup;
      }

      if (this.starredProductGroup && this.beverages[this.starredProductGroup]) {
        return this.starredProductGroup;
      }

      return this.menuItems[0].key;
    },

    beverageType(beverage) {
      let type = '';
      if (beverage.product_group) {
        if (beverage.type) {
          type += `${beverage.product_group}, `;
          type += beverage.type;
        } else {
          type += beverage.product_group;
        }
      } else {
        type += beverage.type ? beverage.type : '';
      }
      return type;
    },

    toggleStarredProductGroup(checked) {
      if (checked) {
        this.starProductGroup(this.getProductGroup());
      } else {
        this.starProductGroup(null);
      }
    },

    toggleStarredBeverages(beverage, checked) {
      if (checked) {
        if (!this.starredBeverages.includes(beverage.nr)) {
          this.starredBeverages.push(beverage.nr);
        }
      } else {
        const index = this.starredBeverages.indexOf(beverage.nr);
        if (index >= 0) {
          this.starredBeverages.splice(index, 1);
        }
      }

      this.starBeverages(this.starredBeverages);
    },

    beverageIsChecked(beverage) {
      if (this.starredBeverages.includes(beverage.nr)) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;
}

.product-group {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.product-group__info {
  display: flex;
}

.product-group__star {
  margin-left: auto;
  margin-top: 1rem;
  width: 2rem;
  height: 2rem;
}

.star--label {
  cursor: pointer;
}

.product-group__releases {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

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

.product-group__releases-pagination-btn:disabled {
  background: #ccc;
  cursor: auto;
}

.search {
  position: relative;
  display: flex;
  flex: 0 1 10rem;
  max-height: 2.5rem;
  margin-bottom: 1rem;
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
  flex: 1 1 24rem;
  display: block;
  padding: 0.75rem 0.75rem 0.75rem 5.25rem;
  font-size: 0.875rem;
  background-color: #f1f1f1;
  border: 0;
  border-radius: 50em;
  outline: 0;
}

input[type=checkbox].star--checkbox {
  position: absolute;
  opacity: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

input[type=checkbox].star--checkbox + label.star--label {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: auto 100%;
}

input[type=checkbox].star--checkbox:checked + label.star--label {
  background-image: url('../assets/star_filled.svg');
}

label.star--label {
  background-image: url('../assets/star.svg');
}

.beverages {
  max-width: 799px;
  padding-bottom: 1rem;
  margin: 2rem auto;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  box-shadow: 3px 3px 10px 5px #e7e7e7;
  text-align: left;
}

.beverages__info {
  padding: 1rem;
}

.beverage__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.beverage__more-info {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
}

.beverage__icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
}

.beverage__attribute {
  flex: auto 1 0;
}

.beverage__attribute > p {
  margin-top: 0;
  margin-bottom: 0.25rem;
}

.beverage__star {
}

.beverage__attribute--bold {
  font-weight: bold;
}

.beverage__attribute--name {
  flex: auto;
}

.beverage__attribute--price {
  flex-shrink: 0;
  margin-left: 1rem;
  text-align: right;
}

@media (min-width: 799px) {
  .beverages {
    padding: 1rem;
  }

  .product-group {
    padding: 0;
  }
}
</style>
