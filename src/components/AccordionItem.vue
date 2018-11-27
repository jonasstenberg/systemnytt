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

    active: {
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
  border-top: 1px solid var(--color-gray);
}

.accordion-item__header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0;
  font-weight: normal;
  cursor: pointer;
}

.accordion-item__content {
  padding-bottom: 2rem;
}

.accordion-item__header::before,
.accordion-item--active .accordion-item__header::after {
  width: 1.5rem;
  height: 1.5rem;
  content: '';
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1.5rem;
}

.accordion-item__header::before {
  margin-right: 0.5rem;
  background-image: url("../assets/plus.svg");
  transition: transform 0.25s ease;
}

.accordion-item--expanded .accordion-item__header::before {
  transform: rotate(45deg);
}

.accordion-item--active:not(.accordion-item--expanded) .accordion-item__header {
  background: red;
}
</style>
