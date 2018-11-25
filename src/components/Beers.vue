<template>
  <div class="home">
    <h1>systemnytt</h1>
    <table class="beers">
      <thead>
        <tr>
          <th class="beer-icon" />
          <th class="beer-attribute__name">
            Name
          </th>
          <th class="beer-attribute__brewery">
            Brewery
          </th>
          <th class="beer-attribute__price">
            Price
          </th>
          <th class="beer-attribute__abv">
            ABV
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="beer of beers"
          :key="beer.id">
          <td
            :class="['beer-icon', {
              'beer-icon__bottle': beer.packaging === 'Flaska',
              'beer-icon__can': beer.packaging === 'Burk',
            }]" />
          <td class="beer-attribute__name">
            {{ beer.additional_name }}
          </td>
          <td class="beer-attribute__brewery">
            {{ beer.name }}
          </td>
          <td class="beer-attribute__price">
            {{ beer.price.amount }} {{ beer.price.currency }}
          </td>
          <td class="beer-attribute__abv">
            {{ beer.alcohol }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Beers',

  data() {
    return {
      beers: [],
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
};
</script>

<style scoped>
.beer-icon {
  display: block;
  text-indent: -9999px;
  width: 3rem;
  height: 3rem;
  background-size: 3rem;
}

.beers {
  border-collapse: collapse;
  max-width: 1024px;
  table-layout: fixed;
}

tr {
  border-bottom: 1px solid #f1f1f1;
}

th, td {
  text-align: left;
}

.beer-icon__bottle {
  background: url("../assets/beer-bottle.svg");
}

.beer-icon__can {
  background: url("../assets/beer-can.svg");
}

.beer-attribute__name {
  width: 40%;
}

.beer-attribute__brewery {
  width: 20%;
  font-weight: bold;
}

.beer-attribute__price {
  width: 10%;
}

.beer-attribute__abv {
  width: 20%;
  text-align: right;
}
</style>

