<template>
  <div class="wallets">
    <div class="wallets-wrap">
      <dash-wallet
        v-for="wallet in wallets"
        :key="wallet.id"
        :currency="wallet"
        :class="{active: wallet.active}"
      />
    </div>
  </div>
</template>

<script>
import DashWallet from "./DashboardWallet";

export default {
  name: "DashboardWallets",
  components: {
    DashWallet
  },
  computed: {
    wallets() {
      return this.$store.getters.getFewWallets(4);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/common";
.wallets {
  position: relative;

  &-wrap {
    height: 100%;
    width: 100%;
    @include flex();
  }
}

@media (max-width: 480px) {
  .wallets {
    margin: 0;
    overflow: scroll;
    &-wrap {
      position: absolute;
      width: 175%;

      &:first-child {
        padding-left: 2rem;
      }
    }
  }
}
</style>
