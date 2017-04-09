<template lang="jade">
  .card(draggable="true" ,:id="user.uid")
    .user-image(:style="'background-image: url(' + user.img + ')'")
    .name {{user.name}}
    .title {{user.title}}
    .progress-bar
</template>

<script>
export default {
  name: 'user-card',
  props: ['user']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$prim-white: white;

$card-width: 10em;
$card-height: $card-width*1.3;

.card {
    height: $card-height;
    width: $card-width;
    margin: 20px;
    background-color: $prim-white;
    border-radius: 5px;
    overflow: hidden;
    text-align: left;
}

.user-image {
  width: $card-width;
  height: $card-width;
  background-size: cover;
}

.name, .title {
  margin-left: 10px;
}

.name {
  font-size: 1em;
}

.title {
  font-size: 0.5em;
}

</style>
