import { mount } from '@vue/test-utils'
import Timer from '../src/components/Timer.vue'

describe('Timer.vue', () => {
  it('should render', () => {
    const wrapper = mount(Timer, {
      props: {
        minute: 5,
        second: 15,
      },
    })

    expect(wrapper.find('.timer__minute').text()).toContain('05')
    expect(wrapper.find('.timer__second').text()).toContain('15')
    expect(wrapper.find('.timer__millisecond').text()).toContain('00')
  })
})
