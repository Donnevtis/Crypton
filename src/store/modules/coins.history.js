import API from '../../api/coincap-api'
const
    state = {
        coins: {}
    },
    getters = {},
    actions = {
        fetchFullRates({ state, commit }, { coinName = 'bitcoin' }) {
            API.closeWS(); //close WebSocket for prevent multiconnect
            coinName = coinName.toLowerCase()

            if (state.coins[coinName]?.__updated === new Date().setUTCHours(0, 0, 0, 0)) { //Date == today without hours, min and sec
                return Promise.resolve()
            } else return API.fullData(coinName).then(res => commit('setFullRates', { res, coinName })) //res == {...[price, time, ...etc]}; probable needs remove etc                    

        },
        fetchCurrentRates({ commit }, { coinName = 'bitcoin' }) {
            API.closeWS(); //close WebSocket for prevent multiconnect
            return API.lastData(coinName).then(res => {
                commit('setLastRates', { res, coinName })
                API.openWS(coinName, current => { //current == {price, time}
                    commit('addCurrentPrice', { current, coinName })
                })
            })
        },
        closeWS() {
            API.closeWS();
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
        addCurrentPrice({ coins }, { current, coinName }) {
            coins[coinName].lastRates.push(current)
            if (coins[coinName].lastRates.length >= 600) coins[coinName].lastRates.shift()
        }

    }

export default { state, getters, actions, mutations }