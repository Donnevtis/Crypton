import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ChartGraph from '../../src/components/base/chart/ChartGraph'
import Spinner from '../../src/components/Spinner'
import Vuex from 'vuex'
import Blinker from '../../src/components/base/chart/ChartBlinkPoint'
import Helper from '../../src/components/base/chart/ChartHelper'
import { d, coinData } from '../constants'
const localVue = createLocalVue()
localVue.use(Vuex)


describe('chart component', () => {
    let state
    let getters
    let actions
    let store
    let factory
    let wrapper

    const createAndWait = async () => {
        wrapper = factory()
        await actions.fetchCurrentRates.mock.results[0].value
        await wrapper.vm.$nextTick()
    }

    beforeEach(() => {
        state = {
            history: { coins: { ...coinData } }
        }
        getters = {
            activeStamp: () => { return { mnth: 0 } },
            activeWallet: () => { return { name: 'bitcoin' } },
            dateRange: () => Date.now() - 1515715200000
        }
        actions = {
            fetchFullRates: jest.fn(() => Promise.resolve()),
            fetchCurrentRates: jest.fn(() => Promise.resolve())
        }
        store = new Vuex.Store({
            state,
            getters,
            actions
        })
        factory = props =>
            mount(ChartGraph, {
                store,
                localVue,
                attachToDocument: true,
                ...props
            })

    })

    afterEach(() => {
        wrapper.destroy()
    })

    describe('chart spinner', () => {
        it('show spinner', () => {
            wrapper = factory()
            expect(wrapper.contains(Spinner)).toBe(true)
        })

        it('hide spinner', async () => {
            await createAndWait()
            expect(wrapper.contains(Spinner)).toBe(false)
        })
    })

    describe('chart content', () => {
        it('show blinker', async () => {
            await createAndWait()
            expect(wrapper.contains(Blinker)).toBe(true)
        })

        it('show helper', async () => {
            await createAndWait()
            expect(wrapper.contains(Helper)).toBe(true)
        })

        it('graph', async () => {
            await createAndWait()
            expect(wrapper.vm.d).toBe(d)
        })
        it('timers', async () => {
            await createAndWait()
            expect(wrapper.contains('.chart-timers')).toBe(true)
        })
        it('labels', async () => {
            await createAndWait()
            expect(wrapper.contains('.chart-labels')).toBe(true)
        })
    })

})
