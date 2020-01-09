import { Chart } from '../../src/util/chart-constructor'

describe('chart class', () => {

    const box = {
        clientWidth: 1200.6,
        clientHeight: 400.3
    }
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
        range: 3e4
    }

    it('viewBox', (() => {
        expect(chart).toEqual({
            viewBox: '0 0 1200 400'
        });
    }))

    it('dataStack', (() => {
        chart.initChart(data)
        expect(chart.dataStack.length).toBe(5);
        expect(chart.dataStack.slice(-1)[0].x).toBe(1200);
        expect(chart.dataStack.slice(-1)[0].y).toBe(0);
    }))

    it('svg path', (() => {
        expect(chart.chartLinePath).toBe('M0, 400 L300, 300 L600, 200 L900, 100 L1200, 0');
    }))

})
