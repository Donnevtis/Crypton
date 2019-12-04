const state = {
        coins: [],
        instaRates: {}
    },
    getters = {
        rates: (state, getters) => getters.getActiveStamp ? state.coins.find(coin => coin.name == getters.getActiveWallet.name) : state.instaRates,
    },
    actions = {
        fetchRates({ state, commit, getters }) {
            const name = getters.getActiveWallet.name.toLowerCase();
            const isMinutes = getters.getActiveStamp.mnth === 0;
            if (wallet.rates > 28 && !isMinutes) return;

            const [interval, mutation] = isMinutes ? [`m1&start=${new Date() - 9e5}&end=${Date.now()}`, 'setInstaRates'] : ['d1', 'setLongRates'];
            const link = `https://api.coincap.io/v2/assets/${name}/history?interval=${interval}`
            fetch(link)
                .then(res => res.json())
                .then(res => {
                    const rates = res.data;
                    rates.sort((a, b) => a.time - b.time)
                    const isUpdate = new Date().setUTCHours(0, 0, 0, 0)
                    commit(mutation, { rates, name, isUpdate });
                })
                .catch(err => {
                    if (err) {
                        // eslint-disable-next-line
                        console.error(err)
                    }
                })
        }
    },
    mutations = {
        setLongRates(state, { rates, name, isUpdate }) {
            state.coins.push({ name, rates, isUpdate })
        },
        setInstaRates(state, { rates, name, isUpdate }) {
            state.instaRates = { rates, name, isUpdate }
        }

    }

export default { state, getters, actions, mutations }