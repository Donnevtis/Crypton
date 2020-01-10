<template>
  <div class="dashboard">
    <dash-balance class="balance-module" :mainInfo="mainInfo" @update="changeColor" />
    <dash-wallets class="wallets-module" />
    <dash-interest class="interes-module" />
    <dash-recieve class="receive-module" />
    <dash-chart class="chart-module" />
    <div class="markets" />
    <div class="transactions" />
    <dash-news class="news-module" />
  </div>
</template>

<script>
import DashBalance from "./DashboardBalance";
import DashWallets from "./DashboardWallets";
import DashInterest from "./DashboardInterests";
import DashRecieve from "./DashboardRecieve";
import DashNews from "./DashboardNews";
import DashChart from "./DashboardChart";

export default {
  name: "AppDashboard",
  components: {
    DashBalance,
    DashWallets,
    DashInterest,
    DashRecieve,
    DashNews,
    DashChart
  },
  data() {
    return {
      mainInfo: {
        transactions: 1456,
        walletsCount: 5,
        balance: 1424,
        currencyEUR: 2.7795,
        currency: "EUR",
        currencyProfit: 15
      }
    };
  },
  methods: {
    changeColor() {
      document.documentElement.style.setProperty("--color-dark-gray", "#fff");
    }
  }
};
</script>

<style lang="scss">
@import "../scss/variables";
@media (min-width: 480px) {
  .dashboard {
    position: fixed;
    height: calc(100vh - 108px);
    width: calc(100vw - 90px);
    padding: 2.5rem 2.5rem 2.4rem 1.9rem;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template-rows: 0.7fr 1.2fr 1.25fr 0.85fr;
    grid-template-columns: 1.36fr 1.36fr 0.4fr 1.2fr 1.58fr;
    grid-template-areas:
      "a b b b g"
      "a c d d g"
      "e e e f g"
      "e e e f h";
    gap: 1.3vw;
  }
  .balance-module {
    grid-area: a;
  }
  .wallets-module {
    grid-area: b;
  }
  .interes-module {
    grid-area: c;
  }
  .receive-module {
    grid-area: d;
  }
  .chart-module {
    grid-area: e;
  }
  .markets {
    grid-area: f;
    background-color: $color-middle;
  }
  .transactions {
    grid-area: g;
    background-color: $color-middle;
  }
  .news-module {
    grid-area: h;
  }
  div {
    border-radius: 2px;
  }
}
@media (max-width: 480px) {
  .dashboard {
    position: absolute;
    height: auto;
    width: 100%;
    padding: .7rem;
    bottom: auto;
    right: 0;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;
    gap: 5vh;
  }
}
</style>
