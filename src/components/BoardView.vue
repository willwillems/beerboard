<template lang="jade">
  .main
    menu-bar
    board
    pop-up
    cart(:cartList="cartDemo")
</template>

<script>
import Board from '@/components/BoardView/Board'
import MenuBar from '@/components/BoardView/MenuBar'
import Cart from '@/components/BoardView/Cart'
import PopUp from '@/components/BoardView/PopUp'

export default {
  name: 'board-view',
  components: {
    Board,
    MenuBar,
    Cart,
    PopUp
  },
  data: function () {
    return {
      cartDemo: [
        {
          name: "Rutger",
          uid: 32467891,
          img: "https://graph.facebook.com/100001764027428/picture?width=999&height=999",
          title: "Bierkoninge 2017",
          beersInCart: "4"
        },
        {
          name: "Rutger",
          uid: 32467891,
          img: "https://graph.facebook.com/100001764027428/picture?width=999&height=999",
          title: "Bierkoninge 2017",
          beersInCart: "4"
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
}

</style>
