<template lang="pug">
svg.chart-line(xmlns='http://www.w3.org/2000/svg' :viewBox='viewBox' vector-effect="non-scaling-stroke" ) 
  g( fill='transparent' stroke="var(--color-green)" stroke-width='2')
    path( :d='d') 
  slot
</template>

<script>
export default {
  name: 'chartLine',
  props: { d: String, viewBox: String }
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
