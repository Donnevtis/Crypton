<template lang="pug">
.chart-container(ref='box')
  template(v-if='isLoad')
    svg.chart-graph(xmlns='http://www.w3.org/2000/svg' :viewBox='chart.viewBox'  vector-effect="non-scaling-stroke" preserveAspectRatio="xMinYMin meet")      
      g(stroke-width='0.5' style='shape-rendering: crispEdges')
        template(v-for='line in chart.gridY')        
          line( :key='line.y' x1='0' :y1='line.y' :x2='chart.width' :y2='line.y')   
          g.chart-labels-container.chart-labels
            text.chart-label(stroke='transparent' x='25' :y='line.y + 3'  text-anchor="middle") {{ line.$ }}               
        //- line(:x1='chart.width' :y1='0' :x2='chart.width' :y2='chart.height')    
    svg.chart-timers(:viewBox='chart.viewBox' vector-effect="non-scaling-stroke" preserveAspectRatio="xMinYMin meet")
      g(stroke-width='.5')
        line( v-for='tick in chart.gridX' :key='tick.i' :x1='tick.x' :y1='chart.height-2' :x2='tick.x' :y2='chart.height+3' style="transform: translateY(-36px)")
      transition-group(tag='g' name="timers-list" )        
        svg.chart-labels-container(v-for='tick in chart.gridX' :key='tick.i' width='80' :x='tick.x' :y='chart.height-5' preserveAspectRatio="xMinYMin meet")
          text.chart-label(stroke='transparent' text-anchor="middle") {{ tick.t }}
    chart-line(:d="d" :viewBox="chart.viewBox" :isCurrent="isCurrent") 
  app-spinner(v-else)
  blink-point(v-if="isCurrent" :chart="chart" :y="pointY")   
  chart-helper(v-if="isLoad" :chart="chart" :currency="activeWallet.name")
</template>

<script>
import ChartLine from "./ChartLine";
import ChartHelper from "./ChartHelper";
import AppSpinner from "../../Spinner";
import BlinkPoint from "./ChartBlinkPoint";
import { mapGetters } from "vuex";
import { Chart } from "../../../utils/chart-constructor";

export default {
  name: "ChartGraph",

  components: {
    ChartLine,
    ChartHelper,
    AppSpinner,
    BlinkPoint
  },

  data() {
    return {
      chart: {},
      currentRates: [],
      d: "",
      pointY: 0,
      isLoad: false
    };
  },

  mounted() {
    const box = this.$refs.box;
    this.chart = new Chart({
      width: box.clientWidth,
      height: box.clientHeight,
      stepX: 70,
      stepY: 36.25
    });
    this.chart.initChart();
    this.fetchRates();
  },

  beforeDestroy() {
    this.$store.dispatch("closeWS");
  },

  computed: {
    coins() {
      return this.$store.state.history.coins;
    },
    ...mapGetters(["activeStamp", "activeWallet", "dateRange"]),
    isCurrent() {
      return !this.activeStamp.mnth;
    }
  },

  watch: {
    activeWallet() {
      this.fetchRates();
    },
    activeStamp(stamp, oldStamp) {
      if (stamp.mnth && !oldStamp.mnth) {
        this.chart.initChart();
      }
      this.isLoad = stamp.mnth ? false : true;
      this.fetchRates();
    },
    currentRates(rates) {
      this.chart.currentPrice({
        data: rates,
        range: this.dateRange
      });
      this.d = this.chart.chartLinePath;
      this.pointY = this.chart.pointY;
    }
  },

  methods: {
    fetchRates() {
      const [rates, action] = this.activeStamp.mnth
        ? ["fullRates", "fetchFullRates"]
        : ["lastRates", "fetchCurrentRates"];

      this.$store
        .dispatch(action, {
          coinName: this.activeWallet.name
        })
        .then(() => this.createChart(rates))
        .catch(err => {
          // eslint-disable-next-line
          if (err) console.error(err);
          this.isLoad = false;
        });
    },

    createChart(rates) {
      if (this.isCurrent) {
        this.chart.initChart();
        this.currentRates = this.coins[this.activeWallet.name][rates];
      }
      this.chart.createChartLine({
        data: this.coins[this.activeWallet.name][rates],
        range: this.dateRange
      });
      this.chart.createTicks();
      this.d = this.chart.chartLinePath;
      this.isLoad = true;
    }
  }
};
</script>

<style lang='scss'>
.chart-container {
  position: relative;
  height: 100%;
  margin-top: px-rem(39);
  margin-left: 3rem;
}
.chart {
  &-graph {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: visible;

    & > g {
      stroke: $charcoal-grey;
    }
  }

  &-timers {
    position: absolute;
    height: 100%;
    width: 100%;
    transform: translateY(38px);
    stroke: $charcoal-grey;
  }

  &-labels {
    transform: translateX(-65px);
  }

  &-label {
    position: absolute;
    font-size: px-rem(10);
    font-weight: 500;
    fill: $color-text-light;
  }

  &-labels-container {
    overflow: visible;
  }
}

.timers-list-enter-active {
  transition: all 1s;
}

.timers-list-enter {
  opacity: 0;
}

@media (max-width: 480px) {
  .chart-container {
    margin-left: px-rem(25);
  }

  .chart-labels {
    transform: translateX(-45px);
  }
}
</style>
