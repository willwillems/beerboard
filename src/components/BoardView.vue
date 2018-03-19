<template lang="pug">
  .main
    auth-modal
    menu-bar
    board
    pop-up
    cart
</template>

<script>
// HTML5 drag-n-drop polyfill for touch devices
import '@/assets/lib/dragdroptouch/DragDropTouch.js'

import {firebaseApp} from '@/firebase'
import {addBeerToUser, entryExistInFirebase, dbMutationsStore} from '@/firebaseFunctions'

import Board from '@/components/BoardView/Board'
import MenuBar from '@/components/BoardView/MenuBar'
import Cart from '@/components/BoardView/Cart'
import PopUp from '@/components/BoardView/PopUp'
import AuthModal from '@/components/BoardView/AuthModal'

export default {
  name: 'board-view',
  components: {
    Board,
    MenuBar,
    Cart,
    PopUp,
    AuthModal
  },
  created: function () {
    var that = this
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        that.$store.commit("setAuthModal", {newState: false})
        // Data needs to be refreshed or something otherwise the
        // cards are not shown untill the page is reloaded
      } else {
        that.$store.commit("setAuthModal", {newState: true})
      }
      console.log('authstatechanged', user)
    })
    // Send data that was lost in previous session
    this.checkAndSendLocalData()
  },
  methods: {
    checkAndSendLocalData: function () {
      var that = this
      dbMutationsStore.iterate(function (val, key) {
        if (!entryExistInFirebase(`history/${val.uid}/`, key)) {
          addBeerToUser(val, !that.$store.state.appstate.serverConnectionActive)
        }
        dbMutationsStore.removeItem(key).catch(console.log)
      })
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
