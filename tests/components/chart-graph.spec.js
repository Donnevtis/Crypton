import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ChartGraph from '../../src/components/chart/ChartGraph'
import Spinner from '../../src/components/Spinner'
import Vuex from 'vuex'
import Blinker from '../../src/components/chart/ChartBlinkPoint'
import Helper from '../../src/components/chart/ChartHelper'
const localVue = createLocalVue()
localVue.use(Vuex)

const coinData = {
    "bitcoin": {
        "lastRates": [{ "priceUsd": "13805.6057564532338837", "time": 1515628800000, "date": "2018-01-11T00:00:00.000Z" }, { "priceUsd": "13722.7988452536021464", "time": 1515715200000, "date": "2018-01-12T00:00:00.000Z" }, { "priceUsd": "14271.5266791604401972", "time": 1515801600000, "date": "2018-01-13T00:00:00.000Z" }, { "priceUsd": "13722.6565001658500127", "time": 1515888000000, "date": "2018-01-14T00:00:00.000Z" }, { "priceUsd": "13847.8002197588300577", "time": 1515974400000, "date": "2018-01-15T00:00:00.000Z" }, { "priceUsd": "12124.7764227470634477", "time": 1516060800000, "date": "2018-01-16T00:00:00.000Z" }, { "priceUsd": "10617.4863050440655055", "time": 1516147200000, "date": "2018-01-17T00:00:00.000Z" }, { "priceUsd": "11428.0417459848192602", "time": 1516233600000, "date": "2018-01-18T00:00:00.000Z" }, { "priceUsd": "11461.7714084566219395", "time": 1516320000000, "date": "2018-01-19T00:00:00.000Z" }
        ]
    }
}
const d = 'M0, 30.03 L85.71, 0 L171.43, 30.04 L257.14, 23.19 L342.86, 117.5 L428.57, 200 L514.29, 155.64 L600, 153.79'

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
