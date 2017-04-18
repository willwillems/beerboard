<template lang="jade">
  .bar
    .menu-element#logo BB
    .menu-element#time-date 15:33
    .menu-element#settings
      i.material-icons(@click="$store.commit('toggleSettings')") settings
</template>

<script>
export default {
  name: 'menu-bar'
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
