<template>
  <main id="app">
    <div class="content">
      <h1>systemnytt</h1>
      <nav id="nav">
        <router-link
          class="tab tab--beer"
          to="/">
          Öl
        </router-link>
        <router-link
          class="tab tab--wine"
          to="/wines">
          Vin
        </router-link>
      </nav>
      <router-view />
    </div>
    <footer>
      <p class="footer__paragraph">
        systemnytt.se är skapad av Jonas Stenberg och Martin Wendt.
      </p>
      <p class="footer__paragraph">
        Projectet är open source och finns att hitta på <a href="https://www.github.com/jonasstenberg/systemnytt/">GitHub</a>.
      </p>
    </footer>
  </main>
</template>

<style>
html {
  height: 100%;
  font-size: 16px;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow-x: hidden;
  background-color: #eee;
  background-image: url('./assets/background.png');
  margin: 0;
}

*:focus {
    outline: none;
}

main {
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #333;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.footer__paragraph {
  display: block;
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

@media (min-width: 768px) {
  .tab {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
}
</style>
