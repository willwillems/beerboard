<template lang="pug">
  .auth-modal(v-show="$store.state.appstate.authModalIsActive")
    #firebaseui-auth-container  
</template>

<script>
import {firebaseApp} from '@/firebase'
var firebaseui = require('firebaseui')

var uiConfig = {
  signInSuccessUrl: '/', // 'boardview',
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
$auth-modal-backgroundcolor: white;

.auth-modal {
  width: 75%;
  position: fixed;
  left: 50%;
  top: 20%;
  margin-left: -37.5%;
  z-index: 100;
}
#firebaseui-auth-container {
  .firebaseui-container {
    width: 250px;
    margin: auto;
    z-index: 100;
    background-color: $auth-modal-backgroundcolor;
    border: 1px solid darkgray;
    border-radius: 5px;
    padding: 10px 0px; // for the :before pseudo element
    &:before {
      content: 'Sign-In';
      font-size: 1.3em;
      font-weight: 600;
      opacity: 0.71;
      padding: 5px 40px; // This creates the line underneath the sign in text
      border-bottom: 2px solid lightgray;
    }
  }
}
</style>
