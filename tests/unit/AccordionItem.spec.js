import { shallowMount } from '@vue/test-utils';
import AccordionItem from '@/components/AccordionItem.vue';

describe('AccordionItem.vue', () => {
  test('should render content correctly', () => {
    const wrapper = shallowMount(AccordionItem);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.accordion-item').exists()).toBe(true);
    expect(wrapper.find('.accordion-item__header').exists()).toBe(true);
  });
});

describe('AccordionItem.vue', () => {
  it('renders props.expanded when passed', () => {
    const expanded = true;
    const wrapper = shallowMount(AccordionItem, {
      propsData: { expanded },
    });
    expect(wrapper.props().expanded).toBe(true);
  });
});
