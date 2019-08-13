<template>
  <div class="news">
    <span class="news-title">News</span>
    <span class="news-content">{{ news }}</span>
    <div class="news-date">{{ date }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DashboardNews",
  data() {
    return { news: null, date: null };
  },
  mounted() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/v2/news/?d177dd631fd9bac1a16566cfe5d289b34a7479d57daa474ebaa36fcb873cdd4d"
      )
      .then(res => {
        this.news = res.data.Data[0].title;
        this.date = new Date();
      });
  }
};
</script>
<style scoped>
.news {
  position: relative;
  background-color: var(--color-middle);
}
.news-title {
  position: relative;
  width: 100%;
  left: 1.42vw;
  top: 0.82vw;
  font-size: 1.14vw;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-white);
}
.news-content {
  position: relative;
  width: 100%;
  left: 1.42vw;
  top: 1.5vw;
  font-size: 1.1vw;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-white);
}
</style>