<template>
  <div
    v-if="beverages.length > 0"
    class="beverages">
    <h2>Nästa release på utvalda systembolag sker <b>{{ nextRelease() }}</b></h2>
    <div class="beverages__list">
      <Accordion>
        <AccordionItem
          v-for="beverage of beverages"
          :key="beverage.id">
          <div
            slot="title"
            class="beverages__title">
            <span class="beverage-icon">
              <img
                class="beverage-icon__image"
                :src="iconUrl(beverage.packaging)">
            </span>
            <span class="beverage-attribute__name">
              {{ beverage.name }} {{ beverage.additional_name }} ({{ beverage.alcohol }})
            </span>
            <span class="beverage-attribute__price">
              {{ beverage.price.amount.toFixed(2) }}
            </span>
          </div>
          <div
            slot="more-info"
            class="beverages__more-info">
            More info
          </div>
        </AccordionItem>
      </Accordion>
    </div>
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
}

.beverages {
  max-width: 768px;
  margin: 2rem auto;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  box-shadow: 3px 3px 10px 5px #e7e7e7;
}

.beverages__info {
  padding: 1rem;
}

.beverages__list {
  text-align: left;
}

.beverages__title {
  display: flex;
  align-items: center;
  width: 100%;
}

.beverage-icon img {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
}

.beverage-attribute__price {
  flex-shrink: 0;
  margin-left: auto;
  margin-right: 1rem;
  min-width: 4rem;
  text-align: right;
}

@media (max-width: 768px) {
  .beverages {
    margin: 1rem auto;
  }

  .beverage-attribute__price {
    margin-right: 0;
  }
}
</style>
