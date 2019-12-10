<template lang="pug">
svg.curve-container(xmlns='http://www.w3.org/2000/svg' viewBox='-30 -10 600 210')
  g.helper-container
    rect.chart-rect(@mousemove.stop="onmousemove"  width="542" height="200" x='0' y='0' fill="transparent" style="display:block")
    g.chart-helper(fill='var(--color-text-light)')
      line(:x1='x1' y1='0' :x2='x1' y2='153' stroke="var(--color-text-light)" stroke-width='.5'  style='shape-rendering: crispEdges')
      text(:x='x1-25' y='167') {{helper.date}}
      text(:x='x1-25' y='177') {{helper.price}}
</template>

<script>
export default {
  data() {
    return {
      x1: 0,
      helper: {}
    };
  },
  computed: {
    graph() {
      return this.$store.state.history.graph;
    }
  },
  methods: {
    onmousemove(e) {
      const scaleX = e.target.getBoundingClientRect().width / 542;
      const x = (e.pageX - e.target.getBoundingClientRect().x) / scaleX;
      this.x1 = x;

      const point = this.graph.find(
        item => item.x.toFixed() == this.x1.toFixed()
      );
      this.helper = point
        ? {
            date: new Date(point.time).toLocaleString("en", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "numeric",
              minute: "numeric"
            }),
            price: "$" + point.price.toFixed(2)
          }
        : this.helper;
    }
  }
};
</script>

<style>
.curve-container {
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 4234;
}
.chart-helper {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-light);
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
.helper-container:hover .chart-helper {
  opacity: 1;
}
</style>