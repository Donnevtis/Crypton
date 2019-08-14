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
      <svg class="chart-field" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
        <text class="chart-worth" x="2" y="12" fill="var(--color-text-light)">20k</text>
        <text class="chart-worth" x="2" y="50" fill="var(--color-text-light)">15k</text>
        <text class="chart-worth" x="2" y="88" fill="var(--color-text-light)">10k</text>
        <text class="chart-worth" x="2" y="127" fill="var(--color-text-light)">5k</text>
        <text class="chart-worth" x="2" y="166" fill="var(--color-text-light)">0k</text>

        <line x1="45" y1="10" x2="600" y2="10" stroke="var(--charcoal-grey)" />
        <line x1="45" y1="48.25" x2="600" y2="48.25" stroke="var(--charcoal-grey)" />
        <line x1="45" y1="86.5" x2="600" y2="86.5" stroke="var(--charcoal-grey)" />
        <line x1="45" y1="124.75" x2="600" y2="124.75" stroke="var(--charcoal-grey)" />
        <line x1="45" y1="163" x2="600" y2="163" stroke="var(--charcoal-grey)" />

        <line x1="82" y1="163" x2="82" y2="167" stroke="var(--charcoal-grey)" />
        <line x1="182" y1="163" x2="182" y2="167" stroke="var(--charcoal-grey)" />
        <line x1="282" y1="163" x2="282" y2="167" stroke="var(--charcoal-grey)" />
        <line x1="382" y1="163" x2="382" y2="167" stroke="var(--charcoal-grey)" />
        <line x1="482" y1="163" x2="482" y2="167" stroke="var(--charcoal-grey)" />
        <line x1="582" y1="163" x2="582" y2="167" stroke="var(--charcoal-grey)" />

        <text class="chart-timeframes" x="70" y="200" fill="var(--color-text-light)">23 oct</text>
        <text class="chart-timeframes" x="170" y="200" fill="var(--color-text-light)">23 oct</text>
        <text class="chart-timeframes" x="270" y="200" fill="var(--color-text-light)">23 oct</text>
        <text class="chart-timeframes" x="370" y="200" fill="var(--color-text-light)">23 oct</text>
        <text class="chart-timeframes" x="470" y="200" fill="var(--color-text-light)">23 oct</text>
        <text class="chart-timeframes" x="570" y="200" fill="var(--color-text-light)">23 oct</text>
      </svg>
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

.chart-field {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  width: 100%;
}
</style>