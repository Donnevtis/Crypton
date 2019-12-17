import Vue from 'vue'
import { Curve } from '../../util/chart-constructor'
import API from '../../api/coincap-api'
const
    state = {
        coins: {}
    },
    getters = {},
    actions = {
        fetchRates({ state, commit, dispatch }, { coinName = 'bitcoin', isCurrent = true }) {
            API.closeWS();
            coinName = coinName.toLowerCase()
            if (isCurrent) {
                if (!state[coinName] || state[coinName].__updated !== new Date().setUTCHours(0, 0, 0, 0)) {
                    API.fullData(coinName).then(res => commit('setFullRates', { res, coinName }))
                    return Promise.resolve()
                }
                return Promise.resolve()

            }
            API.lastData(coinName).then(res => {
                commit('setLastRates', { res, coinName })
                dispatch('getCurrentRates', coinName)
            })
            return Promise.resolve()

        },
        getCurrentRates({ commit }, coinName) {
            API.openWS(coinName, (current) => commit('addCurrentPrice', { current, coinName }))
        }
    },
    mutations = {
        //create curve
        setCoinData(state, { name, data, range }) {
            state.activeCoinName = name;
            const curve = new Curve({ data, range });
            Vue.set(state.coins[name], 'curve', curve);
        },
        setFullRates(state, { res, coinName }) {
            const __updated = new Date().setUTCHours(0, 0, 0, 0)
            state.coins[coinName] = {...state.coins[coinName], fullRates: res, __updated }

        },
        setLastRates(state, { res, coinName }) {
            state.coins[coinName] = {...state.coins[coinName], lastRates: res }
        },
        addCurrentPrice({ coins }, { currents, coinName }) {
            coins[coinName].lastRates.push(currents)
        }

    }

export default { state, getters, actions, mutations }