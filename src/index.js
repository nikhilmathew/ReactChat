import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';

// Firebase App is always required and must be first
// var firebase = require("firebase/app");
import * as firebase from 'firebase/app';
import 'firebase/auth';
// Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

// Comment out (or don't require) services that you don't want to use
// require("firebase/storage");

var config = {
    apiKey: "AIzaSyCyFwexoUngNo92rHXrDZPhctCY6vmFkik",
    authDomain: "reactchat-7902e.firebaseapp.com",
    databaseURL: "https://reactchat-7902e.firebaseio.com",
    projectId: "reactchat-7902e",
    storageBucket: "reactchat-7902e.appspot.com",
    messagingSenderId: "479296809558"
  };
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("user is signed in ",user)
    } else {
      // No user is signed in.
    }
  });
// firebase.auth().createUserWithEmailAndPassword('hello@abc.com','12345R')
// .then(result=>console.log(result))
// .catch(function(error) {
//     // Handle Errors here.
//     // var errorCode = error.code;
//     // var errorMessage = error.message;
//     // ...
//     console.log(error)
//   });
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
