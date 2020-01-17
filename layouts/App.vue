<template>
  <div id="app">
    <component :is="adaptive" />
    <app-sidebar />
    <nuxt />
  </div>
</template>

<script>
import AppSidebar from "../components/AppSideBar";
import AppDashboard from "../components/AppDashboard";
import AppHeader from "../components/AppHeader";
import MobileHeader from "../components/TheMobileHeader";
export default {
  layout: "dashboard",
  name: "app",
  components: {
    AppSidebar,
    AppHeader,
    AppDashboard
  },
  data() {
    return {
      adaptive: AppHeader
    };
  },
  mounted() {
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
  --color-slate: #1e2025;
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
  padding-left: px-rem(90);
}
input,
select,
a {
  border: none;
  text-decoration: none;
  outline: none;
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
