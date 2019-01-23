import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';
import  { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './Components/App/reducers'
const store = createStore(
    reducers
)
// import reducer 
// Firebase App is always required and must be first
// var firebase = require("firebase/app");
// Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

// Comment out (or don't require) services that you don't want to use
// require("firebase/storage");

// firebase.auth().createUserWithEmailAndPassword('hello@abc.com','12345R')
// .then(result=>console.log(result))
// .catch(function(error) {
//     // Handle Errors here.
//     // var errorCode = error.code;
//     // var errorMessage = error.message;
//     // ...
//     console.log(error)
//   });
ReactDOM.render(
<Provider store = { store }>
    <App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
