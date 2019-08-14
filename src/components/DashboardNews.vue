<template>
  <div class="news">
    <span class="news-title">News</span>
    <article class="news-content">
      <section v-if="errored">News are not able...</section>
      <section v-else-if="loading">Loading...</section>
      <a v-else :href="link" target="_blank">{{ news }}</a>
    </article>
    <div class="news-date">{{ date }}</div>
  </div>
</template>

<script>
import { setInterval } from "timers";

export default {
  name: "DashboardNews",
  data() {
    return {
      news: null,
      date: null,
      link: null,
      loading: true,
      errored: false
    };
  },
  mounted() {
    this.getNews();
    setInterval(this.getNews, 12e4);
  },
  methods: {
    getNews() {
      fetch(
        "https://min-api.cryptocompare.com/data/v2/news/?d177dd631fd9bac1a16566cfe5d289b34a7479d57daa474ebaa36fcb873cdd4d"
      )
        .then(res => res.json())
        .then(res => {
          this.news = res.Data[0].title;
          this.link = res.Data[0].url;
          const date = new Date();
          this.date = date.toLocaleString("en", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            year: "numeric",
            month: "short"
          });
        })
        .catch(err => {
          console.log(err);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
<style scoped>
.news {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.85vw 1.43vw 1.28vw;
  background-color: var(--color-middle);
}
.news-title {
  position: relative;

  font-size: 1vw;
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
  left: 1%;
  font-size: 0.85vw;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-white);
}
.news-content:hover a {
  cursor: pointer;
  color: var(--color-green);
  text-decoration-line: underline;
}
.news-date {
  position: relative;
  left: 0;
  bottom: 0;
  font-size: 0.8vw;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--color-text-middle);
}
</style>