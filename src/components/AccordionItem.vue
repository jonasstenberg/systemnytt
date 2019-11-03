<template>
  <li
    :aria-expanded="isExpanded ? 'true' : 'false'"
    :class="['accordion-item', { 'accordion-item--expanded': isExpanded }]">
    <h4
      role="button"
      class="accordion-item__header"
      tabindex="0"
      @click="toggle"
      @keyup.enter="toggle">
      <slot name="title" />
    </h4>
    <div
      v-if="isExpanded"
      class="accordion-item__content">
      <slot name="more-info" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isExpanded: this.expanded,
    };
  },

  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
.accordion-item {
  display: flex;
  flex-direction: column;
  list-style: none;
  border-bottom: 1px solid #f1f1f1;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-item__header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem 0.5rem 0;
  margin: 0;
  font-weight: normal;
  cursor: pointer;
}

.accordion-item__header:hover {
  background: #f2f2f2;
}

.accordion-item__content {
  padding-bottom: 1rem;
}
</style>
