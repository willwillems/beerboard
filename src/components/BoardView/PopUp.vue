<template lang="jade">
    .pop-up(v-if="$store.state.appstate.settingsMenuOpen")
      .menu-item lol
      .menu-item lol
      .menu-item lol
</template>

<script>
export default {
  name: "PopUp",
  data: function () {
    return {
    }
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$pop-up-width: 200px;

.pop-up { 
  position: absolute;
  top: 60px;
  right: 5px;
  width: $pop-up-width;
  max-width: 90%; // prevent dialog being wider than screen for mobile users
  background-color: white;
  border-radius: 10px;
  border: 3px solid black;
  //overflow: hidden;

  .menu-item {
    padding: 8px;
    padding-left: 15px; 
    border-bottom: 1px solid darkgray;
    text-align: left;

    &:first-child {
        border-radius: 7px 7px 0px 0px; // border radius - border
    }

    &:last-child {
        border: 0;
        border-radius: 0px 0px 7px 7px; // border radius - border
    }

    &:hover {
        background-color: aliceblue;
    }
  }
}
 
// Ads the triangle on top of the pop up
.pop-up:after, .pop-up:before  {
  content: '';
  position: absolute;
  color: transparent;
 
  width: 0;
  height: 0;
 
  border: 15px solid;
  border-bottom-color: white;
  
 
  bottom: 100%;
  right: 10%;
  margin-left: -15px; /* adjust for border width */
}

// Adds the border to the triangle
.pop-up:before {
  border-width: 19px; // 4px extra border width
  border-bottom-color: black;
  right: calc(10% - 4px); // Minus extra border width
}
</style>
