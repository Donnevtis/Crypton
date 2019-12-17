//the graph constructor

/* eslint-disabled */
export class ChartField {
    _width = 542
    _height = 153
    _vertical_offset = 12
    shiftPX = 0

    set shift(px) {
        this.shiftPX = px
    }
    animate() {
        let now = ~~performance.now()
            // let now = Date.now();

        function animate(time) {
            // const time = Date.now()
            // this.shift = +(1 / (600 / (~~time - now))).toFixed(3)
            this.shift = .33

            now = time
            requestAnimationFrame(animate.bind(this))
        }
        this.animation = requestAnimationFrame(animate.bind(this))
    }
    stopAnimate() {
        if (this.animation === undefined) return
        cancelAnimationFrame(this.animation)
    }

}

export class Curve extends ChartField {
    constructor({ data, range }) {
        super()
        this.range = range
        this.croppedData = this.cropData(data)
        this.limits = this.findLimits(this.croppedData)
        this.pricesItems = this.setPriceItems()
        this.xResolution = (this.croppedData[this.croppedData.length - 1].time - this.croppedData[0].time) / this._width
        this.yResolution = (this.limits.max - this.limits.min) / this._height
        this.startY = this.costToCoordsY(this.croppedData[0].priceUsd)
            //init stack props for croppedData data
        this.dataStack = [{
            x: 0,
            y: this.startY,
            time: this.croppedData[0].time,
            price: +this.croppedData[0].priceUsd
        }]
        this.buildCoords()
    }
    buildCoords() {
        for (let i = 1; i < this.croppedData.length; i++) {
            const pathX = (this.croppedData[i].time - this.croppedData[0].time) / this.xResolution
            const pathY = this.costToCoordsY(this.croppedData[i].priceUsd)
            this.dataStack.push({
                x: pathX,
                y: pathY,
                time: this.croppedData[i].time,
                price: +this.croppedData[i].priceUsd
            })
        }
    }
    cropData(data) {
        let i = data.length - 1
        while (data[i].time >= Date.now() - this.range) {
            --i
        }
        return data.slice(i)
    }
    findLimits(croppedData) {
        const min = croppedData.reduce(
            (prev, item) => Math.min(prev, item.priceUsd),
            9e12
        )
        const max = croppedData.reduce(
            (prev, item) => Math.max(prev, item.priceUsd),
            0
        )
        return { min, max }
    }
    setLimits(croppedData) {
        this.limits = this.findLimits(croppedData)
    }
    costToCoordsY(cost) {
        return (this.limits.max - this.limits.min - (+cost - this.limits.min)) / this.yResolution
    }
    addNewPrice({ priceUsd, time }) {
        const y = this.costToCoordsY(priceUsd)
        this.dataStack = [{
            x: 542,
            y,
            time,
            price: +priceUsd
        }]
    }
    setPriceItems(count = 4) {
        let max = this.limits.max
        const step = (max - this.limits.min) / count
        const prices = []
        let y = this._vertical_offset
        for (let i = 0; i < count + 1; i++) {
            let price =
                max >= 1000 && this.range > 4e5 ? (max / 1000).toFixed(1) + "k" : "$" + ~~max
            prices.push({ price, y })
            y += 38.5
            max -= step
        }
        return prices
    }
    set shiftX(shift) {
        this.animate()
        this.dataStack.forEach((d, _, a) => {
            d.x -= shift
            if (d.x <= -70) a.shift()
        })
    }
    set setCurrents(currents) {
        this.coinData.slice(-1)[0]

        this.currents = currents
    }
}