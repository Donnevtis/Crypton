<template>
  <li>
    <router-link class="menu-link" :to="path">
      <img :src="src" alt="icon" />
    </router-link>
  </li>
</template>
<script>
export default {
  name: "MenuItem",
  props: {
    path: { type: String, required: true, default: "#" }
  },
  data() {
    return {
      src: require(`../assets/svg/list-menu${this.path}.svg`)
    };
  }
};
</script>
<style lang='scss'>
@import "../scss/common";
li {
  height: px-rem(60);
  position: relative;

  & > .menu-link {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    &:hover {
      background: $color-light;
    }
  }
  .router-link-active {
    background: $color-light;

    & img {
      filter: brightness(400%);
    }
  }
  img {
    margin: 0 auto;
  }
}
</style>

