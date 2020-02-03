<template>
  <div class="interest-wrapper">
    <dash-interest v-for="wallet in wallets" :key="wallet.id" :wallet="wallet" />
  </div>
</template>

<script>
import DashInterest from "./DashboardInterest";

export default {
  name: "DashboardInterest",
  components: {
    DashInterest
  },
  computed: {
    wallets() {
      return this.$store.getters.getFewWallets(3);
    }
  }
};
</script>

<style lang="scss">

.interest-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: px-rem(17) px-rem(19) px-rem(15) px-rem(24);
  position: relative;
  background-color: $color-slate;
  height: 100%;
  @media (max-width: 480px) {
    padding: px-rem(15) px-rem(18) px-rem(15) px-rem(20);
  }
}
</style>
