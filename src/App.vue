<template>
  <div id="app">
    <h1>systemnytt</h1>
    <div id="nav">
      <RouterLink
        class="btn btn__beer"
        to="/">
        Öl
      </RouterLink>
      <RouterLink
        class="btn btn__wine"
        to="/wines">
        Vin
      </RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 16px;
  overflow-x: hidden;
  background-color: #eee;
  background-image: url('./assets/background.png');
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  height: 100%;
  color: #505050;
  text-align: center;
}

.btn {
  background-repeat: no-repeat;
  background-position: center left 50px;
  background-size: 2rem;
  display: inline-block;
  border-radius: 4px;
  background-color: #ADCAD6;
  text-decoration: none;
  border: none;
  color: #505050;
  text-align: center;
  font-size: 1.5rem;
  padding: 10px 10px 10px 30px;
  width: 150px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.btn__beer {
  background-image: url('./assets/beer.svg');
}

.btn__wine {
  background-image: url('./assets/wine.svg');
}

@media (max-width: 768px) {
  .btn {
    background-position: center left 40px;
    background-size: 1.5rem;
    width: 130px;
    padding: 10px 10px 10px 20px;
    font-size: 1rem;
    margin: 0 5px;
  }
}
</style>
