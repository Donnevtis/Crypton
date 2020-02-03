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
const axios = require("axios").default;
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
      axios
        .get(
          "https://min-api.cryptocompare.com/data/v2/news/?d177dd631fd9bac1a16566cfe5d289b34a7479d57daa474ebaa36fcb873cdd4d"
        )
        .then(res => res.data)
        .then(res => {
          this.news = res.Data[0].title;
          this.link = res.Data[0].url;
          const date = new Date(res.Data[0].published_on * 1000);
          this.date = date.toLocaleString("en", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            year: "numeric",
            month: "short"
          });
        })
        .catch(() => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
<style lang='scss'>


.news {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.85vw 1.43vw 1.28vw;
  background-color: $color-middle;

  &-title {
    position: relative;
    font-size: 1vw;
    color: $color-white;
  }

  &-content {
    position: relative;
    width: 100%;
    left: 1%;
    font-size: 0.85vw;
    color: $color-white;
    &:hover a {
      cursor: pointer;
      color: $color-green;
      text-decoration-line: underline;
    }
  }

  &-date {
    position: relative;
    left: 0;
    bottom: 0;
    font-size: 0.8vw;
    color: $color-text-middle;
  }
}
@media (max-width: 480px) {
  .news {
    width: initial;
    padding: px-rem(12) px-rem(12) px-rem(20) px-rem(21);

    &-title {
      font-size: px-rem(16);
    }

    &-content {
      font-size: px-rem(14);
    }

    &-date {
      font-size: px-rem(12);
    }
  }
}
</style>
