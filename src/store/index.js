import Vue from 'vue';
import Vuex from 'vuex';
import wallets from './modules/wallets'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        wallets
    }
})
export default store;