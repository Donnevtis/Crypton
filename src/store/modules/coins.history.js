const state = {
        coins: [],
        instaRates: { isUpdate: null }
    },
    getters = {
        rates: (state, getters) => getters.getActiveStamp.mnth ? getters.activeCoin : state.instaRates,
        activeCoin: (state, getters) => state.coins.find(coin => coin.name == getters.getActiveWallet.name.toLowerCase()) || { isUpdate: null, rates: [] }
    },
    actions = {
        fetchRates({ commit, getters }) {
            return new Promise((resolve, reject) => {
                const coin = getters.rates;
                if (coin.isUpdate === new Date().setUTCHours(0, 0, 0, 0)) {
                    resolve()
                    return
                }
                const name = getters.getActiveWallet.name.toLowerCase();
                const online = !getters.getActiveStamp.mnth;
                const [interval, mutation] = online ? [`m1&start=${new Date() - 9e5}&end=${Date.now()}`, 'setInstaRates'] : ['d1', 'setLongRates'];
                const link = `https://api.coincap.io/v2/assets/${name}/history?interval=${interval}`
                fetch(link)
                    .then(res => res.json())
                    .then(res => {
                        const rates = res.data;
                        rates.sort((a, b) => a.time - b.time)
                        const isUpdate = new Date().setUTCHours(0, 0, 0, 0)
                        commit(mutation, { rates, name, isUpdate })
                        resolve()
                    })
                    .catch(err => {
                        reject(err)
                    })
            })

        }
    },
    mutations = {
        setLongRates(state, { rates, name, isUpdate }) {
            state.coins.push({ name, rates, isUpdate })
        },
        setInstaRates(state, { rates, name }) {
            state.instaRates = { rates, name, isUpdate: null }
        }

    }

export default { state, getters, actions, mutations }