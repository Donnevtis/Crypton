import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2aeaec0e = () => interopDefault(import('..\\pages\\App.vue' /* webpackChunkName: "pages_App" */))
const _2f852904 = () => interopDefault(import('..\\pages\\main.js' /* webpackChunkName: "pages_main" */))
const _4d1ef634 = () => interopDefault(import('..\\pages\\store\\index.js' /* webpackChunkName: "pages_store_index" */))
const _12e3f8c3 = () => interopDefault(import('..\\pages\\api\\coincap-api.js' /* webpackChunkName: "pages_api_coincap-api" */))
const _3cf7ee89 = () => interopDefault(import('..\\pages\\components\\AppCounter.vue' /* webpackChunkName: "pages_components_AppCounter" */))
const _53a51fe0 = () => interopDefault(import('..\\pages\\components\\AppHeader.vue' /* webpackChunkName: "pages_components_AppHeader" */))
const _e24ac9e2 = () => interopDefault(import('..\\pages\\components\\AppSearchForm.vue' /* webpackChunkName: "pages_components_AppSearchForm" */))
const _136ce86e = () => interopDefault(import('..\\pages\\components\\AppSideBar.vue' /* webpackChunkName: "pages_components_AppSideBar" */))
const _ba1e5fe8 = () => interopDefault(import('..\\pages\\components\\dashboard\\index.vue' /* webpackChunkName: "pages_components_dashboard_index" */))
const _5255f3ca = () => interopDefault(import('..\\pages\\components\\IconsMenu.vue' /* webpackChunkName: "pages_components_IconsMenu" */))
const _2a8baa4e = () => interopDefault(import('..\\pages\\components\\IconsMenuItem.vue' /* webpackChunkName: "pages_components_IconsMenuItem" */))
const _7651cb1b = () => interopDefault(import('..\\pages\\components\\Spinner.vue' /* webpackChunkName: "pages_components_Spinner" */))
const _2d97ece8 = () => interopDefault(import('..\\pages\\components\\TheConversationButton.vue' /* webpackChunkName: "pages_components_TheConversationButton" */))
const _3a7eb73c = () => interopDefault(import('..\\pages\\components\\TheMobileHeader.vue' /* webpackChunkName: "pages_components_TheMobileHeader" */))
const _6e5764c6 = () => interopDefault(import('..\\pages\\components\\wallets\\index.vue' /* webpackChunkName: "pages_components_wallets_index" */))
const _1ace3646 = () => interopDefault(import('..\\pages\\utils\\chart-constructor.js' /* webpackChunkName: "pages_utils_chart-constructor" */))
const _0e5f8a6f = () => interopDefault(import('..\\pages\\components\\base\\Chart.vue' /* webpackChunkName: "pages_components_base_Chart" */))
const _46685054 = () => interopDefault(import('..\\pages\\components\\base\\Transactions.vue' /* webpackChunkName: "pages_components_base_Transactions" */))
const _5fd56010 = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardInterest.vue' /* webpackChunkName: "pages_components_dashboard_DashboardInterest" */))
const _3640502b = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardInterests.vue' /* webpackChunkName: "pages_components_dashboard_DashboardInterests" */))
const _30b74221 = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardNews.vue' /* webpackChunkName: "pages_components_dashboard_DashboardNews" */))
const _29e4e87d = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardRecieve.vue' /* webpackChunkName: "pages_components_dashboard_DashboardRecieve" */))
const _97132734 = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardTotal.vue' /* webpackChunkName: "pages_components_dashboard_DashboardTotal" */))
const _cbcf5a72 = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardWallet.vue' /* webpackChunkName: "pages_components_dashboard_DashboardWallet" */))
const _a6c4b188 = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardWallets.vue' /* webpackChunkName: "pages_components_dashboard_DashboardWallets" */))
const _1978c0db = () => interopDefault(import('..\\pages\\components\\dashboard\\DashboardWalletsLabels.vue' /* webpackChunkName: "pages_components_dashboard_DashboardWalletsLabels" */))
const _34de66b5 = () => interopDefault(import('..\\pages\\store\\modules\\coins.history.js' /* webpackChunkName: "pages_store_modules_coins.history" */))
const _136f7414 = () => interopDefault(import('..\\pages\\store\\modules\\timestamps.js' /* webpackChunkName: "pages_store_modules_timestamps" */))
const _e1c30dfa = () => interopDefault(import('..\\pages\\store\\modules\\wallets.js' /* webpackChunkName: "pages_store_modules_wallets" */))
const _3bf4a0f3 = () => interopDefault(import('..\\pages\\components\\base\\chart\\ChartBlinkPoint.vue' /* webpackChunkName: "pages_components_base_chart_ChartBlinkPoint" */))
const _484e93bf = () => interopDefault(import('..\\pages\\components\\base\\chart\\ChartGraph.vue' /* webpackChunkName: "pages_components_base_chart_ChartGraph" */))
const _b900c0e6 = () => interopDefault(import('..\\pages\\components\\base\\chart\\ChartHelper.vue' /* webpackChunkName: "pages_components_base_chart_ChartHelper" */))
const _010d1293 = () => interopDefault(import('..\\pages\\components\\base\\chart\\ChartLine.vue' /* webpackChunkName: "pages_components_base_chart_ChartLine" */))
const _48f4c307 = () => interopDefault(import('..\\pages\\components\\base\\chart\\ChartTimestamp.vue' /* webpackChunkName: "pages_components_base_chart_ChartTimestamp" */))
const _9fea2f6c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/App",
    component: _2aeaec0e,
    name: "App"
  }, {
    path: "/main",
    component: _2f852904,
    name: "main"
  }, {
    path: "/store",
    component: _4d1ef634,
    name: "store"
  }, {
    path: "/api/coincap-api",
    component: _12e3f8c3,
    name: "api-coincap-api"
  }, {
    path: "/components/AppCounter",
    component: _3cf7ee89,
    name: "components-AppCounter"
  }, {
    path: "/components/AppHeader",
    component: _53a51fe0,
    name: "components-AppHeader"
  }, {
    path: "/components/AppSearchForm",
    component: _e24ac9e2,
    name: "components-AppSearchForm"
  }, {
    path: "/components/AppSideBar",
    component: _136ce86e,
    name: "components-AppSideBar"
  }, {
    path: "/components/dashboard",
    component: _ba1e5fe8,
    name: "components-dashboard"
  }, {
    path: "/components/IconsMenu",
    component: _5255f3ca,
    name: "components-IconsMenu"
  }, {
    path: "/components/IconsMenuItem",
    component: _2a8baa4e,
    name: "components-IconsMenuItem"
  }, {
    path: "/components/Spinner",
    component: _7651cb1b,
    name: "components-Spinner"
  }, {
    path: "/components/TheConversationButton",
    component: _2d97ece8,
    name: "components-TheConversationButton"
  }, {
    path: "/components/TheMobileHeader",
    component: _3a7eb73c,
    name: "components-TheMobileHeader"
  }, {
    path: "/components/wallets",
    component: _6e5764c6,
    name: "components-wallets"
  }, {
    path: "/utils/chart-constructor",
    component: _1ace3646,
    name: "utils-chart-constructor"
  }, {
    path: "/components/base/Chart",
    component: _0e5f8a6f,
    name: "components-base-Chart"
  }, {
    path: "/components/base/Transactions",
    component: _46685054,
    name: "components-base-Transactions"
  }, {
    path: "/components/dashboard/DashboardInterest",
    component: _5fd56010,
    name: "components-dashboard-DashboardInterest"
  }, {
    path: "/components/dashboard/DashboardInterests",
    component: _3640502b,
    name: "components-dashboard-DashboardInterests"
  }, {
    path: "/components/dashboard/DashboardNews",
    component: _30b74221,
    name: "components-dashboard-DashboardNews"
  }, {
    path: "/components/dashboard/DashboardRecieve",
    component: _29e4e87d,
    name: "components-dashboard-DashboardRecieve"
  }, {
    path: "/components/dashboard/DashboardTotal",
    component: _97132734,
    name: "components-dashboard-DashboardTotal"
  }, {
    path: "/components/dashboard/DashboardWallet",
    component: _cbcf5a72,
    name: "components-dashboard-DashboardWallet"
  }, {
    path: "/components/dashboard/DashboardWallets",
    component: _a6c4b188,
    name: "components-dashboard-DashboardWallets"
  }, {
    path: "/components/dashboard/DashboardWalletsLabels",
    component: _1978c0db,
    name: "components-dashboard-DashboardWalletsLabels"
  }, {
    path: "/store/modules/coins.history",
    component: _34de66b5,
    name: "store-modules-coins.history"
  }, {
    path: "/store/modules/timestamps",
    component: _136f7414,
    name: "store-modules-timestamps"
  }, {
    path: "/store/modules/wallets",
    component: _e1c30dfa,
    name: "store-modules-wallets"
  }, {
    path: "/components/base/chart/ChartBlinkPoint",
    component: _3bf4a0f3,
    name: "components-base-chart-ChartBlinkPoint"
  }, {
    path: "/components/base/chart/ChartGraph",
    component: _484e93bf,
    name: "components-base-chart-ChartGraph"
  }, {
    path: "/components/base/chart/ChartHelper",
    component: _b900c0e6,
    name: "components-base-chart-ChartHelper"
  }, {
    path: "/components/base/chart/ChartLine",
    component: _010d1293,
    name: "components-base-chart-ChartLine"
  }, {
    path: "/components/base/chart/ChartTimestamp",
    component: _48f4c307,
    name: "components-base-chart-ChartTimestamp"
  }, {
    path: "/",
    component: _9fea2f6c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
