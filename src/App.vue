<template>
  <div id="app">
    <div id="nav">
      <RouterLink to="/">
        Home
      </RouterLink> |
      <RouterLink to="/about">
        About
      </RouterLink>
    </div>
    <h1>systemnytt</h1>
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
  color: #2c3e50;
  overflow-x: hidden;
  text-align: center;
  padding: 2rem 0;
}
</style>
