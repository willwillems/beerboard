<template lang="jade">
    .main
        h1 test
</template>

<script>
export default {
  name: "modal",
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
@mixin material-shadow() {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.main {
    position: fixed;
    right: 20px;
    top: -80px;
    background-color: white;
    border: solid 1px #666;
    border-radius: 8px;
    opacity: 0.95;
    width: 300px;
    height: 70px;
    z-index: 100;
    @include material-shadow();
    transition: top 1s ease-in-out; //  Allow the modal to slide in from the top

    &.active {
        top: 20px;
    }
}
</style>
