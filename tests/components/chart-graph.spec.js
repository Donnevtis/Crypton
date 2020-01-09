import { shallowMount, createLocalVue } from '@vue/test-utils'
import ChartGraph from '../../src/components/chart/ChartGraph'
import Spinner from '../../src/components/Spinner'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('chart component', () => {
    let getters
    let actions
    let store

    beforeEach(() => {
        getters = {
            activeStamp: () => { return { mnth: 12 } },
            activeWallet: () => 'bitcoin',
        }
        actions = {
            fetchFullRates: jest.fn(),
            fetchCurrentRates: jest.fn()
        }
        store = new Vuex.Store({
            getters,
            actions
        })
    })
    it('show spinner', () => {
        const wrapper = shallowMount(ChartGraph, {
            store,
            localVue,
            data() {
                return {
                    isLoad: false
                }
            }
        })
        expect(wrapper.contains(Spinner)).toBe(true)
    })
    it('hide spinner', () => {
        const wrapper = shallowMount(ChartGraph, {
            store,
            localVue,
            data() {
                return {
                    isLoad: true
                }
            }
        })
        expect(wrapper.contains(Spinner)).toBe(false)
    })
})
