<template>
  <div class="interest">
    <canvas class="loader" width="34" height="34"></canvas>
    <div class="percent" :wallet="wallet">{{ wallet.fullness + '%' }}</div>
    <div class="name" :wallet="wallet">{{wallet.name}}</div>
    <button class="options"></button>
  </div>
</template>

<script>
export default {
  name: "DashboardInterest",
  props: {
    wallet: Object
  },
  mounted: function() {
    const circle = this.$el.querySelector(".loader");
    const ctx = circle.getContext("2d");

    const koef = this.wallet.fullness / 50;

    ctx.beginPath();
    ctx.lineWidth = 2;

    ctx.strokeStyle = "#2a2b31";
    ctx.arc(17, 17, 13, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#7ac231";
    ctx.arc(17, 17, 13, 0, Math.PI * koef);
    ctx.stroke();
  }
};
</script>

<style scoped>
.interest {
  position: relative;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  background-color: var(--color-slate);
}
.loader {
  box-sizing: border-box;
  position: relative;
  left: 0.6vw;
  top: 0.3vw;
}
.percent {
  position: absolute;
  left: 5vw;
  font-size: 24px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #ffffff;
}
.name {
  position: absolute;
  left: 10vw;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #606166;
}
.fa-ellipsis-v {
  color: var(--color-light);
  font-size: 18px;
}
.options {
  position: absolute;
  right: 0;
  width: 10px;
  height: 16px;
  background: url("../assets/ellypsis.svg") no-repeat center;
  cursor: pointer;
}
.options:hover {
  background: url("../assets/ellypsis-white.svg") no-repeat center;
}
</style>
