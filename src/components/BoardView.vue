<template lang="jade">
  .main
    menu-bar
    board
    pop-up
    cart
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
