<template lang="pug">
.chart-container(ref='box')
  template(v-if='isLoad')
    svg.chart-graph(xmlns='http://www.w3.org/2000/svg' :viewBox='chart.viewBox' width="500" height="150" vector-effect="non-scaling-stroke")      
      g(stroke='var(--charcoal-grey)' stroke-width='0.5' style='shape-rendering: crispEdges')
        template(v-for='line in chart.gridY' )        
          line( :key='line.y' x1='0' :y1='line.y' :x2='chart.width' :y2='line.y')   
          svg.chart-label-container(x='-50' width='50')    
            text.chart-labels(stroke='transparent' x='25' :y='line.y + 3'  text-anchor="middle") {{ line.$ }}               
        line(:x1='chart.width' :y1='0' :x2='chart.width' :y2='chart.height')    
    svg.chart-timers(:viewBox='chart.viewBox' vector-effect="non-scaling-stroke")
      g(stroke='var(--charcoal-grey)' stroke-width='1')
        line(v-for='tick in chart.gridX' :key='tick.x' :x1='tick.x' :y1='chart.height' :x2='tick.x' :y2='chart.height+3' style="transform: translateY(-26px)")
      transition-group(tag='g' name="timers-list" )        
          svg.chart-label-container(v-for='tick in chart.gridX' :key='tick.i' width='80' :x='tick.x' :y='chart.height')
            text.chart-labels(stroke='transparent' text-anchor="middle") {{ tick.t }}
    component(:is="graph" :d="d" :viewBox="chart.viewBox") 
  component(:is="blinkPoint")   
  helper(v-if="isLoad" :chart="chart" :currency="activeWallet.name")
</template>

<script>
import chartLine from "./ChartLine";
import helper from "./ChartHelper";
import spinner from "../Spinner";
import blinkPoint from "./ChartBlinkPoint";
import { mapGetters } from "vuex";
import { Chart } from "../../util/chart-constructor";

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
      chart: {},
      currentRates: [],
      d: {},
      isLoad: false
    };
  },
  mounted() {
    this.chart = new Chart(this.$refs.box);
    this.createChartLine();
  },
  computed: {
    coins() {
      return this.$store.state.history.coins;
    },
    ...mapGetters({
      activeStamp: "activeStamp",
      activeWallet: "activeWallet",
      dateRange: "dateRange"
    }),
    graph() {
      return this.isLoad ? chartLine : "spinner";
    },
    blinkPoint() {
      return this.isLoad ? blinkPoint : "spinner";
    }
  },
  watch: {
    activeWallet() {
      this.createChartLine();
    },
    activeStamp() {
      this.createChartLine();
    },
    currentRates(rates) {
      this.chart.currentPrice({
        data: rates,
        range: this.dateRange
      });
      this.d = this.chart.chartLinePath;
    }
  },
  methods: {
    createChartLine() {
      const [rates, action] = this.activeStamp.mnth
        ? ["fullRates", "fetchFullRates"]
        : ["lastRates", "fetchCurrentRates"];

      this.$store
        .dispatch(action, {
          coinName: this.activeWallet.name
        })
        .then(() => {
          this.chart.initChart({
            data: this.coins[this.activeWallet.name][rates],
            range: this.dateRange
          });
          this.chart.createTicks();
          this.d = this.chart.chartLinePath;
          this.isLoad = true;
          if (!this.activeStamp.mnth)
            this.currentRates = this.coins[this.activeWallet.name][rates];
        });
    }
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
.chart-timers {
  position: absolute;
  height: 100%;
  width: 100%;
  transform: translateY(28px);
}
.chart-labels {
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  fill: var(--color-text-light);
}
.chart-label-container {
  overflow: visible;
}
.timers-list-enter-active {
  transition: all 1s;
}
.timers-list-enter {
  opacity: 0;
}
</style>
