<template>
  <div class="chart-timestamps">
    <a
      href
      class="chart-timestamp chart-timestamps-1m"
      v-for="timestamp in timestamps"
      :key="timestamp.id"
      :class="{ 'chart-timestamp_active': timestamp.active}"
      @click.prevent="setActiveStamp(timestamp.id)"
    >{{timestamp.t}}</a>
  </div>
</template>

<script>
export default {
  name: "ChartTimestamp",

  computed: {
    timestamps() {
      return this.$store.getters.getStamps;
    }
  },
  methods: {
    setActiveStamp(id) {
      this.$store.commit("setActiveStamp", id);
    }
  }
};
</script>

<style scoped>
.chart-timestamps {
  right: 0;
  width: 13vw;
  display: flex;
  justify-content: space-between;
}
.chart-timestamp {
  width: 3vw;
  height: 1.6vw;
  font-size: 0.85vw;
  font-weight: 500;
  line-height: 2.7vh;
  color: var(--color-text-light);
  cursor: pointer;
  text-align: center;
}
.chart-timestamp_active {
  background-color: var(--color-text-light);
  border-radius: 1vw;

  color: var(--color-white);
}
.chart-timestamp:hover {
  color: var(--color-white);
}
</style>