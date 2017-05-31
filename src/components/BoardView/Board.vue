<template lang="pug">
  .main
    user-card-mobile(v-if="isMobile", v-for="user in boardUsers", :key="user.uid", :user="user")
    user-card(v-else, :key="user.uid", :user="user")
    user-mobile-loading
</template>

<script>
import UserCard from '@/components/BoardView/Board/UserCard'
import UserCardMobile from '@/components/BoardView/Board/UserCardMobile'
import UserMobileLoading from '@/components/BoardView/Board/UserMobileLoading'
import {activateFirebaseUserRefs, firebasePlaceholders} from '@/firebase'

export default {
  name: 'board',
  components: {
    UserCard,
    UserCardMobile,
    UserMobileLoading
  },
  created () {
    activateFirebaseUserRefs(this)
  },
  data: () => {
    return {
      ...firebasePlaceholders
    }
  },
  computed: {
    isMobile () {
      return screen.width <= 640
    }
  },
  watch: {
    boardUsers (val) {
      console.log("whatcher", val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$board-backgroundcolor: #F6F6F6;

.main {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 40px;
  background-color: $board-backgroundcolor;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

</style>
