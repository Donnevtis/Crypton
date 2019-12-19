<template lang="pug">
.chart-container    
  svg.chart-graph(xmlns='http://www.w3.org/2000/svg' :viewBox='chart.viewBox' width="500" height="150"  vector-effect="non-scaling-stroke" preserveAspectRatio="xMaxYMid meet")
    svg.chart-field(:viewBox='chart.viewBox')
      g(stroke='var(--charcoal-grey)' stroke-width='0.5' style='shape-rendering: crispEdges')
        template(v-for='line in chart.crossHair' )        
          line( :key='line.y' :x1='line.x1' :y1='line.y1' :x2='line.x2' :y2='line.y2')
          text.chart-worth(fill='var(--color-text-light' :key='line.y'  x='-40' :y='line.y1 + 3') {{ line.$ }}     
        line(:x1='chart.startline.x1' :y1='chart.startline.y1' :x2='chart.startline.x2' :y2='chart.startline.y2')        
      g(stroke='var(--charcoal-grey)')
        line(v-for='tick in chart.ticks' :key='tick.x' :x1='tick.x + 12' :y1='chart._height+2' :x2='tick.x + 12' :y2='chart._height+5')
      transition-group.chart-timeframes(tag='g' name='list' fill='var(--color-text-light)')
        text(v-for='tick in chart.ticks' :key='tick.x' :x='tick.x' :y='chart._height+28') {{ tick.t }}
  component(:is="graph" :coinName="getActiveWallet.name") 
  component(:is="blinkPoint")   
  helper
</template>

<script>
import chartCurve from './ChartCurve';
import helper from './ChartHelper';
import spinner from '../Spinner';
import blinkPoint from './ChartBlinkPoint';
import { mapGetters } from 'vuex';

export default {
  name: 'ChartGraph',
  components: {
    chartCurve,
    helper,
    spinner,
    blinkPoint
  },
  data() {
    return {
      x: 30,
      lines: [],
      isLoad: false
    };
  },
  created() {
    this.$store
      .dispatch('createChart', {
        coinName: this.getActiveWallet.name,
        mnths: this.activeStamp.mnth
      })
      .then(() => (this.isLoad = true));
  },
  computed: {
    ...mapGetters({
      activeStamp: 'activeStamp',
      getActiveWallet: 'getActiveWallet',
      chart: 'activeChart'
    }),
    // ...mapState({chart: state=> state.chartState.charts[this.getActiveWallet.name]}),
    viewBox() {
      return this.chart.viewBox
        .split(' ')
        .map((item, i) => (i == 0 ? +item - 20 : i == 3 ? +item + 20 : item))
        .join(' '); // '0 0 600 300' -> '-20 0 600 320'
    },
    graph() {
      return this.isLoad ? chartCurve : 'spinner';
    },
    blinkPoint() {
      return this.isLoad ? blinkPoint : 'spinner';
    }
  },

  watch: {
    getActiveWallet(wallet) {
      this.isLoad = false;
      this.$store
        .dispatch('createChart', {
          coinName: wallet.name,
          mnths: this.activeStamp.mnth
        })
        .then(() => (this.isLoad = true));
    },
    activeStamp(stamp) {
      this.isLoad = false;
      this.dates = new MarksHandler(stamp.mnth, this.x, 6);
      this.lines = this.dates.lines;
      this.$store
        .dispatch('createChart', {
          coinName: this.getActiveWallet.name,
          mnths: stamp.mnth
        })
        .then(() => (this.isLoad = true));
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

class MarksHandler {
  constructor(months, x, count) {
    this.months = months;
    this.x = 20;
    this.count = count;
    this.t = new Date();
    this.range = months ? this.date() : this.time();
    this.output = months ? this.dateOut() : this.timeOut();
    this.lines = this.fillLines();
  }
  fillLines() {
    const block = [];
    for (let i = 0; i < this.count; i++) {
      let mark = new Mark(this, i);
      block.push(mark);
      this.t = +this.t + this.range;
      this.x += 83.6;
    }
    return block;
  }
  getNewDate(i) {
    this.t = new Date();
    this.x = 530;
    let mark = new Mark(this, i - 1);
    return mark;
  }
  time() {
    this.t.setMinutes(new Date().getMinutes() - 5);
    return (new Date() - this.t) / 5;
  }
  date() {
    this.t.setMonth(new Date().getMonth() - this.months);
    let range = Date.now() - this.t;
    const offsetTime = 42 * (range / 468);
    range = range - offsetTime;
    this.t = this.t.getTime() + offsetTime;
    return range / 5;
  }
  timeOut() {
    return mSec =>
      new Date(mSec).toLocaleString('en', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
      });
  }
  dateOut() {
    return mSec =>
      new Date(mSec).toLocaleString('en', {
        day: 'numeric',
        month: 'short'
      });
  }
}
class Mark {
  constructor(hand, i) {
    this.x = hand.x;
    this.t = hand.output(hand.t);
    this.range = hand.range;
    this.i = i;
    this.obj = hand;
  }
}
</script>

<style scoped>
.chart-container {
  position: absolute;
  padding-left: 50px;
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

.list-enter-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
</style>
