<template lang="jade">
  .main(@drop="drop", @dragover="dragover", :class="classObject")
</template>

<script>
export default {
  name: 'cart',
  data: function () {
    return {
      classObject: {
        'drag-over': false
      }
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
