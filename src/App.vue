<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store'
import firebase from './firebase'

export default {
  store,
  name: 'app'
}
</script>

<style>
html {
  height: 100%;
  width: 100%;
  background-color: teal;
}
body {
  height: 100%;
  width: 100%;
  margin: 0px;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
