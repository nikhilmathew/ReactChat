import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/authActions'
import { fetchRooms,getInvites,cleanStateOnleaveHome } from '../../actions/chatlistActions'
import ChatList from '../ChatList/chatList'
import  './home.scss'
import ChatWindow from '../ChatWindow/chatWindow'
import ChatDetails from '../ChatDetails/chatdetails'

class Home extends Component {
  constructor(props){
    super(props)
    console.log(this.props)
    this.logout = this.logout.bind(this)
  }
  componentDidMount(){
    console.log("home mounted")
    setTimeout(()=>{
      this.props.fetchRooms()
      this.props.getInvites()
    },2000)
    
  }
  componentDidUpdate(){
    console.log("home updated")
    this.props.fetchRooms()
    this.props.getInvites()
  }
  componentWillUnmount(){
    this.props.cleanStateOnleaveHome()
    console.log('***************************************************************************')
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
       <div className="row components">
          <div className="col-4">
            <ChatList />
          </div>
          <div className="col-5">
            <ChatWindow />
          </div>
          <div className="col-3">
            <ChatDetails/>
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
  logout: PropTypes.func.isRequired,
  fetchRooms: PropTypes.func.isRequired,
  getInvites: PropTypes.func.isRequired,
  cleanStateOnleaveHome:PropTypes.func.isRequired

}
function mapStateToProps (state){
  return {
    user: state.auth.user
  }
}
export default connect(mapStateToProps, { logout,fetchRooms, getInvites,cleanStateOnleaveHome })(Home)