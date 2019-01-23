import React, { Component } from 'react';
// import logo from './logo.svg';
import SignIn from '../SignIn/signIn'
import fire from '../Config/fire'
import './App.css';
import Home from '../Home/home'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user:{},
    }
  }

  componentDidMount(){
    this.authListener()
  }
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if (!user) {
        // User is signed in.
        console.log("user is signed in ",user)
        this.setState({ user })
      } else {
        // No user is signed in.
        this.setState({ user:null })
      }
    });  
  }
  render() {
    return (
      <div className="App">
        {  this.state.user==null?<SignIn/>:<Home/>}
      </div>
    );
  }
}

export default App;
