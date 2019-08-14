const state = {
        wallets: [{
                id: 1,
                acronym: 'BTC',
                name: 'Bitcoin',
                amount: 0.221746,
                icon: 'static/currency/BTC.png',
                fullness: 81,
                active: true,
            },
            {
                id: 2,
                acronym: 'ETH',
                name: 'Ethereum',
                amount: 0.34746,
                icon: 'static/currency/ETH.png',
                fullness: 12,
                active: false,

            },
            {
                id: 3,
                acronym: 'LTC',
                name: 'Litecoin',
                amount: 0.12,
                icon: 'static/currency/LTC.png',
                fullness: 21,
                active: false,

            },
            {
                id: 4,
                acronym: 'DASH',
                name: 'Dash',
                amount: 412,
                icon: 'static/currency/DASH.png',
                fullness: 85,
                active: false,

            },
            {
                id: 5,
                acronym: 'XRP',
                name: 'Ripple',
                amount: 0.0003,
                icon: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@e35e7396237e8b8afee29deca14407bb5e25926d/svg/black/bch.svg",
                fullness: 3,
                active: false,

            }
        ]
    },
    getters = {
        allWallets: state => state.wallets,
        getFewWallets: state => count => state.wallets.slice(0, count)

    },
    actions = {},
    mutations = {
        changeActive(state, id) {
            state.wallets.find(item => item.active == true).active = false;
            state.wallets.find(item => item.id == id).active = true;

        }
    };


export default {
    state,
    getters,
    actions,
    mutations
}