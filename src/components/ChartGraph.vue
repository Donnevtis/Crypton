<template>
<div><svg class="chart-field" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
    <g class="chart-worth" fill="var(--color-text-light)">
      <text x="2" y="12">20k</text>
      <text x="2" y="50">15k</text>
      <text x="2" y="88">10k</text>
      <text x="2" y="127">5k</text>
      <text x="2" y="166">0k</text>
    </g>

  </svg>
  <svg class="chart-graph" xmlns="http://www.w3.org/2000/svg" viewBox="30 0 600 200">
        <g stroke="var(--charcoal-grey)" stroke-width=".5" style="shape-rendering: crispEdges">
        <line x1="0" y1="10" x2="600" y2="10" />
        <line x1="0" y1="48.25" x2="600" y2="48.25" />
        <line x1="0" y1="86.5" x2="600" y2="86.5" />
        <line x1="0" y1="124.75" x2="600" y2="124.75" />
        <line x1="0" y1="163" x2="600" y2="163" />
        </g>
        <g stroke="var(--charcoal-grey)">
        <line v-for="time in timers" :key="time.time" :x1="time.x + 12" y1="163" :x2="time.x + 12" y2="167" />
        </g>
        <g class="chart-timeframes" fill="var(--color-text-light)">
        <text v-for="time in timers" :key="time.time" :x='time.x' y="200">{{ time.t }}</text>
        </g>
    </svg></div>

</template>

<script>
export default {
  name: "ChartGraph",
  data(){
    return {
        x: 60,
        dates: [],
    }
  },
    computed:{
        activeStamp(){return this.$store.getters.getActiveStamp},
        timers: function(){
            this.dates = [];
            const marksHandler = new MarksHandler(this.activeStamp, this.x, 6);
            this.dates = marksHandler.lines;
            return this.dates
        }
        }
    };

    class MarksHandler {
        constructor(months,x , count){
            this.months = months;
            this.x = x;
            this.count = count;
            this.t = new Date();
            this.range = months ? this.date() : this.time();
            this.output = months ? this.dateOut() : this.timeOut();
            this.lines = this.fillLines();
        }
        fillLines(){
            const block = []
            for (let i = 0; i < this.count; i++) {
                let mark = new Mark(this.x, this.t, this.range);
                mark.t = this.output(mark.t)
                block.push(mark);
                this.t = +this.t + this.range;
                this.x  += 100;
            }
            return block;
        }
        time(){
                this.t.setMinutes(new Date().getMinutes() - 10);
                return (new Date() - this.t) / 5;
        }
        date(){
                this.t.setMonth(new Date().getMonth() - this.months);
                return (new Date() - this.t) / 5;
        }
        timeOut(){
             return mSec => new Date(mSec).toLocaleString("en", {
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric"
                        })
        }
        dateOut(){
            return mSec => new Date(mSec).toLocaleString("en", {
                        day: "numeric",
                        month: "short"
                        })
        }
    }
    class Mark{
            constructor(x, t, range){
                this.x = x;
                this.t = t;
                this.range = range;
                this.slideX(range/250)
            }

            slideX(t){
                setInterval(()=>{
                 this.x -= .25
                }, t)
            }

        };
</script>

<style scoped>
.chart-field {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  width: 100%;
}
.chart-worth,
.chart-timeframes {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-text-light);
}
.chart-graph{
    display: block;
    position: absolute;
  height: 100%;
  top: 0;
  left: 30px;
  width: 100%;
}
</style>