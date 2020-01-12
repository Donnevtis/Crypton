//the graph constructor

export class Chart {
    #stepX
    #stepY
    #width
    #height
    constructor(box) {
        this.#stepX = box.stepX ? Math.max(box.stepX, 30) : 70
        this.#stepY = Math.max(box.stepY, 10) || 50
        this.#width = this.stepX * ~~(box.width / this.stepX) || 600
        this.#height = this.stepY * ~~(box.height / this.stepY) || 200
        this.viewBox = `0 0 ${this.width} ${this.height}`
    }

    stepper(range, steps, axis, from = 0) {
        return [... {
            *[Symbol.iterator]() {
                for (let i = 0; i < steps + 1; i++) {
                    yield ({ [axis]: from })
                    from += range
                }
            }
        }]
    }

    // MAIN CHART LINE CREATOR 
    initChart(data) {
        const absciss = Math.floor(this.width / this.stepX) - 1
        const ordinates = Math.floor(this.height / this.stepY)
        this.gridX = this.stepper(this.stepX, absciss, 'x', 30) //coords for horizontal grid, left offset = 30     
        this.gridY = this.stepper(this.stepY, ordinates, 'y') //horizontal dividing lines   
        this.createChartLine(data)
    }
    createChartLine({ data, range }) {
        this.range = range || 36e4

        const cropData = data => {
            let i = data.length - 1
            while (data[i].time >= Date.now() - this.range) {
                --i
            }
            return data.slice(i)
        }

        const croppedData = cropData(data)
        this.limits = this.findLimits(croppedData)
        const xResolution = (croppedData[croppedData.length - 1].time - croppedData[0].time) / this.width
        this.yResolution = (this.limits.max - this.limits.min) / this.height
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
    get chartLinePath() {
        const d = [`M${this.dataStack[0].x}, ${this.dataStack[0].y} `];

        for (let i = 1; i < this.dataStack.length; i++) {
            d.push(`L${this.dataStack[i].x}, ${this.dataStack[i].y} `)
        }

        return d.join('').trim()
    }


    // USD LABELS CREATOR
    createLabels() {
        let max = this.limits.max
        const step = (max - this.limits.min) / this.gridY.length
        this.gridY.forEach(i => {
            i.$ = max >= 1000 && this.range > 4e5 ? (max / 1000).toFixed(1) + "k" : max.toFixed(2)
            max -= step
        })
    }


    // TIME/DATE LABELS CREATOR    
    createTicks() {
        this.gridX.forEach((label, index) => { label.t = this.timeSetter(label); label.i = index });
    }
    timeSetter(time) {
        const output = this.range > 4e5 ? daysToLocal() : timeToLocal()

        function timeToLocal() {
            return mSec =>
                new Date(mSec).toLocaleString("en", {
                    hour12: false,
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                });
        }

        function daysToLocal() {
            return mSec =>
                new Date(mSec).toLocaleString("en", {
                    day: "numeric",
                    month: "short"
                }).toLowerCase()

        }

        const t = this.dataStack.find((l, index, arr) => l.x <= time.x && arr[index + 1].x >= time.x)
        return output(t.time)
    }

    currentPrice(data) {
        this.createChartLine(data)
        this.gridX.forEach(i => i.x -= this.dataStack[this.dataStack.length - 1].x - this.dataStack[this.dataStack.length - 2].x)
        if (this.gridX[0].x <= -30) {
            const i = -this.gridX[0].i
            const x = this.gridX[this.gridX.length - 1].x + this.stepX
            const t = this.timeSetter({ x })
            this.gridX.push({ x, t, i })
            this.gridX.shift()

        }
    }

    // GETTER/SETTER SECTION   
    get height() {
        return this.#height
    }
    get width() {
        return this.#width
    }
    get stepX() {
        return this.#stepX
    }
    get stepY() {
        return this.#stepY
    }

}












