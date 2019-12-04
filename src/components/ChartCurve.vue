<template lang="pug">
svg.chart-graph(@mousemove="onmousein" xmlns='http://www.w3.org/2000/svg' viewBox='-30 -10 600 210')
  g.chart-curve( fill='transparent' stroke="var(--color-green)" stroke-width='2')
    path( :d='d' ref='path')
  g.chart-helper(fill='var(--color-text-light)')
    line(:x1='x1' y1='0' :x2='x1' y2='153' stroke="var(--color-text-light)" stroke-width='.5'  style='shape-rendering: crispEdges')
    text(:x='x1-25' y='167') {{helper.date}}
    text(:x='x1-25' y='177') {{helper.price}}
</template>

<script>
export default {
  name: "charCurve",
  props: { assets: Object },
  data() {
    return {
      d: "M0 100L600 100",
      x1: 0,
      graph: [],
      helper: {}
    };
  },
  watch: {
    assets(asset) {
      console.log(asset);

      this.buildCurve(asset);
    }
  },

  methods: {
    onmousein(e) {
      const scaleX = e.path[2].clientWidth / 600;
      const scaleY = e.path[3].clientHeight / 210;
      const x = e.layerX / scaleX;
      const y = e.layerY;
      this.x1 = Math.max(0, x - 30);
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
              timeZoneName: "short"
            }),
            price: "$" + point.price.toFixed(2)
          }
        : this.helper;
    },
    buildCurve({ limits, rates }) {
      this.graph = [];
      const min = limits.min;
      const max = limits.max;
      const x = 542;
      const y = 153;
      const xResolution = (rates[rates.length - 1].time - rates[0].time) / x;
      const yResolution = (max - min) / y;
      const startY = costToCoords(rates[0].priceUsd);
      const paths = [`M0 ${startY}`];
      this.graph.push({
        x: 0,
        y: startY,
        time: rates[0].time,
        date: rates[0].date,
        price: +rates[0].priceUsd
      });

      for (let i = 1; i < rates.length; i++) {
        const pathX = (rates[i].time - rates[0].time) / xResolution;
        const pathY = costToCoords(rates[i].priceUsd);
        paths.push(`L${pathX} ${pathY} `);
        this.graph.push({
          x: pathX,
          y: pathY,
          time: rates[i].time,
          date: rates[i].date,
          price: +rates[i].priceUsd
        });
      }
      function costToCoords(cost) {
        return (max - min - (+cost - min)) / yResolution;
      }
      this.d = paths.join("");
    }
  }
};
</script>

<style>
.chart-curve {
  position: absolute;
}
.chart-helper {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-light);
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
.chart-graph:hover .chart-helper {
  opacity: 1;
}
</style>