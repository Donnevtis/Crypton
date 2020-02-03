<template>
  <div class="dashboard">
    <dash-total class="total-module" :mainInfo="mainInfo" @update="changeColor" />
    <dash-wallets-labels class="wallets-labels-module" />
    <dash-wallets class="wallets-module" />
    <dash-interest class="interes-module" />
    <dash-recieve class="receive-module" />
    <dash-chart class="chart-module" />
    <div class="markets" />
    <dash-transactions class="transactions" />
    <dash-news class="news-module" />
  </div>
</template>

<script>
import DashTotal from "./DashboardTotal";
import DashWalletsLabels from "./DashboardWalletsLabels";
import DashWallets from "./DashboardWallets";
import DashInterest from "./DashboardInterests";
import DashRecieve from "./DashboardRecieve";
import DashNews from "./DashboardNews";
import DashChart from "./base/Chart";
import DashTransactions from "./base/Transactions";

export default {
  name: "AppDashboard",
  components: {
    DashTotal,
    DashWalletsLabels,
    DashWallets,
    DashInterest,
    DashRecieve,
    DashNews,
    DashChart,
    DashTransactions
  },
  data() {
    return {
      mainInfo: {
        transactions: 2345,
        walletsCount: 5,
        balance: 3.433,
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
.total-module {
  grid-area: a;
}
.wallets-labels-module {
  grid-area: w;
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
}
.news-module {
  grid-area: h;
}
@media (min-width: 480px) {
  .dashboard {
    @include main-grid;
    grid-template-rows: 0.1fr 0.7fr 1.2fr 1.25fr 0.85fr;
    grid-template-columns: 1.36fr 1.36fr 0.4fr 1.2fr 1.58fr;
    grid-template-areas:
      ". w w w ."
      "a b b b g"
      "a c d d g"
      "e e e f g"
      "e e e f h";
  }
}
div {
  border-radius: 2px;
}
@media (max-width: 768px) {
  .dashboard {
    grid-template-rows: 0.7fr 1.2fr 1.25fr 0.85fr;
    grid-template-columns: 1.36fr 1.36fr 0.4fr 1.2fr;
  }
}
@media (max-width: 480px) {
  .dashboard {
    position: relative;
    padding-top: 0.9rem;
    display: grid;
    grid-template-rows: 1fr 0.05fr 0.35fr 0.56fr 0.57fr 1.65fr 1.04fr 1.09fr 0.42fr;
    grid-template-columns: auto;
    gap: px-rem(20);
    grid-template-areas:
      "a"
      "w"
      "b"
      "c"
      "d"
      "g"
      "e"
      "f"
      "h";
  }

  $modules: (
    total-module wallets-labels-module wallets-module interes-module
      receive-module chart-module markets transactions news-module header
  );

  @each $module in $modules {
    .#{$module} {
      margin: 0 px-rem(32);
    }
  }
}
</style>
