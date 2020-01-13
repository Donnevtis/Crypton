<template>
  <div id="app">
    <component :is="adaptive" />
    <app-sidebar />
    <app-dashboard />
  </div>
</template>

<script>
import AppSidebar from "./components/AppSideBar";
import AppDashboard from "./components/AppDashboard";
import AppHeader from "./components/AppHeader";
import MobileHeader from "./components/TheMobileHeader";
export default {
  name: "app",
  components: {
    AppSidebar,
    AppHeader,
    AppDashboard
  },
  created() {
    this.adaptive = window.matchMedia("(min-width: 480px)").matches
      ? AppHeader
      : MobileHeader;
  }
};
</script>
<style lang="scss">
@import "./scss/variables", "./scss/functions";

:root {
  --color-dark: #18191d;
  --color-slate: #222429;
  --color-middle: #1d2024;
  --color-light: #2a2b31;
  --color-bright: #45464d;
  --color-green: #7ac231;
  --color-white: #ffffffee;
  --color-red: #c11e0f;
  --color-icons: #43444b;
  --color-text-dark: #3a3c43;
  --color-text-dark-transporent: #3a3c4385;
  --color-text-middle: #42434b;
  --color-text-light: #606166;
  --color-conversation-active: #4c4d55;
  --color-wallets-counter: #252529;
  --charcoal-grey: #323235;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
}
body {
  font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  background-color: $color-dark;
  color: $color-white;
}
input,
select,
a {
  border: none;
  text-decoration: none;
  outline: none;
  cursor: text;
  background-color: transparent;
  vertical-align: middle;
  color: $color-white;
}
button {
  position: relative;
  border: none;
  background: 0;
  padding: 0;
  color: $color-white;
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
