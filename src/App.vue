<template>
  <div id="app">
    <Header/> 
    <SideBar/>
    <Dashboard/>     
    
  </div>
  
</template>

<script>
import SideBar from './components/AppSideBar'
import Dashboard from './components/AppDashboard'
import Header from './components/AppHeader'
export default {
  name: 'app',
  components: {
   SideBar,
   Header,
   Dashboard
  }
  
}
</script>

<style>
#app {
  position: fixed; 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
   
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;  
}
body {
    background-color: #18191D;
   
}
svg {
  display: block;
}
input {
    border: none;
    text-decoration: none;
    outline: none;
    cursor: text;
    background-color: transparent;
    vertical-align: middle;
    font-family: 'Helvetica Neue';
    color: white;
 }

 button { 
    position: relative;        
    border: none;
    background: 0;
    padding:0;    
 }
 button:focus {
   outline: none;
 }

</style>
