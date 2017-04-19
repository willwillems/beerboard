<template>
  <div>  
    <h1 align="center" style="color:white;">Firebase Auth Quickstart Demo</h1>  
    <div id="firebaseui-auth-container"></div>  
  </div>  
</template>

<script>
import {firebaseApp} from '../../firebase'
var firebaseui = require('firebaseui')

var uiConfig = {
  signInSuccessUrl: 'boardview',
  signInOptions: [
    // Specify providers you want to offer your users.
    firebaseApp.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseApp.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url can be specified and will show up in the widget.
  tosUrl: 'tos'
}

export default {
  name: 'login',
  created: function () {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebaseApp.auth())
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  data: function () {
    return {
    }
  }
}
</script>

<style lang="scss">
#firebaseui-auth-container {
  width: 75%;
  position: fixed;
  left: 50%;
  margin-left: -37.5%;
  z-index: 100;
}
</style>
