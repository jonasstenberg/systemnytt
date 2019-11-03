<template>
  <div class="beverages">
    <accordion>
      <accordion-item
        v-for="beverage in filteredBeverages"
        :key="beverage.nr">
        <div
          slot="title"
          class="beverage__title">
          <span class="beverage__icon">
            <img
              :src="iconUrl(beverage.packaging, starredBeverages.includes(beverage.nr))">
          </span>
          <span class="beverage__attribute beverage__attribute--name">
            {{ title(beverage) }}
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
</template>

<script>
import { mapGetters } from 'vuex';

import search from '../mixins/search';

import Can from '../assets/can.svg';
import Bottle from '../assets/bottle.svg';
import CanFilled from '../assets/can_filled.svg';
import BottleFilled from '../assets/bottle_filled.svg';

import Accordion from './Accordion.vue';
import AccordionItem from './AccordionItem.vue';

export default {
  mixins: [search],

  components: {
    Accordion,
    AccordionItem,
  },

  computed: {
    ...mapGetters('stars', [
      'starredProductGroup',
      'starredBeverages',
    ]),
  },

  methods: {
    title(beverage) {
      let title = '';
      title += beverage.name ? `${beverage.name} ` : '';
      title += beverage.additional_name ? `${beverage.additional_name} ` : '';
      title += beverage.alcohol ? `(${beverage.alcohol}) ` : '';
      title += beverage.year ? `(${beverage.year}) ` : '';

      return title;
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

    iconUrl(packaging, filled) {
      switch (packaging) {
        case 'Burk':
          return filled ? CanFilled : Can;
        default:
          return filled ? BottleFilled : Bottle;
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
.beverages {
  padding: 0;
}

.beverage__title {
  display: flex;
  align-items: center;
  width: 100%;
}

.beverage__more-info {
  display: flex;
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

.beverage__star {
  margin-left: auto;
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
</style>
