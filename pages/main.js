import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import store from './store'

Vue.config.productionTip = false

const DashBoard = () => import('./components/AppDashboard')
const Wallets = () => import('./components/AppWallets')
Vue.use(Router)


const router = new Router({
    mode: 'history',
    fallback: false,
    routes: [

        { path: '/dashboard', component: DashBoard, },
        { path: '/wallets', component: Wallets },
        { path: '/', redirect: '/dashboard' },
    ],

})

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')