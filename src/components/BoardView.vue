<template lang="jade">
  .main heuhj
    menu-bar
    board
</template>

<script>
import Board from '@/components/BoardView/Board'
import MenuBar from '@/components/BoardView/MenuBar'

export default {
  name: 'board-view',
  components: {
    Board,
    MenuBar
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
