<template>
  <div class="chart">
    <div class="chart-header">
      <div class="chart-title">{{ wallet.name }} Chart</div>
      <chart-timestamp />
    </div>

    <chart-graph />
  </div>
</template>

<script>
import ChartGraph from "./chart/ChartGraph";
import ChartTimestamp from "./chart/ChartTimestamp";

export default {
  name: "DashboardChart",
  components: {
    ChartTimestamp,
    ChartGraph
  },
  computed: {
    wallet() {
      return this.$store.getters.activeWallet;
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/common";
.chart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $color-middle;
  padding: px-rem(30) px-rem(20) px-rem(70) px-rem(40);

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &-title {
    font: {
      size: 1.4vw;
      weight: 400;
    }
    color: $color-white;
    text-transform: capitalize;
  }
}
@media (max-width: 480px) {
  .chart {
    width: initial;
    padding: px-rem(19) px-rem(20) px-rem(40) px-rem(19);

    &-title {
      font-size: px-rem(20);
    }
  }
}
</style>
