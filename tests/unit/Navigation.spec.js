import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import Navigation from '@/components/Navigation.vue';

describe('Navigation.vue', () => {
  it('renders props.items when passed', () => {
    const items = [
      {
        key: 'Whisky',
        len: 10,
      },
      {
        key: 'Rom',
        len: 5,
      },
    ];
    const wrapper = shallowMount(Navigation, {
      propsData: { items },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.props().items).toEqual(expect.arrayContaining(items));
  });
});
