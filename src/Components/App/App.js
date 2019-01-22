import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from '../SignIn/signIn'
import Error from '../Error/Error'
import fire from '../Config/fire'
import './App.css';

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
      if (user) {
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
        <BrowserRouter>
          <Switch>
            <Route path="/" component={SignIn} exact/>
            <Route path="/login" component={SignIn} />
            <Route path="/home" component={SignIn} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
