<template>
  <main id="app">
    <h1 class="title">
      systemnytt.se
    </h1>
    <h4 class="title__description">
      småpartier på systembolaget
    </h4>
    <navigation
      :items="menuItems" />
    <router-view />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from './components/Navigation.vue';

export default {
  components: {
    Navigation,
  },

  computed: {
    ...mapGetters('beverages', [
      'menuItems',
    ]),
  },

  async created() {
    if (this.$route.query.release_date) {
      await this.fetchBeverages(this.$route.query.release_date);
    } else {
      await this.fetchBeverages();
    }
  },

  methods: {
    ...mapActions('beverages', [
      'fetchBeverages',
    ]),
  },
};
</script>

<style>
html {
  height: 100%;
  font-size: 16px;
  box-sizing: border-box
}

*,:after,:before {
    box-sizing: inherit
}

body {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  background-color: #eee;
  background-image: url('./assets/background.png');
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}

*:focus {
    outline: none;
}

main {
  flex: 1;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0;
}

.title__description {
  text-align: center;
  font-weight: normal;
  font-size: 1rem;
  margin-top: 0;
}

footer {
  flex: none;
  padding: 0 1rem;
  margin: 0 auto;
  text-align: center;
  max-width: 700px;
}

footer a {
  color: #333;
}
</style>
