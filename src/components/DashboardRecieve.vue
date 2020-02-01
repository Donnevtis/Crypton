<template>
  <form class="recieve">
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
        min="0"
        step="0.000001"
      />
    </div>
    <div class="recieve-key-wrap">
      <input class="recieve-key" placeholder="1Cs4wu6pu5qCZ35bSLNVzGyEx5N…" />
    </div>

    <span>Recieve {{ thisWallet.name.replace(/\w/,l=>l.toUpperCase()) }}</span>

    <button class="recieve-send-btn" type="submit">send</button>
  </form>
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

<style lang='scss'>

.recieve {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: space-between;
  align-items: center;
  height: 100%;
  background-color: $color-middle;
  font-size: 0.8vw;
  font-weight: bold;
  color: $color-white;
  text-transform: uppercase;
  padding: 27px 15px 26px 6.07vw;
  border-radius: 2px;

  &-wallet {
    position: relative;
    width: 4.65vw;
    height: 2vw;
    border-radius: 2px;
    background-color: $color-light;
    font-size: 0.8vw;
    text-transform: uppercase;
    appearance: none;
    cursor: pointer;
    background-image: url("../assets/svg/options.svg");
    background-repeat: no-repeat;
    background-position: 90% center;
    padding-left: 0.8vw;

    &:hover {
      background-image: url("../assets/svg/options-white.svg");
    }

    &-wrap {
      position: relative;

      &:before {
        content: "wallet";
        @extend %before-position;
      }
    }
  }

  &-amount {
    width: 5.9vw;
    height: 2vw;
    border-radius: 2px;
    background-color: $color-light;
    font-size: 0.8vw;
    padding-left: 0.7vw;

    &-wrap {
      position: relative;
      &::before {
        content: "amount";
        @extend %before-position;
      }
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
    }
  }

  &-key {
    width: 100%;
    height: 2vw;
    border-radius: 2px;
    background-color: $color-light;
    padding-left: 0.6vw;

    &-wrap {
      width: 100%;
      position: relative;

      &::before {
        content: "send to";
        @extend %before-position;
      }
    }
  }

  & > span {
    text-transform: none;
    padding-left: 0.2rem;
    font-size: 0.86vw;
    font-weight: 400;
    color: $color-text-light;
  }

  &-send-btn {
    width: 4.08vw;
    height: 1.64vw;
    border: solid 2px $border-btn-color;
    border-radius: 1vw;
    font-size: 0.86vw;
    color: $color-white;
  }
}
%before-position {
  position: absolute;
  text-align: end;
  width: 4vw;
  left: -5.5vw;
  top: px-rem(6);
}
@media (max-width: 480px) {
  .recieve {
    font-size: px-rem(11);
    padding: px-rem(26) px-rem(20) px-rem(23) px-rem(72);

    &-wallet {
      @extend %inputs_firm;
      width: px-rem(60);
    }

    &-amount {
      @extend %inputs_firm;
      width: px-rem(69);
    }

    &-key {
      @extend %inputs_firm;
    }

    & > span {
      padding-left: 2rem;
      text-transform: none;
      font-size: px-rem(12);
      color: $color-text-light;
    }

    &-send-btn {
      width: px-rem(57);
      height: px-rem(23);
      font-size: px-rem(12);
      border-radius: 15px;
    }

    %inputs_firm {
      font-size: px-rem(12);
      height: px-rem(29);
      padding-left: 0.5rem;
    }
  }
  %before-position {
    left: px-rem(-75);
    width: 4rem;
  }
}
</style>