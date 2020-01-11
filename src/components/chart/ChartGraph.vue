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
    chart-line(:d="d" :viewBox="chart.viewBox" :isCurrent="isCurrent") 
  app-spinner(v-else)
  blink-point(v-if="isCurrent" :chart="chart" :y="pointY")   
  chart-helper(v-if="isLoad" :chart="chart" :currency="activeWallet.name")
</template>

<script>
import ChartLine from './ChartLine';
import ChartHelper from './ChartHelper';
import AppSpinner from '../Spinner';
import BlinkPoint from './ChartBlinkPoint';
import { mapGetters } from 'vuex';
import { Chart } from '../../util/chart-constructor';

export default {
  name: 'ChartGraph',
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
      d: '',
      pointY: 0,
      isLoad: false,
      isCurrent: false
    };
  },
  mounted() {
    const box = this.$refs.box;
    this.chart = new Chart({
      width: box.clientWidth,
      height: box.clientHeight,
      stepX: 70,
      stepY: 50
    });
    this.fetchRates();
  },
  computed: {
    coins() {
      return this.$store.state.history.coins;
    },
    ...mapGetters(['activeStamp', 'activeWallet', 'dateRange'])
  },
  watch: {
    activeWallet() {
      this.fetchRates();
    },
    activeStamp(mnth) {
      this.isLoad = mnth ? false : true;
      this.fetchRates();
    },
    currentRates(rates) {
      this.chart.currentPrice({
        data: rates,
        range: this.dateRange
      });
      this.d = this.chart.chartLinePath;
      this.pointY = this.chart.dataStack.slice(-1)[0].y;
    }
  },
  methods: {
    fetchRates() {
      this.isCurrent = false;
      const [rates, action] = this.activeStamp.mnth
        ? ['fullRates', 'fetchFullRates']
        : ['lastRates', 'fetchCurrentRates'];

      this.$store
        .dispatch(action, {
          coinName: this.activeWallet.name
        })
        .then(() => this.initChart(rates))
        .catch(err => {
          // eslint-disable-next-line
          if (err) console.error(err);
          this.isLoad = false;
        });
    },
    initChart(rates) {
      this.chart.initChart({
        data: this.coins[this.activeWallet.name][rates],
        range: this.dateRange
      });
      this.chart.createTicks();
      this.d = this.chart.chartLinePath;
      this.isLoad = true;
      if (!this.activeStamp.mnth) {
        this.isCurrent = true;
        this.currentRates = this.coins[this.activeWallet.name][rates];
      }
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
