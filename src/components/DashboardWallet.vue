<template>
  <div class="wallet" @click="changer">
    <div class="header">
      <span class="acronym">{{currency.acronym}}</span>
      <div class="icon">
        <img :src="currency.icon" />
      </div>
    </div>
    <div class="footer">
      <span class="name">{{currency.name}}</span>
      <transition name="fade">
        <span v-if="currency.active" class="rate">{{ currency.amount}}</span>
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

<style scoped>
.wallet {
  display: flex;
  flex-flow: column nowrap;
  align-items: space-between;
  justify-content: space-between;
  position: relative;
  height: 100%;
  background-color: var(--color-middle);
  color: var(--color-white);
  width: 8.9vw;
  padding: 10px;
  transition: ease 0.2s;
  overflow: hidden;
}
.header,
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.footer {
  align-items: flex-end;
}
.acronym {
  position: relative;
  top: 0;
  left: 0;
  color: var(--color-text-dark);
  font-size: 12px;
  font-weight: 400;
  text-align: center;
}
.name {
  position: relative;
  bottom: 0;
  left: 0;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
}
.rate {
  position: relative;
  bottom: 0;
  right: 0;
  font-size: 24px;
  font-weight: 400;
  text-align: right;
  transition: ease 0.5s;
}
.icon {
  position: relative;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 35px;
  height: 35px;
  background: var(--color-text-dark);
  transition: ease 0.2s;
}
.active {
  flex-grow: 0.6;
  background-color: var(--color-green);
}
.active .icon {
  background: var(--color-text-dark-transporent);
}
.active .acronym {
  color: var(--color-text-dark-transporent);
}
img {
  display: block;
  margin: 0 auto;
  overflow: visible;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
