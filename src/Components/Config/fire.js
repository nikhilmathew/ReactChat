import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCyFwexoUngNo92rHXrDZPhctCY6vmFkik",
    authDomain: "reactchat-7902e.firebaseapp.com",
    databaseURL: "https://reactchat-7902e.firebaseio.com",
    projectId: "reactchat-7902e",
    storageBucket: "reactchat-7902e.appspot.com",
    messagingSenderId: "479296809558"
  };

const fire = firebase.initializeApp(config);
export default fire;