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

<style scoped>
.interest-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 17px 21px 15px 24px;
  position: relative;
  background-color: var(--color-slate);
  height: 100%;
}
</style>
