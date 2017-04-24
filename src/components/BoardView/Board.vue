<template lang="pug">
  .main
    user-card(v-for="user in boardUsersArray", :user="user")
</template>

<script>
import UserCard from '@/components/BoardView/Board/UserCard'
import firebase from '@/firebase'

export default {
  name: 'board',
  firebase,
  components: {
    UserCard
  },
  data: () => {
    return {
      users: [
        {
          name: "Rutger",
          uid: 32467891,
          img: "https://graph.facebook.com/100001764027428/picture?width=999&height=999",
          title: "Bierkoning 2017"
        }
      ]
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
}

</style>
