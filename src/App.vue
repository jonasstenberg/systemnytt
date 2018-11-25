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
    <RouterView />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  height: 100%;
  color: #2c3e50;
  overflow-x: hidden;
}
</style>
