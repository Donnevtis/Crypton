import { ChartField } from '../../util/chart-constructor'

const state = {
        chartField: {}
    },
    getters = {
        svgPath: ({ coins }) => name => {
            if (!coins[name].hasOwnProperty('curve')) return 'M0,0L100,100'
            const curveData = coins[name].curve.dataStack
            const d = [`M${curveData[0].x},${curveData[0].y}`];
            for (let i = 1; i < curveData.length; i++) {
                d.push(`L${curveData[i].x},${curveData[i].y}`)
            }
            return d.join('')
        },
    },
    mutations = {
        createChartField(state) {
            state.chartField = new ChartField
        },
        startAnimation({ chartField }) {
            chartField.animate()
        },
        stopAnimation({ chartField }) {
            chartField.stopAnimate()
        }
    }

export default { state, getters, mutations }