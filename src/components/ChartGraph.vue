<template>
  <svg class="chart-field" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
    <g class="chart-worth" fill="var(--color-text-light)">
      <text x="2" y="12">20k</text>
      <text x="2" y="50">15k</text>
      <text x="2" y="88">10k</text>
      <text x="2" y="127">5k</text>
      <text x="2" y="166">0k</text>
    </g>
    <g stroke="var(--charcoal-grey)" stroke-width=".5" style="shape-rendering: crispEdges">
      <line x1="45" y1="10" x2="600" y2="10" />
      <line x1="45" y1="48.25" x2="600" y2="48.25" />
      <line x1="45" y1="86.5" x2="600" y2="86.5" />
      <line x1="45" y1="124.75" x2="600" y2="124.75" />
      <line x1="45" y1="163" x2="600" y2="163" />
    </g>
    <g stroke="var(--charcoal-grey)">
      <line x1="82" y1="163" x2="82" y2="167" />
      <line x1="182" y1="163" x2="182" y2="167" />
      <line x1="282" y1="163" x2="282" y2="167" />
      <line x1="382" y1="163" x2="382" y2="167" />
      <line x1="482" y1="163" x2="482" y2="167" />
      <line x1="582" y1="163" x2="582" y2="167" />
    </g>
    <g class="chart-timeframes" fill="var(--color-text-light)">
      <text class="chart-timeframes" x="70" y="200">23 oct</text>
      <text x="170" y="200">23 oct</text>
      <text x="270" y="200">23 oct</text>
      <text x="370" y="200">23 oct</text>
      <text x="470" y="200">23 oct</text>
      <text x="570" y="200">23 oct</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ChartGraph"
};
</script>

<style scoped>
.chart-field {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  width: 100%;
}
.chart-worth,
.chart-timeframes {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-light);
}
</style>