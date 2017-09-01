<template lang="pug">
    .backdrop(v-if="user.uid !== undefined")
        p
        i Let go of screen to stop beer addition
        p
        p.beer-cart-number 
          span {{beersInCartOfUser}}
        .timer
          .halfclip
              .halfcircle#clipped(:style="userColorStyle")
          .halfcircle#fixed(:style="userColorStyle")
          .selected-user(:style="userStyle")
</template>

<script>
export default {
  name: "UserMobileLoading",
  data: function () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.appstate.touchOverlayUser
    },
    beersInCartOfUser () {
      const userID = this.user.uid
      // find the user in cart and return the beersInCart property
      try {
        return this.$store.state
          .appstate
          .cart
          .find(obj => obj.uid === userID)
          .beersInCart
      } catch (e) {
        if (e instanceof TypeError) {
          return 0
        }
      }
    },
    userStyle () {
      return `background-image: url(${this.user.img});`
    },
    userColorStyle () {
      return `
      border-top-color: ${this.user.color};
      border-left-color: ${this.user.color};
      `
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// all of the circle animation stuff is from:
// https://stackoverflow.com/questions/26807610/css-only-animate-draw-circle-with-border-radius-and-transparent-background/28866340#28866340

$loading-circle-thickness: 3px;
$loading-circle-color: teal;
$loading-circle-duration: 1.5s;
$loading-circle-size: 300px;

.backdrop {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background-color: white;
    opacity: 0.95;
    z-index: 1;
}
.timer {
  position: fixed;
  left: calc(50vw - 0.5 * #{$loading-circle-size});
  top: calc(50vw - 0.5 * #{$loading-circle-size});
  width: $loading-circle-size;
  height: $loading-circle-size;
}

.selected-user {
  width: 90%;
  height: 90%;
  margin: 5%;
  border-radius: 50%;
  background-size: cover;
}

.beer-cart-number {
  position: fixed;
  width: 200px;
  left: calc(50vw - 100px - 10px);
  top: calc(50vw - 1.5em - 10px);
  font-size: 12em;
  color: white;
  text-align: center;
  z-index: 10;
}

.halfclip {
  width: 50%;
  height: 100%;
  right: 0px;
  position: absolute;
   overflow: hidden;
   transform-origin: left center;
   animation: cliprotate $loading-circle-duration steps(2) infinite;
   -webkit-animation: cliprotate $loading-circle-duration steps(2) infinite;
}

.halfcircle {
  box-sizing: border-box;
  height: 100%;
  right: 0px;
  position: absolute;
  border: solid $loading-circle-thickness transparent;
   border-top-color: $loading-circle-color;
   border-left-color: $loading-circle-color;
   border-radius: 50%;
}
#clipped {
  width: 200%;
   animation: rotate ($loading-circle-duration/2) linear infinite;
   -webkit-animation: rotate ($loading-circle-duration/2) linear infinite;
}
#fixed {
  width: 100%;
    transform: rotate(135deg);  
   animation: showfixed $loading-circle-duration steps(2) infinite;
   -webkit-animation: showfixed $loading-circle-duration linear infinite;
}

@-webkit-keyframes cliprotate {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

@keyframes cliprotate {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}


@-webkit-keyframes rotate {
  0% {transform: rotate(-45deg);}
  100% {transform: rotate(135deg);}
}

@keyframes rotate {
  0% {transform: rotate(-45deg);}
  100% {transform: rotate(135deg);}
}

@-webkit-keyframes showfixed {
  0% {opacity: 0;}
  49.9% {opacity: 0;}
  50% {opacity: 1;}
 100% {opacity: 1;}
}
</style>
