<template lang="pug">
.chart-container
  svg.chart-field(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 210')
    g.chart-worth(fill='var(--color-text-light)')
      text(v-for='priceLine in priceLines' :key='priceLine.y' x='2' :y='priceLine.y') {{ priceLine.price }}     
  svg.chart-graph(xmlns='http://www.w3.org/2000/svg' viewBox='-30 0 600 210')
    svg
      g(stroke='var(--charcoal-grey)' stroke-width='.5' style='shape-rendering: crispEdges')
        line(x1='0' y1='10' x2='570' y2='10')
        line(x1='0' y1='48.25' x2='570' y2='48.25')
        line(x1='0' y1='86.5' x2='570' y2='86.5')
        line(x1='0' y1='124.75' x2='570' y2='124.75')
        line(x1='0' y1='163' x2='570' y2='163')
        line(x1='542' y1='10' x2='542' y2='163')
      g(stroke='var(--charcoal-grey)')
        line(v-for='time in lines' :key='time.i' :x1='time.x + 12' y1='163' :x2='time.x + 12' y2='167')
      transition-group.chart-timeframes(tag='g' name='list' fill='var(--color-text-light)')
        text(v-for='time in lines' :key='time.i' :x='time.x' y='200') {{ time.t }}
  component(:is="graph" :coin="coin") 
  helper
</template>


<script>
import chartCurve from "./ChartCurve";
import helper from "./ChartHelper";
import spinner from "./Spinner";
import { mapGetters } from "vuex";
export default {
  name: "ChartGraph",
  components: {
    chartCurve,
    helper,
    spinner
  },
  data() {
    return {
      x: 30,
      lines: [],
      coin: ""
    };
  },
  created() {
    // handler(active month range, time range mark x-position, count marks)
    this.dates = new MarksHandler(this.getActiveStamp.mnth, this.x, 6);
    this.lines = this.dates.lines; // array with objects of the timers
    this.moveWorker();
    this.$store.dispatch("fetchRates").then(() => this.graphAssets());
  },
  computed: {
    ...mapGetters([
      "getActiveStamp",
      "getDateRange",
      "getActiveWallet",
      "rates",
      "onlineRates",
      "priceLines"
    ]),
    graph() {
      return this.coin ? chartCurve : "spinner";
    },
    worker() {
      return this.$store.state.worker.worker;
    }
  },

  watch: {
    async getActiveWallet() {
      await this.$store.dispatch("fetchRates");
      this.graphAssets();
    },
    async getActiveStamp(stamp) {
      if (this.worker) {
        stamp.mnth
          ? this.$store.commit("stopWorker") || null
          : this.moveWorker();
      }
      this.dates = new MarksHandler(stamp.mnth, this.x, 6);
      this.lines = this.dates.lines;
      await this.$store.dispatch("fetchRates");
      this.graphAssets();
    },
    onlineRates() {
      this.graphAssets();
    }
  },
  methods: {
    moveWorker() {
      this.$store.commit("startWorker");
      this.worker.onmessage = e => {
        this.lines.forEach((line, i, lines) => {
          let x = line.x;
          x -= +(1 / (line.range / 100 / e.data)); //formula for the offset of the pixels
          line.x = +x.toFixed(3);
          if (x <= -70) {
            //delete and create the timers
            lines.shift();
            lines.push(this.dates.getNewDate(line.i));
          }
        });
      };
    },
    graphAssets() {
      this.coin = this.rates.name;
    }
  }
};

class MarksHandler {
  constructor(months, x, count) {
    this.months = months;
    this.x = x;
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
      this.x += 100;
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
    const offsetTime = 42 * (range / 542);
    range = range - offsetTime;
    this.t = this.t.getTime() + offsetTime;
    return range / 5;
  }
  timeOut() {
    return mSec =>
      new Date(mSec).toLocaleString("en", {
        hour12: false,
        hour: "numeric",
        minute: "numeric"
      });
  }
  dateOut() {
    return mSec =>
      new Date(mSec).toLocaleString("en", {
        day: "numeric",
        month: "short"
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
  height: 100%;
  width: 100%;
}
.chart-graph,
.chart-field {
  position: absolute;
  height: 100%;
  width: 100%;
}
.chart-worth,
.chart-timeframes {
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