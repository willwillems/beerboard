<template lang="pug">
  .main
    .container
      .title(@click="test") Admin
      .divider
      table
        tr
          th Beers
          th Time
        tr(v-for="entry in userHistory")
          td {{entry.beers}}
          td {{date(entry.time)}}
</template>

<script>
import {activateFirebaseUserRefs, firebasePlaceholders, firebaseApp} from '@/firebase'

const db = firebaseApp.database()
const storage = firebaseApp.storage()

export default {
  name: "UserView",
  data: function () {
    return {
      testData: {
        dddddd: {
          beers: 3,
          time: 477410287
        }
      },
      ...firebasePlaceholders
    }
  },
  created () {
    activateFirebaseUserRefs(this)
  },
  methods: { // No arrow functions here for thas gets messed up, naturally
    test () {
      console.log(this)
    },
    date (time) {
      return new Date(time)
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$admin-view-backgroundcolor: #F6F6F6;
.main {
    background-color: $admin-view-backgroundcolor;
    top: 0px;
    position: absolute;
    height: 100%;
    width: 100%;
    text-align: left;
    padding: 20px;
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
  button {
    color: gray;
    font-weight: 500;
    &:hover {
      color: black;
    }
  }
}

label {
  font-size: 0.8em;
  font-style: italic;
  color: grey;
  padding: 3px;
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
</style>
