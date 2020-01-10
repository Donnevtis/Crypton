<template>
  <div class="balance-component">
    <div class="balance-component-transactions">
      <span>{{ transactions }}</span>
      <span>{{mainInfo.transactions == 1 ? 'Transaction' : 'Transactions' }}</span>
    </div>

    <div class="wallets">
      <span class="wallets-count">{{ mainInfo.walletsCount ? mainInfo.walletsCount : 0 }}</span>
      <span>{{mainInfo.walletsCount == 1 ? 'Wallet' : 'Wallets' }}</span>
    </div>

    <span class="balance">
      {{ mainInfo.balance ? mainInfo.balance : 0 }}
      <span>{{ mainInfo.currency == 'EUR' ? 'USD' : mainInfo.currency }}</span>
    </span>

    <span class="currency">
      {{ mainInfo.currencyEUR + ' ' + mainInfo.currency}}
      <span
        class="percent"
      >{{ mainInfo.currencyProfit > 0 ? `+${mainInfo.currencyProfit}%` : `${mainInfo.currencyProfit}%` }}</span>
    </span>

    <button class="buy-button" @click="$emit('update')">buy</button>
  </div>
</template>

<script>
export default {
  name: "DashboardBalance",
  props: {
    mainInfo: Object
  },
  computed: {
    transactions() {
      if (!this.mainInfo.transactions) {
        return 0;
      }
      let trans = (this.mainInfo.transactions + "").split("");
      if (trans.length > 3) {
        trans.splice(-3, 0, ",");
        return trans.join("");
      } else return this.mainInfo.transactions;
    }
  }
};
</script>

<style lang="scss" scoped>
.balance-component {
  position: relative;
  padding: 30px 23px 20px 30px;
  background-color: var(--color-light);
  width: 100%;
}
.balance-component-transactions {
  position: relative;
  top: -4px;
  left: 0;
  font-size: 2.5vw;
  font-weight: 400;
  color: var(--color-white);
}
.balance-component-transactions span:last-child {
  position: absolute;
  left: 0;
  bottom: -17px;
  content: "Transactions";
  color: var(--color-text-dark);
  font-size: 0.8vw;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
}
.wallets {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 27px;
  right: 23px;
  width: 4.5vw;
  height: 5.3vw;
  background-color: var(--color-wallets-counter);
  color: var(--color-white);
  font-size: 2.5vw;
  font-weight: 400;
  text-align: center;
}

.wallets span:last-child {
  position: relative;
  font-size: 0.9vw;
  font-weight: 400;
  text-align: center;
}
.balance {
  justify-self: start;
  position: absolute;
  bottom: 74px;
  color: var(--color-white);
  font-size: 3.5vw;
  font-weight: 400;
  flex-grow: 4;
  text-align: center;
  letter-spacing: 0.5px;
}
.balance::before {
  content: "Current balance";
  position: absolute;
  top: -14px;
  color: var(--color-text-light);
  font-size: 0.85vw;
  font-weight: 400;
  text-align: center;
}
.balance span {
  position: relative;
  top: -35px;
  left: -10px;
  color: var(--color-text-dark);
  font-size: 0.85vw;
  font-weight: 400;
  text-align: center;
}
.currency {
  position: absolute;
  bottom: 20px;
  left: 30px;
  color: var(--color-white);
  font-size: 0.85vw;
  font-weight: 400;
}
.percent {
  color: var(--color-green);
  font-size: 0.85vw;
  font-weight: 400;
}
.buy-button {
  position: absolute;
  bottom: 20px;
  right: 23px;
  width: 3.3vw;
  height: 1.6vw;
  border: 3px solid var(--color-green);
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  font-size: 0.8vw;
  font-weight: 400;
  color: var(--color-white);
  transition: ease 0.1s;
}
.buy-button:hover {
  background-color: var(--color-bright);
  border-color: var(--color-green);
}
div {
  border-radius: 2px;
}
</style>
