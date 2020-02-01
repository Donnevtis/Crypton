<template lang="pug">
svg.blink-point(xmlns='http://www.w3.org/2000/svg' :viewBox='chart.viewBox' preserveAspectRatio="xMinYMin meet")
  rect.blink-point-diamond(stroke="white" fill="transparent" :x="chart.width" :y="y" width="5" height="5" :transform="`rotate(45,${chart.width+2.5},${y-2.5})`")  
</template>

<script>
export default {
  name: "blinkPoint",
  props: {
    chart: Object,
    y: Number
  }
};
</script>

<style>
.blink-point-diamond {
  transition-duration: 0.5s;
  z-index: 100;
  animation-duration: 2s;
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-direction: linear;
}
.blink-point {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: visible;
}
@keyframes blink {
  25% {
    fill: rgba(255, 255, 255, 0.705);
  }
  75% {
    fill: transparent;
  }
  50% {
    fill: rgba(255, 255, 255, 0.705);
  }
}
</style>