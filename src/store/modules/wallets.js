const state = {
    wallets: [{
        id: 1,
        active: true,
        acronym: 'BTC',
        name: 'bitcoin',
        amount: 0.221746,
        icon: 'static/currency/BTC.png',
        fullness: 81,
    },
    {
        id: 2,
        active: false,
        acronym: 'ETH',
        name: 'ethereum',
        amount: 0.34746,
        icon: 'static/currency/ETH.png',
        fullness: 12,
    },
    {
        id: 3,
        active: false,
        acronym: 'LTC',
        name: 'litecoin',
        amount: 0.12,
        icon: 'static/currency/LTC.png',
        fullness: 21,
    },
    {
        id: 4,
        active: false,
        acronym: 'DASH',
        name: 'dash',
        amount: 412,
        icon: 'static/currency/DASH.png',
        fullness: 85,

    },
    {
        id: 5,
        active: false,
        acronym: 'XRP',
        name: 'ripple',
        amount: 0.0003,
        icon: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@e35e7396237e8b8afee29deca14407bb5e25926d/svg/black/bch.svg',
        fullness: 3,
    }
    ],


},
    getters = {
        allWallets: state => state.wallets,
        getFewWallets: state => count => state.wallets.slice(0, count),
        activeWallet: state => state.wallets.find(item => item.active)
    },
    actions = {},
    mutations = {
        changeActive(state, id) {
            state.wallets.forEach(wallet => wallet.active = wallet.id === id ? true : false)
        }
    };

export default {
    state,
    getters,
    actions,
    mutations
}