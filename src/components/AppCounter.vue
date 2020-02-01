<template>
  <div :style="{ backgroundColor: corols }">4</div>
</template>

<script>
export default {
  name: "NotificationCounter",
  data() {
    return { corols: "#7AC231" };
  }
};
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  right: -0.5rem;
  top: -0.5rem;
  z-index: 1;
  font-size: 0.7rem;
  text-align: center;
}
</style>
