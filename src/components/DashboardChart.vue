<template>
  <div class="chart">
    <div class="chart-header">
      <div class="chart-title">{{wallet.name}} Chart</div>
      <div class="chart-timestamps">
        <a href class="chart-timestamp chart-timestamps-1m">1m</a>
        <a href class="chart-timestamp chart-timestamps-3m">3m</a>
        <a href class="chart-timestamp chart-timestamps-6m">6m</a>
        <a href class="chart-timestamp chart-timestamps-1y">1y</a>
        <a href class="chart-timestamp chart-timestamps-now">Now</a>
      </div>
    </div>

    <div class="chart-graph">
      <div class="chart-worth">
        <span class="chart-worth-item">20k</span>
        <span class="chart-worth-item">15k</span>
        <span class="chart-worth-item">10k</span>
        <span class="chart-worth-item">5k</span>
        <span class="chart-worth-item">0k</span>
      </div>

      <div class="chart-timeframes">
        <span class="chart-timeframes-frame">23 oct</span>
        <span class="chart-timeframes-frame">23 oct</span>
        <span class="chart-timeframes-frame">23 oct</span>
        <span class="chart-timeframes-frame">23 oct</span>
        <span class="chart-timeframes-frame">23 oct</span>
        <span class="chart-timeframes-frame">23 oct</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardChart",
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
  padding: 1.57vw 2.42vw 2.57vw 2.4vw;
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
  height: 77%;
}
.chart-title {
  font-size: 1.4vw;
  font-weight: 300;
  color: var(--color-white);
}
.chart-timestamp {
  font-size: 0.85vw;
  font-weight: 500;
  color: var(--color-text-light);
}
.chart-worth,
.chart-timeframes {
  font-size: 0.7vw;
  font-weight: 500;
  color: var(--color-text-light);
}
.chart-timestamps {
  right: 0;
  width: 11.14vw;
  display: flex;
  justify-content: space-between;
}
.chart-worth {
  height: 20.24vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 2.42vw 0.2vw;
}
.chart-timeframes {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 37.5vw;
  display: flex;
  justify-content: space-between;
}
</style>