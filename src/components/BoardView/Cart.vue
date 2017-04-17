<template lang="jade">
  .main(@drop="drop", @dragover="dragover", :class="classObject")
    .menulist
      .menuitem(v-for="user in cart", :style="'background-image: url(' + user.img + ')'") 
        .ammount-beers {{user.beersInCart}}
</template>

<script>
import firebase from '@/firebase'

export default {
  name: 'cart',
  firebase,
  props: {
    cartList: Array
  },
  data: function () {
    return {
      classObject: {
        'drag-over': false
      }
    }
  },
  computed: {
    cart () {
      const state = this.$store.state.appstate.cart
      return state.map((val) => {
        return Object.assign({}, val, this.boardUsers[val.uid])
      })
    }
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
    drop: function (e) {
      this.classObject['drag-over'] = false
      this.$store.commit('addUserToCart', {
        userID: e.dataTransfer.getData("text/uid"),
        beers: 1
      })
    },
    dragover: function (e) {
      this.classObject['drag-over'] = true
      e.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$cart-radius: 250px;
$cart-beeramount-badge-color: #23B883;

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

.main {
  height: 2*$cart-radius;
  width: 2*$cart-radius;
  position: fixed;
  bottom: -$cart-radius;
  right: -$cart-radius;
  border-radius: $cart-radius;
  background-color: white;
  transition: all 0.5s ease;

  &.drag-over {
    height: 3*$cart-radius;
    width: 3*$cart-radius;
    bottom: -1.5*$cart-radius;
    right: -1.5*$cart-radius;
    border-radius: 1.5*$cart-radius;
  }
}

</style>
