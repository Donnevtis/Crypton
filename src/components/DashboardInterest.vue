<template>
  <div class="interest">
    <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
      <circle cx="16" cy="16" r="14" fill="none" stroke-width="2" />
      <path :d="d" fill="transparent" stroke-width="3" />
    </svg>
    <span class="percent">{{ wallet.fullness + '%' }}</span>
    <div class="name">{{wallet.name}}</div>
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

<style lang="scss">
@import "../scss/common";
.interest {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-slate;
  .loader {
    width: 2.3vw;
    height: 2.3vw;

    & > circle {
      stroke: $color-light;
    }

    & > path {
      stroke: $color-green;
    }
  }
  .percent {
    width: 4rem;
    font-size: 1.715vw;
    font-weight: 400;
    text-align: start;
  }
  .name {
    width: 4rem;
    left: 10vw;
    font-size: 0.85vw;
    color: $font-color-dark;
    text-transform: capitalize;
  }

  @media (max-width: 480px) {
    & {
      height: px-rem(40);
    }
    .loader {
      position: relative;
      width: px-rem(32);
      height: px-rem(32);
    }
    .percent {
      width: 5rem;
      font-size: px-rem(24);
    }
    .name {
      width: 4.5rem;
      font-size: px-rem(12);
    }
  }
}
</style>
