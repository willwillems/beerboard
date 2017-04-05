<template lang="jade">
  .main
    user-card(v-for="user in users", :user="user")
</template>

<script>
import UserCard from '@/components/BoardView/Board/UserCard'

export default {
  name: 'board',
  components: {
    UserCard
  },
  data: () => {
    return {
      users: [
        {
          name: "Rutger",
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
.main {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 40px;
  background-color: #F6F6F6;
}

</style>
