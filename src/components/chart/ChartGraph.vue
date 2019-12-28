<template lang="pug">
.chart-container(ref='box')
  template(v-if='chartIsReady')
    svg.chart-graph(xmlns='http://www.w3.org/2000/svg' :viewBox='chart.viewBox' width="500" height="150"  vector-effect="non-scaling-stroke")
      svg.chart-field(:viewBox='chart.viewBox')
        g(stroke='var(--charcoal-grey)' stroke-width='0.5' style='shape-rendering: crispEdges')
          template(v-for='line in chart.gridY' )        
            line( :key='line.y' x1='0' :y1='line.y' :x2='chart.width' :y2='line.y')   
            svg.chart-worth-container(x='-50' width='50')    
              text.chart-worth(fill='var(--color-text-light' :key='line.y'  x='25' :y='line.y + 3'  text-anchor="middle") {{ line.$ }}               
          line(:x1='chart.width' :y1='0' :x2='chart.width' :y2='chart.height')        
        g(stroke='var(--charcoal-grey)')
          line(v-for='tick in chart.gridX' :key='tick.x' :x1='tick.x' :y1='chart.height' :x2='tick.x' :y2='chart.height+3')
        template(v-for='tick in chart.gridX')
          transition(tag='g' mode="out-in" name='list' )
            text.chart-timeframes(:key='tick.t' :x='tick.x - 12' :y='chart.height+28' fill='var(--color-text-light)') {{ tick.t }}
    component(:is="graph" :d="d" :viewBox='chart.viewBox') 
  component(:is="blinkPoint")   
  helper(v-if="chartIsReady" :chart="chart" :currency="getActiveWallet.name")
</template>

<script>
import chartLine from "./ChartLine";
import helper from "./ChartHelper";
import spinner from "../Spinner";
import blinkPoint from "./ChartBlinkPoint";
import { mapGetters } from "vuex";

export default {
  name: "ChartGraph",
  components: {
    chartLine,
    helper,
    spinner,
    blinkPoint
  },
  data() {
    return {
      isLoad: false,
      chartIsReady: false,
      d: ""
    };
  },
  mounted() {
    this.$store
      .dispatch("createChart", {
        coinName: this.getActiveWallet.name,
        mnths: this.activeStamp.mnth,
        box: this.$refs.box
      })
      .then(() => {
        this.isLoad = true;
        this.chartIsReady = true;
        this.d = this.chart.d;
      });
  },
  computed: {
    ...mapGetters({
      activeStamp: "activeStamp",
      getActiveWallet: "getActiveWallet",
      chart: "activeChart"
    }),
    // ...mapState({chart: state=> state.chartState.charts[this.getActiveWallet.name]}),
    viewBox() {
      return this.chart.viewBox
        .split(" ")
        .map((item, i) => (i == 0 ? +item - 20 : i == 3 ? +item + 20 : item))
        .join(" "); // '0 0 600 300' -> '-20 0 600 320'
    },
    graph() {
      return this.isLoad ? chartLine : "spinner";
    },
    blinkPoint() {
      return this.isLoad ? blinkPoint : "spinner";
    }
  },
  watch: {
    getActiveWallet(wallet) {
      // this.isLoad = false;
      this.$store
        .dispatch("createChart", {
          coinName: wallet.name,
          mnths: this.activeStamp.mnth,
          box: this.$refs.box
        })
        .then(() => {
          this.isLoad = true;
          this.d = this.chart.d;
        });
    },
    activeStamp(stamp) {
      this.isLoad = false;
      this.$store
        .dispatch("createChart", {
          coinName: this.getActiveWallet.name,
          mnths: stamp.mnth,
          box: this.$refs.box
        })
        .then(() => {
          this.isLoad = true;
          this.d = this.chart.d;
        });
    }
  },
  shift(px) {
    // this.$store.commit("animation", px);
    this.lines.forEach((line, i, lines) => {
      let x = line.x;
      x -= px; //formula for the offset of the pixels
      line.x = +x.toFixed(3);
      if (x <= -70) {
        //delete and create the timers
        lines.shift();
        lines.push(this.dates.getNewDate(line.i));
      }
    });
  }
};
</script>

<style scoped>
.chart-container {
  position: absolute;
  padding-left: 50px;
  padding-bottom: 20px;
  height: 100%;
  width: calc(100% - 50px);
}
.chart-graph {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: visible;
}
.chart-field {
  overflow: visible;
}
.chart-worth,
.chart-timeframes {
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-light);
}
.chart-worth-container {
  transform: translateX(-50px);
  width: 100px;
  height: 100px;
  overflow: visible;
}
.chart-worth {
  transform: translateX(0);
}
.list-enter-active {
  transition: all 0.5s;
}
.list-enter-to {
  opacity: 1;
}
.list-enter {
  opacity: 0;
}
.list-leave-active {
  transition: all 0.5s;
}
.list-leave {
  opacity: 1;
}
.list-leave-to {
  opacity: 0;
}
</style>
