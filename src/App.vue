<template>
  <main id="app">
    <h1>systemnytt</h1>
    <nav id="nav">
      <router-link
        v-for="beverage in beverages"
        :key="beverage.key"
        class="tab tab--beer  "
        :to="`/${beverage.key}`">
        {{ beverage.key }} ({{ beverage.values.length }})
      </router-link>
    </nav>
    <router-view />
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('beverages', [
      'beverages',
    ]),
  },

  created() {
    this.fetchBeverages();
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

nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
}

.tab {
  display: flex;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
  background-color: #03813C;
  border: none;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 2rem;
  margin: 0 0.5rem;
}

.tab::before {
  content: '';
  width: 2rem;
  height: 2rem;
}

.tab--beer::before {
  background-image: url('./assets/beer.svg');
}

.tab--wine::before {
  background-image: url('./assets/wine.svg');
}

footer {
  flex: none;
  padding: 0 1rem;
  text-align: center;
}

footer a {
  color: #333;
}

@media (min-width: 768px) {
  .tab {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
}
</style>
