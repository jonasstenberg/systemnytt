<template>
  <nav
    ref="navigation"
    class="navigation">
    <ul class="navigation__list">
      <li
        v-for="item in items"
        :key="item.key"
        class="navigation__list-item">
        <button
          class="navigation__link"
          @click="navigate(item.key)">
          {{ item.key }} ({{ item.len }})
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters('beverages', [
      'selectedReleaseDate',
    ]),
  },

  methods: {
    ...mapActions('beverages', [
      'setProductGroup',
    ]),

    navigate(key) {
      this.setProductGroup(key);

      this.$router.push({
        path: key,
        query: Object.assign({}, this.$route.query, {
          release_date: this.selectedReleaseDate,
        }),
      });
    },
  },
};
</script>

<style scoped>
  .navigation {
    position: relative;
    height: auto;
  }

  .navigation::after,
  .navigation::before {
    position: absolute;
    content: '';
    top: 0;
    width: 0px;
    height: 100%;
    box-shadow: 0 0 1rem 0.5rem rgba(255, 255, 255, 0.9);
  }

  .navigation::after {
    right: 0;
  }

  /* Hide scrollbar on WebKit browsers */
  .navigation__list::-webkit-scrollbar {
    display: none;
  }

  .navigation__list {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    flex-wrap: nowrap;
    overflow-x: scroll;
    width: 100%;
    max-width: 799px;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
  }

  .navigation__list-item {
    flex-shrink: 0;
    padding: 0;
  }

  .navigation__link {
    background: #03813c;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    margin: 0.25rem;
    cursor: pointer;
    border: 0;
  }

  .navigation__list-item:last-child > .navigation__link {
    margin-right: 1rem;
  }

  .navigation__list-item:first-child > .navigation__link {
    margin-left: 1rem;
  }

  .navigation__link:hover,
  .navigation__link--active {
    background: #05ad51;
  }

  @media (min-width: 799px) {
    .navigation {
      margin: 0 auto;
    }

    .navigation__list {
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 auto;
    }

    .navigation__list-item {
      margin: 0;
    }

    .navigation__list-item:last-child > .navigation__link {
      margin-left: 0;
    }

    .navigation__list-item:first-child > .navigation__link {
      margin-left: 0;
    }

    .navigation::after,
    .navigation::before {
      display: none;
    }
  }
</style>
