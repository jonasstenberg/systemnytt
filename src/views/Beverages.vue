<template>
  <div
    v-if="showBeverages"
    class="beverages">
    <h1>{{ getBeverageType() }}</h1>
    <h2>Nästa släpp på utvalda systembolag sker <b>{{ nextRelease() }}</b></h2>
    <accordion>
      <accordion-item
        v-for="beverage in getBeverages()"
        :key="beverage.id">
        <div
          slot="title"
          class="beverage__title">
          <span class="beverage__icon">
            <img
              :src="iconUrl(beverage.packaging)">
          </span>
          <span class="beverage__attribute beverage__attribute--name">
            {{ beverage.name }} {{ beverage.additional_name }}
          </span>
          <span class="beverage__attribute beverage__attribute--price">
            {{ beverage.price.amount.toFixed(2) }}
          </span>
        </div>
        <div
          slot="more-info"
          class="beverage__more-info">
          <p v-if="beverage.product_group && beverage.product_group != 'Öl'">
            <span class="beverage__attribute beverage__attribute--bold">Typ: </span>
            <span class="beverage__attribute">{{ beverage.product_group }}</span>
          </p>
          <p>
            <span class="beverage__attribute beverage__attribute--bold">Säljstart: </span>
            <span class="beverage__attribute">{{ beverage.sales_start }}</span>
          </p>
          <p>
            <span class="beverage__attribute beverage__attribute--bold">
              {{ beverage.product_group === 'Öl' ? 'Bryggeri' : 'Producent' }}:
            </span>
            <span class="beverage__attribute">{{ beverage.producer }}</span>
          </p>
          <p>
            <span class="beverage__attribute beverage__attribute--bold">Volym: </span>
            <span class="beverage__attribute">{{ beverage.volume_in_milliliter }} ml</span>
          </p>
          <p>
            <span class="beverage__attribute beverage__attribute--bold">Alkoholhalt: </span>
            <span class="beverage__attribute">{{ beverage.alcohol }}</span>
          </p>
          <p v-if="beverage.year">
            <span class="beverage__attribute beverage__attribute--bold">Årgång: </span>
            <span class="beverage__attribute">{{ beverage.year }}</span>
          </p>

          <p v-if="beverage.style">
            <span class="beverage__attribute beverage__attribute--bold">Typ: </span>
            <span class="beverage__attribute">{{ beverage.style }}</span>
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
        </div>
      </accordion-item>
    </accordion>
  </div>
  <div v-else>
    <div
      v-if="loading"
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
import { mapGetters } from 'vuex';

import Can from '../assets/can.svg';
import Bottle from '../assets/bottle.svg';
import Accordion from '../components/Accordion.vue';
import AccordionItem from '../components/AccordionItem.vue';

export default {
  components: {
    Accordion,
    AccordionItem,
  },

  computed: {
    ...mapGetters('beverages', [
      'beverages',
      'loading',
    ]),

    showBeverages() {
      return this.beverages && !this.loading;
    },
  },

  methods: {
    iconUrl(packaging) {
      switch (packaging) {
        case 'Burk':
          return Can;
        default:
          return Bottle;
      }
    },

    nextRelease() {
      return this.beverages[0].values[0].sales_start;
    },

    getBeverages() {
      if (this.$route.params.beverageType) {
        return this.beverages.find(b => b.key === this.$route.params.beverageType).values;
      }
      return this.beverages[0].values;
    },

    getBeverageType() {
      if (this.$route.params.beverageType) {
        return this.$route.params.beverageType || this.beverages[0].key;
      }
      return this.beverages[0].key;
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

.beverages {
  max-width: 768px;
  padding: 0 1rem 1rem;
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
  padding: 1rem;
}

.beverage__icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
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
</style>

