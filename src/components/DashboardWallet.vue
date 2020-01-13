<template>
  <div class="wallet" @click="changer">
    <div class="wallet-header">
      <span class="acronym">{{currency.acronym}}</span>
      <div class="icon">
        <img :src="currency.icon" />
      </div>
    </div>
    <div class="wallet-footer">
      <span class="name">{{ currency.name.replace(/\w/i, l => l.toUpperCase()) }}</span>
      <transition name="fade">
        <span v-if="currency.active" class="rate">{{ currency.amount }}</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppWallet",
  props: {
    currency: Object,
    tab: Number
  },
  methods: {
    changer() {
      this.$store.commit("changeActive", this.currency.id);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/common";
.wallet {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: space-between;
  justify-content: space-between;
  position: relative;
  height: 100%;
  background-color: $color-middle;
  color: $color-white;
  width: 8.9vw;
  padding: px-rem(10);
  transition: ease 0.2s;
  overflow: hidden;

  &-header,
  &-footer {
    @include flex();
  }

  &-header {
    .acronym {
      position: relative;
      top: 0;
      left: 0;
      color: $color-text-dark;
      font-size: px-rem(12);
    }
    .icon {
      position: relative;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      width: 35px;
      height: 35px;
      background: $color-text-dark;
      transition: ease 0.2s;
    }
  }

  &-footer {
    align-items: flex-end;
  }

  .name {
    position: relative;
    bottom: 0;
    left: 0;
    font-size: 1rem;
  }

  .rate {
    position: relative;
    bottom: 0;
    right: 0;
    font-size: px-rem(24);
    text-align: right;
    transition: ease 0.5s;
  }

  img {
    margin: 0 auto;
  }

  &.active {
    flex-grow: 0.6;
    background-color: $color-green;
    .icon {
      background: rgba($color-text-dark, 0.3);
    }
    .acronym {
      color: rgba($color-text-dark, 0.3);
    }
  }
}

.fade-enter,
.fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}

@media (max-width: 480px) {
  .wallet {
    width: px-rem(120);
    padding: px-rem(10) px-rem(12) px-rem(14);

    &.active {
      flex-grow: inherit;
      width: px-rem(200);
    }
  }
}
</style>
