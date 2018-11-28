<template>
  <main id="app">
    <h1>systemnytt</h1>
    <nav id="nav">
      <router-link
        class="btn btn__beer"
        to="/"
        tag="button">
        Öl
      </router-link>
      <router-link
        class="btn btn__wine"
        to="/wines"
        tag="button">
        Vin
      </router-link>
    </nav>
    <router-view />
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #505050;
}

nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
}

.btn {
  display: flex;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
  background-color: #03813C;
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
  margin: 0 0.5rem;
}

.btn::before {
  content: '';
  width: 2rem;
  height: 2rem;
}

.btn__beer::before {
  background-image: url('./assets/beer.svg');
}

.btn__wine::before {
  background-image: url('./assets/wine.svg');
}

@media (min-width: 768px) {
  .btn {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
}
</style>
