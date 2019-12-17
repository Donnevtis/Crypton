<template lang="pug">
svg.chart-graph(xmlns='http://www.w3.org/2000/svg' viewBox='-30 -10 600 210' ) 
  g.chart-curve( fill='transparent' stroke="var(--color-green)" stroke-width='2')
    path( :d='d' ref='path') 
</template>

<script>
export default {
  name: "chartCurve",
  props: { coin: String },
  computed: {
    d() {
      // return this.$store.state.history.coins[this.coin].d;
      return this.$store.getters.svgPath(this.coin);
    }
  }
};
</script>

<style>
.chart-curve {
  position: absolute;
}
path {
  transition-duration: 0.5s;
}
</style>