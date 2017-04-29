<template lang="pug">
  .bar
    .menu-element#server-connection(v-if="!$store.state.appstate.serverConnectionActive")
      i.material-icons cloud_off
    .menu-element#logo(v-if="$store.state.appstate.serverConnectionActive") BB
    .menu-element#time-date {{clockTime}}
    .menu-element#settings
      i.material-icons(@click="$store.commit('toggleSettings')") settings
</template>

<script>
export default {
  name: 'menu-bar',
  data: function () {
    return {
      clockTime: ""
    }
  },
  mounted () {
    var self = this
    setInterval(function () { self.updateClock() }, 1000)
  },
  methods: {
    updateClock () {
      const date = new Date()
      const lz = num => ("00" + num).slice(-2) // add leading zeroes
      const hours = lz(date.getHours())
      const minutes = lz(date.getMinutes())
      this.clockTime = `${hours}:${minutes}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$prim-white: white;

$bar-height: 40px;

.bar {
  position: fixed;
  top: 0px;
  width: 100%;
  height: $bar-height;
  background-color: $prim-white;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  border-bottom-style: solid;
}

.menu-element {
  display: inline-block;
  line-height: $bar-height;
  font-size: 2em;
  margin: 0px 27px;
  opacity: 0.71;

  &:hover {
    opacity: 0.9;
  }
}

#logo {
  float: left;
  opacity: 0.9;
  font-weight: 600;
}

#server-connection  {
  float: left;
  color: red;
  animation: blinker 3s ease-in-out infinite;
  .material-icons {
    font-size: 1em;
    line-height: $bar-height;
  }
}

@keyframes blinker {  
  50% { opacity: 0; }
}

#time-date {
  font-size: 1.2em;
}

#settings {
  float: right;
  // I really don't like that this is neccecairy, is there a way to 
  // get around this, it makes the CSS seem more complex than it is.
  .material-icons {
    font-size: 1em;
    line-height: $bar-height;
  }
}

</style>
