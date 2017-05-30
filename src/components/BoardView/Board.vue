<template lang="pug">
  .main
    user-card(v-for="user in boardUsers", :key="user.uid", :user="user")
    user-mobile-loading(:user="boardUsers[0]")
</template>

<script>
import UserCard from '@/components/BoardView/Board/UserCard'
import UserMobileLoading from '@/components/BoardView/Board/UserMobileLoading'
import {activateFirebaseUserRefs, firebasePlaceholders} from '@/firebase'

export default {
  name: 'board',
  components: {
    UserCard,
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
