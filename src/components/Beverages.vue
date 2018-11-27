<template>
  <div
    v-if="beverages.length > 0"
    class="beverages">
    <h2>Nästa release på utvalda systembolag sker <b>{{ nextRelease() }}</b></h2>
    <table class="beverages__list">
      <thead>
        <tr>
          <th class="beverage-icon" />
          <th class="beverage-attribute__name">
            Namn
          </th>
          <th class="beverage-attribute__price">
            Pris (SEK)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="beverage of beverages"
          :key="beverage.id"
          class="beverage-row">
          <td class="beverage-icon">
            <span class="beverage-icon__helper" />
            <img
              class="beverage-icon__image"
              :src="iconUrl(beverage.packaging)">
          </td>
          <td class="beverage-attribute__name">
            {{ beverage.name }} {{ beverage.additional_name }} ({{ beverage.alcohol }})
          </td>
          <td class="beverage-attribute__price">
            {{ beverage.price.amount.toFixed(2) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    v-else-if="loading">
    Laddar...
  </div>
  <div v-else>
    Inga releaser den här veckan.
  </div>
</template>

<script>
import Can from '../assets/can.svg';
import Bottle from '../assets/bottle.svg';

export default {
  name: 'Beverages',

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
  margin: 2rem 1rem 0;
}

.beverages {
  max-width: 768px;
  margin: 2rem auto;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  -webkit-box-shadow: 3px 3px 10px 5px #e7e7e7;
  -moz-box-shadow: 3px 3px 10px 5px #e7e7e7;
  box-shadow: 3px 3px 10px 5px #e7e7e7;
}

.beverages__list {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.beverage-row {
  border-top: 1px solid #f1f1f1;
}

th, td {
  text-align: left;
}

th {
  height: 30px;
  display: table-cell;
  vertical-align: bottom;  /* Align the element at the bottom   */
}

.beverage-icon {
  width: 48px;
  height: 48px;
  white-space: nowrap;
  margin: 1em 0;
}

.beverage-icon__helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.beverage-icon__image {
  vertical-align: middle;
  max-width: 48px;
  max-height: 48px
}

.beverage-attribute__name {
  max-width: 488px;
}

.beverage-attribute__price {
  width: 100px;
  text-align: right;
  padding-right: 0.5rem;
}

@media (min-width: 768px) {
  th, td {
    padding: 0.25rem;
  }
  .beverage-attribute__price {
    padding-right: 1rem;
  }
}
</style>
