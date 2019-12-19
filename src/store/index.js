import Vue from 'vue';
import Vuex from 'vuex';
import wallets from './modules/wallets'
import timestamps from './modules/timestamps'
import history from './modules/coins.history'
import chartState from './modules/chart'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        timestamps, //don't change order
        wallets,
        history,
        chartState
    }
})
export default store;