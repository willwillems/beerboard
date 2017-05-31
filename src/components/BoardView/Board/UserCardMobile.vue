<template lang="pug">
  .card(@touchstart="startTouch", @touchend="stopTouch" :id="user.uid")
    .beer-count-circle(:style="'background-color: ' + user.color + ';'") {{user.beers}}
    .user-image(:style="'background-image: url(' + user.img + ')'")
    .name {{user.name}}
</template>

<script>
export default {
  name: "UserCardMobile",
  props: ['user'],
  data: function () {
    return {
    }
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
    startTouch () {
      this.$store.commit("activateTouchOverlayWithUser", {user: this.user})
      var that = this
      this.timer = setTimeout(function () {
        that.$store.commit('addUserToCart', {
          userID: that.user.uid,
          beers: 1
        })
        that.startTouch() // recursive
      }, 1500)
    },
    stopTouch (e) {
      this.$store.commit("deactivateTouchOverlay")
      clearTimeout(this.timer)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$prim-white: white;

$card-width-mobile: 4rem;
$card-height-mobile: $card-width-mobile;
$beer-count-radius-mobile: $card-width-mobile*0.18;

.card {
    position: relative;
    width: $card-width-mobile;
    margin: 5px 10px;
    border-radius: 5px;
    text-align: left;
}

.beer-count-circle {
  width: 2*$beer-count-radius-mobile;
  height: 2*$beer-count-radius-mobile;
  top: -$beer-count-radius-mobile;
  left: -$beer-count-radius-mobile;
  position: absolute;
  margin: 5px; // to create a slight offset from the centre
  border-radius: $beer-count-radius-mobile;
  background-color: teal;
  color: white;
  text-align: center;
  font-size: 12px;
  line-height: 2*$beer-count-radius-mobile;
}

.user-image {
  height: $card-height-mobile;
  width: $card-width-mobile;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.13);
}

.name {
  font-size: 1em;
  margin-top: 5px;
  text-align: center;
  opacity: 0.71;
}

</style>
