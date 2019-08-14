<template>
  <div class="wallets">
    <Wallet
      v-for="wallet in wallets"
      :key="wallet.id"
      :currency="wallet"
      :class="{active: currentTab === wallet.id}"
      :tab="currentTab"
      @to-active="currentTab = wallet.id"
    />
    <a href="#">Add wallet</a>
  </div>
</template>

<script>
import Wallet from "./DashboardWallet";

export default {
  name: "DashboardWallets",
  components: {
    Wallet
  },
  data() {
    return {
      currentTab: 1
    };
  },
  computed: {
    wallets() {
      return this.$store.getters.getFewWallets(4);
    }
  }
};
</script>

<style scoped>
.wallets {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wallets::before {
  content: "My wallets";
  position: absolute;
  top: -3vw;
  width: 74.52px;
  height: 21px;
  color: var(--color-white);
  font-size: 16px;
  font-weight: 400;
  text-align: center;
}
a {
  position: absolute;
  top: -2.8vw;
  right: 1vw;
  cursor: pointer;
  color: var(--color-green);
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.4px;
}
</style>
