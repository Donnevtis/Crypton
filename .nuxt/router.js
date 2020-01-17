import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9fea2f6c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _05c3028c = () => interopDefault(import('..\\pages\\index\\dashboard.vue' /* webpackChunkName: "pages_index_dashboard" */))
const _5e295840 = () => interopDefault(import('..\\pages\\index\\wallets.vue' /* webpackChunkName: "pages_index_wallets" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _9fea2f6c,
    name: "index",
    children: [{
      path: "dashboard",
      component: _05c3028c,
      name: "index-dashboard"
    }, {
      path: "wallets",
      component: _5e295840,
      name: "index-wallets"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
