import { shallowMount } from '@vue/test-utils';
import Accordion from '@/components/Accordion.vue';

describe('Accordion.vue', () => {
  test('should render content correctly', () => {
    const wrapper = shallowMount(Accordion);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.accordion').exists()).toBe(true);
    expect(wrapper.find('.accordion__container').exists()).toBe(true);
  });
});
