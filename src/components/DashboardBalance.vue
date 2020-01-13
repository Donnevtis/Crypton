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
      {{ mainInfo.balance ? mainInfo.balance + '0' : 0 }}
      <!-- <span>{{ mainInfo.currency == 'EUR' ? 'USD' : mainInfo.currency }}</span> -->
    </span>

    <span class="currency">{{ mainInfo.currencyEUR + ' ' + mainInfo.currency}}</span>

    <span
      class="percent"
    >{{ mainInfo.currencyProfit > 0 ? `+${mainInfo.currencyProfit}%` : `${mainInfo.currencyProfit}%` }}</span>

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
@import "../scss/common";
.balance-component {
  display: grid;
  grid-template: 1fr 3fr 1fr/1fr 1fr;
  position: relative;
  padding: px-rem(30) px-rem(23) px-rem(20) px-rem(30);
  background-color: $color-light;

  &-transactions {
    position: relative;
    font-size: 2.5vw;

    & > span:last-child {
      position: absolute;
      color: $color-text-dark;
      font-size: 0.95vw;
      top: px-rem(50);
      left: 0;
    }
  }
}

.wallets {
  display: flex;
  flex-direction: column;
  justify-self: end;
  padding: 0.5rem 0.75rem 0.2rem;
  background-color: $color-wallets-counter;
  font-size: 2.5vw;
  text-align: center;
  line-height: 2rem;

  & > span:last-child {
    position: relative;
    font-size: 0.9vw;
    text-align: center;
  }
}

.balance {
  position: relative;
  grid-column: 1/2;
  grid-row: 2;
  align-self: end;
  font-size: 3.5vw;
  text-align: center;
  letter-spacing: 0.5px;

  &::before {
    content: "Current balance";
    position: absolute;
    top: px-rem(-17);
    color: $color-text-light;
    font-size: 0.85vw;
    text-align: center;
    letter-spacing: 0.3px;
  }

  &::after {
    content: "USD";
    position: absolute;
    color: $color-text-light;
    font-size: 0.85vw;
    text-align: center;
  }
}

.currency,
.percent {
  grid-row: 3;
  grid-column: 1;
  align-self: end;
  font-size: 0.85vw;
}

.percent {
  color: $color-green;
  justify-self: end;
  padding-right: 1.8rem;
}

.buy-button {
  grid-row: 3;
  grid-column: 2;
  align-self: end;
  justify-self: end;
  padding: 0.1rem 0.8rem;
  border: 3px solid $color-green;
  border-radius: px-rem(25);
  font-size: 0.8vw;
  transition: ease 0.1s;

  &:hover {
    background-color: $color-bright;
    border-color: $color-green;
  }
}
@media (max-width: 480px) {
  .balance-component {
    padding: px-rem(29) px-rem(20) px-rem(30);
    grid-template: 1fr 1.5fr 0.58fr/1fr 1fr;

    &-transactions {
      font-size: px-rem(34);
      & > span:last-child {
        font-size: px-rem(12);
      }
    }
  }
  .wallets {
    font-size: px-rem(34);
    & > span:last-child {
      font-size: px-rem(13);
    }
  }
  .balance {
    font-size: px-rem(48);
    letter-spacing: 0.5px;

    &::before,
    &::after {
      font-size: px-rem(12);
    }
  }
  .currency,
  .percent,
  .buy-button {
    font-size: px-rem(12);
    border-width: 2px;
  }
}
</style>
