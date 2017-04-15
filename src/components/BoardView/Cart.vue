<template lang="jade">
  .main(@drop="drop", @dragover="dragover", :class="classObject")
    .menulist
      .menuitem(v-for="item in items", :style="'background-image: url(' + item.img + ')'") 
</template>

<script>
export default {
  name: 'cart',
  data: function () {
    return {
      classObject: {
        'drag-over': false
      },
      items: [
        {
          name: "Rutger",
          uid: 32467891,
          img: "https://graph.facebook.com/100001764027428/picture?width=999&height=999",
          title: "Bierkoning 2017"
        }
      ]
    }
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
    drop: function (e) {
      this.classObject['drag-over'] = false
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
$cart-radius: 150px;

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
    $rot: 200; // modified so it starts at 10 a' clock

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
    @include on-circle($item-count: 8, $circle-size: 2*$cart-radius, $item-size: 80px); 

    .menuitem {
      display: block; 
      max-width: 100%; 
      border-radius: 50%;
      background-size: cover;
    }
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
