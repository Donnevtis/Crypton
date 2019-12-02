<template lang="pug">
svg.chart-graph(xmlns='http://www.w3.org/2000/svg' viewBox='-30 0 600 210')
  g.chart-curve(fill='transparent' stroke="var(--color-green)" stroke-width='2')
    path( :d='d' )
</template>

<script>
export default {
  name: "charCurve",
  props: ["timeRange"],
  data() {
    return {
      d: "M30 10L100 163"
    };
  },
  computed: {
    /* eslint-disable */
    rates() {
      return this.$store.getters.getRates;
    },
    limits() {
      return this.$store.getters.getLimits;
    }
  },
  watch: {
    rates(rates) {
      if (rates.length > 1) this.buildCurve();
    }
  },
  methods: {
    buildCurve() {
      console.log(this.rates);
      const limits = this.limits;
      const rates = this.rates;
      const x = 570;
      const y = 163;
      const xResolution = this.timeRange / x;
      const yResolution = (limits.max - limits.min) / y;
      const startY = costToCoords(rates[0].priceUsd);
      const paths = [`M0 ${startY}`];

      let pathX = 0;
      for (let i = 1; i < rates.length; i++) {
        const jumpX = (rates[i].time - rates[i - 1].time) / xResolution;
        pathX += jumpX;
        const xmax = limits.max - limits.min;
        const pathY = costToCoords(rates[i].priceUsd);
        paths.push(`L${pathX} ${pathY} `);
      }

      function costToCoords(cost) {
        return (limits.max - limits.min - (+cost - limits.min)) / yResolution;
      }

      this.d = paths.join("");
    }
  }
};
</script>

<style>
.chart-curve {
  position: absolute;
}
</style>