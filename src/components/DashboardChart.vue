<template>
  <div class="chart">
    <div class="chart-header">
      <div class="chart-title">{{wallet.name}} Chart</div>
      <timestamp />
    </div>
    <div class="chart-graph">
      <graph />
    </div>
  </div>
</template>

<script>
import Graph from "./ChartGraph";
import Timestamp from "./ChartTimestamp";

export default {
  name: "DashboardChart",
  components: {
    Timestamp,
    Graph
  },
  computed: {
    wallet() {
      return this.$store.getters.allWallets.find(item => item.active === true);
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
  padding: 1.57vw 2.42vw 2.5vw 2.4vw;
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