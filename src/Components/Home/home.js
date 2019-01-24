import React, { Component } from 'react';
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <div>
       Home Page
       <button onClick={this.logout} >Logout </button>
      </div>
    );
  }
  logout(){
    console.log("logout")
    
  }
}
const HomeRedux = connect()(Home)
export default HomeRedux;
