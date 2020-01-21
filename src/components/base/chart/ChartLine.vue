<template lang="pug">
svg.chart-line(xmlns='http://www.w3.org/2000/svg' :viewBox='viewBox'  vector-effect="non-scaling-stroke"  preserveAspectRatio="xMinYMin meet") 
  g( fill='transparent' stroke="var(--color-green)" stroke-width='2')
    path(:class="{'chart-line__animate':!isCurrent}" :d='d') 
  slot
</template>

<script>
export default {
  name: "chartLine",
  props: {
    d: { type: String, default: "", required: true },
    viewBox: String,
    isCurrent: { type: Boolean }
  }
};
</script>

<style lang="scss">
.chart-line {
  position: absolute;
  height: 100%;
  width: 100%;
  .chart-line__animate {
    transition-duration: 0.5s;
  }
}
</style>
