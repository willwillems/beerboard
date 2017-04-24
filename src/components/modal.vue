<template lang="pug">
    .modal(:class="{active: modalIsActive}")
        .title {{modalContent.title}}
        .content {{modalContent.content}}
        .button(@click="clicked('clicked')") {{modalContent.button}}
</template>

<script>
export default {
  name: "modal",
  data: function () {
    return {
      modalContent: {
        title: "I'm a modal!",
        content: "When thou gaze long into an abyss, the abyss will also gaze into thee",
        button: "click me!"
      },
      modalIsActive: true
    }
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
    clicked (text) {
      console.log(text)
      this.modalIsActive = !this.modalIsActive
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin material-shadow() {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.modal {
    position: fixed;
    right: 20px;
    top: -80px;
    background-color: white;
    border: solid 1px #666;
    border-radius: 8px;
    width: 300px;
    height: 60px;
    min-height: calc(0.8em + 2*6px + 2*1px + 2*10px); // button with padding
    z-index: 100;
    @include material-shadow();
    transition: top 1s cubic-bezier(0, 0.47, 0.85, 1.14); //  Allow the modal to slide in from the top

    &.active {
        top: 20px;
    }

    .title {
        text-align: left;
        font-weight: 500;
        font-size: 1.2em;
        position: relative;
        top: 5px;
        left: 10px;

    }

    .content {
        text-align: left;
        font-weight: 300;
        font-size: 0.8em;
        position: relative;
        top: 10px;
        left: 10px;
        max-width: calc(100% - 11em);
        max-height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .button {
        float: right;
        font-weight: 300;
        font-size: 0.8em;
        position: absolute;
        bottom: 10px;
        right: 5px;
        border: 1px solid #666;
        border-radius: 5px;
        padding: 5px 30px;
        margin: 0px 10px;
        transition: all 0.4s ease;
        &:hover {
            cursor: pointer;
            bottom: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.13);
        }
    }

}
</style>
