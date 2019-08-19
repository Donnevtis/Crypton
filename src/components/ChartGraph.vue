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
      <line x1="72" y1="163" x2="72" y2="167" />
      <line x1="172" y1="163" x2="172" y2="167" />
      <line x1="272" y1="163" x2="272" y2="167" />
      <line x1="372" y1="163" x2="372" y2="167" />
      <line x1="472" y1="163" x2="472" y2="167" />
      <line x1="572" y1="163" x2="572" y2="167" />
    </g>
    <g class="chart-timeframes" fill="var(--color-text-light)">
      <text x="60" y="200">{{ date[0] }}</text>
      <text x="160" y="200">{{ date[1] }}</text>
      <text x="260" y="200">{{ date[2] }}</text>
      <text x="360" y="200">{{ date[3] }}</text>
      <text x="460" y="200">{{ date[4] }}</text>
      <text x="560" y="200">{{ date[5] }}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ChartGraph",
  computed: {
    date() {
      const range = this.$store.getters.getActiveStamp;
      const now = new Date();
      let date = new Date();
      let dates = [];

      if (range) {
        date.setMonth(now.getMonth() - range);
        const point = (now - date) / 5;

        for (let i = 0; i < 6; i++) {
          dates.push(
            new Date(date).toLocaleString("en", {
              hour12: false,
              day: "numeric",
              month: "short"
            })
          );
          date = +date + point;
        }
      } else {
        date.setMinutes(now.getMinutes() - 10);
        const point = (now - date) / 5;

        for (let i = 0; i < 6; i++) {
          dates.push(
            new Date(date).toLocaleString("en", {
              hour12: false,
              hour: "numeric",
              minute: "numeric"
            })
          );
          date = +date + point;
        }
      }

      return dates;
    }
  }
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