import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      visible: false,
      selectedItem: { key: '', name: '' },
    };
  },

  computed: {
    ...mapGetters('beverages', [
      'beverages',
      'sortBy',
    ]),
  },

  watch: {
    $route(to, from) {
      if (to.name !== from.name) {
        this.applySelection(this.sortBy);
      }
    },

    sortBy(value) {
      console.log(`hmm ${value}`);
      this.applySelection(value);
    },
  },

  created() {
    this.setSelectedItem(this.sortBy);
  },

  methods: {
    ...mapActions('beverages', [
      'setBeverages',
      'setSortBy',
    ]),

    applySelection(value) {
      this.hide();
      this.setSelectedItem(value);

      // Only push it if it makes a difference (to avoid extra browser history entries).
      if (value !== this.$route.query.sortby) {
        this.$router.push({
          name: this.$route.name,
          query: Object.assign({}, this.$route.query, { sortby: value }),
        });
      }
    },

    sortNaturally(toSort, value, order) {
      let a;
      let b;
      let a1;
      let b1;
      const rx = /(\d+)|(\D+)/g;
      const rd = /\d+/;
      return toSort.sort((as, bs) => {
        const f = order === 'ASC' ? as : bs;
        const s = order === 'ASC' ? bs : as;
        a = String(f[value]).toLowerCase().match(rx);
        b = String(s[value]).toLowerCase().match(rx);
        while (a.length && b.length) {
          a1 = a.shift();
          b1 = b.shift();
          if (rd.test(a1) || rd.test(b1)) {
            if (!rd.test(a1)) return 1;
            if (!rd.test(b1)) return -1;
            if (a1 !== b1) return a1 - b1;
          } else if (a1 !== b1) {
            return a1 > b1 ? 1 : -1;
          }
        }
        return a.length - b.length;
      });
    },

    sortBySelect(event) {
      const { value } = event.target;
      this.onClickEnter(value);
    },

    hide() {
      this.visible = false;
    },

    setSelectedItem(value) {
      this.selectedItem.key = value;

      this.sortOptions.forEach((sortOption) => {
        if (sortOption.key === value) {
          this.selectedItem.name = sortOption.name;
        }
      });
    },

    toggleVisibility() {
      this.visible = !this.visible;
    },

    onClickEnter(value) {
      this.sort(value);
    },

    isSelected(element) {
      return (!this.selectedItem.key
        ? this.sortOptions[0].key
        : this.selectedItem.key) === element;
    },

    sort(value) {
      this.setSortBy(value);
      Object.keys(this.beverages).forEach((key) => {
        const sortedBeverages = this.sortNaturally(this.beverages[key], value, 'ASC');
        this.beverages[key] = sortedBeverages;
      });

      this.setBeverages(this.beverages);
    },
  },
};
