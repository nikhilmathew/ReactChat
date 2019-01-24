import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/authActions'

class Home extends Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
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
    this.props.logout()
  }
}
Home.propTypes ={
  logout: PropTypes.func.isRequired
}
export default connect(null, { logout })(Home)