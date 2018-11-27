<template>
  <div class="accordion">
    <ul class="accordion__container">
      <slot />
    </ul>
  </div>
</template>

<style scoped>
.accordion__container {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
</style>
