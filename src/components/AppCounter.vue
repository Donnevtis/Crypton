<template>
  <div :style="{ backgroundColor: corols }">4</div>
</template>

<script>
export default {
  name: 'NotificationCounter',
  data() {
    return { corols: '#7AC231' };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/variables';

div {
  position: absolute;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  right: -7px;
  top: -7px;
  z-index: 20;
  color: $color-white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 11px;
  text-align: center;
}
</style>
