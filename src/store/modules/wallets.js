const state = {
        wallets: [{
                id: 1,
                active: true,
                acronym: 'BTC',
                name: 'Bitcoin',
                amount: 0.221746,
                icon: 'static/currency/BTC.png',
                fullness: 81,
                rates: [],
                limits: {}
            },
            {
                id: 2,
                active: false,
                acronym: 'ETH',
                name: 'Ethereum',
                amount: 0.34746,
                icon: 'static/currency/ETH.png',
                fullness: 12,
                rates: [],
                limits: {}
            },
            {
                id: 3,
                active: false,
                acronym: 'LTC',
                name: 'Litecoin',
                amount: 0.12,
                icon: 'static/currency/LTC.png',
                fullness: 21,
                rates: [],
                limits: {}
            },
            {
                id: 4,
                active: false,
                acronym: 'DASH',
                name: 'Dash',
                amount: 412,
                icon: 'static/currency/DASH.png',
                fullness: 85,
                rates: [],
                limits: {}
            },
            {
                id: 5,
                active: false,
                acronym: 'XRP',
                name: 'Ripple',
                amount: 0.0003,
                icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@e35e7396237e8b8afee29deca14407bb5e25926d/svg/black/bch.svg",
                fullness: 3,
                rates: [],
                limits: {}
            }
        ],
        rates: []
    },
    getters = {
        allWallets: state => state.wallets,
        getFewWallets: state => count => state.wallets.slice(0, count),
        getActiveWallet: state => state.wallets.find(item => item.active),
        getRates: (state, getters) => getters.getActiveWallet.rates,
        getLimits: (state, getters) => getters.getActiveWallet.limits

    },
    actions = {
        /* eslint-disable */
        fetchRates({ state, commit, getters }) {
            console.log('store')
            const wallet = state.wallets.find(wallet => wallet.active)
            const link = `https://api.coincap.io/v2/assets/${wallet.name.toLowerCase()}/history?interval=d1`
            fetch(link)
                .then(res => res.json())
                .then(res => {
                    commit('setRates', res.data);
                    commit('computedRates', getters);

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
        changeActive(state, id) {
            state.wallets.map(wallet => wallet.active = wallet.id == id ? true : false)
        },
        setRates(state, rates) {
            state.rates = rates
        },
        computedRates(state, getters) {
            //cut rates
            const startTime = getters.getActiveTimeStamp.startTime;
            let i = state.rates.length - 1
            while (state.rates[i].time > startTime) {--i }
            getters.getActiveWallet.rates = state.rates.slice(i, state.rates.length)
                //count limits
            const min = getters.getActiveWallet.rates.reduce((prev, item) => Math.min(prev, item.priceUsd), 9e12)
            const max = getters.getActiveWallet.rates.reduce((prev, item) => Math.max(prev, item.priceUsd), 0)
            getters.getActiveWallet.limits = { min, max }
        }



    };


export default {
    state,
    getters,
    actions,
    mutations
}