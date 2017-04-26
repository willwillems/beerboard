<template lang="pug">
  .main
    .container
      .title User
      .divider
      .content-next-to-card 
        label(for="beers-input") Beers
        input#beers-input(type="number", v-model.number="user.beers")
        p
        // Little trick here below, to use button for file select
        label(for="file-input") Upload picture
        button#file-select(onclick="document.getElementById('file-input').click();") Upload image
        input(id="file-input", type="file", name="name", style="display: none;")
      user-card(:user="user")
      label(for="name-input") Name
      input#name-input(type="text", v-model.trim="user.name")
      p
      label Colors
      .color-selector
        span(v-for="color in colors")
          input(type="radio", v-model="user.color" v-bind:value="color.code", :id="color.name", name="colorSelector")
          label(:for="color.name")
            span(:style="'background-color:' + color.code")
</template>

<script>
import firebase from '@/firebase'

import UserCard from './BoardView/Board/UserCard'

export default {
  name: "UserView",
  components: {
    UserCard
  },
  firebase,
  data: function () {
    return {
      colors: [
        {
          name: "teal",
          code: "#009688"
        },
        {
          name: "cyan",
          code: "#00BCD4"
        },
        {
          name: "orange",
          code: "#FF9800"
        },
        {
          name: "purple",
          code: "#9C27B0"
        },
        {
          name: "red",
          code: "#F44336"
        },
        {
          name: "indigo",
          code: "#3F51B5"
        }
      ]
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
    text-align: left;
    padding: 20px;
}

.content-next-to-card {
    width: 120px;
    float: right;
    height: 200px;
    margin: 20px 0px 10px 20px;
}

.container {
  width: 300px;

  input[type="text"], input[type="number"], button  {
    background-color: white;
    border: solid 1px lightgray;
    border-radius: 5px;
    height: 2rem;
    font-size: 12px;
    padding: 0px 10px;

    &:focus {
      border-color: black;
      outline: none; // disable default action
    }
    
  }
}

.color-selector {
  padding: 5px 0px;

  input[type="radio"] {
    display: none;
  }
  input[type="radio"] + label span {
      display: inline-block;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
      margin: 3px;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
  }
  input[type="radio"]:checked + label span {
      border: solid 2px lightgrey;
      margin: 1px;
  }
}

label {
  font-size: 0.8em;
  font-style: italic;
  color: grey;
  padding: 3px;
}

#name-input {
    width: calc(100% - 20px); // container width minus padding
}

#beers-input {
  width: 100px;
}

#file-select {
  color: gray;
  font-weight: 500;
  width: 120px;
  &:hover {
    color: black;
  }
}

.title {
    font-size: 4em;
    font-weight: 450;
}

.divider {
    width: 100%;
    height: 3px;
    background-color: #D8D8D8;
}

.card {
  margin: 20px 0px 10px 0px;
}
</style>
