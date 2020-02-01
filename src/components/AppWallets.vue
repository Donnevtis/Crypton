<template>
  <div class="app-wallets">
    <div class="app-wallets-balance"></div>
    <wallets-transactions class="transaction-module" />
    <wallets-chart class="chart-module">
      <chart-date-picker />
    </wallets-chart>
  </div>
</template>

<script>
import walletsTransactions from "./base/Transactions";
import walletsChart from "./base/Chart";
import ChartDatePicker from "./base/chart/DatePicker";

export default {
  name: "app-wallets",
  components: {
    walletsTransactions,
    walletsChart,
    ChartDatePicker
  }
};
</script>

<style lang='scss'>

.app-wallets {
  @include main-grid;
  grid-template-rows: 0.5fr 3fr 5fr;
  grid-template-columns: 1fr 3fr;

  .chart-module {
    grid-area: 2 / 2 / 4 / 2;
  }
  .app-wallets-balance {
    grid-area: 2 / 1 / 3 / 1;
    background-color: $color-middle;
  }
  .transaction-module {
    grid-area: 3/1/4/1;
  }
}
</style>