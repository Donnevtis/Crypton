<template>
  <div class="chart-container" @visibilitychange="start">
    <svg class="chart-field" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 210">
      <g class="chart-worth" fill="var(--color-text-light)">
        <text x="2" y="12">20k</text>
        <text x="2" y="50">15k</text>
        <text x="2" y="88">10k</text>
        <text x="2" y="127">5k</text>
        <text x="2" y="166">0k</text>
      </g>
    </svg>
    <svg class="chart-graph" xmlns="http://www.w3.org/2000/svg" viewBox="-30 0 600 210">
      <svg>
        <g stroke="var(--charcoal-grey)" stroke-width=".5" style="shape-rendering: crispEdges">
          <line x1="0" y1="10" x2="570" y2="10" />
          <line x1="0" y1="48.25" x2="570" y2="48.25" />
          <line x1="0" y1="86.5" x2="570" y2="86.5" />
          <line x1="0" y1="124.75" x2="570" y2="124.75" />
          <line x1="0" y1="163" x2="570" y2="163" />
          <line x1="542" y1="10" x2="542" y2="163" />
        </g>
        <g stroke="var(--charcoal-grey)">
          <line
            v-for="time in dates"
            :key="time.i"
            :x1="time.x + 12"
            y1="163"
            :x2="time.x + 12"
            y2="167"
          />
        </g>

        <transition-group
          tag="g"
          name="list"
          class="chart-timeframes"
          fill="var(--color-text-light)"
        >
          <text v-for="time in dates" :key="time.i" :x="time.x" y="200">{{ time.t }}</text>
        </transition-group>
      </svg>
    </svg>
  </div>
</template>

<script>
export default {
  name: "ChartGraph",
  data() {
    return {
      x: 30,
      dates: []
    };
  },
  created() {
    this.dates = new MarksHandler(this.activeStamp, this.x, 6).lines; // handler(active time range, mark x-position, count marks)
  },
  computed: {
    activeStamp() {
      return this.$store.getters.getActiveStamp;
    }
  },
  watch: {
    activeStamp(stamp) {
      this.dates = new MarksHandler(stamp, this.x, 6).lines;
    }
  },
  methods: {
    start() {
      alert("show");
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
    let mark = new Mark(this, i);
    return mark;
  }
  time() {
    this.t.setMinutes(new Date().getMinutes() - 10);
    return (new Date() - this.t) / 5;
  }
  date() {
    this.t.setMonth(new Date().getMonth() - this.months);
    return (new Date() - this.t) / 5;
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
    this.slideX(this.range / 400);
  }

  slideX(r) {
    setInterval(() => {
      this.x -= 0.25;
      if (this.x == -70) {
        this.obj.lines.shift();
        this.obj.lines.push(this.obj.getNewDate(this.i));
      }
    }, r);
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