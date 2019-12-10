import Vue from 'vue';
const
    state = {
        coins: { instaRates: { isUpdate: null, prices: [] } },
        graph: [],
        currentPrice: 0
    },
    getters = {
        rates: (state, getters) => getters.getActiveStamp.mnth ? getters.activeCoin : state.coins.instaRates,
        priceLines: (state, getters) => getters.getActiveStamp.mnth ? getters.activeCoin.priceItems : state.coins.instaRates.priceItems,
        onlineRates: state => state.coins.instaRates.prices,
        activeCoin: (state, getters) => state.coins[getters.getActiveWallet.name.toLowerCase()] || { isUpdate: null, prices: [] },


    },
    actions = {
        fetchRates({ commit, getters, dispatch }) {
            dispatch('onlineRates', false)
            return new Promise(async(resolve, reject) => {
                const coin = getters.rates
                let name = getters.getActiveWallet.name.toLowerCase()
                if (coin.isUpdate === new Date().setUTCHours(0, 0, 0, 0)) {
                    resolve()
                    dispatch("cumputeProps", name)
                    return
                }
                const online = !getters.getActiveStamp.mnth
                const [interval, mutation] = online ? [`m1&start=${new Date() - 9e5}&end=${Date.now()}`, 'setInstaRates'] : ['d1', 'setLongRates']
                const link = `https://api.coincap.io/v2/assets/${name}/history?interval=${interval}`
                let res = await fetch(link)
                if (!(res.ok)) {
                    reject(res.status)
                    return
                }
                res = await res.json()
                const prices = res.data;
                prices.sort((a, b) => a.time - b.time)
                const isUpdate = new Date().setUTCHours(0, 0, 0, 0)
                commit(mutation, { prices, name, isUpdate })
                resolve()
                if (online) {
                    dispatch('onlineRates', name)
                    name = 'instaRates'
                }
                dispatch("cumputeProps", name)
            })
        },
        cumputeProps({ commit, getters }, name) {
            const itemsMutation = name == "instaRates" ? 'narrowPriceItems' : 'widePriceItems'
            commit('cutRates', { range: getters.getDateRange, name })
            commit('priceLimits', name)
            commit(itemsMutation, { name })

        },
        onlineRates({ commit, dispatch }, name) {
            if (!name && this.pricesWs) {
                this.pricesWs.close()
                return
            }
            if (this.pricesWs) this.pricesWs.close();
            this.pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${name}`)

            const startTime = Date.now();
            this.pricesWs.onmessage = msg => {
                const priceUsd = JSON.parse(msg.data)[name];
                const time = startTime + +msg.timeStamp.toFixed();
                commit('currentPrice', priceUsd)
                commit('addOnlineRates', { priceUsd, time })
                dispatch('cumputeProps', 'instaRates')
            }
        },
        buildCurve({ state, commit }, name) {
            const limits = state.coins[name].limits;
            const rates = state.coins[name].cutPrices;
            commit("clearGraph");
            const min = limits.min;
            const max = limits.max;
            const x = 542;
            const y = 153;
            const xResolution = (rates[rates.length - 1].time - rates[0].time) / x;
            const yResolution = (max - min) / y;
            const startY = costToCoords(rates[0].priceUsd);
            const paths = [`M0,${startY}`];
            commit("pushGraphInfo", {
                x: 0,
                y: startY,
                time: rates[0].time,
                date: rates[0].date,
                price: +rates[0].priceUsd
            });

            for (let i = 1; i < rates.length; i++) {
                const pathX = (rates[i].time - rates[0].time) / xResolution;
                const pathY = costToCoords(rates[i].priceUsd);
                paths.push(`L${pathX},${pathY}`);

                this.$store.commit("pushGraphInfo", {
                    x: pathX,
                    y: pathY,
                    time: rates[i].time,
                    date: rates[i].date,
                    price: +rates[i].priceUsd
                });
            }

            function costToCoords(cost) {
                return (max - min - (+cost - min)) / yResolution;
            }
            const d = paths.join("");
        }

    },
    mutations = {
        setLongRates(state, { prices, name, isUpdate }) {
            Vue.set(state.coins, name, { name, prices, isUpdate })
        },
        setInstaRates(state, { prices }) {
            state.coins.instaRates = { prices, name: 'instaRates', isUpdate: null }
        },
        addOnlineRates(state, price) {
            if (state.coins.instaRates.prices.length > 400) state.coins.instaRates.prices.shift();
            state.coins.instaRates.prices.push(price);
        },
        currentPrice(state, priceUsd) {
            state.currentPrice = priceUsd
        },
        pushGraphInfo(state, vals) {
            state.graph.push(vals)
        },
        clearGraph(state) {
            state.graph = [];
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
    }

export default { state, getters, actions, mutations }