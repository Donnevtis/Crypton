const state = {
        wallets: [{
                id: 1,
                active: true,
                acronym: 'BTC',
                name: 'Bitcoin',
                amount: 0.221746,
                icon: 'static/currency/BTC.png',
                fullness: 81,
                rates: []
            },
            {
                id: 2,
                active: false,
                acronym: 'ETH',
                name: 'Ethereum',
                amount: 0.34746,
                icon: 'static/currency/ETH.png',
                fullness: 12,
                rates: []
            },
            {
                id: 3,
                active: false,
                acronym: 'LTC',
                name: 'Litecoin',
                amount: 0.12,
                icon: 'static/currency/LTC.png',
                fullness: 21,
                rates: []
            },
            {
                id: 4,
                active: false,
                acronym: 'DASH',
                name: 'Dash',
                amount: 412,
                icon: 'static/currency/DASH.png',
                fullness: 85,
                rates: []

            },
            {
                id: 5,
                active: false,
                acronym: 'XRP',
                name: 'Ripple',
                amount: 0.0003,
                icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@e35e7396237e8b8afee29deca14407bb5e25926d/svg/black/bch.svg",
                fullness: 3,
                rates: []
            }
        ]

    },
    getters = {
        allWallets: state => state.wallets,
        getFewWallets: state => count => state.wallets.slice(0, count),
        getActiveWallet: state => state.wallets.find(item => item.active),
        getRates: (state, getters) => getters.getActiveWallet.rates,
    },
    actions = {
        fetchRates({ commit, getters }) {
            const wallet = getters.getActiveWallet;
            if (wallet.rates.length > 0) return


            const link = `https://api.coincap.io/v2/assets/${wallet.name.toLowerCase()}/history?interval=d1`
            fetch(link)
                .then(res => res.json())
                .then(res => {
                    const rates = res.data;
                    commit('setRates', { rates, wallet });

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
            state.wallets.forEach(wallet => wallet.active = wallet.id == id ? true : false)
        },
        setRates(state, { rates, wallet }) {
            rates.sort((a, b) => a.time - b.time)
            wallet.rates = rates
        }
    };


export default {
    state,
    getters,
    actions,
    mutations
}