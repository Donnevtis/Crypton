import { Chart } from '~~/assets/scripts/chart-constructor'
import { box, coinData, line } from '../constants'

describe('chart class', () => {

    const chart = new Chart(box)
    const rates = () => {
        const res = []
        let start = Date.now() - 6e4
        for (let i = 0; i < 10; i++) {
            res.push({ priceUsd: i * 100, time: start })
            start += 6e3
        }
        return res
    }
    const data = {
        data: rates(),
        range: 3e4,
    }
    it('viewBox', () => {
        expect(chart).toEqual({
            viewBox: '0 0 1200 400'
        });
    })
    describe('graph field and graph line', () => {

        beforeEach(() => {
            chart.initChart(data)
        })

        it('dataStack', () => {
            expect(chart.dataStack.length).toBe(5);
            expect(chart.dataStack.slice(-1)[0].x).toBe(1200);
            expect(chart.dataStack.slice(-1)[0].y).toBe(0);
        })

        it('limits', () => {
            expect(chart.limits).toEqual({ min: 500, max: 900 })
        })

        it('price lines', () => {
            expect(chart.gridY[0].$).toBe('900.00')
            expect(chart.gridY[10].$).toBe('500.00')
        })

        it('svg path', () => {
            expect(chart.chartLinePath).toBe(line);
        })
    })

})
