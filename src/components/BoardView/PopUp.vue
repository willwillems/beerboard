<template lang="jade">
    .pop-up
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
  top: 50px;
  left: 300px;
  width: $pop-up-width;
  background-color: white;
  border-radius: 10px;
  border: 3px solid black;

  .menu-item {
    padding: 8px;
    padding-left: 15px; 
    border-bottom: 1px solid darkgray;
    text-align: left;

    &:last-child{
        border: 0;
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
  left: 50%;
  margin-left: -15px; /* adjust for border width */
}

// Adds the border to the triangle
.pop-up:before {
  border-width: 19px; // 4px extra border width
  border-bottom-color: black;
  left: calc(50% - 4px); // Minus extra border width
}
</style>
