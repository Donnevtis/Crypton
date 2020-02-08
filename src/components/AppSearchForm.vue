<template>
  <div>
    <input type="text" placeholder="Search..." />
    <button class="search-button" aria-label="search">
      <span>
        <img src="../assets/svg/magnifier.svg" alt="icon" />
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchForm"
};
</script>

<style lang="scss" scoped>
input {
  font-size: px-rem(13);
  margin-left: px-rem(13);
  width: px-rem(200);
  outline: none;
}
button {
  width: px-rem(35);
  height: px-rem(35);
  right: 0;
  &:hover img {
    filter: brightness(400%);
    transition: ease 0.1s;
  }
}
svg {
  position: relative;
  display: block;
  margin: 0 auto;
}
</style>
