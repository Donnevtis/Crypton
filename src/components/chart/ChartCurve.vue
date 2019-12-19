<template lang="pug">
svg.chart-line(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 148' ) 
  g( fill='transparent' stroke="var(--color-green)" stroke-width='2')
    path( :d='d') 
</template>

<script>
export default {
  name: "chartCurve",
  props: { coinName: String },
  computed: {
    d() {
      return this.$store.getters.chartLinePath(this.coinName);
    }
  }
};
</script>

<style>
.chart-line {
  position: absolute;
  height: 100%;
  width: 100%;
}
path {
  transition-duration: 0.5s;
}
</style>