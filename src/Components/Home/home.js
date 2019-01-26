import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/authActions'
import ChatList from '../ChatList/chatList'
import  './home.scss'
class Home extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.logout = this.logout.bind(this)
  }
  render() {
    return (
      <div className="container-fluid">
       <div className="row" >
          <div className="title_bar_container">
            <div className="title">
              <p>Welcome to Nik CHat ,  {this.props.user.displayName}  </p>
            </div>
            <button className="logout_button btn" onClick={this.logout} >Logout </button>
          </div>
       </div>
       <div className="row">
          <div className="col-4">
            <ChatList />
          </div>
          <div className="col-5">

          </div>
          <div className="col-3">

          </div>
       </div>
      
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
function mapStateToProps (state){
  return {
    user: state.auth.user
  }
}
export default connect(mapStateToProps, { logout })(Home)