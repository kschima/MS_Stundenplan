import { shallowMount } from '@vue/test-utils'
import Bookings from '@/components/Bookings.vue'

describe('Bookings.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Bookings, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
