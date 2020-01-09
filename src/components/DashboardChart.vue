<template>
  <div class="chart">
    <div class="chart-header">
      <div class="chart-title">{{ wallet.name.replace(/\w/i, l => l.toUpperCase()) }} Chart</div>
      <chart-timestamp />
    </div>
    <div class="chart-graph">
      <chart-graph />
    </div>
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

<style>
.chart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: var(--color-middle);
  padding: 30px 20px 40px 40px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.chart-graph {
  position: relative;
  width: 100%;
  height: 25vh;
}
.chart-title {
  font-size: 1.4vw;
  font-weight: 300;
  color: var(--color-white);
}
</style>
