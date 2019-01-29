import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { silentLogin } from '../../actions/authActions'
// import logo from './logo.svg';
import fire from '../../Config/fire'
import './App.css';
import Home from '../Home/home'
import AuthPages from '../AuthenticationPages/authPages';
class App extends Component {
  constructor(props){
    super(props)
   this.authListener()
  }

  componentWillMount(){
    console.log("app mounted")
    
  }
  authListener(){
    // console.log(fire)
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.props.silentLogin(user)
        console.log("auto signin user is signed in ",user)
      } else {
        // No user is signed in.
        this.props.silentLogin(null)
        console.log("no user signed in")
      }
    });  
  }
  render() {
    return (
      <div className="App">
        {  this.props.loggedin?<Home/>:<AuthPages/>}
      </div>
    );
  }
}

App.propTypes ={
  silentLogin: PropTypes.func.isRequired
}
function mapStateToProps (state){
  return {
    loggedin: state.auth.loggedin
  }
}
export default  connect(mapStateToProps, { silentLogin })(App)
