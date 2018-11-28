<template>
  <div
    v-if="beverages.length > 0"
    class="beverages">
        <h2>Nästa release på utvalda systembolag sker <b>{{ nextRelease() }}</b></h2>
      <accordion>
        <accordion-item
          v-for="beverage of beverages"
          :key="beverage.id">
          <div
            slot="title"
            class="beverage__title">
            <span class="beverage__icon">
              <img
                :src="iconUrl(beverage.packaging)">
            </span>
            <span class="beverage__attribute beverage__attribute--name">
              {{ beverage.name }} {{ beverage.additional_name }} ({{ beverage.alcohol }})
            </span>
            <span class="beverage__attribute beverage__attribute--price">
              {{ beverage.price.amount.toFixed(2) }}
            </span>
          </div>
          <div
            slot="more-info"
            class="beverage__more-info">
            <p>
              <span class="beverage__attribute beverage__attribute--bold">Producent: </span>
              <span class="beverage__attribute">{{ beverage.producer }}</span>
            </p>
            <p>
              <span class="beverage__attribute beverage__attribute--bold">Volym (ml): </span>
              <span class="beverage__attribute">{{ beverage.volume_in_milliliter }}</span>
            </p>
            <p v-if="beverage.year">
              <span class="beverage__attribute beverage__attribute--bold">Årgång: </span>
              <span class="beverage__attribute">{{ beverage.year }}</span>
            </p>
          </div>
        </accordion-item>
      </accordion>
    </div>
  <div
    v-else-if="loading"
    class="beverages beverages__info">
    Laddar...
  </div>
  <div
    v-else
    class="beverages beverages__info">
    Inga releaser den här veckan.
  </div>
</template>

<script>
import Can from '../assets/can.svg';
import Bottle from '../assets/bottle.svg';
import Accordion from './Accordion.vue';
import AccordionItem from './AccordionItem.vue';

export default {
  name: 'Beverages',

  components: {
    Accordion,
    AccordionItem,
  },

  props: {
    beverages: {
      type: Array,
    },
    loading: {
      type: Boolean,
      default: false,
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
      if (this.beverages && this.beverages[0]) {
        return this.beverages[0].sales_start;
      }

      return '';
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
  padding: 0 1rem;
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
