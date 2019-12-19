//the graph constructor


export class Chart {
    _width = 498
    constructor() {
        
        this._height = 148
        this._verticalStep = 37
        this.range = 36e5
        const ordinates = Math.floor(this._height / this._verticalStep)
        this.chartLineWidth = this._width
        this.viewBox = `0 0 ${this._width} ${this._height}`
        this.gridY = this.#stepper(this._verticalStep, ordinates) //coords for vertical grid
        this.startline = new Coords(this.chartLineWidth, this.chartLineWidth, 0, this._height) //chart draw start line
        this.crossHair = this.gridY.map(y => new Coords(0, this._width, y, y)) //horizontal dividing lines

        function Coords(x1, x2, y1, y2) {
            this.x1 = x1
            this.x2 = x2
            this.y1 = y1
            this.y2 = y2
        }
    }
    #stepper(range, steps, from = 0) {
        return [... {
            *[Symbol.iterator]() {
                for (let i = 0; i < steps + 1; i++) {
                    yield (from)
                    from += range
                }
            }
        }]
    }


    // MAIN CHART LINE CREATOR 
    createChartLine({ data, range }) {
        this.range = range
        const croppedData = cropData(data)
        this.limits = this.findLimits(croppedData)
        const xResolution = (croppedData[croppedData.length - 1].time - croppedData[0].time) / this._width
        this.yResolution = (this.limits.max - this.limits.min) / this._height
        this.dataStack = []

        for (let i = 0; i < croppedData.length; i++) {
            const pathX = ((croppedData[i].time - croppedData[0].time) / xResolution).toFixed(2)
            const pathY = (this.costToCoordsY(croppedData[i].priceUsd)).toFixed(2)
            this.dataStack.push({
                x: +pathX,
                y: +pathY,
                time: +croppedData[i].time,
                price: +croppedData[i].priceUsd
            })
        }

        this.createLabels()
        this.createTicks()

        function cropData(data) {
            let i = data.length - 1
            while (data[i].time >= Date.now() - range) {
                --i
            }
            return data.slice(i)
        }

    }
    costToCoordsY(cost) {
        return (this.limits.max - this.limits.min - (+cost - this.limits.min)) / this.yResolution
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


    // USD LABALS CREATOR
    createLabels() {
        let max = this.limits.max
        const step = (max - this.limits.min) / this.crossHair.length
        this.crossHair.forEach(l => {
            l.$ = max >= 1000 && this.range > 4e5 ? (max / 1000).toFixed(1) + "k" : "$" + max.toFixed(2)
            max -= step
        })
    }


    // TIME/DATE LABELS CREATOR
    createTicks() {
        const __count = 6;
        const timeStep = this.range / __count;
        const output = this.range > 4e5 ? daysToLocal() : timeToLocal();
        let x = 30;
        let t = Date.now() - this.range;
        this.ticks = []

        for (let i = 0; i < __count; i++) {
            this.ticks.push({ t: output(t), x });
            t = +t + timeStep;
            x += this._width / __count;
        }

        function timeToLocal() {
            return mSec =>
                new Date(mSec).toLocaleString("en", {
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric"
                });
        }
        function daysToLocal() {
            return mSec =>
                new Date(mSec).toLocaleString("en", {
                    day: "numeric",
                    month: "short"
                });
        }
    }


    // GETTER/SETTER SECTION
    set newPrice({ priceUsd, time }) {
        const y = this.costToCoordsY(priceUsd)
        this.dataStack.push({
            x: this.chartLineWidth,
            y,
            time,
            price: +priceUsd
        })
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
    get getNewDate() {
        const x = 530;
        return { t: new Date(), x }
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }

}




    // animate() {
    //     let now = ~~performance.now()
    //     function animate(time) {
    //         this.shift = +(1 / (600 / (~~time - now))).toFixed(3)
    //         this.shift = .33
    //         requestAnimationFrame(animate.bind(this))
    //     }
    //     this.animation = requestAnimationFrame(animate.bind(this))
    // }
    // stopAnimate() {
    //     if (this.animation === undefined) return
    //     cancelAnimationFrame(this.animation)
    // }
















