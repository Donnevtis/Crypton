<template>
  <div class="chart-timestamps">
    <button
      class="chart-timestamp-btn"
      v-for="(timestamp, index) in timestamps.times"
      :key="timestamp.id"
      :class="{ 'chart-timestamp-btn_active': timestamp.active, 'chart-timestamp-btn_hiding': index == 2 || index == 3}"
      @click.prevent="setActiveStamp(timestamp.id)"
    >{{timestamp.t}}</button>
    <button class="chart-timestamp-btn-open options"></button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ChartTimestamp",
  computed: mapState(["timestamps"]),
  methods: {
    ...mapMutations(["setActiveStamp"])
  }
};
</script>

<style lang="scss" scoped>
.chart-timestamps {
  width: 13vw;
  display: flex;
  justify-content: space-between;

  .chart-timestamp-btn {
    display: block;
    position: relative;
    width: 3vw;
    height: 1.6vw;
    font-size: 0.85vw;
    color: $color-text-light;
    cursor: pointer;
    text-align: center;

    &_active {
      background-color: $color-text-light;
      border-radius: 1vw;
      color: $color-white;
    }

    &:hover {
      color: $color-white;
    }

    &-open {
      display: none;
    }
  }
}
@media (max-width: 480px) {
  .chart-timestamps {
    width: px-rem(120);

    .chart-timestamp-btn {
      font-size: px-rem(12);
      width: px-rem(37);
      height: px-rem(23);

      &_active {
        border-radius: 14px;
      }

      &-open {
        display: block;
        height: px-rem(23);
        width: px-rem(15);
        background-position: right;
      }
    }
    .chart-timestamp-btn_hiding {
      display: none;
    }
  }
}
</style>