<template lang="pug">
svg.chart-graph(xmlns='http://www.w3.org/2000/svg' viewBox='-30 -10 600 210' ) 
  g.chart-curve( fill='transparent' stroke="var(--color-green)" stroke-width='2')
    path( :d='d' ref='path') 
</template>

<script>
export default {
  name: "charCurve",
  props: { coin: String },
  data() {
    return {
      d: "",
      x1: 0
    };
  },
  computed: {
    limits() {
      return this.$store.state.history.coins[this.coin].limits;
    },
    cutPrices() {
      return this.$store.state.history.coins[this.coin].cutPrices;
    }
  },
  watch: {
    cutPrices() {
      this.buildCurve();
    }
  },
  methods: {
    buildCurve() {
      const limits = this.limits;
      const rates = this.cutPrices;
      this.$store.commit("clearGraph");
      const min = limits.min;
      const max = limits.max;
      const x = 542;
      const y = 153;
      const xResolution = (rates[rates.length - 1].time - rates[0].time) / x;
      const yResolution = (max - min) / y;
      const startY = costToCoords(rates[0].priceUsd);
      const paths = [`M0,${startY}`];
      this.$store.commit("pushGraphInfo", {
        x: 0,
        y: startY,
        time: rates[0].time,
        date: rates[0].date,
        price: +rates[0].priceUsd
      });

      for (let i = 1; i < rates.length; i++) {
        const pathX = (rates[i].time - rates[0].time) / xResolution;
        const pathY = costToCoords(rates[i].priceUsd);
        paths.push(`L${pathX},${pathY}`);

        this.$store.commit("pushGraphInfo", {
          x: pathX,
          y: pathY,
          time: rates[i].time,
          date: rates[i].date,
          price: +rates[i].priceUsd
        });
      }
      function costToCoords(cost) {
        return (max - min - (+cost - min)) / yResolution;
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