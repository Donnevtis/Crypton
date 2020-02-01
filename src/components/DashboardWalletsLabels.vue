<template>
  <div class="wallets-labels">
    <span>My wallets</span>
    <a href="#">Add wallet</a>
  </div>
</template>

<script>
export default {
  name: "wallet-labels"
};
</script>

<style lang="scss">
@import "../scss/common";
.wallets-labels {
  @include flex();
  & > span {
    color: $color-white;
    font-size: 1rem;
  }

  & > a {
    padding-right: 0.4rem;
    cursor: pointer;
    color: $color-green;
    font-size: px-rem(12);
    letter-spacing: 0.4px;
  }
}
@media (max-width: 480px) {
  .wallets-labels {
    height: 5px;
    align-items: end;
    & > a {
      padding-right: 0;
    }
  }
}
</style>