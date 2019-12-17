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
        return new Promise(async(resolve, reject) => {
            let res = await fetch(link)
            if (!(res.ok)) {
                reject(res.status)
                return
            }
            res = await res.json()
            res.data.sort((a, b) => a.time - b.time)
            resolve(res.data)
        })
    },
    openWS(coinName, callback) {
        //Need changes. It will be rather, if WebSocket won't be closes.       
        this.WS = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinName}`)
        const startTime = Date.now();
        let time = 0;
        let priceUsd = 0;
        this.WS.onmessage = msg => {
            priceUsd = JSON.parse(msg.data)[coinName];
            time = startTime + ~~msg.timeStamp;
            // callback({ priceUsd, time })
        }
    },
    closeWS() {
        if (this.WS) this.WS.close();
    }
}