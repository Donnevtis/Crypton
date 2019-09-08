<template>
  <svg class="chart-field" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
    <g class="chart-worth" fill="var(--color-text-light)">
      <text x="2" y="12">20k</text>
      <text x="2" y="50">15k</text>
      <text x="2" y="88">10k</text>
      <text x="2" y="127">5k</text>
      <text x="2" y="166">0k</text>
    </g>
    <g stroke="var(--charcoal-grey)" stroke-width=".5" style="shape-rendering: crispEdges">
      <line x1="45" y1="10" x2="600" y2="10" />
      <line x1="45" y1="48.25" x2="600" y2="48.25" />
      <line x1="45" y1="86.5" x2="600" y2="86.5" />
      <line x1="45" y1="124.75" x2="600" y2="124.75" />
      <line x1="45" y1="163" x2="600" y2="163" />
    </g>
    <g stroke="var(--charcoal-grey)">
      <line x1="72" y1="163" x2="72" y2="167" />
      <line x1="172" y1="163" x2="172" y2="167" />
      <line x1="272" y1="163" x2="272" y2="167" />
      <line x1="372" y1="163" x2="372" y2="167" />
      <line x1="472" y1="163" x2="472" y2="167" />
      <line x1="572" y1="163" x2="572" y2="167" />
    </g>
    <g class="chart-timeframes" fill="var(--color-text-light)">
      <text v-for="time in timers" :key="time.time" :x='time.x' y="200">{{ time.time }}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: "ChartGraph",
  data(){
    return {
        x: 60,
        times: 0,
    }
  },
    created(){

        class Timers{
            constructor(x, time, date){
                this.x = x;
                this.time = time;
                this.date = date;
            }
            getX(){
                return this.x
            }
            slideX(t){
                 this.time = 0
                setInterval(()=>{
                 console.log(this.time)
                 this.time += 1
                }, t)

            }
            getTime(){
                return this.time
            }
            date(){
                return this.date
            }
            set(x){
                this.x = x;
            }
        };

        let date  = new Date();
        let dates = [];

        date.setMinutes(new Date().getMinutes() - 10);
        const point = (new Date() - date) / 5;


        for (let i = 0; i < 6; i++) {
        const time = new Date(date).toLocaleString("en", {
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric"
                        })
          let timers = new Timers(this.x, time);
        timers.slideX(1000)

            dates.push(timers);
            date = +date + point;
            this.x  += 100;
            }

            console.log(dates)
        this.timers = dates;
       // this.pushStamp(dates)
        },


  methods:{


     pushStamp(dates){

    setInterval(()=>{
    let day = new Date(Date.now()).toLocaleString("en", {
              hour12: false,
             hour: "numeric",
              minute: "numeric"
            });
        if ( dates[5].time !== day){

            dates[5].time = day
        }
    },2000)

    }
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
</style>