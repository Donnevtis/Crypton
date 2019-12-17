<template>
  <div class="interest">
    <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
      <circle cx="16" cy="16" r="14" fill="none" stroke="var(--color-light)" stroke-width="2" />
      <path :d="d" fill="transparent" stroke="var(--color-green)" stroke-width="3" />
    </svg>
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
  computed: {
    d() {
      const ringVal = {
        r: 14,
        cx: 15,
        cy: 30
      };
      const coords = [];
      const limit = Math.round(this.wallet.fullness * 3.6); // degree of percents (10 percent * 3.6 = 36 degree)
      for (let φ = 0; φ < limit; φ++) {
        // φ is degree
        if (φ % 2 == 0) continue;
        const rad = (φ * Math.PI) / 180;
        const x = (ringVal.r * Math.sin(rad) + 16).toFixed(5);
        const y = (ringVal.r * Math.cos(rad) + 16).toFixed(5);
        coords.push(`L ${x} ${y}`);
      }
      return `M ${ringVal.cx} ${ringVal.cy} ${coords.join(" ")}`;
    }
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
  width: 2.3vw;
  height: 2.3vw;
}
.percent {
  position: absolute;
  left: 4vw;
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
  background: url("../assets/svg/ellypsis.svg") no-repeat center;
  cursor: pointer;
}
.options:hover {
  background: url("../assets/svg/ellypsis-white.svg") no-repeat center;
}
</style>
