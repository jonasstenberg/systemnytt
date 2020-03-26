/* eslint-disable max-len */

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('beverages', ['beverages', 'searchPhrase', 'productGroup']),

    filteredBeverages() {
      const beverages = this.beverages[this.productGroup];

      if (!this.searchPhrase) {
        return beverages;
      }

      return beverages.filter(
        (beverage) => beverage.name.toLowerCase().indexOf(this.searchPhrase) > -1
          || (beverage.additional_name
            && beverage.additional_name.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.type && beverage.type.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.style && beverage.style.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.producer && beverage.producer.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.provider && beverage.provider.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.alcohol && beverage.alcohol.toLowerCase().indexOf(this.searchPhrase) > -1)
          || (beverage.year && beverage.year.toString().indexOf(this.searchPhrase) > -1)
          || (beverage.packaging && beverage.packaging.toLowerCase().indexOf(this.searchPhrase) > -1),
      );
    },
  },
};
