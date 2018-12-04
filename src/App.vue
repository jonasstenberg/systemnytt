<template>
  <main id="app">
    <h1>systemnytt</h1>
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
    await this.fetchBeverages();
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

h1 {
  text-align: center;
}

footer {
  flex: none;
  padding: 0 1rem;
  text-align: center;
}

footer a {
  color: #333;
}
</style>
