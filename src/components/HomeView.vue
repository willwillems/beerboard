<template lang="pug">
  .main
    .title-container
      .title Beerboard
      .subtitle An easy central way to manage your beer usage
    beer-svg#beersvg
    .bottom
      button#learn-more Learn more
      button#sign-up Sign me up!
</template>

<script>
import BeerSvg from "./HomeView/BeerSvg"

export default {
  name: "HomeView",
  components: {
    BeerSvg
  },
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
.main {
  button {
    height: 3em;
    width: 9em;
    margin: 0px 10px;
    font-size: 1rem;
    background-color: transparent;
    border: 2px solid black;
    border-radius: 2em;
  }
}

#sign-up {
  background-color: black;
  color: white;
}

.title-container {
  text-align: left;
  margin: 40px;
  .title {
    font-size: 3em;
    font-weight: 500;
  }

  .subtitle {
    font-size: 14px;
    font-style: italic;
    color: #282828;
  }
}

#beersvg {
  width: 200px;
}

.bottom {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  bottom: 0px;
  width: 100%;
  height: 70px;
  text-align: right;
}
</style>
