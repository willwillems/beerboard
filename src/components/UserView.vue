<template lang="jade">
    .main
        h1 hey
</template>

<script>
export default {
  name: "UserView",
  data: function () {
    return {
    }
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$user-view-backgroundcolor: #F6F6F6;
.main {
    background-color: $user-view-backgroundcolor;
    top: 0px;
    position: absolute;
    height: 100%;
    width: 100%;
}
</style>
