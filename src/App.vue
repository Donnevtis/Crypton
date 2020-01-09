<template>
  <div id="app">
    <app-header />
    <app-sidebar />
    <app-dashboard />
  </div>
</template>

<script>
import AppSidebar from "./components/AppSideBar";
import AppDashboard from "./components/AppDashboard";
import AppHeader from "./components/AppHeader";
export default {
  name: "app",
  components: {
    AppSidebar,
    AppHeader,
    AppDashboard
  }
};
</script>
<style lang="scss">
@import "./scss/variables";

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

  &:focus {
    outline: none;
  }
}

ul {
  list-style-type: none;
}
div {
  border-radius: 2px;
}
@media (max-width: 480px) {
  #app {
    position: absolute;
    width: 100%;
    height: auto;
  }
}

// #app {
//   position: fixed;
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   width: 100%;
//   height: 100vh;
// }
// ul {
//   list-style-type: none;
// }
// * {
//   user-select: none;
//   box-sizing: border-box;
//   margin: 0;
//   padding: 0;
//   font-family: BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
//     "Open Sans", "Helvetica Neue", sans-serif;
// }
// body {
//   background-color: var(--color-dark);
// }
// svg {
//   display: block;
// }
// input,
// select,
// a {
//   border: none;
//   text-decoration: none;
//   outline: none;
//   cursor: text;
//   background-color: transparent;
//   vertical-align: middle;
//   color: white;
// }

// button {
//   position: relative;
//   border: none;
//   background: 0;
//   padding: 0;
// }
// button:focus {
//   outline: none;
// }
// div {
//   border-radius: 2px;
// }
// @media (max-width: 480px) {
//   #app {
//     position: absolute;
//     width: 100%;
//     height: auto;
//   }
// }
</style>
