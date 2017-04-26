<template lang="pug">
  .card(draggable="true", @dragstart="startDrag", :id="user.uid")
    .beer-count-circle 
      .beer-count {{user.beers}}
    .user-image(:style="'background-image: url(' + user.img + ')'")
    .name {{user.name}}
    .title {{user.title}}
    .progress-bar
      .done(:style="'width: ' + user.beers + '%; background-color: ' + user.color + ';'")
</template>

<script>
export default {
  name: 'user-card',
  props: ['user'],
  methods: {
    startDrag: function (e) {
      e.dataTransfer.setData("uid", e.target.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$prim-white: white;

$card-width: 10rem;
$card-height: $card-width*1.3;
$beer-count-radius: 0.3*$card-width;

.card {
    position: relative;
    height: $card-height;
    width: $card-width;
    margin: 20px;
    background-color: $prim-white;
    border-radius: 5px;
    overflow: hidden;
    text-align: left;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.13);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    &:hover {
      transform: translateY(-3px); // 3px up
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
}

.beer-count-circle {
  width: 2*$beer-count-radius;
  height: 2*$beer-count-radius;
  top:-$beer-count-radius;
  left:-$beer-count-radius;
  position: absolute;
  border-radius: $beer-count-radius;
  background-color: white;
  

  .beer-count {
    height: $beer-count-radius;
    width: $beer-count-radius;
    position: absolute;
    bottom: 0px;
    right: 0px;
    margin: -6px 3px;
    font-size: 1.5em;
    text-align: center;
  }
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
  margin-top: 5px;
  margin-bottom: 3px;
}

.title {
  font-size: 0.5em;
}

.progress-bar {
  position: absolute;
  bottom: 0px;
  height: 4px;
  width: 100%;
  background-color: #666;

  .done {
    background-color: teal;
    width: 40px;
    height: 100%;
  }
}

</style>
