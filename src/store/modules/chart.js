import Vue from 'vue'
import { Chart } from '../../util/chart-constructor'

const state = {
    charts: {},
},
    getters = {
        chartLinePath: ({ charts }) => name => {
            const lineData = charts[name].dataStack
            const d = [`M${lineData[0].x},${lineData[0].y}`];
            for (let i = 1; i < lineData.length; i++) {
                d.push(`L${lineData[i].x},${lineData[i].y}`)
            }
            return d.join('')
        },
        activeChart: ({ charts }, getters) => charts[getters.getActiveWallet.name]


    },
    actions = {
        createChart({ rootState, dispatch, commit, getters }, { coinName, mnths = true }) {
            const rates = mnths ? 'fullRates' : 'lastRates'
            commit('createChartField', coinName)
            return dispatch('fetchRates', { coinName, mnths })
                .then(() => {

                    commit('createChartLine', { data: rootState.history.coins[coinName][rates], range: getters.dateRange, coinName })
                })
        }
    },
    mutations = {
        createChartField({ charts }, coinName) {
            const chart = new Chart
            Vue.set(charts, coinName, chart);
        },
        createChartLine(state, data) {
            state.charts[data.coinName].createChartLine(data)
        },
        setWidth(state) {
            state.chart.width = 2
        }
    }

export default { state, getters, actions, mutations }