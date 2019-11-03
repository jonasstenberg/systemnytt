<template>
  <li
    :aria-expanded="isExpanded ? 'true' : 'false'"
    class="accordion-item">
    <h4
      role="button"
      :class="['accordion-item__header', { 'accordion-item__header-active': isExpanded }]"
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
  padding: 0 2rem 0 1rem;
  margin: 3px;
  font-weight: normal;
  cursor: pointer;
}

.accordion-item__header:hover {
  background: #f1f1f1;
  border: 3px solid #03813c;
  margin: 0;
}

.accordion-item__header-active {
  background-color: #f1f1f1;
  border: 3px solid #03813c;
  margin: 0;
}
</style>
