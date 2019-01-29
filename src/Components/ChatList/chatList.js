import React, { Component } from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import  './chatlist.scss'
import NewChatRoom from './newchatroom/newChatRoom';
import Invites from './invites/invites'
import Rooms from './rooms/rooms';
class ChatList extends Component {
  render() {
    return (
       <div className="row chat_list_container" >
         <div className="col-12">
                <NewChatRoom />
                <Invites/>
                <Rooms/>
         </div>
       </div>
    );
  }
  
}
ChatList.propTypes ={
}
function mapStateToProps (state){
  return {
  }
}
export default connect(mapStateToProps, {  })(ChatList)