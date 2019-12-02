import Vue from 'vue';
import Vuex from 'vuex';
import wallets from './modules/wallets'
import timestamps from './modules/timestamps'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        timestamps, //don't change order
        wallets,
    }
})
export default store;