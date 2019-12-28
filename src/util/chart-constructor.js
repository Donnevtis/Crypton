//the graph constructor


export class Chart {
    #XStep = 80
    #YStep = 50
    #width = 600
    #height = 200
    constructor(box) {
        this.#width = this.XStep * ~~(box.clientWidth / this.XStep)
        this.#height = this.YStep * ~~(box.clientHeight / this.YStep)
        const absciss = Math.floor(this.width / this.XStep) - 1
        const ordinates = Math.floor(this.height / this.YStep)
        this.viewBox = `0 0 ${this.width} ${this.height}`
        this.gridX = this.stepper(this.XStep, absciss, 'x', 30) //coords for horizontal grid            
        this.gridY = this.stepper(this.YStep, ordinates, 'y') //horizontal dividing lines
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
        this.chartLinePath()
        this.createLabels()
        this.createTicks()
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
    chartLinePath() {
        const d = [`M${this.dataStack[0].x}, ${this.dataStack[0].y} `];

        for (let i = 1; i < this.dataStack.length; i++) {
            d.push(`L${this.dataStack[i].x}, ${this.dataStack[i].y} `)
        }

        this.d = d.join('')
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
        const output = this.range > 4e5 ? daysToLocal() : timeToLocal()
        this.gridX.forEach(i => {
            const t = this.dataStack.find((l, index, arr) => l.x <= i.x && arr[index + 1].x >= i.x)
            i.t = output(t.time)
        });

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
            x: this.width,
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
        return this.#height
    }
    get width() {
        return this.#width
    }
    get XStep() {
        return this.#XStep
    }
    get YStep() {
        return this.#YStep
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
















