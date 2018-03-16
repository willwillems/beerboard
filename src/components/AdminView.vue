<template lang="pug">
  .main
    .container
      .title(@click="test") Admin
      .divider
      p 
      h3 Current
      table(cellspacing="0", cellpadding="0", @click="downloadUserdata")
        tr
          th Name
          th Beers
        tr(v-for="entry in boardUsers", v-if="entry.name")
          td {{entry.name}}
          td {{entry.beers}}
      i(@click="downloadUserdata") Download
      p
      i(@click="resetBeerValues") Reset beer values
      p 
      h3 Invite User
      div
        input(type="email", v-model="newUserEmail")
        button(@click="inviteUser") Click to invite
      p
      h3 History
      table(cellspacing="0", cellpadding="0")
        tr
          th Beers
          th Time
        tr(v-for="entry in userHistory", v-if="entry.beers")
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
      newUserEmail: "",
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
    },
    convertUserdataToCSV (data) {
      let lineArray = []
      data.forEach(function (infoArray, index) {
        const line = Object.values(infoArray).join(",")
        lineArray.push(index === 0 ? "data:text/csv;charset=utf-8," + line : line)
      })
      return lineArray.join("\n")
    },
    downloadUserdata () {
      window.open(encodeURI(this.convertUserdataToCSV(this.boardUsers)))
    },
    resetBeerValues () {
      this.boardUsers.forEach((e) => {
        this.$firebaseRefs.boardUsers
          .child(e[".key"])
          .child("beers")
          .set(0)
      })
    },
    inviteUser () {
      var that = this
      // this is a bit hacky, but then again this whole page barely quallifies as
      // an MVP, plus this is very convienient
      var house = this.$firebaseRefs.user.path.o[1]
      db.ref("/invites")
        .push(
        {
          email: that.newUserEmail,
          house: house
        },
        e => { // error callback
          if (e) console.error(e)
          else that.newUserEmail = ""
        }
        )
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
  width: 600px;

  input[type="text"], input[type="number"], input[type="email"], button  {
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


////// http://codepen.io/alassetter/pen/cyrfB
$table-border-radius: 5px;

th {
  color: #D5DDE5;;
  background: #1b1e24;
  border-bottom: 3px solid teal;
  border-right: 1px solid #343a45;
  font-size: 16px;
  font-weight: 100;
  padding: 10px 15px;
  text-align: left;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;
}

th:first-child {
  border-top-left-radius: $table-border-radius;
}
 
th:last-child {
  border-top-right-radius: $table-border-radius;
  border-right: none;
}
  
tr {
  border-top: 1px solid #C1C3D1;
  border-bottom-: 1px solid #C1C3D1;
  color:#666B85;
  font-size:12px;
  font-weight:normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
}
 
tr:first-child {
  border-top:none;
}

tr:last-child {
  border-bottom:none;
}
 
tr:nth-child(odd) td {
  background:#EBEBEB;
}


tr:last-child td:first-child {
  border-bottom-left-radius: $table-border-radius;
}
 
tr:last-child td:last-child {
  border-bottom-right-radius: $table-border-radius;
}
 
td {
  background: #FFFFFF;
  padding: 10px 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 18px;
  text-shadow:  -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right:  1px solid #C1C3D1;
}

td:last-child {
  border-right: 0px;
}




//////

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
