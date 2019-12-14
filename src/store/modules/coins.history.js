import Vue from 'vue';
const
    state = {
        coins: { instaRates: { isUpdate: null, prices: [] } },
        graph: [],
        currentPrice: 0,
        currentTime: 0,
        curve: {},
        renderInterval: void ''
    },
    getters = {
        rates: (state, getters) => getters.getActiveStamp.mnth ? getters.activeCoin : state.coins.instaRates,
        priceLines: (state, getters) => getters.getActiveStamp.mnth ? getters.activeCoin.priceItems : state.coins.instaRates.priceItems,
        onlineRates: state => state.coins.instaRates.prices,
        activeCoin: (state, getters) => state.coins[getters.getActiveWallet.name.toLowerCase()] || { isUpdate: null, prices: [] },
        thicPointY: (state) => state.curve.costToCoordsY(state.currentPrice) || 10

    },
    actions = {
        fetchRates({ commit, getters, dispatch, state }) {
            clearInterval(state.renderInterval)
            dispatch('onlineRates', false)
            return new Promise(async(resolve, reject) => {

                //check last update
                const coin = getters.rates
                let name = getters.getActiveWallet.name.toLowerCase()
                if (coin.isUpdate === new Date().setUTCHours(0, 0, 0, 0)) {
                    resolve()
                    dispatch("cumputeProps", name)
                    return
                }
                const online = !getters.getActiveStamp.mnth

                //link constructor
                const [interval, mutation] = online ? [`m1&start=${new Date() - 9e5}&end=${Date.now()}`, 'setInstaRates'] : ['d1', 'setLongRates']
                const link = `https://api.coincap.io/v2/assets/${name}/history?interval=${interval}`

                //get coins history from coincap.io API             
                let res = await fetch(link)
                if (!(res.ok)) {
                    reject(res.status)
                    return
                }
                res = await res.json()
                const prices = res.data;
                prices.sort((a, b) => a.time - b.time)

                //set update timestamp
                const isUpdate = new Date().setUTCHours(0, 0, 0, 0)

                //save result
                commit(mutation, { prices, name, isUpdate })
                resolve()

                //create WebSocket connection if current changes is need to see
                if (online) {
                    dispatch('onlineRates', name).then(res => dispatch('startRenderChanges', res))
                    name = 'instaRates'
                }
                dispatch("cumputeProps", name)
            })
        },
        //mutations-chain for set values
        cumputeProps({ commit, getters }, name) {
            const itemsMutation = name == "instaRates" ? 'narrowPriceItems' : 'widePriceItems'
            commit('cutRates', { range: getters.getDateRange, name })
            commit('priceLimits', name)
            commit(itemsMutation, { name })
            commit('curve', name)

        },
        //WebSocket action
        onlineRates({ commit }, name) {
            return new Promise(res => {
                if (!name && this.pricesWs) {
                    this.pricesWs.close()
                    res(true)
                    return
                }
                if (this.pricesWs) this.pricesWs.close();
                this.pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${name}`)
                const startTime = Date.now();
                let time = 0;
                let priceUsd = 0;
                this.pricesWs.onmessage = msg => {
                    //result handler
                    priceUsd = JSON.parse(msg.data)[name];
                    time = startTime + +msg.timeStamp.toFixed();
                    commit('currentPrice', { priceUsd, time })
                    res(false)
                }
            })
        },
        startRenderChanges({ commit, dispatch, state }, close) {
            state.renderInterval = setInterval(() => {
                requestAnimationFrame(() => {
                    commit('addOnlineRates');
                    dispatch('cumputeProps', 'instaRates')
                })
            }, 1000)
        }


    },
    mutations = {
        //create curve
        curve(state, name) {
            const prices = state.coins[name].cutPrices
            const limits = state.coins[name].limits
            state.curve = new Curve({ prices, limits })
            state.graph = state.curve.coinStack
            Vue.set(state.coins[name], 'd', state.curve.d)
        },
        setLongRates(state, { prices, name, isUpdate }) {
            Vue.set(state.coins, name, { name, prices, isUpdate })
        },
        setInstaRates(state, { prices }) {
            state.coins.instaRates = { prices, name: 'instaRates', isUpdate: null }
        },
        addOnlineRates(state) {
            if (state.coins.instaRates.prices.length > 4000) state.coins.instaRates.prices.shift();
            state.coins.instaRates.prices.push({ priceUsd: state.currentPrice, time: state.currentTime });
        },
        currentPrice(state, { priceUsd, time }) {
            state.currentPrice = priceUsd
            state.currentTime = time
        },
        pushGraphInfo(state, coinStack) {
            state.graph = coinStack
        },

        cutRates(state, { range, name }) {
            const prices = state.coins[name].prices
            let i = prices.length - 1;
            while (prices[i].time >= Date.now() - range) {
                --i;
            }
            Vue.set(state.coins[name], 'cutPrices', prices.slice(i))
        },
        priceLimits: (state, name) => {
            const min = state.coins[name].cutPrices.reduce(
                (prev, item) => Math.min(prev, item.priceUsd),
                9e12
            );
            const max = state.coins[name].cutPrices.reduce(
                (prev, item) => Math.max(prev, item.priceUsd),
                0
            );
            Vue.set(state.coins[name], 'limits', { min, max })

        },
        widePriceItems(state, { name, count }) {
            count = count || 4
            let max = state.coins[name].limits.max;
            const step = (max - state.coins[name].limits.min) / count;
            const prices = [];
            let y = 12;
            for (let i = 0; i < count + 1; i++) {
                let price =
                    max >= 1000 ? (max / 1000).toFixed(1) + "k" : "$" + max.toFixed();
                prices.push({ price, y });
                y += 38.5;
                max -= step;
            }
            Vue.set(state.coins[name], 'priceItems', prices)
        },
        narrowPriceItems(state, { name, count }) {
            count = count || 4
            let max = state.coins[name].limits.max;
            const step = (max - state.coins[name].limits.min) / count;
            const prices = [];
            let y = 12;
            for (let i = 0; i < count + 1; i++) {
                let price = "$" + max.toFixed(2);
                prices.push({ price, y });
                y += 38.5;
                max -= step;
            }
            Vue.set(state.coins[name], 'priceItems', prices)
        },
        d(state, { d, name }) {
            Vue.set(state.coins[name], 'd', d)
        }

    }

//the curve constructor
class Curve {
    constructor({ limits, prices }) {
        this.limits = limits;
        this.prices = prices;
        this.min = limits.min;
        this.max = limits.max;
        this.x = 542;
        this.y = 153;
        this.xResolution = (this.prices[this.prices.length - 1].time - this.prices[0].time) / this.x;
        this.yResolution = (this.max - this.min) / this.y;
        this.startY = this.costToCoordsY(this.prices[0].priceUsd);
        this.paths = [`M0,${this.startY}`];
        //init stack props for prices data
        this.coinStack = [{
            x: 0,
            y: this.startY,
            time: this.prices[0].time,
            price: +this.prices[0].priceUsd
        }]
        this.buildCoords()
    }
    buildCoords() {
        for (let i = 1; i < this.prices.length; i++) {
            const pathX = (this.prices[i].time - this.prices[0].time) / this.xResolution
            const pathY = this.costToCoordsY(this.prices[i].priceUsd)
            this.paths.push(`L${pathX},${pathY}`);
            this.coinStack.push({
                x: pathX,
                y: pathY,
                time: this.prices[i].time,
                price: +this.prices[i].priceUsd
            })
        }
    }

    costToCoordsY(cost) {
            return (this.max - this.min - (+cost - this.min)) / this.yResolution
        }
        //return svg PATH string
    get d() {
        return this.paths.join("");
    }

}

export default { state, getters, actions, mutations }