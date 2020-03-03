interface IPricesCollect {
  time: number
  priceUsd: string
}
interface IEntryData {
  data: IPricesCollect[]
  range: number
}
interface IGridX {
  i: number
  t: string
  x: number
}
interface IGridY {
  $: string
  y: number
}
interface IDataStack {
  x: number
  y: number
  time: number
  price: number
}
export class Chart {
  readonly stepX: number
  readonly stepY: number
  readonly width: number
  readonly height: number
  readonly viewBox: string
  gridX: IGridX[] = []
  gridY: IGridY[] = []
  range: number = 36e4
  limits: { [k: string]: number } = {
    min: Number.MAX_VALUE,
    max: 0
  }
  dataStack: IDataStack[] = []

  constructor(box: { [k: string]: number }) {
    const width = box.width || 600
    const height = box.height || 300
    this.stepX = box.stepX ? Math.max(box.stepX, 30) : 70
    this.stepX = width / ~~(width / this.stepX)
    this.stepY = box.stepY ? Math.max(box.stepY, 10) : 50
    this.width = this.stepX * ~~(width / this.stepX) || 600
    this.height = this.stepY * ~~(height / this.stepY) || 200
    this.viewBox = `0 0 ${this.width} ${this.height}`
  }

  // MAIN CHART LINE CREATOR
  initChart() {
    const stepper = function(
      grid: {}[],
      range: number,
      steps: number,
      axis: string,
      from: number = 0
    ) {
      for (let i = 0; i < steps + 1; i++) {
        grid.push({ [axis]: from })
        from += range
      }
    }
    const absciss = Math.floor(this.width / this.stepX) - 1
    const ordinates = Math.floor(this.height / this.stepY)
    this.gridX = []
    this.gridY = []
    stepper(this.gridX, this.stepX, absciss, 'x', 30) //coords for horizontal grid, left offset = 30
    stepper(this.gridY, this.stepY, ordinates, 'y') //horizontal dividing lines
  }

  createChartLine({ data, range }: IEntryData) {
    const cropData = (data: IPricesCollect[]): IPricesCollect[] => {
      let i: number = data.length - 1
      while (data[i].time >= Date.now() - this.range) {
        --i
      }
      return data.slice(i)
    }

    this.range = range || this.range
    const croppedData: IPricesCollect[] = cropData(data)
    this.limits = this.findLimits(croppedData)
    const xResolution: number =
      (croppedData.slice(-1)[0].time - croppedData[0].time) / this.width
    this.dataStack = []

    for (let i = 0; i < croppedData.length; i++) {
      const pathX: number = +(
        (croppedData[i].time - croppedData[0].time) /
        xResolution
      ).toFixed(2)
      const pathY: number = +this.costToCoordsY(
        croppedData[i].priceUsd
      ).toFixed(2)
      this.dataStack.push({
        x: +pathX,
        y: +pathY,
        time: +croppedData[i].time,
        price: +croppedData[i].priceUsd
      })
    }

    this.createLabels()
  }

  costToCoordsY(cost: string): number {
    const yResolution: number =
      (this.limits.max - this.limits.min) / this.height
    return (
      (this.limits.max - this.limits.min - (+cost - this.limits.min)) /
      yResolution
    )
  }

  findLimits(croppedData: IPricesCollect[]): { min: number; max: number } {
    return croppedData.reduce(
      (prev, item) => ({
        min: Math.min(prev.min, +item.priceUsd),
        max: Math.max(prev.max, +item.priceUsd)
      }),
      {
        min: Number.MAX_VALUE,
        max: 0
      }
    )
  }

  // USD LABELS CREATOR
  createLabels() {
    let max: number = this.limits.max
    const step: number = (max - this.limits.min) / (this.gridY.length - 1) // !necessary to devide into intervals, not into amaunt of line

    this.gridY.forEach(i => {
      i.$ =
        max >= 1000 && this.range > 4e5
          ? (max / 1000).toFixed(1) + 'k'
          : max.toFixed(2)
      max -= step
    })
  }

  // TIME/DATE LABELS CREATOR
  createTicks() {
    this.gridX.forEach((label, index) => {
      label.t = this.timeSetter(label.x)
      label.i = index
    })
  }

  timeSetter(coordX: number) {
    type Locale = {
      hour12: false
      hour: 'numeric'
      minute: 'numeric'
      second: 'numeric'
      day: 'numeric'
      month: 'short'
    }
    const localTime: Pick<Locale, 'hour12' | 'hour' | 'minute' | 'second'> = {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    const localDate: Pick<Locale, 'day' | 'month'> = {
      day: 'numeric',
      month: 'short'
    }

    const output: (mSec: number) => string =
      this.range > 4e5 ? dateToLocal(localDate) : dateToLocal(localTime)

    function dateToLocal(local: object) {
      return (mSec: number) =>
        new Date(mSec).toLocaleString('en', local).toLowerCase()
    }

    const t = this.dataStack.find(
      (el, index, arr) => el.x <= coordX && arr[index + 1].x >= coordX
    )
    if (t === undefined) throw new Error('Time not found')

    return output(t.time)
  }

  currentPrice(data: IEntryData) {
    this.createChartLine(data)
    this.gridX.forEach(
      i =>
        (i.x -=
          this.dataStack[this.dataStack.length - 1].x -
          this.dataStack[this.dataStack.length - 2].x)
    )
    if (this.gridX[0].x <= -30) {
      const i: number = -this.gridX[0].i
      const x: number = this.gridX[this.gridX.length - 1].x + this.stepX
      const t: string = this.timeSetter(x)
      this.gridX.push({ x, t, i })
      this.gridX.shift()
    }
  }

  get chartLinePath(): string {
    const d: string[] = [`M${this.dataStack[0].x}, ${this.dataStack[0].y} `]

    for (let i = 1; i < this.dataStack.length; i++) {
      d.push(`L${this.dataStack[i].x}, ${this.dataStack[i].y} `)
    }

    return d.join('').trim()
  }

  get pointY(): number {
    return this.dataStack.slice(-1)[0].y
  }
}
