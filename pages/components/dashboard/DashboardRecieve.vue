<template>
  <div class="recieve">
    <!-- <input type="" class="recieve-wallet"> -->
    <div class="recieve-wallet-wrap">
      <select class="recieve-wallet" v-model="thisWallet">
        <option v-for="wallet in allWallets" :key="wallet.id" :value="wallet">{{ wallet.acronym }}</option>
      </select>
    </div>
    <div class="recieve-amount-wrap">
      <input
        type="number"
        class="recieve-amount"
        :value="thisWallet.amount"
        :max="thisWallet.amount"
      />
    </div>
    <div class="recieve-key-wrap">
      <input class="recieve-key" placeholder="1Cs4wu6pu5qCZ35bSLNVzGyEx5N6uzb" />
    </div>

    <span class="recieve-span">Recieve {{ thisWallet.acronym }}</span>

    <button class="recieve-send">send</button>
  </div>
</template>

<script>
export default {
  name: "DashboardRecieve",
  data() {
    return {
      thisWallet: this.$store.getters.allWallets[0]
    };
  },
  computed: {
    allWallets() {
      return this.$store.getters.allWallets;
    }
  }
};
</script>

<style scoped>
.recieve {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  align-items: center;
  height: 100%;
  background-color: var(--color-middle);
  font-size: 0.8vw;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-white);
  text-transform: uppercase;
  padding: 27px 15px 26px 6.07vw;
}
.recieve-wallet {
  position: relative;
  width: 4.65vw;
  height: 2vw;
  border-radius: 2px;
  background-color: var(--color-light);
  font-size: 0.8vw;
  text-transform: uppercase;
  appearance: none;
  cursor: pointer;
  background-image: url("../assets/svg/options.svg");
  background-repeat: no-repeat;
  background-position: 90% center;
  padding-left: 0.8vw;
}
.recieve-wallet:hover {
  background-image: url("../assets/svg/options-white.svg");
}
.recieve-wallet-wrap,
.recieve-amount-wrap,
.recieve-key-wrap {
  position: relative;
}

.recieve-amount {
  width: 5.9vw;
  height: 2vw;
  border-radius: 2px;
  background-color: var(--color-light);
  font-size: 0.8vw;
  padding-left: 0.7vw;
}
.recieve-amount::-webkit-outer-spin-button,
.recieve-amount::-webkit-inner-spin-button {
  appearance: none;
}

.recieve-key {
  width: 100%;
  height: 2vw;
  border-radius: 2px;
  background-color: var(--color-light);
  text-transform: none;
  padding-left: 0.6vw;
}
.recieve-key-wrap {
  width: 100%;
}

.recieve-span {
  text-transform: none;
  font-size: 0.86vw;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-text-light);
}
.recieve-send {
  width: 4.08vw;
  height: 1.64vw;
  border-radius: 1vw;
  border: solid 2px var(--color-text-light);
  font-size: 0.86vw;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-white);
}

.recieve-wallet-wrap::before {
  content: "wallet";
}
.recieve-key-wrap::before {
  content: "send to";
}
.recieve-amount-wrap::before {
  content: "amount";
}
.recieve-wallet-wrap::before,
.recieve-key-wrap::before,
.recieve-amount-wrap::before {
  position: absolute;
  left: -4.3vw;
  top: 6px;
}
</style>