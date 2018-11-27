<template>
  <div class="beers">
    <table class="beers__list">
      <thead>
        <tr>
          <th class="beer-icon" />
          <th class="beer-attribute__name">
            Namn
          </th>
          <th class="beer-attribute__price">
            Pris (SEK)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="beer of beers"
          :key="beer.id">
          <td class="beer-icon">
            <span class="beer-icon__helper" />
            <img
              class="beer-icon__image"
              :src="iconUrl(beer.packaging)">
          </td>
          <td class="beer-attribute__name">
            {{ beer.name }} {{ beer.additional_name }} ({{ beer.alcohol }})
          </td>
          <td class="beer-attribute__price">
            {{ normalizePrice(beer.price.amount) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import BeerCan from '../assets/beer-can.svg';
import BeerBottle from '../assets/beer-bottle.svg';

export default {
  name: 'Beers',

  data() {
    return {
      beers: [],
      imageBottle: '../assets/beer-bottle.png',
      imageCan: '../assets/beer-can.png',
    };
  },

  async created() {
    try {
      const response = await axios.get('https://bolaget.io/v1/products?assortment=TSE&product_group=Öl&limit=100&sales_start_from=2018-10-01&sales_start_to=2018-10-11');
      this.beers = response.data;
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    iconUrl(packaging) {
      switch (packaging) {
        case 'Burk':
          return BeerCan;
        default:
          return BeerBottle;
      }
    },

    normalizePrice(price) {
      return price.toFixed(2);
    },
  },
};
</script>

<style scoped>
.beers {
  max-width: 768px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  -webkit-box-shadow: 3px 3px 10px 5px #e7e7e7;
  -moz-box-shadow: 3px 3px 10px 5px #e7e7e7;
  box-shadow: 3px 3px 10px 5px #e7e7e7;
}

.beers__list {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

tr {
  border-bottom: 1px solid #f1f1f1;
}

th, td {
  text-align: left;
}

th {
  height: 60px;
  display: table-cell;
  vertical-align: bottom;  /* Align the element at the bottom   */
}

.beer-icon {
  width: 48px;
  height: 48px;
  white-space: nowrap;
  margin: 1em 0;
}

.beer-icon__helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.beer-icon__image {
  vertical-align: middle;
  max-width: 48px;
  max-height: 48px
}

.beer-attribute__name {
  max-width: 488px;
}

.beer-attribute__price {
  width: 100px;
  text-align: right;
  padding-right: 0.5rem;
}

@media (min-width: 768px) {
  th, td {
    padding: 0.5rem;
  }
  .beer-attribute__price {
    padding-right: 1rem;
  }
}
</style>
