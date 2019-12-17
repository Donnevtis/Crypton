<template lang="pug">
svg.blink-point(xmlns='http://www.w3.org/2000/svg' viewBox='-30 -10 600 210')
  //- rect.blink-point-diamond(stroke="white" fill="transparent" x="542" :y="pointCoordY-2.5" width="5" height="5" :transform="`rotate(45,542,${pointCoordY-2.5})`")  
</template>

<script>
export default {
  name: "blinkPoint",
  computed: {
    // pointCoordY() {
    //   // return this.$store.getters.blinkPointY;
    // }
  }
};
</script>

<style>
.blink-point-diamond {
  transition-duration: 0.5s;
  z-index: 100;
}
.blink-point {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>