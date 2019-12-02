<template>
  <div id="app">
    <Header />
    <SideBar />
    <Dashboard />
  </div>
</template>

<script>
import SideBar from "./components/AppSideBar";
import Dashboard from "./components/AppDashboard";
import Header from "./components/AppHeader";
export default {
  name: "app",
  components: {
    SideBar,
    Header,
    Dashboard
  },
  created() {
    this.$store.dispatch("fetchRates", 1);
  }
};
</script>

<style>
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
#app {
  position: fixed;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
}
ul {
  list-style-type: none;
}
* {
  user-select: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
body {
  background-color: var(--color-dark);
}
svg {
  display: block;
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
  color: white;
}

button {
  position: relative;
  border: none;
  background: 0;
  padding: 0;
}
button:focus {
  outline: none;
}
div {
  border-radius: 2px;
}
</style>
