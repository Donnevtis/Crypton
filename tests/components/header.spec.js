import { shallowMount } from '@vue/test-utils'
import AppHeader from '../../src/components/AppHeader'

describe('chart component', () => {
    it('show spinner', () => {
        const wrapper = shallowMount(AppHeader, {
            data() {
                return {
                    fullName: 'name'
                }
            }
        })
        expect(wrapper.find('.name').text()).toEqual('name')
    })
})