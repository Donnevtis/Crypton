const axios = require('axios').default

export default {
  fullData(coinName) {
    const link = `https://api.coincap.io/v2/assets/${coinName}/history?interval=d1`
    return this.fetch(link)
  },
  lastData(coinName) {
    const interval = `m1&start=${new Date() - 9e5}&end=${Date.now()}`
    const link = `https://api.coincap.io/v2/assets/${coinName}/history?interval=${interval}`
    return this.fetch(link)
  },
  fetch(link) {
    return axios
      .get(link)
      .then(res => {
        if (res.status !== 200) throw Error('Data is not receive') // Needs to write error handler
        return res.data
      })
      .then(res => res.data.sort((a, b) => a.time - b.time))
  },
  openWS(coinName, callback) {
    // Needs changes. It will be rather, if WebSocket won't be closes.
    this.WS = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinName}`)
    const startTime = Date.now()
    let time = 0
    let priceUsd = 0
    this.WS.onmessage = msg => {
      priceUsd = JSON.parse(msg.data)[coinName]
      time = startTime + msg.timeStamp
      callback({ priceUsd, time })
    }
  },
  closeWS() {
    if (this.WS) this.WS.close()
  }
}
