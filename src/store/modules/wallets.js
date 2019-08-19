const state = {
        wallets: [{
                id: 1,
                acronym: 'BTC',
                name: 'Bitcoin',
                amount: 0.221746,
                icon: 'static/currency/BTC.png',
                fullness: 81,
            },
            {
                id: 2,
                acronym: 'ETH',
                name: 'Ethereum',
                amount: 0.34746,
                icon: 'static/currency/ETH.png',
                fullness: 12,

            },
            {
                id: 3,
                acronym: 'LTC',
                name: 'Litecoin',
                amount: 0.12,
                icon: 'static/currency/LTC.png',
                fullness: 21,

            },
            {
                id: 4,
                acronym: 'DASH',
                name: 'Dash',
                amount: 412,
                icon: 'static/currency/DASH.png',
                fullness: 85,

            },
            {
                id: 5,
                acronym: 'XRP',
                name: 'Ripple',
                amount: 0.0003,
                icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@e35e7396237e8b8afee29deca14407bb5e25926d/svg/black/bch.svg",
                fullness: 3,
            }
        ],
        active: 1
    },
    getters = {
        allWallets: state => state.wallets,
        getFewWallets: state => count => state.wallets.slice(0, count),
        getActiveWallet: state => state.active,


    },
    actions = {},
    mutations = {
        changeActive(state, id) {
            state.active = id;
        }
    };


export default {
    state,
    getters,
    actions,
    mutations
}