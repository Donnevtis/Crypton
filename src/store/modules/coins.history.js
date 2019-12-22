import API from '../../api/coincap-api'
const
    state = {
        coins: {}
    },
    getters = {},
    actions = {
        fetchRates({ state, commit, dispatch }, { coinName = 'bitcoin', mnths }) {
            API.closeWS(); //close WevSocket for prevent multiconnect
            coinName = coinName.toLowerCase()
            if (mnths) {
                if (state.coins[coinName]?.__updated == new Date().setUTCHours(0, 0, 0, 0)) { //Date == today without hours, min and sec
                    return Promise.resolve()
                } else return API.fullData(coinName).then(res => commit('setFullRates', { res, coinName })) //res == {...[price, time, ...etc]}; probable needs remove etc                    
            } else {
                return API.lastData(coinName).then(res => {
                    commit('setLastRates', { res, coinName })
                    dispatch('getCurrentRates', coinName)
                })
            }
        },
        getCurrentRates({ commit }, coinName) {
            API.openWS(coinName, (current) => commit('addCurrentPrice', { current, coinName })) //current == {price, time}
        }
    },
    mutations = {
        setFullRates(state, { res, coinName }) {
            const __updated = new Date().setUTCHours(0, 0, 0, 0)
            state.coins[coinName] = { ...state.coins[coinName], fullRates: res, __updated }
        },
        setLastRates(state, { res, coinName }) {
            state.coins[coinName] = { ...state.coins[coinName], lastRates: res }
        },
        addCurrentPrice({ coins }, { currents, coinName }) {
            coins[coinName].lastRates.push(currents)
        }

    }

export default { state, getters, actions, mutations }