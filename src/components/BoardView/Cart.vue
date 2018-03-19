<template lang="pug">
  .main(@drop="drop", @dragover="dragover")
    // This overlay is because people often click inaccurate on touch screens
    .check-out-overlay(@click="$store.dispatch('checkCartOut')")
    .container
      transition(name="slide-left")
        i.material-icons.cartbutton(v-if="!usersInCart") shopping_cart
    .container
      transition(name="fade-out")
        i.cartbutton(v-if="usersInCart") {{totalBeersInCart}}
      transition(name="slide-fade")
        b.check-out-button(v-if="usersInCart") check out
    .menu-circle(:class="classObject")
      transition-group(
          name="smooth-list", 
          tag="div", 
          class="menulist"
      )
        .menuitem(
          v-for="(user, i) in cart", 
          :key="user.uid", 
          :style="'background-image: url(' + user.img + ')'",
          @click="removeFromCart(user.uid)"
        ) 
          .ammount-beers(:style="'background-color: ' + user.color") {{user.beersInCart}}
    
</template>

<script>
import {activateFirebaseUserRefs, firebasePlaceholders} from '@/firebase'

export default {
  name: 'cart',
  created () {
    activateFirebaseUserRefs(this)
  },
  data: function () {
    return {
      classObject: {
        'drag-over': false
      },
      ...firebasePlaceholders
    }
  },
  computed: {
    cart () {
      const state = this.$store.state.appstate.cart
      return state.map((val) => {
        return Object.assign({}, val, this.boardUsersArray[val.uid])
      })
    },
    usersInCart () {
      return this.cart.length !== 0
    },
    totalBeersInCart () {
      return this.cart.reduce((acc, cur) => acc + cur.beersInCart, 0)
    }
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
    drop: function (e) {
      this.classObject['drag-over'] = false
      this.$store.commit('addUserToCart', {
        userID: e.dataTransfer.getData("uid"),
        beers: 1
      })
    },
    dragover: function (e) {
      this.classObject['drag-over'] = true
      e.preventDefault()
    },
    rotateCartList: function () {
      // give menulist a class object
    },
    removeFromCart: function (userID) {
      this.$store.commit('removeUserFromCart', {
        userID,
        beers: 1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$cart-radius: 250px;
$mobile-cart-radius: 150px;
$cart-beeramount-badge-color: #23B883;
$check-out-button-color: #c70d0d;

@mixin material-shadow() {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

/// Mixin to place items on a circle
/// @author Hugo Giraudel
/// @author Ana Tudor
/// @param {Integer} $item-count - Number of items on the circle
/// @param {Length} $circle-size - Large circle size
/// @param {Length} $item-size - Single item size
@mixin on-circle($item-count, $circle-size, $item-size) {
  position: relative;
  width:  $circle-size;
  height: $circle-size;
  padding: 0;
  border-radius: 50%; 
  list-style: none;       
  
  > * {
    display: block;
    position: absolute;
    top:  50%; 
    left: 50%;
    width:  $item-size;
    height: $item-size;
    margin: -($item-size / 2);
  
    $angle: (360 / $item-count);
    $rot: 195; // modified so it starts at 10 a' clock

    @for $i from 1 through $item-count {
      &:nth-of-type(#{$i}) {
        transform: 
          rotate($rot * 1deg) 
          translate($circle-size / 2) 
          rotate($rot * -1deg);
      }

      $rot: $rot + $angle;
    }
  }
}

.menulist {
    @include on-circle($item-count: 16, $circle-size: 2*$cart-radius, $item-size: 80px); 

    &.check-out {
      transform: rotate(90deg);
      transition: transform 0.2s;
      transition-timing-function: cubic-bezier(0, 0.19, 0.99, 0.4);
    }

    .menuitem {
      display: block; 
      max-width: 100%; 
      border-radius: 50%;
      background-size: cover;
      @include material-shadow();
    }
}

.ammount-beers {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: $cart-beeramount-badge-color;
  position: relative;
  top: 75%;
  float: right;
  color: whitesmoke;
}

.cartbutton {
  position: absolute;
  right: 0.1*$cart-radius;
  bottom: 0.1*$cart-radius;
  font-size: 8em;
  z-index: 2;
}

.check-out-button {
    z-index: 2;
    position: absolute;
    right: 20px;
    bottom: 20px;
    color: $check-out-button-color;
    font-weight: 500;
    font-style: oblique;
    font-variant: small-caps;
    font-size: 1.3em;
    opacity: 0.71;
}

.check-out-overlay {
  height: $cart-radius;
  width: $cart-radius;
  position: fixed;
  bottom: -0.5*$cart-radius;
  right: -0.5*$cart-radius;
  border-radius: 0.5*$cart-radius;
  opacity: 0;
  z-index: 10;
}

.menu-circle {
  height: 2*$cart-radius;
  width: 2*$cart-radius;
  position: fixed;
  bottom: -$cart-radius;
  right: -$cart-radius;
  border-radius: $cart-radius;
  background-color: white;
  transition: all 0.5s ease;

  &.drag-over {
    height: 2.2*$cart-radius;
    width: 2.2*$cart-radius;
    bottom: -1.1*$cart-radius;
    right: -1.1*$cart-radius;
    border-radius: 1.1*$cart-radius;
  }
}

// Transistion classes for vue, check out 
// https://vuejs.org/v2/guide/transitions.html
// for more info.

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(300px);
  opacity: 0;
}


.fade-out-enter-active {
  transition: all .3s ease;
}
.fade-out-leave-active {
  transition: all .2s ease;
}
.fade-out-enter, .fade-out-leave-to
/* .fade-out-leave-active for <2.1.8 */ {
  opacity: 0;
}


.slide-left-enter-active {
  transition: all .3s ease;
}
.slide-left-leave-active {
  transition: all .2s ease;
}
.slide-left-enter, .slide-left-leave-to
/* .slide-left-leave-active for <2.1.8 */ {
  transform: translateX(-50px);
  opacity: 0;
}


@keyframes moveinlist {
    from { transform: rotate(90deg) translateY($cart-radius) rotate(-90deg); }
    to   { transform: rotate(105deg) translateY($cart-radius) rotate(-105deg); }
}

@keyframes moveinlist-mobile {
    from { transform: rotate(90deg) translateY($mobile-cart-radius) rotate(-90deg); }
    to   { transform: rotate(105deg) translateY($mobile-cart-radius) rotate(-105deg); }
}

.smooth-list-enter-active {
  transition: all 1s;
  animation: moveinlist 0.5s ease;
}
.smooth-list-enter, .smooth-list-leave-to /* .smooth-list-leave-active for <2.1.8 */ {
  opacity: 0;
}

// Alternative circle radius for mobile
@media screen and (max-width: 480px) {
  .menulist {
    @include on-circle($item-count: 16, $circle-size: 2*$mobile-cart-radius, $item-size: 50px);
  }


  .cartbutton {
    right: 0.2*$mobile-cart-radius;
    bottom: 0.2*$mobile-cart-radius;
    font-size: 4em;
  }

  .check-out-button {
      right: 20px;
      bottom: 20px;
      font-size: 1em;
  }

  .check-out-overlay {
    height: $mobile-cart-radius;
    width: $mobile-cart-radius;
    bottom: -0.5*$mobile-cart-radius;
    right: -0.5*$mobile-cart-radius;
    border-radius: 0.5*$mobile-cart-radius;
  }

  .menu-circle {
    height: 2*$mobile-cart-radius;
    width: 2*$mobile-cart-radius;
    bottom: -$mobile-cart-radius;
    right: -$mobile-cart-radius;
    border-radius: $mobile-cart-radius;

    &.drag-over {
      height: 2.2*$mobile-cart-radius;
      width: 2.2*$mobile-cart-radius;
      bottom: -1.1*$mobile-cart-radius;
      right: -1.1*$mobile-cart-radius;
      border-radius: 1.1*$mobile-cart-radius;
    }
  }

  // vue transistion class
  .smooth-list-enter-active {
    transition: all 1s;
    animation: mobile-moveinlist 0.5s ease;
  }
}

</style>
