<template lang="pug">
div
  svg.helper-field(xmlns='http://www.w3.org/2000/svg' :viewBox='chart.viewBox' preserveAspectRatio="xMinYMin meet")
    g.helper-group
      g.chart-helper
        line(:x1='x1' y1='0' :x2='x1' :y2='chart.height' stroke-width='.5' style='shape-rendering: crispEdges')
        svg(:x='x1-75' :y='yBudge' style='overflow:visible')
          rect(:width='width' :height='height'  x='0' y='0'  rx="2" ry="2")
          rect(width='10' height='10' :transform='`rotate(45,75,${yArrow})`' :x='75' :y='yArrow')
          text.chart-helper-price(x='75' y='18' text-anchor="middle") {{currency + ' Price: ' + helper.price }}     
          text.chart-helper-date(x='75' y='33' text-anchor="middle") {{helper.date}}
      rect.chart-rect(@mousemove.stop="onmousemove" :width="chart.width" :height="chart.height" fill="transparent" style="display:block")
</template>

<script>
export default {
  props: {
    chart: Object,
    currency: String
  },
  data() {
    return {
      width: 150,
      height: 44,
      x1: 0,
      helper: {},
      point: { y: 0 }
    };
  },
  computed: {
    yBudge() {
      return this.point.y > this.chart.height / 2
        ? this.point.y - this.height - 5
        : this.point.y + 5;
    },
    yArrow() {
      return this.point.y > this.chart.height / 2 ? this.height - 10 : -5;
    }
  },
  methods: {
    onmousemove(e) {
      const scaleX = e.target.getBoundingClientRect().width / this.chart.width;
      const x = (e.pageX - e.target.getBoundingClientRect().x) / scaleX;
      this.x1 = x;
      this.point = this.chart.dataStack.find(
        (item, index, arr) => item.x <= x && arr[index + 1].x >= x
      );
      this.helper =
        this.chart.range > 4e5
          ? {
              date: new Date(this.point.time).toLocaleString("en", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
              }),
              price: "$" + this.point.price.toFixed(2)
            }
          : {
              date: new Date(this.point.time).toLocaleString("en", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
              }),
              price: "$" + this.point.price.toFixed(2)
            };
    }
  }
};
</script>

<style lang='scss'>
.helper-field {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.chart-helper {
  font-size: px-rem(10);
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.5s ease-out;

  rect {
    fill: $color-light;
  }

  & > line {
    stroke: $color-text-light;
  }

  &-price {
    fill: $color-white;
    font-size: px-rem(12);
    font-weight: 500;
    text-transform: capitalize;
  }

  &-date {
    fill: $color-text-light;
  }
}

.helper-group:hover .chart-helper {
  opacity: 1;
}
</style>
