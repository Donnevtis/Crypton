<template>
  <div id="app">
    <component :is="adaptive" />
    <app-sidebar />
    <router-view />
  </div>
</template>

<script>
import AppSidebar from './components/AppSideBar';
import AppDashboard from './components/AppDashboard';
import AppHeader from './components/AppHeader';
import MobileHeader from './components/TheMobileHeader';
export default {
  name: 'app',
  components: {
    AppSidebar,
    AppHeader,
    AppDashboard
  },
  created() {
    this.adaptive = window.matchMedia('(min-width: 480px)').matches
      ? AppHeader
      : MobileHeader;
  },
  updated() {
    document.title = `Cryptonix - ${this.$route.name}`;
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}

body {
  height: 100%;
  width: 100%;
  position: fixed;
  font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  background-color: $color-dark;
  color: $color-white;
  padding-left: px-rem(90);
}

input,
select,
a {
  border: none;
  text-decoration: none;
  background-color: transparent;
  vertical-align: middle;
  color: $color-white;
}

input {
  &[type="number"] {
    -moz-appearance: textfield;
    &:invalid {
      border: solid 1px rgba(255, 0, 0, 0.418);
    }
  }
}

button {
  position: relative;
  border: none;
  background: 0;
  padding: 0;
  color: $color-white;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

ul {
  list-style-type: none;
}

@media (max-width: 480px) {
  body {
    position: absolute;
    width: 100%;
    height: auto;
    padding: px-rem(28) 0;
  }
}
</style>
